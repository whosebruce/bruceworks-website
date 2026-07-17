#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
errors: list[str] = []

tsx_files = sorted(ROOT.rglob("*.tsx"))
phone_collectors = []
for path in tsx_files:
    text = path.read_text(encoding="utf-8")
    if re.search(r'type\s*=\s*["\']tel["\']', text) or re.search(r'name\s*=\s*["\']phone["\']', text):
        phone_collectors.append(path.relative_to(ROOT).as_posix())

if phone_collectors != ["components/PhoneAndSmsConsent.tsx"]:
    errors.append(
        "All React phone fields must live in components/PhoneAndSmsConsent.tsx; found: "
        + ", ".join(phone_collectors)
    )

usage_files = []
for path in tsx_files:
    text = path.read_text(encoding="utf-8")
    if re.search(r"<PhoneAndSmsConsent\s", text):
        usage_files.append(path.relative_to(ROOT).as_posix())

expected_usage = ["components/ContactCTA.tsx", "pages/AILeverageAudit.tsx"]
if usage_files != expected_usage:
    errors.append(
        "Expected shared consent component on every known phone form; found usages: "
        + ", ".join(usage_files)
    )

component = (ROOT / "components/PhoneAndSmsConsent.tsx").read_text(encoding="utf-8")
for required in [
    "yes_informational_sms",
    "no_sms_calls_only",
    "Privacy Policy",
    "Messaging Terms &amp; Conditions",
    "sms_disclosure_version",
    "sms_source_page",
    "sms_preference_recorded_at",
    "Reply HELP",
    "STOP to opt out",
]:
    if required not in component:
        errors.append(f"Shared consent component is missing required marker: {required}")

static_consent_path = ROOT / "public/sms-consent/index.html"
static_policy_path = ROOT / "public/privacy-policy/index.html"
if not static_consent_path.exists():
    errors.append("Missing crawlable /sms-consent/ page")
else:
    static_consent = static_consent_path.read_text(encoding="utf-8")
    for required in [
        'type="tel"',
        "yes_informational_sms",
        "no_sms_calls_only",
        "/privacy-policy/",
        'id="messaging-terms"',
        "No option is selected",
    ]:
        if required not in static_consent:
            errors.append(f"Static consent page is missing required marker: {required}")

if not static_policy_path.exists():
    errors.append("Missing crawlable /privacy-policy/ page")
else:
    static_policy = static_policy_path.read_text(encoding="utf-8")
    for required in [
        "Mobile opt-in information and consent are never shared",
        "HELP",
        "STOP",
        "Message and data rates may apply",
        "/sms-consent/",
    ]:
        if required not in static_policy:
            errors.append(f"Static privacy page is missing required marker: {required}")

if errors:
    print("SMS compliance check FAILED:")
    for error in errors:
        print(f"- {error}")
    sys.exit(1)

print("SMS compliance check passed")
print("React phone collector: components/PhoneAndSmsConsent.tsx")
print("Consent component routes: " + ", ".join(usage_files))
print("Crawlable routes: /sms-consent/ and /privacy-policy/")
