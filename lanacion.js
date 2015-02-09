document.addEventListener('DOMContentLoaded', function () {
  var code = [
    '$("#iframe-registracion").attr("src", "#");',
    '$("#LN_overlay").remove();',
    '$.fn.modal = function(){};',
    '$(document.body).on("shown.bs.modal", ".modal" , function (e) { $(e.currentTarget).modal("hide"); e.preventDefault();}); '
  ].join('\n');
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
});

