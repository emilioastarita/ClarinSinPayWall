document.addEventListener('DOMContentLoaded', function () {
  var code = [
    '$.colorbox.remove(); ',
    '$(document).bind("cbox_load", function(){ $.colorbox.remove(); } );'
  ].join('\n');
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
});

