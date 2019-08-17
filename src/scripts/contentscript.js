import ext from "./utils/ext";

var codedata;

var getTabURL = () => {
    var url = location.host;
    if (!url) return;
    return url;
}

function onRequest(request, sender, sendResponse) {
    if (request.action === 'url-verify') {
        sendResponse(getTabURL())
    } else if (request.action === 'generate-data') {
        sendResponse("ok");
        window.postMessage({ "target": "i", "action": 'generate-data' }, '*');
    } else if (request.action === 'get-data') {
        sendResponse(codedata);
    }
}

function injectCustomJs(jsPath) {
    jsPath = jsPath || 'scripts/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);
    temp.onload = function () {
        this.parentNode.removeChild(this);
    };
    document.head.appendChild(temp);
}

injectCustomJs();

window.addEventListener("message", function (e) {
    if (e.data["target"] == "c") {
        codedata = e.data["data"];
    }
}, false);

ext.runtime.onMessage.addListener(onRequest);