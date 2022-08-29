document.writeln(
'<style>'+
'#header h1{width: 100%; height: 120px; overflow: hidden; position: relative;}'+
'#header h1 .logo{display: block; width: 100%; height: 120px; background: #b1b1b1 url(img/slogan-bg.png) no-repeat left bottom; text-indent: -9999em; transition: background-color .2s; -webkit-transition: background-color .2s;}'+
'#header h1 .logo:hover{background-color: #c1c1c1;}'+
'#header h1 .avatar{width:80px;height:80px;position:absolute;top:20px;right:30px;background:url(img/unavatar.png) no-repeat center center;}'+
'#header h1 .avatar:hover{opacity:0.8;}'+
'#header .nav{height: 60px; overflow: hidden; background-color: #fff;position:relative;}'+
'</style>'+
'<div id="header">'+
'	<h1><a class="logo" href="http://www.douchaoyang.com/">Dou,Chaoyang :)</a><a target="_blank" href="img/avatar.jpg" class="avatar"></a></h1>'+
'	<div class="nav">'+
'		<a href="/code.html">F2E/CODE</a>'+
'		<span>●</span>'+
'		<a href="/code.html">PROJECT</a>'+
'		<span>●</span>'+
'		<a href="/">RESUME</a>'+
'		<span>●</span>'+
'		<a href="/">OTHERS</a>'+
'		<p>2 B CONTINUED<i class="spark1">.</i><i class="spark2">.</i><i class="spark3">.</i></p>'+
'       <div id="album"><audio loop id="player-mic"></audio><div id="now-mic">这是一首歌曲</div><div id="tip-mic"></div><div id="prev-mic"></div><div id="play-mic"></div><div id="next-mic"></div><div id="line-mic"></div></div>'+
'	</div>	'+
'</div>'
);