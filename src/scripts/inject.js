window.addEventListener("message", function (e) {
    if (e.data["target"] == "i") {
        if (e.data["action"] === "generate-data") {
            window.postMessage({ "target": "c", "data": plugin_getHotReloaderData() }, '*');
        }
    }
}, false);