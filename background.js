var urls = [
  "*://lw-app-pase.clarin.com/*" 
];
function blockRequest(details) {
  return {cancel: true};
}
if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
  chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
}

chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: urls}, ['blocking']);
