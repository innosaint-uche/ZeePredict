## 2024-03-24 - Theme Toggle Tooltip & A11y Fix
**Learning:** The theme.js script executes in the `<head>` before the body is parsed. It correctly checks for `themeToggle` button to apply aria-labels, but on first load when apply() is called from head, `document.getElementById('themeToggle')` is null. So the aria-label and aria-pressed attributes are initially missed!
**Action:** When adding attributes dynamically to elements, if script is in head, ensure we re-apply attributes once DOM content is loaded.
