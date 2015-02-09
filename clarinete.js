document.addEventListener('DOMContentLoaded', function () {
  var code = [
    'jQuery && $(document).bind("cbox_load", function(e) { if ($(e.currentTarget.activeElement).hasClass("modalLoginPase")) {$.colorbox.remove();}  } );'
  ].join('\n');
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
});

