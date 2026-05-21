# React Stop Inspect

A lightweight library to prevent browser code inspection and DevTools usage in React, Vite, Next.js, and Webpack applications. Supports both JavaScript and TypeScript.

## Features

-  **Disable Right-Click**: Prevents the context menu from opening.
-  **Disable Shortcuts**: Blocks `F12`, `Ctrl+Shift+I`, `Ctrl+Shift+J`, `Ctrl+Shift+C`, and `Ctrl+U`.
-  **Debugger Loop**: Automatically pauses execution if DevTools is opened.
-  **Console Protection**: Disables console logging in production.
-  **Resize Detection**: Detects if DevTools is opened via window resizing.
-  **Plugin Support**: Works as a Vite plugin, Webpack plugin, or Next.js config wrapper.

## Installation

```bash
npm install react-stop-inspect
# or
yarn add react-stop-inspect
```

---

## Usage as Plugin (Recommended)

### Vite Plugin

Add one line to your `vite.config.ts` — no React code changes needed:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { stopInspectVitePlugin } from 'react-stop-inspect/vite';

export default defineConfig({
  plugins: [
    react(),
    stopInspectVitePlugin(), // Add this line
  ],
});
```

With options:

```ts
stopInspectVitePlugin({
  disableRightClick: true,
  disableShortcuts: true,
  enableDebuggerLoop: true,
  disableConsole: false, // Keep console in dev
})
```

### Webpack Plugin

```js
// webpack.config.js
const { StopInspectWebpackPlugin } = require('react-stop-inspect/webpack');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new StopInspectWebpackPlugin(), // Add this line
  ],
};
```

### Next.js (Config Wrapper)

```js
// next.config.js
const { withStopInspect } = require('react-stop-inspect/next');

const nextConfig = {
  // your existing config
};

module.exports = withStopInspect(nextConfig);
```

With options:

```js
module.exports = withStopInspect(nextConfig, {
  enableDebuggerLoop: true,
  disableConsole: true,
});
```

### Next.js (Manual Script Injection)

For more control, inject the script directly in `_document.tsx` or `layout.tsx`:

**Pages Router (`_document.tsx`):**

```tsx
import { getStopInspectScript } from 'react-stop-inspect/next';

export default function Document() {
  return (
    <Html>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: getStopInspectScript() }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

**App Router (`layout.tsx`):**

```tsx
import Script from 'next/script';
import { getStopInspectScript } from 'react-stop-inspect/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          id="stop-inspect"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: getStopInspectScript() }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Usage as React Hook / Component

### Using the Hook

```tsx
import { useStopInspect } from 'react-stop-inspect';

function App() {
  useStopInspect(); // Use default options

  return (
    <div>
      <h1>My Secure App</h1>
    </div>
  );
}
```

### Using the Component

```tsx
import { StopInspect } from 'react-stop-inspect';

function App() {
  return (
    <div>
      <StopInspect />
      <h1>My Secure App</h1>
    </div>
  );
}
```

---

## Vanilla JavaScript / TypeScript

```typescript
import { initStopInspect } from 'react-stop-inspect';

initStopInspect({
  disableRightClick: true,
  disableShortcuts: true,
  enableDebuggerLoop: true,
});
```

---

## Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `disableRightClick` | `boolean` | `true` | Disable right-click context menu. |
| `disableShortcuts` | `boolean` | `true` | Disable common devtools keyboard shortcuts. |
| `enableDebuggerLoop` | `boolean` | `true` | Enable debugger loop to pause execution if DevTools is open. |
| `disableConsole` | `boolean` | `true` | Clear console or disable console logs. |
| `detectResize` | `boolean` | `true` | Check for DevTools opening by window resize. |

---

## Contribution

Feel free to fork and improve this project! Pull requests are welcome.

---

## License

This project is licensed under the Apache-2.0 License.
