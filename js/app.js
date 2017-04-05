/*canvas*/
(function(){
	if(window.HTMLCanvasElement)
	{
		var _s = document.createElement("script");
		var _h = document.getElementsByTagName("head")[0];
		_s.type = "text/javascript";
		_s.src = "js/particles.js";
		_h.appendChild(_s);
	}
})();

/*163 music*/
var SONG_ID = 32192436;
function load163Music(id, song)
{
	var _html="<iframe frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" width=1000 height=86 src=\"http://music.163.com/outchain/player?type=2&id="+song+"&auto=0&height=66\"></iframe>";
	document.getElementById(id).innerHTML=_html
};
load163Music("music", SONG_ID);