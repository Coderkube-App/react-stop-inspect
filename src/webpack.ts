import { StopInspectOptions } from './index';
import { generateInlineScript } from './scripts';

/**
 * Webpack plugin that injects anti-inspection script into the HTML.
 * Works with html-webpack-plugin (used by CRA, custom webpack setups).
 *
 * Usage in webpack.config.js:
 * ```js
 * const { StopInspectWebpackPlugin } = require('react-stop-inspect/webpack');
 *
 * module.exports = {
 *   plugins: [
 *     new HtmlWebpackPlugin(),
 *     new StopInspectWebpackPlugin(),
 *   ],
 * };
 * ```
 */
export class StopInspectWebpackPlugin {
  private options: StopInspectOptions;

  constructor(options?: StopInspectOptions) {
    this.options = options || {};
  }

  apply(compiler: any) {
    compiler.hooks.compilation.tap('StopInspectWebpackPlugin', (compilation: any) => {
      // Try html-webpack-plugin v4+ hooks
      let HtmlWebpackPlugin: any;
      try {
        HtmlWebpackPlugin = require('html-webpack-plugin');
      } catch {
        console.warn(
          '[react-stop-inspect] html-webpack-plugin not found. ' +
          'Please install it to use StopInspectWebpackPlugin.'
        );
        return;
      }

      const hooks = HtmlWebpackPlugin.getHooks(compilation);

      hooks.beforeEmit.tapAsync(
        'StopInspectWebpackPlugin',
        (data: any, cb: (err: null, data: any) => void) => {
          const script = `<script>${generateInlineScript(this.options)}</script>`;
          // Inject right after <head> tag
          data.html = data.html.replace('<head>', `<head>${script}`);
          cb(null, data);
        }
      );
    });
  }
}

export default StopInspectWebpackPlugin;
