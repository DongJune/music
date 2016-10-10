$(function () {
    var audio = $("audio").get(0);
    var play = $(".play")
    //播放键的点击事件
    play.click(function () {
        if (audio.paused) {
            audio.play()
        } else {
            audio.pause()
        }
    })
    //audio的播放事件
    $(audio).on("play", function () {
        play.addClass("pause")
        $(".xiangqing").find(".geming").text(quku[index].name)
        $(".xiangqing").find(".geshou").text(quku[index].geshou)
        $(".photo").addClass("xuanzhuan")
    })
    //audio的暂停事件
    $(audio).on("pause", function () {
        play.removeClass("pause")
        $(".photo").removeClass("xuanzhuan")

    })
    //音乐播放进度
    $("audio").on("timeupdate", function () {
        $("#now").text(timeau(audio.currentTime))
        $("#total").text(timeau(audio.duration))
        $(".speed-scroll").find(".yuan").css({
            left: parseInt($(".speed-scroll").width() * audio.currentTime / audio.duration - $(".speed-scroll").find(".yuan").outerWidth() * 0.5)
        })
        $(".speed-scroll").find(".speed-now").css({
            width: parseInt($(".speed-scroll").width() * audio.currentTime / audio.duration)
        })
        geci()
    })
    //音乐播放进程
    $("audio").on("canplay", function () {
        $("audio").triggerHandler("timeupdate")
    })
    //音乐播放进程红条的位置
    $(".speed-scroll").click(function (e) {
        var ev = e || window.event;
        audio.currentTime = audio.duration * (ev.offsetX / $(this).width());
        audio.play()
    })
    // var t=setInterval(geci,1000)
    //阻止冒泡
    $(".speed-scroll").on("click", false)
    //滚动条圆点的点击事件阻止冒泡
    $(".speed-scroll").find(".yuan").on("click", false)
    //滚动条圆点的移动事件
    $(".speed-scroll").find(".yuan").on("mousedown", function (e) {
        var ev = e || window.event;
        var x = ev.offsetX
        $(document).on("mousemove", function (e) {
            var sc = $(".speed-scroll").offset().left
            var ev = e || window.event;
            var xs = ev.clientX
            audio.currentTime = audio.duration * (ev.clientX - x - sc) / $(".speed-scroll").width();
        })
        $(document).mouseup(function () {
            $(document).off("mousemove")
            audio.play()
        })
    })

    //声音进度
    //音量的变化
    $(audio).on("volumechange", function () {
        $(".sound-scroll").find(".yuan").css({
            left: parseInt($(".sound-scroll").width() * audio.volume - ($(".sound-scroll").find(".yuan").outerWidth() * 0.5))
        })
        $(".sound-scroll").find(".sound-now").css({
            width: parseInt($(".sound-scroll").width() * audio.volume)
        })
        if (audio.volume == 0) {
            $(".sound-icon").addClass("quire")
        } else {
            $(".sound-icon").removeClass("quire")
        }
    })
    //声音条的点击事件
    $(".sound-scroll").click(function (e) {
        var ev = e || window.event;
        audio.volume = ev.offsetX / $(this).width()
    })
    var loud
    $(".sound-icon").on("click", false)
    $(".sound-scroll").find(".yuan").on("click", false)
    //静音和声音图片切换
    $(".sound-icon").on("click", false)
    $(".sound-icon").click(function () {
        if (audio.volume == 0) {
            audio.volume = loud;
        } else {
            if (loud == "undefined") {
                loud = 1
            } else {
                loud = audio.volume
            }
            audio.volume = 0;
        }
    })
    $(".sound-scroll").find(".yuan").on("click", false)
    //声音滚动条的移动事件
    $(".sound-scroll").find(".yuan").on("mousedown", function (e) {
        var ev = e || window.event;
        var x = ev.offsetX + 3
        var sc = $(".sound-scroll").offset().left
        console.log(sc)
        $(document).on("mousemove", function (e) {
            var ev = e || window.event;
            var xs = ev.clientX
            audio.volume = (ev.clientX - x - sc) / ($(".sound-scroll").width() - ($(".sound-scroll").find(".yuan").width() * 0.5));
        })
        $(document).mouseup(function () {
            $(document).off("mousemove")
        })
    })
    //事件的取整
    function timeau(al) {
        var a = parseInt(al)
        var hour = parseInt(a / 3600);
        var min = parseInt(a % 3600 / 60);
        var sec = parseInt(a % 3600 % 60 % 60);
        hour = hour <= 9 ? ("0" + hour) : hour;
        min = min <= 9 ? ("0" + min) : min;
        sec = sec <= 9 ? ("0" + sec) : sec;
        if (hour == 0) {
            return min + ":" + sec;
        } else {
            return hour + ":" + min + ":" + sec;
        }
    }

    //音乐结束事件，自动切换下一首
    $(audio).on("ended", function () {
        $(".button").find(".right").click()
        $(".geci-scroll div").css({"color": "#ccc"})
    })
    //歌曲切换
    var quku = [{
        "name": "被驯服的象",
        "geshou": "蔡健雅",
        "zhuanji": "天使与魔鬼的对话",
        "src": "蔡健雅 - 被驯服的象.mp3",
        "photo": "蔡健雅",
        "content": "蔡健雅（Tanya Chua），1975年1月28日出生于新加坡，祖籍中国江苏省，现定居于台湾。歌手、制作人、创作人。1997年在新加坡发行英语专辑《Bored》正式出道；1999年签约宝丽金唱片推出同名国语专辑《Tanya蔡健雅》即入围第11届台湾金曲奖最佳新人奖；2003年将国语唱片签约于台湾华纳唱片，发行专辑《陌生人》；2005年发行专辑《双栖动物》，凭借此专辑入围第17届台湾金曲奖三项提名，获得最佳国语女演唱人奖；2007年签约亚神娱乐发行专辑《Goodbye & Hello》，凭借此专辑入围第19届台湾金曲奖5项提名，获得最佳专辑制作人奖和最佳国语女歌手奖 ；2008年发行专辑《My Space》，凭借此专辑入围第21届台湾金曲奖4项提名；2011年发行中文专辑《说到爱》和英文专辑《just say so》，凭专辑《说到爱》入围第23届台湾金曲奖6项提名，个人第三次获得台湾金曲奖最佳国语女歌手奖，成为第一位三度获得金曲奖最佳国语女歌手奖的华语歌手；2013年发行专辑《天使与魔鬼的对话》；2014年和2015年作为导师参加CCTV-3综艺节目《中国好歌曲》；2015年发行专辑《失语者》。"
    },
        {
            "name": "喜帖街",
            "geshou": "谢安琪",
            "zhuanji": "Binary",
            "src": "谢安琪 - 喜帖街.mp3",
            "photo": "谢安琪",
            "content": "谢安琪，1977年3月13日出生于中国香港，女歌手、演员，毕业于香港大学文学院。现属金牌大风旗下艺人。2005年1月5日以歌曲《姿色份子》出道，2006年推出歌曲《愁人节》崭露头角，但突然宣布暂别乐坛与歌手张继聪订婚，并于2007年诞下儿子张瞻 。2008年获四台联颁音乐大奖传媒大奖 。2008年至2011年连续四届夺得叱咤乐坛女歌手（银奖)。2008年至2014年连续六届夺得十大中文金曲颁奖音乐会优秀流行歌手大奖及其中五届夺得十大中文金曲奖。2010至2012连续三届夺得新城劲爆亚洲歌手大奖。2010年获选为香港十大杰出青年。"
        },
        {
            "name": "罗生门",
            "geshou": "谢安琪",
            "zhuanji": "Addendum",
            "src": "麦浚龙,谢安琪 - 罗生门.mp3",
            "photo": "谢安琪",
            "content": "谢安琪，1977年3月13日出生于中国香港，女歌手、演员，毕业于香港大学文学院。现属金牌大风旗下艺人。2005年1月5日以歌曲《姿色份子》出道，2006年推出歌曲《愁人节》崭露头角，但突然宣布暂别乐坛与歌手张继聪订婚，并于2007年诞下儿子张瞻 。2008年获四台联颁音乐大奖传媒大奖 。2008年至2011年连续四届夺得叱咤乐坛女歌手（银奖)。2008年至2014年连续六届夺得十大中文金曲颁奖音乐会优秀流行歌手大奖及其中五届夺得十大中文金曲奖。2010至2012连续三届夺得新城劲爆亚洲歌手大奖。2010年获选为香港十大杰出青年。"
        },
        {
            "name": "I Was a Fool",
            "geshou": "Tegan and Sara",
            "zhuanji": "Addendum",
            "src": "Tegan and Sara - I Was a Fool.mp3",
            "photo": "TeganandSara",
            "content": "Tegan And Sara ，来自加拿大Calgary的双胞胎姐妹，自组的同名乐团，曾为2014年上映的乐高大电影献曲Everything Is Awesome。"
        },
        {
            "name": "被驯服的象",
            "geshou": "蔡健雅",
            "zhuanji": "天使与魔鬼的对话",
            "src": "蔡健雅 - 被驯服的象.mp3",
            "photo": "蔡健雅",
            "content": "蔡健雅（Tanya Chua），1975年1月28日出生于新加坡，祖籍中国江苏省，现定居于台湾。歌手、制作人、创作人1997年在新加坡发行英语专辑《Bored》正式出道；1999年签约宝丽金唱片推出同名国语专辑《Tanya蔡健雅》即入围第11届台湾金曲奖最佳新人奖；2003年将国语唱片签约于台湾华纳唱片，发行专辑《陌生人》；2005年发行专辑《双栖动物》，凭借此专辑入围第17届台湾金曲奖三项提名，获得最佳国语女演唱人奖；2007年签约亚神娱乐发行专辑《Goodbye & Hello》，凭借此专辑入围第19届台湾金曲奖5项提名，获得最佳专辑制作人奖和最佳国语女歌手奖；2008年发行专辑《My Space》，凭借此专辑入围第21届台湾金曲奖4项提名；2011年发行中文专辑《说到爱》和英文专辑《just say so》，凭专辑《说到爱》入围第23届台湾金曲奖6项提名，个人第三次获得台湾金曲奖最佳国语女歌手奖，成为第一位三度获得金曲奖最佳国语女歌手奖的华语歌手；2013年发行专辑《天使与魔鬼的对话》；2014年和2015年作为导师参加CCTV-3综艺节目《中国好歌曲》；2015年发行专辑《失语者》。"
        },
        {
            "name": "喜帖街",
            "geshou": "谢安琪",
            "zhuanji": "Binary",
            "src": "谢安琪 - 喜帖街.mp3",
            "photo": "谢安琪",
            "content": "谢安琪，1977年3月13日出生于中国香港，女歌手、演员，毕业于香港大学文学院。现属金牌大风旗下艺人。2005年1月5日以歌曲《姿色份子》出道，2006年推出歌曲《愁人节》崭露头角，但突然宣布暂别乐坛与歌手张继聪订婚，并于2007年诞下儿子张瞻 。2008年获四台联颁音乐大奖传媒大奖 。2008年至2011年连续四届夺得叱咤乐坛女歌手（银奖)。2008年至2014年连续六届夺得十大中文金曲颁奖音乐会优秀流行歌手大奖及其中五届夺得十大中文金曲奖。2010至2012连续三届夺得新城劲爆亚洲歌手大奖。2010年获选为香港十大杰出青年。"
        },
        {
            "name": "罗生门",
            "geshou": "谢安琪",
            "zhuanji": "Addendum",
            "src": "麦浚龙,谢安琪 - 罗生门.mp3",
            "photo": "谢安琪",
            "content": "谢安琪，1977年3月13日出生于中国香港，女歌手、演员，毕业于香港大学文学院。现属金牌大风旗下艺人。2005年1月5日以歌曲《姿色份子》出道，2006年推出歌曲《愁人节》崭露头角，但突然宣布暂别乐坛与歌手张继聪订婚，并于2007年诞下儿子张瞻 。2008年获四台联颁音乐大奖传媒大奖 。2008年至2011年连续四届夺得叱咤乐坛女歌手（银奖)。2008年至2014年连续六届夺得十大中文金曲颁奖音乐会优秀流行歌手大奖及其中五届夺得十大中文金曲奖。2010至2012连续三届夺得新城劲爆亚洲歌手大奖。2010年获选为香港十大杰出青年。"
        },
        {
            "name": "I Was a Fool",
            "geshou": "Tegan and Sara",
            "zhuanji": "Addendum",
            "src": "Tegan and Sara - I Was a Fool.mp3",
            "photo": "TeganandSara",
            "content": "Tegan And Sara ，来自加拿大Calgary的双胞胎姐妹，自组的同名乐团，曾为2014年上映的乐高大电影献曲Everything Is Awesome。"
        }
    ]
    var index = 0;
    //图片加载
    function tupianjiazai(index) {
        $(".xiangqing").find(".geming").text(quku[index].name)
        $(".tu").css({
            "background": "url(./images/" + quku[index].photo + ".jpg) no-repeat center center/50px 50px"
        })
        $(".begining .photo").css({
            "background": "url(./images/" + quku[index].photo + ".jpg) no-repeat center center/180px 180px"
        })
        // $(".begining .resc").text(quku[index].content)
        $(".geci").css({
            "background": "url(./images/" + quku[index].photo + ".jpg) no-repeat  top center/ 100% 99%"
        })
        $(".xiangqing").find(".geshou").text(quku[index].geshou)
        $(".danqu").removeClass("addcolor")
        $(".list-danqu ul").find(".num").removeClass("star")
        $(".danqu ul").find(".begin").remove()
    }

    //页面重构
    function rebuile() {
        $(".gedan").empty()
        var nums = 0
        tupianjiazai(index)
        quku.map(function (v, i) {
            nums++
            $("<li class='danqu' id=" + (nums-1) + "><ul><li class='num'>" + nums + "</li><li>" + v.name + "</li><li>" + v.geshou + "</li><li>" + v.zhuanji + "</li><li class='delete'></li><li class='mv'></li><li class='likes'></li></ul></li>").appendTo(".gedan")
            $("<li class='list-danqu' id=" + (nums - 1) + "><ul><li class='num'></li><li>" + v.name + "</li><li>" + v.geshou + "</li><li class='delete'></li></ul></li>").appendTo(".list1")
        })
    }

    rebuile()
    $(".danqu").eq(index).addClass("addcolor")
    $(".list-danqu ul").find(".num").eq(index).addClass("star")
    $(".danqu ").eq(index).find("ul").append("<li class='begin'></li>")
    function tianjia(index) {
        $(".danqu").eq(index).addClass("addcolor")
        $(".danqu ").eq(index).find("ul").append("<li class='begin'></li>")
        $(".list-danqu ul").find(".num").eq(index).addClass("star")
    }

    $(".danqu .likes").on("click", false)
    $(".danqu .delete").on("click", false)
    $(".danqu .likes").click(function () {
        $(this).toggleClass("like1")
    })
    $(".danqu .delete").click(function () {
        var s1 = $(".danqu .delete").index($(this))
        $(this).parentsUntil(".gedan").remove()

    })

    //右键下一首
    $(".button").find(".right").click(function () {
        if ($(".loop").hasClass("alter")){
            index=Math.floor(Math.random()*quku.length)
        }else if($(".loop").hasClass("one")&&!($(".loop").hasClass("alter"))){
            index=index;
        }else{
            index++;
        }

        if (index == quku.length) {
            index = 0
        }
        audio.src = "./mp3/" + quku[index].src
        audio.play()
        tupianjiazai(index)
        tianjia(index)
        next = 0
        $(".geci-scroll div").css({"color":"#ccc"})
        $(".geci-scroll").css({"top": 50})
    })
    //左键上一首
    $(".button").find(".left").click(function () {
        if ($(".loop").hasClass("alter")){
            index=Math.floor(Math.random()*quku.length)
        }else if($(".loop").hasClass("one")&&!($(".loop").hasClass("alter"))){
            index=index;
        }else{
            index--;
        }
        if (index == -1) {
            index = quku.length - 1
        }
        audio.src = "./mp3/" + quku[index].src
        audio.play()
        tupianjiazai(index)
        tianjia(index)
        next = 0
        $(".geci-scroll div").css({"color":"#ccc"})
    })
    //歌单列表
    //歌单点击播放
    $(".gedan").on("click", ".danqu", false)
    $(".gedan").on("click", ".danqu", function () {
        index = $(this).attr("id")
        audio.src = "./mp3/" + quku[index].src
        audio.play()
        tupianjiazai(index)
        tianjia(index)
    })
    // 切换到歌词界面
    $(".ci").on("click",false)
    $(".ci").click(function(){
    $(".ci-open").slideToggle()
    })
    //歌曲播放方式
    $(".loop").click(function () {
        if (!$(this).hasClass("one")) {
            $(this).addClass("one")

        } else if (!$(this).hasClass("alter")) {
            $(this).addClass("alter")
        } else if ($(this).hasClass("one") && $(this).hasClass("alter")) {
            $(this).removeClass("alter")
            $(this).removeClass("one")
        }
    })
    var str = {
        "00:22": "到底要笑得多虚伪 才能够融入这世界",
        "00:27": "每个人的脸上都像是贴了张一样的假面",
        "00:33": "想不起我在做什么 想不起我在想什么",
        "00:38": "想不起灵魂深处 到底发生了什么",
        "00:43": "迷雾 迷雾 在迷雾 我惊觉自己在原地踏步",
        "00:48": "到底是谁把我心蒙住 不想再糊涂",
        "00:54": "迷路 迷路 迷了路 我就彻底被这团迷雾困住",
        "00:59": "谁能够指引我一条路 带我走上正途",
        "01:07": "......",
        "01:16": "装不出融入的态度 空气里充斥着虚无",
        "01:22": "说什么都掩饰不了我这局外人的局促",
        "01:27": "想不通自己怎么了 想不通世界怎么了",
        "01:33": "想不通心灵深处 到底变成什么了",
        "01:38": "迷雾 迷雾 在迷雾 我惊觉自己在原地踏步",
        "01:43": "到底是谁把我心蒙住 不想再糊涂",
        "01:48": "迷路 迷路 迷了路 我就彻底被这团迷雾困住",
        "01:54": "谁能够指引我一条路 带我走上正途",
        "02:00": "掌声 若需要掌声 只要你愿当被驯服的象",
        "02:07": "这舞台你就可以上 荣耀 胜过被嘲笑",
        "02:15": "所以抛开自尊 咬紧牙根硬撑",
        "02:21": "迷雾 迷雾 在迷雾 我惊觉自己在原地踏步",
        "02:26": "到底是谁把我心蒙住 不想再糊涂",
        "02:32": "迷路 迷路 迷了路 我就彻底被这团迷雾困住",
        "02:37": "谁能够指引我一条路 带我走上正途",
        "02:43": "迷路 迷路 迷了路 我就彻底被这团迷雾困住",
        "02:48": "谁能够指引我一条路 带我走上正途",
        "02:59": "....."
    }
    //  歌词自动走动
    var next = 0
    $.map(str, function (v, i) {
        $("<div class='a" + i + "'>" + v + "</div>").appendTo(".geci-scroll")

    })
    geci = function () {
        var as = $(".geci-scroll div")
        if (str[timeau(audio.currentTime)] != undefined) {
            as.eq(next).css({"color": "#BB7378"})
            $(".geci-scroll").css({"top": -next * 50})
            $(".ci-open").text(str[timeau(audio.currentTime)])
            next++
            delete str[timeau(audio.currentTime)]
        }
    }
})

