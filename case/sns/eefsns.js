/*
** Compnt youzu social network services 
** Author 吾辈组长
** Usages 1. 正确引用js,不依赖任何库文件
**   	  2. 分享文案设置
			 eefsns.set({
				url:   // 分享地址, 必须线上可访问, 且无跳转, 默认当前页面地址
				title: // 分享标题, 默认页面标题
				desc:  // 分享描述, 默认页面标题
				pic:   // 分享图片, 必须为线上资源地址(300*300 *http), 多张用"||"隔开, 如 "pic1.jpg||pic2.jpg", 建议单张图片
			 }); 
**   	  3. API 
			 eefsns.sina()  // 分享到新浪微博
			 eefsns.qq()    // 分享给QQ好友
			 eefsns.qzone() // 分享到QQ空间
			 eefsns.tieba() // 分享到百度贴吧
			 eefsns.wx()    // 分享二维码
**   	  4. 定制化分享按钮
			 eefsns.init({
				box:      // 分享结构的父级dom对象, 必须是原生对象
				color:    // "分享到:" 字体颜色 默认 #fff
				bgcolor:  // 按钮背景颜色, 默认无
				list:     // 所需要显示的按钮, 用"," 隔开, 默认"wx,sina,qq,qzone,tieba"
			 }); 
*/
var eefsns = (function (eefsns) {
  // 分享文案配置
  var config = {
    url: encodeURIComponent(location.href), // 地址
    title: encodeURIComponent(document.title), // 标题
    desc: encodeURIComponent(document.title), // 描述
    pic: "", // 图
  };
  // 加载微信分享结构
  (function () {
    var _frag =
      "<style>" +
      "#sns_wx {width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 999999;background-color: #292929;display: none;}" +
      "#sns_wx_box {width: 450px;height: 300px;position: absolute;left: 0;top: -44px;right: 0;bottom: 0;margin: auto;z-index: 1;}" +
      "#sns_wx_logo {width: 170px;height: 72px;display: block;margin-bottom: 12px;background: url(img/logo.png) no-repeat;background-size: 100% 100%;}" +
      "#sns_wx_qrcode {height: 170px;padding-left: 170px;background-color: #fff;border-radius: 8px;overflow: hidden;position: relative;}" +
      "#sns_wx_img {position: absolute;left: 0;top: 0;width: 170px;height: 170px;z-index: 1;}" +
      "#sns_wx_icon {position: absolute;left: 70px;top: 70px;z-index: 2;width: 30px;height: 30px;background: url(img/icon.png) no-repeat;background-size: 100% 100%;}" +
      "#sns_wx_tip {line-height: 1.5;font-size: 14px;color: #4d4d4d;padding: 0 10px 0 0;margin-top: 40px;position: relative;z-index: 3;}" +
      "#sns_wx_tip em {display: block;font-size: 18px;line-height: 2;font-weight: bold;}" +
      "#sns_wx_button {width: 60px;height: 60px;position: absolute;right: 12px;top: 12px;width: 60px;height: 60px;z-index: 2;background: url(img/button.png) no-repeat;background-size: 100% 100%;-webkit-transition: all ease .3s;-o-transition: all ease .3s;transition: all ease .3s;cursor: pointer;}" +
      "#sns_wx_button:hover {-webkit-transform: rotate(90deg);-ms-transform: rotate(90deg);-o-transform: rotate(90deg);transform: rotate(90deg);}" +
      "#sns_wx_copy {font-size: 16px;color: #b2b2b2;line-height: 38px;}" +
      "</style>" +
      '<div id="sns_wx">' +
      '	<div id="sns_wx_box">' +
      '		<a id="sns_wx_logo" href="https://www.youzu.com/?from=sns_wx_api" target="_blank" title="游族网络"></a>' +
      '		<div id="sns_wx_qrcode">' +
      '			<img id="sns_wx_img" src="https://uapi.youzu.com/qrcode/png?content=' +
      config.url +
      '" alt="qrcode">' +
      '			<span id="sns_wx_icon"></span>' +
      '			<p id="sns_wx_tip"><em>扫一扫分享给好友</em>用微信“扫一扫”左侧的二维码，即可把网站分享给您的好友们哦~</p>' +
      "		</div>" +
      '		<p id="sns_wx_copy">上海游族信息技术有限公司 &copy;版权所有</p>' +
      "	</div>" +
      '	<span id="sns_wx_button" onclick="eefsns.hidewx()"></span>' +
      "</div>";
    var _node = document.createElement("div");
    _node.innerHTML = _frag;
    document.getElementsByTagName("body")[0].appendChild(_node);
  })();
  function g(id) {
    return document.getElementById(id);
  }
  eefsns.showwx = function () {
    g("sns_wx").style.display = "block";
  };
  eefsns.hidewx = function () {
    g("sns_wx").style.display = "none";
  };
  // 自定义分享文案
  eefsns.set = function (o) {
    o.url && (config.url = encodeURIComponent(o.url));
    o.title && (config.title = encodeURIComponent(o.title));
    o.desc && (config.desc = encodeURIComponent(o.desc));
    o.pic && (config.pic = o.pic);
    g("sns_wx_img").src =
      "https://uapi.youzu.com/qrcode/png?content=" + config.url;
    return this;
  };
  // 初始化定制按钮
  eefsns.init = function (o) {
    var box = o.box,
      color = o.color || "#fff",
      bgcolor = o.bgcolor || "transparent",
      list = o.list || "wx,sina,qq,qzone,tieba";
    var wx = list.search(/wx/i) >= 0,
      sina = list.search(/sina/i) >= 0,
      qq = list.search(/qq/i) >= 0,
      qzone = list.search(/qzone/i) >= 0,
      tieba = list.search(/tieba/i) >= 0;
    var _frag =
      "<style>" +
      "#sns_init {font-size: 0;white-space: nowrap;}" +
      "#sns_init_tip {font-size: 16px;display: inline-block;*display: inline; *zoom: 1;line-height: 32px;vertical-align: middle;padding-right: 8px;color: " +
      color +
      ";}" +
      "#sns_init_box {display: inline-block;*display: inline; *zoom: 1;vertical-align: middle;padding: 4px 0;background-color: " +
      bgcolor +
      ";overflow: hidden;border-radius: 16px;}" +
      "#sns_init_box span {width: 24px;height: 24px;display: block;*display: inline; *zoom: 1;float: left;margin: 0 4px;cursor: pointer;}" +
      "#sns_init_box span:hover {opacity: 0.75; filter:Alpha(opacity=75);}" +
      "#sns_init_wx {background: url(img/wx-ico.png?v=20190131) no-repeat;}" +
      "#sns_init_sina {background: url(img/sina-ico.png?v=20190131) no-repeat;}" +
      "#sns_init_qq {background: url(img/qq-ico.png?v=20190131) no-repeat;}" +
      "#sns_init_qzone {background: url(img/qzone-ico.png?v=20190131) no-repeat;}" +
      "#sns_init_tieba {background: url(img/tieba-ico.png?v=20190131) no-repeat;}" +
      "</style>" +
      '<div id="sns_init">' +
      '	<em id="sns_init_tip">分享到:</em>' +
      '	<div id="sns_init_box">' +
      (wx
        ? '<span id="sns_init_wx" title="分享到微信二维码" onclick="eefsns.wx()"></span>'
        : "") +
      (sina
        ? '<span id="sns_init_sina" title="分享到新浪微博" onclick="eefsns.sina()"></span>'
        : "") +
      (qq
        ? '<span id="sns_init_qq" title="分享到QQ好友" onclick="eefsns.qq()"></span>'
        : "") +
      (qzone
        ? '<span id="sns_init_qzone" title="分享到QQ空间" onclick="eefsns.qzone()"></span>'
        : "") +
      (tieba
        ? '<span id="sns_init_tieba" title="分享到百度贴吧" onclick="eefsns.tieba()"></span>'
        : "") +
      "	</div>" +
      "</div>";
    var _node = document.createElement("div");
    _node.innerHTML = _frag;
    box.appendChild(_node);
    return this;
  };
  // 新浪微博
  eefsns.sina = function () {
    this.shareByIndex(0);
  };
  // QQ好友
  eefsns.qq = function () {
    this.shareByIndex(1);
  };
  // QQ空间
  eefsns.qzone = function () {
    this.shareByIndex(2);
  };
  // 百度贴吧
  eefsns.tieba = function () {
    this.shareByIndex(3);
  };
  // 二维码
  eefsns.wx = function () {
    this.showwx();
  };
  eefsns.shareByIndex = function (index) {
    window.open(shareApi(index));
  };
  function shareApi(target) {
    switch (target) {
      case 0:
        return (
          "http://service.weibo.com/share/share.php?&searchPic=true&language=zh_cn&url=" +
          config.url +
          "&title=" +
          (config.title + " " + config.desc) +
          "&pic=" +
          config.pic
        );
      case 1:
        return (
          "http://connect.qq.com/widget/shareqq/index.html?title=" +
          config.title +
          "&url=" +
          config.url +
          "&summary=" +
          config.desc +
          "&desc=" +
          config.desc +
          "&pics=" +
          config.pic.split("||").join("|")
        );
      case 2:
        return (
          "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" +
          config.url +
          "&title=" +
          config.title +
          "&desc=" +
          config.desc +
          "&summary=" +
          config.desc +
          "&site={{100*100}}&pics=" +
          config.pic.split("||").join("|")
        );
      case 3:
        return (
          "http://tieba.baidu.com/f/commit/share/openShareApi?title=" +
          config.title +
          "&url=" +
          config.url +
          "&pic=" +
          encodeURIComponent(config.pic.split("||")[0])
        );
      default:
        break;
    }
  }
  return eefsns;
})(window.eefsns || {});
