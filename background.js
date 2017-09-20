var urls = [
    '*://www.lanacion.com.ar/*',
    '*://www.clarin.com/*',
    '*://www.ole.com.ar/*',
    '*://*.elpais.com.uy/*',
];

if (typeof String.prototype.trimLeft !== "function") {
    String.prototype.trimLeft = function () {
        return this.replace(/^\s+/, "");
    };
}
if (typeof String.prototype.trimRight !== "function") {
    String.prototype.trimRight = function () {
        return this.replace(/\s+$/, "");
    };
}

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
    urls: urls
}, [
    "requestHeaders",
    "blocking"
]);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('Receive message', request);
    if (request === "CLEAR_COOKIES") {
        removeProblematicCookies()
    }
});



chrome.webRequest.onHeadersReceived.addListener(
    function (details) {
        details.responseHeaders.forEach(function (responseHeader) {
            if (responseHeader.name.toLowerCase() === "set-cookie") {
                responseHeader.value = convertToExpired(responseHeader.value);
            }
        });
        return {
            responseHeaders: details.responseHeaders
        };
    }, {
        urls: urls
    }, ['blocking', 'responseHeaders']
);

function convertToExpired(c) {
    var cookie = parseCookie(c)
    cookie.expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
    cookie['Max-Age'] = '0';
    return serializeCookie(cookie);
}

function parseCookie(c) {
    var cookies = {};
    c.split(/[,;]/).map(function (cookie) {
        var parts = cookie.split(/=/, 2),
            name = decodeURIComponent(parts[0].trimLeft()),
            value = parts.length > 1 ? decodeURIComponent(parts[1].trimRight()) : null;
        cookies[name] = value;
    });
    return cookies;
}

function serializeCookie(c) {
    return Object.keys(c).map(k => {
        return c[k] === null ? k : `${k}=${c[k]}`;
    }).join("; ");
}

function removeProblematicCookies() {
    var removeCookie = function (cookie) {
        var domain = cookie.domain.indexOf('.') === 0 ? cookie.domain.slice(1) : cookie.domain;
        var url = "http" + (cookie.secure ? "s" : "") + "://" + domain + cookie.path;
        chrome.cookies.remove({"url": url, "name": cookie.name});
    };
    chrome.cookies.getAll({}, function (all_cookies) {
        var count = all_cookies.length;
        for (var i = 0; i < count; i++) {
            removeCookie(all_cookies[i]);
        }
    });
}