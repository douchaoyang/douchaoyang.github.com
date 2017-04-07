load_code_data({
    token:1,
    list:[
    {
        title:"overflow=scroll子元素滚动不跟随父元素",
        time:"2017-04-06",
        content:'<p>当我们在父元素可滚动的情况下，又有一个可滚动的子元素时，</p><p>默认子元素滚动过程中父元素也可以滚动，但这样的交互效果不好。</p><p>我们希望滚动子元素的时候父元素不动，</p><p>可以使用此jQuery插件实现。</p><p><br/></p><p>$.fn.scrollUnique = function() {<br/>&nbsp; return $(this).each(function() {<br/>&nbsp;&nbsp;&nbsp; var eventType = &quot;mousewheel&quot;;<br/>&nbsp;&nbsp;&nbsp; if (document.mozHidden !== undefined) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; eventType = &quot;DOMMouseScroll&quot;;<br/>&nbsp;&nbsp;&nbsp; }<br/>&nbsp;&nbsp;&nbsp; $(this).on(eventType, function(event) {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; var scrollTop = this.scrollTop, scrollHeight = this.scrollHeight, height = this.clientHeight;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; var delta = event.originalEvent.wheelDelta ?</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; event.originalEvent.wheelDelta :-(event.originalEvent.detail || 0);<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; if (delta &gt; 0 &amp;&amp; scrollTop &lt;= delta || delta &lt; 0 &amp;&amp; scrollHeight - height - scrollTop &lt;= -1 * delta)</p><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.scrollTop = delta &gt; 0 ? 0 :scrollHeight;<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; event.preventDefault();<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }<br/>&nbsp;&nbsp;&nbsp; });<br/>&nbsp; });<br/>};<br/></p>'
    }
    ]
});

function load_code_data(o) {
    if (!o.token) return;
    var _html = "",_url="";
    for (var i = 0; i < o.list.length; i++) {
        _url = "http://v.t.sina.com.cn/share/share.php?appkey=941104388&searchPic=true&title="+encodeURIComponent(o.list[i].title)+" %23窦超阳F2E%23&url="+encodeURIComponent("http://www.douchaoyang.com/");
        _html += "<li>" + "<h3>" + o.list[i].title + "<i>" + o.list[i].time + "</i><a target=\"_blank\" href=\""+_url+"\"></a></h3>" + "<pre>" + o.list[i].content + "</pre></li>";
    }
    document.getElementById("f2e-code").innerHTML = _html;
}