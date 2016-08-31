/*加载文章列表*/
function loadArtical(o){
	var html="";
	if(o&&o.token)
	{
		for(var i=0;i<o.ret.length;i++)
		{
			html+="<li><a target=\"_blank\" title=\""+o.ret[i].title+"\" href=\""+o.ret[i].url+"\">"+o.ret[i].title+"</a><i>"+o.ret[i].time+"</i></li>"
		}
		document.getElementById("artical").innerHTML=html
	}
}