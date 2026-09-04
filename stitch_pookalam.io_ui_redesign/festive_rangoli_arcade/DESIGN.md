---
name: Festive Rangoli Arcade
colors:
  surface: '#131127'
  surface-dim: '#131127'
  surface-bright: '#39364e'
  surface-container-lowest: '#0d0b21'
  surface-container-low: '#1b192f'
  surface-container: '#1f1d33'
  surface-container-high: '#29273e'
  surface-container-highest: '#34324a'
  on-surface: '#e4dffe'
  on-surface-variant: '#d5c4ab'
  inverse-surface: '#e4dffe'
  inverse-on-surface: '#302e45'
  outline: '#9e8f78'
  outline-variant: '#514532'
  surface-tint: '#ffba20'
  primary: '#ffdca1'
  on-primary: '#412d00'
  primary-container: '#ffb800'
  on-primary-container: '#6b4c00'
  inverse-primary: '#7c5800'
  secondary: '#ffb693'
  on-secondary: '#561f00'
  secondary-container: '#fe6b00'
  on-secondary-container: '#572000'
  tertiary: '#ffd7d5'
  on-tertiary: '#680011'
  tertiary-container: '#ffb0ae'
  on-tertiary-container: '#a60022'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#ffba20'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb693'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#7a3000'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b1'
  on-tertiary-fixed: '#410007'
  on-tertiary-fixed-variant: '#92001c'
  background: '#131127'
  on-background: '#e4dffe'
  surface-variant: '#34324a'
typography:
  display-xl:
    fontFamily: Outfit
    fontSize: 56px
    fontWeight: '900'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: Outfit
    fontSize: 38px
    fontWeight: '900'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0em
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: 0em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-numeric:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 26px
    letterSpacing: -0.01em
  label-pill:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
  space-3xl: 4rem
  board-radius-canvas: 520px
  gutter-mobile: 1rem
  gutter-desktop: 2rem
---

## Brand & Style
This design system crafts an energetic, celebratory digital arcade experience that translates the ancient South Asian tradition of Onam floral carpet (Pookalam) creation into a competitive, real-time social party game. The target audience encompasses young adults, diaspora communities, families, and casual party gamers who thrive on the energetic tension of timed communal party games like Kahoot and Jackbox, combined with tactile creative expression.

The visual direction merges **Vibrant Gamified Arcade** with **Tactile Festive Expression**:
- **Atmosphere:** Deep midnight festive temple night illuminated by concentrated floral pigments, lit brass lamps (*nilavilakku*), and radiant neon halos.
- **Physicality:** Touchable, chunky interface objects featuring 3D offset bevels ("pushable" arcade toy physical buttons), physical card trays, and tactile petal pickers.
- **Zero Emojis:** Strictly vector iconography and bespoke festive glyphs designed with crisp geometric curves, ensuring a polished, modern game aesthetic free of system font discrepancies.
- **Motion & Resonance:** High-energy responsiveness with spring physics, snappy press downstates, confetti bursts, radial bloom highlights, and celebratory pulse rings.

## Colors
The palette evokes traditional Onam flower petals placed under a deep festive night sky. High-contrast jewel tones float over an atmospheric dark indigo ground, achieving arcade legibility and festive warmth.

### Palette Architecture
- **Midnight Canvas (Neutral Core):**
  - Surface Void / Page Base: `#0D0B1A`
  - Base Midnight Card: `#131127`
  - Raised Tray / Container: `#1F1C3D`
  - Popover / Active Slate: `#2B2754`
  - Border Subdued: `#39346E`
- **Marigold Gold (Primary):** `#FFB800` — Primary actions, high-tier victory state, score callouts, timer highlights, and radiant glows.
  - Dark Accent / Bevel Base: `#B88400`
- **Saffron Orange (Secondary):** `#FF6B00` — Urgency states, countdown warnings, secondary team indicators, and active petal tools.
  - Dark Accent / Bevel Base: `#B84D00`
- **Hibiscus Crimson (Tertiary):** `#E63946` — Multi-player battle rivalry, voting triggers, error alerts, and combo multipliers.
  - Dark Accent / Bevel Base: `#A8222D`
- **Emerald Leaf (Accent / Success):** `#10B981` — Ready checks, submitted canvas status, correct matches, and positive point floats.
  - Dark Accent / Bevel Base: `#097350`
- **Thumba Jasmine (Light Neutral / Readability):** `#FFF9ED` — Primary crisp typography, petal outlines, and canvas rings.
  - Muted Ivory (Sub-labels): `#C5BDD8`
  - Subtle Ghost (Dividers): `rgba(255, 249, 237, 0.12)`

### Color Roles & Glow Guidelines
- Interactive buttons utilize dual-stop tonal pairs: a radiant face color paired with a 4px darker bottom bevel shadow.
- Glowing accents must use CSS box-shadow and SVG drop-shadow filters tinted with 30-50% opacity of the primary or secondary jewel tone (never pure white or neutral grey).

## Typography
The typographic hierarchy merges celebratory party game bravado with sharp in-game legibility.

- **Display & Headings (Outfit):** Hyper-clean, geometric, and ultra-bold. Used for score counters, podium ranks, room PIN displays, round titles, and win announcements. The tight negative tracking in display sizes creates an authentic arcade poster presence.
- **Body & Prompts (Plus Jakarta Sans):** Warm, inviting, and open. Ensures rules, chat bubbles, and player names render clearly across varying mobile screen densities under fast game conditions.
- **HUD & Technical Data (Space Grotesk):** Applied to round timers, team counters, vote statistics, and hotkey labels to guarantee zero ambiguity in rapid-paced party gameplay.

## Layout & Spacing
The layout uses an 8px base rhythmic grid structured around two core viewport states: **The Lobby/Discovery Canvas** and **The Live Match Arena**.

