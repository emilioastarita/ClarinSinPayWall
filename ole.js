


document.addEventListener('DOMContentLoaded', function () {
  var code = [
  ].join('\n');
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
});

