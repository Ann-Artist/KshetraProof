# KshetraProof — UI Design System (`design.md`) · "Earth & Field" theme

Companion to `IMPLEMENTATION.md`. This file defines the visual language, tokens, components and page layouts for the KshetraProof prototype (React + Vite + Tailwind + React-Leaflet + Recharts + Lucide).

**Rule for the builder:** `IMPLEMENTATION.md` says *what* to build; this file says *how it should look*. Do not invent new colours, radii or fonts; use the tokens below.

**Theme revision:** the layout, component shapes and spacing come from the supplied reference dashboards (charcoal shell, white canvas, pastel cards, soft pill badges, list + map split). The **colour language is redesigned for a land-survey / revenue-department product**: forest green, crop green, soil and clay, wheat gold, parchment paper and canal blue, instead of the fintech blue/black/yellow of the references.

---

## 1. Design direction

### 1.1 Reference analysis (structure only)

| Reference | What we borrow | Used for |
|---|---|---|
| **Finance dashboard** | Dark rounded shell, white inner canvas, soft pill status chips, donut chart with centre total, greeting header | Dashboard progress donut, objections table, activity list |
| **Logistics "Add new package"** | Icon-only sidebar with white "notch" active tab, gradient hero cards, outlined status chips with dot, floating card over map, list rows with tinted icon tiles | Boundary Capture form, Parcel Details summary, parcel list + map |
| **LoadSwift "Transactions"** | Expanded sidebar with sub-menu and count badges, filter row, dense table, pagination, row action icons | Conflicts / Objections / Evidence tables |
| **LoadSwift "Loads: In-transit"** | Left list with progress line, segmented tabs, `Map / Satellite / Layers`, floating detail card, selected-row outline | Village Map, Officer Review |
| **Crypto "Overview"** | Pastel stat cards with icon tile, tinted chart card, dark call-out card with CTA | Dashboard stat cards, trend chart, "Simulated data" card |

### 1.2 Why "Earth & Field"

A land-record tool should feel like a **survey sheet and a farm**, not a trading app. The palette is taken from the subject matter:

| Real-world source | Colour role in the UI |
|---|---|
| Forest / cultivated canopy | App shell, sidebar, dark cards (deep green) |
| Growing crops / leaf green | Primary brand accent, verified status |
| Wheat, mustard, harvest gold | Highlight, active tabs, pending status |
| Parchment / survey paper | Page canvas and report background |
| Soil, clay, terracotta | Area-mismatch status, warm pastel tints |
| Brick / red-oxide | Disputed status, danger actions |
| Canal / river water | Old cadastral boundary, water layer, links |
| Slate ink | Text and boundary lines (like survey pens) |

### 1.3 Personality

- **Grounded, official, trustworthy.** Feels like a digitised cadastral sheet.
- **Soft-modern.** Large radii, pastel tints, generous whitespace, almost no hard shadows.
- **Dark green shell + parchment/white canvas.** The map is the visual hero.
- **Evidence-first.** Every simulated value is labelled; status is always colour **and** text **and** pattern.

### 1.4 One-line brief for the builder

> Deep-forest rounded shell, warm parchment canvas with white cards, crop-green primary, wheat-gold highlight, soil-and-clay pastel tints, warm-tinted basemap with semantic parcel colours, dashed survey lines, Inter + JetBrains Mono.

---

## 2. Design tokens

### 2.1 Colour palette

#### Neutrals (warm, earthy, never pure grey or pure black)

| Token | Hex | Use |
|---|---|---|
| `forest-950` | `#0F1F17` | Sidebar, primary button on light |
| `forest-900` | `#15291E` | App frame bezel, dark call-out cards |
| `forest-800` | `#1F3A2B` | Sidebar hover, dark card hover, dark-card outlines |
| `ink-900` | `#1E2419` | Primary text, proposed-boundary lines (slate ink) |
| `ink-600` | `#5B6355` | Secondary text |
| `ink-500` | `#7A8273` | Muted text, table headers, placeholders |
| `ink-300` | `#D3D6C8` | Control borders |
| `ink-200` | `#E6E5DA` | Card borders, dividers |
| `ink-100` | `#F0EEE4` | Input fill, search fill, row hover |
| `canvas` | `#F7F4EC` | Page background inside the shell (parchment) |
| `surface` | `#FFFFFF` | Cards, panels, tables |
| `backdrop-from` | `#DCE8D5` | Outer backdrop start (pale sage) |
| `backdrop-to` | `#F3E6BF` | Outer backdrop end (wheat cream) |

#### Brand and accents

| Token | Hex | Use |
|---|---|---|
| `brand-50` | `#EFF7EA` | Very light green tint, selected row background |
| `brand-100` | `#DCEBD2` | Tinted chart card, hover backgrounds |
| `brand-400` | `#A6D28A` | Accent on dark surfaces (buttons/text on forest) |
| `brand-500` | `#6FA85A` | Primary accent: active states, donut fill, focus ring |
| `brand-600` | `#4E8A3F` | Hover / pressed |
| `brand-700` | `#2F6B2F` | Text links, table ID links |
| `harvest-100` | `#FBEBC1` | Yellow tinted background, Simulated tag bg |
| `harvest-400` | `#F2B632` | Active tab, count badges, "attention" |
| `harvest-700` | `#7A5800` | Text on harvest tints |
| `water-500` | `#3B8DBD` | Canal/water layer, info accents |

