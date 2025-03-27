# Final Project – COMP 2132 (Winter 2025)

This is my final project for **COMP 2132 – Web Development with JavaScript** at BCIT.  
The project is a hangman-style word game set in a satirical version of Canada.

🎮 **Play the game here**:  
👉 [https://gdoyle87.github.io/final_project/](https://gdoyle87.github.io/final_project/)

- The project is deployed using **GitHub Pages**.
- **GitHub Actions** automates the build process:
  - Deploys to GitHub Pages on push
  - Changes paths to include /final_project/ since the project is not posted in the root github pages

---

## 🔧 Technical Features

### 📄 Data & Game Logic

- Words and hints are stored in a **JSON file**, fetched dynamically using JavaScript.
- The game tracks incorrect guesses by filling in provinces/territories on a map — the fill order is **randomized each game**.
- After 6 incorrect guesses, the game ends.

### 🧠 Interactivity

- A **dynamic news ticker** appears at the bottom, showing headlines pulled from a JSON file.
  - Updates on every incorrect guess with new stories.
  - Headlines are randomized per playthrough.
- A **"Play Again"** button appears after a win or loss to reset the game.
- An accordion-style tab at the top can be toggled open/closed by clicking the heading.
  - Accordion state is saved to **localStorage** for persistence across refreshes.

### ✨ Visuals & Animation

- Responsive layout using **CSS Grid and media queries** for a polished experience on all screen sizes.
- Includes **6 images**:
  - 1 map
  - 2 flags
  - 2 inline SVGs (logo and breaking shape)
  - 1 `favicon.ico`
- Includes at least one **JavaScript-powered animation** (e.g. fade-in effect).
- Overall design uses **semantic HTML** for accessibility and structure.
- Different colour scheme depending on whether user has **dark mode** set on their browser or not.
  - Feel free to give it a try by changing your browser settings.

### 🛠️ Code Quality

- All code is written using **relative paths** only — no absolute or platform-specific paths.
- HTML, CSS, and JavaScript are free from serious errors.
- JavaScript code includes:
  - Custom functions and a custom object
  - DOM manipulation and event handling
  - Combination of **standard JS and jQuery**
- **SCSS (SASS)** is used to structure and maintain CSS.
  - Compiled CSS is included alongside the original `.scss` files.
  - `@mixin` is used (see `_word.scss` and `_layout.scss`).

## 📢 Acknowledgments

This project was built as a school assignment and is provided for educational purposes.
