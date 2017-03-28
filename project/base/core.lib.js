/*
**@Author  douchaoyang
*/
/**
 * 处理命名空间
 * @param {string} 空间名称，可多个 
 * @return {object} 对象
 */
var namespace = function() {
    var argus = arguments;
    for (var i = 0; i < argus.length; i++) {
        var objs = argus[i].split(".");
        var obj = window;
        for (var j = 0; j < objs.length; j++) {
            obj[objs[j]] = obj[objs[j]] || {};
            obj = obj[objs[j]];
        }
    }
    return obj;
};

namespace("core.base");

(function(base) {
    /**
     * 为对象扩展
     * @param {object} object 对象
     * @return {bool} 是/否
     */
    base.extend = function(destination, source) {
        if (destination == null) {
            destination = source;
        } else {
            for (var property in source) {
                if (getParamType(source[property]).toLowerCase() === "object" && getParamType(destination[property]).toLowerCase() === "object") extend(destination[property], source[property]); else destination[property] = source[property];
            }
        }
        return destination;
    };
    base.extendLess = function(destination, source) {
        var newopt = source;
        for (var i in destination) {
            if (isObject(source) && typeof source[i] != "undefined") {
                destination[i] = newopt[i];
            }
        }
        return destination;
    };
    /**
     * 类式继承类
     * @param {object} subClass 子类
     * @param {object} superClass 基础类
     * @return {undefined} 
     */
    base.extendClass = function(subClass, superClass) {
        var F = function() {};
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superclass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    };
    /**
     * 原型继承类
     * @param {object} object 基类
     * @return {object} 生成的子类
     */
    base.cloneClass = function(object) {
        if (!isObject(object)) return object;
        if (object == null) return object;
        var F = new Object();
        for (var i in object) F[i] = cloneClass(object[i]);
        return F;
    };
    /**
     * 绑定上下文
     * @param {function,context} object
     * @return {object}
     */
    base.bind = function(fn, context) {
        return function() {
            return fn.apply(context, arguments);
        };
    };
    base.extend(base, {
        /**
         * 判断对象是否定义
         * 其实只对对象中的元素判断有效，如是纯变量，此方法会无法调用，需要外面加try
         * @param {object} object 对象
         * @return {bool} 是/否
         */
        isUndefined:function(o) {
            return o === undefined && typeof o == "undefined";
        },
        /**
         * 判断对象是否数组
         * @param {object} object 对象
         * @return {bool} 是/否
         */
        isArray:function(obj) {
            return getParamType(obj).toLowerCase() === "array";
        },
        /**
         * 判断对象是否函数
         * @param {object} object 对象
         * @return {bool} 是/否
         */
        isFunction:function(obj) {
            return getParamType(obj).toLowerCase() === "function";
        },
        /**
         * 判断对象是否对象
         * @param {object} object 对象
         * @return {bool} 是/否
         */
        isObject:function(obj) {
            return getParamType(obj).toLowerCase() === "object";
        },
        /**
         * 判断对象是否数值
         * @param {object} object 对象
         * @return {bool} 是/否
         */
        isNumber:function(obj) {
            return getParamType(obj).toLowerCase() === "number";
        },
        /**
         * 判断对象是否字符串
         * @param {object} object 对象
         * @return {bool} 是/否
         */
        isString:function(obj) {
            return getParamType(obj).toLowerCase() === "string";
        },
        /**
         * 判断是否布尔值
         * @param {object} object 对象
         * @return {bool} 是/否
         */
        isBoolean:function(obj) {
            return getParamType(obj).toLowerCase() === "boolean";
        },
        /**
         * 判断对象是否日期
         * @param {object} object 对象
         * @return {bool} 是/否
         */
        isDate:function(obj) {
            return getParamType(obj).toLowerCase() === "date";
        },
        /**
         * 判断对象是否DOM元素
         * @param {object} obj DOM对象
         * @return {bool} 是/否
         */
        isDom:function(obj) {
            try {
                return obj && typeof obj === "object" && !isUndefined(obj.nodeType) && obj.nodeType == 1 && !isUndefined(obj.nodeName) && typeof obj.nodeName == "string";
            } catch (e) {
                //console.log(e)
                return false;
            }
        },
        /**
         * 获取DOM对象的值
         * @param {object} obj DOM对象
         * @return {string} 取value或innerHTML
         */
        getDomValue:function(obj) {
            return obj.value || obj.innerHTML;
        },
        /**
         * 索引序列
         * @param {serial,function} 数组或对象集合
         * @return {undefined}
         */
        forEach:function(haystack, callback) {
            var i = 0, length = haystack.length, name;
            if (length !== undefined) {
                for (;i < length; ) {
                    if (callback.call(haystack[i], i, haystack[i++]) === false) {
                        break;
                    }
                }
            } else {
                for (name in haystack) {
                    callback.call(haystack[name], name, haystack[name]);
                }
            }
        },
        /**
         * 获取dom对象
         * @param {string|dom} dom的id或对象k
         * @return {dom} 
         */
        g:function(obj) {
            return typeof obj == "object" ? obj :document.getElementById(obj);
        }
    });
    /**
     * 获取对象类型
     * @private
     * @param {object} object 对象
     * @return {string} 类型
     * 可判断类型：Boolean Number String Function Array Date RegExp Object
     */
    function getParamType(obj) {
        return obj == null ? String(obj) :Object.prototype.toString.call(obj).replace(/\[object\s+(\w+)\]/i, "$1") || "object";
    }
})(core.base);