#### Pastel card tints (stat cards and icon tiles)

| Token | Hex | Use for |
|---|---|---|
| `tint-sage` | `#DCEBD2` | Verified, surveyed |
| `tint-wheat` | `#F6EBC8` | Pending |
| `tint-clay` | `#F3DCCB` | Area mismatch, high-priority conflicts |
| `tint-rose` | `#F6DAD5` | Disputed |
| `tint-sky` | `#D8EAF3` | Total parcels, progress, water |
| `tint-lilac` | `#E8E1F1` | Villages, government land |

#### Semantic parcel and map colours (from `IMPLEMENTATION.md` §7.3)

| Meaning | Key | Stroke | Fill / badge bg | Badge text |
|---|---|---|---|---|
| Old boundary (canal blue) | `old` | `#2F6FB5` | `#DCE8F6` | `#1F4F8A` |
| Verified | `verified` | `#2F9E5B` | `#DDF1E3` | `#1B6B3C` |
| Pending | `pending` | `#D9A21B` | `#FBEFC6` | `#7A5800` |
| Disputed (red-oxide) | `disputed` | `#C23B3B` | `#F8DDDA` | `#9B2222` |
| Area mismatch (terracotta) | `mismatch` | `#D9782F` | `#FCE5D2` | `#9A4A10` |
| Government / common | `government` | `#7B5EA7` | `#E9E2F3` | `#563B85` |
| Proposed boundary (slate ink) | `proposed` | `#1E2419` | `#EFEDE3` | `#2A3025` |
| Approved | `approved` | `#1F7A5A` | `#D2EFE2` | `#135A41` |
| Field visit required | `fieldvisit` | `#2B8FB3` | `#D6ECF5` | `#17627E` |
| Water / canal (layer only) | `water` | `#3B8DBD` | `#D8EAF3` | `#17627E` |
| Road / track (layer only) | `road` | `#B9A98A` | — | — |

> **Proposed boundary** = dashed slate-ink line; **old boundary** = solid blue line. This is the survey-drawing convention and makes the P-101 mismatch obvious.

#### Feedback colours
`success #2F9E5B` · `warning #D9A21B` · `danger #C23B3B` · `info #2F6FB5`

### 2.2 Typography

- **UI font:** `Inter` (fallback `ui-sans-serif, system-ui`); weights 400/500/600/700.
- **Mono font:** `JetBrains Mono` for parcel IDs, marker IDs, coordinates, ULPIN, survey numbers.
- **Document serif (report page only):** `Source Serif 4` (fallback `Georgia, serif`) for the report title and section headings to give a "printed survey sheet" feel.
- **Devanagari fallback** (for future Hindi/Marathi labels): `'Noto Sans Devanagari'`.
- Tabular numbers everywhere: `font-variant-numeric: tabular-nums`.

| Style | Size / line-height | Weight | Use |
|---|---|---|---|
| `display` | 32 / 40 | 700 | Page title ("Overview"), login heading |
| `h1` | 24 / 32 | 700 | Section titles |
| `h2` | 18 / 26 | 600 | Card titles |
| `h3` | 15 / 22 | 600 | List-row titles |
| `stat` | 28 / 34 | 700 | Big numbers on stat cards |
| `body` | 14 / 22 | 400 | Default |
| `label` | 12 / 16 | 500 | Form labels, table headers |
| `caption` | 11 / 14 | 500 | Timestamps, chip text |
| `mono` | 13 / 20 | 500 | IDs, coordinates |

### 2.3 Spacing, radius, elevation

- Spacing: Tailwind 4-px scale. Page padding 24 px desktop / 16 px mobile; card padding 20 px; card gap 16–20 px.
- Radius: `rounded-3xl` (28) frame and hero cards · `rounded-2xl` (20) cards, map · `rounded-xl` (14) inputs, buttons, rows · `rounded-full` pills, avatars, badges.
- Borders: `1px solid ink-200` **or** soft shadow, never both.
- Shadows (warm-tinted):
  - `shadow-card`: `0 1px 2px rgba(30,36,25,.05), 0 8px 24px rgba(30,36,25,.07)`
  - `shadow-float`: `0 8px 32px rgba(15,31,23,.18)`
  - Selected list row: `ring-2 ring-brand-500`.

### 2.4 Iconography

Lucide React, stroke 1.75; sizes 20 (nav), 16 (inline), 18 (buttons). Icon tiles `40×40`, `rounded-xl`, tinted background with dark icon.

