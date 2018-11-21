(function(size){
	var e = function() {
		var cw = document.documentElement.clientWidth > size ? size : document.documentElement.clientWidth;
		cw && (document.documentElement.style.fontSize = cw / size * 100 + "px")
	};e();
	var ev = "orientationchange" in window ? "orientationchange" : "resize";
	window.addEventListener && window.addEventListener(ev, e, false);
	document.addEventListener && document.addEventListener("DOMContentLoaded", e, false);
})(750);