/**
 * 将核心方法扩展至window对象中
*/
core.base.extend(window, core.base);

/**
 * 通用配置设置
 */
namespace("core.config");

(function(config) {
    extend(config, {
        version:"20170228",
        loaderPath:location.protocol + "//",
        charset:"utf-8",
        expires:3e4
    });
})(core.config);

namespace("core.loader");

(function(loader) {
    extend(loader, {
        loadScript:function(url, callback) {
            var script = document.createElement("script");
            var head = document.getElementsByTagName("head")[0];
            script.type = "text/javascript";
            script.charset = core.config.charset;
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if ("loaded" == script.readyState || "complete" == script.readyState) {
                        script.onreadystatechange = null;
                        callback.call(this);
                    }
                };
            } else {
                script.onload = function() {
                    callback.call(this);
                };
                script.onerror = function() {
                    console.log("Script Load Error! Please Refresh!");
                };
            }
            script.src = url;
            head.appendChild(script);
        },
        loadCss:function(url, callback) {
            var head = document.getElementsByTagName("head")[0];
            var link = head.appendChild(document.createElement("link"));
            link.href = url;
            link.rel = "stylesheet";
            callback.call(this);
        },
        loadImage:function(arr, callback) {
            if (!isArray(arr)) return;
            var l = arr.length, n = 0;
            for (var i = 0; i < l; i++) {
                load(arr[i]);
            }
            function load(url) {
                var m = new Image();
                m.onload = m.onerror = function() {
                    m = null;
                    loaded();
                };
                m.src = url;
            }
            function loaded() {
                n++;
                callback.call(this, n);
            }
        }
    });
})(core.loader);

namespace("core.dom");