| Area | Icon | Area | Icon |
|---|---|---|---|
| Dashboard | `LayoutDashboard` | Evidence photo | `Camera` |
| Village map | `Map` | Boundary marker | `MapPin` |
| Parcels | `Grid2x2` | Drone | `Plane` |
| Boundary capture | `Crosshair` | Battery | `BatteryMedium` |
| Conflicts | `TriangleAlert` | Offline | `WifiOff` |
| Objections | `MessageSquareWarning` | Survey / land | `Sprout`, `Landmark` |
| Officer review | `ClipboardCheck` | Ruler / distance | `Ruler` |
| Devices | `RadioTower` | Logout | `LogOut` |
| Reports | `FileText` | Compass / north | `Compass` |

### 2.5 Survey motifs (what makes it feel like land survey)

Use sparingly, as decoration and identity, never in the way of data.

1. **Contour-line texture** on dark cards, login panel and empty states (subtle concentric topographic lines at 6–8% opacity in `forest-800` / `brand-400`).
2. **Survey graticule ticks** along map edges (coordinate labels in mono, 10 px).
3. **North arrow + scale bar** on every map and on the report map snapshot.
4. **Boundary-pillar marker icon** (small square pillar with cap) for `BM-…` markers.
5. **Dashed "chain" line** for proposed boundaries; **dotted "bund" line** for field bunds.
6. **Survey-sheet title block** on the report: Village · Taluka · District · Survey No. · Sheet No. · Scale · Date, in a bordered grid.
7. **Rotated "DEMO" stamp** (outlined harvest-gold text, −8°, 60% opacity) on report and evidence sample images.
8. **Logo mark:** a parcel polygon with a small survey pin at one corner, in `brand-400` on forest, or `forest-950` on cream.

Contour texture helper:

```css
.contour-bg {
  background-color: #15291E;
  background-image:
    repeating-radial-gradient(circle at 85% 110%, transparent 0 22px, rgba(166,210,138,.10) 22px 23px),
    repeating-radial-gradient(circle at 10% -10%, transparent 0 30px, rgba(166,210,138,.07) 30px 31px);
}
```

### 2.6 Motion

150 ms hover/press, 250 ms panels, easing `cubic-bezier(.2,.8,.2,1)`. Selecting a parcel → map `flyTo` (0.6 s). New RTK point → one-time ping ring. Respect `prefers-reduced-motion`.

---

## 3. Tailwind configuration

`client/tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: { 950: '#0F1F17', 900: '#15291E', 800: '#1F3A2B' },
        ink: {
          900: '#1E2419', 600: '#5B6355', 500: '#7A8273',
          300: '#D3D6C8', 200: '#E6E5DA', 100: '#F0EEE4',
        },
        canvas: '#F7F4EC',
        brand: {
          50: '#EFF7EA', 100: '#DCEBD2', 400: '#A6D28A',
          500: '#6FA85A', 600: '#4E8A3F', 700: '#2F6B2F',
        },
        harvest: { 100: '#FBEBC1', 400: '#F2B632', 700: '#7A5800' },
        water: { 500: '#3B8DBD' },
        tint: {
          sage: '#DCEBD2', wheat: '#F6EBC8', clay: '#F3DCCB',
          rose: '#F6DAD5', sky: '#D8EAF3', lilac: '#E8E1F1',
        },
        parcel: {
          old: '#2F6FB5', verified: '#2F9E5B', pending: '#D9A21B',
          disputed: '#C23B3B', mismatch: '#D9782F', government: '#7B5EA7',
          proposed: '#1E2419', approved: '#1F7A5A', fieldvisit: '#2B8FB3',
          water: '#3B8DBD', road: '#B9A98A',
        },
      },
      fontFamily: {
        sans: ['Inter', '"Noto Sans Devanagari"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      borderRadius: { '2xl': '20px', '3xl': '28px' },
      boxShadow: {
        card: '0 1px 2px rgba(30,36,25,.05), 0 8px 24px rgba(30,36,25,.07)',
        float: '0 8px 32px rgba(15,31,23,.18)',
      },
      backgroundImage: {
        backdrop: 'linear-gradient(135deg, #DCE8D5 0%, #EEF0DA 55%, #F3E6BF 100%)',
        'hero-gradient': 'linear-gradient(120deg, #E3EFD8 0%, #F4EDCB 55%, #D9EBF2 100%)',
      },
    },
  },
  plugins: [],
};
```

`client/src/index.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Source+Serif+4:wght@600;700&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

:root { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
body { @apply bg-canvas text-ink-900 antialiased; font-variant-numeric: tabular-nums; }

@layer components {
  .card        { @apply bg-white rounded-2xl shadow-card p-5; }
  .card-tinted { @apply rounded-2xl p-5; }
  .btn         { @apply inline-flex items-center justify-center gap-2 rounded-xl px-4 h-10 text-sm font-medium transition; }
  .btn-primary { @apply btn bg-forest-950 text-white hover:bg-forest-800; }
  .btn-accent  { @apply btn bg-brand-500 text-forest-950 hover:bg-brand-600 hover:text-white; }
  .btn-ghost   { @apply btn bg-white border border-ink-200 text-ink-900 hover:bg-ink-100; }
  .btn-danger  { @apply btn bg-parcel-disputed text-white hover:opacity-90; }
  .input       { @apply h-10 w-full rounded-xl bg-ink-100 px-3 text-sm placeholder:text-ink-500
                        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white; }
  .label       { @apply text-xs font-medium text-ink-500 mb-1 block; }
  .th          { @apply text-xs font-medium text-ink-500 text-left px-3 py-2; }
  .mono-id     { @apply font-mono text-[13px]; }
  .contour-bg  { background-color: #15291E;
    background-image:
      repeating-radial-gradient(circle at 85% 110%, transparent 0 22px, rgba(166,210,138,.10) 22px 23px),
      repeating-radial-gradient(circle at 10% -10%, transparent 0 30px, rgba(166,210,138,.07) 30px 31px); }
}
```

