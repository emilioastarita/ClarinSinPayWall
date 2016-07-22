document.addEventListener('DOMContentLoaded', function () {
  var code = [
    'paseE2E = {};'
  ].join('\n');
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
});

