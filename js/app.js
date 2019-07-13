(function(){
	// 背景动画
	var _particles = document.createElement("div");
	_particles.id = "particles";
	document.getElementsByTagName("body")[0].appendChild(_particles);
	if(window.HTMLCanvasElement)
	{
		var _s = document.createElement("script");
		var _h = document.getElementsByTagName("head")[0];
		_s.type = "text/javascript";
		_s.src = "js/particles.js";
		_h.appendChild(_s);
	}
})();

var songs = {
    album:null,
    player:null,
    ctrl:null,
    prev:null,
    next:null,
    tip: null,
    now: null,
    line: null,
    length: 0,
    index: 0,
    datas:[
            {
            name: "唐人",
            url: "http://upscuw.changba.com/1161300843.mp3"
            },
            {
            name: "清明雨上",
            url: "http://upscuw.changba.com/1156258746.mp3"
            },
            {
            name: "这些年来",
            url: "http://qiniuuwmp3.changba.com/870826173.mp3"
            },
            {
            name: "十七岁",
            url: "https://qiniuuwmp3.changba.com/1048485277.mp3"
            },
            {
            name: "斑马斑马",
            url: "http://qiniuuwmp3.changba.com/998115437.mp3"
            },
            {
            name: "讲不出再见",
            url: "http://lzscuw.changba.com/896766428.mp3"
            },
            {
            name: "隐形的翅膀",
            url: "http://lzscuw.changba.com/1048481429.mp3"
            },
            {
            name: "后来",
            url: "http://qiniuuwmp3.changba.com/1033538058.mp3"
            },
            {
            name: "当年情",
            url: "http://qiniuuwmp3.changba.com/986013268.mp3"
            },
            {
            name: "平凡之路",
            url: "http://qiniuuwmp3.changba.com/983880499.mp3"
            },
            {
            name: "风往北吹",
            url: "http://qiniuuwmp3.changba.com/980489491.mp3"
            },
            {
            name: "小幸运",
            url: "http://qiniuuwmp3.changba.com/976878450.mp3"
            },
            {
            name: "友情岁月",
            url: "http://lzscuw.changba.com/968050614.mp3"
            },
            {
            name: "爱拼才会赢",
            url: "http://qiniuuwmp3.changba.com/960983555.mp3"
            },
            {
            name: "爱要怎么说出口",
            url: "http://qiniuuwmp3.changba.com/937751790.mp3"
            },
            {
            name: "童年",
            url: "http://lzscuw.changba.com/918336712.mp3"
            },
            {
            name: "等一分钟",
            url: "http://qiniuuwmp3.changba.com/918328884.mp3"
            },
            {
            name: "该死的温柔",
            url: "http://lzscuw.changba.com/902233121.mp3"
            },
            {
            name: "当我唱起这首歌",
            url: "http://qiniuuwmp3.changba.com/900999190.mp3"
            },
            {
            name: "伤心太平洋",
            url: "http://qiniuuwmp3.changba.com/895125844.mp3"
            },
            {
            name: "魔鬼中的天使",
            url: "http://qiniuuwmp3.changba.com/875364873.mp3"
            },
            {
            name: "无间道",
            url: "http://qiniuuwmp3.changba.com/875350381.mp3"
            },
            {
            name: "江南",
            url: "http://qiniuuwmp3.changba.com/873156058.mp3"
            },
            {
            name: "爱一个人好难",
            url: "http://lzscuw.changba.com/872623401.mp3"
            },
            {
            name: "一直很安静",
            url: "http://lzscuw.changba.com/869845926.mp3"
            },
            {
            name: "你还要我怎样",
            url: "http://qiniuuwmp3.changba.com/869841185.mp3"
            },
            {
            name: "套马杆",
            url: "http://lzscuw.changba.com/868561709.mp3"
            },
            {
            name: "刚刚好",
            url: "http://qiniuuwmp3.changba.com/862417051.mp3"
            }
        ]
}
songs.init = function() {
    var _t = this;
    // 获取各个元素
    _t.album  = document.getElementById("album");
    _t.player = document.getElementById("player-mic");
    _t.ctrl   = document.getElementById("play-mic");
    _t.prev   = document.getElementById("prev-mic");
    _t.next   = document.getElementById("next-mic");
    _t.tip    = document.getElementById("tip-mic");
    _t.now    = document.getElementById("now-mic");
    _t.line   = document.getElementById("line-mic");
    _t.length = _t.datas.length;
    // 默认添加第一首歌
    _t.go(_t.index);
    // 返回songs对象
    return _t;
}
songs.go = function(i) {
    var _t = this;
    _t.player.src = _t.datas[i].url;
    _t.now.innerHTML = _t.datas[i].name + ' - 吾辈组长';
}
songs.play = function() {
    var _t = this;
    // 播放与暂停
    _t.ctrl.addEventListener("click", function (){
        if(_t.player.paused) {
            _t.player.play();
        }
        else {
            _t.player.pause();
        }
    }, false);
    // 监听歌曲播放、暂停、结束
    _t.player.addEventListener("play", function () {
        // 显示动态的tip
        _t.tip.style.display = "block";
        // 显示歌曲名字
        _t.now.className = "marq";
        _t.ctrl.className = "pause";
    });
    _t.player.addEventListener("pause", function () {
        // 显示动态的tip
        _t.tip.style.display = "none";
        // 显示歌曲名字
        _t.now.className = "";
        _t.ctrl.className = "";
    });
    _t.player.addEventListener("timeupdate", function() {
        _t.line.style.width = _t.player.currentTime / _t.player.duration * 100 + "%";
    });
    // 上一首
    _t.prev.addEventListener("click", function() {
        _t.now.className = "";
        _t.index = (--_t.index + _t.length) % _t.length;
        _t.go(_t.index);
        _t.player.play();
    }, false);
    // 下一首
    _t.next.addEventListener("click", function() {
        _t.now.className = "";
        _t.index = (++_t.index + _t.length) % _t.length;  
        _t.go(_t.index);
        _t.player.play();
    }, false);
}
// 加载歌曲
songs.init().play();