---

## 4. App shell

### 4.1 Outer frame
- Login and screenshot contexts: page background `bg-backdrop` (pale sage → wheat cream) with the app inside a `rounded-3xl` `forest-900` bezel (10–12 px).
- In-app: bezel dropped below 1024 px; on desktop keep a 12 px margin and rounded frame so PPT screenshots resemble the references.

### 4.2 Layout grid

```
┌──────────┬─────────────────────────────────────────────────────┐
│ Sidebar  │ Header: search · Demo chip · bell · role · user     │
│ (forest) ├─────────────────────────────────────────────────────┤
│          │ Canvas: parchment (#F7F4EC) with white cards        │
│          │ 12-col grid, gap 20px, padding 24px                 │
└──────────┴─────────────────────────────────────────────────────┘
```

Sidebar width 88 px (rail) or 248 px (expanded). Default: expanded ≥ 1280, rail 1024–1279, bottom tab bar < 768.

### 4.3 `Sidebar.jsx`

**Rail variant (icon-only)**
- `forest-950`, `rounded-3xl`, width 88. Logo tile top (44×44, cream `#F6EBC8`, parcel-pin glyph in `forest-950`).
- Nav icons 44×44. **Active = surface-coloured pill that notches into the canvas** (`bg-canvas`, `rounded-l-2xl`, dark icon). Inactive `text-brand-100/70`, hover `bg-forest-800`.
- Logout at bottom.

**Expanded variant**
- `forest-950`, width 248. Top: org tile (cream logo + "KshetraProof" / "Rampur Village").
- Item `h-10 rounded-xl`; active `bg-harvest-400 text-forest-950` (wheat-gold); hover `bg-forest-800`.
- Sub-menu: indented with a thin `forest-800` rail; active child text `brand-400`.
- Count badges: `bg-harvest-400 text-forest-950 rounded-md` 11 px bold.
- Bottom: user card (avatar, name, role) + logout.
- Faint `contour-bg` texture at the bottom 30% of the sidebar.

Nav order: Dashboard · Village Map · Parcels (All · Verified · Pending · Disputed) · Boundary Capture *(surveyor)* · Conflicts `badge` · Objections `badge` · Officer Review *(officer/admin)* · Devices · Reports.

### 4.4 `Header.jsx`
- Greeting on Dashboard ("Namaste, **Surveyor** 👋 — *Rampur village survey*"); page title elsewhere.
- Search pill: `bg-white`, `rounded-full`, `h-11`, placeholder "Search parcel, survey no., owner…".
- Right: **`Demo build` chip** (harvest tint), bell with count dot, **role switcher pill** (`bg-forest-950 text-white`, Surveyor ▾), avatar + name.

---

## 5. Core components

### 5.1 `StatCard.jsx`
Pastel tinted card (from "Your Assets").

```
┌───────────────────────────┐
│ 128            ⋮          │  ← .stat number
│ Total parcels             │  ← label, ink-600
│ [icon tile]      +4 today │
└───────────────────────────┘
```

- min-width 200 px, `rounded-2xl`, `p-5`, tint background; icon tile `40×40 bg-white rounded-xl`.
- Mobile: horizontal scroll row (`overflow-x-auto snap-x`).

| Stat | Tint | Icon |
|---|---|---|
| Total villages | `lilac` | `Landmark` |
| Total parcels | `sky` | `Grid2x2` |
| Surveyed parcels | `sky` | `Ruler` |
| Verified parcels | `sage` | `BadgeCheck` |
| Pending parcels | `wheat` | `Clock` |
| Disputed parcels | `rose` | `Scale` |
| High-priority conflicts | `clay` | `TriangleAlert` |

### 5.2 `StatusBadge.jsx`
- **Soft pill** (tables): `rounded-full px-3 h-6 text-xs font-medium`, 6 px dot, bg/text from §2.1.
- **Outlined chip** (dense list rows): `rounded-md border border-ink-300 bg-white px-2 h-6 text-[11px]`, coloured dot only.

```jsx
const STATUS = {
  verified:    { label: 'Verified',             tone: 'verified' },
  pending:     { label: 'Pending verification', tone: 'pending' },
  conflict:    { label: 'Boundary conflict',    tone: 'mismatch' },
  disputed:    { label: 'Disputed',             tone: 'disputed' },
  approved:    { label: 'Approved',             tone: 'approved' },
  field_visit: { label: 'Field visit required', tone: 'fieldvisit' },
  government:  { label: 'Government land',      tone: 'government' },
  submitted:   { label: 'Submitted',            tone: 'old' },
  under_review:{ label: 'Under review',         tone: 'pending' },
  resolved:    { label: 'Resolved',             tone: 'verified' },
  rejected:    { label: 'Rejected',             tone: 'disputed' },
};
```

