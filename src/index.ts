/**
 * Options for the stop-inspect protection.
 */
export interface StopInspectOptions {
  /** Disable right-click context menu. Default: true */
  disableRightClick?: boolean;
  /** Disable common devtools keyboard shortcuts (F12, Ctrl+Shift+I, etc.). Default: true */
  disableShortcuts?: boolean;
  /** Enable debugger loop to pause execution if DevTools is open. Default: true */
  enableDebuggerLoop?: boolean;
  /** Clear console or disable console logs in production. Default: true */
  disableConsole?: boolean;
  /** Check for DevTools opening by window resize. Default: true */
  detectResize?: boolean;
}

/**
 * Initializes the anti-debugging and inspection protection.
 */
export const initStopInspect = (options: StopInspectOptions = {}) => {
  const {
    disableRightClick = true,
    disableShortcuts = true,
    enableDebuggerLoop = true,
    disableConsole = true,
    detectResize = true,
  } = options;

  if (typeof window === 'undefined') return;

  // 1. Disable console logging
  if (disableConsole) {
    const noop = () => {};
    // @ts-ignore
    window.console.log = noop;
    // @ts-ignore
    window.console.debug = noop;
    // @ts-ignore
    window.console.info = noop;
    // @ts-ignore
    window.console.warn = noop;
    // @ts-ignore
    window.console.error = noop;
  }

  // 2. Debugger Loop
  if (enableDebuggerLoop) {
    const startDebuggerLoop = () => {
      try {
        (function () {
          (function a() {
            try {
              (function b(i) {
                if (('' + i / i).length !== 1 || i % 20 === 0) {
                  (function () {}).constructor('debugger')();
                } else {
                  debugger;
                }
                b(++i);
              })(0);
            } catch (e) {
              setTimeout(a, 5000);
            }
          })();
        })();
      } catch (err) {}
    };
    startDebuggerLoop();
  }

  // 3. Disable right-click
  if (disableRightClick) {
    document.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // 4. Disable keyboard shortcuts
  if (disableShortcuts) {
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.metaKey && e.altKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) || // Mac shortcuts
        (e.ctrlKey && e.key === 'U') ||
        (e.metaKey && e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
    });
  }

  // 5. Detect window resizing
  if (detectResize) {
    setInterval(() => {
      if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
        // DevTools might be open
      }
    }, 1000);
  }
};

// Re-export React hooks and components
export { useStopInspect, StopInspect } from './react';

// Re-export inline script generator
export { generateInlineScript } from './scripts';
export { generateInlineScript as getStopInspectScript } from './scripts';

// Re-export plugins
export { stopInspectVitePlugin } from './vite';
export { StopInspectWebpackPlugin } from './webpack';
export { withStopInspect } from './next';