(function(dom) {
    var userAgent = navigator.userAgent.toLowerCase();
    extend(dom, {
        /**
         * 判断浏览器类型
         */
        browser:{
            /**
             * 获取版本号
             */
            version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [ 0, "0" ])[1],
            /**
             * 是否webkit浏览器
             */
            webkit:/webkit/.test(userAgent),
            /**
             * 是否opera浏览器
             */
            opera:/opera/.test(userAgent),
            /**
             * 是否IE浏览器
             */
            msie:/msie/.test(userAgent) && !/opera/.test(userAgent),
            /**
             * 是否mozilla浏览器
             */
            mozilla:/mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
            /**
             * 是否TT浏览器
             */
            tt:/tencenttraveler/.test(userAgent),
            /**
             * 是否chrome浏览器
             */
            chrome:/chrome/.test(userAgent),
            /**
             * 是否firefox浏览器
             */
            firefox:/firefox/.test(userAgent),
            /**
             * 是否safari浏览器
             */
            safari:/safari/.test(userAgent),
            /**
             * 是否gecko浏览器
             */
            gecko:/gecko/.test(userAgent),
            /**
             * 是否IE6
             */
            ie6:!-[1, ] && !window.XMLHttpRequest
        },
        /**
         * 创建元素
         * @param {string} tagName 标签名称
         * @return {dom} 
         */
        creatElment:function(a) {
            return document.createElement(a);
        },
        /**
         * 删除元素
         * @param {string} tagName 标签名称
         * @return {null} 
         */
        removeElment:function(a) {
            a.parentNode.removeChild(a);
        },
        /**
         * 向head标签中添加元素
         * @param {dom} dom元素
         */
        headAdd:function(a) {
            return document.getElementsByTagName("head")[0].appendChild(a);
        },
        /**
         * 向body标签中添加元素
         * @param {dom} dom元素
         */
        bodyAdd:function(a) {
            return document.getElementsByTagName("body")[0].appendChild(a);
        },
        /*
        **通过类名获取DOM对象
        */
        getElementsByClassName:function(className) {  
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
            return elems 
        },
        /**
         * 判断DOM对象是否存在样式类名称
         * @param {dom} element dom对象
         * @param {string} className 样式名称
         * @return {bool} 
         */
        hasClassName:function(element, className) {
            var elementClassName = element.className;
            return elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName));
        },
        /**
         * 为DOM对象增加样式类名称
         * @param {dom} element dom对象
         * @param {string} className 样式名称
         * @return {dom} 
         */
        addClassName:function(element, className) {
            if (!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"))) element.className += " " + className;
            return element
        },
        /**
         * 为DOM对象删除样式类名称
         * @param {dom} element dom对象
         * @param {string} className 样式名称
         * @return {dom} 
         */
        removeClassName:function(element, className) {
            if (element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"))) {
                var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
                element.className = element.className.replace(reg, " ");
            }
            return element
        },
        /**
         * 为dom对象设置样式
         * @param {dom} ele dom对象
         * @param {object} styles 样式对象 like:{width:100,height:100}
         * @return undefined
         */
        setStyle:function(ele, styles) {
            for (var i in styles) {
                ele.style[i] = styles[i];
            }
        },
        /**
         * 为dom对象获取选定属性的样式
         * @param {dom} ele dom对象
         * @param {string} prop 属性名称
         * @return 属性样式
         */
        getStyle:function(el, prop) {
            var viewCSS = isFunction(document.defaultView) ? document.defaultView() :document.defaultView;
            if (viewCSS && viewCSS.getComputedStyle) {
                var s = viewCSS.getComputedStyle(el, null);
                return s && s.getPropertyValue(prop);
            }
            return el.currentStyle && (el.currentStyle[prop] || null) || null;
        },
        /**
         * 网页内容高度
         * @return {int} 网页内容高度
         */
        getPageHeight:function() {
            var h = window.innerHeight && window.scrollMaxY ? window.innerHeight + window.scrollMaxY :document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight :document.body.offsetHeight;
            return h > document.documentElement.scrollHeight ? h :document.documentElement.scrollHeight;
        },
        /**
         * 网页内容宽度
         * @return {int} 网页内容宽度
         */
        getPageWidth:function() {
            return window.innerWidth && window.scrollMaxX ? window.innerWidth + window.scrollMaxX :document.body.scrollWidth > document.body.offsetWidth ? document.body.scrollWidth :document.body.offsetWidth;
        },
        /**
         * 浏览器可视区域高度
         * @return {int} 网可视区域高度
         */
        getWinHeight:function() {
            return window.innerHeight ? window.innerHeight :document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight :document.body.offsetHeight;
        },
        /**
         * 浏览器可视区域宽度
         * @return {int} 网可视区域宽度
         */
        getWinWidth:function() {
            return window.innerWidth ? window.innerWidth :document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth :document.body.offsetWidth;
        },
        /**
         * 浏览器滚动条距顶部高度
         * @return {int} 滚动条距顶部高度
         */
        getScrollTop:function() {
            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        },
        /**
         * 浏览器滚动条距左边宽度
         * @return {int} 滚动条距左边宽度
         */
        getScrollLeft:function() {
            return document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
        },
        /**
         * 设置浏览器滚动条高度
         * @return {int} 滚动条距顶部高度
         */
        setScrollTop:function(h) {
            document.documentElement.scrollTop = h;
            window.pageYOffset = h;
            document.body.scrollTop = h;
        },
        /**
         * 设置浏览器滚动条宽度
         * @return {int} 滚动条距左边宽度
         */
        setScrollLeft:function(l) {
            document.documentElement.scrollLeft = l;
            window.pageXOffset = l;
            document.body.scrollLeft = l;
        },
        /**
         * 设置dom透明度
         * @param {dom} ele dom对象
         * @param {int} level 透明度值（0-100的整数）
         * @return {undefined} 
         */
        setOpacity:function(ele, level) {
            //level = Math.min(1,Math.max(level,0));
            if (this.browser.msie && (!document.documentMode || document.documentMode < 9)) {
                ele.style.filter = "Alpha(opacity=" + level + ")";
            } else {
                ele.style.opacity = level / 100;
            }
        },
        /**
         * 获取页面中对象的绝对X位置
         * @param {dom} e dom对象
         * @return {int} 
         */
        getX:function(e) {
            var t = e.offsetLeft;
            while (e = e.offsetParent) t += e.offsetLeft;
            return t;
        },
        /**
         * 获取页面中对象的绝对Y位置
         * @param {dom} e dom对象
         * @return {int} 
         */
        getY:function(e) {
            var t = e.offsetTop;
            while (e = e.offsetParent) t += e.offsetTop;
            return t;
        },
        /**
         * 获取url中的参数值
         * @param {string} pa 参数名称
         * @return {string} 参数值
         */
        request:function(pa) {
            var url = window.location.href.replace(/#+.*$/, ""), params = url.substring(url.indexOf("?") + 1, url.length).split("&"), param = {};
            for (var i = 0; i < params.length; i++) {
                var pos = params[i].indexOf("="), //查找name=value  
                key = params[i].substring(0, pos), val = params[i].substring(pos + 1);
                //提取value 
                param[key] = val;
            }
            return typeof param[pa] == "undefined" ? "" :param[pa];
        }
    });
})(core.dom);

