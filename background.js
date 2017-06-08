console.log('Extension loaded ?????', Math.random())

var urls = [
    "*://stats.lnol.com.ar/*",
    "*://estadisticas.lanacion.com.ar/*",
    "*://www.clarin.com/apistatic/api/loginwall/*",
    "*://app-pase.clarin.com/pase-registracion/*",
    "*://www.ole.com.ar/apistatic/api/loginwall/*"
];
function blockRequest(details) {
    return {cancel: true};
}
if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
    chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
}

chrome.webRequest.onBeforeRequest.addListener(blockRequest, {urls: urls}, ['blocking']);

chrome.webRequest.onBeforeSendHeaders.addListener(function (details) {
    var newRef = "https://www.google.com.ar/";
    var gotRef = false;
    for (var n in details.requestHeaders) {

        if (details.requestHeaders[n].name.toLowerCase() == "referer") {
            gotRef = true;
            details.requestHeaders[n].value = newRef;
        }
        if (details.requestHeaders[n].name.toLowerCase() == "cookie") {
            details.requestHeaders[n].value = ''
        }
    }
    if (!gotRef) {
        details.requestHeaders.push({name: "Referer", value: newRef});
    }
    return {requestHeaders: details.requestHeaders};
}, {
    urls: [
        '*://www.lanacion.com.ar/*',
        '*://www.clarin.com/*',
        '*://www.ole.com.ar/*',
    ]
}, [
    "requestHeaders",
    "blocking"
]);