Priority: `high` → disputed tone, `medium` → mismatch tone, `low` → neutral (`ink-100` / `ink-600`).

### 5.3 Buttons

| Type | Style | Example |
|---|---|---|
| Primary | `forest-950` bg, white text | Capture point, Download report |
| Accent | `brand-500` bg, dark-green text | Run analysis, selected quick action |
| Ghost | White, `ink-200` border | Export, Filters |
| Icon | `40×40` round; forest bg + white icon, or white with border | Row actions |
| Danger | `parcel-disputed` bg | Mark disputed, Reject (always confirmed) |

Quick-action pills (from the finance "Transfer / Utility / Taxes" row): `rounded-2xl`, white, icon tile left; primary one filled `brand-500`. Use on Parcel Details: *Capture point · View evidence · Submit objection · Officer review · Download report*.

### 5.4 Cards
- **Default:** white, `rounded-2xl`, `shadow-card`, title row (`h2`, muted "See all" or `⋮`).
- **Gradient hero:** `bg-hero-gradient` (sage → wheat → water-mist), `rounded-3xl`, `p-6`. For Boundary Capture form, Parcel summary, Device status.
- **Tinted chart card:** `bg-brand-100`, holds line/area chart with dark tooltip pill.
- **Dark call-out:** `contour-bg text-white rounded-3xl p-6`; headline with one word in a pill (**`Simulated`** in harvest-gold); CTA `bg-brand-400 text-forest-950`. For the "Demo data" explainer and hardware readiness.

### 5.5 Form inputs
- Fill style: `bg-ink-100 rounded-xl h-10`; focus → white + `ring-2 ring-brand-500`.
- Inside gradient hero cards: white inputs, with a forest square arrow-submit button on the right (Marker ID entry).
- Labels above, 12 px muted. Errors: `danger` text + `ring-parcel-disputed/40`.
- Photo drop area: `rounded-2xl`, dashed `ink-300`, camera tile, thumbnail preview.
- React Hook Form for all forms.

### 5.6 Tables
- White `rounded-2xl`; filter row above (search, selects, `Filters`, `Export`, primary action).
- Header: muted 12 px, sort chevrons, no fill. Rows `h-14`, hairline `ink-100`, hover `bg-canvas`, selected `bg-brand-50`.
- ID column: 28×28 `ink-100` tile + `mono-id`; link IDs in `brand-700`.
- Action column: 32×32 outlined `Eye` button, tooltip pill "View more" (forest bg).
- Footer: `← Previous` · pages (active outlined `brand-500`) · `Next →`. Count chip beside title (harvest square).
- Mobile: rows → stacked cards.

### 5.7 List rows with progress line (Village Map, Parcels)

```
┌───────────────────────────────────────────────────────┐
│ ▣ P-101          Owner: Ramesh Kumar  [• Conflict]    │
│ Recorded 2.00 ac ──●────────▸ Measured 1.85 ac        │
└───────────────────────────────────────────────────────┘
```

- `rounded-xl`, white, `p-3`; selected `ring-2 ring-brand-500`.
- Progress line marker position = % difference; line turns terracotta above 5%.
- Tabs above: `All · Verified · Pending · Disputed` — active tab **wheat-gold** (`harvest-400`, dark text), inactive white with border.

### 5.8 `EvidenceCard.jsx`
Photo (4/3, `rounded-xl`) with corner ribbon `Sample photo`; below: marker ID (`mono-id`, `brand-700`), point-code circle (`A`, forest bg), timestamp, captured-by, accuracy + `SimTag`. Grid 1/2/3 columns.

### 5.9 `DeviceStatus.jsx`
Gradient hero card with outlined status chip top-right.

| Metric | Value | Visual |
|---|---|---|
| Smart pole | Connected | green dot |
| RTK receiver | Simulated fixed | green dot + `SimTag` |
| Accuracy | 0.03 m | mono + `SimTag` |
| Battery | 78% | 5-segment bar |
| Network | Offline mode | `WifiOff`, amber dot |

Battery: >50 green, 20–50 amber, <20 red. Bottom row "Last sync" styled like Departure → Arrival (dashed line, pin).

### 5.10 Charts (Recharts)
- No borders, light grid (`ink-100`), muted 11 px axis labels, no axis lines.
- Tooltip: forest-950 pill, white text, `rounded-lg`.

| Chart | Type | Colours |
|---|---|---|
| Survey progress | Donut, centre total, rounded ends | Surveyed `brand-500`, remaining `forest-900` |
| Conflict types | Horizontal bar / donut | `parcel.*` colour per type |
| Verification trend | Smooth area in `brand-100` card | Line `brand-700`, fill `brand-500 → transparent` |
| Status split | Stacked bar per village | verified / pending / disputed / mismatch |

Below the donut: **Recent activity** list (icon tile, title, muted time).

---

## 6. Map design (`ParcelMap.jsx`)