namespace("core.array");

(function(array) {
    extend(array, {
        /**
         * 判断数组内容个数
         * @param {array} array 对象
         * @return {int} 长度
         */
        getLength:function(arr) {
            var l = 0;
            for (var key in arr) {
                l++;
            }
            return l;
        },
        /**
         * 复制数组
         * @param {array} array 对象
         * @return {array} 新数组对象
         */
        clone:function(arr) {
            var a = [];
            for (var i = 0; i < arr.length; ++i) {
                a.push(arr[i]);
            }
            return a;
        },
        /**
         * 判断数组中是否存在这个值
         * @param {array} arr 数组对象
         * @param {object} value 对象
         * @return {bool} 是/否
         */
        hasValue:function(arr, value) {
            var find = false;
            if (isArray(arr) || isObject(arr)) for (var key in arr) {
                if (arr[key] == value) find = true;
            }
            return find;
        },
        /**
         * 根据值获得数组中的key
         * @param {array} arr 数组对象
         * @param {object} value 对象
         * @return {string} key
         */
        getArrayKey:function(arr, value) {
            var findKey = -1;
            if (isArray(arr) || isObject(arr)) for (var key in arr) {
                if (arr[key] == value) findKey = key;
            }
            return findKey;
        },
        /**
         * 返回a1数组有a2没有的值
         * @param {array} a1 数组对象
         * @param {array} a2 数组对象
         * @return {array} key
         */
        filter:function(a1, a2) {
            var res = [];
            for (var i = 0; i < a1.length; i++) {
                if (!array.hasValue(a2, a1[i])) res.push(a1[i]);
            }
            return res;
        },
        /**
         * 两个数组的值的交集
         * @param {array} arr 数组
         * @param {array} arr 数组
         * @return {array} key
         */
        unique:function(a1, a2) {
            return array.filter(a1, a2).concat(array.filter(a2, a1));
        }
    });
})(core.array);

namespace("core.string");

