window.onload=function(){
// 点击 About 标签触发 >>
$("#aboutBTN").click(function () {
    // 更改主页面内容
    $("#MAINhomepage").css("display", "none")
    $("#MAINaboutpage").css("display", "block")
    $("#TITILEhomepage").css("display", "none")
    $("#TITILEaboutpage").css("display", "block")
    // 更改标签样式
    $("#homepageBTN").removeClass("active")
    $("#aboutBTN").addClass("active")
    // 替换细节
    $("#info").html("About")
});

// 点击 Homepage 标签触发 >>
$("#homepageBTN").click(function () {
    // 更改主页面内容
    $("#MAINhomepage").css("display", "block")
    $("#MAINaboutpage").css("display", "none")
    $("#TITILEhomepage").css("display", "block")
    $("#TITILEaboutpage").css("display", "none")
    // 更改标签样式
    $("#aboutBTN").removeClass("active")
    $("#homepageBTN").addClass("active")
    // 替换细节
    $("#info").html("Homepage")
});

// 音乐播放模块 important！重要！

$(function () {
    getSong();
})


//获取歌曲链接并插入dom中
function getSong() {
    var audio = document.getElementById("audio");
    audio.src = "mp3/ILLENIUM-CrazyTimes.mp3";
    var str = audio.src;
    var filename = str.substring(str.lastIndexOf("/") + 1, str.length);
    document.getElementById("songInfo").innerHTML = filename;
    audio.loop = true; //歌曲循环
    playCotrol(); //播放控制函数

}

//点击播放/暂停
function clicks() {
    var audio = document.getElementById("audio");
    $("#control").click(function () {
        if ($("#control").hasClass("glyphicon-play")) {
            $("#control").addClass("glyphicon-pause").removeClass("glyphicon-play");
            audio.play();//开始播放
            dragMove();//并且滚动条开始滑动
        } else {
            $("#control").addClass("glyphicon-play").removeClass("glyphicon-pause");
            audio.pause();
        }
    })
}

//播放时间
function timeChange(time, timePlace) {//默认获取的时间是时间戳改成我们常见的时间格式
    var timePlace = document.getElementById(timePlace);
    //分钟
    var minute = time / 60;
    var minutes = parseInt(minute);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //秒
    var second = time % 60;
    seconds = parseInt(second);
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var allTime = "" + minutes + "" + ":" + "" + seconds + ""
    timePlace.innerHTML = allTime;
}

//播放事件监听
function playCotrol() {
    audio.addEventListener("loadeddata", //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
        function () {
            //$("#control").addClass("glyphicon-play").removeClass("glyphicon-refresh");
            addListenTouch(); //歌曲加载之后才可以拖动进度条
            var allTime = audio.duration;
            timeChange(allTime, "allTime");
            setInterval(function () {
                var currentTime = audio.currentTime;
                $("#time .currentTime").html(timeChange(currentTime, "currentTime"));
            }, 1000);
            clicks();
        }, false);

    audio.addEventListener("pause",
        function () { //监听暂停
            $("#control").addClass("glyphicon-play").removeClass("glyphicon-pause");
            if (audio.currentTime == audio.duration) {
                audio.stop();
                audio.currentTime = 0;
            }
        }, false);
    audio.addEventListener("play",
        function () { //监听暂停
            $("#control").addClass("glyphicon-pause").removeClass("glyphicon-play");
            dragMove();
        }, false);
    audio.addEventListener("ended", function () {
        alert(0)
    }, false)
}

//进度条
var startX, x, aboveX = 0; //触摸时的坐标 //滑动的距离  //设一个全局变量记录上一次内部块滑动的位置

//1拖动监听touch事件
function addListenTouch() {
    document.getElementById("drag").addEventListener("touchstart", touchStart, false);
    document.getElementById("drag").addEventListener("touchmove", touchMove, false);
    document.getElementById("drag").addEventListener("touchend", touchEnd, false);
    var drag = document.getElementById("drag");
    var speed = document.getElementById("speed");
}

//touchstart,touchmove,touchend事件函数
function touchStart(e) {
    e.preventDefault();
    var touch = e.touches[0];
    startX = touch.pageX;
}
function touchMove(e) { //滑动
    e.preventDefault();
    var touch = e.touches[0];
    x = touch.pageX - startX; //滑动的距离
    //drag.style.webkitTransform = 'translate(' + 0+ 'px, ' + y + 'px)';  //也可以用css3的方式
    drag.style.left = aboveX + x + "px"; //
    speed.style.width = -((window.innerWidth) - (aboveX + x)) + "px";
}
function touchEnd(e) { //手指离开屏幕
    e.preventDefault();
    aboveX = parseInt(drag.style.left);
    var touch = e.touches[0];
    var dragPaddingLeft = drag.style.left;
    var change = dragPaddingLeft.replace("px", "");
    numDragpaddingLeft = parseInt(change);
    var currentTime = (numDragpaddingLeft / (window.innerWidth - 10)) * audio.duration;//30是拖动圆圈的长度，减掉是为了让歌曲结束的时候不会跑到window以外
    audio.currentTime = currentTime;
}
//3拖动的滑动条前进
function dragMove() {
    setInterval(function () {
        drag.style.left = (audio.currentTime / audio.duration) * (window.innerWidth - 10) + "px";
        speed.style.width = ((audio.currentTime / audio.duration)*100) + "%";
    }, 500);
}
}