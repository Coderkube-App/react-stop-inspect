import { StopInspectOptions } from './index';
import { generateInlineScript } from './scripts';
import { StopInspectWebpackPlugin } from './webpack';

/**
 * Next.js config wrapper that injects anti-inspection script.
 *
 * Usage in next.config.js (Pages Router & App Router):
 * ```js
 * const { withStopInspect } = require('react-stop-inspect/next');
 *
 * const nextConfig = {
 *   // your existing config
 * };
 *
 * module.exports = withStopInspect(nextConfig);
 * ```
 *
 * With options:
 * ```js
 * module.exports = withStopInspect(nextConfig, {
 *   disableConsole: true,
 *   enableDebuggerLoop: true,
 * });
 * ```
 */
export const withStopInspect = (
  nextConfig: any = {},
  options?: StopInspectOptions
) => {
  return {
    ...nextConfig,
    webpack: (config: any, context: any) => {
      // Only inject on client-side builds
      if (!context.isServer) {
        config.plugins.push(new StopInspectWebpackPlugin(options));
      }

      // Call the original webpack function if it exists
      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, context);
      }

      return config;
    },
  };
};

/**
 * Returns the raw inline script string for manual injection
 * in _document.tsx or layout.tsx.
 *
 * Usage in pages/_document.tsx:
 * ```tsx
 * import { getStopInspectScript } from 'react-stop-inspect/next';
 *
 * export default function Document() {
 *   return (
 *     <Html>
 *       <Head>
 *         <script dangerouslySetInnerHTML={{ __html: getStopInspectScript() }} />
 *       </Head>
 *       <body>
 *         <Main />
 *         <NextScript />
 *       </body>
 *     </Html>
 *   );
 * }
 * ```
 *
 * Usage in app/layout.tsx:
 * ```tsx
 * import Script from 'next/script';
 * import { getStopInspectScript } from 'react-stop-inspect/next';
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <Script
 *           id="stop-inspect"
 *           strategy="beforeInteractive"
 *           dangerouslySetInnerHTML={{ __html: getStopInspectScript() }}
 *         />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 * ```
 */
export const getStopInspectScript = (options?: StopInspectOptions): string => {
  return generateInlineScript(options);
};

export default withStopInspect;
