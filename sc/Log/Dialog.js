/*
**@package Dialog
**@version 1.0.0
**@Author  douchaoyang
**@Date    2016-03-16
**@Link    http://www.tiancity.com
*/
var Dialog = {
    w:window,
    o:document,
    IE6:!-[1,]&&!window.XMLHttpRequest,
    oE:document.documentElement,
    Flag:true,
    The:"",
    $:function(a){return typeof a === "string" ? this.o.getElementById(a) :a},
    CreatEle:function(a){return this.o.createElement(a)},
    HeadAdd:function(a){return this.o.getElementsByTagName("head")[0].appendChild(a)},
    BodyAdd:function(a){return this.o.getElementsByTagName("body")[0].appendChild(a)},
    ReamoveEle:function(c){var b = this.$(c);b.parentNode.removeChild(b)}
};
function Log(param){
    param=param||{};
    this.Bcolor=param.Bcolor||"#000";
    this.Opacity=param.Opacity||70;
    this.Scroll=param.Scroll||false;
};
Log.prototype.setStyle = function(e, a) {var i;for (i in a) {e.style[i] = a[i]}};
Log.prototype.getPageHeight=function(){return Dialog.w.innerHeight && Dialog.w.scrollMaxY ? Dialog.w.innerHeight + Dialog.w.scrollMaxY : Dialog.o.body.scrollHeight > Dialog.o.body.offsetHeight ? Dialog.o.body.scrollHeight : Dialog.o.body.offsetHeight};
Log.prototype.getWinHeight=function(){return Dialog.w.innerHeight ? Dialog.w.innerHeight : Dialog.oE && Dialog.oE.clientHeight ? Dialog.oE.clientHeight : Dialog.o.body.offsetHeight};
Log.prototype.getWinWidth=function(){return Dialog.w.innerWidth ? Dialog.w.innerWidth : Dialog.oE && Dialog.oE.clientWidth ? Dialog.oE.clientWidth : Dialog.o.body.offsetWidth};
Log.prototype.creatMask = function() {
    if (Dialog.Flag) {
        Dialog.Flag = false;
        var _this=this;
        var pageHeight=_this.getPageHeight(),a=Dialog.CreatEle("div");
        _this.setStyle(a,{
            "display":"block",
            "width":"100%",
            "height":pageHeight+"px",
            "position":"absolute",
            "left":"0",
            "top":"0",
            "background":_this.Bcolor,
            "opacity":_this.Opacity/100,
            "filter":"alpha(opacity="+_this.Opacity+")",
            "zIndex":"9999"
        });
        if(Dialog.IE6){
            a.innerHTML = "<iframe style=\"position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=0);z-index:9999\" src=\"javascript:void(0)\"></iframe>";
        }
        a.id = "_popMask_";
        Dialog.BodyAdd(a)
    }
};
Log.prototype.absPos = function(d) {
    Dialog.$(d).style.display = "block";
    var scrollTop = Math.max(Dialog.o.body.scrollTop, Dialog.oE.scrollTop),winHeight = this.getWinHeight(),offWidth=Dialog.$(d).offsetWidth,offHeight=Dialog.$(d).offsetHeight,marginLeft = -1 * Math.floor(offWidth / 2),theTop=scrollTop+(winHeight-offHeight)/2;
    this.setStyle(Dialog.$(d),{
        "position":"absolute",
        "left":"50%",
        "marginLeft":marginLeft+"px",
        "top":Dialog.$(d).offsetHeight>winHeight?"0":theTop+"px",
        "zIndex":"10000"
    })
};
Log.prototype.fixPos = function(d) {
    Dialog.$(d).style.display = "block";
    var scrollTop = Math.max(Dialog.o.body.scrollTop, Dialog.oE.scrollTop),winHeight = this.getWinHeight(),offWidth=Dialog.$(d).offsetWidth,offHeight=Dialog.$(d).offsetHeight,marginLeft = -1 * Math.floor(offWidth / 2),marginTop = -1 * Math.floor(offHeight / 2),theTop=scrollTop+(winHeight-offHeight)/2;
    this.setStyle(Dialog.$(d),{
        "position":"fixed",
        "left":"50%",
        "marginLeft":marginLeft+"px",
        "top":"50%",
        "marginTop":marginTop+"px",
        "zIndex":"10000"
    });
    if (Dialog.IE6){
        this.setStyle(Dialog.$(d),{
            "position":"absolute",
            "top":Dialog.$(d).offsetHeight>winHeight?"0":theTop+"px",
            "marginTop":"0"
        })
    }
};
Log.prototype.stopFire = function() {
    Dialog.$(Dialog.The).style.display = "none";
    Dialog.ReamoveEle("_popMask_");
    Dialog.$(Dialog.The).removeAttribute("style");
    Dialog.The = ""
};
Log.prototype.Show = function(b) {
    !Dialog.Flag&&this.Hide();
    this.creatMask();
    this.Scroll?this.fixPos(b):this.absPos(b);
    Dialog.The = b
};
Log.prototype.Hide = function() {
    Dialog.Flag = true;
    this.stopFire()
};