### 6.1 Basemap
- Default: light, muted, **warm-tinted** tiles: CARTO Positron with CSS filter on the tile pane: `.leaflet-tile-pane { filter: sepia(.18) saturate(.85) hue-rotate(-8deg); }` so the ground reads as paper.
- Segmented control top-right: **`Map | Satellite`** (active = wheat-gold) + `Layers` popover:
  - Old cadastral boundary · Proposed boundary · RTK points · Boundary markers · Roads · Canals / water · Government land · Drone orthomosaic *(Simulated)*
- Satellite: Esri World Imagery, labelled "Sample imagery".

### 6.2 Parcel styling

| Layer | Stroke | Weight | Fill | Dash |
|---|---|---|---|---|
| Old boundary | `old` | 2 | none | solid |
| Proposed boundary | `proposed` | 2.5 | `#1E2419` @ 6% | `8 6` |
| Verified | `verified` | 2 | @ 28% | solid |
| Pending | `pending` | 2 | @ 28% | solid |
| Disputed | `disputed` | 3 | @ 32% + diagonal hatch | solid |
| Area mismatch | `mismatch` | 3 | @ 30% + dotted overlay | solid |
| Government / common | `government` | 2 | @ 24% | solid |
| Canal / water | `water` | 2 | `#D8EAF3` | solid |
| Roads / tracks | `road` | 2 | none | `2 4` |
| Selected | same | +1.5 | +8% | white halo underneath |
| Hovered | same | +1 | +6% | — |

### 6.3 Markers
- **RTK point:** 14 px white circle, forest 3 px ring, green centre dot when fixed; point-code bubble above (`A`, `B`).
- **Boundary marker `BM-…`:** boundary-pillar icon, 28×28 forest square with white cap glyph; selected → `brand-500` ring.
- **New capture:** single ping animation.
- **Surveyor / rover:** blue dot with 24 px translucent halo.
- **Smart pole:** forest circle with white `RadioTower`.

### 6.4 Floating info card
- Top-left desktop, bottom sheet on mobile; `bg-white rounded-2xl shadow-float p-4 w-[340px]`.
- Header: `P-101` (`mono-id`) + copy + collapse. Segmented (wheat-gold active): **Parcel info | Survey info**.
- Rows: Survey no., Owner (record), Recorded area, Measured area, Difference (terracotta if > 5%), Status badge, Accuracy + `SimTag`.
- Footer: primary *Open parcel*, ghost *Capture point*.
- Leaflet popups: white pill with outlined status chip.

### 6.5 Legend, north arrow, scale
- Legend bottom-left: `bg-white/90 backdrop-blur rounded-xl p-3 shadow-float`; swatch (stroke + fill/pattern) + label for every entry in §6.2. Collapsible on mobile.
- **North arrow** top-right below the Map/Satellite toggle; **scale bar** bottom-left above legend; graticule ticks along edges.
- Zoom `+ / −`, locate, fit-village: stacked white `rounded-xl` buttons bottom-right.

### 6.6 Village Map layout

```
┌──────────────────────┬──────────────────────────────────────────┐
│ Parcels (list)       │           MAP (fills height)              │
│ tabs · search        │  ┌ floating parcel card ┐  Map|Satellite  │
│ ▣ P-101 ...          │  └──────────────────────┘  Layers  N↑     │
│ ▣ P-102 ...          │                                           │
│ [ + Capture point ]  │  legend · scale               + / − ⌖     │
└──────────────────────┴──────────────────────────────────────────┘
```

List panel `w-[380px]`, sticky forest primary button at bottom. Selecting a row selects the polygon, opens the card, `flyTo`. Mobile: full-screen map, list as bottom sheet.

### 6.7 Old-vs-proposed comparison
Side-by-side or swipe slider: "Old map" (blue solid) vs "Proposed (Simulated survey)" (ink dashed). Vertex shift arrows with distance chips (`0.42 m`); overlap in terracotta hatch; caption "Measured 1.85 ac vs recorded 2.00 ac · Δ 0.15 ac (7.5%)".

### 6.8 Simulated / Demo / Mock labelling (mandatory)

```jsx
<span className="inline-flex items-center gap-1 rounded-md bg-harvest-100 text-harvest-700
                 border border-harvest-400/60 px-1.5 h-5 text-[10px] font-semibold uppercase tracking-wide">
  Simulated
</span>
```

1. Every RTK value, accuracy figure, drone imagery, telemetry value and sample photo carries a `SimTag` (`Simulated` / `Mock` / `Demo`).
2. Global `Demo build — fictional data` chip in the header.
3. Login and report footer repeat the §20 disclaimers.
4. Simulated accuracy never uses "certified" styling (no green checks); neutral ink + gold tag.
5. Sample images get a corner ribbon and the rotated DEMO stamp.

---

## 7. Page-by-page layouts

### 7.1 Login
- `bg-backdrop`; centre split card, `rounded-3xl`, ~960×560.
  - **Left (`contour-bg`):** logo tile, headline "Survey. Verify. Resolve." in white, one sentence about the prototype, a dashed parcel outline with a `harvest-400` pin, `Demo build` tag.
  - **Right (white):** "Welcome back"; fields Email · Password · Role (segmented pills Surveyor · Officer · Admin; selected = forest); primary "Sign in"; muted mono box with demo credentials `surveyor@demo.com / demo123` · `officer@demo.com / demo123`; disclaimer footer.

