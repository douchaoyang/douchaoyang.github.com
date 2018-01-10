/*canvas*/
(function(){
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

/*music*/
var _music = document.createElement("div");_music.id = "music";document.getElementsByTagName("body")[0].appendChild(_music);document.getElementById("music").innerHTML = "<embed wmode=\"transparent\" src=\"js/player.swf?showDownload=false&amp;file=img/theseyears-douchaoyang.mp3&amp;autoStart=false&amp;backColor=000000&amp;frontColor=ffffff&amp;repeatPlay=true&amp;songVolume=100\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" width=\"25\" height=\"20\">";