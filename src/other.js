/**
 * 是否为空
 */
export const isNull = (data) => {
	if(data === undefined) {
		return true
	}
	
	if(data === null) {
		return true
	}
	
	if(data === '') {
		return true
	}
	
	return false
}

/**
 * 获取Cookie
 */
export const getCookie = () => {
	let cookies = document.cookie.split(';');
	let obj = {};
	for (let i = 0; i < cookies.length; i++) {
		let arr = cookies[i].trim().split('=');
		obj[arr[0]] = arr[1];
	}
	console.log('---obj---', obj);
	return obj
}

/**
 * 登出
 */
export const logout = () => {
	// window.open("about:blank","_self")
	// window.close();
	
}

/**
 * 将B，kB，MB等转换为bytes.
 * @param {number} value 数值
 * @param {string} unit 单位
 * @@return {number}
 */
export function convertToBytes(value, unit) {
	const units = ['B', 'kB', 'MB', 'GB', 'TB'];
	const log = units.indexOf(unit);
	return value * Math.pow(1024, log);
}

/**
 * 将bytes转换为B，kB，MB等
 * @param {number} bytes 数值
 * @@return {string} 
 */
export function convertFromBytes(bytes) {
	const units = ['B', 'kB', 'MB', 'GB', 'TB'];
	const log = Math.floor(Math.log(bytes) / Math.log(1024));
	const unit = units[log];
	const convertedValue = bytes / Math.pow(1024, log);
	return `${convertedValue.toFixed(2)}${unit}`;
}

/**
 * 身份证检验
 */
export const checkCardNum = idCard => {
  //15位和18位身份证号码的正则表达式
  let regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if(regIdCard.test(idCard)){
    if(idCard.length==18){
      let idCardWi=new Array(7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2);//将前17位加权因子保存在数组里
      let idCardY=new Array(1,0,10,9,8,7,6,5,4,3,2);//这是除以11后，可能产生的11位余数、验证码，也保存成数组
      let idCardWiSum=0;//用来保存前17位各自乖以加权因子后的总和
      for(let i=0; i<17; i++){
        idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
      }
      let idCardMod = idCardWiSum%11;//计算出校验码所在数组的位置
      let idCardLast = idCard.substring(17);//得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if(idCardMod == 2){
        if(idCardLast=="X"||idCardLast=="x"){
          return true;
        }else{
          return false;
        }
      }else{
      //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if(idCardLast==idCardY[idCardMod]){
          return true;
        }else{
          return false;
        }
      }
    }
  }else{
     return false;
  }
}

/**
 * url 参数格式化
 */
export const JSON2URL = ({url = '?', data}) => {
	if(Object.prototype.toString.call(data) !== '[object Object]'){
		throw new Error("传值应为对象");
	}
	
	let _url = url
	for(let [k, v] of Object.entries(data)) {
		_url += `${k}=${v}` + '&'
	}
	
	let formateUrl = _url.substring(0, _url.length - 1)
	return formateUrl
}

/**
 * 时间戳转化为时间
 */
