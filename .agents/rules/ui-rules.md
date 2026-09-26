# UI Rules & Constraints

## 1. No Pill Badges (Strict Rule)
- **Do NOT use pill badges or `rounded-full` text badges** anywhere across any page, hero section, card, or modal in this project.
- Badges and tags must never use pill/capsule shapes (`rounded-full`). Instead, use rectangular or clean `rounded-2xl` tags if tags are required.

## 2. Universal Corner Radius (`rounded-2xl`)
- **Corner Radius:** Everything that has a curved edge in this project must strictly use **`rounded-2xl`** (`border-radius: 1rem` / `16px`).
- Do NOT use `rounded-3xl`, `rounded-xl`, `rounded-lg`, `rounded-md`, or `rounded-sm` for curved borders.
- All cards, containers, buttons, dialogs, inputs, and interactive surfaces with curved corners must use **`rounded-2xl`**.
- Circular 1:1 aspect elements (e.g. user avatar portraits or small status dots) may use `rounded-full` only when strictly required for circular geometry.

## 3. Brand Colors
- Brand Primary Blue: `#0056D2`
- Hover / Active Blue: `#0044a8`
- Accent Light Sky: `#38bdf8`

## 4. Typography
- Headings: `Plus Jakarta Sans` (`--font-heading`)
- Body: `Inter` (`--font-sans`)
- Navigation links: ALL CAPS and bold (`font-bold uppercase tracking-wider`).
