document.addEventListener('DOMContentLoaded', function () {
  var code = [
    'jQuery && $(document.body).on("shown.bs.modal", ".modal" , function (e) { $(e.currentTarget).find("#iframe-registracion").length && $(e.currentTarget).modal("hide"); }); ',
    'jQuery && $(function(){$(".lnmodal.pantalla-completa.login").hide();});'
     
  ].join('\n');
  var script = document.createElement('script');
  script.textContent = code;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
});

