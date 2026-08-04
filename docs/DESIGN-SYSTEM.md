# Design System

## Palette (`src/app/globals.css`, `--color-*`)

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#070812` | Page background |
| `--color-bg-raised` | `#0B0D18` | Sidebar |
| `--color-surface-1` | `#111525` | Cards |
| `--color-surface-2` | `#171B2E` | Nested surfaces, inputs |
| `--color-accent-primary` | `#8B5CF6` | Primary actions, focus accents |
| `--color-accent-primary-muted` | `#6D5EF7` | Gradient start |
| `--color-accent-secondary` | `#4F7CFF` | Links, secondary accents, focus ring |
| `--color-accent-highlight` | `#D946EF` | Sparingly — gradients, emphasis |
| `--color-text-primary` | `#F8FAFC` | Body text |
| `--color-text-secondary` | `#94A3B8` | Muted text |

Gradients are used intentionally (hero, CTA buttons, "most popular"
pricing badge, sparkline) — not as a default background treatment.

## Typography

Inter, loaded via `next/font/google`. One type family, strong size
hierarchy (`text-xs` → `text-4xl`), nothing oversized on mobile.

## Radius & surfaces

`--radius-sm/md/lg/xl` (8/12/16/24px), consistent across buttons,
inputs, cards and dialogs. Borders are 1px `--color-border`; depth
comes from subtle shadows, not heavy blur.

## Motion

`MotionConfig reducedMotion="user"` (from Framer Motion) wraps the
whole app in `src/components/motion-provider.tsx`, so every Framer
Motion animation automatically respects
`prefers-reduced-motion`. Plain CSS transitions (dialogs, dropdowns)
are short (150–250ms) and non-blocking. `globals.css` also forces
near-zero animation durations at the OS level as a second safety net.

## Accessibility

- All interactive controls have a visible focus ring
  (`:focus-visible`, 2px, `--color-accent-secondary`).
- Dialogs (Radix) trap focus and close on `Escape`.
- Minimum touch target height of 44px (`min-h-11`) on buttons, inputs,
  and nav items.
- Status is never color-only: locked visitors show a lock icon and
  "Unlock" label, not just a color change; status badges carry text,
  not just a colored dot.
- Charts include a visually-hidden (`sr-only`) text summary alongside
  the visual chart for screen readers.
- Mobile nav (drawer) and desktop sidebar share the same underlying
  nav list component so keyboard/screen-reader behavior stays
  consistent between breakpoints.

## Mobile-first

Every layout starts from a 375px baseline (single column, drawer nav,
full-width CTAs, card-style data rows) and is progressively enhanced at
`sm`/`lg` breakpoints for tablet/desktop (multi-column grids, persistent
sidebar, table-like data rows). No horizontal page scroll; the one
place horizontal scroll is acceptable (a very wide data table) is
avoided in favor of responsive row layouts instead.
