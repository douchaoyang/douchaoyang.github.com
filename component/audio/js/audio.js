var player = (function() {
	// 所有音乐数据
	var Audios = [
		{
			title: "Coldplay - something just like this",
			src: "https://youzupt.oss-cn-shanghai.aliyuncs.com/y_web/fe33671c-8740-4d0a-a44f-82d5c45555da_2019-07-01.mp3",
			icon: "",
			author: ""
		},
		{
			title: "Cleopatra Stratan - Zunea-Zunea",
			src: "https://youzupt.oss-cn-shanghai.aliyuncs.com/y_web/71a8b3b1-901d-408f-aea1-917cfc4558b5_2019-07-01.mp3",
			icon: "",
			author: ""
		},
		{
			title: "Defrix - Walking In the Sun",
			src: "https://youzupt.oss-cn-shanghai.aliyuncs.com/y_web/0043ddcb-e2a0-4ecb-8a54-c34cfa515e6a_2019-07-01.mp3",
			icon: "",
			author: ""
		},
		{
			title: "Gigi D´Agastino - tu vivi nell'aria",
			src: "https://youzupt.oss-cn-shanghai.aliyuncs.com/y_web/66652807-4693-49fa-80a2-e8f93b5fcb21_2019-07-01.mp3",
			icon: "",
			author: ""
		}
	];

	// 定义dom 控制器
	var title = $(".title"); // 名字
	var totaltime = $(".totaltime");
	var nowtime = $(".nowtime");
	var audio = document.getElementById("audio");
	var ctrlButton = $(".start");
	var bar  = $(".bar");
	var barPr = $(".bar-pr");

	var ing = false; // 是否在播放中
	var idx = 0; // 当前播放的歌曲id

	// 定义事件类型
	var isTch = "ontouchstart" in window;
	console.log(isTch)
	var eStart = isTch ? "touchstart" : "mousedown";
	var eDrag = isTch ? "touchmove" : "mousemove";
	var eCancel = isTch ? "touchend" : "mouseup";

	// 歌曲时间格式化
	function timeFormat(secs) {
		var hours = Math.floor( secs / 3600 ), minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
		return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
	}

	// 初始化歌曲
	function load(index) {
		idx = index;
		audio.src = Audios[idx].src;
		title.html(Audios[idx].title);
	}

	// 加载歌曲信息
	function loadeddata() {
		totaltime.html(timeFormat(audio.duration));
		nowtime.html(timeFormat(audio.currentTime));
	}

	// 歌曲控制信息
	function timeupdate() {
		nowtime.html(timeFormat(audio.currentTime));
		barPr.width(audio.currentTime / audio.duration * 100 + "%");
	}

	// 拖动进度条
	function setCurrentPos(e) {
		var ev = isTch ? e.originalEvent.touches[0] : e;
		audio.currentTime = Math.round((audio.duration * (ev.pageX - bar.offset().left)) / bar.width());
	}

	// 歌曲已结束
	function ended() {
		goEndState();
	}

	// 绑定控制器
	function bind() {
		ctrlButton.on("click", ctrl); // 播放暂停控制
		// 拖动
		bar.on(eStart, function(e) {
			setCurrentPos(e);
			bar.on(eDrag, function(e) {
				setCurrentPos(e);
			});
		}).on(eCancel, function() {
			bar.off(eDrag);
		});
		audio.addEventListener("loadeddata", loadeddata, false);
		audio.addEventListener("timeupdate", timeupdate, false);
		audio.addEventListener("ended", ended, false);
	}

	// 播放
	function start() {
		audio.play();
		goIngState();
	}

	// 暂停
	function stop() {
		audio.pause();
		goEndState();
	}

	// 切歌
	function play(index) {
		if(index == idx) {
			!ing && start();
			return false;
		}
		if(index >=0 && index < Audios.length) {
			stop();
			load(index);
			start();
		}
	}

	// 上一首
	function prev() {
		var i = (idx - 1 + Audios.length) % Audios.length;
		play(i);
	}

	// 下一首
	function next() {
		var i = (idx + 1 + Audios.length) % Audios.length;
		play(i);
	}

	// 播放状态
	function goIngState() {
		ing = true;
		ctrlButton.addClass("ing");
	}

	// 停止状态
	function goEndState() {
		ing = false;
		ctrlButton.removeClass("ing");
	}

	// 
	function ctrl() {
		audio.paused ? start() : stop();
	}

	function init(index) {
		totaltime.html("--:--");
		nowtime.html("--:--");
		load(index);
		bind();
	}

	return {
		init: init,
		ctrl: ctrl,
		play: play,
		prev: prev,
		next: next,
		ing: ing,
		idx: idx
	}

})();



/* =======================实现========================= */

player.init(0); // 初始化播放哪一首

// 切歌
$(".chan").on("click", "a", function() {
	var index = parseInt($(this).attr("data-audio-idx"));
	player.play(index);
});

// 上一首
$(".prev").click(function() {
	player.prev();
});

// 下一首
$(".next").click(function() {
	player.next();
});