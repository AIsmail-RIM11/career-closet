/* Standalone load-failure helper: no React, imports, eval, or permissions API. */
(function () {
  'use strict';
  function init() {
    var root = document.getElementById('root');
    var help = document.getElementById('browser-load-help');
    var retry = document.getElementById('browser-load-retry');
    if (!root || !help) return;

    // This checks only whether the application mounted. It cannot inspect,
    // control, or request permissions from browser extensions.
    function detectBlankApp() {
      help.hidden = root.childElementCount > 0;
    }

    if (retry) retry.addEventListener('click', function () {
      window.location.reload();
    });

    // Show guidance only if the application is still empty after startup.
    window.setTimeout(detectBlankApp, 4500);

    // If a script finishes loading late, take the guidance away automatically.
    var observer = new MutationObserver(function () {
      if (root.childElementCount > 0) {
        help.hidden = true;
        observer.disconnect();
      }
    });
    observer.observe(root, { childList: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
