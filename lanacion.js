document.addEventListener('DOMContentLoaded', function () {
  var code = [
    '$(document.body).on("shown.bs.modal", ".modal" , function (e) { $(e.currentTarget).find("#iframe-registracion").length && $(e.currentTarget).modal("hide"); }); '
  ].join('\n');
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
});

