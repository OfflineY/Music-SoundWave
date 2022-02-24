// 点击 About 标签触发 >>
$("#aboutBTN").click(function() {
    // 更改主页面内容
    $("#MAINhomepage").css("display", "none");
    $("#MAINaboutpage").css("display", "block");
    // 更改标签样式
    $("#homepageBTN").removeClass("active");
    $("#aboutBTN").addClass("active");
    // 替换细节
    $("#info").html("About");
});
// 点击 Homepage 标签触发 >>
$("#homepageBTN").click(function() {
    // 更改主页面内容
    $("#MAINhomepage").css("display", "block");
    $("#MAINaboutpage").css("display", "none");
    // 更改标签样式
    $("#aboutBTN").removeClass("active");
    $("#homepageBTN").addClass("active");
    // 替换细节
    $("#info").html("Homepage");
});

//# sourceMappingURL=index.44983732.js.map