(function(string) {
    extend(string, {
        /**
         * 查找字符串的字节长度
         * 中文算2 英文算1
         * @param {string} str 字符串
         * @return {int}
         */
        getByteLength:function(str) {
            var bytes = 0, i = 0;
            for (;i < str.length; ++i, ++bytes) {
                if (str.charCodeAt(i) > 255) {
                    ++bytes;
                }
            }
            return bytes;
        },
        /**
         * 查找有多少个双字节字符
         * @param {string} str 字符串
         * @return {int}
         */
        getDwordNum:function(str) {
            return string.getByteLength(str) - str.length;
        },
        /**
         * 查找有多少个汉字字符
         * @param {string} str 字符串
         * @return {int}
         */
        getChineseNum:function(str) {
            return str.length - str.replace(/[\u4e00-\u9fa5]/g, "").length;
        },
        /**
         * 截取中文字符串
         * 取iMaxBytes 或最后一个中文字符出现的地方替换字符
         * @param {string} str 字符串
         * @param {int} iMaxBytes 字符串
         * @param {string} sSuffix 替补字符串
         * @return {string}
         */
        cutChinese:function(str, iMaxBytes, sSuffix) {
            if (isNaN(iMaxBytes)) return str;
            if (string.getByteLength(str) <= iMaxBytes) return str;
            var i = 0, bytes = 0;
            for (;i < str.length && bytes < iMaxBytes; ++i, ++bytes) {
                if (str.charCodeAt(i) > 255) {
                    ++bytes;
                }
            }
            sSuffix = sSuffix || "";
            return (bytes - iMaxBytes == 1 ? str.substr(0, i - 1) :str.substr(0, i)) + sSuffix;
        },
        /**
         * 去掉字符串左边的非空字符
         * @param {string} str 字符串
         * @return {string}
         */
        trimLeft:function(str) {
            return str.replace(/^\s+/, "");
        },
        /**
         * 去掉字符串右边的非空字符
         * @param {string} str 字符串
         * @return {string}
         */
        trimRight:function(str) {
            return str.replace(/\s+$/, "");
        },
        /**
         * 去掉字符串左右两边的非空字符
         * @param {string} str 字符串
         * @return {string}
         */
        trim:function(str) {
            return string.trimRight(string.trimLeft(str));
        },
        /**
         * 成对字符串替换
         * @param {string} str 字符串
         * @param {array} str 字符串<br/>
              array包含两个 [0] 查找内容，[1] 替换内容<br/>
              array可以出现多次<br/>
         * @return {string}
         */
        replacePairs:function() {
            var str = arguments[0];
            for (var i = 1; i < arguments.length; ++i) {
                var re = new RegExp(arguments[i][0], "g");
                str = str.replace(re, arguments[i][1]);
            }
            return str;
        },
        /**
         * 字符串替换为HTML编码形式
         * @param {string} str 字符串
         * @return {string}
         */
        toHtml:function(str) {
            var CONVERT_ARRAY = [ [ "&", "&#38;" ], [ " ", "&#32;" ], [ "'", "&#39;" ], [ '"', "&#34;" ], [ "/", "&#47;" ], [ "<", "&#60;" ], [ ">", "&#62;" ], [ "\\\\", "&#92;" ], [ "\n", "<br />" ], [ "\r", "" ] ];
            return string.replacePairs.apply(this, [ str ].concat(CONVERT_ARRAY));
        },
        /**
         * 校验邮箱地址
         * @param {string} str 字符串
         * @return {bool}
         */
        isMail:function(str) {
            return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(str);
        },
        /**
         * 校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”
         * @param {string} str 字符串
         * @return {bool}
         */
        isTel:function(str) {
            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(str);
        },
        /**
         * 校验手机号码：必须以数字开头
         * @param {string} str 字符串
         * @return {bool}
         */
        isMobile:function(str) {
            return /^1[34578]\d{9}$/.test(str);
        },
        /**
         * 校验邮政编码
         * @param {string} str 字符串
         * @return {bool}
         */
        isZipCode:function(str) {
            return /^(\d){6}$/.test(str);
        },
        /**
         * 是否身份证号码
         * @param {string} str 字符串
         * @return {bool}
         */
        isIDCard:function(str) {
            var C15ToC18 = function(c15) {
                var cId = c15.substring(0, 6) + "19" + c15.substring(6, 15);
                var strJiaoYan = [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ];
                var intQuan = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                var intTemp = 0;
                for (i = 0; i < cId.length; i++) intTemp += cId.substring(i, i + 1) * intQuan[i];
                intTemp %= 11;
                cId += strJiaoYan[intTemp];
                return cId;
            };
            var Is18IDCard = function(IDNum) {
                var aCity = {
                    11:"北京",
                    12:"天津",
                    13:"河北",
                    14:"山西",
                    15:"内蒙古",
                    21:"辽宁",
                    22:"吉林",
                    23:"黑龙江",
                    31:"上海",
                    32:"江苏",
                    33:"浙江",
                    34:"安徽",
                    35:"福建",
                    36:"江西",
                    37:"山东",
                    41:"河南",
                    42:"湖北",
                    43:"湖南",
                    44:"广东",
                    45:"广西",
                    46:"海南",
                    50:"重庆",
                    51:"四川",
                    52:"贵州",
                    53:"云南",
                    54:"西藏",
                    61:"陕西",
                    62:"甘肃",
                    63:"青海",
                    64:"宁夏",
                    65:"新疆",
                    71:"台湾",
                    81:"香港",
                    82:"澳门",
                    91:"国外"
                };
                var iSum = 0, info = "", sID = IDNum;
                if (!/^\d{17}(\d|x)$/i.test(sID)) {
                    return false;
                }
                sID = sID.replace(/x$/i, "a");
                if (aCity[parseInt(sID.substr(0, 2))] == null) {
                    return false;
                }
                var sBirthday = sID.substr(6, 4) + "-" + Number(sID.substr(10, 2)) + "-" + Number(sID.substr(12, 2));
                var d = new Date(sBirthday.replace(/-/g, "/"));
                if (sBirthday != d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()) return false;
                for (var i = 17; i >= 0; i--) iSum += Math.pow(2, i) % 11 * parseInt(sID.charAt(17 - i), 11);
                if (iSum % 11 != 1) return false;
                return true;
            };
            return str.length == 15 ? Is18IDCard(C15ToC18(str)) :Is18IDCard(str);
        },
        /**
         * 是否全部是中文
         * @param {string} str 字符串
         * @return {bool}
         */
        isChinese:function(str) {
            return string.getChineseNum(str) == str.length ? true :false;
        },
        /**
         * 是否全部是英文
         * @param {string} str 字符串
         * @return {bool}
         */
        isEnglish:function(str) {
            return /^[A-Za-z]+$/.test(str);
        },
        /**
         * 是否链接地址
         * @param {string} str 字符串
         * @return {bool}
         */
        isURL:function(str) {
            if (location.protocol == "https") {
                return /^https:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
            } else {
                return /^http:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
            }
        },
        /**
         * 是否数字字符串
         * @param {string} str 字符串
         * @return {bool}
         */
        isNumberString:function(str) {
            return /^\d+$/.test(str);
        }
    });
})(core.string);

