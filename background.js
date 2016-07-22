var urls = [
  "*://www.clarin.com/apistatic/api/loginwall/*",
  "*://app-pase.clarin.com/pase-registracion/*",
  "*://www.ole.com.ar/apistatic/api/loginwall/*"
];
function blockRequest(details) {
  return {cancel: true};
}
if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
  chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
}

chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: urls}, ['blocking']);