### 7.2 Dashboard

```
Row 1  "Overview" (display)                          [Village: Rampur ▾]
Row 2  [Progress card — brand-100]   [Stat][Stat][Stat] (scroll)
Row 3  [Conflict-type chart]  [Recent parcels table]  [Dark call-out: Demo data]
Row 4  [Donut: survey progress + recent activity]
```

Call-out card: "Hardware is **Simulated**", copy "Drone, RTK and smart-pole values are mocked for this demo.", CTA **View devices**.

### 7.3 Village Map
See §6.6. Add a stat strip above the list (*Parcels 5 · Disputed 1 · Pending 2*) and an accent **Run conflict analysis** button.

### 7.4 Parcel Details

```
┌─────────────────────────────────────────────┬────────────────────────┐
│ Hero card (gradient):                       │  Map (comparison)      │
│  P-101 · Survey no. 101      [• Conflict]   │  old = blue solid      │
│  ULPIN DEMO-ULPIN-101                       │  proposed = dashed ink │
│  Recorded ──── Δ ──── Measured              │  BM-101-A pin          │
│  Owner · Land type · Accuracy(Sim) · Date   │                        │
├─────────────────────────────────────────────┤                        │
│ Quick actions (5 pills)                     │                        │
├─────────────────────────────────────────────┴────────────────────────┤
│ Tabs: Boundary points | Evidence | Objections | History              │
└──────────────────────────────────────────────────────────────────────┘
```

Hero: recorded → measured drawn like Departure → Arrival with dashed line and mid pin; difference pill `0.15 ac (7.5%)` in terracotta. Tabs are pills (active forest or wheat-gold). **History** = vertical timeline (dot on `ink-200` line, event title, actor + role, timestamp, version chip `v3`; latest dot `brand-500` with halo).

### 7.5 Boundary Capture
- Top: `DeviceStatus` gradient card, full width.
- Two columns: **Left** hero form card (Parcel ID, Marker ID with arrow-submit, Point ID, Latitude, Longitude, Accuracy read-only + `SimTag`, RTK status chip, Note, Photo; buttons *Simulate RTK reading* (accent) and *Capture point* (primary)). **Right** map with dashed-ring pending marker that turns solid and pings on success.
- Bottom: captured points list (`A → BM-101-A → 0.03 m • Fixed`).
- Success toast: forest pill with green check, "Boundary point captured successfully".
- Field-tablet sizing: `h-12` inputs, larger buttons.

### 7.6 Conflicts
Filter row + table. Columns: **Conflict ID · Parcel · Type · Recorded · Measured · Difference · Priority · Status · Required action · View**. Difference in mono, terracotta if > 5%. Row click → right drawer (`w-[420px]`, `rounded-l-3xl`) with mini old/proposed map and recommended action.

### 7.7 Objections
Left: submission form card. Right: table of objections with pills (Submitted blue, Under review gold, Field verification sky, Resolved green, Rejected red-oxide). Rows: initials avatar, name, date, status, parcel ID.

### 7.8 Officer Review

```
┌────────────────────────┬───────────────────────────────────────────┐
│ Pending reviews        │ Comparison map (Old | Proposed)           │
│ ▣ P-101 (selected)     ├───────────────────────────────────────────┤
│ ▣ P-104                │ Evidence strip (photos, RTK points)       │
│                        ├───────────────────────────────────────────┤
│                        │ Owner record · Mutation · Registration    │
│                        │ Objections · Surveyor notes               │
└────────────────────────┴───────────────────────────────────────────┘
Sticky action bar:
[Approve proposed boundary] [Request field visit] [Mark disputed] [Reject change] [Refer to legal process]
```

Approve = forest primary; Request field visit = accent green; Mark disputed = danger; Reject = ghost with red text; Refer to legal = ghost. Every action opens a **confirmation dialog** (`rounded-3xl`, backdrop `forest-950/40 blur`) requiring a comment; footer: "This action will create a parcel-history entry." Persistent note: "Conflict detection is not an ownership decision."

### 7.9 Devices
Grid of gradient device cards (drone, RTK rover, smart pole, field tablet) with `SimTag`, last sync, battery bar, "Send test telemetry". Drone mission card: `M-001`, 128 images, survey date, sample orthomosaic thumbnail, progress ring.

### 7.10 Parcel Report (survey-sheet style)
- Sheet: white `rounded-2xl` on `canvas`, max-width 820 px, thin double border in `ink-200` for a printed-sheet look.
- Title in `font-serif`. **Title block** grid: Village · Taluka · District · Survey No. · Sheet No. · Scale · Date.
- 2-column key-value sections, map snapshot with north arrow and scale bar, tables for boundary points and evidence counts.
- Rotated **DEMO** stamp top-right.
- Disclaimer callout (`harvest-100` bg, harvest border) with the verbatim text:

