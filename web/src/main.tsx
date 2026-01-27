import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global styles
const style = document.createElement('style');
style.textContent = `
  :root {
    --color-ash-grey-50: #f1f4f4;
    --color-ash-grey-100: #e2e8e9;
    --color-ash-grey-200: #c5d1d3;
    --color-ash-grey-300: #a9babc;
    --color-ash-grey-400: #8ca4a6;
    --color-ash-grey-500: #6f8d90;
    --color-ash-grey-600: #597173;
    --color-ash-grey-700: #435456;
    --color-ash-grey-800: #2c383a;
    --color-ash-grey-900: #161c1d;
    --color-ash-grey-950: #101414;
    
    --primary: #435456;
    --primary-dark: #2c383a;
    --bg-primary: #f1f4f4;
    --bg-secondary: #e2e8e9;
    --text-primary: #161c1d;
    --text-secondary: #435456;
    --border: #c5d1d3;
    --hover: #a9babc;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: var(--bg-primary);
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;
document.head.appendChild(style);

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
