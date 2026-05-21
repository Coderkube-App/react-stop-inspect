import { StopInspectOptions } from './index';

/**
 * Generates a self-executing inline script string that implements
 * all anti-inspection protections. This runs before any framework
 * code loads, making it harder to bypass.
 */
export const generateInlineScript = (options: StopInspectOptions = {}): string => {
  const {
    disableRightClick = true,
    disableShortcuts = true,
    enableDebuggerLoop = true,
    disableConsole = true,
    detectResize = true,
  } = options;

  return `(function(){
try{
${disableConsole ? `var n=function(){};console.log=n;console.debug=n;console.info=n;console.warn=n;console.error=n;` : ''}
${enableDebuggerLoop ? `(function a(){try{(function b(i){if((''+i/i).length!==1||i%20===0){(function(){}).constructor('debugger')()}else{debugger}b(++i)})(0)}catch(e){setTimeout(a,5000)}})();` : ''}
${disableRightClick ? `document.addEventListener('contextmenu',function(e){e.preventDefault()});` : ''}
${disableShortcuts ? `document.addEventListener('keydown',function(e){if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'||e.key==='C'))||(e.metaKey&&e.altKey&&(e.key==='I'||e.key==='J'||e.key==='C'))||(e.ctrlKey&&e.key==='U')||(e.metaKey&&e.key==='U')){e.preventDefault();return false}});` : ''}
${detectResize ? `setInterval(function(){if(window.outerWidth-window.innerWidth>160||window.outerHeight-window.innerHeight>160){}},1000);` : ''}
}catch(e){}
})();`;
};
