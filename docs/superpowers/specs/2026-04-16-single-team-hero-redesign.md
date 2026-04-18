# Single Team Hero Section Redesign

**Date:** 2026-04-16
**Scope:** `src/containers/SingleTeam/components/HeroSection.tsx` and `ColorSwatch.tsx`
**Status:** Approved

---

## Goal

Redesign the hero section to follow international sports brand design standards. The logo must be the primary brand anchor positioned above the team name. The abbreviation displays in brackets beside the team name. The overall layout uses a centered, ceremonial identity block (UEFA / Olympics standard).

---

## Background Layer

No changes. Keep as-is:

- Dark canvas (`#09090f`)
- Radial `primaryColor` glow from center (ellipse gradient)
- Large watermark abbreviation centered at ~8% opacity
- Grain texture SVG overlay
- Banner image support — if present, fills with `object-cover` and gradient overlay
- Top accent bar: 3px, `primaryColor`, full width, `z-10`

---

## Identity Block (Core Change)

Replaces the current bottom-left stacked layout. The entire identity block is **centered horizontally and vertically** within the hero.

### Stack order (top to bottom):

1. **Logo ring**
   - Size: `clamp(90px, 12vw, 110px)` × same
   - Shape: circle (`border-radius: 50%`)
   - Border: 2.5px solid `primaryColor`
   - Background: `primaryColor` at 12% opacity
   - Drop shadow: `0 0 40px primaryColor at 25% opacity`
   - Content: `<Image>` with `object-contain` if `logoImage` is provided; fallback to first 2–3 chars of `abbreviation` in `primaryColor`, bold
   - Animation: `opacity 0 → 1, scale 0.85 → 1`, delay 0.1s

2. **Short divider**
   - Width: 40px, height: 2px
   - Color: `primaryColor`, opacity 0.7
   - Margin: 12px top and bottom
   - Animation: `scaleX 0 → 1`, delay 0.3s

3. **Name row**
   - Layout: `flex`, `items-baseline`, `gap: 10px`, `justify-content: center`, `flex-wrap: wrap`
   - Team name: `font-machine font-black uppercase text-white`, `clamp(28px, 5vw, 58px)`, `line-height: 1`, `letter-spacing: -0.02em`
   - Abbreviation bracket: `[ABR]` — same font, `~55%` of team name size, `color: primaryColor`, `opacity: 0.85`
   - Animation: `opacity 0 → 1, y 28 → 0`, delay 0.2s

4. **League sublabel**
   - Text: `CFFL · Lagos, Nigeria · Est. {foundedYear}`
   - Style: `font-machine uppercase tracking-[0.28em] text-white/45 text-[10px]`
   - Margin: 10px top
   - Animation: `opacity 0 → 1`, delay 0.4s

### Positioning

The identity block uses `absolute inset-0 flex flex-col items-center justify-center z-10`.

---

## Bottom Strip

### Color Swatches

File: `src/containers/SingleTeam/components/ColorSwatch.tsx`

- Remove: label text ("Primary", "Secondary"), hex code text, copy hint text
- Keep: colored shape (circle, `18px × 18px`, `border-radius: 50%`)
- Border: `1.5px solid rgba(255,255,255,0.14)`
- Hover: `scale(1.15)` transition
- Click: copies hex to clipboard (existing logic unchanged)
- On copy: brief `scale(1.2)` pulse + `border-color` flashes to the swatch's own `color` prop for 1.8s, then resets. No text feedback. No new props needed.
- Layout: `flex gap-2.5` row, positioned `absolute bottom-8 left-6 md:left-14 lg:left-20 z-10`

### Social Icons

- Unchanged component (`<SocialIconsRow compact />`)
- Positioning: `absolute bottom-8` centered horizontally (`left-0 right-0 flex justify-center z-10`)

### Accent bar

- Removed. The short divider inside the identity block serves this role.

---

## Files Changed

| File | Change |
|---|---|
| `src/containers/SingleTeam/components/HeroSection.tsx` | Full identity block redesign — centered layout, logo ring, name + [ABBR] |
| `src/containers/SingleTeam/components/ColorSwatch.tsx` | Strip to shape-only; replace text feedback with pulse animation |

---

## What Is Not Changing

- Background layer (gradients, watermark, grain, banner support)
- Top accent bar
- Social icons component internals
- All props/types — no interface changes
- Banner vs no-banner conditional logic
