import { StopInspectOptions } from './index';
import { generateInlineScript } from './scripts';

/**
 * Vite plugin that injects anti-inspection script into the HTML head.
 * 
 * Usage in vite.config.ts:
 * ```ts
 * import { stopInspectVitePlugin } from 'react-stop-inspect/vite';
 * 
 * export default defineConfig({
 *   plugins: [react(), stopInspectVitePlugin()],
 * });
 * ```
 */
export const stopInspectVitePlugin = (options?: StopInspectOptions) => {
  return {
    name: 'react-stop-inspect',
    transformIndexHtml(html: string) {
      const script = generateInlineScript(options);
      return {
        html,
        tags: [
          {
            tag: 'script',
            children: script,
            injectTo: 'head' as const,
          },
        ],
      };
    },
  };
};

export default stopInspectVitePlugin;
