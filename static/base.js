/*************************************************************************
*
*			Date 对象的扩展
*
**************************************************************************/
Date.prototype.Format = function (format) {
    /// <summary>格式化时间为字符串</summary>
    /// <param name="format" type="string">必需。例如："yyyy-MM-dd hh:mm:ss",其中M表示月，d表示日，h表示小时，m表示分钟，s表示秒，q表示季度，S表示毫秒</param>
    /// <returns type="string">返回对应格式时间</returns>
    var o = {
        "M+": this.getMonth() + 1,  //month
        "d+": this.getDate(),     //day
        "h+": this.getHours(),    //hour
        "m+": this.getMinutes(),  //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

Date.prototype.DateAdd = function (interval, number) {
    /// <summary>计算时间偏移,例如:var tc = now.DateAdd("y",1);</summary>
    /// <param name="interval" type="string">必需。y表示年，m表示年，d表示日，w表示周，h表示小时，n表示分钟，s表示秒，l表示毫秒</param>
    /// <param name="number" type="int">必需。可以为负值</param>
    /// <returns type="datetime">返回时间对象</returns>
    number = parseInt(number);
    var date = new Date(this.getTime());
    //
    switch (interval) {
        case "y": date.setFullYear(this.getFullYear() + number); break;
        case "m": date.setMonth(this.getMonth() + number); break;
        case "d": date.setDate(this.getDate() + number); break;
        case "w": date.setDate(this.getDate() + 7 * number); break;
        case "h": date.setHours(this.getHours() + number); break;
        case "n": date.setMinutes(this.getMinutes() + number); break;
        case "s": date.setSeconds(this.getSeconds() + number); break;
        case "l": date.setMilliseconds(this.getMilliseconds() + number); break;
    }
    return date;
}

// 计算当前日期在本年度的周数  
Date.prototype.getWeekOfYear = function(weekStart) { // weekStart：每周开始于周几：周日：0，周一：1，周二：2 ...，默认为周日  
    weekStart = (weekStart || 0) - 0;  
    if(isNaN(weekStart) || weekStart > 6)  
        weekStart = 0;    
  
    var year = this.getFullYear();  
    var firstDay = new Date(year, 0, 1);  
    var firstWeekDays = 7 - firstDay.getDay() + weekStart;  
    var dayOfYear = (((new Date(year, this.getMonth(), this.getDate())) - firstDay) / (24 * 3600 * 1000)) + 1;  
    return Math.ceil((dayOfYear - firstWeekDays) / 7) + 1;  
}  
  
// 计算当前日期在本月份的周数  
Date.prototype.getWeekOfMonth = function(weekStart) {  
    weekStart = (weekStart || 0) - 0;  
    if(isNaN(weekStart) || weekStart > 6)  
        weekStart = 0;  
  
    var dayOfWeek = this.getDay();  
    var day = this.getDate();  
    return Math.ceil((day - dayOfWeek - 1) / 7) + ((dayOfWeek >= weekStart) ? 1 : 0);  
}
/*************************************************************************
*
*			定义命名空间的方法
*
**************************************************************************/
var TUI = {};
TUI.namespace = function (ns) {
    var a = arguments, o = null, i, j, d;
    for (i = 0; i < a.length; i = i + 1) {
        d = ("" + a[i]).split(".");
        o = TUI;

        // FrontView is implied, so it is ignored if it is included
        for (j = (d[0] == "TUI") ? 1 : 0; j < d.length; j = j + 1) {
            o[d[j]] = o[d[j]] || {};
            o = o[d[j]];
        }
    }

    return o;
};

TUI.ns = TUI.namespace;

/*************************************************************************
*
*			继承对象类型的方法
*
**************************************************************************/
TUI.hasOwnProperty = (Object.prototype.hasOwnProperty) ?
    function (o, prop) {
        return o && o.hasOwnProperty && o.hasOwnProperty(prop);
    } : function (o, prop) {
        return !TUI.Utils.isUndefined(o[prop]) &&
                o.constructor.prototype[prop] !== o[prop];
    };

TUI.extend = function (subc, superc, overrides) {
    if (!superc || !subc) {
        throw new Error("extend failed, please check that " +
						"all dependencies are included.");
    }
    var f = function () { }, i;
    f.prototype = superc.prototype;
    subc.prototype = new f();
    subc.prototype.constructor = subc;
    subc.superclass = superc.prototype;
    if (superc.prototype.constructor == Object.prototype.constructor) {
        superc.prototype.constructor = superc;
    }

    if (overrides) {
        for (i in overrides) {
            if (TUI.hasOwnProperty(overrides, i)) {
                subc.prototype[i] = overrides[i];
            }
        }
        TUI.Utils._IEEnumFix(subc.prototype, overrides);
    }
};
/*************************************************************************
*
*			JSON处理的方法（encode，decode，toString）
*
**************************************************************************/
TUI.JSON = new function () {
    this.decode = JSON.parse;
    this.encode = JSON.stringify;
	this.toString = function(){
			var	self = arguments.length ? arguments[0] : this,
				result, tmp;
			var tab=arguments.length>1 ?arguments[1]:"";
			var first=arguments.length>2 ?arguments[2]:0;
			if(self === null)
				result = "null";
			else if(self !== undefined && (tmp = $[typeof self](self))) {
				switch(tmp){
					case	Array:
						result = [];
						for(var	i = 0, j = 0, k = self.length; j < k; j++) {
							if(self[j] !== undefined && (tmp = this.encode(self[j],tab+"\t",i==0?1:0)))
								result[i++] = tmp;
						};
						result = "[".concat(result.join(",\r\n"),"]");
						break;
					case	Boolean:
						result = String(self);
						break;
					case	Date:
						result = '"'.concat(self.getFullYear(), '-', d(self.getMonth() + 1), '-', d(self.getDate()), 'T', d(self.getHours()), ':', d(self.getMinutes()), ':', d(self.getSeconds()), '"');
						break;
					case	Function:
						break;
					case	Number:
						result = isFinite(self) ? String(self) : "null";
						break;
					case	String:
						result = '"'.concat(self.replace(rs, s).replace(ru, u), '"');
						break;
					default:
						var	i = 0, key;
						result = [];
						for(key in self) {
							if(self[key] !== undefined && (tmp = this.encode(self[key],tab+"\t",1)))
								result[i++] = tab.concat('\t"',key.replace(rs, s).replace(ru, u), '":', tmp);
						};
						if(first==1)
							result = "{\r\n".concat(result.join(",\r\n"), "\r\n",tab,"}");
						else
							result = tab.concat("{\r\n",result.join(",\r\n"), "\r\n",tab,"}");
						break;
				}
			};
			return result;
		};

	var	c = {"\b":"b","\t":"t","\n":"n","\f":"f","\r":"r",'"':'"',"\\":"\\","/":"/"},
		d = function(n){return n<10?"0".concat(n):n},
		e = function(c,f,e){e=eval;delete eval;if(typeof eval==="undefined")eval=e;f=eval(""+c);eval=e;return f},
		i = function(e,p,l){return 1*e.substr(p,l)},
		p = ["","000","00","0",""],
		rc = null,
		rd = /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/,
		rs = /(\x5c|\x2F|\x22|[\x0c-\x0d]|[\x08-\x0a])/g,
		rt = /^([0-9]+|[0-9]+[,\.][0-9]{1,3})$/,
		ru = /([\x00-\x07]|\x0b|[\x0e-\x1f])/g,
		s = function(i,d){return "\\".concat(c[d])},
		u = function(i,d){
			var	n=d.charCodeAt(0).toString(16);
			return "\\u".concat(p[n.length],n)
		},
		v = function(k,v){return $[typeof result](result)!==Function&&(v.hasOwnProperty?v.hasOwnProperty(k):v.constructor.prototype[k]!==v[k])},
		$ = {
			"boolean":function(){return Boolean},
			"function":function(){return Function},
			"number":function(){return Number},
			"object":function(o){return o instanceof o.constructor?o.constructor:null},
			"string":function(){return String},
			"undefined":function(){return null}
		},
		$$ = function(m){
			function $(c,t){t=c[m];delete c[m];try{e(c)}catch(z){c[m]=t;return 1}};
			return $(Array)&&$(Object)
		};
	try{rc=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}
	catch(z){rc=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}
};

/*****************************************************************************************
*
*			浏览器端环境
*
*******************************************************************************************/
TUI.env = TUI.env || {};

/**
* parses a user agent string (or looks for one in navigator to parse if
* not supplied).
* @method parseUA
* @since 2.9.0
* @static
*/
TUI.env.parseUA = function (agent) {

    var numberify = function (s) {
        var c = 0;
        return parseFloat(s.replace(/\./g, function () {
            return (c++ == 1) ? '' : '.';
        }));
    },

        nav = navigator,

        o = {

            /**
            * Internet Explorer version number or 0.  Example: 6
            * @property ie
            * @type float
            * @static
            */
            ie: 0,

            /**
            * Opera version number or 0.  Example: 9.2
            * @property opera
            * @type float
            * @static
            */
            opera: 0,

            /**
            * Gecko engine revision number.  Will evaluate to 1 if Gecko
            * is detected but the revision could not be found. Other browsers
            * will be 0.  Example: 1.8
            * <pre>
            * Firefox 1.0.0.4: 1.7.8   <-- Reports 1.7
            * Firefox 1.5.0.9: 1.8.0.9 <-- 1.8
            * Firefox 2.0.0.3: 1.8.1.3 <-- 1.81
            * Firefox 3.0   <-- 1.9
            * Firefox 3.5   <-- 1.91
            * </pre>
            * @property gecko
            * @type float
            * @static
            */
            gecko: 0,

            /**
            * AppleWebKit version.  KHTML browsers that are not WebKit browsers
            * will evaluate to 1, other browsers 0.  Example: 418.9
            * <pre>
            * Safari 1.3.2 (312.6): 312.8.1 <-- Reports 312.8 -- currently the
            *                                   latest available for Mac OSX 10.3.
            * Safari 2.0.2:         416     <-- hasOwnProperty introduced
            * Safari 2.0.4:         418     <-- preventDefault fixed
            * Safari 2.0.4 (419.3): 418.9.1 <-- One version of Safari may run
            *                                   different versions of webkit
            * Safari 2.0.4 (419.3): 419     <-- Tiger installations that have been
            *                                   updated, but not updated
            *                                   to the latest patch.
            * Webkit 212 nightly:   522+    <-- Safari 3.0 precursor (with native
            * SVG and many major issues fixed).
            * Safari 3.0.4 (523.12) 523.12  <-- First Tiger release - automatic
            * update from 2.x via the 10.4.11 OS patch.
            * Webkit nightly 1/2008:525+    <-- Supports DOMContentLoaded event.
            *                                   yahoo.com user agent hack removed.
            * </pre>
            * http://en.wikipedia.org/wiki/Safari_version_history
            * @property webkit
            * @type float
            * @static
            */
            webkit: 0,

            safari: 0,
            /**
            * Chrome will be detected as webkit, but this property will also
            * be populated with the Chrome version number
            * @property chrome
            * @type float
            * @static
            */
            chrome: 0,

            /**
            * The mobile property will be set to a string containing any relevant
            * user agent information when a modern mobile browser is detected.
            * Currently limited to Safari on the iPhone/iPod Touch, Nokia N-series
            * devices with the WebKit-based browser, and Opera Mini.
            * @property mobile
            * @type string
            * @static
            */
            mobile: null,

            /**
            * Adobe AIR version number or 0.  Only populated if webkit is detected.
            * Example: 1.0
            * @property air
            * @type float
            */
            air: 0,
            /**
            * Detects Apple iPad's OS version
            * @property ipad
            * @type float
            * @static
            */
            ipad: 0,
            /**
            * Detects Apple iPhone's OS version
            * @property iphone
            * @type float
            * @static
            */
            iphone: 0,
            /**
            * Detects Apples iPod's OS version
            * @property ipod
            * @type float
            * @static
            */
            ipod: 0,
            /**
            * General truthy check for iPad, iPhone or iPod
            * @property ios
            * @type float
            * @static
            */
            ios: null,
            /**
            * Detects Googles Android OS version
            * @property android
            * @type float
            * @static
            */
            android: 0,
            /**
            * Detects Palms WebOS version
            * @property webos
            * @type float
            * @static
            */
            webos: 0,

            /**
            * Google Caja version number or 0.
            * @property caja
            * @type float
            */
            caja: nav && nav.cajaVersion,

            /**
            * Set to true if the page appears to be in SSL
            * @property secure
            * @type boolean
            * @static
            */
            secure: false,
            /**
            *
            * support html5
            *
            */
            html5: false,
            /**
            *
            * support touch
            *
            */
            ontouch: false,
            /**
            *
            * support 3d
            *
            */
            has3d: false,

            /**
            *
            * clickEventType
            *
            */
            clickEventUp: "mouseup",
            clickEventDown: "mousedown",
            clickEventMove: "mousemove",
            /**
            * The operating system.  Currently only detecting windows or macintosh
            * @property os
            * @type string
            * @static
            */
            os: null

        },

    ua = agent || (navigator && navigator.userAgent),

    loc = window && window.location,

    href = loc && loc.href,

    m;

    o.secure = href && (href.toLowerCase().indexOf("https") === 0);
    o.html5 = !!document.createElement("canvas").getContext;
    o.ontouch = 'ontouchend' in document;
    o.has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

    o.clickEventUp = (o.ontouch ? 'touchend' : 'mouseup');
    o.clickEventDown = (o.ontouch ? 'touchstart' : 'mousedown');
    o.clickEventMove = (o.ontouch ? 'touchmove' : 'mousemove');

    if (ua) {

        if ((/windows|win32/i).test(ua)) {
            o.os = 'windows';
			//
			if (window.navigator.msMaxTouchPoints>1 || window.navigator.maxTouchPoints>1) {
				o.ontouch=true;
				o.clickEventUp = "pointerup";  //"MSPointerUp" for IE10;
				o.clickEventDown = "pointerdown";  //"MSPointerDown" for IE10;
				o.clickEventMove = "pointermove";  //"MSPointerMove" for IE10;
			}
			else
			{
				o.ontouch=false;
				o.clickEventUp = 'mouseup';
				o.clickEventDown = 'mousedown';
				o.clickEventMove = 'mousemove';
			}
        } else if ((/macintosh/i).test(ua)) {
            o.os = 'macintosh';
        } else if ((/rhino/i).test(ua)) {
            o.os = 'rhino';
        }

        // Modern KHTML browsers should qualify as Safari X-Grade
        if ((/KHTML/).test(ua)) {
            o.webkit = 1;
        }
        // Modern WebKit browsers are at least X-Grade
        m = ua.match(/AppleWebKit([^\s]*)/);
        if (m && m[1]) {
            o.webkit = numberify(m[1]);

            // Mobile browser check
            if (/ Mobile\//.test(ua)) {
                o.mobile = 'Apple'; // iPhone or iPod Touch

                m = ua.match(/OS ([^\s]*)/);
                if (m && m[1]) {
                    m = numberify(m[1].replace('_', '.'));
                }
                o.ios = m;
                o.ipad = o.ipod = o.iphone = 0;

                m = ua.match(/iPad|iPod|iPhone/);
                if (m && m[0]) {
                    o[m[0].toLowerCase()] = o.ios;
                }
            } else {
                m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
                if (m) {
                    // Nokia N-series, Android, webOS, ex: NokiaN95
                    o.mobile = m[0];
                }
                if (/webOS/.test(ua)) {
                    o.mobile = 'WebOS';
                    m = ua.match(/webOS\/([^\s]*);/);
                    if (m && m[1]) {
                        o.webos = numberify(m[1]);
                    }
                }
                if (/Android/.test(ua) || /ipad; u;/.test(ua)) {
                    o.mobile = 'Android';
                    m = ua.match(/Android ([^\s]*);/);
                    if (m && m[1]) {
                        o.android = numberify(m[1]);
                    }

                }
            }

            m = ua.match(/Chrome\/([^\s]*)/);
            if (m && m[1]) {
                o.chrome = numberify(m[1]); // Chrome
            } else {
                m = ua.match(/AdobeAIR\/([^\s]*)/);
                if (m) {
                    o.air = m[0]; // Adobe AIR 1.0 or better
                }
                else {
                    m = ua.match(/Safari\/([^\s]*)/);
                    if (m) {
                        o.safari = m[0];
                    }
                }
            }
        }

        if (!o.webkit) { // not webkit
            // @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
            m = ua.match(/Opera[\s\/]([^\s]*)/);
            if (m && m[1]) {
                o.opera = numberify(m[1]);
                m = ua.match(/Version\/([^\s]*)/);
                if (m && m[1]) {
                    o.opera = numberify(m[1]); // opera 10+
                }
                m = ua.match(/Opera Mini[^;]*/);
                if (m) {
                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }
            } else { // not opera or webkit
                m = ua.match(/MSIE\s([^;]*)/);
                if (m && m[1]) {
                    o.ie = numberify(m[1]);
                } else { // not opera, webkit, or ie
                    m = ua.match(/Trident\/([^\s]*)/);
					if (m) {
						o.ie = 11;
						m = ua.match(/rv:([^\s\)]*)/);
						if (m && m[1]) {
							o.ie = numberify(m[1]);
						}
					}
					else
                    {
						m = ua.match(/Gecko\/([^\s]*)/);
						if (m) {
							o.gecko = 1; // Gecko detected, look for revision
							m = ua.match(/rv:([^\s\)]*)/);
							if (m && m[1]) {
								o.gecko = numberify(m[1]);
							}
						}
					}
                }
            }
        }
    }

    return o;
};

TUI.env.ua = TUI.env.parseUA();
TUI.env.log = [];
TUI.env.us = null;
TUI.env.status="Login";

