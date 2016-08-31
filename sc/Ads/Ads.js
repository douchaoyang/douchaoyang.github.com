/*
**@package Ads
**@version 1.0.1
**@Author  douchaoyang
**@Date    2016-04-29
**@Link    http://www.tiancity.com
**@Modify  1.0.1 新增上一帧下一帧扩展函数 Next() Prev()
*/
var Ads = function(params){
    'use strict';
    this.o=document;
    this.now=0;/*当前显示的广告*/
    this.autoRun=null;/*定时器*/
    this.ing=true;/*是否正在进行动画标记*/
    this.useHover=params.useHover||false;/*切换控制方式*/
    this.mouseOn=false;/*清除定时器标记*/
    this.container=this.$(params.container);/*广告容器*/
    this.containerChild=this.container.getElementsByTagName('a');/*广告必须是a标签*/
    this.control=this.$(params.control);/*控制按钮容器*/
    for(var i=0;i<this.containerChild.length;i++){var _span=this.o.createElement('span');this.control.appendChild(_span)}
    this.controlChild=this.control.getElementsByTagName('span');/*控制按钮是span标签*/
    this.onClass=params.onClass||'';
    this.stay=params.stay||3e3;
    this.letsGo();
};
Ads.prototype.$=function(a){return typeof a === "string" ? this.o.getElementById(a) :a;};/*获取元素id方法*/

Ads.prototype.rollFn=function(n){
    if(n==this.now) return;
    if(n==this.containerChild.length) n=0;
    if(n<0) n=this.containerChild.length-1;
    if(n>this.now)
    {
        for(var i=this.now+1; i<n;i++){this.containerChild[i].style.left='-100%';}
        this.goLeft(this.containerChild[this.now],this.containerChild[n],n);
    }
    else
    {
        for(var i=n+1;i<this.now;i++){this.containerChild[i].style.left='100%';}
        this.goRight(this.containerChild[this.now],this.containerChild[n],n);
    }
    for(var i=0;i<this.controlChild.length;i++){this.controlChild[i].className='';} this.controlChild[n].className=this.onClass;
};
Ads.prototype.goLeft=function(e1,e2,n){
    e1.style.left=0;
    e2.style.left='100%';
    this.ing=false;
    var times=10,_this=this;
    (function(){
        e1.style.left=(times-11)*10+'%';
        e2.style.left=(times-1)*10+'%';
        times--;
        if(times>0) {setTimeout(arguments.callee,15)}
        else
        {
            _this.now=n;
            if(_this.autoRun===null&&_this.mouseOn!=true){
                _this.autoRun=setTimeout(function(){_this.rollFn(_this.now+1);_this.stopFn();},_this.stay)
            }
            _this.ing=true;
        }
    })()
};
Ads.prototype.goRight=function(e1,e2,n){
    e1.style.left=0;
    e2.style.left='-100%';
    this.ing=false;
    var times=10,_this=this;
    (function(){
        e1.style.left=(11-times)*10+'%';
        e2.style.left=-(times-1)*10+'%';
        times--;
        if(times>0) {setTimeout(arguments.callee,15)}
        else
        {
            _this.now=n;
            if(_this.autoRun===null&&_this.mouseOn!=true){
                _this.autoRun=setTimeout(function(){_this.rollFn(_this.now+1);_this.stopFn();},_this.stay)
            }
            _this.ing=true;
        }
    })()
};
Ads.prototype.stopFn=function(){clearTimeout(this.autoRun);this.autoRun=null};
Ads.prototype.rollFnCtr=function(e,n){
    var _this=this;
    if(_this.useHover)
    {
        e.onmouseover=function()
        {
            if(!_this.ing) return;
            _this.rollFn(n-0);
            _this.stopFn()
        }
    }
    else
    {
        e.onclick=function()
        {
            if(!_this.ing) return;
            _this.rollFn(n-0);
            _this.stopFn()
        }
    }   
};
Ads.prototype.Prev=function(){
    this.rollFn(this.now-1);this.stopFn()
};
Ads.prototype.Next=function(){
    this.rollFn(this.now+1);this.stopFn()
};
Ads.prototype.letsGo=function(){
    var _this=this;
    _this.controlChild[0].className=_this.onClass;
    if(_this.containerChild.length<2) return;
    for(var i=1;i<_this.containerChild.length;i++) _this.containerChild[i].style.left="100%";
    for(var i=0;i<_this.controlChild.length;i++) _this.rollFnCtr(_this.controlChild[i],i);
    _this.autoRun=setTimeout(function(){_this.rollFn(_this.now+1);_this.stopFn();},_this.stay);
    _this.container.onmouseover=function(){_this.stopFn();_this.mouseOn=true;};
    _this.container.onmouseout=function(){_this.autoRun=setTimeout(function(){_this.rollFn(_this.now+1);_this.stopFn();},_this.stay);_this.mouseOn=false};
};