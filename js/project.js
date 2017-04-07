load_project_data({
	token:1,
	list:[
	{
		img:"img/project_azera.jpg",
		title:"《魔甲时代》官方网站",
		info:"这是《魔甲时代》官方网站首次上线。在此项目中主要负责首页、新闻页的开发以及网站的部署与上线。",
		url:"https://azera.tiancity.com/"
	},
	{
		img:"img/project_cls.jpg",
		title:"《封印者》官方网站",
		info:"作为《封印者》前端工作的总负责人，针对广告轮播系统做了封装与优化，使整个站点性能大幅提升，大大提高了用户体验。",
		url:"https://cls.tiancity.com/"
	},
	{
		img:"img/project_csol.jpg",
		title:"《反恐精英Online》官方网站",
		info:"独立开发完成《反恐精英Online》官方网站首页。这是CSOL上线以来的官网第六次改版。项目中主要用到了jQuery框架。",
		url:"https://csol.tiancity.com/"
	},
	{
		img:"img/project_popkart.jpg",
		title:"《跑跑卡丁车》官方网站",
		info:"为满足《跑跑卡丁车》项目需求以及提高用户体验度，对《跑跑卡丁车》官方网站广告轮播系统做了优化升级。",
		url:"https://popkart.tiancity.com/"
	},
	{
		img:"img/project_ads.jpg",
		title:"Ads插件(适用于各种轮播)",
		info:"为摆脱jQuery插件实现轮播系统的束缚，完成了PC端原生轮播插件。主要用于广告轮播系统，向下兼容至IE 6。",
		url:"https://github.com/douchaoyang"
	},
	{
		img:"img/project_log.jpg",
		title:"Log弹出层插件",
		info:"摆脱各种类库的束缚，纯原生弹出层插件。解决了多层次弹出层相重叠以及IE 6下无法盖住select组件的Bug。",
		url:"https://github.com/douchaoyang"
	},
	{
		img:"img/project_yplayer.jpg",
		title:"Yplayer原生视频播放器插件",
		info:"为了提高页面开发效率，基于Vcastr 2.2 开发的原生视频播放器插件。现在主要用于《封印者》官方网站。",
		url:"https://github.com/douchaoyang"
	},
	{
		img:"img/project_lottery.jpg",
		title:"Lottery原生九宫格抽奖插件",
		info:"适用于跳转性抽奖效果，具体抽奖数目和样式可自行设置。特点：向下兼容至IE6，原生插件，体积小。",
		url:"https://github.com/douchaoyang"
	}
	]
});
function load_project_data(o)
{
	if(!o.token) return;
	var _html = "";
	 for(var i=0;i<o.list.length;i++)
	 {
	 	_html+="<li><img src=\""+o.list[i].img+"\"><h3><b>"+o.list[i].title+"</b><i></i></h3><p>"+o.list[i].info+"</p><a target=\"_blank\" href=\""+o.list[i].url+"\"></a></li>"
	 }
	 document.getElementById("project").innerHTML=_html
}