if (window != top && top.TUI) {
    TUI.env.us = top.TUI.env.us;
}
/*****************************************************************************************
*
*			扩展方法工具包
*
*******************************************************************************************/
TUI.Utils = new function () {
    var keyStr = "ABCDEFGHIJKLMNOP" +
                "QRSTUVWXYZabcdef" +
                "ghijklmnopqrstuv" +
                "wxyz0123456789+/" +
                "=",
    OP = Object.prototype,
	ARRAY_TOSTRING = '[object Array]',
    FUNCTION_TOSTRING = '[object Function]',
    OBJECT_TOSTRING = '[object Object]',
    NOTHING = [],

    HTML_CHARS = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;'
    },

    // ADD = ["toString", "valueOf", "hasOwnProperty"],
    ADD = ["toString", "valueOf"];

    /* Section: Methods - Public */
    /**
    * Determines wheather or not the provided object is an array.
    * @method isArray
    * @param {any} o The object being testing
    * @return {boolean} the result
    */
    this.isArray = function (o) {
        return OP.toString.apply(o) === ARRAY_TOSTRING;
    };

    /**
    * Determines whether or not the provided object is a boolean
    * @method isBoolean
    * @param {any} o The object being testing
    * @return {boolean} the result
    */
    this.isBoolean = function (o) {
        return typeof o === 'boolean';
    };

    /**
    * Determines whether or not the provided object is a function.
    * Note: Internet Explorer thinks certain functions are objects:
    *
    * var obj = document.createElement("object");
    * TUI.lang.isFunction(obj.getAttribute) // reports false in IE
    *
    * var input = document.createElement("input"); // append to body
    * TUI.lang.isFunction(input.focus) // reports false in IE
    *
    * You will have to implement additional tests if these functions
    * matter to you.
    *
    * @method isFunction
    * @param {any} o The object being testing
    * @return {boolean} the result
    */
    this.isFunction = function (o) {
        return (typeof o === 'function') || OP.toString.apply(o) === FUNCTION_TOSTRING;
    };

    /**
    * Determines whether or not the provided object is null
    * @method isNull
    * @param {any} o The object being testing
    * @return {boolean} the result
    */
    this.isNull = function (o) {
        return o === null;
    };

    /**
    * Determines whether or not the provided object is a legal number
    * @method isNumber
    * @param {any} o The object being testing
    * @return {boolean} the result
    */
    this.isNumber = function (o) {
        return typeof o === 'number' && isFinite(o);
    };

    /**
    * Determines whether or not the provided object is of type object
    * or function
    * @method isObject
    * @param {any} o The object being testing
    * @return {boolean} the result
    */
    this.isObject = function (o) {
        return (o && (typeof o === 'object' || this.isFunction(o))) || false;
    };

    /**
    * Determines whether or not the provided object is a string
    * @method isString
    * @param {any} o The object being testing
    * @return {boolean} the result
    */
    this.isString = function (o) {
        return typeof o === 'string';
    };

    this.isUndefined = function (o) {
        return typeof o === 'undefined';
    };

    /**
    * Returns a string without any leading or trailing whitespace.  If
    * the input is not a string, the input will be returned untouched.
    * @method trim
    * @since 2.3.0
    * @param s {string} the string to trim
    * @return {string} the trimmed string
    */
    this.trim = function (s) {
        try {
            return s.replace(/^\s+|\s+$/g, "");
        } catch (e) {
            return s;
        }
    };

    /**
    * A convenience method for detecting a legitimate non-null value.
    * Returns false for null/undefined/NaN, true for other values,
    * including 0/false/''
    * @method isValue
    * @since 2.3.0
    * @param o {any} the item to test
    * @return {boolean} true if it is not null/undefined/NaN || false
    */
    this.isValue = function (o) {
        // return (o || o === false || o === 0 || o === ''); // Infinity fails
        return (this.isObject(o) || this.isString(o) || this.isNumber(o) || this.isBoolean(o));
    };

    //校验是否全由数字组成 
    this.isDigit = function (s) {
        var patrn = /^[0-9]{1,20}$/;
        if (!patrn.exec(s))
            return false;

        return true;
    }

    //校验密码：只能输入6-20个字母、数字、下划线  
    this.isPasswd = function (s) {
        var patrn = /^(\w){6,20}$/;
        if (!patrn.exec(s))
            return false;
        return true;
    }

    //校验普通电话、传真号码：可以“+”开头，除数字外，可含有“-”  
    this.isTel = function (s) {
        var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
        if (!patrn.exec(s))
            return false;
        return true;
    }

    //校验手机号码：必须以数字开头，除数字外，可含有“-”  
    this.isMobil = function (s) {
        var patrn = /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/;
        if (!patrn.exec(s))
            return false;
        return true;
    }


    this.isIPAddr = function (s) //by zergling  
    {
        var patrn = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
        if (!patrn.exec(s))
            return false;
        return true;
    }

    /**
    * IE will not enumerate native functions in a derived object even if the
    * function was overridden.  This is a workaround for specific functions
    * we care about on the Object prototype.
    * @property _IEEnumFix
    * @param {Function} r  the object to receive the augmentation
    * @param {Function} s  the object that supplies the properties to augment
    * @static
    * @private
    */
    this._IEEnumFix = (TUI.env.ua.ie) ? function (r, s) {
        var i, fname, f;
        for (i = 0; i < ADD.length; i = i + 1) {

            fname = ADD[i];
            f = s[fname];

            if (this.isFunction(f) && f != OP[fname]) {
                r[fname] = f;
            }
        }
    } : function () { };
    /*
    Method: parseDate
    transforms a encoded Date string into a native Date object.
	
    Arguments:
    [String/Number] - Optional Date string or server time if this method is not a String prototype. Server time should be an integer, based on seconds since 1970/01/01 or milliseconds / 1000 since 1970/01/01.
	
    Returns:
    Date - Date object or undefined if string is not a valid Date
	
    Example [Basic]:
    >var	serverDate = Utils.parseDate("2007-04-05 08:36:46");
    >alert(serverDate.getMonth());	// 3 (months start from 0)

    */

    this.parseDate = function (str) {
        if (typeof str == 'string') {
            var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
            if (results && results.length > 3)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
            if (results && results.length > 5)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
            if (results && results.length > 6)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
            if (results && results.length > 7)
                return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10), parseInt(results[7], 10));
        }
        else if (typeof str == 'number') {
            return new Date(str * 1000);
        }
        return null;
    };

	this.dateDiff = function (interval,startTime, endTime) {
            switch (interval) {
                case "s":
                    return parseInt((endTime - startTime) / 1000);
                case "n":
                    return parseInt((endTime - startTime) / 60000);
                case "h":
                    return parseInt((endTime - startTime) / 3600000);
                case "d":
                    return parseInt((endTime - startTime) / 86400000);
                case "w":
                    return parseInt((endTime - startTime) / (86400000 * 7));
                case "m":
                    return (endTime.getMonth() + 1) + ((endTime.getFullYear() - startTime.getFullYear()) * 12) - (startTime.getMonth() + 1);
                case "y":
                    return endTime.getFullYear() - startTime.getFullYear();
                default:
                    return undefined;
            }
	};

	this.dateMessage= function (str) {
		var now=new Date();
		var tc=new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0,0);	//今天
		var t1=tc.DateAdd("d",-1);	//昨天
		var t2=tc.DateAdd("d",-2);	//前天
		
		var t3=new Date(now.getFullYear(),0,1,0,0,0,0);	//今年
		var t4=tc.DateAdd("d",1);	//明天
		//
		var time=str;
		if (typeof str == 'string') {
            var results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) *$/);
            if (results && results.length > 3)
                time = new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
            if (results && results.length > 5)
                time = new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
            if (results && results.length > 6)
                time = new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));
            results = str.match(/^ *(\d{4})-(\d{1,2})-(\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})\.(\d{1,9}) *$/);
            if (results && results.length > 7)
                time = new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10), parseInt(results[7], 10));
        }
        else if (typeof str == 'number') {
            time = new Date(str * 1000);
        }
		//
		if(time>t4)
		{
			return time.Format("yyyy年MM月");
		}
		else if(time>tc)
		{
			return time.Format("今天 hh:mm");
		}
		else if(time>t1)
		{
			return time.Format("昨天 hh:mm");
		}
		else if(time>t2)
		{
			return time.Format("前天 hh:mm");
		}
		else if(time>t3)
		{
			return time.Format("MM月dd日");
		}
		else
		{
			return time.Format("yyyy年MM月");
		}
	};
    //输出调试日志
    this.log = function (msg, cat, src) {
        if (TUI.Utils.isUndefined(msg))
            return;
        if (TUI.Utils.isUndefined(cat))
            cat = "info";
        if (TUI.Utils.isUndefined(src))
            src = window.location.pathname;
        //
        var tc = new Date();
        if (TUI.env.log.length > 1024) {
            TUI.env.log.shift();
        }
        TUI.env.log.push({ msg: tc.Format("hh:mm:ss.S") + " " + msg, cat: cat, src: src, type: "text" });
        //
    };
    //Base64编码
    this.encode64 = function (input) {
		if(input=="" || input==undefined)
			return "";
        input = escape(input).replace(/\+/g, '%2B');
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        do {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
			keyStr.charAt(enc1) +
			keyStr.charAt(enc2) +
			keyStr.charAt(enc3) +
			keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
    };
    //Base64解码
    this.decode64 = function (input) {
		if(input=="" || input==undefined)
			return "";
        var output = "";
        var chr1, chr2, chr3 = "";
        var enc1, enc2, enc3, enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
            alert("There were invalid base64 characters in the input text.\n" +
			   "Valid base64 characters are A-Z, a-z, 0-9, '+', '/', and '='\n" +
			   "Expect errors in decoding.");
        }


        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");


        do {
            enc1 = keyStr.indexOf(input.charAt(i++));
            enc2 = keyStr.indexOf(input.charAt(i++));
            enc3 = keyStr.indexOf(input.charAt(i++));
            enc4 = keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";

        } while (i < input.length);


        return unescape(output);
    };

	this.getOpcPathName = function(strOPCFullName, leftNum) {
		var arr = strOPCFullName.split(".");
		var res = [];
		for (l = leftNum; l < arr.length; l++) {
			res[res.length] = arr[l];
		}
		return res.join(".");
	};

	this.getOpcPathTag = function(strOPCFullName, rightNum) {
		var arr = strOPCFullName.split(".");
		var res = [];
		for (l = 0; l < rightNum; l++) {
			res[res.length] = arr[l];
		}
		return res.join(".");
	};

    /**
    * 数字对象的格式化;
    */
    this.formatNumber = function (num, pattern) {
        var fmtarr = pattern ? pattern.split('.') : [''];
		var pos=fmtarr.length > 1 ? fmtarr[1].length : 0;
		if(pos>0)
			num=Math.round(num*Math.pow(10, pos))/Math.pow(10, pos);
		//
        var strarr = num ? num.toString().split('.') : ['0'];
        var retstr = '';
		//
		
        // 整数部分  
        var str = strarr[0];
        var fmt = fmtarr[0];
        var i = str.length - 1;
        var comma = false;
        for (var f = fmt.length - 1; f >= 0; f--) {
            switch (fmt.substr(f, 1)) {
                case '#':
                    if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                    break;
                case '0':
                    if (i >= 0) retstr = str.substr(i--, 1) + retstr;
                    else retstr = '0' + retstr;
                    break;
                case ',':
                    comma = true;
                    retstr = ',' + retstr;
                    break;
            }
        }
        if (i >= 0) {
            if (comma) {
                var l = str.length;
                for (; i >= 0; i--) {
                    retstr = str.substr(i, 1) + retstr;
                    if (i > 0 && ((l - i) % 3) == 0) retstr = ',' + retstr;
                }
            }
            else retstr = str.substr(0, i + 1) + retstr;
        }

        retstr = retstr + '.';
        // 处理小数部分  
        str = strarr.length > 1 ? strarr[1] : '';
        fmt = fmtarr.length > 1 ? fmtarr[1] : '';
        i = 0;
        for (var f = 0; f < fmt.length; f++) {
            switch (fmt.substr(f, 1)) {
                case '#':
                    if (i < str.length) retstr += str.substr(i++, 1);
                    break;
                case '0':
                    if (i < str.length) retstr += str.substr(i++, 1);
                    else retstr += '0';
                    break;
            }
        }
        return retstr.replace(/^,+/, '').replace(/\.$/, '');
    };

	/**
    * 精确浮点数精度;
    */
    this.floatPrecision = function (src, pos)
	{
		return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
	};
	//
	this.parseBoolean = function (string) {
	  switch (String(string).toLowerCase()) {
		case "true":
		case "1":
		case "yes":
		case "y":
		  return true;
		case "false":
		case "0":
		case "no":
		case "n":
		  return false;
		default:
		  //you could throw an error, but 'undefined' seems a more logical reply
		  return undefined;
	  }
	};

    //计算字符串Hash值
    var hexcase = 0;
    var b64pad = "";
    var chrsz = 8;
    this.hex_sha1 = function (s) { return binb2hex(core_sha1(str2binb(s), s.length * chrsz)); }
    this.hex_hmac_sha1 = function (key, data) { return binb2hex(core_hmac_sha1(key, data)); }

    function core_sha1(x, len) {
        /* append padding */
        x[len >> 5] |= 0x80 << (24 - len % 32);
        x[((len + 64 >> 9) << 4) + 15] = len;

        var w = Array(80);
        var a = 1732584193;
        var b = -271733879;
        var c = -1732584194;
        var d = 271733878;
        var e = -1009589776;

        for (var i = 0; i < x.length; i += 16) {
            var olda = a;
            var oldb = b;
            var oldc = c;
            var oldd = d;
            var olde = e;

            for (var j = 0; j < 80; j++) {
                if (j < 16) w[j] = x[i + j];
                else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
                var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)),
                       safe_add(safe_add(e, w[j]), sha1_kt(j)));
                e = d;
                d = c;
                c = rol(b, 30);
                b = a;
                a = t;
            }

            a = safe_add(a, olda);
            b = safe_add(b, oldb);
            c = safe_add(c, oldc);
            d = safe_add(d, oldd);
            e = safe_add(e, olde);
        }
        return Array(a, b, c, d, e);

    }
    function sha1_ft(t, b, c, d) {
        if (t < 20) return (b & c) | ((~b) & d);
        if (t < 40) return b ^ c ^ d;
        if (t < 60) return (b & c) | (b & d) | (c & d);
        return b ^ c ^ d;
    }
    function sha1_kt(t) {
        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 :
         (t < 60) ? -1894007588 : -899497514;
    }
    function core_hmac_sha1(key, data) {
        var bkey = str2binb(key);
        if (bkey.length > 16) bkey = core_sha1(bkey, key.length * chrsz);

        var ipad = Array(16), opad = Array(16);
        for (var i = 0; i < 16; i++) {
            ipad[i] = bkey[i] ^ 0x36363636;
            opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }

        var hash = core_sha1(ipad.concat(str2binb(data)), 512 + data.length * chrsz);
        return core_sha1(opad.concat(hash), 512 + 160);
    }
    function safe_add(x, y) {
        var lsw = (x & 0xFFFF) + (y & 0xFFFF);
        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xFFFF);
    }
    function rol(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }
    function str2binb(str) {
        var bin = Array();
        var mask = (1 << chrsz) - 1;
        for (var i = 0; i < str.length * chrsz; i += chrsz)
            bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (32 - chrsz - i % 32);
        return bin;
    }
    function binb2hex(binarray) {
        var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
        var str = "";
        for (var i = 0; i < binarray.length * 4; i++) {
            str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) +
           hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
        }
        return str;
    }

    /*
    Method: varDump
    print a native Date object to string.
	
    Arguments:
    [object data,addwhitespace,safety,level].
	
    Returns:
    String or Html
	
    Example:
    >var aa="sddd";
    >var bb={a:1,b:34.5,df:aa};
    >var cc={x:bb,aa:1};
    >alert(Utils.varDump(cc,"html",5));

    */
    this.dump = function (object, cat, src) {
        if (TUI.Utils.isUndefined(cat))
            cat = "info";
        if (TUI.Utils.isUndefined(src))
            src = window.location.pathname;
        //
        var tc = new Date();
        if (TUI.env.log.length > 1024) {
            TUI.env.log.shift();
        }
        //
        var st = typeof showTypes == 'undefined' ? true : showTypes;
        var dumpHtml = (/string|number|undefined|boolean/.test(typeof (object)) || object == null) ? object : recurse(object, typeof object);
        //
        TUI.env.log.push({ msg: dumpHtml, cat: cat, src: tc.Format("hh:mm:ss.S") + " " + cat + " [" + src + "]", type: "html" });
        //
        function recurse(o, type) {
            var i;
            var j = 0;
            var r = '';
            type = _dumpType(o);
            switch (type) {
                case 'regexp':
                    var t = type;
                    r += '<table' + _dumpStyles(t, 'table') + '><tr><th colspan="2"' + _dumpStyles(t, 'th') + '>' + t + '</th></tr>';
                    r += '<tr><td colspan="2"' + _dumpStyles(t, 'td-value') + '><table' + _dumpStyles('arguments', 'table') + '><tr><td' + _dumpStyles('arguments', 'td-key') + '><i>RegExp: </i></td><td' + _dumpStyles(type, 'td-value') + '>' + o + '</td></tr></table>';
                    j++;
                    break;
                case 'date':
                    var t = type;
                    r += '<table' + _dumpStyles(t, 'table') + '><tr><th colspan="2"' + _dumpStyles(t, 'th') + '>' + t + '</th></tr>';
                    r += '<tr><td colspan="2"' + _dumpStyles(t, 'td-value') + '><table' + _dumpStyles('arguments', 'table') + '><tr><td' + _dumpStyles('arguments', 'td-key') + '><i>Date: </i></td><td' + _dumpStyles(type, 'td-value') + '>' + o + '</td></tr></table>';
                    j++;
                    break;
                case 'function':
                    var t = type;
                    var a = o.toString().match(/^.*function.*?\((.*?)\)/im);
                    var args = (a == null || typeof a[1] == 'undefined' || a[1] == '') ? 'none' : a[1];
                    r += '<table' + _dumpStyles(t, 'table') + '><tr><th colspan="2"' + _dumpStyles(t, 'th') + '>' + t + '</th></tr>';
                    r += '<tr><td colspan="2"' + _dumpStyles(t, 'td-value') + '><table' + _dumpStyles('arguments', 'table') + '><tr><td' + _dumpStyles('arguments', 'td-key') + '><i>Arguments: </i></td><td' + _dumpStyles(type, 'td-value') + '>' + args + '</td></tr><tr><td' + _dumpStyles('arguments', 'td-key') + '><i>Function: </i></td><td' + _dumpStyles(type, 'td-value') + '>' + o + '</td></tr></table>';
                    j++;
                    break;
                case 'domelement':
                    var t = type;
                    r += '<table' + _dumpStyles(t, 'table') + '><tr><th colspan="2"' + _dumpStyles(t, 'th') + '>' + t + '</th></tr>';
                    r += '<tr><td' + _dumpStyles(t, 'td-key') + '><i>Node Name: </i></td><td' + _dumpStyles(type, 'td-value') + '>' + o.nodeName.toLowerCase() + '</td></tr>';
                    r += '<tr><td' + _dumpStyles(t, 'td-key') + '><i>Node Type: </i></td><td' + _dumpStyles(type, 'td-value') + '>' + o.nodeType + '</td></tr>';
                    r += '<tr><td' + _dumpStyles(t, 'td-key') + '><i>Node Value: </i></td><td' + _dumpStyles(type, 'td-value') + '>' + o.nodeValue + '</td></tr>';
                    r += '<tr><td' + _dumpStyles(t, 'td-key') + '><i>innerHTML: </i></td><td' + _dumpStyles(type, 'td-value') + '>' + o.innerHTML + '</td></tr>';
                    j++;
                    break;
            }
            if (/object|array/.test(type)) {
                for (i in o) {
                    var t = _dumpType(o[i]);
                    if (j < 1) {
                        r += '<table' + _dumpStyles(type, 'table') + '><tr><th colspan="2"' + _dumpStyles(type, 'th') + '>' + type + '</th></tr>';
                        j++;
                    }
                    if (typeof o[i] == 'object' && o[i] != null) {
                        r += '<tr><td' + _dumpStyles(type, 'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type, 'td-value') + '>' + recurse(o[i], t) + '</td></tr>';
                    } else if (typeof o[i] == 'function') {
                        r += '<tr><td' + _dumpStyles(type, 'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type, 'td-value') + '>' + recurse(o[i], t) + '</td></tr>';
                    } else {
                        r += '<tr><td' + _dumpStyles(type, 'td-key') + '>' + i + (st ? ' [' + t + ']' : '') + '</td><td' + _dumpStyles(type, 'td-value') + '>' + o[i] + '</td></tr>';
                    }
                }
            }
            if (j == 0) {
                r += '<table' + _dumpStyles(type, 'table') + '><tr><th colspan="2"' + _dumpStyles(type, 'th') + '>' + type + ' [empty]</th></tr>';
            }
            r += '</table>';
            return r;
        };

        function _dumpStyles(type, use) {
            var r = '';
            var table = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;cell-spacing:2px;';
            var th = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;text-align:left;color: white;padding: 5px;vertical-align :top;cursor:hand;cursor:pointer;';
            var td = 'font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;vertical-align:top;padding:3px;';
            var thScript = 'onClick="tTable(this);" title="click to collapse"';
            var tdScript = 'onClick="tRow(this);" title="click to collapse"';
            switch (type) {
                case 'string':
                case 'number':
                case 'boolean':
                case 'undefined':
                case 'object':
                    switch (use) {
                        case 'table':
                            r = ' style="' + table + 'background-color:#0000cc;"';
                            break;
                        case 'th':
                            r = ' style="' + th + 'background-color:#4444cc;"' + thScript;
                            break;
                        case 'td-key':
                            r = ' style="' + td + 'background-color:#ccddff;cursor:hand;cursor:pointer;"' + tdScript;
                            break;
                        case 'td-value':
                            r = ' style="' + td + 'background-color:#fff;"';
                            break;
                    }
                    break;
                case 'array':
                    switch (use) {
                        case 'table':
                            r = ' style="' + table + 'background-color:#006600;"';
                            break;
                        case 'th':
                            r = ' style="' + th + 'background-color:#009900;"' + thScript;
                            break;
                        case 'td-key':
                            r = ' style="' + td + 'background-color:#ccffcc;cursor:hand;cursor:pointer;"' + tdScript;
                            break;
                        case 'td-value':
                            r = ' style="' + td + 'background-color:#fff;"';
                            break;
                    }
                    break;
                case 'function':
                    switch (use) {
                        case 'table':
                            r = ' style="' + table + 'background-color:#aa4400;"';
                            break;
                        case 'th':
                            r = ' style="' + th + 'background-color:#cc6600;"' + thScript;
                            break;
                        case 'td-key':
                            r = ' style="' + td + 'background-color:#fff;cursor:hand;cursor:pointer;"' + tdScript;
                            break;
                        case 'td-value':
                            r = ' style="' + td + 'background-color:#fff;"';
                            break;
                    }
                    break;
                case 'arguments':
                    switch (use) {
                        case 'table':
                            r = ' style="' + table + 'background-color:#dddddd;cell-spacing:3;"';
                            break;
                        case 'td-key':
                            r = ' style="' + th + 'background-color:#eeeeee;color:#000000;cursor:hand;cursor:pointer;"' + tdScript;
                            break;
                    }
                    break;
                case 'regexp':
                    switch (use) {
                        case 'table':
                            r = ' style="' + table + 'background-color:#CC0000;cell-spacing:3;"';
                            break;
                        case 'th':
                            r = ' style="' + th + 'background-color:#FF0000;"' + thScript;
                            break;
                        case 'td-key':
                            r = ' style="' + th + 'background-color:#FF5757;color:#000000;cursor:hand;cursor:pointer;"' + tdScript;
                            break;
                        case 'td-value':
                            r = ' style="' + td + 'background-color:#fff;"';
                            break;
                    }
                    break;
                case 'date':
                    switch (use) {
                        case 'table':
                            r = ' style="' + table + 'background-color:#663399;cell-spacing:3;"';
                            break;
                        case 'th':
                            r = ' style="' + th + 'background-color:#9966CC;"' + thScript;
                            break;
                        case 'td-key':
                            r = ' style="' + th + 'background-color:#B266FF;color:#000000;cursor:hand;cursor:pointer;"' + tdScript;
                            break;
                        case 'td-value':
                            r = ' style="' + td + 'background-color:#fff;"';
                            break;
                    }
                    break;
                case 'domelement':
                    switch (use) {
                        case 'table':
                            r = ' style="' + table + 'background-color:#FFCC33;cell-spacing:3;"';
                            break;
                        case 'th':
                            r = ' style="' + th + 'background-color:#FFD966;"' + thScript;
                            break;
                        case 'td-key':
                            r = ' style="' + th + 'background-color:#FFF2CC;color:#000000;cursor:hand;cursor:pointer;"' + tdScript;
                            break;
                        case 'td-value':
                            r = ' style="' + td + 'background-color:#fff;"';
                            break;
                    }
                    break;
            }
            return r;
        };
        function _dumpType(obj) {
            var t = typeof (obj);
            if (t == 'function') {
                var f = obj.toString();
                if ((/^\/.*\/[gi]??[gi]??$/).test(f)) {
                    return 'regexp';
                } else if ((/^\[object.*\]$/i).test(f)) {
                    t = 'object'
                }
            }
            if (t != 'object') {
                return t;
            }
            switch (obj) {
                case null:
                    return 'null';
                case window:
                    return 'window';
                case document:
                    return document;
                case window.event:
                    return 'event';
            }
            if (window.event && (event.type == obj.type)) {
                return 'event';
            }
            var c = obj.constructor;
            if (c != null) {
                switch (c) {
                    case Array:
                        t = 'array';
                        break;
                    case Date:
                        return 'date';
                    case RegExp:
                        return 'regexp';
                    case Object:
                        t = 'object';
                        break;
                    case ReferenceError:
                        return 'error';
                    default:
                        var sc = c.toString();
                        var m = sc.match(/\s*function (.*)\(/);
                        if (m != null) {
                            return 'object';
                        }
                }
            }
            var nt = obj.nodeType;
            if (nt != null) {
                switch (nt) {
                    case 1:
                        if (obj.item == null) {
                            return 'domelement';
                        }
                        break;
                    case 3:
                        return 'string';
                }
            }
            if (obj.toString != null) {
                var ex = obj.toString();
                var am = ex.match(/^\[object (.*)\]$/i);
                if (am != null) {
                    var am = am[1];
                    switch (am.toLowerCase()) {
                        case 'event':
                            return 'event';
                        case 'nodelist':
                        case 'htmlcollection':
                        case 'elementarray':
                            return 'array';
                        case 'htmldocument':
                            return 'htmldocument';
                    }
                }
            }
            return t;
        };
    };
};

/*************************************************************************
*
*			SVG处理的方法
*
**************************************************************************/
TUI.SVG = function (container, config) {
	var svgEle=null;
	var svgMap=null;
	var svgDoc=null;
	var svgRoot=null;
	var svgData=null;
	var centerPoint=null;
	var bZoomDragFlag = 0;
	var bDragFlag = 0;
	//
    return {
        init: function (fn) {
            this.container = container;
            this.config = config ? config : {};
			//初始化容器
            $('#' + this.container).html('<embed id="'+this.config.tag+'"  src="' 
									+this.config.url+'" style="width:100%; height:100%;"  wmode="transparent" type="image/svg+xml"></embed>'
									+'<div class="svg-tipinfo"></div><div class="map-control" style="top:10px!important;left:10px!important;">'
									+'		<div class="map-arrow">'
									+'			<a class="left" title="向左平移" href="#left" onclick="return false;">Left</a>'
									+'			<a class="right" title="向右平移" href="#right" onclick="return false;">Right</a>'
									+'			<a class="center" title="居中" href="#center" onclick="return false;">Center</a>'
									+'			<a class="up" title="向上平移" href="#up" onclick="return false;">Up</a>'
									+'			<a class="down" title="向下平移" href="#down" onclick="return false;">Down</a>'
									+'		</div>'
									+'		<div class="map-scale">'
									+'			<a class="zoom" title="放大" href="#zoom" onclick="return false;">Zoom</a>'
									+'			<a class="back" title="缩小" href="#zoom_out" onclick="return false;">Back</a>'
									+'		</div>'
									+'		<div class="map-area">'
									+'		<div class="map-drop"></div>'
									+'	</div>'
									+'</div>');
			//
			svgData = this.config.data;
			//
			$(this).everyTime(1000, "svgmap", function () {
                this.loadSvg(fn);
            });
			//
			$(".map-control").find(".zoom").bind(TUI.env.ua.clickEventUp, function () { 
				var dragPosition = 90 - svgMap.getZoom() * 9;
				if (dragPosition <= 10) {
					$(".map-drop").css({ 'top': '0px' });
					return;
				}
				//
				svgMap.zoomIn();
				//
				$(".map-drop").css({ 'top': dragPosition + 'px' });
			});
			
			$(".map-control").find(".back").bind(TUI.env.ua.clickEventUp, function () {
				var dragPosition = 90 - svgMap.getZoom() * 9;
				if (dragPosition >= 80) {
					svgMap.setZoom(1);
					$(".map-drop").css({ 'top': '90px' });
					return;
				}
				//
				svgMap.zoomOut();
				//
				if (dragPosition < 0) {
					dragPosition = 0;
				}
				$(".map-drop").css({ 'top': dragPosition + 'px' });
			});
			//
			$(".map-control").find(".left").bind(TUI.env.ua.clickEventUp, function () {
				svgMap.panDirection(-0.6, 0);
			});
			//
			$(".map-control").find(".right").bind(TUI.env.ua.clickEventUp, function () {
				svgMap.panDirection(0.6, 0);
			});
			//
			$(".map-control").find(".up").bind(TUI.env.ua.clickEventUp, function () {
				svgMap.panDirection(0, -0.6);
			});
			//
			$(".map-control").find(".down").bind(TUI.env.ua.clickEventUp, function () {
				svgMap.panDirection(0, 0.6);
			});
			//
			$(".map-control").find(".center").bind(TUI.env.ua.clickEventUp, function () {
				svgMap.setCenter(centerPoint);
			});
			//
			$(".map-area").bind(TUI.env.ua.clickEventDown, function (event) {
				bZoomDragFlag = 1;
			});
			//
			$(".map-area").bind(TUI.env.ua.clickEventMove, function (event) {
				if (bZoomDragFlag == 1) {
					var offY = event.clientY - 95;
					if (offY > 90)
						offY = 90;
					$(".map-drop").css({ 'top': offY + 'px' });
					//
					svgMap.setZoom(1 + (90 - offY) / 9);
				}
			});
		},
		loadSvg:function(fn){
			svgEle = document.getElementById(this.config.tag);
			svgDoc = svgEle.getSVGDocument();
			//
			if(svgDoc==null)
			{
				return;
			} 
			else
			{
				$(this).stop(true).stopTime("svgmap");
			}
			//
			svgRoot = svgDoc.rootElement;
			svgMap = new SVGMap(svgEle);
			centerPoint=svgMap.getCenter();
			//
			svgDoc.addEventListener(TUI.env.ua.clickEventDown, function (event) {
											bDragFlag = 1;
											var e = event || window.event;
											if (navigator.msMaxTouchPoints>1 || window.navigator.maxTouchPoints>1) {
												//e = event.originalEvent;
											}
											else
											{
												if (TUI.env.ua.ontouch) {
													event.preventDefault();
													e = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
												}
											}
											//
											startlat = e.clientX;
											startlon = e.clientY;
											svgRoot.setAttribute("style", "cursor:move");
										}, false);
			//
			svgDoc.addEventListener(TUI.env.ua.clickEventMove, function (event) {
				if (bDragFlag == 1) {
					var w = $(window).width();
					var h = $(window).height();
					//
					var e = event || window.event;
					if (navigator.msMaxTouchPoints>1 || window.navigator.maxTouchPoints>1) {
						//e = event.originalEvent;
					}
					else
					{
						if (TUI.env.ua.ontouch) {
							event.preventDefault();
							e = event.originalEvent.touches[0] || event.originalEvent.changedTouches[0];
						}
					}
					//
					var movelat = (e.clientX - startlat) / w;
					var movelon = (e.clientY - startlon) / h;
					//
					if (Math.abs(movelat) < 0.02 && Math.abs(movelon) < 0.02)
						return;
					//
					svgMap.panDirection(movelat, movelon);
					startlat = e.clientX;
					startlon = e.clientY;
				}
			}, false);
			//
			svgDoc.addEventListener(TUI.env.ua.clickEventUp, function (event) {
					bDragFlag = 0;
					bZoomDragFlag = 0;
					svgRoot.setAttribute("style", "cursor:default");
				}, false);
			//
			svgDoc.addEventListener("mousewheel", function (event) {
				if (event.wheelDelta > 0) {
					$(".map-control").find(".zoom").trigger(TUI.env.ua.clickEventUp);
				}
				else if (event.wheelDelta < 0) {
					$(".map-control").find(".back").trigger(TUI.env.ua.clickEventUp);
				}
			}, false);
			//
			if (typeof fn == "function")
				fn(svgData,svgDoc,this);
		},
		setLable:function(id,text){
			var obj = svgDoc.getElementById(id);
			if(obj!=null && obj.firstChild!=null)
				obj.firstChild.data = text;
		},
		setTip:function(config){
			var obj = svgDoc.getElementById(config.tag);
			if(obj!=null)
			{
				$(obj).unbind("mouseover");
				$(obj).unbind("mousemove");
				$(obj).unbind("mouseout");
				//
				$(obj).bind("mouseover",{ handle:this,node: config}, function (event) {
					$(".svg-tipinfo").html('<div class="tip" style="width:'+event.data.node.width+'px;left:'+(5-event.data.node.width/2)+'px"><span class="content">'+event.data.node.html+'</span></div><span class="pointer"></span>');
				});
				//
				$(obj).bind("mousemove",{ handle:this,node: config}, function (event) {
					//
					var e = event || window.event;
					if (navigator.msMaxTouchPoints>1 || window.navigator.maxTouchPoints>1) {
						//e = event.originalEvent;
					}
					//
					$(".svg-tipinfo").css({'display':'block','top': (e.clientY+14)+'px','left':(e.clientX+16)+'px' });
				});
				//
				$(obj).bind("mouseout",{ handle:this,node: config}, function (e) {
					$(".svg-tipinfo").css({'display':'none'});
				});
			}
		},
        show: function (speed) {
            $('#' + this.container).fadeIn(speed);
        },

        hide: function (speed) {
            $('#' + this.container).fadeOut(speed);
        },

        clear: function () {
            $('#' + this.container).empty();
        }
	}
};

/*************************************************************************
*
*			Map处理的方法
*
**************************************************************************/
TUI.Map = function (container, config) {
    var mapConfig = config ? config : {};
	if(mapConfig.server==undefined)
		mapConfig.server="";
	var mapPoint = { status: "click", data: [] };
	var sceneConfig = {};
	var sceneOption = null;
	var sceneFn = function () { };
	var sceneHandle;
	var scenePath;
    //
    return {
        init: function (fn) {
            this.container = container;
            //初始化容器
            $('#' + this.container).html('<div class="viewport"></div>'
                + '<div class="map-tipinfo"></div>'
				+ '	<div class="map-control">'
                + '		<div class="map-arrow">'
				+'			<a href="#left" onclick="return false;" class="left" title="向左平移">Left</a>'
                + '			<a href="#right" onclick="return false;" class="right" title="向右平移">Right</a>'
                + '			<a href="#center" onclick="return false;" class="center" title="居中">Center</a>'
                + '			<a href="#up" onclick="return false;" class="up" title="向上平移">Up</a>'
                + '			<a href="#down" onclick="return false;" class="down" title="向下平移">Down</a>'
				+'		</div>'
                + '		<div class="map-scale">'
				+'			<a href="#zoom" onclick="return false;" class="zoom" title="放大">Zoom</a>'
                + '			<a href="#zoom_out" onclick="return false;" class="back" title="缩小">Back</a>'
				+'		</div>'
                + '		<div class="map-area">'
				+'			<div class="map-drop"></div>'
				+'		</div>'
				+'</div>'
                + '<div class="searchbox"><input type="text" name="searchKey" id="searchKey" placeholder="查询..." required><div class="result"></div><span class="pointer"></span></div>'
                + '<div class="map-operate">'
				+ '		<div class="icon map-click active"><span class="center">点选</span></div>'
                + '		<div class="icon map-pin"><span class="center">标注</span></div>'
                + '		<div class="icon map-select"><span class="center">框选</span></div>'
                + '		<div class="icon map-search"><span class="center">查询</span></div>'
                + '</div>'
				+ '<div id="map-webvr" class="map-webvr"></div>');

            var viewport = $('#' + this.container).find(".viewport");
            //加载地图数据
            $.ajax({
                type: 'get',
                url: mapConfig.server + "/api/map/" + mapConfig.tag,
                dataType: "jsonp",
				context:this,
                error: function (result) {
                    alert("加载地图配置参数失败！");
                },
                success: function (result) {
                    mapConfig.layerList = [];
                    if (result.layerSplit > 0) {
                        mapConfig.layerList[0] = result.layerList[0];
                        if (0 == (mapConfig.initZoom - 1)) {
                            mapConfig.initWidth = result.layerList[0].width;
                            mapConfig.initHeight = result.layerList[0].height;
                        }
                        //
                        viewport.append('<div id="layer0" style="background: url(' + mapConfig.server + '/api/map/' + mapConfig.tag + '/' + result.mapid + '/0/0) no-repeat;width: '
                                    + result.layerList[0].width + 'px; height: ' + result.layerList[0].height + 'px;"></div>');
                    }
                    //
                    for (i = 1; i < result.layerSplit; i++) {
                        var scaleX = 100 / 3 / i;
                        var scaleY = 100 / 2 / i;
                        var layerImg = "";
                        //
                        for (j = 0; j < (i * 2); j++) {
                            for (k = 0; k < (i * 3); k++) {
                                layerImg = layerImg + '<div style="float:left;width:' + scaleX + '%;height:' + scaleY
                                         + '%"><img alt="' + mapConfig.server + '/api/map/' + mapConfig.tag + '/' + result.mapid + '/' + i + '/'
                                         + (j * (i * 3) + k) + '" style="width:100%;height:100%;"/></div>';
                            }
                        }
                        //
                        mapConfig.layerList[i] = result.layerList[i];
                        if (i == (mapConfig.initZoom - 1)) {
                            mapConfig.initWidth = result.layerList[i].width;
                            mapConfig.initHeight = result.layerList[i].height;
                        }
                        //
                        viewport.append('<div style="width:' + result.layerList[i].width + 'px; height: ' + result.layerList[i].height + 'px;">'
                                    + layerImg + '<div id="layer' + i + '" class="mapcontent"></div></div>');
                    }
                    //
                    viewport.mapbox({
                        mousewheel: true,
						mapconfig:mapConfig,
                        defaultLayer: (mapConfig.initZoom - 1),
                        layerSplit: result.layerSplit,
                        callAfter: function (layer, xcoord, ycoord, viewport) {
                            if (mapPoint.status == "pin" && typeof mapConfig.pin == "function") {
                                var mapZoom = ($(layer).width() / mapConfig.initWidth) * mapConfig.initZoom;
                                var mapX = (xcoord - 16) / mapZoom;
                                var mapY = (ycoord - 32) / mapZoom;
                                mapConfig.pin(mapConfig, mapX, mapY, mapZoom);
                            }
                            else if (mapPoint.status == "search") {
                                $(".map-operate").find(".map-click").trigger(TUI.env.ua.clickEventUp);
                            }
                        },
                        afterSelect: function (layer, x1, y1, x2, y2) {
                            if (mapPoint.status == "select" && typeof mapConfig.select == "function") {
                                var ponitList = [];
                                var mapContent = $(layer).find(".mapcontent").find(".map-point");
                                for (i = 0; i < mapContent.length; i++) {
                                    var top = parseInt($(mapContent[i]).css('top'));
                                    var left = parseInt($(mapContent[i]).css('left'));

                                    if ((top > y1 && top < y2) && (left > x1 && left < x2)) {
                                        ponitList[mapPoint.data[mapContent[i].id].tag] = mapContent[i];
                                    }
                                }
                                mapConfig.select(ponitList);
                            }
                        },
                        afterZoom: function (layer, xcoord, ycoord, viewport) {
                            var scaleX = $(layer).width() / layer.defaultWidth;
                            var scaleY = $(layer).height() / layer.defaultHeight;
                            var mapContent = $(layer).find(".mapcontent").find(".map-point");
                            for (i = 0; i < mapContent.length; i++) {
                                var mapX = Math.round(mapPoint.data[mapContent[i].id].left * scaleX + 16 * (scaleX - 1));
                                var mapY = Math.round(mapPoint.data[mapContent[i].id].top * scaleY + 32 * (scaleY - 1));
                                $(mapContent[i]).css({
                                    left: mapX + "px",
                                    top: mapY + "px"
                                });
                            }
                            //延迟加载图片
                            var mapImg = $(layer).find("img");
                            for (i = 0; i < mapImg.length; i = i + 4) {
                                if (mapImg[i].src == "")
                                    mapImg[i].src = mapImg[i].alt;
                            }

                            for (i = 1; i < mapImg.length; i = i + 4) {
                                if (mapImg[i].src == "")
                                    mapImg[i].src = mapImg[i].alt;
                            }

                            for (i = 2; i < mapImg.length; i = i + 4) {
                                if (mapImg[i].src == "")
                                    mapImg[i].src = mapImg[i].alt;
                            }

                            for (i = 3; i < mapImg.length; i = i + 4) {
                                if (mapImg[i].src == "")
                                    mapImg[i].src = mapImg[i].alt;
                            }
                            //
                            if (mapPoint.status == "search")
                                $('#searchKey').trigger("change");
                        }
                    });
                    //
                    if (typeof fn == "function")
                        fn(result,this);
                }
            });
            //
            $(window).resize({ handle: this }, function (e) {
                $('#' + e.data.handle.container).find(".map-control .center").trigger(TUI.env.ua.clickEventDown);
            });
			//
			if(mapConfig.showTool==false)
			{
				 $('#' + this.container).find(".map-operate").hide();
			}
            //绑定事件
            $('#' + this.container).find(".map-operate div").bind(TUI.env.ua.clickEventUp, { handle: this }, function (e) {
                if (this.className == "icon map-setup") {
                    if (typeof mapConfig.setup == "function")
                        mapConfig.setup(mapConfig);
                }
                else if (this.className == "icon map-search") {
                    mapPoint.status = "search";
                    $('#' + e.data.handle.container).find(".map-operate div").removeClass("active");
                    $(this).addClass("active");
                    viewport.mapbox("setSearch");
                    //
                    $('#' + e.data.handle.container).find(".searchbox").find(".result").empty();
                    $('#searchKey').val("");
                    $('#' + e.data.handle.container).find(".searchbox").slideDown("fast");
                }
                else if (this.className == "icon map-click") {
                    if (mapPoint.status == "search")
                        $('#' + e.data.handle.container).find(".searchbox").fadeOut("fast");
                    //
                    mapPoint.status = "click";
                    $('#' + e.data.handle.container).find(".map-operate div").removeClass("active");
                    $(this).addClass("active");
                    viewport.mapbox("setClick");
                }
                else if (this.className == "icon map-select") {
                    if (mapPoint.status == "search")
                        $('#' + e.data.handle.container).find(".searchbox").fadeOut("fast");
                    //
                    mapPoint.status = "select";
                    $('#' + e.data.handle.container).find(".map-operate div").removeClass("active");
                    $(this).addClass("active");
                    viewport.mapbox("setSelect");
                }
                else if (this.className == "icon map-pin") {
                    if (mapPoint.status == "search")
                        $('#' + e.data.handle.container).find(".searchbox").fadeOut("fast");
                    //
                    mapPoint.status = "pin";
                    $('#' + e.data.handle.container).find(".map-operate div").removeClass("active");
                    $(this).addClass("active");
                    viewport.mapbox("setPin");
                }
                return false;
            });
            //
            $('#searchKey').keyup({ handle: this }, function (e) {
				var result = $('#' + e.data.handle.container).find(".searchbox").find(".result");
                result.empty();

                if ($('#searchKey').val() == "")
                {
					return;
				}

                var layer = $('#' + e.data.handle.container).find(".current-map-layer");
                var scaleX = layer.width() / layer[0].defaultWidth;
                //
                var mapContent = layer.find(".mapcontent").find(".map-point");
				var bFindPoint=false;
                for (i = 0; i < mapContent.length; i++) {
                    var id = mapContent[i].id;
                    if (mapPoint.data[id] != null
                        && mapPoint.data[id].name.indexOf($('#searchKey').val()) >= 0) {
                        var item = $('<div class="item">' + mapPoint.data[id].name + '<span class="button">GO<span></div>');
                        item.find(".button").bind(TUI.env.ua.clickEventDown, { handle:e.data.handle,tag:mapPoint.data[id].tag,top: mapPoint.data[id].top * scaleX, left: mapPoint.data[id].left * scaleX }, function (e) {
                            viewport.mapbox("center", { x: e.data.left, y: e.data.top });
							//
							e.data.handle.closeAllPoint();
							//
							e.data.handle.activePoint(e.data.tag);
                            return false;
                        });
                        result.append(item);
						bFindPoint=true;
                    }
                }
				//
				if(!bFindPoint)
				{
					var item = $('<div class="item">本图层没有发现查询点！</div>');
					result.append(item);
				}
            });
        },
        show: function (speed) {
            $('#' + this.container).fadeIn(speed);
        },

        hide: function (speed) {
            $('#' + this.container).fadeOut(speed);
        },
        clear: function () {
            $('#' + this.container).empty();
        },
        loadScene: function (path, option, fn) {
            sceneOption = option;
            sceneFn = fn;
            sceneHandle = this;
            scenePath = path;
			TUI.Map.sceneHandle = this;
            //
            $.ajax({
                type: 'get',
                url: mapConfig.server + "/API/Map/VR/" + path,
                dataType: "jsonp",
                context: this,
                error: function (result) {
                    alert("加载场景配置参数失败！");
                },
                success: function (result) {
                    if (!result.flag) {
                        alert("加载场景配置参数失败，"+result.info);
                        return;
                    }
                    //
                    if (sceneOption.rotate != undefined) {
                        result.data.longitude = sceneOption.rotate.longitude;
                        result.data.latitude = sceneOption.rotate.latitude;
                    }
                    //
                    for (var i = 0; i < result.data.markers.length; i++) {
                        if (result.data.markers[i].image != undefined && result.data.markers[i].image != "")
                            result.data.markers[i].image = mapConfig.server + '/API/Map/VR/' + result.data.markers[i].image;
                    }
                    //
                    sceneConfig = result;
					var panoramaUrl=result.data.panorama;
					if(TUI.Utils.isString(result.data.panorama))
					{
						panoramaUrl=mapConfig.server + result.data.panorama;
					}
					else if(TUI.Utils.isArray(result.data.panorama))
					{
						panoramaUrl=[];
						for(var i=0;i<result.data.panorama.length;i++)
							panoramaUrl[i]=mapConfig.server + result.data.panorama[i];
					}
					//
                    $('#map-webvr').show();
                    if (this.PSV != undefined) {
                        if(this.PSV.cubeload==TUI.Utils.isArray(panoramaUrl))
                        {
							this.PSV.clearMarkers();
							this.PSV.firstload = false;
							//
							if (result.data.rotate != undefined) {
								this.PSV.setPanorama(panoramaUrl, result.data.rotate, true);
							}
							else {
								this.PSV.setPanorama(panoramaUrl, {
									longitude: result.data.longitude,
									latitude: result.data.latitude
								}, true);
							}
							this.PSV.setCaption(result.data.caption);
							return;
						}
						else
						{
							this.PSV.clearMarkers();
							this.PSV.destroy();
							this.PSV=undefined;
						}
                    }
                    //
                    this.PSV = new PhotoSphereViewer({
                        panorama: panoramaUrl,
                        container: 'map-webvr',
                        loading_img: mapConfig.server + '/API/Map/VR/photosphere-logo.gif',
                        default_long: result.data.longitude,
                        default_lat: result.data.latitude,
						move_speed: 1.8,
                        time_anim: false,
                        anim_speed: '-2rpm',
                        caption: result.data.caption,
                        default_fov: 80,
                        mousewheel: true,
                        gyroscope: true,
                        webgl: true,
                        fisheye: false,
                        usexmpdata: false,
                        click_event_on_marker: true,
                        lang: {
                            autorotate: '自动旋转',
                            zoom: '缩放',
                            zoomOut: '放大',
                            zoomIn: '缩小',
                            download: '导出',
                            markers: 'AR标记',
                            gyroscope: '陀螺仪'
                        },
                        navbar: [
                            'autorotate',
							'zoom',
							'markers',
                            {
                                title: '位置标注',
                                className: 'custom-button',
                                content: '<i class="fa fa-crosshairs" style="line-height: 20px;font-size:16pt;"></i>',
                                onClick: function () {
                                    if (!this.bMarkers) {
                                        this.bMarkers = true;
                                        this.MarkersPath = [];
                                        $('#map-webvr .psv-hud').css("cursor", "crosshair");
                                    }
                                    else {
                                        $('#map-webvr .psv-hud').css("cursor", "move");
                                        this.bMarkers = false;
                                        this.MarkersPath = [];
                                        this.gotoMarker(this.newMarker);
                                    }
                                }
                            },
                            'caption',
                            'spacer-1',
                            'gyroscope',
                            {
                                title: '选择巡航路径',
                                className: 'custom-button',
                                content: '<i class="fa fa-location-arrow" style="line-height: 20px;font-size:14pt;"></i>',
                                onClick: function () {
									 $.ajax({
												type: 'get',
												url: mapConfig.server + "/API/Map/VR/" + mapConfig.tag,
												dataType: "jsonp",
												context: this,
												error: function (result) {
													alert("加载场景配置参数失败！");
												},
												success: function (result) {
													var localHtml="";
													for(var i=0;i<result.data.length;i++)
													{
														localHtml+=('<option value="'+mapConfig.tag+'/'+result.data[i].tag+'" style="color:#888;">'+result.data[i].caption+'</option>');
													}
													//
													this.navFlag=false;
													window.clearInterval(this.navTime);
													this.showPanel('<h3 style="margin: 0 0 10px 0;text-align: center;">选择巡航路径</h3>'
															+'<table width="100%" cellPadding="5px" border="0px" style="font-size:10.5pt;">'
															+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-map-marker"></i>&nbsp;出发：</td><td style="text-align: center;line-height: 24px;">'
															+'<select id="navFrom" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
															+'	<option value="" style="color:#888;">我的位置</option>'+localHtml
															+'</select></td></tr>'
															+'<tr id="fromtr" style="display: none;"><td width="80px" style="line-height: 24px;"><i class="fa fa-minus" id="hideFromtr"></i>&nbsp;途经：</td><td style="text-align: center;line-height: 24px;">'
															+'<select id="navFromto" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
															+'	<option value="" style="color:#888;">我的位置</option>'+localHtml
															+'</select></td></tr>'
															+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-plus" id="showFromtr"></i>&nbsp;到达：</td><td style="text-align: center;line-height: 24px;">'
															+'<select id="navTo" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
															+localHtml
															+'</select></td></tr>'
															+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-clock-o"></i>&nbsp;停留：</td><td style="text-align: center;line-height: 24px;">'
															+'<select id="navTime" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
															+'	<option value="3" style="color:#888;">3秒</option>'
															+'	<option value="5" style="color:#888;">5秒</option>'
															+'	<option value="10" style="color:#888;">10秒</option>'
															+'	<option value="15" style="color:#888;">15秒</option>'
															+'	<option value="30" style="color:#888;">30秒</option>'
															+'	<option value="60" style="color:#888;">60秒</option>'
															+'	<option value="300" style="color:#888;">5分钟</option>'
															+'	<option value="600" style="color:#888;">10分钟</option>'
															+'	<option value="900" style="color:#888;">15分钟</option>'
															+'	<option value="1800" style="color:#888;">30分钟</option>'
															+'	<option value="3600" style="color:#888;">60分钟</option>'
															+'</select></td></tr>'
															+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-retweet"></i>&nbsp;返航：</td><td style="text-align: center;line-height: 24px;">'
															+'<select id="navLoop" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
															+'	<option value="0" style="color:#888;">终点停止</option>'
															+'	<option value="1" style="color:#888;">原路返回</option>'
															+'	<option value="2" style="color:#888;">近路返回</option>'
															+'</select></td></tr>'
															+'</table><br><div id="MyNav" class="btn btn-block blue">开始巡航</div><div id="NavInfo"></div>');
													//
													$("#showFromtr").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
														$("#fromtr").show();
														return false;
													});
													//
													$("#hideFromtr").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
														$("#fromtr").hide();
														return false;
													});
													//
													$("#MyNav").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
														if(e.data.handle.navFlag)
														{
															e.data.handle.navList=[];
															e.data.handle.navFlag=false;
															window.clearInterval(e.data.handle.navTime);
															$("#MyNav").removeClass("red");
															$("#MyNav").addClass("blue");
															$("#MyNav").html("开始巡航");
															return false;
														}
														//
														var from=$("#navFrom").val();
														if(from=="")
															from=scenePath;
														var fromto=$("#navFromto").val();
														if(fromto=="")
															fromto=from;
														var to=$("#navTo").val();
														var loop=$("#navLoop").val();
														e.data.handle.time=parseInt($("#navTime").val());
														//
														 $.ajax({
																	type: 'POST',
																	url: mapConfig.server + "/API/Map/VR/" + mapConfig.tag,
																	data:{from:from,fromto:fromto,to:to,loop:loop},
																	dataType: "jsonp",
																	context: e.data.handle,
																	error: function (result) {
																		alert("加载场景配置参数失败！");
																	},
																	success: function (result) {
																		if(!result.flag)
																		{
																			alert("计算巡航路径失败！"+result.info);
																			return;
																		}
																		//
																		this.navFlag=true;
																		this.navList=result.data;
																		if(this.navList[0].from!=scenePath)
																		{
																			sceneHandle.loadScene(this.navList[0].from, sceneOption, sceneFn);
																		}
																		//
																		this.zoom(50);
																		this.navTime=window.setInterval(function(){
																			sceneHandle.navSceneAR();
																		},this.time*1000);
																		$("#MyNav").removeClass("blue");
																		$("#MyNav").addClass("red");
																		$("#MyNav").html("停止巡航");
																	}
														 });
														//
														return false;
													});
											}
									});
                                }
                            },
                            {
                                title: '关闭VR视窗',
                                className: 'custom-button',
                                content: '<i class="fa fa-times-circle-o" style="line-height: 20px;font-size:14pt;"></i>',
                                onClick: function () {
                                    sceneHandle.PSV.destroy();
                                    sceneHandle.PSV = undefined;
                                    $('#map-webvr').hide();
                                }
                            }
                        ],
                        markers: result.data.markers
                    });
                    //
                    this.PSV.firstload = true;
                    this.PSV.cubeload = TUI.Utils.isArray(panoramaUrl);
					//
                    this.PSV.on('click', function (e) {
                        $('.psv-spacer').html("<span style='line-height: 40px;color: #ccc;font-size: 10.5pt;'>" + TUI.Utils.formatNumber(e.longitude, "#0.0000")+','+ TUI.Utils.formatNumber(e.latitude, "#0.0000") + "</span>");
                        if (this.bMarkers) {
                            var markersPath = this.MarkersPath;
                            if (markersPath.length == 0) {
                                if (this.newMarker != undefined) {
                                    this.removeMarker({
                                        id: 'newMarker'
                                    }, false);
                                }
                                this.newMarker = this.addMarker({
                                    id: 'newMarker',
                                    circle: 3,
                                    longitude: e.longitude,
                                    latitude: e.latitude,
                                    svgStyle: {
                                        fill: 'rgba(200, 0, 0, 0.2)',
                                        stroke: 'rgba(200, 0, 50, 0.8)',
                                        'stroke-width': '2px'
                                    },
                                    tooltip: {
                                        content: '开始标注...',
                                        position: 'right bottom'
                                    },
                                    content: '人工物体AR标注：<textarea name="" rows="" cols="" style="width: 100%;height: 300px;margin: 10px 0;">' + TUI.JSON.encode([e.longitude, e.latitude]) + '</textarea>'
                                }, true);
                                markersPath[markersPath.length] = [e.longitude, e.latitude];
                                markersPath[markersPath.length] = [e.longitude, e.latitude];
                            }
                            else {
                                markersPath[markersPath.length] = [e.longitude, e.latitude];
                                if (this.newMarker != undefined) {
                                    this.removeMarker({
                                        id: 'newMarker'
                                    }, false);
                                }
                                this.newMarker = this.addMarker({
                                    id: 'newMarker',
                                    polygon_rad: markersPath,
                                    svgStyle: {
                                        fill: 'rgba(200, 0, 0, 0.2)',
                                        stroke: 'rgba(200, 0, 50, 0.8)',
                                        'stroke-width': '2px'
                                    },
                                    tooltip: {
                                        content: '人工AR标注',
                                        position: 'right bottom'
                                    },
                                    content: '人工物体AR标注：<textarea name="" rows="" cols="" style="width: 100%;height: 300px;margin: 10px 0;">' + TUI.JSON.encode(this.MarkersPath) + '</textarea>'
                                }, true);
                            }
                        }
                    });
                    //
                    this.PSV.on('select-marker', function (marker, dblclick) {
                        if (!this.bMarkers) {
                            if (marker.type == "polygon_rad") {
                                this.updateMarker({
                                    id: marker.id,
                                    svgStyle: {
                                        fill: 'rgba(255, 235, 59, 0.2)',
                                        stroke: 'rgba(255, 235, 59, 0.8)',
                                        'stroke-width': '2px'
                                    }
                                });
                            }
                            //
                            if (marker.data != undefined) {
                                if (marker.data.url != undefined && marker.data.url != "") {
                                    this.marker = marker;
                                    //
                                    if(marker.data.type=="iframe")
                                    {
										this.showPanel("<img id='frameloading' src='/Resources/images/waiting.gif' style='top: 50%;position: absolute;left: 50%;margin: -64px 0 0 -64px;'><iframe  onload='TUI.Map.sceneHandle.frameload(this)' id='framecontent' src='"+marker.data.url+"' marginwidth='0' marginheight='0' frameBorder='0' width='100%'  height='100%' style='overflow: auto;display: none;'></iframe>",true);
									}
									else
									{
										$.ajax({
											type: 'get',
											url: marker.data.url,
											dataType: "html",
											context: this,
											error: function (result) {
												this.showPanel((new Date()).Format("yyyy-MM-dd hh:mm:ss") + " 加载场景AR标记内容失败！<br>" + marker.data.url);
											},
											success: function (result) {
												this.showPanel(result);
												//
												if (typeof this.marker.data.fn == "function") {
													this.marker.option = sceneOption;
													this.marker.data.fn(this, this.marker,$(this.panel.content));
												}
											}
										});
									}
                                }
                                else if (marker.data.path != undefined && marker.data.path != "") {
                                    if (marker.data.rotate != undefined)
                                        sceneOption.rotate = marker.data.rotate;
                                    sceneHandle.loadScene(marker.data.path, sceneOption, sceneFn);
                                }
                            }
                        }
                    });
                    //
                    this.PSV.on('ready', function () {
                        if (!this.firstload) {
                            for (var i = 0; i < sceneConfig.data.markers.length; i++) {
                                this.addMarker(sceneConfig.data.markers[i],false);
								//
								/*if(sceneConfig.data.markers[i].data!=undefined 
									&& sceneConfig.data.markers[i].data.path!=undefined
									&& sceneConfig.data.markers[i].data.path!="")
								{
									this.preloadPanorama(mapConfig.server + '/API/Map/VR/' + sceneConfig.data.markers[i].data.path+"/360.jpg");
								}*/
                            }
							this.render();
                        }
                        //
                        if (typeof sceneFn == "function") {
                            sceneConfig.option = sceneOption;
                            sceneFn(this, sceneConfig);
                        }
                    });
                }
            });
        },
		frameload: function (e) {
			$("#frameloading").remove();
			$("#framecontent").show();
			if (typeof this.PSV.marker.data.fn == "function") {
				this.PSV.marker.option = sceneOption;
				this.PSV.marker.data.fn(this.PSV, this.PSV.marker,$(e.contentDocument));
			}
        },
		navSceneAR: function () {
			if(this.PSV.navList.length>0)
			{
				if(this.PSV.navFlag)
				{
					this.PSV.rotate({
									longitude: this.PSV.navList[0].longitude,
									latitude: 0
								  });
					this.PSV.zoom(55);
					setTimeout(function(){
						sceneHandle.PSV.zoom(60);
						setTimeout(function(){
							sceneHandle.PSV.zoom(65);
							setTimeout(function(){
								sceneHandle.PSV.zoom(50);
								if(!sceneHandle.PSV.navFlag)
									return;
								if(sceneHandle.PSV.navList[0].rotate!=undefined)
									sceneOption.rotate = sceneHandle.PSV.navList[0].rotate;
								sceneHandle.loadScene(sceneHandle.PSV.navList[0].to, sceneOption, sceneFn);
								sceneHandle.PSV.navList.splice(0,1);
							},150);
						},150);
					},150);
				}
			}
			else
			{
				this.PSV.navFlag=false;
				window.clearInterval(this.PSV.navTime);
				$("#MyNav").removeClass("red");
				$("#MyNav").addClass("blue");
				$("#MyNav").html("开始巡航");
			}
        },
        addSceneAR: function (config, render) {
            if (this.PSV != undefined) {
                config.width =32;
                config.height =32;
                config.image = (config.data.color == "red") ? (mapConfig.server + '/API/Map/VR/node2.gif') : (mapConfig.server + '/API/Map/VR/node1.gif');
                this.PSV.addMarker(config, render);
            }
        },
        mdySceneAR: function (config, render) {
            if (this.PSV != undefined) {
				if(config.data.color!= undefined)
					config.image = (config.data.color == "red") ? (mapConfig.server + '/API/Map/VR/node2.gif') : (mapConfig.server + '/API/Map/VR/node1.gif');
                this.PSV.updateMarker(config);
            }
        },
        delSceneAR: function (id, render) {
            if (this.PSV != undefined) {
                this.PSV.removeMarker({
                    id: id
                }, render);
            }
        },
        addPoint: function (tag, config) {
            var cfg = config ? config : {};
            var nCurrentLayer = -1;
            for (i = 0; i < mapConfig.layerList.length; i++) {
                var mapZoom1 = (mapConfig.layerList[i].width / mapConfig.initWidth) * mapConfig.initZoom;
                var mapZoom2 = ((i + 1) == mapConfig.layerList.length) ? mapZoom1 : (mapConfig.layerList[i + 1].width / mapConfig.initWidth) * mapConfig.initZoom;
                if (mapZoom1 >= cfg.mapZoom) {
                    var id = "map-" + tag + "-" + i;
                    mapPoint.data[id] = { top: cfg.mapY * mapZoom1 + 32 * (mapZoom1 / cfg.mapZoom - 1),
                        left: cfg.mapX * mapZoom1 + 16 * (mapZoom1 / cfg.mapZoom - 1),
                        tag: tag,
                        name: cfg.name,
                        icon: cfg.icon,
                        color: cfg.color
                    };

                    if (cfg.mapZoom >= mapZoom1 && cfg.mapZoom < mapZoom2) {
                        nCurrentLayer = i + 1;
                    }

                    if (i == nCurrentLayer) {
                        var mapScale = cfg.mapZoom / mapZoom1;
                        var mapX = Math.round(mapPoint.data[id].left * mapScale + 16 * (mapScale - 1));
                        var mapY = Math.round(mapPoint.data[id].top * mapScale + 32 * (mapScale - 1));

                        $("#layer" + i).append('<div class="map-point ' + (cfg.active ? 'active ' : '') + cfg.icon + '_' + cfg.color + '" id="'
                            + id + '" style="position:absolute;top:' + mapY + 'px;left:' + mapX + 'px;"><div class="tip" style="width:' + cfg.width + 'px;left:' + (-(cfg.width / 2 - 5)) + 'px"><span class="content">' + cfg.html + '</span><span class="close">x</span></div><span class="pointer"></span></div>');
                    }
                    else {
                        $("#layer" + i).append('<div class="map-point ' + (cfg.active ? 'active ' : '') + cfg.icon + '_' + cfg.color + '" id="'
                            + id + '" style="position:absolute;top:' + mapPoint.data[id].top + 'px;left:' + mapPoint.data[id].left + 'px;"><div class="tip" style="width:' + cfg.width + 'px;left:' + (-(cfg.width / 2 - 5)) + 'px"><span class="content">' + cfg.html + '</span><span class="close">x</span></div><span class="pointer"></span></div>');
                    }

					$("#" + id).bind(TUI.env.ua.clickEventDown, { handle: this,tag: tag, fn: cfg.fn }, function (e) {
                        e.data.fn(this, e.data.tag,mapPoint.status);
                        return false;
                    });

                    $("#" + id).find(".close").bind(TUI.env.ua.clickEventDown, { handle: this,tag: tag, fn: cfg.fn }, function (e) {
						e.data.handle.closePoint(e.data.tag);
                        return false;
                    });
                }
            }
        },
        mdyPoint: function (tag, config) {
            //移除原标签
            this.delPoint(tag);
            //添加新标签
            this.addPoint(tag, config);
        },
        delPoint: function (tag) {
            var id;
            for (id in mapPoint.data) {
                if (mapPoint.data[id] != null
                    && mapPoint.data[id].tag == tag) {
                    $("#" + id).remove();
                    mapPoint.data[id] = null;
                }
            }
        },
        updatePoint: function (tag, html, color) {
            var id;
            for (id in mapPoint.data) {
                if (mapPoint.data[id] != null
                    && mapPoint.data[id].tag == tag) {
                    $("#" + id).removeClass(mapPoint.data[id].icon + "_" + mapPoint.data[id].color);
                    $("#" + id).addClass(mapPoint.data[id].icon + "_" + color);
                    $("#" + id).find(".tip .content").html(html);
                    mapPoint.data[id].color = color;
                }
            }
        },
		closeAllPoint: function () {
            var id;
            var viewport = $('#' + this.container).find(".viewport");
            var layer = $('#' + this.container).find(".current-map-layer");
            var scaleX = layer.width() / layer[0].defaultWidth;
            var mapContent = layer.find(".mapcontent").find(".map-point");

            for (id in mapPoint.data) {
                if (mapPoint.data[id] != null) {
                   $("#" + id).removeClass("active");
				   $("#" + id).removeClass("disable");
                }
            }
        },
		activeAllPoint: function () {
            var id;
            var viewport = $('#' + this.container).find(".viewport");
            var layer = $('#' + this.container).find(".current-map-layer");
            var scaleX = layer.width() / layer[0].defaultWidth;
            var mapContent = layer.find(".mapcontent").find(".map-point");

            for (id in mapPoint.data) {
                if (mapPoint.data[id] != null) {
                   $("#" + id).addClass("active");
				   $("#" + id).removeClass("disable");
                }
            }
        },
		closePoint: function (tag) {
            var id;
            var viewport = $('#' + this.container).find(".viewport");
            var layer = $('#' + this.container).find(".current-map-layer");
            var scaleX = layer.width() / layer[0].defaultWidth;
            var mapContent = layer.find(".mapcontent").find(".map-point");

            for (id in mapPoint.data) {
                if (mapPoint.data[id] != null
                    && mapPoint.data[id].tag == tag) {
                    $("#" + id).removeClass("active");
					$("#" + id).addClass("disable");
                }
            }
        },
        activePoint: function (tag) {
            var id;
            var viewport = $('#' + this.container).find(".viewport");
            var layer = $('#' + this.container).find(".current-map-layer");
            var scaleX = layer.width() / layer[0].defaultWidth;
            var mapContent = layer.find(".mapcontent").find(".map-point");

            for (id in mapPoint.data) {
                if (mapPoint.data[id] != null
                    && mapPoint.data[id].tag == tag) {
                    $("#" + id).addClass("active");
					$("#" + id).removeClass("disable");
					for (i = 0; i < mapContent.length; i++) {
						if (id == mapContent[i].id) {
							viewport.mapbox("center", { x: mapPoint.data[id].left * scaleX, y: mapPoint.data[id].top * scaleX });
							break;
						}
					}
                }
            }
        }
    }
};
/*************************************************************************
*
*			WebVR处理的方法
*
**************************************************************************/
TUI.WebVR = function (container) {
    var mapContainer = container;
	var mapConfig={};
	var sceneConfig = {};
	var sceneOption = null;
	var sceneFn = function () { };
	var sceneHandle;
	var scenePath;
    //
    return {
        init: function (config) {
			mapConfig = config ? config : {};
			if(mapConfig.server==undefined)
				mapConfig.server="";
			//
			sceneOption = mapConfig.option;
            sceneFn = mapConfig.fn;
            sceneEdit = mapConfig.bEdit;
            sceneHandle = this;
            scenePath = mapConfig.path;
			TUI.WebVR.sceneHandle = this;
            //
            $.ajax({
                type: 'get',
                url: mapConfig.server + "/API/Map/VR/" + mapConfig.path,
                dataType: "jsonp",
                context: this,
                error: function (result) {
                    alert("加载场景配置参数失败！");
                },
                success: function (result) {
                    if (!result.flag) {
                        alert("加载场景配置参数失败，"+result.info);
                        return;
                    }
                    //
                    if (sceneOption.rotate != undefined) {
                        result.data.longitude = sceneOption.rotate.longitude;
                        result.data.latitude = sceneOption.rotate.latitude;
                    }
                    //
                    for (var i = 0; i < result.data.markers.length; i++) {
                        if (result.data.markers[i].image != undefined && result.data.markers[i].image != "")
                            result.data.markers[i].image = mapConfig.server + '/API/Map/VR/' + result.data.markers[i].image;
                    }
                    //
                    sceneConfig = result;
					var panoramaUrl=result.data.panorama;
					if(TUI.Utils.isString(result.data.panorama))
					{
						panoramaUrl=mapConfig.server + result.data.panorama;
					}
					else if(TUI.Utils.isArray(result.data.panorama))
					{
						panoramaUrl=[];
						for(var i=0;i<result.data.panorama.length;i++)
							panoramaUrl[i]=mapConfig.server + result.data.panorama[i];
					}
					//
                    if (this.PSV != undefined) {
                        if(this.PSV.cubeload==TUI.Utils.isArray(panoramaUrl))
                        {
							this.PSV.clearMarkers();
							this.PSV.firstload = false;
							//
							if (result.data.rotate != undefined) {
								this.PSV.setPanorama(panoramaUrl, result.data.rotate, true);
							}
							else {
								this.PSV.setPanorama(panoramaUrl, {
									longitude: result.data.longitude,
									latitude: result.data.latitude
								}, true);
							}
							this.PSV.setCaption(result.data.caption);
							return;
						}
						else
						{
							this.PSV.clearMarkers();
							this.PSV.destroy();
							this.PSV=undefined;
						}
                    }
                    //
					if(sceneEdit)
                    {
						this.PSV = new PhotoSphereViewer({
							panorama: panoramaUrl,
							container: mapContainer,
							loading_img: mapConfig.server + '/API/Map/VR/photosphere-logo.gif',
							default_long: result.data.longitude,
							default_lat: result.data.latitude,
							move_speed: 1.8,
							time_anim: false,
							anim_speed: '-2rpm',
							caption: result.data.caption,
							default_fov: 80,
							mousewheel: true,
							gyroscope: true,
							webgl: true,
							fisheye: false,
							usexmpdata: false,
							click_event_on_marker: true,
							lang: {
								autorotate: '自动旋转',
								zoom: '缩放',
								zoomOut: '放大',
								zoomIn: '缩小',
								download: '导出',
								markers: 'AR标记',
								gyroscope: '陀螺仪'
							},
							navbar: [
								'autorotate', 
								'zoom',
								'markers',
								{
									title: '位置标注',
									className: 'custom-button',
									content: '<i class="fa fa-crosshairs" style="line-height: 20px;font-size:16pt;"></i>',
									onClick: function () {
										if (!this.bMarkers) {
											this.bMarkers = true;
											this.MarkersPath = [];
											$('.psv-hud').css("cursor", "crosshair");
										}
										else {
											$('.psv-hud').css("cursor", "move");
											this.bMarkers = false;
											this.MarkersPath = [];
											this.gotoMarker(this.newMarker);
										}
									}
								},
								'caption',
								'spacer-1',
								'gyroscope',
								{
									title: '选择巡航路径',
									className: 'custom-button',
									content: '<i class="fa fa-location-arrow" style="line-height: 20px;font-size:14pt;"></i>',
									onClick: function () {
										 if(mapConfig.tag==undefined)
										 {
											 alert("没有指定VR巡航空间，计算巡航路径失败！");
											 return;
										 }
										 //
										 $.ajax({
													type: 'get',
													url: mapConfig.server + "/API/Map/VR/" + mapConfig.tag,
													dataType: "jsonp",
													context: this,
													error: function (result) {
														alert("加载场景配置参数失败！");
													},
													success: function (result) {
														var localHtml="";
														for(var i=0;i<result.data.length;i++)
														{
															localHtml+=('<option value="'+mapConfig.tag+'/'+result.data[i].tag+'" style="color:#888;">'+result.data[i].caption+'</option>');
														}
														//
														this.navFlag=false;
														window.clearInterval(this.navTime);
														this.showPanel('<h3 style="margin: 0 0 10px 0;text-align: center;">选择巡航路径</h3>'
																+'<table width="100%" cellPadding="5px" border="0px" style="font-size:10.5pt;">'
																+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-map-marker"></i>&nbsp;出发：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navFrom" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+'	<option value="" style="color:#888;">我的位置</option>'+localHtml
																+'</select></td></tr>'
																+'<tr id="fromtr" style="display: none;"><td width="80px" style="line-height: 24px;"><i class="fa fa-minus" id="hideFromtr"></i>&nbsp;途经：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navFromto" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+'	<option value="" style="color:#888;">我的位置</option>'+localHtml
																+'</select></td></tr>'
																+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-plus" id="showFromtr"></i>&nbsp;到达：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navTo" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+localHtml
																+'</select></td></tr>'
																+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-clock-o"></i>&nbsp;停留：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navTime" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+'	<option value="3" style="color:#888;">3秒</option>'
																+'	<option value="5" style="color:#888;">5秒</option>'
																+'	<option value="10" style="color:#888;">10秒</option>'
																+'	<option value="15" style="color:#888;">15秒</option>'
																+'	<option value="30" style="color:#888;">30秒</option>'
																+'	<option value="60" style="color:#888;">60秒</option>'
																+'	<option value="300" style="color:#888;">5分钟</option>'
																+'	<option value="600" style="color:#888;">10分钟</option>'
																+'	<option value="900" style="color:#888;">15分钟</option>'
																+'	<option value="1800" style="color:#888;">30分钟</option>'
																+'	<option value="3600" style="color:#888;">60分钟</option>'
																+'</select></td></tr>'
																+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-retweet"></i>&nbsp;返航：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navLoop" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+'	<option value="0" style="color:#888;">终点停止</option>'
																+'	<option value="1" style="color:#888;">原路返回</option>'
																+'	<option value="2" style="color:#888;">近路返回</option>'
																+'</select></td></tr>'
																+'</table><br><div id="MyNav" class="btn btn-block blue">开始巡航</div><div id="NavInfo"></div>');
														//
														$("#showFromtr").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
															$("#fromtr").show();
															return false;
														});
														//
														$("#hideFromtr").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
															$("#fromtr").hide();
															return false;
														});
														//
														$("#MyNav").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
															if(e.data.handle.navFlag)
															{
																e.data.handle.navList=[];
																e.data.handle.navFlag=false;
																window.clearInterval(e.data.handle.navTime);
																$("#MyNav").removeClass("red");
																$("#MyNav").addClass("blue");
																$("#MyNav").html("开始巡航");
																return false;
															}
															//
															var from=$("#navFrom").val();
															if(from=="")
																from=scenePath;
															var fromto=$("#navFromto").val();
															if(fromto=="")
																fromto=from;
															var to=$("#navTo").val();
															var loop=$("#navLoop").val();
															e.data.handle.time=parseInt($("#navTime").val());
															//
															 $.ajax({
																		type: 'POST',
																		url: mapConfig.server + "/API/Map/VR/" + mapConfig.tag,
																		data:{from:from,fromto:fromto,to:to,loop:loop},
																		dataType: "jsonp",
																		context: e.data.handle,
																		error: function (result) {
																			alert("加载场景配置参数失败！");
																		},
																		success: function (result) {
																			if(!result.flag)
																			{
																				alert("计算巡航路径失败！"+result.info);
																				return;
																			}
																			//
																			this.navFlag=true;
																			this.navList=result.data;
																			if(this.navList[0].from!=scenePath)
																			{
																				mapConfig.path=sceneHandle.PSV.navList[0].from;
																				sceneHandle.init(mapConfig);
																			}
																			//
																			this.zoom(50);
																			this.navTime=window.setInterval(function(){
																				sceneHandle.navSceneAR();
																			},this.time*1000);
																			$("#MyNav").removeClass("blue");
																			$("#MyNav").addClass("red");
																			$("#MyNav").html("停止巡航");
																		}
															 });
															//
															return false;
														});
												}
										});
									}
								}
							],
							markers: result.data.markers
						});
						//
						this.PSV.on('click', function (e) {
							$('.psv-spacer').html("<span style='line-height: 40px;color: #ccc;font-size: 10.5pt;'>" + TUI.Utils.formatNumber(e.longitude, "#0.0000")+','+ TUI.Utils.formatNumber(e.latitude, "#0.0000") + "</span>");
							if (this.bMarkers) {
								var markersPath = this.MarkersPath;
								if (markersPath.length == 0) {
									if (this.newMarker != undefined) {
										this.removeMarker({
											id: 'newMarker'
										}, false);
									}
									this.newMarker = this.addMarker({
										id: 'newMarker',
										circle: 3,
										longitude: e.longitude,
										latitude: e.latitude,
										svgStyle: {
											fill: 'rgba(200, 0, 0, 0.2)',
											stroke: 'rgba(200, 0, 50, 0.8)',
											'stroke-width': '2px'
										},
										tooltip: {
											content: '开始标注...',
											position: 'right bottom'
										},
										content: '人工物体AR标注：<textarea name="" rows="" cols="" style="width: 100%;height: 300px;margin: 10px 0;">' + TUI.JSON.encode([e.longitude, e.latitude]) + '</textarea>'
									}, true);
									markersPath[markersPath.length] = [e.longitude, e.latitude];
									markersPath[markersPath.length] = [e.longitude, e.latitude];
								}
								else {
									markersPath[markersPath.length] = [e.longitude, e.latitude];
									if (this.newMarker != undefined) {
										this.removeMarker({
											id: 'newMarker'
										}, false);
									}
									this.newMarker = this.addMarker({
										id: 'newMarker',
										polygon_rad: markersPath,
										svgStyle: {
											fill: 'rgba(200, 0, 0, 0.2)',
											stroke: 'rgba(200, 0, 50, 0.8)',
											'stroke-width': '2px'
										},
										tooltip: {
											content: '人工AR标注',
											position: 'right bottom'
										},
										content: '人工物体AR标注：<textarea name="" rows="" cols="" style="width: 100%;height: 300px;margin: 10px 0;">' + TUI.JSON.encode(this.MarkersPath) + '</textarea>'
									}, true);
								}
							}
						});
					}
					else
					{
						this.PSV = new PhotoSphereViewer({
							panorama: panoramaUrl,
							container: mapContainer,
							loading_img: mapConfig.server + '/API/Map/VR/photosphere-logo.gif',
							default_long: result.data.longitude,
							default_lat: result.data.latitude,
							move_speed: 1.8,
							time_anim: false,
							anim_speed: '-2rpm',
							caption: result.data.caption,
							default_fov: 80,
							mousewheel: true,
							gyroscope: true,
							webgl: true,
							fisheye: false,
							usexmpdata: false,
							lang: {
								autorotate: '自动旋转',
								zoom: '缩放',
								zoomOut: '放大',
								zoomIn: '缩小',
								download: '导出',
								markers: 'AR标记',
								gyroscope: '陀螺仪'
							},
							navbar: [
								'autorotate', 
								'zoom',
								'markers',
								'caption',
								'gyroscope',
								{
									title: '选择巡航路径',
									className: 'custom-button',
									content: '<i class="fa fa-location-arrow" style="line-height: 20px;font-size:14pt;"></i>',
									onClick: function () {
										 if(mapConfig.tag==undefined)
										 {
											 alert("没有指定VR巡航空间，计算巡航路径失败！");
											 return;
										 }
										 //
										 $.ajax({
													type: 'get',
													url: mapConfig.server + "/API/Map/VR/" + mapConfig.tag,
													dataType: "jsonp",
													context: this,
													error: function (result) {
														alert("加载场景配置参数失败！");
													},
													success: function (result) {
														var localHtml="";
														for(var i=0;i<result.data.length;i++)
														{
															localHtml+=('<option value="'+mapConfig.tag+'/'+result.data[i].tag+'" style="color:#888;">'+result.data[i].caption+'</option>');
														}
														//
														this.navFlag=false;
														window.clearInterval(this.navTime);
														this.showPanel('<h3 style="margin: 0 0 10px 0;text-align: center;">选择巡航路径</h3>'
																+'<table width="100%" cellPadding="5px" border="0px" style="font-size:10.5pt;">'
																+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-map-marker"></i>&nbsp;出发：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navFrom" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+'	<option value="" style="color:#888;">我的位置</option>'+localHtml
																+'</select></td></tr>'
																+'<tr id="fromtr" style="display: none;"><td width="80px" style="line-height: 24px;"><i class="fa fa-minus" id="hideFromtr"></i>&nbsp;途经：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navFromto" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+'	<option value="" style="color:#888;">我的位置</option>'+localHtml
																+'</select></td></tr>'
																+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-plus" id="showFromtr"></i>&nbsp;到达：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navTo" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+localHtml
																+'</select></td></tr>'
																+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-clock-o"></i>&nbsp;停留：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navTime" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+'	<option value="3" style="color:#888;">3秒</option>'
																+'	<option value="5" style="color:#888;">5秒</option>'
																+'	<option value="10" style="color:#888;">10秒</option>'
																+'	<option value="15" style="color:#888;">15秒</option>'
																+'	<option value="30" style="color:#888;">30秒</option>'
																+'	<option value="60" style="color:#888;">60秒</option>'
																+'	<option value="300" style="color:#888;">5分钟</option>'
																+'	<option value="600" style="color:#888;">10分钟</option>'
																+'	<option value="900" style="color:#888;">15分钟</option>'
																+'	<option value="1800" style="color:#888;">30分钟</option>'
																+'	<option value="3600" style="color:#888;">60分钟</option>'
																+'</select></td></tr>'
																+'<tr><td width="80px" style="line-height: 24px;"><i class="fa fa-retweet"></i>&nbsp;返航：</td><td style="text-align: center;line-height: 24px;">'
																+'<select id="navLoop" style="width:100%;background: transparent;color: #fff;font-size: 10.5pt;margin: 0 0 5px 0;">'
																+'	<option value="0" style="color:#888;">终点停止</option>'
																+'	<option value="1" style="color:#888;">原路返回</option>'
																+'	<option value="2" style="color:#888;">近路返回</option>'
																+'</select></td></tr>'
																+'</table><br><div id="MyNav" class="btn btn-block blue">开始巡航</div><div id="NavInfo"></div>');
														//
														$("#showFromtr").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
															$("#fromtr").show();
															return false;
														});
														//
														$("#hideFromtr").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
															$("#fromtr").hide();
															return false;
														});
														//
														$("#MyNav").bind(TUI.env.ua.clickEventDown, { handle: this}, function (e) {
															if(e.data.handle.navFlag)
															{
																e.data.handle.navList=[];
																e.data.handle.navFlag=false;
																window.clearInterval(e.data.handle.navTime);
																$("#MyNav").removeClass("red");
																$("#MyNav").addClass("blue");
																$("#MyNav").html("开始巡航");
																return false;
															}
															//
															var from=$("#navFrom").val();
															if(from=="")
																from=scenePath;
															var fromto=$("#navFromto").val();
															if(fromto=="")
																fromto=from;
															var to=$("#navTo").val();
															var loop=$("#navLoop").val();
															e.data.handle.time=parseInt($("#navTime").val());
															//
															 $.ajax({
																		type: 'POST',
																		url: mapConfig.server + "/API/Map/VR/" + mapConfig.tag,
																		data:{from:from,fromto:fromto,to:to,loop:loop},
																		dataType: "jsonp",
																		context: e.data.handle,
																		error: function (result) {
																			alert("加载场景配置参数失败！");
																		},
																		success: function (result) {
																			if(!result.flag)
																			{
																				alert("计算巡航路径失败！"+result.info);
																				return;
																			}
																			//
																			this.navFlag=true;
																			this.navList=result.data;
																			if(this.navList[0].from!=scenePath)
																			{
																				mapConfig.path=sceneHandle.PSV.navList[0].from;
																				sceneHandle.init(mapConfig);
																			}
																			//
																			this.zoom(50);
																			this.navTime=window.setInterval(function(){
																				sceneHandle.navSceneAR();
																			},this.time*1000);
																			$("#MyNav").removeClass("blue");
																			$("#MyNav").addClass("red");
																			$("#MyNav").html("停止巡航");
																		}
															 });
															//
															return false;
														});
												}
										});
									}
								}
							],
							markers: result.data.markers
						});
					}
                    //
                    this.PSV.firstload = true;
                    this.PSV.cubeload = TUI.Utils.isArray(panoramaUrl);
					//
                    this.PSV.on('select-marker', function (marker, dblclick) {
                        if (!this.bMarkers) {
                            if (marker.type == "polygon_rad") {
                                this.updateMarker({
                                    id: marker.id,
                                    svgStyle: {
                                        fill: 'rgba(255, 235, 59, 0.2)',
                                        stroke: 'rgba(255, 235, 59, 0.8)',
                                        'stroke-width': '2px'
                                    }
                                });
                            }
                            //
                            if (marker.data != undefined) {
                                if (marker.data.url != undefined && marker.data.url != "") {
                                    this.marker = marker;
                                    //
									if(marker.data.type=="iframe")
                                    {
										this.showPanel("<img id='frameloading' src='/Resources/images/waiting.gif' style='top: 50%;position: absolute;left: 50%;margin: -64px 0 0 -64px;'><iframe  onload='TUI.WebVR.sceneHandle.frameload(this)' id='framecontent' src='"+marker.data.url+"' marginwidth='0' marginheight='0' frameBorder='0' width='100%'  height='100%' style='overflow: auto;display: none;'></iframe>",true);
									}
									else
									{
										$.ajax({
											type: 'get',
											url: marker.data.url,
											dataType: "html",
											context: this,
											error: function (result) {
												this.showPanel((new Date()).Format("yyyy-MM-dd hh:mm:ss") + " 加载场景AR标记内容失败！<br>" + marker.data.url);
											},
											success: function (result) {
												this.showPanel(result);
												//
												if (typeof this.marker.data.fn == "function") {
													this.marker.option = sceneOption;
													this.marker.data.fn(this, this.marker,$(this.panel.content));
												}
											}
										});
									}
                                }
                                else if (marker.data.path != undefined && marker.data.path != "") {
                                    if (marker.data.rotate != undefined)
                                        sceneOption.rotate = marker.data.rotate;
									mapConfig.path=marker.data.path;
                                    sceneHandle.init(mapConfig);
                                }
                            }
                        }
                    });
                    //
                    this.PSV.on('ready', function () {
                        if (!this.firstload) {
                            for (var i = 0; i < sceneConfig.data.markers.length; i++) {
                                this.addMarker(sceneConfig.data.markers[i],false);
                            }
							this.render();
                        }
                        //
                        if (typeof sceneFn == "function") {
                            sceneConfig.option = sceneOption;
                            sceneFn(this, sceneConfig);
                        }
                    });
                }
            });
        },
        show: function (speed) {
            $('#' + this.container).fadeIn(speed);
        },

        hide: function (speed) {
            $('#' + this.container).fadeOut(speed);
        },
        clear: function () {
			if (this.PSV != undefined) {
				this.PSV.destroy();
				this.PSV=undefined;
			};
            $('#' + this.container).empty();
        },

		frameload: function (e) {
			$("#frameloading").remove();
			$("#framecontent").show();
			if (typeof this.PSV.marker.data.fn == "function") {
				this.PSV.marker.option = sceneOption;
				this.PSV.marker.data.fn(this.PSV, this.PSV.marker,$(e.contentDocument));
			}
        },

		navSceneAR: function () {
			if(this.PSV.navList.length>0)
			{
				if(this.PSV.navFlag)
				{
					this.PSV.rotate({
									longitude: this.PSV.navList[0].longitude,
									latitude: 0
								  });
					this.PSV.zoom(55);
					setTimeout(function(){
						sceneHandle.PSV.zoom(60);
						setTimeout(function(){
							sceneHandle.PSV.zoom(65);
							setTimeout(function(){
								sceneHandle.PSV.zoom(50);
								if(!sceneHandle.PSV.navFlag)
									return;
								if(sceneHandle.PSV.navList[0].rotate!=undefined)
									mapConfig.option.rotate = sceneHandle.PSV.navList[0].rotate;
								mapConfig.path=sceneHandle.PSV.navList[0].to;
								sceneHandle.init(mapConfig);
								sceneHandle.PSV.navList.splice(0,1);
							},150);
						},150);
					},150);
				}
			}
			else
			{
				this.PSV.navFlag=false;
				window.clearInterval(this.PSV.navTime);
				$("#MyNav").removeClass("red");
				$("#MyNav").addClass("blue");
				$("#MyNav").html("开始巡航");
			}
        },
		
        addSceneAR: function (config, render) {
            if (this.PSV != undefined) {
                config.width =32;
                config.height =32;
                config.image = (config.data.color == "red") ? (mapConfig.server + '/API/Map/VR/node2.gif') : (mapConfig.server + '/API/Map/VR/node1.gif');
                this.PSV.addMarker(config, render);
            }
        },
        mdySceneAR: function (config, render) {
            if (this.PSV != undefined) {
				if(config.data.color!= undefined)
					config.image = (config.data.color == "red") ? (mapConfig.server + '/API/Map/VR/node2.gif') : (mapConfig.server + '/API/Map/VR/node1.gif');
                this.PSV.updateMarker(config);
            }
        },
        delSceneAR: function (id, render) {
            if (this.PSV != undefined) {
                this.PSV.removeMarker({
                    id: id
                }, render);
            }
        }
    }
};
/*************************************************************************
*
*			Comet实时数据接口
*
**************************************************************************/
function OPCComet(projectpath)
{
	if(arguments.length==1)
	{
		this.projectspace=projectpath;
	}
	else
	{
		this.projectspace="";
	}
	//
	var now = new Date();
	//
	this.onchange;
	this.m_ReqType=-1;
	this.m_CometID=-1;
	this.datareadyState=0;
	this.datastatus=0;
	this.dataObject=new XMLHttpRequest();
	this.eventObject=new XMLHttpRequest();
	this.errorText="";
	this.CometArray=new Array();
	this.CometMaxID=Math.floor(now.getTime()/1000);
	//
	if(this.eventObject)
	{
		try
		{
			if(this.projectspace=="")
				this.eventObject.open("GET", "cometevent.srv?CmdType=5&ReqType=0&CometID=0&ReqStr=all", false);
			else
				this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=5&ReqType=0&CometID=0&ReqStr=all", false);
			//
			this.eventObject.setRequestHeader("If-Modified-Since","0");
			this.eventObject.send(null);
			//
			var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
			if(m_StatusCode==7)
			{

			}
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return this;
};
/*------------------------------------------------------------------------*/
/*	
/*	对象名称：SetProjectSpace
/*	对象输入：projectpath 工程路径
/*	对象输出：无
/*	对象说明：设置工程访问空间域
/*	
/*------------------------------------------------------------------------*/
OPCComet.prototype.SetProjectSpace = function(projectpath){
	this.projectspace = projectpath;
};
OPCComet.prototype.setProjectSpace = OPCComet.prototype.SetProjectSpace;
//
OPCComet.prototype.onchange = function () {};
OPCComet.prototype.onChange = OPCComet.prototype.onchange;
OPCComet.prototype.OnChange = OPCComet.prototype.onchange;
//
OPCComet.prototype.OnListen = function () {
	this.datareadyState=0;
	this.datastatus=0;
	this.errorText="";
	if (this.dataObject)
	{
			//
			try
			{
				//
				if(this.projectspace=="")
					this.dataObject.open("GET", "cometdata.srv", true);
				else
					this.dataObject.open("GET", "/project/"+this.projectspace+"/cometdata.srv", true);
				//
				this.dataObject.setRequestHeader("If-Modified-Since","0");
				var obj = this;
				this.dataObject.onreadystatechange = function()
				{
					if (obj.dataObject && obj.dataObject.readyState == 4 && obj.dataObject.status == 200)
					{
						if(obj.dataObject.responseText=="")//防止防火墙掐断长连接
						{
							obj.OnListen();
							return;
						}
						//
						var m_StatusCode=(obj.dataObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?obj.dataObject.responseXML.documentElement.attributes[0].value:obj.dataObject.responseXML.documentElement.attributes["StatusCode"].value;
						obj.m_ReqType=(obj.dataObject.responseXML.documentElement.attributes["ReqType"]==undefined)?obj.dataObject.responseXML.documentElement.attributes[1].value:obj.dataObject.responseXML.documentElement.attributes["ReqType"].value;
						obj.m_CometID=(obj.dataObject.responseXML.documentElement.attributes["CometID"]==undefined)?obj.dataObject.responseXML.documentElement.attributes[2].value:obj.dataObject.responseXML.documentElement.attributes["CometID"].value;
						//
						if(m_StatusCode==4)
						{
							var count=obj.CometArray.length;
							for(i=0;i<count;i++)
							{
								if(obj.CometArray[i][3]==obj.m_CometID
									&& obj.CometArray[i][0]==obj.m_ReqType)
								{
									if(obj.m_ReqType==3)
										obj.CometArray[i][4]=unescape(obj.dataObject.responseXML.getElementsByTagName("CometData")[0].firstChild.nodeValue);
									//
									obj.onchange=obj.CometArray[i][1];
									if (typeof obj.onchange == "function") {
										obj.datareadyState = 4;
										obj.datastatus = 200;
										if(obj.m_ReqType!=3)
										{
											obj.onchange(obj);
										}
										else
										{
											obj.onchange(obj.CometArray[i][4]);
										}
									}
									break;
								}
							}
							//
							obj.OnListen();
						}
					}
				};
				this.dataObject.send(null);
				return true;
			}
			catch(ex)//catch the ex 
			{ 
				this.errorText=ex.message;
			}
	}
	//
	return false;
};
OPCComet.prototype.onListen = OPCComet.prototype.OnListen; 
//
OPCComet.prototype.OnClose = function () {
	this.errorText="";
	if (this.eventObject)
	{
		try
		{
			if(this.projectspace=="")
				this.eventObject.open("GET", "cometevent.srv?CmdType=5&ReqType=0&CometID=0&ReqStr=all", false);
			else
				this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=5&ReqType=0&CometID=0&ReqStr=all", false);
			//
			this.eventObject.setRequestHeader("If-Modified-Since","0");
			this.eventObject.send(null);
			//
			var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
			if(m_StatusCode==7)
			{
				var count=this.CometArray.length;
				this.CometArray.splice(0,count);
			}
			//this.dataObject=null;
			//this.eventObject=null;
			return true;
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	//this.dataObject=null;
	//this.eventObject=null;
	return false;
};
OPCComet.prototype.onClose = OPCComet.prototype.OnClose; 
//
OPCComet.prototype.AddTJSSrv = function(url,userFunction){
	//
	if(url.length==0)
	{
		return false;
	}
	//
	this.errorText="";
	if (this.eventObject)
	{
		try
		{
			//
			var count=this.CometArray.length;
			if(this.projectspace=="")
				this.eventObject.open("GET", "cometevent.srv?CmdType=1&ReqType=3&CometID="+this.CometMaxID+"&ReqStr="+TUI.Utils.encode64(url), false);
			else
				this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=1&ReqType=3&CometID="+this.CometMaxID+"&ReqStr="+TUI.Utils.encode64(url), false);
			this.eventObject.setRequestHeader("If-Modified-Since","0");
			this.eventObject.send(null);
			//
			var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
			if(m_StatusCode==7)
			{
				this.CometArray[count]=[3,userFunction,url,this.CometMaxID,null];
				this.CometMaxID++;
			}
			//
			return true;
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.addTJSSrv = OPCComet.prototype.AddTJSSrv; 
//
OPCComet.prototype.RemoveTJSSrv = function(url){
	//
	if(url.length==0)
	{
		return false;
	}
	this.errorText="";
	if (this.eventObject)
	{
		try
		{
			var count=this.CometArray.length;
			var idx=-1;
			for(i=0;i<count;i++)
			{
				if(this.CometArray[i][0]==3
					&& this.CometArray[i][2]==url)
				{
					//
					if(this.projectspace=="")
						this.eventObject.open("GET", "cometevent.srv?CmdType=2&ReqType=3&CometID="+this.CometArray[i][3]+"&ReqStr="+encode64(url), false);
					else
						this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=2&ReqType=3&CometID="+this.CometArray[i][3]+"&ReqStr="+encode64(url), false);
					this.eventObject.setRequestHeader("If-Modified-Since","0");
					this.eventObject.send(null);
					//
					var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
					if(m_StatusCode==7)
					{
						this.CometArray.splice(i,1);
					}
					return true;
				}
			}
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.removeTJSSrv = OPCComet.prototype.RemoveTJSSrv;
//
OPCComet.prototype.AddOPCSrv = function(NodeFullPath,userFunction){
	//
	if(NodeFullPath.length==0)
	{
		return false;
	}
	//
	this.errorText="";
	if (this.eventObject)
	{
		try
		{
			//
			var count=this.CometArray.length;
			if(this.projectspace=="")
				this.eventObject.open("GET", "cometevent.srv?CmdType=1&ReqType=0&CometID="+this.CometMaxID+"&ReqStr="+NodeFullPath, false);
			else
				this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=1&ReqType=0&CometID="+this.CometMaxID+"&ReqStr="+NodeFullPath, false);
			this.eventObject.setRequestHeader("If-Modified-Since","0");
			this.eventObject.send(null);
			//
			var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
			if(m_StatusCode==7)
			{
				this.CometArray[count]=[0,userFunction,NodeFullPath,this.CometMaxID];
				this.CometMaxID++;
			}
			//
			return true;
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.addOPCSrv = OPCComet.prototype.AddOPCSrv; 
//
OPCComet.prototype.RemoveOPCSrv = function(NodeFullPath){
	//
	if(NodeFullPath.length==0)
	{
		return false;
	}
	this.errorText="";
	if (this.eventObject)
	{
		//
		try
		{
			var count=this.CometArray.length;
			var idx=-1;
			for(i=0;i<count;i++)
			{
				if(this.CometArray[i][0]==0
					&& this.CometArray[i][2]==NodeFullPath)
				{
					//
					if(this.projectspace=="")
						this.eventObject.open("GET", "cometevent.srv?CmdType=2&ReqType=0&CometID="+this.CometArray[i][3]+"&ReqStr="+NodeFullPath, false);
					else
						this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=2&ReqType=0&CometID="+this.CometArray[i][3]+"&ReqStr="+NodeFullPath, false);
					this.eventObject.setRequestHeader("If-Modified-Since","0");
					this.eventObject.send(null);
					//
					var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
					if(m_StatusCode==7)
					{
						this.CometArray.splice(i,1);
					}
					return true;
				}
			}
			//
			
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.removeOPCSrv = OPCComet.prototype.RemoveOPCSrv; 

//
OPCComet.prototype.AddAlarmSrv = function(NodeFullPath,userFunction){
	//
	if(NodeFullPath.length==0)
	{
		return false;
	}
	//
	this.errorText="";
	if (this.eventObject)
	{
		
		try
		{
			//
			var count=this.CometArray.length;
			if(this.projectspace=="")
				this.eventObject.open("GET", "cometevent.srv?CmdType=1&ReqType=1&CometID="+this.CometMaxID+"&ReqStr="+NodeFullPath, false);
			else
				this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=1&ReqType=1&CometID="+this.CometMaxID+"&ReqStr="+NodeFullPath, false);	
			this.eventObject.setRequestHeader("If-Modified-Since","0");
			this.eventObject.send(null);
			//
			var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
			if(m_StatusCode==7)
			{
				this.CometArray[count]=[1,userFunction,NodeFullPath,this.CometMaxID];
				this.CometMaxID++;
			}
			//
			return true;
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.addAlarmSrv = OPCComet.prototype.AddAlarmSrv; 
//
OPCComet.prototype.RemoveAlarmSrv = function(NodeFullPath){
	//
	if(NodeFullPath.length==0)
	{
		return false;
	}
	this.errorText="";
	if (this.eventObject)
	{
		//
		try
		{
			var count=this.CometArray.length;
			var idx=-1;
			for(i=0;i<count;i++)
			{
				if(this.CometArray[i][0]==1
					&& this.CometArray[i][2]==NodeFullPath)
				{
					//
					if(this.projectspace=="")
						this.eventObject.open("GET", "cometevent.srv?CmdType=2&ReqType=1&CometID="+this.CometArray[i][3]+"&ReqStr="+NodeFullPath, false);
					else
						this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=2&ReqType=1&CometID="+this.CometArray[i][3]+"&ReqStr="+NodeFullPath, false);
					this.eventObject.setRequestHeader("If-Modified-Since","0");
					this.eventObject.send(null);
					//
					var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
					if(m_StatusCode==7)
					{
						this.CometArray.splice(i,1);
					}
					return true;
				}
			}
			//
			
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.removeAlarmSrv = OPCComet.prototype.RemoveAlarmSrv; 
/* 
*     DTUNO=* 表示全部
*/
OPCComet.prototype.AddDTUSrv = function(FYSBID,DTUNO,userFunction){
	//
	if(DTUNO.length==0)
	{
		return false;
	}
	this.errorText="";
	if (this.eventObject)
	{
		
		try
		{
			//
			var count=this.CometArray.length;
			var szReqStr=FYSBID+"&"+DTUNO;
			if(this.projectspace=="")
				this.eventObject.open("GET", "cometevent.srv?CmdType=1&ReqType=2&CometID="+this.CometMaxID+"&ReqStr="+szReqStr, false);
			else
				this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=1&ReqType=2&CometID="+this.CometMaxID+"&ReqStr="+szReqStr, false);
			this.eventObject.setRequestHeader("If-Modified-Since","0");
			this.eventObject.send(null);
			//
			var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
			if(m_StatusCode==7)
			{
				this.CometArray[count]=[2,userFunction,szReqStr,this.CometMaxID];
				this.CometMaxID++;
			}
			//
			return true;
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.addDTUSrv = OPCComet.prototype.AddDTUSrv; 
//
OPCComet.prototype.RemoveDTUSrv = function(FYSBID,DTUNO){
	//
	if(DTUNO.length==0)
	{
		return false;
	}
	this.errorText="";
	if (this.eventObject)
	{
		//
		try
		{
			var count=this.CometArray.length;
			var szReqStr=FYSBID+"&"+DTUNO;
			var idx=-1;
			for(i=0;i<count;i++)
			{
				if(this.CometArray[i][0]==2
					&& this.CometArray[i][2]==szReqStr)
				{
					//
					if(this.projectspace=="")
						this.eventObject.open("GET", "cometevent.srv?CmdType=2&ReqType=2&CometID="+this.CometArray[i][3]+"&ReqStr="+szReqStr, false);
					else
						this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=2&ReqType=2&CometID="+this.CometArray[i][3]+"&ReqStr="+szReqStr, false);
					this.eventObject.setRequestHeader("If-Modified-Since","0");
					this.eventObject.send(null);
					//
					var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
					if(m_StatusCode==7)
					{
						this.CometArray.splice(i,1);
					}
					return true;
				}
			}
			//
			
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.removeDTUSrv = OPCComet.prototype.RemoveDTUSrv; 
//
OPCComet.prototype.GetItemCount = function(){
	if(this.datareadyState==4 && this.datastatus==200)
	{
		try
		{
			var nCount=0;
			var l;
			for(l=0;l<this.dataObject.responseXML.documentElement.childNodes.length;l++)
			{
				if(this.dataObject.responseXML.documentElement.childNodes[l].nodeType!=3)
				{
					nCount++;
				}
			}
			return nCount;
		}
		catch(ex)//catch the ex 
		{ 
			this.datareadyState=0;
			this.datastatus=0;
			return 0;
		}
	}
	return 0;
};
OPCComet.prototype.getItemCount = OPCComet.prototype.GetItemCount; 
//通讯接口名称
OPCComet.prototype.GetItemFYSBName = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("FYSBName")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("FYSBName")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemFYSBName = OPCComet.prototype.GetItemFYSBName; 
//通讯终端标识
OPCComet.prototype.GetItemDTUNO = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("DTUNO")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("DTUNO")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemDTUNO = OPCComet.prototype.GetItemDTUNO; 
//通讯终端IP
OPCComet.prototype.GetItemIPAddr = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("RemoteIPAddr")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("RemoteIPAddr")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemIPAddr = OPCComet.prototype.GetItemIPAddr; 
//通讯报文时间
OPCComet.prototype.GetItemTime = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("Time")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("Time")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemTime = OPCComet.prototype.GetItemTime; 
//通讯报文长度
OPCComet.prototype.GetItemLen = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("Len")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("Len")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemLen = OPCComet.prototype.GetItemLen; 
//通讯ASCII报文
OPCComet.prototype.GetItemASCII = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("ASCII")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("ASCII")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemASCII = OPCComet.prototype.GetItemASCII; 
//通讯HEX报文
OPCComet.prototype.GetItemHEX = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("HEX")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("HEX")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemHEX = OPCComet.prototype.GetItemHEX; 
//通讯方向
OPCComet.prototype.GetItemDirect = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("Direct")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("Direct")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemDirect = OPCComet.prototype.GetItemDirect; 
//通讯类型
OPCComet.prototype.GetItemType = function(Index){
	if(this.m_ReqType==2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("Type")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("Type")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemType = OPCComet.prototype.GetItemType; 

//获取当前对象设备路径
OPCComet.prototype.GetNodeFullPath = function(){
	var count=this.CometArray.length;
	for(i=0;i<count;i++)
	{
		if(this.CometArray[i][3]==this.m_CometID
			&& this.CometArray[i][0]==this.m_ReqType)
		{
			return this.CometArray[i][2];
		}
	}
	return null;
};
OPCComet.prototype.getNodeFullPath = OPCComet.prototype.GetNodeFullPath; 
//变量ID
OPCComet.prototype.GetItemValueID = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("ValueID")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("ValueID")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemValueID = OPCComet.prototype.GetItemValueID; 
//变量换算ID
OPCComet.prototype.GetItemTestID = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("TestID")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("TestID")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemTestID = OPCComet.prototype.GetItemTestID; 
//变量名称
OPCComet.prototype.GetItemValueName = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("szName")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("szName")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemValueName = OPCComet.prototype.GetItemValueName; 
//变量OPC标签
OPCComet.prototype.GetItemValuePath = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("szOPCValue")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("szOPCValue")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemValuePath = OPCComet.prototype.GetItemValuePath; 
//变量类型
OPCComet.prototype.GetItemDataType = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("DataType")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("DataType")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemDataType = OPCComet.prototype.GetItemDataType; 
//变量单位
OPCComet.prototype.GetItemDataUnit = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("DataUnit")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("DataUnit")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemDataUnit = OPCComet.prototype.GetItemDataUnit; 
//变量默认值
OPCComet.prototype.GetItemDefaultValue = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("nDataDefaultValue")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("nDataDefaultValue")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemDefaultValue = OPCComet.prototype.GetItemDefaultValue; 
//变量偏移量
OPCComet.prototype.GetItemDataOffset = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("nDataOffset")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("nDataOffset")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemDataOffset = OPCComet.prototype.GetItemDataOffset; 
//变量读写标记
OPCComet.prototype.GetItemRWFlag = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("uRWFlag")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("uRWFlag")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemRWFlag = OPCComet.prototype.GetItemRWFlag; 
//变量历史记录标记
OPCComet.prototype.GetItemRecordFlag = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("bRecordFlag")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("bRecordFlag")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemRecordFlag = OPCComet.prototype.GetItemRecordFlag; 
//变量参量类型标记
OPCComet.prototype.GetItemParamFlag = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("bParamFlag")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("bParamFlag")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemParamFlag = OPCComet.prototype.GetItemParamFlag; 
//变量完整的名称
OPCComet.prototype.GetItemFullName = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("szOPCFullName")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("szOPCFullName")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemFullName = OPCComet.prototype.GetItemFullName; 
//变量完整的OPC标签路径
OPCComet.prototype.GetItemFullPath = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("szOPCFullPath")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("szOPCFullPath")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemFullPath = OPCComet.prototype.GetItemFullPath; 
//变量检测时间
OPCComet.prototype.GetItemDataTime = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("DataTime")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("DataTime")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemDataTime = OPCComet.prototype.GetItemDataTime; 
//变量检测值
OPCComet.prototype.GetItemDataValue = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("DataValue")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("DataValue")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemDataValue = OPCComet.prototype.GetItemDataValue; 
//变量检测值
OPCComet.prototype.GetItemValueInfo = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("bParamFlag")[Index].firstChild)
	{
		var bRecordFlag=parseInt(this.dataObject.responseXML.getElementsByTagName("bRecordFlag")[Index].firstChild.nodeValue);
		if(bRecordFlag==1)
		{
			var bParamFlag=parseInt(this.dataObject.responseXML.getElementsByTagName("bParamFlag")[Index].firstChild.nodeValue);
			if(bParamFlag==1)
			{   
				var tc=new Date();
				tc.setHours(0,0,0,0);
				if(TUI.Utils.parseDate(this.dataObject.responseXML.getElementsByTagName("DataTime")[Index].firstChild.nodeValue)<tc)
					return "今日：——";
				return "今日："+this.dataObject.responseXML.getElementsByTagName("OPCValueItem")[Index].getElementsByTagName("DayMeasure")[0].firstChild.nodeValue+this.dataObject.responseXML.getElementsByTagName("DataUnit")[Index].firstChild.nodeValue;
			}
			else if(bParamFlag==0)
			{
				return "平均："+this.dataObject.responseXML.getElementsByTagName("OPCValueItem")[Index].getElementsByTagName("DayParamAvg")[0].firstChild.nodeValue+this.dataObject.responseXML.getElementsByTagName("DataUnit")[Index].firstChild.nodeValue;
			}
		}
		return "——";
	}
	return null;
};
OPCComet.prototype.getItemValueInfo = OPCComet.prototype.GetItemValueInfo; 
//变量报警时间
OPCComet.prototype.GetItemAlarmTime = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("AlarmTime")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("AlarmTime")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemAlarmTime = OPCComet.prototype.GetItemAlarmTime; 
//变量报警类型
OPCComet.prototype.GetItemAlarmType = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("AlarmType")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("AlarmType")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemAlarmType = OPCComet.prototype.GetItemAlarmType; 
//变量报警级别
OPCComet.prototype.GetItemAlarmSeverity = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("AlarmSeverity")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("AlarmSeverity")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemAlarmSeverity = OPCComet.prototype.GetItemAlarmSeverity; 
//变量报警消息
OPCComet.prototype.GetItemAlarmMessage = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("AlarmMessage")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("AlarmMessage")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemAlarmMessage = OPCComet.prototype.GetItemAlarmMessage; 

//变量滤波开关
OPCComet.prototype.GetItemFilterFlag = function(Index){
	if(this.m_ReqType<2 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("FilterFlag")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("FilterFlag")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getItemFilterFlag = OPCComet.prototype.GetItemFilterFlag; 
//
OPCComet.prototype.AddDebugSrv = function(fileFilter,ip,userFunction){
	this.errorText="";
	if (this.eventObject)
	{
		try
		{
			var count=this.CometArray.length;
			var szReqStr=fileFilter+"&"+ip;
			if(this.projectspace=="")
				this.eventObject.open("GET", "cometevent.srv?CmdType=1&ReqType=4&CometID="+this.CometMaxID+"&ReqStr="+szReqStr, false);
			else
				this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=1&ReqType=4&CometID="+this.CometMaxID+"&ReqStr="+szReqStr, false);
			this.eventObject.setRequestHeader("If-Modified-Since","0");
			this.eventObject.send(null);
			//
			var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
			if(m_StatusCode==7)
			{
				this.CometArray[count]=[4,userFunction,szReqStr,this.CometMaxID];
				this.CometMaxID++;
			}
			//
			return true;
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.addDebugSrv = OPCComet.prototype.AddDebugSrv; 
//
OPCComet.prototype.RemoveDebugSrv = function(fileFilter,ip){
	this.errorText="";
	if (this.eventObject)
	{
		//
		try
		{
			var count=this.CometArray.length;
			var szReqStr=fileFilter+"&"+ip;
			var idx=-1;
			for(i=0;i<count;i++)
			{
				if(this.CometArray[i][0]==4
					&& this.CometArray[i][2]==szReqStr)
				{
					//
					if(this.projectspace=="")
						this.eventObject.open("GET", "cometevent.srv?CmdType=2&ReqType=4&CometID="+this.CometArray[i][3]+"&ReqStr="+szReqStr, false);
					else
						this.eventObject.open("GET", "/project/"+this.projectspace+"/cometevent.srv?CmdType=2&ReqType=4&CometID="+this.CometArray[i][3]+"&ReqStr="+szReqStr, false);
					this.eventObject.setRequestHeader("If-Modified-Since","0");
					this.eventObject.send(null);
					//
					var m_StatusCode=(this.eventObject.responseXML.documentElement.attributes["StatusCode"]==undefined)?this.eventObject.responseXML.documentElement.attributes[0].value:this.eventObject.responseXML.documentElement.attributes["StatusCode"].value;
					if(m_StatusCode==7)
					{
						this.CometArray.splice(i,1);
					}
					return true;
				}
			}
			//
			
		}
		catch(ex)//catch the ex 
		{ 
			this.errorText=ex.message;
		}
	}
	//
	return false;
};
OPCComet.prototype.removeDebugSrv = OPCComet.prototype.RemoveDebugSrv; 
//调试日志IP地址
OPCComet.prototype.GetLogIPAddr = function(Index){
	if(this.m_ReqType==4 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("IPAddr")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("IPAddr")[Index].firstChild.nodeValue ;
	}
	return "0.0.0.0";
};
OPCComet.prototype.getLogIPAddr = OPCComet.prototype.GetLogIPAddr; 
//调试日志用户
OPCComet.prototype.GetLogUserID = function(Index){
	if(this.m_ReqType==4 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("UserID")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("UserID")[Index].firstChild.nodeValue ;
	}
	return "system";
};
OPCComet.prototype.getLogUserID = OPCComet.prototype.GetLogUserID; 
//调试日志源
OPCComet.prototype.GetLogSrc = function(Index){
	if(this.m_ReqType==4 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("DebugName")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("DebugName")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getLogSrc = OPCComet.prototype.GetLogSrc; 
//调试日志时间
OPCComet.prototype.GetLogTime = function(Index){
	if(this.m_ReqType==4 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("Time")[Index].firstChild)
	{
		return this.dataObject.responseXML.getElementsByTagName("Time")[Index].firstChild.nodeValue ;
	}
	return null;
};
OPCComet.prototype.getLogTime = OPCComet.prototype.GetLogTime; 
//调试日志内容
OPCComet.prototype.GetLogText = function(Index){
	if(this.m_ReqType==4 && this.datareadyState==4 && this.datastatus==200 && Index<this.dataObject.responseXML.documentElement.childNodes.length
		&& this.dataObject.responseXML.getElementsByTagName("Log")[Index].firstChild)
	{
		return unescape(this.dataObject.responseXML.getElementsByTagName("Log")[Index].firstChild.nodeValue);
	}
	return null;
};
OPCComet.prototype.getLogText = OPCComet.prototype.GetLogText; 
//
TUI.Comet=new OPCComet();
//文件上传扩展
jQuery.extend({
    createUploadIframe: function(id, uri)
	{
			//create frame
            var frameId = 'jUploadFrame' + id;
            /*if(window.ActiveXObject) {
				var io = document.createElement('<iframe id="' + frameId + '" name="' + frameId + '" />');
				if(typeof uri== 'boolean'){
                    io.src = 'javascript:false';
                }
                else if(typeof uri== 'string'){
                    io.src = uri;
                }
            }
            else*/ 
			{
                var io = document.createElement('iframe');
                io.id = frameId;
                io.name = frameId;
            }
            io.style.position = 'absolute';
            io.style.top = '-1000px';
            io.style.left = '-1000px';

            document.body.appendChild(io);

            return io			
    },
    createUploadForm: function(id, fileElementId)
	{
		//create form	
		var formId = 'jUploadForm' + id;
		var fileId = 'jUploadFile' + id;
		var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data"></form>');	
		var oldElement = $('#' + fileElementId);
		var newElement = $(oldElement).clone();
		$(oldElement).prop('id', fileId);
		$(oldElement).before(newElement);
		$(oldElement).appendTo(form);
		//set attributes
		$(form).css('position', 'absolute');
		$(form).css('top', '-1200px');
		$(form).css('left', '-1200px');
		$(form).appendTo('body');		
		return form;
    },

    ajaxFileUpload: function(s) {
        // TODO introduce global settings, allowing the client to modify them for all requests, not only timeout		
        s = jQuery.extend({}, jQuery.ajaxSettings, s);
        var id = new Date().getTime()        
		var form = jQuery.createUploadForm(id, s.fileElementId);
		var io = jQuery.createUploadIframe(id, s.secureuri);
		var frameId = 'jUploadFrame' + id;
		var formId = 'jUploadForm' + id;		
        // Watch for a new set of requests
        if ( s.global && ! jQuery.active++ )
		{
			jQuery.event.trigger( "ajaxStart" );
		}            
        var requestDone = false;
        // Create the request object
        var xml = {}   
        if ( s.global )
            jQuery.event.trigger("ajaxSend", [xml, s]);
        // Wait for a response to come back
        var uploadCallback = function(isTimeout)
		{			
			var io = document.getElementById(frameId);
            try 
			{				
				if(io.contentWindow)
				{
					 xml.responseText = io.contentWindow.document.body?io.contentWindow.document.body.innerHTML:null;
                	 xml.responseXML = io.contentWindow.document.XMLDocument?io.contentWindow.document.XMLDocument:io.contentWindow.document;
					 
				}else if(io.contentDocument)
				{
					 xml.responseText = io.contentDocument.document.body?io.contentDocument.document.body.innerHTML:null;
                	xml.responseXML = io.contentDocument.document.XMLDocument?io.contentDocument.document.XMLDocument:io.contentDocument.document;
				}						
            }catch(e)
			{
				jQuery.handleError(s, xml, null, e);
			}
            if ( xml || isTimeout == "timeout") 
			{				
                requestDone = true;
                var status;
                try {
                    status = isTimeout != "timeout" ? "success" : "error";
                    // Make sure that the request was successful or notmodified
                    if ( status != "error" )
					{
                        // process the data (runs the xml through httpData regardless of callback)
                        var data = jQuery.uploadHttpData( xml, s.dataType );    
                        // If a local callback was specified, fire it and pass it the data
                        if ( s.success )
                            s.success( data, status );
    
                        // Fire the global callback
                        if( s.global )
                            jQuery.event.trigger( "ajaxSuccess", [xml, s] );
                    } else
                        jQuery.handleError(s, xml, status);
                } catch(e) 
				{
                    status = "error";
                    jQuery.handleError(s, xml, status, e);
                }

                // The request was completed
                if( s.global )
                    jQuery.event.trigger( "ajaxComplete", [xml, s] );

                // Handle the global AJAX counter
                if ( s.global && ! --jQuery.active )
                    jQuery.event.trigger( "ajaxStop" );

                // Process result
                if ( s.complete )
                    s.complete(xml, status);

                jQuery(io).unbind()

                setTimeout(function()
									{	try 
										{
											$(io).remove();
											$(form).remove();	
											
										} catch(e) 
										{
											jQuery.handleError(s, xml, null, e);
										}									

									}, 100)

                xml = null

            }
        }
        // Timeout checker
        if ( s.timeout > 0 ) 
		{
            setTimeout(function(){
                // Check to see if the request is still happening
                if( !requestDone ) uploadCallback( "timeout" );
            }, s.timeout);
        }
        try 
		{
           // var io = $('#' + frameId);
			var form = $('#' + formId);
			$(form).prop('action', s.url);
			$(form).prop('method', 'POST');
			$(form).prop('target', frameId);
            if(form.encoding)
			{
                form.encoding = 'multipart/form-data';				
            }
            else
			{				
                form.enctype = 'multipart/form-data';
            }			
            $(form).submit();

        } catch(e) 
		{			
            jQuery.handleError(s, xml, null, e);
        }
        if(window.attachEvent){
            document.getElementById(frameId).attachEvent('onload', uploadCallback);
        }
        else{
            document.getElementById(frameId).addEventListener('load', uploadCallback, false);
        } 		
        return {abort: function () {}};	

    },

    uploadHttpData: function( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        // If the type is "script", eval it in global context
        if ( type == "script" )
            jQuery.globalEval( data );
        // Get the JavaScript object, if JSON is used.
        if ( type == "json" )
            eval( "data = " + data );
        // evaluate scripts within html
        if ( type == "html" )
            jQuery("<div>").html(data).evalScripts();
			//alert($('param', data).each(function(){alert($(this).prop('value'));}));
        return data;
    }
});



jQuery.download = function (url, data, method) {
    //url and data options required
    if (url && data) {
        //data can be string of parameters or array/object
        data = typeof data == 'string' ? data : jQuery.param(data);
        //split params into form inputs
        var inputs = '';
        jQuery.each(data.split('&'), function () {
            var pair = this.split('=');
            inputs += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '" />';
        });
        //send request
        jQuery('<form action="' + url + '" method="' + (method || 'post') + '">' + inputs + '</form>')
		.appendTo('body').submit().remove();
    };
};

(function(e){e.fn.jflatTimeline=function(t){var n=new Array;var r=function(e,t){if(e>t)return-1;if(e<t)return 1;return 0};var i=0;var s=0;var o=2;var u=0;var a=500;var f=new Array;f[0]="一月";f[1]="二月";f[2]="三月";f[3]="四月";f[4]="五月";f[5]="六月";f[6]="七月";f[7]="八月";f[8]="九月";f[9]="十月";f[10]="十一月";f[11]="十二月";var l={};if(t){e.extend(l,t)}return this.each(function(){selector=e(this);if(t.scroll)o=parseInt(t.scroll);if(t.width)selector.css("width",t.width);if(t.scrollingTime)a=t.scrollingTime;if(!selector.children(".timeline-wrap").children(".event.selected3").length)selector.children(".timeline-wrap").children(".event:first-child").addClass("selected3");i=(new Date(selector.children(".timeline-wrap").children(".event.selected3").attr("data-date"))).getFullYear();s=(new Date(selector.children(".timeline-wrap").children(".event.selected3").attr("data-date"))).getMonth();if(!selector.children(".month-year-bar").length){selector.prepend('<div class = "month-year-bar"></div>');selector.children(".month-year-bar").prepend('<div class = "year"><a class = "prev"><&nbsp;</a><span>'+String(i)+'</span><a class = "next">&nbsp;></span></a></div>');selector.children(".month-year-bar").prepend('<div class = "month"><a class = "prev"><&nbsp;</a><span>'+String(f[s])+'</span><a class = "next">&nbsp;></a><a>&nbsp;&nbsp;<i class="icon-cancel" title="关闭" style="font-size:16pt;cursor: pointer;"></i></a></div>')}var l=0;selector.children(".timeline-wrap").children(".event").each(function(){n[l]=new Date(e(this).attr("data-date"));l++});n.sort(r);if(!selector.children(".dates-bar").length)selector.children(".month-year-bar").after('<div class = "dates-bar"><a class = "prev"><span class="iconleft"></span></a><a class = "noevent">未发生事件</a><a class = "next"><span class="iconright"></span></a></div>');for(l=0;l<n.length;l++){dateString=String(n[l].getMonth()+1+"/"+n[l].getDate()+"/"+n[l].getFullYear());if(selector.children(".dates-bar").children('a[data-date = "'+dateString+'"]').length)continue;selector.children(".dates-bar").children("a.prev").after("<a data-date = "+dateString+'><span class = "date">'+String(n[l].getDate())+'</span><span class = "month">'+String(f[n[l].getMonth()])+"</span></a>")}for(l=0;l<selector.children(".timeline-wrap").children(".event").length;l++){var c=new Date(selector.children(".timeline-wrap").children(".event:nth-child("+String(l+1)+")").attr("data-date"));dateString=String(c.getMonth()+1+"/"+c.getDate()+"/"+c.getFullYear());selector.children(".timeline-wrap").children(".event:nth-child("+String(l+1)+")").attr("data-date",dateString)}selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").each(function(){if((new Date(e(this).attr("data-date"))).getFullYear()!=i)e(this).hide()});if(selector.hasClass("calledOnce"))return 0;selector.addClass("calledOnce");selector.children(".dates-bar").children('a[data-date ="'+String(selector.children(".timeline-wrap").children(".event.selected3").attr("data-date"))+'"]').addClass("selected3");if(selector.width()<500)selector.addClass("s_screen");e(window).resize(function(){if(selector.width()<500)selector.addClass("s_screen");else selector.removeClass("s_screen")});selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").click(function(){c=String(e(this).attr("data-date"));selector.children(".timeline-wrap").children(".event.selected3").removeClass("selected3");selector.children(".timeline-wrap").children('.event[data-date="'+c+'"]').addClass("selected3");selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").removeClass("selected3");e(this).addClass("selected3")});selector.children(".dates-bar").children("a.next").click(function(){var e=o;var t=selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible()").length;if(u+o>=t)e=t-u-1;if(parseInt(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").css("width"))*e>selector.children(".dates-bar").width())while(parseInt(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").css("width"))*e>selector.children(".dates-bar").width()&&e>1)e-=1;var n=-1*e*parseInt(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").css("width"));selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").animate({marginLeft:"+="+String(n)+"px"},a);u+=e;s=(new Date(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq("+String(u)+")").attr("data-date"))).getMonth();selector.children(".month-year-bar").children(".month").children("span").text(f[s])});selector.children(".dates-bar").children("a.prev").click(function(){var e=o;var t=selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible()").length;if(u<=o)e=u;if(parseInt(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").css("width"))*e>selector.children(".dates-bar").width())while(parseInt(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").css("width"))*e>selector.children(".dates-bar").width()&&e>1)e-=1;var n=e*parseInt(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").css("width"));selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").animate({marginLeft:"+="+String(n)+"px"},a);u-=e;s=(new Date(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq("+String(u)+")").attr("data-date"))).getMonth();selector.children(".month-year-bar").children(".month").children("span").text(f[s])});selector.children(".month-year-bar").children(".month").children(".next").click(function(){if(!(s==11))s+=1;else s=0;var t=0;selector.children(".month-year-bar").children(".month").children("span").text(f[s]);selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible()").each(function(){t+=1;if((new Date(e(this).attr("data-date"))).getMonth()>=s){return false}});var n=(t-u-1)*parseInt(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").css("width"));selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").animate({marginLeft:"-="+String(n)+"px"},a);u=t-1});selector.children(".month-year-bar").children(".month").children(".prev").click(function(){if(!(s==0))s-=1;else s=11;var t=0;selector.children(".month-year-bar").children(".month").children("span").text(f[s]);selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible()").each(function(){t+=1;if((new Date(e(this).attr("data-date"))).getMonth()>=s){return false}});var n=(t-u-1)*parseInt(selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").css("width"));selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible():eq(0)").animate({marginLeft:"-="+String(n)+"px"},a);u=t-1});selector.children(".month-year-bar").children(".year").children(".next").click(function(){i+=1;selector.children(".month-year-bar").children(".year").children("span").text(String(i));selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").each(function(){if((new Date(e(this).attr("data-date"))).getFullYear()!=i)e(this).hide();else e(this).show()});if(!selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible").length){selector.children(".dates-bar").children("a.noevent").css("display","block")}else{selector.children(".dates-bar").children("a.noevent").css("display","none");selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").css("margin-left","0");u=0;selector.children(".timeline-wrap").children(".event").removeClass("selected3");selector.children(".timeline-wrap").children(".event").each(function(){c=new Date(e(this).attr("data-date"));if(c.getFullYear()==i){e(this).addClass("selected3");s=c.getMonth();selector.children(".month-year-bar").children(".month").children("span").text(f[s]);return false}})}selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").removeClass("selected3");selector.children(".dates-bar").children('a[data-date ="'+String(selector.children(".timeline-wrap").children(".event.selected3").attr("data-date"))+'"]').addClass("selected3")});selector.children(".month-year-bar").children(".year").children(".prev").click(function(){i-=1;selector.children(".month-year-bar").children(".year").children("span").text(String(i));selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").each(function(){if((new Date(e(this).attr("data-date"))).getFullYear()!=i)e(this).hide();else e(this).show();if(!selector.children(".dates-bar").children("a:not(.prev, .next, .noevent):visible").length){selector.children(".dates-bar").children("a.noevent").css("display","block")}else{selector.children(".dates-bar").children("a.noevent").css("display","none");selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").css("margin-left","0");u=0;selector.children(".timeline-wrap").children(".event").removeClass("selected3");selector.children(".timeline-wrap").children(".event").each(function(){c=new Date(e(this).attr("data-date"));if(c.getFullYear()==i){e(this).addClass("selected3");s=c.getMonth();selector.children(".month-year-bar").children(".month").children("span").text(f[s]);return false}})}});selector.children(".dates-bar").children("a:not(.prev, .next, .noevent)").removeClass("selected3");selector.children(".dates-bar").children('a[data-date ="'+String(selector.children(".timeline-wrap").children(".event.selected3").attr("data-date"))+'"]').addClass("selected3")})})}})(jQuery);
//dump
function tRow(s) {t = s.parentNode.lastChild;tTarget(t, tSource(s)) ;}function tTable(s) {var switchToState = tSource(s) ;var table = s.parentNode.parentNode;for (var i = 1; i < table.childNodes.length; i++) {t = table.childNodes[i] ;if (t.style) {tTarget(t, switchToState);}}}function tSource(s) {if (s.style.fontStyle == "italic" || s.style.fontStyle == null) {s.style.fontStyle = "normal";s.title = "click to collapse";return "open";} else {s.style.fontStyle = "italic";s.title = "click to expand";return "closed" ;}}function tTarget (t, switchToState) {if (switchToState == "open") {t.style.display = "";} else {t.style.display = "none";}}