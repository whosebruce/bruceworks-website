# Font Provenance and Licenses

All four families are open fonts released under the **SIL Open Font License 1.1 (OFL)**,
which permits bundling, redistribution, and embedding in documents. No proprietary or
unlicensed font is packaged.

| Family | Files | Upstream (OFL 1.1) |
|---|---|---|
| Big Shoulders Display | BigShouldersDisplay-700.ttf, -800.ttf | github.com/xotypeco/big_shoulders (Google Fonts) |
| Barlow | Barlow-Regular/Medium/SemiBold/Bold.ttf | github.com/jpt/barlow (Google Fonts) |
| Barlow Condensed | BarlowCondensed-SemiBold/Bold.ttf | github.com/jpt/barlow (Google Fonts) |
| IBM Plex Mono | PlexMono-Regular/Medium/SemiBold.ttf | github.com/IBM/plex (Google Fonts) |

**Local provenance:** these exact TTFs were copied from the live Hermes skill
`bruce-works-field-manual-docs/assets/fonts/` (itself packaged from Fable's approved CDPH
document bundle). SHA-256 checksums verified identical to the live skill on 2026-07-17;
the approved CDPH PDFs embed these same subsets (`BigShoulders-Thin`,
`IBMPlexMono-*`, `BarlowCondensed-*`, `Barlow-*`).

**Why static TTFs:** variable fonts embed as Type3 in Chrome's print-to-PDF and look
rasterized. These are static instances; `scripts/proof.py` fails any render that embeds
Type3 or unexpected families.

Note: the Big Shoulders static instances internally self-identify as `BigShoulders-Thin`
regardless of weight — that is the upstream name-table quirk, present in the approved
packet as well, not a wrong font.

## Theme fonts (2026-10-01)

The site's theme picker can re-skin every page. These four families are only downloaded when a visitor picks the
theme that uses them. All are SIL Open Font License 1.1, Latin subset, variable weight (WOFF2).

| Family | File | Theme | Upstream (OFL 1.1) |
|---|---|---|---|
| Public Sans | PublicSans-Variable.woff2 | Harbor | github.com/uswds/public-sans (via @fontsource-variable 5.3.0) |
| JetBrains Mono | JetBrainsMono-Variable.woff2 | Phosphor | github.com/JetBrains/JetBrainsMono (via @fontsource-variable 5.3.0) |
| Quicksand | Quicksand-Variable.woff2 | Midnight Plush | github.com/andrew-paglinawan/QuicksandFamily (Google Fonts) |
| Baloo 2 | Baloo2-Variable.woff2 | Midnight Plush | github.com/EkType/Baloo2 (Google Fonts) |
