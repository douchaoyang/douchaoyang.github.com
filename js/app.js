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
    list:null,
    datas:[
            {
            name: "十七岁",
            url: "https://qiniuuwmp3.changba.com/1048485277.mp3"
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
            name: "只要有你",
            url: "http://qiniuuwmp3.changba.com/1033529044.mp3"
            },
            {
            name: "晴天",
            url: "http://lzscuw.changba.com/1033523406.mp3"
            },
            {
            name: "需要人陪",
            url: "http://lzscuw.changba.com/1019224123.mp3"
            },
            {
            name: "斑马斑马",
            url: "http://qiniuuwmp3.changba.com/998115437.mp3"
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
            name: "醉拳",
            url: "http://qiniuuwmp3.changba.com/980459470.mp3"
            },
            {
            name: "小幸运",
            url: "http://qiniuuwmp3.changba.com/976878450.mp3"
            },
            {
            name: "小酒窝",
            url: "http://qiniuuwmp3.changba.com/968517576.mp3"
            },
            {
            name: "友情岁月",
            url: "http://lzscuw.changba.com/968050614.mp3"
            },
            {
            name: "年轻的战场",
            url: "http://lzscuw.changba.com/968045305.mp3"
            },
            {
            name: "诀别诗",
            url: "http://qiniuuwmp3.changba.com/961495082.mp3"
            },
            {
            name: "爱拼才会赢",
            url: "http://qiniuuwmp3.changba.com/960983555.mp3"
            },
            {
            name: "再回首",
            url: "http://qiniuuwmp3.changba.com/960976893.mp3"
            },
            {
            name: "等不到的爱",
            url: "http://qiniuuwmp3.changba.com/958365898.mp3"
            },
            {
            name: "爱的供养",
            url: "http://qiniuuwmp3.changba.com/954027558.mp3"
            },
            {
            name: "爱要怎么说出口",
            url: "http://qiniuuwmp3.changba.com/937751790.mp3"
            },
            {
            name: "梦醒时分",
            url: "http://lzscuw.changba.com/930404013.mp3"
            },
            {
            name: "爱江山更爱美人",
            url: "http://qiniuuwmp3.changba.com/928240082.mp3"
            },
            {
            name: "西海情歌",
            url: "http://qiniuuwmp3.changba.com/928223795.mp3"
            },
            {
            name: "月亮代表我的心",
            url: "http://qiniuuwmp3.changba.com/924752867.mp3"
            },
            {
            name: "会呼吸的痛",
            url: "http://qiniuuwmp3.changba.com/920375046.mp3"
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
            name: "讲不出再见",
            url: "http://lzscuw.changba.com/896766428.mp3"
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
            name: "这些年来",
            url: "http://qiniuuwmp3.changba.com/870826173.mp3"
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
            name: "风继续吹",
            url: "http://qiniuuwmp3.changba.com/868536545.mp3"
            },
            {
            name: "沉默是金",
            url: "http://qiniuuwmp3.changba.com/864729484.mp3"
            },
            {
            name: "丑八怪",
            url: "http://qiniuuwmp3.changba.com/863504936.mp3"
            },
            {
            name: "微微一笑很倾城",
            url: "http://qiniuuwmp3.changba.com/863445551.mp3"
            },
            {
            name: "刚刚好",
            url: "http://qiniuuwmp3.changba.com/862417051.mp3"
            }
        ]
}
songs.init = function() {
    var _t = this;
    // 先将播放器加入到html中
    document.getElementsByTagName("body")[0].innerHTML += 
        "<div id=\"album\">"+
        "<audio loop id=\"mic-player\"></audio>"+
        "<a id=\"mic-ctrl\"></a>"+
        "<div id=\"mic-list\"></div>"+
        "</div>";
    // 获取各个元素
    _t.album  = document.getElementById("album");
    _t.player = document.getElementById("mic-player");
    _t.ctrl   = document.getElementById("mic-ctrl");
    _t.list   = document.getElementById("mic-list");
    // 默认添加第一首歌
    _t.player.src = _t.datas[0].url;
    // 渲染歌曲列表
    var inner = "";
    for(var i=0; i<_t.datas.length; i++) {
        inner += "<a data-src=\""+_t.datas[i].url+"\">"+_t.datas[i].name+"</a>";
    }
    _t.list.innerHTML = inner;
    // 给每首歌添加播放逻辑
    var sing = _t.list.getElementsByTagName("a");
    for(var k=0; k<sing.length; k++) {
        (function(k){
          sing[k].addEventListener("click", function(){
            _t.player.src = sing[k].getAttribute("data-src");
            _t.player.play();
            _t.ctrl.style.backgroundPosition = "0 -100px";
          }, false);
        })(k);
    }
    // 返回songs对象
    return _t;
}
songs.play = function() {
    var _t = this;
    // 播放与暂停
    _t.ctrl.addEventListener("click", function(){
        if(_t.player.paused) {
            _t.player.play();
            _t.ctrl.style.backgroundPosition = "0 -100px";
        }
        else {
            _t.player.pause();
            _t.ctrl.style.backgroundPosition = "0 0";
        }
    }, false);
    // 列表的显示隐藏
    _t.album.addEventListener("mouseover", function(){
        _t.list.style.right = "100px";
    }, false);
    _t.album.addEventListener("mouseleave", function(){
        _t.list.style.right = "-100px";
    }, false);
}
// 加载歌曲
songs.init().play();