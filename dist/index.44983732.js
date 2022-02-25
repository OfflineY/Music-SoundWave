window.onload = function() {
    // 前后端交接模块 >>>>>>>>>>>>>>>>>
    // 获取当前页面 url ，防止换域名无法使用
    // var host = window.location.host;
    // $.getJSON('http://' + host + '/data', function (data) {
    $.getJSON('data.json', function(data) {
        var $jsonDATA = $("#jsonDATA");
        var strHtml = "";
        //存储数据的变量
        $jsonDATA.empty();
        //清空内容
        $.each(data, function(infoIndex, info) {
            strHtml += '<tr><th scope="row">' + info["num"] + '<span class="btn btn-xs glyphicon glyphicon-play-circle yuan-play-btn-sm"></span></th>';
            strHtml += '<td>' + info["name"] + '</td>';
            strHtml += '<td>' + info["time"] + '</td>';
            strHtml += '<td>' + info["author"] + '</td><script>$(".yuan-play-btn-sm").click(function(){var musicURL = "mp3/' + info["url"] + '";});    $(function () {getSong();})</script>';
        });
        $jsonDATA.html(strHtml); //显示处理后的数据
    });
    // 前端模块 >>>>>>>>>>>>>
    // 初始化URL函数
    $(function() {
        getSong();
    });
    var musicURL = "mp3/ILLENIUM-CrazyTimes.mp3";
    // 点击 About 标签触发 >>
    $("#aboutBTN").click(function() {
        // 更改主页面内容
        $("#MAINhomepage").css("display", "none");
        $("#MAINaboutpage").css("display", "block");
        $("#TITILEhomepage").css("display", "none");
        $("#TITILEaboutpage").css("display", "block");
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
        $("#TITILEhomepage").css("display", "block");
        $("#TITILEaboutpage").css("display", "none");
        // 更改标签样式
        $("#aboutBTN").removeClass("active");
        $("#homepageBTN").addClass("active");
        // 替换细节
        $("#info").html("Homepage");
    });
    // 音乐播放模块 important！重要！
    //获取歌曲链接并插入dom中
    function getSong() {
        var audio = document.getElementById("audio");
        audio.src = musicURL;
        var str = audio.src;
        var filename = str.substring(str.lastIndexOf("/") + 1, str.length);
        document.getElementById("songInfo").innerHTML = filename;
        audio.loop = true; //歌曲循环
        playCotrol(); //播放控制函数
    }
    //点击播放/暂停
    function clicks() {
        var audio = document.getElementById("audio");
        $("#control").click(function() {
            if ($("#control").hasClass("glyphicon-play")) {
                $("#control").addClass("glyphicon-pause").removeClass("glyphicon-play");
                //开始播放
                audio.play();
                //并且滚动条开始滑动
                dragMove();
            } else {
                $("#control").addClass("glyphicon-play").removeClass("glyphicon-pause");
                audio.pause();
            }
        });
    }
    //播放时间
    function timeChange(time, timePlace) {
        //默认获取的时间是时间戳改成我们常见的时间格式
        var timePlace = document.getElementById(timePlace);
        //分钟
        var minute = time / 60;
        var minutes = parseInt(minute);
        if (minutes < 10) minutes = "0" + minutes;
        //秒
        var second = time % 60;
        seconds = parseInt(second);
        if (seconds < 10) seconds = "0" + seconds;
        var allTime = "" + minutes + "" + ":" + "" + seconds + "";
        timePlace.innerHTML = allTime;
    }
    //播放事件监听
    function playCotrol() {
        audio.addEventListener("loadeddata", //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
        function() {
            //$("#control").addClass("glyphicon-play").removeClass("glyphicon-refresh");
            //歌曲加载之后才可以拖动进度条
            addListenTouch();
            var allTime = audio.duration;
            timeChange(allTime, "allTime");
            setInterval(function() {
                var currentTime = audio.currentTime;
                $("#time .currentTime").html(timeChange(currentTime, "currentTime"));
            }, 1000);
            clicks();
        }, false);
        audio.addEventListener("pause", function() {
            //监听暂停
            $("#control").addClass("glyphicon-play").removeClass("glyphicon-pause");
            if (audio.currentTime == audio.duration) {
                audio.stop();
                audio.currentTime = 0;
            }
        }, false);
        audio.addEventListener("play", function() {
            //监听暂停
            $("#control").addClass("glyphicon-pause").removeClass("glyphicon-play");
            dragMove();
        }, false);
        audio.addEventListener("ended", function() {
            alert(0);
        }, false);
    }
    //进度条
    function addListenTouch() {
        var speed = document.getElementById("speed");
    }
    function dragMove() {
        setInterval(function() {
            speed.style.width = audio.currentTime / audio.duration * 100 + "%";
        }, 1000);
    }
};

//# sourceMappingURL=index.44983732.js.map
