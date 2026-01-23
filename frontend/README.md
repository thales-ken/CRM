# React + TypeScript + Vite

A modern web development project built with React, TypeScript, and Vite. This setup provides a minimal but comprehensive foundation for building fast, scalable React applications with hot module replacement (HMR) and ESLint support.

## Quick Start

### Development Server
Run the development server with hot module replacement:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Build for Production
Create an optimized production build:

```bash
yarn build
```

### Preview Production Build
Preview the production build locally:

```bash
yarn preview
```

### Lint Code
Check code quality and style:

```bash
yarn lint
```

## Project Structure

```
src/
├── App.tsx           # Main application component
├── App.css           # App styles
├── main.tsx          # Application entry point
├── index.css         # Global styles
└── react.svg         # React logo
public/               # Static assets
dist/                 # Build output (generated)
index.html            # HTML entry point
vite.config.ts        # Vite configuration
tsconfig.json         # TypeScript configuration
```

## Technologies

- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **ESLint** - Code quality and consistency
- **CSS** - Styling support

## Plugins

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) - Uses Babel for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