namespace("core.cookie");

(function(cookie) {
    extend(cookie, {
        /**
         * 设置cookie
         * @param {string} sName cookie名
         * @param {string} sValue cookie值
         * @param {int} iExpireSec 失效时间（秒）
         * @param {string} sDomain 作用域
         * @param {string} sPath 作用路径
         * @param {bool} bSecure 是否加密
         * @return {void}
         */
        set:function(sName, sValue, iExpireSec, sDomain, sPath, bSecure) {
            if (sName == undefined) {
                return;
            }
            if (sValue == undefined) {
                sValue = "";
            }
            var oCookieArray = [ sName + "=" + escape(sValue) ];
            if (!isNaN(iExpireSec)) {
                var oDate = new Date();
                oDate.setTime(oDate.getTime() + iExpireSec * 1e3);
                iExpireSec == 0 ? "" :oCookieArray.push("expires=" + oDate.toGMTString());
            }
            if (sDomain != undefined) {
                oCookieArray.push("domain=" + sDomain);
            }
            if (sPath != undefined) {
                oCookieArray.push("path=" + sPath);
            }
            if (bSecure) {
                oCookieArray.push("secure");
            }
            document.cookie = oCookieArray.join("; ");
        },
        /**
         * 获取cookie
         * @param {string} sName cookie名
         * @param {string} sValue 默认值
         * @return {string} cookie值
         */
        get:function(sName, sDefaultValue) {
            var sRE = "(?:; |^)" + sName + "=([^;]*);?";
            var oRE = new RegExp(sRE);
            if (oRE.test(document.cookie)) {
                return unescape(RegExp["$1"]);
            } else {
                return sDefaultValue || null;
            }
        },
        /**
         * 获取cookie
         * @param {string} sName cookie名
         * @param {string} sDomain 作用域
         * @param {sPath} sPath 作用路径
         * @return {void} 
         */
        clear:function(sName, sDomain, sPath) {
            var oDate = new Date();
            cookie.set(sName, "", -oDate.getTime() / 1e3, sDomain, sPath);
        }
    });
})(core.cookie);

namespace("core.date");

(function(date) {
    var _d = new Date();
    extend(date, {
        /**
         * 获取日期
         * @param {string} sep 分隔符 默认为-
         * @return {string} yyyy-mm-dd
         */
        toDateString:function(nd) {
            var a = [], dt = isDate(nd) ? nd :_d;
            m = dt.getMonth() + 1, d = dt.getDate(), sep = arguments[1] ? arguments[1] :isString(arguments[0]) ? arguments[0] :"-";
            a.push(dt.getFullYear());
            a.push(m.toString().length < 2 ? "0" + m :m);
            a.push(d.toString().length < 2 ? "0" + d :d);
            return a.join(sep);
        },
        /**
         * 获取日期和时间
         * @param {string} sep 分隔符 默认为-
         * @return {string} yyyy-mm-dd hh:ii:ss
         */
        toDateTimeString:function(nd) {
            var dt = isDate(nd) ? nd :_d, h = dt.getHours(), i = dt.getMinutes(), s = dt.getSeconds(), a = [];
            a.push(h.toString().length < 2 ? "0" + h :h);
            a.push(i.toString().length < 2 ? "0" + i :i);
            a.push(s.toString().length < 2 ? "0" + s :s);
            return date.toDateString.apply(this, arguments) + " " + a.join(":");
        },
        /**
         * 是否润年
         * @param {int} year 年份
         * @return {bool} 是/否
         */
        isLeapYear:function(year) {
            return 0 == year % 4 && (year % 100 != 0 || year % 400 == 0);
        },
        /**
         * 获取服务器时间
         * @return {date} Date
         */
        getSeverDateTime:function() {
            var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") :new XMLHttpRequest();
            xhr.open("HEAD", window.location.href, false);
            xhr.send();
            var d = new Date(xhr.getResponseHeader("Date"));
            return d;
        }
    });
})(core.date);

