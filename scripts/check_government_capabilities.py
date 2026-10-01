#!/usr/bin/env python3
"""Deterministic checks for Bruce Works government-capabilities publication.

Government facts live in one place: content/government.json. The React pages
read it through content/government.ts, and scripts/generate-route-shells.mjs
reads it for the crawlable static summary. Route metadata and JSON-LD live in
seo/routes.json; the Organization JSON-LD lives in index.html.

This check:
  1. pins the verified facts (a fact change has to be made here on purpose),
  2. confirms the pages, metadata and PDF sources carry those facts,
  3. blocks stale or prohibited wording anywhere public, and
  4. blocks any designation or award claim (8(a), HUBZone, WOSB, contract
     awards, ...) that the facts file does not list.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FACTS = ROOT / "content" / "government.json"
FACTS_TS = ROOT / "content" / "government.ts"
HOME = ROOT / "index.html"
HOME_PAGE = ROOT / "pages" / "Home.tsx"
PAGE = ROOT / "pages" / "GovernmentCapabilities.tsx"
TRUST_STRIP = ROOT / "components" / "GovernmentTrustStrip.tsx"
ROUTES = ROOT / "seo" / "routes.json"
SHELLS = ROOT / "scripts" / "generate-route-shells.mjs"
SITEMAP = ROOT / "public" / "sitemap.xml"
PDF_INPUTS = [
    ROOT / "documents" / "capability-statement.input.json",
    ROOT / "documents" / "certification-verification-summary.input.json",
]
PDFS = [
    ROOT / "public" / "documents" / "Bruce-Works-LLC-Capability-Statement.pdf",
    ROOT / "public" / "documents" / "Bruce-Works-LLC-Certification-Verification-Summary.pdf",
]

# ---------------------------------------------------------------------------
# Verified facts. Sources:
#   SAM.gov: authenticated SAM.gov workspace, 2026-08-27.
#   California: Cal eProcure public supplier profile, 2026-07-27.
#   SBA VetCert: SBA certify dashboard, 2026-10-01, matching the public SBA
#   Small Business Search profile (search.certifications.sba.gov), 2026-10-01.
# ---------------------------------------------------------------------------
LEGAL_NAME = "Bruce Works LLC"
UEI = "N7YPC6B6YNC5"
CAGE = "246J3"
SAM = {
    "status": "Active Registration",
    "purpose": "All Awards",
    "activeDate": "08/27/2026",
    "expirationDate": "08/17/2027",
}
SAM_VERIFY_URL = "https://sam.gov/search/?index=entity"
NAICS = ["541618", "541511", "541512", "541611", "561110", "561410", "611430"]
SBA_CERTS = {
    "SDVOSB": {
        "name": "Service-Disabled Veteran-Owned Small Business",
        "status": "Active",
        "entranceDate": "09/30/2026",
        "renewalDate": "09/30/2029",
    },
    "VOSB": {
        "name": "Veteran-Owned Small Business",
        "status": "Active",
        "entranceDate": "09/30/2026",
        "renewalDate": "09/30/2029",
    },
}
SBA_VERIFY_URL = "https://search.certifications.sba.gov/"
SBA_PROFILE_URL = f"https://search.certifications.sba.gov/profile/{UEI}/{CAGE}"
CA_CERT_ID = "2053352"
CA_CERTS = {
    "DVBE": {
        "name": "Disabled Veteran Business Enterprise",
        "status": "Approved",
        "effectiveDate": "07/01/2026",
        "validThrough": "06/30/2028",
    },
    "SB (Micro)": {
        "name": "Small Business (Micro)",
        "status": "Approved",
        "effectiveDate": "07/01/2026",
        "validThrough": "06/30/2028",
    },
}
CA_VERIFY_URL = "https://caleprocure.ca.gov/pages/PublicSearch/supplier-search.aspx"
CAPABILITY_PDF = "/documents/Bruce-Works-LLC-Capability-Statement.pdf"
SUMMARY_PDF = "/documents/Bruce-Works-LLC-Certification-Verification-Summary.pdf"

# Wording that must never appear in anything public. Stale "pending" or
# "not claimed" VetCert language stays blocked now that SBA has certified.
PROHIBITED_PHRASES = [
    "Registration submitted · activation pending",
    "Published after official activation is verified",
    "government-issued certificate PDF",
    "not claimed until SBA VetCert approval",
    "SDVOSB/VOSB not claimed",
    "is not SBA VetCert certification",
    "does not claim VOSB or SDVOSB",
    "unless and until SBA approves",
    "VetCert remains unapproved",
    "VetCert pending",
    "pending SBA approval",
    "pending VetCert",
]

# Designations and claims that may only appear when the facts file holds them.
# Each entry: label, pattern for public text, and a test against the facts.
CERT_CLAIM_GUARDS = [
    ("8(a)", r"\b8\s*\(\s*a\s*\)"),
    ("HUBZone", r"hub\s*-?\s*zone"),
    ("WOSB/EDWOSB", r"\b(?:ED)?WOSB\b"),
    ("Women-Owned", r"women[\s-]*owned"),
    ("Small Disadvantaged Business", r"\bSDB\b|small\s+disadvantaged"),
    ("SDVOSB", r"\bSDVOSB\b|service[\s-]+disabled\s+veteran[\s-]+owned"),
    ("VOSB", r"\bVOSB\b"),
    ("DVBE", r"\bDVBE\b|disabled\s+veteran\s+business\s+enterprise"),
]
ACTIVE_STATUSES = {"Active", "Approved"}
AWARD_CLAIM_PATTERN = (
    r"contract[\s-]+awards?"
    r"|awarded\s+(?:a\s+|an\s+|the\s+)?(?:[\w-]+\s+){0,2}contracts?"
    r"|\b(?:won|wins?|winning)\s+(?:a\s+|an\s+|the\s+)?(?:[\w-]+\s+){0,2}contracts?"
    r"|set[\s-]*aside\s+awards?"
    r"|past\s+performance"
)

errors: list[str] = []


def require(condition: bool, message: str) -> None:
    if not condition:
        errors.append(message)


def rel(path: Path) -> str:
    return str(path.relative_to(ROOT))


def read(path: Path) -> str:
    require(path.is_file(), f"missing file: {rel(path)}")
    return path.read_text(encoding="utf-8") if path.is_file() else ""


def load_json(path: Path) -> dict:
    raw = read(path)
    if not raw:
        return {}
    try:
        return json.loads(raw)
    except json.JSONDecodeError as exc:
        errors.append(f"{rel(path)}: invalid JSON: {exc}")
        return {}


def public_values(value, skip_private: bool) -> list[str]:
    """Flatten JSON string values; optionally skip "_note"/"_source" keys."""
    out: list[str] = []
    if isinstance(value, dict):
        for key, item in value.items():
            if skip_private and key.startswith("_"):
                continue
            out.extend(public_values(item, skip_private))
    elif isinstance(value, list):
        for item in value:
            out.extend(public_values(item, skip_private))
    elif isinstance(value, str):
        out.append(value)
    return out


def validate_jsonld(label: str, html: str) -> list:
    blocks = re.findall(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    require(bool(blocks), f"{label}: missing JSON-LD")
    parsed = []
    for index, block in enumerate(blocks, start=1):
        try:
            parsed.append(json.loads(block))
        except json.JSONDecodeError as exc:
            errors.append(f"{label}: invalid JSON-LD block {index}: {exc}")
    return parsed


# ---------------------------------------------------------------------------
# 1. The facts file holds exactly the verified facts.
# ---------------------------------------------------------------------------
facts = load_json(FACTS)
company = facts.get("company", {})
identifiers = facts.get("identifiers", {})
sam = facts.get("samRegistration", {})
sba = facts.get("sbaCertifications", {})
ca = facts.get("californiaCertifications", {})
docs = facts.get("documents", {})
awards = facts.get("contractAwards", {}).get("awards", None)

require(company.get("legalName") == LEGAL_NAME, "facts: company.legalName must be Bruce Works LLC")
require(identifiers.get("uei") == UEI, f"facts: identifiers.uei must be {UEI}")
require(identifiers.get("cage") == CAGE, f"facts: identifiers.cage must be {CAGE}")
for key, expected in SAM.items():
    require(sam.get(key) == expected, f"facts: samRegistration.{key} must be {expected!r}, got {sam.get(key)!r}")
require(sam.get("naics") == NAICS, f"facts: samRegistration.naics must be {NAICS}")
require(
    sam.get("verification", {}).get("url") == SAM_VERIFY_URL,
    f"facts: SAM.gov verification link must be {SAM_VERIFY_URL}",
)

sba_by_code = {cert.get("code"): cert for cert in sba.get("certifications", [])}
require(
    set(sba_by_code) == set(SBA_CERTS),
    f"facts: SBA certifications must be exactly {sorted(SBA_CERTS)}, got {sorted(sba_by_code)}",
)
for code, expected in SBA_CERTS.items():
    cert = sba_by_code.get(code, {})
    for key, value in expected.items():
        require(cert.get(key) == value, f"facts: SBA {code} {key} must be {value!r}, got {cert.get(key)!r}")
require("VetCert" in sba.get("program", ""), "facts: SBA program must name VetCert")
sba_verify = sba.get("verification", {})
require(sba_verify.get("url") == SBA_VERIFY_URL, f"facts: SBA verification link must be {SBA_VERIFY_URL}")
require(sba_verify.get("profileUrl") == SBA_PROFILE_URL, f"facts: SBA profile link must be {SBA_PROFILE_URL}")
require(UEI in sba_verify.get("instructions", ""), "facts: SBA search instructions must give the UEI")

ca_by_code = {cert.get("code"): cert for cert in ca.get("certifications", [])}
require(
    set(ca_by_code) == set(CA_CERTS),
    f"facts: California certifications must be exactly {sorted(CA_CERTS)}, got {sorted(ca_by_code)}",
)
require(ca.get("certificationId") == CA_CERT_ID, f"facts: California certification ID must be {CA_CERT_ID}")
for code, expected in CA_CERTS.items():
    cert = ca_by_code.get(code, {})
    for key, value in expected.items():
        require(cert.get(key) == value, f"facts: California {code} {key} must be {value!r}, got {cert.get(key)!r}")
require(ca.get("verification", {}).get("url") == CA_VERIFY_URL, f"facts: Cal eProcure link must be {CA_VERIFY_URL}")
require(docs.get("capabilityStatement") == CAPABILITY_PDF, "facts: capability statement path is wrong")
require(docs.get("verificationSummary") == SUMMARY_PDF, "facts: verification summary path is wrong")
require(isinstance(awards, list), "facts: contractAwards.awards must be a list (empty means no award claims)")

held_certs = [
    cert
    for cert in [*sba.get("certifications", []), *ca.get("certifications", [])]
    if cert.get("status") in ACTIVE_STATUSES
]
held_text = " ".join(f"{cert.get('code', '')} {cert.get('name', '')}" for cert in held_certs)

# ---------------------------------------------------------------------------
# 2. Pages, metadata and PDF sources carry the facts.
# ---------------------------------------------------------------------------
home = read(HOME)
home_page = read(HOME_PAGE)
page = read(PAGE)
trust = read(TRUST_STRIP)
facts_ts = read(FACTS_TS)
shells = read(SHELLS)
sitemap = read(SITEMAP)
routes = load_json(ROUTES)

require("from './government.json'" in facts_ts, "content/government.ts must load content/government.json")

# The government page renders the facts module rather than retyping facts.
require("from '../content/government'" in page, "government page must import ../content/government")
for symbol in ("sbaCertifications", "samRegistration", "californiaCertifications", "identifiers", "documents", "naicsLine"):
    require(symbol in page, f"government page does not use facts symbol: {symbol}")
for needle in [
    "SBA-Certified SDVOSB and VOSB",
    "id=\"sba-certifications\"",
    "['Entrance', cert.entranceDate]",
    "['Renewal', cert.renewalDate]",
    "sbaVerify.url",
    "sbaVerify.instructions",
    "samVerify.url",
    "caVerify.url",
    "documents.capabilityStatement",
    "documents.verificationSummary",
    "View Capability Statement",
    "View Verification Summary",
    "SAM NAICS",
    "Available for statewide on-site support, subcontract work, and remote delivery.",
]:
    require(needle in page, f"government page missing required text: {needle}")
for unit_id in (UEI, CAGE, CA_CERT_ID, "09/30/2026", "09/30/2029"):
    require(
        unit_id not in page,
        f"government page hard-codes {unit_id}; read it from content/government.json instead",
    )

# The primary government CTA must be web-native, not a mail-client dependency.
require("mailto:bruce@bruceworks.net?subject" not in page, "government CTA still uses a mailto: URL")
require('to="/contact/?topic=government"' in page, "government CTA does not reach /contact/?topic=government")
require("Discuss an Opportunity" in page, "government page is missing the Discuss an Opportunity CTA")

# Home page trust strip shows SDVOSB from the facts file.
require("<GovernmentTrustStrip />" in home_page, "home page no longer renders GovernmentTrustStrip")
require("from '../content/government'" in trust, "GovernmentTrustStrip must import ../content/government")
require("SBA Certified {sbaCodes}" in trust, "GovernmentTrustStrip must show the SBA certifications (SDVOSB)")
require("SBA-certified SDVOSB" in trust, "GovernmentTrustStrip heading must name SDVOSB")

# Crawlable static summary reads the same facts.
require("content', 'government.json'" in shells, "generate-route-shells.mjs must read content/government.json")

# Route metadata for the built static shell.
gov_route = next(
    (route for route in routes.get("routes", []) if route.get("path") == "/government-capabilities/"),
    None,
)
require(gov_route is not None, "seo/routes.json has no /government-capabilities/ route")
if gov_route is not None:
    require(
        gov_route.get("title") == "Government Capabilities | Bruce Works LLC",
        "government route title is missing or incorrect",
    )
    description = gov_route.get("description", "")
    for needle in ("SBA-certified SDVOSB and VOSB", "SAM.gov", "All Awards", "DVBE", "Small Business (Micro)"):
        require(needle in description, f"government route description missing: {needle}")
    jsonld = gov_route.get("jsonld")
    require(bool(jsonld), "government route JSON-LD is missing")
    jsonld_text = json.dumps(jsonld, ensure_ascii=False)
    for needle in (
        "Service-Disabled Veteran-Owned Small Business (SDVOSB)",
        "Veteran-Owned Small Business (VOSB)",
        "both Active",
        "entrance 09/30/2026",
        "renewal 09/30/2029",
        SBA_PROFILE_URL,
        SAM_VERIFY_URL,
        CA_VERIFY_URL,
        UEI,
        CAGE,
        CA_CERT_ID,
    ):
        require(needle in jsonld_text, f"government route JSON-LD missing: {needle}")
    require(bool(gov_route.get("sitemap")), "government route is not marked for the sitemap")

require(
    "https://bruceworks.net/government-capabilities/" in sitemap,
    "sitemap does not include government-capabilities URL",
)
# The home title may change with the positioning, but it always leads with the exact legal brand.
require(
    re.search(r"<title>Bruce Works LLC \| [^<]+</title>", home) is not None,
    "homepage title must lead with the exact brand: 'Bruce Works LLC | …'",
)

# Organization JSON-LD in index.html.
organization = None
for block in validate_jsonld("homepage", home):
    for node in block.get("@graph", []) if isinstance(block, dict) else []:
        if node.get("@id") == "https://bruceworks.net/#organization":
            organization = node
require(organization is not None, "index.html: Organization JSON-LD node is missing")
if organization is not None:
    require(organization.get("legalName") == LEGAL_NAME, "index.html: Organization legalName is wrong")
    award_list = organization.get("award", [])
    for code, cert in SBA_CERTS.items():
        require(
            any(
                f"{cert['name']} ({code})" in award
                and "SBA" in award
                and cert["status"] in award
                and cert["entranceDate"] in award
                and cert["renewalDate"] in award
                for award in award_list
            ),
            f"index.html: Organization award list missing SBA {code} with status and dates",
        )
    for code, cert in CA_CERTS.items():
        require(
            any(cert["name"] in award and CA_CERT_ID in award for award in award_list),
            f"index.html: Organization award list missing California {code}",
        )
    ids = {item.get("propertyID"): item.get("value") for item in organization.get("identifier", [])}
    require(ids.get("Unique Entity ID (SAM)") == UEI, "index.html: UEI identifier is wrong")
    require(ids.get("CAGE Code") == CAGE, "index.html: CAGE identifier is wrong")
    require(ids.get("California Certification ID") == CA_CERT_ID, "index.html: California certification ID is wrong")

# PDF source content carries the facts (the PDFs are rendered from these).
PDF_INPUT_NEEDLES = {
    "capability-statement.input.json": [
        "SDVOSB", "VOSB", "Active", "09/30/2026", "09/30/2029",
        CA_CERT_ID, "07/01/2026", "06/30/2028", UEI, CAGE, " · ".join(NAICS),
    ],
    "certification-verification-summary.input.json": [
        "SDVOSB", "VOSB", "Active", "09/30/2026", "09/30/2029", SBA_VERIFY_URL, UEI,
        CA_CERT_ID, "07/01/2026", "06/30/2028", CA_VERIFY_URL,
        "not a certificate issued by the U.S. Small Business Administration or the California Department of General Services",
    ],
}
for path in PDF_INPUTS:
    text = " ".join(public_values(load_json(path), skip_private=True))
    for needle in PDF_INPUT_NEEDLES[path.name]:
        require(needle in text, f"{rel(path)}: missing required fact or wording {needle!r}")

# ---------------------------------------------------------------------------
# 3 + 4. Prohibited wording and unlisted claims, across everything public.
# ---------------------------------------------------------------------------
public_sources: dict[str, str] = {}
for pattern in ("pages/*.tsx", "components/*.tsx", "App.tsx", "index.html", "public/**/*.html"):
    for path in sorted(ROOT.glob(pattern)):
        public_sources[rel(path)] = path.read_text(encoding="utf-8")
public_sources[rel(ROUTES)] = ROUTES.read_text(encoding="utf-8") if ROUTES.is_file() else ""
public_sources[rel(SHELLS)] = shells
for path in PDF_INPUTS:
    if path.is_file():
        public_sources[rel(path)] = path.read_text(encoding="utf-8")
# The facts file is the authority for the guards; its _note/_source keys are
# maintainer notes, so only its public values are scanned for stale wording.
facts_public_text = " ".join(public_values(facts, skip_private=True))

for label, text in [*public_sources.items(), (rel(FACTS), facts_public_text)]:
    lowered = text.lower()
    for phrase in PROHIBITED_PHRASES:
        require(phrase.lower() not in lowered, f"{label}: contains prohibited wording: {phrase!r}")

for label, text in public_sources.items():
    for claim, pattern in CERT_CLAIM_GUARDS:
        if re.search(pattern, text, flags=re.IGNORECASE):
            require(
                re.search(pattern, held_text, flags=re.IGNORECASE) is not None,
                f"{label}: claims {claim}, which content/government.json does not list as Active/Approved",
            )
    match = re.search(AWARD_CLAIM_PATTERN, text, flags=re.IGNORECASE)
    if match:
        require(
            bool(awards),
            f"{label}: contract-award claim {match.group(0)!r} but content/government.json lists no contract awards",
        )

for pdf in PDFS:
    require(pdf.is_file(), f"missing PDF: {rel(pdf)}")
    if pdf.is_file():
        data = pdf.read_bytes()
        require(data.startswith(b"%PDF-"), f"not a PDF: {rel(pdf)}")
        require(len(data) > 20_000, f"PDF unexpectedly small: {rel(pdf)}")

if errors:
    print("Government capabilities verification FAILED:")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("Government capabilities verification PASSED")
print(f"- facts: {rel(FACTS)} (SBA {', '.join(SBA_CERTS)}; California {', '.join(CA_CERTS)}; SAM.gov {SAM['status']})")
print(f"- page: {rel(PAGE)}")
print(f"- trust strip: {rel(TRUST_STRIP)}")
print(f"- route metadata: {rel(ROUTES)}")
print(f"- sitemap: {rel(SITEMAP)}")
print(f"- scanned {len(public_sources) + 1} public sources for prohibited wording and unlisted claims")
for pdf in PDFS:
    print(f"- pdf: {rel(pdf)} ({pdf.stat().st_size} bytes)")
