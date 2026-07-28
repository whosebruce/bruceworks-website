#!/usr/bin/env python3
"""Deterministic checks for Bruce Works government-capabilities publication.

The government page is the shared React page pages/GovernmentCapabilities.tsx;
its route metadata and JSON-LD live in seo/routes.json and are written into
the built static shell by scripts/generate-route-shells.mjs.
"""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
HOME = ROOT / "index.html"
PAGE = ROOT / "pages" / "GovernmentCapabilities.tsx"
ROUTES = ROOT / "seo" / "routes.json"
SITEMAP = ROOT / "public" / "sitemap.xml"
PDFS = [
    ROOT / "public" / "documents" / "Bruce-Works-LLC-Capability-Statement.pdf",
    ROOT / "public" / "documents" / "Bruce-Works-LLC-Certification-Verification-Summary.pdf",
]

errors: list[str] = []


def require(condition: bool, message: str) -> None:
    if not condition:
        errors.append(message)


def read(path: Path) -> str:
    require(path.is_file(), f"missing file: {path.relative_to(ROOT)}")
    return path.read_text(encoding="utf-8") if path.is_file() else ""


def validate_jsonld(label: str, html: str) -> None:
    blocks = re.findall(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        html,
        flags=re.IGNORECASE | re.DOTALL,
    )
    require(bool(blocks), f"{label}: missing JSON-LD")
    for index, block in enumerate(blocks, start=1):
        try:
            json.loads(block)
        except json.JSONDecodeError as exc:
            errors.append(f"{label}: invalid JSON-LD block {index}: {exc}")


home = read(HOME)
page = read(PAGE)
sitemap = read(SITEMAP)
routes_raw = read(ROUTES)

for text in (home, page):
    require("Bruce Works LLC" in text, "Bruce Works LLC exact legal name is missing")

required_page_text = [
    "Certification ID",
    "2053352",
    "DVBE",
    "SB (Micro)",
    "07/01/2026",
    "06/30/2028",
    "Registration submitted · activation pending",
    "SDVOSB/VOSB not claimed until SBA VetCert approval",
    "https://caleprocure.ca.gov/pages/PublicSearch/supplier-search.aspx",
    "/documents/Bruce-Works-LLC-Capability-Statement.pdf",
    "/documents/Bruce-Works-LLC-Certification-Verification-Summary.pdf",
]
for needle in required_page_text:
    require(needle in page, f"government page missing required text: {needle}")

for prohibited in ["SAM active", "SAM.gov active", "SDVOSB certified", "government-issued certificate PDF"]:
    require(prohibited.lower() not in page.lower(), f"government page contains prohibited claim: {prohibited}")

# The primary government CTA must be web-native, not a mail-client dependency.
require("mailto:bruce@bruceworks.net?subject" not in page, "government CTA still uses a mailto: URL")
require('to="/contact/?topic=government"' in page, "government CTA does not reach /contact/?topic=government")
require("Discuss an Opportunity" in page, "government page is missing the Discuss an Opportunity CTA")

# Route metadata for the built static shell.
routes = json.loads(routes_raw) if routes_raw else {}
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
    require(bool(gov_route.get("description")), "government route description is missing")
    require(bool(gov_route.get("jsonld")), "government route JSON-LD is missing")
    require(bool(gov_route.get("sitemap")), "government route is not marked for the sitemap")

require(
    "https://bruceworks.net/government-capabilities/" in sitemap,
    "sitemap does not include government-capabilities URL",
)
require(
    "<title>Bruce Works LLC | Private AI & Workflow Systems</title>" in home,
    "homepage exact-brand SEO title is missing",
)

validate_jsonld("homepage", home)

for pdf in PDFS:
    require(pdf.is_file(), f"missing PDF: {pdf.relative_to(ROOT)}")
    if pdf.is_file():
        data = pdf.read_bytes()
        require(data.startswith(b"%PDF-"), f"not a PDF: {pdf.relative_to(ROOT)}")
        require(len(data) > 20_000, f"PDF unexpectedly small: {pdf.relative_to(ROOT)}")

if errors:
    print("Government capabilities verification FAILED:")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("Government capabilities verification PASSED")
print(f"- page: {PAGE.relative_to(ROOT)}")
print(f"- route metadata: {ROUTES.relative_to(ROOT)}")
print(f"- sitemap: {SITEMAP.relative_to(ROOT)}")
for pdf in PDFS:
    print(f"- pdf: {pdf.relative_to(ROOT)} ({pdf.stat().st_size} bytes)")
