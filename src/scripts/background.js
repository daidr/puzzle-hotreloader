import ext from "./utils/ext";
import $ from "./utils/jquery";

const port = 7164;

ext.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.action === "send-data") {
            // 热重载服务器可用性测试
            $.ajax({
                "url": `http://127.0.0.1:${port}/$data$`,
                "method": "POST",
                "async": false,
                "cache": false,
                "data": request.data,
                "contentType": "text/plain",
                "timeout": 1000,
                success: function () {
                    sendResponse({ result: 'ok' });
                },
                error: function () {
                    sendResponse({ result: 'error' });
                },
            });
        } else if (request.action === "server-test") {
            // 热重载服务器可用性测试
            $.ajax({
                "url": `http://127.0.0.1:${port}/$test$`,
                "async": false,
                "cache": false,
                "timeout": 2000,
                "success": function () {
                    sendResponse({ action: true });
                },
                "error": function () {
                    sendResponse({ action: false });
                },
            });
        }
    }
);