```text
This is a survey and verification report for demonstration purposes.
It is not a legal title certificate and does not replace an official
revenue-department decision.
```

- Sticky toolbar: `Download PDF` (primary), `Print` (ghost). Print CSS: white background, hide sidebar/header.

---

## 8. States and feedback

| State | Treatment |
|---|---|
| Loading | Skeletons `bg-ink-100 animate-pulse rounded-xl` matching final layout; map placeholder with spinner |
| Empty | Pastel circle icon, title, one-line help, primary CTA; faint contour texture |
| Error | `tint-rose` card, `TriangleAlert`, API `message`, `Retry` ghost button |
| Success | Forest pill toast, bottom-centre, 3 s |
| Confirmation | Modal for every status change / officer decision |
| Offline mode | Wheat strip at top: "Offline mode — data will sync when network returns (Simulated)" |

---

## 9. Responsive behaviour

| Breakpoint | Behaviour |
|---|---|
| ≥ 1280 | Expanded sidebar, 12-col grid, list + map split |
| 1024–1279 | Rail sidebar, list panel 320 px |
| 768–1023 | Sidebar becomes drawer; map above list |
| < 768 | Bottom tab bar (Dashboard · Map · Capture · Conflicts · More), scrolling stat cards, tables → cards, floating card → bottom sheet, modals → sheets |

Touch targets ≥ 44 px on mobile; the Capture page is designed for a field tablet.

---

## 10. Accessibility

- Contrast ≥ 4.5:1: dark text on pastel/gold fills; never white on `harvest-400` or `brand-500`.
- Status is never colour-only: badge = dot + label; polygons also use hatch/dot patterns; legend labels.
- Focus ring `ring-2 ring-brand-500 ring-offset-2` (`ring-brand-400` inside the sidebar).
- Icon-only buttons need `aria-label` + tooltip.
- Charts: `aria-label` summary and `sr-only` data table.
- Parcel list is the keyboard-accessible equivalent of map polygons.
- Respect `prefers-reduced-motion`.
- Outdoor use: verify legibility in bright sunlight (field tablet) by keeping text on white/parchment, avoiding low-contrast pastel-on-pastel.

---

## 11. Content and tone

- Neutral, factual, non-legal. Use **Measured area**, **Recorded area**, **Proposed boundary**, **Field verification required**.
- Never use "Ownership confirmed", "Legal boundary", "Certified accuracy".
- Dates `28 Sep 2026, 09:00`; areas `2.00 ac`; coordinates 6 decimals mono; distances metres, 2 decimals.
- Use the fictional Rampur data from `IMPLEMENTATION.md` §3 for all placeholders.

---

## 12. Component → file mapping

| File | Spec |
|---|---|
| `Layout.jsx` | §4.1–4.2 |
| `Sidebar.jsx` | §4.3 |
| `Header.jsx` | §4.4 |
| `StatCard.jsx` | §5.1 |
| `StatusBadge.jsx` | §5.2 |
| `ParcelMap.jsx` | §6 |
| `DeviceStatus.jsx` | §5.9 |
| `EvidenceCard.jsx` | §5.8 |
| *(new)* `SimTag.jsx` | §6.8 |
| *(new)* `ConfirmDialog.jsx` | §8 |
| *(new)* `DataTable.jsx` | §5.6 |
| *(new)* `Timeline.jsx` | §7.4 |
| *(new)* `MapLegend.jsx`, `NorthArrow.jsx` | §6.5 |

---

## 13. Design checklist

- [ ] Tailwind config, `index.css`, fonts (Inter, JetBrains Mono, Source Serif 4) added.
- [ ] Forest sidebar with notch-style active state (rail) or wheat-gold active (expanded); badges on Conflicts/Objections.
- [ ] Parchment canvas with white cards; forest bezel on desktop.
- [ ] Stat cards use earthy pastel tints; status = pill with dot + text.
- [ ] Map: warm-tinted basemap, old = solid blue, proposed = dashed ink, status colours + patterns, legend, north arrow, scale bar.
- [ ] Floating parcel card and `Map | Satellite | Layers` on Village Map.
- [ ] Charts with forest tooltip pills, donut with centre total.
- [ ] `SimTag` beside every simulated value; `Demo build` chip in header; DEMO stamp on report/samples.
- [ ] Confirmation dialogs on all officer decisions and status changes.
- [ ] Loading, empty and error states on every page.
- [ ] Checked at 1440, 1024, 768 and 390 px.
- [ ] Report prints cleanly with verbatim disclaimer and title block.

---

## 14. Do / Don't

**Do**
- Let the map dominate; use parcel colours only for meaning.
- Use earthy pastels for information, forest and gold for actions and focus.
- Show units and labels beside every number.
- Use survey motifs (contours, north arrow, dashed chain lines) as identity, lightly.

**Don't**
- Don't reintroduce fintech blues, neon or pure black/white extremes.
- Don't add extra brand colours or heavy shadows.
- Don't use red/green alone to signal state.
- Don't show simulated accuracy without a `Simulated` label.
- Don't imply legal ownership decisions anywhere in the UI.
- Don't use text smaller than 12 px except chip captions.
