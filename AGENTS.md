# Agent Workspace Instructions

## UI Styling & Design Rules
1. **No Pill Badges:** Never use pill badges or `rounded-full` text badges across any page.
2. **Universal Corner Radius:** Use `rounded-2xl` (`5px` via `--radius: 5px` in `app/globals.css`) for all curved corners throughout the project (cards, containers, buttons, dialogs, inputs). Do not use `rounded-3xl`, `rounded-xl`, `rounded-lg`, `rounded-md`, or `rounded-sm`.
3. **Brand Blue:** Primary blue is strictly `#0056D2`, hover blue is `#0044a8`.
4. **Typography:** All typography (headings, body, display, and UI) must be picked from `app/globals.css` via the global CSS font tokens (`--font-global`, `--font-sans`, `--font-heading`, `--font-display`) rather than hardcoding font families in components or layouts. Nav bar links use ALL CAPS and bold formatting.