### Form Factor Adaptations
- **Desktop / Big Screen (Spectator & Host Mode):**
  - Centered radial drawing canvas (minimum 520px × 520px, up to 720px) flanked by player trays on the left and live score/chat feeds on the right.
  - 12-column dynamic flex layout with 24px gutters and maximum container width of 1440px.
- **Tablet / Split Player Screen:**
  - Stacked orientation: Drawing canvas dominant in the upper 60%, petal selector and speed tool dock anchored in the lower 40%.
- **Mobile Controller (Phone in hand mode):**
  - Single-column vertical flow with sticky bottom action controls.
  - Safe-area-aware floating docks: 16px horizontal margins with dynamic thumb-zone placement for the petal picker wheel and submit triggers.

### Rhythm & Z-Planes
- Micro-spacing (`space-2xs` to `space-xs`) strictly locks sub-elements within buttons, badges, and player chips.
- Component spacing (`space-md` to `space-xl`) isolates floating action docks, player leaderboards, and turn timers.

## Elevation & Depth
Depth is physical, tactile, and illuminated. The system eschews realistic photographic skeuomorphism in favor of high-energy, chunky neo-arcade geometry:

1. **The Midnight Substratum (Level 0):** Deep `#0D0B1A` backdrop accented with soft radial ambient background blooms (`rgba(255, 107, 0, 0.08)` and `rgba(255, 184, 0, 0.06)`).
2. **Game Board & Floating Decks (Level 1):** Solid `#131127` fills surrounded by a 2px stroke of `#2B2754` and an ambient glow (`box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.5)`).
3. **Chunky Arcade 3D Push (Level 2 - Interactive Controls):** 
   - Buttons do not use traditional blurred drop shadows for their base resting state. Instead, they use solid offset extrusion shadows: `box-shadow: 0 5px 0 0 {dark_bevel_color}`.
   - On `:hover`, translateY(-2px) with `0 7px 0 0 {dark_bevel_color}`.
   - On `:active`, translateY(4px) with `0 1px 0 0 {dark_bevel_color}` (producing a true mechanical button press sensation).
4. **Neon Aura & Radiance (Level 3 - Active / Super Charged):**
   - Active turns and leading players gain an intense neon perimeter glow: `box-shadow: 0 0 0 2px #FFB800, 0 0 24px rgba(255, 184, 0, 0.45)`.
   - Countdown critical states trigger a pulse glow: `0 0 28px rgba(230, 57, 70, 0.6)`.

## Shapes
The shape language relies on bold, approachable geometry with friendly rounded corners that feel like polished acrylic arcade pieces:

- **Base Radius (Rounded - 8px / 0.5rem):** Used for tooltips, micro-indicators, and small input fields.
- **Card & Tile Radius (`rounded-lg` - 16px / 1rem):** Standard for leaderboard items, floating trays, petal selection palettes, and modal prompts.
- **Chunky Arcade Radius (`rounded-xl` - 24px / 1.5rem):** Used for primary dialogs, round end scoreboards, and main game pods.
- **Full Pill Radius (`rounded-full` / 9999px):** Applied to push buttons, turn status tags, timer indicators, avatar frames, and score counter pills.
- **Radial Geometry (Petal Matrices):** Canvas nodes, symmetry guides, and petal placement targets adhere to concentric circular and floral bezier geometry.

## Components

### 1. 3D Arcade Buttons
- **Primary Action (Marigold Gold):**
  - Background `#FFB800`, text `#131127`, font `Outfit 700`, uppercase letter spacing `0.05em`.
  - Base shadow: `0 4px 0 0 #B88400, 0 8px 16px rgba(0,0,0,0.3)`.
  - Border: 2px solid `#FFDE85`.
  - Active downstate: translates down 4px, shadow becomes `0 0 0 0 #B88400`.
- **Secondary Action (Saffron / Indigo Outline):**
  - Background `#1F1C3D`, text `#FFF9ED`, border 2px solid `#39346E`.
  - Base shadow: `0 4px 0 0 #0D0B1A`.

### 2. Radial Petal Picker & Color Chips
- Circular swatch buttons (44px diameter) floating in a curved dock.
- Selected state expands to 52px with an inner ring (`2px solid #FFF9ED`) and an outer neon bloom.
- Petal count numerical badge anchored to top-right of each chip using `Space Grotesk 700`.

### 3. Player Score & Lobby Cards
- Background `#1F1C3D` with a 2px `#2B2754` edge.
- Left edge features a 6px thick vertical color stripe corresponding to player assignment (Marigold, Crimson, Leaf Green, Saffron).
- Avatars feature rounded-full vector masks enclosed within a chunky 2px gold border for the current room leader.

### 4. Live Game Progress Track & Countdown Timer
- **Timer Gauge:** Concentric circular countdown ring utilizing SVG `stroke-dashoffset` in `#FFB800`, shifting to `#E63946` in the final 5 seconds with an energetic shake animation.
- **Round Progress Bar:** 16px high pill bar with an interior track of `#131127` and a glowing candy gradient fill (`#FF6B00` to `#FFB800`) with diagonal tactile highlight stripes.

### 5. Input Fields (Room PIN & Nickname)
- Oversized text inputs with background `#0D0B1A`, border 2px solid `#39346E`, and font `Space Grotesk 700` (text centered, uppercase).
- Focused state: border turns `#FFB800` with an outer glow `0 0 0 4px rgba(255, 184, 0, 0.2)`.

### 6. Vector Iconography Rules
- Strict ban on system emojis. All iconography (flower buds, lamps, crowns, timer clocks, paintbrushes, paint splatters, checkmarks) must be 24px/32px custom SVGs rendered with 2px or 2.5px rounded stroke weights matching the typography's friendly geometry.