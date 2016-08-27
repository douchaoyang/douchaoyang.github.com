/*加载文章列表*/
function loadArtical(o){
	var html="";
	if(o&&o.token)
	{
		for(var i=o.ret.length;i>0;i--)
		{
			html+="<li><a target=\"_blank\" title=\""+o.ret[i-1].title+"\" href=\""+o.ret[i-1].url+"\">"+o.ret[i-1].title+"</a><i>"+o.ret[i-1].time+"</i></li>"
		}
		document.getElementById("artical").innerHTML=html
	}
}