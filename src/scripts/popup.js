import ext from "./utils/ext";
import $ from "./utils/jquery";

var popup = document.getElementById("app");
var color = "white", activeTab;
if (color) {
    popup.style.backgroundColor = color
}
var renderMessage = (message) => {
    $("#display-container").html(`<div class="editor-description"><p class='message'>${message}</p></div>`);
}

var renderContent = (data) => {
    if (data == "app.daidr.me") {
        $("#display-container").html(`<div class="editor-description"><p class="message">已经连接到编辑器</p></div>`);
        setTimeout(function () {
            ext.runtime.sendMessage({ action: "server-test" }, function (response) {
                if (!response.action) {
                    $("#display-container").append(`<div class="editor-description"><p class="message error">无法连接到解析器</p></div>`);
                } else {
                    ext.tabs.sendMessage(activeTab.id, { action: 'generate-data' }, function (response) { });
                    $("#display-container").append(`<div class="editor-description"><p class="message">已经连接到解析器</p></div>`);
                    $("#display-container").append(`<div class="action-container"><button id="save-btn" class="btn btn-primary">热重载</button></div>`);
                }
            });
        }, 10);
    } else {
        renderMessage("无法识别的编辑器")
    }
}

ext.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    activeTab = tabs[0];
    ext.tabs.sendMessage(activeTab.id, { action: 'url-verify' }, renderContent);
});

popup.addEventListener("click", function (e) {
    if (e.target && e.target.matches("#save-btn")) {
        e.preventDefault();
        ext.tabs.sendMessage(activeTab.id, { action: 'get-data' }, function (response) {
            ext.runtime.sendMessage({ action: "send-data", data: response }, function (response) {
                if (response && response.result === "ok") {
                    renderMessage("插件热重载成功");
                } else {
                    renderMessage("抱歉，插件在重载过程中发生了错误");
                }
            })
        });
    }
});
