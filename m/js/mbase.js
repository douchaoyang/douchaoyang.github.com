/*
**@package mobile base
**@version 1.0.0
**@Author  douchaoyang
**@Date    2016-08-29
**@Link    http://www.freemud.cn
*/

/*
**模拟命名空间
**namespace("class1.class2.class3......")
*/
var namespace = function(){
    var argus = arguments;
    for(var i = 0; i < argus.length; i++){
        var objs = argus[i].split(".");
		var obj = window;
        for(var j = 0; j < objs.length; j++){
            obj[objs[j]] = obj[objs[j]] || {};
            obj = obj[objs[j]];
        }
    }
    return obj;
};
/*
 * 定义公共方法
 */
namespace("git.m");
git.m={
	/*
	 * 以id获取DOM对象
	 */
	_$:function(a){return typeof a === "string" ? document.getElementById(a) :a},
	/*
	 * 获取类节点
	 */
	getElementsByClassName:function(className){  
		var elems = [];  
		if(!document.getElementsByClassName){  
			var dom = document.getElementsByTagName("*");  
			for(var i =0 ;i<dom.length;i++){  
				if(dom[i].className){  
					var classs = dom[i].className.split(/\s+/); 
					for(var c = 0;c<classs.length;c++){  
						if(classs[c]==className){  
							elems.push(dom[i]);			  
						}
					}  
				}  
			}  
		}else{  
			var dom = document.getElementsByClassName(className);  
			for(var i =0 ;i<dom.length;i++){  
				elems.push(dom[i]);	  
			}  
		}  
		return elems;  
	},
	/*
	 * 获取参数类型
	 */
	getParamType:function(obj){
		return obj == null ? String(obj) : Object.prototype.toString.call(obj).replace(/\[object\s+(\w+)\]/i,"$1") || "object";
	},
	/*
	 * 扩展对象 extend(object1,object2)
	 */
	extend:function(destination, source) {
		if (destination == null) 
		{
			destination = source
		}
		else 
		{
			for (var property in source){		
				if ( this.getParamType(source[property]).toLowerCase() === "object" && this.getParamType(destination[property]).toLowerCase() === "object" )
					arguments.callee(destination[property], source[property]);
				else
					destination[property] = source[property]
			}
		}
		return destination
	},
	/*
	 * 无限自适应 
	 * 传入设计稿宽度 
	 * head添加 "viewport" "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
	 * 所有px/100->rem
	 */
	px2rem:function(a){
		if(this.getParamType(a).toLowerCase()==="number")
		{
			var deviceWidth = document.documentElement.clientWidth;
			if(deviceWidth > a) deviceWidth = a;
			document.documentElement.style.fontSize = deviceWidth / a * 100 + "px";
			window.addEventListener("resize", function() {
				document.documentElement.style.fontSize = deviceWidth / a * 100 + "px"
			})
		}
	},
	/*
	 * 发送plus POST请求
	 */
	PlusRequest:function(ApiName, Params, ResponseObject) {
		var xhr = new plus.net.XMLHttpRequest();
		xhr.onreadystatechange = function() {
			switch(xhr.readyState) {
				case 0:
					break;
				case 1:
					break;
				case 2:
					break;
				case 3:
					break;
				case 4:
					if(xhr.status == 200) {
						ResponseObject.Success(xhr.responseText);
					} else {
						plus.nativeUI.toast("发生了通讯错误！");
					}
					break;
			}
		}
		xhr.open("POST", ServerDomainRoot + ApiName);
		xhr.setRequestHeader("dataType", "text");
		xhr.send(JSON.stringify(Params));
	},
	/*
	 * 发送CORS POST 跨域请求
	 */
	CORSRequest:function(url, Params, Response) {
		var xhr = new XMLHttpRequest();
		if("withCredentials" in xhr) {
			/*
			 * 此时即支持CORS的情况
			 * 检查XMLHttpRequest对象是否有“withCredentials”属性 
			 * “withCredentials”仅存在于XMLHTTPRequest level 2对象里
			 */
		} else if(typeof XDomainRequest != "undefined") {
			/*
			 * 否则检查是否支持XDomainRequest 
			 * XDomainRequest仅存在于IE中，是IE用于支持CORS请求的方式 
			 */
			xhr = new XDomainRequest();
		} else {
			xhr = null;
		}
		if(!xhr) {
			console.log("CORS not supported");
			return;
		}
		/*
		 * 回应处理
		 */
		xhr.onload = function() {
			Response.Success(xhr.responseText);
		};
		xhr.onerror = function() {
			Response.Error('Woops, there was an error making the request.');
		    /*
		     * Response.Error(xhr.responseText);
		     */
		};
		xhr.open("POST", url, true);
		xhr.send(JSON.stringify(Params));
	}
};