namespace("core.number");

(function(number) {
    extend(number, {
        /**
         * 是否某一范围的整数
         * @param {int} n 数值
         * @param {int} iMin 范围低值
         * @param {int} iMax 范围高值
         * @return {bool} 
         */
        isInt:function(n, iMin, iMax) {
            if (!isFinite(n)) {
                return false;
            }
            if (!/^[+-]?\d+$/.test(n)) {
                return false;
            }
            if (iMin != undefined && parseInt(n) < parseInt(iMin)) {
                return false;
            }
            if (iMax != undefined && parseInt(n) > parseInt(iMax)) {
                return false;
            }
            return true;
        },
        /**
         * 是否某一范围浮点数
         * @param {float} n 数值
         * @param {float} fMin 范围低值
         * @param {float} fMax 范围高值
         * @return {bool} 
         */
        isFloat:function(n, fMin, fMax) {
            if (!isFinite(n)) {
                return false;
            }
            if (fMin != undefined && parseFloat(n) < parseFloat(fMin)) {
                return false;
            }
            if (fMax != undefined && parseFloat(n) > parseFloat(fMax)) {
                return false;
            }
            return true;
        },
        /**
         * 是否QQ号码
         * @param {int} qq qq号
         * @return {bool} 
         */
        isQQ:function(qq) {
            return /^[1-9]{1}\d{4,11}$/.test(qq);
        },
        /**
         * 取随机整数
         * @param {int} n 整数
         * @return {int} 0~n间的随机整数
         */
        randomInt:function(n) {
            return Math.floor(Math.random() * n);
        }
    });
})(core.number);

namespace("core.event");

(function(event) {
    extend(event, {
        /**
         * 停止事件继续进行
         * @param {event} e 事件
         * @return {dom} 
         */
        preventDefault:function(e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        /**
         * 阻止事件冒泡传递
         * @param {event} e 事件
         * @return {dom} 
         */
        stopPropagation:function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        },
        /**
         * 为DOM对象增加事件
         * @param {dom} element dom对象
         * @param {string} type 事件名称
         * @param {function} type 事件方法
         * @return {undefined} 
         */
        addEvent:function(el, type, fn) {
            if (window.addEventListener) {
                el["e" + type + fn] = fn;
                el[type + fn] = function(e) {
                    var _e = e || window.event, _r = el["e" + type + fn](_e);
                    if (_r == false) {
                        event.preventDefault(_e);
                        event.stopPropagation(_e);
                    }
                };
                el.addEventListener(type, el[type + fn], false);
            } else if (window.attachEvent) {
                el["e" + type + fn] = fn;
                el[type + fn] = function(e) {
                    var _r = el["e" + type + fn](window.event);
                    if (_r == false) event.preventDefault(window.event);
                };
                el.attachEvent("on" + type, el[type + fn]);
                return;
            } else {
                el["on" + type] = fn;
            }
        },
        /**
         * 为DOM对象移除事件
         * @param {dom} element dom对象
         * @param {string} type 事件名称
         * @param {function} type 事件方法
         * @return {undefined} 
         */
        removeEvent:function(el, type, fn) {
            if (window.removeEventListener) {
                el.removeEventListener(type, el[type + fn], false);
                el[type + fn] = null;
            } else if (window.detachEvent) {
                el.detachEvent("on" + type, el[type + fn]);
                el[type + fn] = null;
                return;
            } else {
                el["on" + type] = null;
            }
        },
        tapEvent:function(el, fn) {
            var before = 0, after = 0, calcel = false;
            el.addEventListener("touchstart", function(event) {
                before = event.timeStamp;
                calcel = false
            });
            el.addEventListener("touchmove", function(event) {
                calcel = true
            });
            el.addEventListener("touchend", function(event) {
                after = event.timeStamp;
                if(!calcel && after - before < 500) fn.call(this)
            })
        }
    });
})(core.event);