export const timestamp2time = (Timestamp) => {
	let date1 = new Date(Timestamp);
	return date1.toLocaleDateString().replace(/\//g, "-") + " " + date1.toTimeString().substr(0, 8); 
}

/**
 * 获取实际资源
 * @param {Object} data
 */
export const getResource = (data) => {
	return process.env.VUE_APP_BASE_API +  `/ekia-card/file/preview?md5=${data}`
}

export const someoneAttr = (data, attr, checkVal, queryVal) => {
	try{
		let _cache = []
		for(let i of data) {
			if(i[attr] === checkVal) {
				_cache.push(i[queryVal])
			}
		}
		return _cache
	} catch(e) {
		throw new Error("数据转化错误：", e);
	}
}

/**
 * 管道操作符
 */
export class pipelineVerify {
    constructor() {}
	
    /**
     * 存在值为空的情况
     * @returns 
     */
    static nullStr(data) {
        if(data === '' || data === null || data === undefined){
            return '--'
        }
        return data
    }

    /**
     * 身份证的隐藏
     * @returns 
     */
    static cardNumHidden(data) {
        return data.replace(/(.{6}).*(.{4})/, "$1********$2")
    }

    /**
     * 手机号码的隐藏
     * @returns 
     */
    static phoneHidden(data) {
       return data.replace(/^(\d{3})\d+(\d{4})$/, "$1****$2")
    }

    /**
     * 隐藏名字中间
     * @returns 
     */
    static nameMiddenHidden(name) {
        let newStr = '';
        if (name.length === 2) {
            newStr = name.substr(0, 1) + '*';
        } else if (name.length > 2) {
            let char = '';
            for (let i = 0, len = name.length - 2; i < len; i++) {
            char += '*';
            }
            newStr = name.substr(0, 1) + char + name.substr(-1, 1);
        } else {
            newStr = name;
        }
        return newStr;
    }
}

/**
 * 正则的判断
 */
export const regs = {
  get num1to9() {
    return /^[1-9]+[0-9]*$/;
  },
	
  /** 必需全部是英文 */
  get en() {
    return /^[A-Za-z]+$/;
  },
	
  /** 蛇形英文命名方式，且首尾不能是下划线，开头不能是数字 */
  get enSnake() {
    // return /^[a-z][0-9a-z]*(_[0-9a-z]*[a-z]+)+$/;
    return /^[a-z][_0-9a-z]*[a-z0-9]+$/;
  },
	
  get enOrNumOrUnderline() {
    return /^[A-Za-z0-9_]+$/;
  },
	
  /** 必需全部是英文或数字 */
  get enOrNum() {
    return /^[A-Za-z0-9]+$/;
  }
	
};

/**
 * isObject：判断数据是不是引用类型的数据
 *  (例如：arrays, functions, objects, regexes, new Number(0),以及 new String(''))
 */
export const isObject = (value) => {
    let type = typeof value;
    return value != null && (type == 'object' || type == 'function');
}


/**
 * 检测是不是类数组或者是数组(里面用了是否是函数是否是isWindow的检测)
 */

 // 检测是否是一个window对象
export const isWindow = (obj) => {
  return obj != null && obj === obj.window;
};

 // 检测是否是一个函数
export const isFunction = (obj) => {
  return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
};

  // 标准的检测数据类型的办法
  const toType = (obj) => {
    let class2type = {};
    let toString = class2type.toString;

      if (obj == null) return obj + "";
      let reg = /^\[object ([a-zA-Z0-9]+)\]$/i;
      return typeof obj === "object" || typeof obj === "function" ?
          reg.exec(toString.call(obj))[1].toLowerCase() :
          typeof obj;
  };

 export const isArrayLike = (obj) => {
  if (obj == null) return false;
  if (!/^(object|function)$/i.test(typeof obj)) return false;
  let length = !!obj && "length" in obj && obj.length,
      type = toType(obj);
  if (isFunction(obj) || isWindow(obj)) return false;
  return type === "array" || length === 0 ||
      typeof length === "number" && length > 0 && (length - 1) in obj;
};

/**
 * 检测是否为纯粹的对象
 */
export const isPlainObject = (obj) => {
  let class2type = {},
  toString = class2type.toString,
  hasOwn = class2type.hasOwnProperty,
  fnToString = hasOwn.toString,
  ObjectFunctionString = fnToString.call(Object),
  getProto = Object.getPrototypeOf; 

  let proto, Ctor;
  if (!obj || toString.call(obj) !== "[object Object]") return false;
  proto = getProto(obj);
  if (!proto) return true;
  Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
  return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
};


/**
 * 检测是否是空对象
 * @param {*} obj 
 * @returns 
 */
export const  isEmptyObject = (obj) => {
  let keys = Object.keys(obj);
  console.log('keys', keys, obj, 1);
  if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
  return keys.length === 0;
};

/**
 * 函数防抖
 */
export const debounce = (func, wait, immediate) => {
  if (typeof func !== "function") throw new TypeError('func must be an function');
  if (typeof wait === "boolean") {
      immediate = wait;
      wait = 300;
  }
  if (typeof wait !== "number") wait = 300;
  if (typeof immediate !== "boolean") immediate = false;
  let timer;
  return function proxy(...params) {
      let runNow = !timer && immediate,
          self = this,
          result;
      if (timer) {
          clearTimeout(timer);
          timer = null;
      }
      timer = setTimeout(() => {
          if (timer) {
              clearTimeout(timer);
              timer = null;
          }
          if (!immediate) result = func.call(self, ...params);
      }, wait);
      if (runNow) result = func.call(self, ...params);
      return result;
  };
};

/**
 * 函数节流
 * @param {*} func 
 * @param {*} wait 
 * @returns 
 */
export const throttle = (func, wait) => {
  if (typeof func !== "function") throw new TypeError('func must be an function');
  if (typeof wait !== "number") wait = 300;
  let timer,
      previous = 0;
  return function proxy(...params) {
      let now = +new Date(),
          remaining = wait - (now - previous),
          self = this,
          result;
      if (remaining <= 0) {
          if (timer) {
              clearTimeout(timer);
              timer = null;
          }
          result = func.call(self, ...params);
          previous = now;
      } else if (!timer) {
          timer = setTimeout(() => {
              if (timer) {
                  clearTimeout(timer);
                  timer = null;
              }
              result = func.call(self, ...params);
              previous = +new Date();
          }, remaining);
      }
      return result;
  };
};

// 验证是否为promise实例
export const isPromise = (x) => {
  if (x !== null && /^(object|function)$/.test(typeof x)) {
      var then;
      try {
          then = x.then;
      } catch (err) {
          return false;
      }
      if (typeof then === "function") {
          return true;
      }
  }
  return false;
};

//横线转驼峰命名
export const camelize = (str) => {
  let camelizeRE = /-(\w)/g;
  return str.replace(camelizeRE, function(_, c) {
      return c ? c.toUpperCase() : '';
  })
}

/**
 * 驼峰命名转横线命名：拆分字符串，使用 - 相连，并且转换为小写
 */
export const hyphenate = (str) => {
  let hyphenateRE = /\B([A-Z])/g;
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

/**
 * 获取浏览器信息
 */
export const getExplorerInfo = () => {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie") ? { //ie < 11
        type: "IE",
        version: Number(t.match(/msie ([\d]+)/)[1])
    } : !!t.match(/trident\/.+?rv:(([\d.]+))/) ? { // ie 11
        type: "IE",
        version: 11
    } : 0 <= t.indexOf("edge") ? {
        type: "Edge",
        version: Number(t.match(/edge\/([\d]+)/)[1])
    } : 0 <= t.indexOf("firefox") ? {
        type: "Firefox",
        version: Number(t.match(/firefox\/([\d]+)/)[1])
    } : 0 <= t.indexOf("chrome") ? {
        type: "Chrome",
        version: Number(t.match(/chrome\/([\d]+)/)[1])
    } : 0 <= t.indexOf("opera") ? {
        type: "Opera",
        version: Number(t.match(/opera.([\d]+)/)[1])
    } : 0 <= t.indexOf("Safari") ? {
        type: "Safari",
        version: Number(t.match(/version\/([\d]+)/)[1])
    } : {
        type: t,
        version: -1
    }
}

/**
 * 检测是否为PC端浏览器模式
 */
export const isPCBroswer = () => {
    let e = navigator.userAgent.toLowerCase()
		
    let t = "ipad" == e.match(/ipad/i)
    let i = "iphone" == e.match(/iphone/i)
    let r = "midp" == e.match(/midp/i)
    let n = "rv:1.2.3.4" == e.match(/rv:1.2.3.4/i)
    let a = "ucweb" == e.match(/ucweb/i)
    let o = "android" == e.match(/android/i)
    let s = "windows ce" == e.match(/windows ce/i)
    let l = "windows mobile" == e.match(/windows mobile/i)
		
    return !(t || i || r || n || a || o || s || l)
}

/**
 * 格式化时间
 * 
 * dateFormater('YYYY-MM-DD HH:mm', new Date()) => 2023-10-27 14:29
 */
export const dateFormater = (formater, t) => {
    let date = t ? new Date(t) : new Date(),
        Y = date.getFullYear() + '',
        M = date.getMonth() + 1,
        D = date.getDate(),
        H = date.getHours(),
        m = date.getMinutes(),
        s = date.getSeconds();
    return formater.replace(/YYYY|yyyy/g,Y)
        .replace(/YY|yy/g,Y.substr(2,2))
        .replace(/MM/g,(M<10?'0':'') + M)
        .replace(/DD/g,(D<10?'0':'') + D)
        .replace(/HH|hh/g,(H<10?'0':'') + H)
        .replace(/mm/g,(m<10?'0':'') + m)
        .replace(/ss/g,(s<10?'0':'') + s)
}

/**
 * 获取Url参数，返回一个对象
 * 
 * example:
 * ?a=1&b=2&c=3 ==> {a: "1", b: "2", c: "3"}
 */
export const GetUrlParam = () =>{
  let url = document.location.toString();
  let arrObj = url.split("?");
  let params = Object.create(null)
  if (arrObj.length > 1){
      arrObj = arrObj[1].split("&");
      arrObj.forEach(item=>{
          item = item.split("=");
          params[item[0]] = item[1]
      })
  }
  return params;
}

/**
 * base64数据导出文件，文件下载
 */
export const downloadFile = (filename, data) => {
  let DownloadLink = document.createElement('a');
  if ( DownloadLink ){
      document.body.appendChild(DownloadLink);
      DownloadLink.style = 'display: none';
      DownloadLink.download = filename;
      DownloadLink.href = data;

      if ( document.createEvent ){
          let DownloadEvt = document.createEvent('MouseEvents');

          DownloadEvt.initEvent('click', true, false);
          DownloadLink.dispatchEvent(DownloadEvt);
      } else if ( document.createEventObject ){
        DownloadLink.fireEvent('onclick');
      } else if (typeof DownloadLink.onclick == 'function' ){
        DownloadLink.onclick();
      }
          
      document.body.removeChild(DownloadLink);
  }
}

/**
 * 全屏
 */
export const toFullScreen = () => {
  let elem = document.body;
  elem.webkitRequestFullScreen
  ? elem.webkitRequestFullScreen()
  : elem.mozRequestFullScreen
  ? elem.mozRequestFullScreen()
  : elem.msRequestFullscreen
  ? elem.msRequestFullscreen()
  : elem.requestFullScreen
  ? elem.requestFullScreen()
  : alert("浏览器不支持全屏");
}

/**
 * 退出全屏
 */
export const exitFullscreen = () => {
  let elem = parent.document;
  elem.webkitCancelFullScreen
  ? elem.webkitCancelFullScreen()
  : elem.mozCancelFullScreen
  ? elem.mozCancelFullScreen()
  : elem.cancelFullScreen
  ? elem.cancelFullScreen()
  : elem.msExitFullscreen
  ? elem.msExitFullscreen()
  : elem.exitFullscreen
  ? elem.exitFullscreen()
  : alert("切换失败,可尝试Esc退出");
}

/**
 * JS时间戳转成时间
 * @param time
 * @returns
 */
export const timeStamp2String = (time) => {
    let datetime = new Date();
    datetime.setTime(time);
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    let date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    let hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    let minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    let second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}


/**
 * JS生成指定位数的随机整数
 * @param count
 * @returns {string}
 */
export const getRandomNum = (count) => {
    let arr = new Array;
    let reNum = "";
    for(let i=0;i<count;i++){
        arr[i] = parseInt(Math.random()*10);
        reNum += String(arr[i]);
    }
    return reNum;
}


/**
 * JS 清除空格
 * @param str
 * @param type 1-所有空格 2-前后空格 3-前空格 4-后空格
 * @returns {string}
 */
export const strTrim = (str, type = 2) => {
    let typeValue = type || 2
    switch (typeValue) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

/**
 * JS格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
export const formatRemainTime = (endTime) => {
    let startDate = new Date(); //开始时间
    let endDate = new Date(endTime); //结束时间
    let t = endDate.getTime() - startDate.getTime(); //时间差
    let d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}

/**
 * JS格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
export const formatPassTime = (startTime) => {
    let currentTime = Date.parse(new Date());
    let time = currentTime - new Date(startTime);
    let day = parseInt(time / (1000 * 60 * 60 * 24));
    let hour = parseInt(time / (1000 * 60 * 60));
    let min = parseInt(time / (1000 * 60));
    let month = parseInt(day / 30);
    let year = parseInt(month / 12);
    if (year) {
			return year + "年前";
		}
    if (month) return month + "个月前";
    if (day) return day + "天前";
    if (hour) return hour + "小时前";
    if (min) return min + "分钟前";
    else return '刚刚';
}

/**
 * BASE64加密
 * @param str
 * @returns {string}
 */
export const base64Encode = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
}

/**
 * BASE64解密
 * @param str
 * @returns {string}
 */
export const base64Decode = (str) => {
    return decodeURIComponent(escape(atob(str)));
}

/**
 * JS检查输入的字符是否具有特殊字符
 * @param str 字符串
 * @returns true 或 false; true表示包含特殊字符 主要用于注册信息的时候验证
 */
export const checkQuote = (str) => {
    let items = new Array("~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "{", "}", "[", "]", "(", ")");
    items.push(":", ";", "'", "|", "\\", "<", ">", "?", "/", "<<", ">>", "||", "//");
    items.push("select", "delete", "update", "insert", "create", "drop", "alter", "trancate");
    str = str.toLowerCase();
    for ( let i = 0; i < items.length; i++) {
        if (str.indexOf(items[i]) >= 0) {
            return true;
        }
    }
    return false;
}

/**
 * generateUUID 生成UUID
 * @returns {string} 返回字符串
 */
export const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

/**
 * 校验手机号码
 * @param str 对应手机号码
 * @returns {boolean} 结果返回 true 和 false。
 * true 为正确手机号码
 * false 为错误手机号码
 */
export const verifyPhoneNumber = (str) => {
    let myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    return myreg.test(str);
}


/**
 * JS字符串反序
 * @param text 需要进行反序的字符串
 * @returns {string} 返回反序之后的字符串
 * @constructor
 */
export const IsReverse = (text) => {
    return text.split('').reverse().join('');
}

/**
 * JS判断浏览器
 * @returns {string}
 */
// export const getBrowserName = () => {
//     if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
//         return "MSIE8";
//     } else if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
//         return "MSIE6";
//     } else if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
//         return "MSIE7";
//     } else if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
//         return "Firefox";
//     }
//     if (navigator.userAgent.indexOf("Chrome") > 0) {
//         return "Chrome";
//     } else {
//         return "Other";
//     }
// }