namespace("core.object");

(function(object) {
    extend(object, {
        /**
         * 序列化JSON对象
         * 对object转化为url参数字符串，各属性间以&分隔，如a=1&b=2&c=3
         * 对象属性为string 则进行encodeURIComponent编码
         * 对象属性为bool 则以0代表false 1代表true
         * 对象属性为对象，则会继续进行递归序列化
         * 对象属性为function 则返回function.toString
         * @param {object} jsonObj json对象
         * @return {string}
         */
        serialize:function(jsonObj) {
            var newJsonObj = null;
            if (typeof jsonObj == "undefined" || typeof jsonObj == "function") newJsonObj = "";
            if (typeof jsonObj == "number") newJsonObj = jsonObj.toString();
            if (typeof jsonObj == "boolean") newJsonObj = jsonObj ? "1" :"0";
            if (typeof jsonObj == "object") {
                if (!jsonObj) newJsonObj = "";
                if (jsonObj instanceof RegExp) newJsonObj = jsonObj.toString();
            }
            if (typeof jsonObj == "string") newJsonObj = jsonObj;
            if (typeof newJsonObj == "string") return encodeURIComponent(newJsonObj);
            var ret = [];
            if (jsonObj instanceof Array) {
                for (var i = 0; i < jsonObj.length; i++) {
                    if (typeof jsonObj[i] == "undefined") continue;
                    ret.push(typeof jsonObj[i] == "object" ? "" :object.serialize(jsonObj[i]));
                }
                return ret.join("|");
            } else {
                for (var i in jsonObj) {
                    if (typeof jsonObj[i] == "undefined") continue;
                    newJsonObj = null;
                    if (typeof jsonObj[i] == "object") {
                        if (jsonObj[i] instanceof Array) {
                            newJsonObj = jsonObj[i];
                            ret.push(i + "=" + object.serialize(newJsonObj));
                        } else {
                            ret.push(i + "=");
                        }
                    } else {
                        newJsonObj = jsonObj[i];
                        ret.push(i + "=" + object.serialize(newJsonObj));
                    }
                }
                return ret.join("&");
            }
        },
        /**
         * 反序列化为JSON对象
         * 对url参形形式的对象反序列化成为JSON对象
         * 与serialize相对应
         * @param {object} jsonObj json对象
         * @return {string}
         */
        unSerialize:function(jsonStr, de) {
            de = de || 0;
            jsonStr = jsonStr.toString();
            if (!jsonStr) return {};
            var retObj = {}, obj1Ret = jsonStr.split("&");
            if (obj1Ret.length == 0) return retObj;
            for (var i = 0; i < obj1Ret.length; i++) {
                if (!obj1Ret[i]) continue;
                var ret2 = obj1Ret[i].split("=");
                if (ret2.length >= 2) {
                    var ret0 = obj1Ret[i].substr(0, obj1Ret[i].indexOf("=")), ret1 = obj1Ret[i].substr(obj1Ret[i].indexOf("=") + 1);
                    if (!ret1) ret1 = "";
                    if (ret0) retObj[ret0] = de == 0 ? decodeURIComponent(ret1) :ret1;
                }
            }
            return retObj;
        },
        /**
         * 对整个object进行utf8格式的url解码
         * @param {object} newopt 解码对象
         * @return {object} 已解码对象
         */
        decode:function(newopt) {
            if (typeof newopt == "string") {
                try {
                    return decodeURIComponent(newopt);
                } catch (e) {}
                return newopt;
            }
            if (typeof newopt == "object") {
                if (newopt == null) {
                    return null;
                }
                if (newopt instanceof Array) {
                    for (var i = 0; i < newopt.length; i++) {
                        newopt[i] = object.decode(newopt[i]);
                    }
                    return newopt;
                } else if (newopt instanceof RegExp) {
                    return newopt;
                } else {
                    for (var i in newopt) {
                        newopt[i] = object.decode(newopt[i]);
                    }
                    return newopt;
                }
            }
            return newopt;
        }
    });
})(core.object);

/**
 * 将库扩展至core对象
*/
extend(core, core.loader);

extend(core, core.dom);

extend(core, core.array);

extend(core, core.string);

extend(core, core.cookie);

extend(core, core.date);

extend(core, core.number);

extend(core, core.event);

extend(core, core.object);