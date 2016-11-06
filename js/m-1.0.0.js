/**
 * M站框架
 * Created by zhousg on 2015/7/20.
 */
var root = this;
if(typeof exports !== 'undefined')KFZ = exports;
else KFZ = root.KFZ || (root.KFZ = {});
// 添加子对象
// @author lizixu <zixulee@163.com>
// @param string|array 多个字符串或由多个字符串组成的数组
(KFZ.add = function(){
    var len = arguments.length;
    if(!len) return;
    var objects;
    if(len === 1){
        objects = arguments[0];
        if(typeof objects === 'string') objects = [objects];
    }else{
        objects = Array.prototype.slice.apply(arguments);
    }
    $.each(objects, function(){
        var object = KFZ[this] || (KFZ[this] = {});
        object.extend = function(obj){
            $.extend.call(this, this, obj);
        };
    });
    var callback = arguments[len-1];
    typeof callback === 'function' && callback.apply(null, arguments);
})(['url', 'ajax', 'util', 'ui', 'lang', 'common', 'page']);

// 获取并组装URL参数对象
// @author lizixu <zixulee@163.com>
// 获取URL子属性：host/pathname/pagename/hash/query
(KFZ.url.refresh = function(callback) {
    // protocol
    KFZ.url.protocol = window.location.protocol;
    // host
    var host = KFZ.url.host = window.location.protocol + '//' + window.location.host + '/';
    // rootType
    KFZ.url.rootType = /.+\.local\//i.test(host) ? 'local' : /.+\.kfz\.(com|cn)/.test(host) ? 'kfz' : /.+\/\/(neibu.*|shopv2.*|bookv2.*|tanv2.*)/i.test(host) ? 'neibu' : 'online';
    // pathname
    (KFZ.url.getPathname = function(){
        return (KFZ.url.pathname = window.location.pathname);
    })();
    // pagename
    (KFZ.url.getPagename = function(href){
        var pagename = '',
            newHref = (href || KFZ.url.getPathname() || '').replace(/^((http|https|ftp):\/\/\w+\.\w+(\.\w+)*)*\//, '').replace(/\/$/, '');
        if(newHref){
            pagename = newHref.substr(newHref.lastIndexOf('/') + 1);
            if(!pagename){
                pagename = newHref.replace(/\/$/,'');
                if(/\//.test(pagename)){
                    pagename = pagename.substr(pagename.lastIndexOf('/') + 1);
                }else{
                    pagename = '';
                }
            }
        }
        if(typeof href === 'undefined') KFZ.url.pagename = pagename;
        return pagename;
    })();
    // hash
    (KFZ.url.getHash = function(){
        return (KFZ.url.hash = window.location.hash.substr(1).replace(/\?.*/g, ''));
    })();
    // query
    (KFZ.url.getQuery = function(){
        var i, paramsArr = window.location.search.substr(1).split('&'), params = {}, aParam;
        for (i = 0; i<paramsArr.length; i++){
            aParamArr = paramsArr[i].split('=');
            if (aParamArr[0].length) {
                params[aParamArr[0]] = decodeURI(aParamArr[1]);
            }
        }
        return (KFZ.url.query = params);
    })();
    callback && callback.call(this, KFZ.url);
})();

// AJAX-request
// @author lizixu <zixulee@163.com>
// @param options object 参数对象
// @param options.url string 请求路径
// @param options.data object 传入请求的参数对象
// @param options.async boolean 异步或同步，缺省为true（异步）
// @param options.noStatusCheck boolean 是否识别返回状态
// @param options.success function 正常返回成功处理器
// @param options.fail function 正常返回失败处理器
// @param options.error function 未正常返回处理器
// @param options.sucTip string 返回成功提示，未填则不提示
// @param options.failTip boolean/string 返回失败提示，false时不提示，为true或空时只提示后端返回的失败提示，赋值时则作为备选提示
// @param options.errTip string 未返回提示，未填则不提示
KFZ.ajax.request = function(method, options){
    var url = options.url,
        contentType = options.contentType || 'application/x-www-form-urlencoded', // 传递JSON时为：'application/json'
        data = contentType == 'application/json' ? JSON.stringify(options.data) : options.data,
        async = options.async === false ? false : true,
        cache = options.cache || false,
        timeout = options.timeout || 30000,
        dataType = options.dataType || 'text',
        noStatusCheck = options.noStatusCheck,
        has = options.has,
        hasnot = options.hasnot,
        sucTip = options.sucTip,
        failTip = options.failTip,
        errTip = options. errTip,
        success = options.success,
        fail = options.fail,
        error = options.error;
    return $.ajax({
        url: url,
        data: data,
        async: async,
        type: method,
        timeout: timeout,
        cache: cache,
        traditional: true,
        contentType: contentType,
        dataType: dataType,
        success: function(res, textStatus, jqXHR){
            try{
                res = JSON.parse(res);
            }catch(e){}
            var data = noStatusCheck ? res : res.data;
            if(res.status || noStatusCheck){
                sucTip && KFZ.ui.alertWin({result: 1, text: sucTip});
                if($.isArray(data)){
                    if(data.length){
                        has && has.call(this, data, res);
                    }else{
                        hasnot && hasnot.call(this, data, res);
                    }
                }
                success && success.call(this, data, res);
            }else{
                // 未登录
                if(res.errType == '1'){
                    KFZ.common.turnLogin && KFZ.common.turnLogin();
                    return;
                }
                if(failTip !== false){
                    failTip = failTip === true ? res.message : (res.message || failTip);
                    failTip && KFZ.ui.alertWin({result: 0, text: failTip});
                }
                fail && fail.call(this, res.message, data, res);
            }
        },
        error: function(jqXHR, textStatus, errThrown) {
            errTip !== false && (errTip || (errTip = KFZ.lang.kfz.dataRequestFail)) && KFZ.ui.alertWin({result: 0, text: errTip});
            error && error.call(this, errThrown);
        }
    });
};

// AJAX-GET/POST/PUT/DELETE/JSONP方法
$.each(['Get', 'Post', 'Put', 'Delete', 'Jsonp'], function(i, method){
    KFZ.ajax[method] = function(options) {
        return KFZ.ajax.request(method.toUpperCase(), options);
    };
});

// 拼装URL参数
// @author lizixu <zixulee@163.com>
// @param params object 参数对象
KFZ.util.assembleUrlParams = function(params){
    if(!params) return '';
    var paramsArr = [];
    for(var key in params){
        var value = params[key];
        if (value === null || value === undefined) {
            delete params[key];
            continue;
        }
        paramsArr.push(key + '=' + params[key]);
    }
    return paramsArr.join('&');
};

// 多对象绑定相同事件
// @author lizixu <zixulee@163.com>
// @param objArr 需要绑定事件的对象的数组
// @param evt 事件
// @param func 事件函数
KFZ.util.multiObjRun = function(obj, evt, func){
    if($.isArray(obj)){
        for(var i = 0, len = obj.length; i < len; i ++ ){
            $(document).undelegate(obj[i], evt).delegate(obj[i], evt, func);
        }
    }else if(typeof obj ==  'string'){
        $(document).undelegate(obj, evt).delegate(obj, evt, func);
    }
};

// 验证整数
// @author lizixu <zixulee@163.com>
KFZ.util.isInt = function(n){
    return /^((\d)|([1-9]\d*))$/.test(n);
};

// 验证自然数
// @author lizixu <zixulee@163.com>
KFZ.util.isNatural = function(n){
    return /^[1-9]\d*$/.test(n);
};

// 验证手机
KFZ.util.isMobile = function(n){
    return /^0?(13|14|15|17|18)[0-9]{9}$/.test(n);
};

// 验证电话（含手机）
KFZ.util.isTel = function(n){
    return /(^\d{10,12}$)|(^\d{7,8}$)|(^\d{3,4}-\d{7,8}$)|(^\d{3,4}-\d{7,8}-\d{1,4}$)|(^\d{7,8}-\d{1,4}$)/.test(n);
};

// 验证价格
// @author lizixu <zixulee@163.com>
// 规则：整数位不限，小数位不超过2位
KFZ.util.isPrice = function(n){
    return (/^(0|[1-9]\d*)(\.\d{1,2})?$/).test(n.toString());
};

// 格式化价格
// @author lizixu <zixulee@163.com>
KFZ.util.setPrice = function(n){
    if(!isNaN(n)){
        var arr = n.toString().split('.'),
            i = arr[0] || '0',
            f = arr.length > 1 ? arr[1] : '00',
            fLen = f.length;
        if(fLen < 3){
            n = i + '.' + (fLen > 1 ? f : fLen < 1 ? '00' : f + '0');
        }else if(fLen > 2){
            var s = f.substr(2, 1);
            f = f.substr(0, 2);
            if(s > 4){
                var t = '' + (parseInt(i + f, 10) + 1),
                    tLen = t.length;
                if(tLen > 2){
                    var tArr = t.split('').reverse();
                    tArr.splice(2, 0, '.');
                    n = tArr.reverse().join('');
                }else{
                    n = '0.' + (tLen > 1 ? t : '0' + t);
                }
            }else{
                n = i + '.' + f;
            }
        }
    }
    return n;
};

// 数组内对象序号
// @author lizixu <zixulee@163.com>
KFZ.util.index = function(arr, one){
    var type = typeof one;
    if(type === 'string' || type === 'number') return $.inArray(one, arr);
    var index = -1;
    $.isPlainObject(one) && $.each(arr, function(i, o){
        var isOne;
        $.each(one, function(key, val){
            if(o && o[key] === val){
                isOne = true;
            }else{
                return (isOne = false);
            }
        });
        if(isOne){
            index = i;
            return false;
        }
    });
    return index;
};

// 获取数组内对象
// @author lizixu <zixulee@163.com>
// @param multi {boolean} 是否匹配数组中的所有项
// @param deep {boolean} 是否深度匹配
KFZ.util.get = function(arr, obj, multi, deep){
    var result = multi ? [] : undefined;
    (function(arr){
        var self = arguments.callee;
        ($.isArray(arr) || $.isPlainObject(arr)) && $.each(arr, function(i, o){
            if(!($.isArray(o) || $.isPlainObject(o))) return;
            var isOne;
            if($.isPlainObject(o)){
                $.each(obj, function(key, val){
                    if(o[key] === val){
                        isOne = true;
                    }else{
                        return (isOne = false);
                    }
                });
                if(isOne){
                    if(multi){
                        result.push(o);
                    }else{
                        return !(result = o);
                    }
                }
            }
            if(deep && (multi || !isOne)){
                $.each(o, function(k, v){
                    self(v);
                });
            }
        });
    })(arr);
    return result;
};

// 移除数组内对象
// @author lizixu <zixulee@163.com>
// @param multi {boolean} 是否匹配数组中的所有项
KFZ.util.remove = function(arr, obj, multi){
    if(typeof obj === 'string'){
        for(var i = arr.length - 1; i > -1; i--){
            if(arr[i] === obj){
                arr.splice(i, 1);
                if(!multi){
                    break;
                }
            }
        }
    }else{
        if($.isArray(obj)){
            var self = arguments.callee;
            $.each(obj, function(i, subObj){
                self(arr, subObj, multi);
            });
        }else{
            for(var i = arr.length - 1; i > -1; i--){
                var o = arr[i], isOne;
                $.each(obj, function(key, val){
                    if(o && o[key] === val){
                        isOne = true;
                    }else{
                        return (isOne = false);
                    }
                });
                if(isOne){
                    arr.splice(i, 1);
                    if(!multi) break;
                }
            }
        }
    }
    return arr;
};

// 对象深度比对
// @author lizixu <zixulee@163.com>
// @param first {object} 比对对象之一
// @param second {object} 比对对象之二
KFZ.util.compare = function(first, second){
    var type = typeof first;
    // 类型不同
    if(arguments.length !== 2 || type !== typeof second) return false;
    // 类型相同，值相同
    if(first === second) return true;
    // 类型相同，值不同，也不是object类型
    if(type !== 'object') return false;
    // 类型相同，值不同，但是object类型
    var isSame = true,
        self = arguments.callee;
    // 比对first所有属性：包含值为undefined/null的属性
    $.each(first, function(fk, fv){
        var hasSameAttr;
        $.each(second, function(sk, sv){
            // 找到相同属性
            if(sk === fk){
                hasSameAttr = true;
                // 属性值不同
                if(fv !== sv){
                    var subType = typeof fv;
                    // 值的类型相同，且都为object
                    if(subType === typeof sv && subType === 'object'){
                        isSame = self(sv, fv);
                    }
                    // 值的类型不同或不是object
                    else{
                        isSame = false;
                    }
                }
                return false;
            }
        });
        // 找到相同属性
        if(hasSameAttr){
            // 属性值不同->退出：两者不同
            if(!isSame) return false;
            // 属性值相同->继续first的下一个属性的比对
        }
        // 未找到相同属性->退出：两者不同
        else{
            return (isSame = false);
        }
    });
    // 检测second除first所有属性外的属性->若有，则退出：两者不同
    isSame && $.each(second, function(sk, sv){
        var hasSameAttr;
        $.each(first, function(fk, fv){
            if(fk === sk){
                hasSameAttr = true;
                return false;
            }
        });
        // 未找到相同属性->退出：两者不同
        if(!hasSameAttr) return (isSame = false);
        // 找到相同属性->继续second的下一个属性的比对
    });
    // 返回比对结果
    return isSame;
};

// 处理history
// @author lizixu <zixulee@163.com>
KFZ.util.dealHistory = function(url, callback){
    if(!(KFZ.util.pushState = window.history.pushState)) return true;
    // 记录history
    KFZ.util.pushState.call(window.history, null, null, url);
    // 回调
    callback && callback.apply(null, arguments);
    return false;
};

// 字符转unicode
// @author lizixu <zixulee@163.com>
KFZ.util.charToUnicode = function(str) {
    if (!str) return '';
    var unicode = '', i = 0, len = (str = '' + str).length;
    for (; i < len; i ++) {
        unicode += 'k' + str.charCodeAt(i).toString(16).toLowerCase();
    }
    return unicode;
};

// unicode转字符
// @author lizixu <zixulee@163.com>
KFZ.util.unicodeToChar = function(unicode) {
    if (typeof unicode === 'undefined') return '';
    var str = '', arr = unicode.split('k'), i = 0, len = arr.length;
    for (; i < len; i ++) {
        var oneUnicode = arr[i], oneStr;
        if (!oneUnicode) continue;
        oneUnicode = parseInt(oneUnicode, 16).toString(10);
        oneStr = String.fromCharCode(oneUnicode);
        str += oneStr;
    }
    return str;
};

// Cookie操作方法
KFZ.util.cookie = function(name, value, options){
    if (typeof value != 'undefined') {
        options || (options = {});
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString();
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

// 表单验证
// @author lizixu <zixulee@163.com>
// @param items {array} 表单中需验证的各项集合
// @param item {object} items中的一项
// @param el {string|jq节点对象} 需验证项的对应节点
// @param errEl {string|jq节点对象} 需验证项的对应错误提示节点
// @param errClass {string} 添加到el节点上的错误样式类名
// @param sucClass {string} 添加到el节点上的正确样式类名
// @param checks {array} 需要验证的种类集合，如：[{type: 'min', condition: 10, errTip: '不能小于10！'}]
// @param methods {object} 补充的验证方法库，如：{max: function(val, condition, errTip, setErr, setSuc){}}
// @param others {array} 其他项自定义验证的集合，如：[{el: '', errEl: '', errTip: '', method: function(){}}]
// @param justCollect {boolean} 是否仅采集数据（不验证）
// @returns errNum {int} 错误项个数
KFZ.ui.formCheck = function(items, others, justCollect){
    var self = arguments.callee, errNum = 0;
    // 组件方法
    self.methods || (self.methods = {
        // 最小长度
        'lenMin': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? {val: condition} : condition;
            if((!condition.ifAny || val) && ($.isArray(val) ? val : typeof val === 'undefined' ? '' : $.trim('' + val)).length < condition.val) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 最大长度
        'lenMax': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? {val: condition} : condition;
            if((!condition.ifAny || val) && ($.isArray(val) ? val : typeof val === 'undefined' ? '' : $.trim('' + val)).length > condition.val) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 最小数值
        'min': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? {val: condition} : condition;
            if((!condition.ifAny || val) && +val < condition.val) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 最大数值
        'max': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? {val: condition} : condition;
            if((!condition.ifAny || val) && +val > condition.val) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 数值
        'number': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
            if((!condition.ifAny || val) && isNaN(val)) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 正数
        'positiveNumber': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
            if((!condition.ifAny || val) && (isNaN(val) || +val <= 0)) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 整数
        'int': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
            if((!condition.ifAny || val) && !KFZ.util.isInt(val)) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 自然数
        'natural': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
            if((!condition.ifAny || val) && !KFZ.util.isNatural(val)) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 价格：整数位不超过8位，小数位不超过2位
        'price': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
            if((!condition.ifAny || val) && !KFZ.util.isPrice(val)) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 手机号码
        'mobile': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
            if((!condition.ifAny || val) && !KFZ.util.isMobile(val)) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 电话号码
        'tel': function(val, condition, errTip, setErr, setSuc){
            condition = typeof condition !== 'object' ? condition === 'ifAny' ? {ifAny: 1} : {} : condition;
            if((!condition.ifAny || val) && !KFZ.util.isTel(val)) return (!setErr(errTip));
            setSuc && setSuc();
        },
        // 非必填 - 直接验证通过
        'pass': function(val, condition, errTip, setErr, setSuc){
            setSuc && setSuc();
        }
    });
    // 常规项验证
    items || (items = []);
    // 采集数据
    var data = {};
    $.each(items, function(key, item){
        var el = item.el,
            $el = typeof el === 'object' ? el : $(el);
        if(!$el.length) return;
        var errEl = item.errEl || $el.parent().siblings('.check_tip'),
            $errEl = typeof errEl === 'object' ? errEl : $(errEl),
            errClass = item.errClass || 'text_err',
            sucClass = item.sucClass || 'text_suc',
            checks = item.checks,
            methods = $.extend(self.methods, (item.methods || {})),
            val = typeof item.val === 'undefined' ? typeof $el.val() === 'undefined' ? '' : $.trim($el.val()) : typeof item.val === 'function' ? item.val() : item.val,
            setErr = item.setErr,
            setSuc = item.setSuc,
            discard = item.discard, // 不采集数据
            isErr = 0;
        if(setErr !== false){
            setErr || (setErr = function(errTip){
                // $el.removeClass(sucClass);
                ($el.is(':text') || $el.is(':password') || $el.is('textarea')) && $el.addClass(errClass);
                $errEl.removeClass('check_tip_info').removeClass('check_tip_suc').addClass('check_tip_err')
                    .find('.tip_err').html(errTip || '');
                return ++isErr;
            });
        }
        if(setSuc !== false){
            setSuc || (setSuc = function(sucTip){
                // $el.addClass(sucClass);
                ($el.is(':text') || $el.is(':password') || $el.is('textarea')) && $el.removeClass(errClass);
                $errEl.removeClass('check_tip_info').removeClass('check_tip_err').addClass('check_tip_suc')
                    .find('.tip_suc').html(sucTip || '');
            });
        }
        checks && checks.length && $.each(checks, function(i, check){
            var type = check.type,
                condition = check.condition,
                errTip = check.errTip,
                method = type === 'special' ? check.method : methods[type];
            // if($.isFunction(method)) return method.call(self, val, condition, errTip, setErr, setSuc, data);
            // 需求：不显示成功提示 - 2014.11.23
            if($.isFunction(method)) return method.call(self, val, condition, errTip, setErr, null, data);
        });
        errNum += isErr;
        !discard && (data[key] = val);
    });
    // 其他项验证
    others && $.each(others, function(key, method){
        if($.isFunction(method)){
            var res = method(data);
            res === false ? errNum++ : typeof res === 'undefined' ? '' : data[key] = res;
        }
    });
    // 返回错误或采集数据
    return errNum && !justCollect ? false : data;
};
// plupload 上传插件
// @author dongnan <dongyh@126.com>
// @param {String} id 上传按钮的id
// @param {Object} options
// @param {String} options.url 上传文件服务端url
// @param {String} options.autoUpload 是否自动上传，默认为 true
// @param {Object} options.data 随文件一起提交到服务器端的数据
// @param {String} options.fileDataName 提交到服务器端的文件上传域的名称，默认为'file'
// @param {Boolean} options.multi 是否允许一次上传多个，默认为true
// @param {string} options.fileType 文件类型后缀，缺省为：'jpg,jpeg,png,gif'
// @param {String} options.maxFileSize 上传文件大小限制 例如: '500kb','4mb'
// @param {String} options.listbox 标签id，用于显示待上传文件列表
// @param {Int} options.queueSizeLimit 单次上传队列个数限制
// @param {Function} options.init(up,params) 添加上传文件回调函数
// @param {Function} options.filesAdded(file) 多个上传文件被添加后回调函数
// @param {Function} options.fileAdded(file) 多个上传文件中的单个添加后回调函数
// @param {Function} options.uploadProgress(file) 文件上传中回调函数,用于处理上传进度
// @param {Function} options.fileError(file) 文件上传错误回调函数
// @param {Function} options.fileSuccess(res.data,res,file) 文件上传成功回调函数
// @param {Function} options.fileFail(res.message,res,file) 文件上传失败回调函数
// @param {Object} options ... 待完善
// @returns {Object} uploader plupload 对象,可通过 uploader.bind('someEvent',function(){}) 绑定一些事件
KFZ.ui.plupload = function(id, options){
    options || (options = {});
    (id.indexOf('#') === 0) && (id = id.substring(1));
    options.fileType || (options.fileType = 'jpg,jpeg,png,gif');
    options.listbox && (options.listbox.indexOf('#') !== 0) && (options.listbox = '#'+options.listbox);
    options.queueSizeLimit || (options.queueSizeLimit = 0);
    options.upType = 'html5,flash,html4';
    var uploader = new plupload.Uploader({
        runtimes: options.upType,
        browse_button: id,
        //container: 'item_edit_pic',
        url: options.url,
        multi_selection:options.multi === false ? false : true,
        max_file_size: options.maxFileSize || '500kb',
        multipart_params: options.data || {},
        file_data_name: options.fileDataName || 'file',
        filters: options.filters || [
            {title: 'Image files', extensions: options.fileType}
        ],
        //resize: {width: 1280, height: 1280, quality: 90},
        flash_swf_url: KFZ.url.host + 'js/common/plupload/Moxie.swf',
        silverlight_xap_url: KFZ.url.host + 'js/common/plupload/Moxie.xap'
    });
    options.init && uploader.bind('Init',options.init);
    uploader.init();
    uploader.bind('FilesAdded', function(up, files) {
        if(options.filesAdded && options.filesAdded(files) === false){
            uploader.splice(0, uploader.files.length);
            return;
        }
        if(files.length>options.queueSizeLimit){
            KFZ.ui.alertWin({result: 0, text: '单次上传个数不能超过'+options.queueSizeLimit+'个！'});
            $.each(files, function(i, file) {
                uploader.removeFile(file);
            });
        }else{
            $.each(files, function(i, file) {
                options.listbox && $(options.listbox).append('<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' + '</div>');
                options.fileAdded && options.fileAdded(file);
            });
            //默认为自动上传
            if(options.autoUpload !== false){
                uploader.start();
            }
        }
        up.refresh(); // Reposition Flash/Silverlight
    });
    uploader.bind('UploadProgress', function(up, file) {
        options.listbox && $('#' + file.id + " b").html(file.percent + "%");
        options.uploadProgress && options.uploadProgress(file);
    });
    uploader.bind('Error', function(up, err) {
        if(err.code === -600){
            KFZ.ui.alertWin({result: 0, text: '图片文件过大，请上传不超过' + options.maxFileSize + '的图片！'});
        }else if(err.code === -601){
            KFZ.ui.alertWin({result: 0, text: '图片格式错误，请上传' + options.fileType.toUpperCase() + '格式的图片。'});
        }else{
            options.fileError && options.fileError(err);
        }
        up.refresh(); // Reposition Flash/Silverlight
    });
    uploader.bind('FileUploaded', function(up, file, data) {
        if(options.listbox){
            $('#' + file.id + " b").html("100%");
            $('#' + file.id).fadeOut();
        }
        var res = JSON.parse(data.response);
        // 成功
        if(res.status){
            options.fileSuccess && options.fileSuccess(res.data, res, file);
        }
        // 失败
        else{
            options.fileFail && options.fileFail(res.message, res, file);
        }
    });

    return uploader;
};
// 路由
// @author lizixu <zixulee@163.com>
// @param args {object} 路由参数，如：{initialize: function(){}, routes: {'/': 'getIndex', 'default': 'getDefault'}, getIndex: function(){}, getDefault: function(){}}
KFZ.Router = function(args){
    if(!(this instanceof arguments.callee)) return new arguments.callee(args);
    this.init(args);
};
KFZ.Router.prototype = {
    constructor: KFZ.Router,
    init: function(args){
        if(!args || !args.routes) return;
        $.extend(this, args);
        // 绑定事件
        var that = this;
        $(window).hashchange(function(){
            that.setRoutes();
        });
        // 初始化触发
        $(window).trigger('hashchange');
    },
    setRoutes: function(){
        this.initialize && this.initialize.apply(null, arguments);
        var hash = window.location.hash.slice(1).replace(/^\/|\/$/, ''),
            routes = this.routes,
            router;
        for(var route in routes){
            // 匹配
            var routeStr = '/' + route.replace(/^\/|\/$/, '').replace(/\//, '\\\/') + '/',
                routeReg = eval(routeStr.replace(/:[\w-]+/g, '[\\\w-]+'));
            if(hash === route.replace(/^\/|\/$/, '') || (routeReg && routeReg.test(hash))){
                // 有路由处理器->执行处理器并退出
                if(router = routes[route]){
                    typeof router === 'function' ? router.apply(this, arguments) : (this[router] && this[router].apply(this, arguments));
                    return;
                }
                // 无路由处理器->跳出遍历继续走未匹配（默认）
                else{
                    break;
                }
            }
        }
        // 未匹配->检测默认
        var def = routes.def;
        def && typeof def === 'function' ? def.apply(this, arguments) : (this['default'] && this['default'].apply(this, arguments));
    }
};

// 视图及其扩展/事件
// @author lizixu <zixulee@163.com>
KFZ.add(['View', 'events']);
KFZ.View.extend = function(object){
    var F = function(){
        if(!(this instanceof arguments.callee)) return new arguments.callee();
        this.init();
    };
    F.prototype = {
        constructor: F,
        init: function(){
            var that = this;
            // 1-el-{string|object}视图节点选择器
            var $doc = $(document),
                el = this.el;
            if(!el){
                if(!(el = this.tagName)) return;
                el = this.el = '<' + el.replace(/^\<|(\/)*\>&/g, '') + ' />';
            }
            this.$el = $(el);
            // 2-initialize-{function}-初始化
            var initialize = this.initialize;
            initialize && initialize.apply(this, arguments);
            // 3-events-{object}-绑定事件
            var events = this.events;
            events && $.each(events, function(key, handler){
                setTimeout(function(){
                    if(!handler) return;
                    var evtArr = key.split(' '),
                        evts = evtArr.shift();
                    if(!evts || !evtArr.length) return;
                    $.inArray('body', evtArr) < 0 && evtArr.unshift(el);
                    var selector = evtArr.join(' '),
                        handlerName = '';
                    if(typeof handler === 'string'){
                        handlerName = handler;
                        handler = that[handler];
                    }
                    if(!handler || typeof handler !== 'function') return;
                    $.each(evts.split(','), function(i, evt){
                        if(handlerName){
                            var fullEventName = evt + '|' + selector.replace(/\s+/g, '~') + '|' + handlerName;
                            if(!KFZ.events[fullEventName]){
                                var isSameOne;
                                $.each(KFZ.events, function(existOne, hasHandler){
                                    var existArr = existOne.split('|');
                                    if(existArr.length < 3) return;
                                    var existEvt = existArr[0],
                                        existSelector = existArr[1].replace(/~/, ' '),
                                        existHandlerName = existArr[2];
                                    if(evt === existEvt && selector === existSelector && handlerName === existHandlerName){
                                        isSameOne = true;
                                        return false;
                                    }
                                });
                                if(!isSameOne){
                                    $.each(evt.split(','), function(i, e){
                                        $doc.on(e, selector, function(event){
                                            return handler.apply(that, arguments);
                                        });
                                    });
                                    KFZ.events[fullEventName] = true;
                                }
                            }
                        }else{
                            $.each(evt.split(','), function(i, e){
                                $doc.on(e, selector, function(event){
                                    return handler.apply(that, arguments);
                                });
                            });
                        }
                    });
                }, 0);
            });
        }
    };
    $.extend(F.prototype, object);
    return F;
};

// 模板
// @param str {string} 模板选择器ID
// @param data {object} 传入模板的数据对象
KFZ.tmpl = KFZ.template = (function(){
    var cache = {};
    return function tmpl(str, data){
        var fn = !/\W/.test(str) ? cache[str] || (cache[str] = tmpl(document.getElementById(str).innerHTML)) :
            new Function('o',
                "var p=[];" +
                "with(o){p.push('" +
                str.replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'") +
                "');}return p.join('');");
        return data ? fn(data) : fn;
    };
})();

/*
 *   WEB APP 常用组件
 *   author zhousg 20150722
 */
KFZ.add(['mobile']);
(function(){
    $.each(arguments[0], function(){
        KFZ.mobile[this] = function(args){
            if(!(this instanceof arguments.callee)) return new arguments.callee(args);
            this.init(args||{});
        };
    });
})(['Dialog','Alert','Sheet','Enter']);
KFZ.mobile.Dialog.prototype = {
    constructor:KFZ.mobile.Dialog,
    config:{
        width:300,
        height:400,
        BACK:'返回',
        TITLE:'温馨提示'
    },
    init:function(args){
       console.log(2222);
       console.log(args);
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.width = args.width || this.config.width;
        this.height = args.height || this.config.height ;

        this.left = (this.screenWidth - this.width)/2;
        this.top = (this.screenHeight - this.height)/2;
        this.transformY = this.screenHeight - this.top;

        this.BACK = args.BACK || this.config.BACK;
        this.TITLE = args.TITLE || this.config.TITLE;
        this.context = args.context || '';

        this.template();
        this.event();

    },
    template:function(){
        console.log(2222);
        console.log(4444444444);
        this.template  = '';
        if(!$('.kfz-overlay').length){
            this.template += '<div class="kfz-overlay"></div>'
        }
        this.template += '<div class="kfz-Dialog-view" style="display:block;top:'+this.screenHeight+'px;left:'+this.left+'px;">';
        this.template += '<div class="Dialog-tit"><a href="javascript:;">'+this.BACK+'</a><h3>'+this.TITLE+'</h3></div>';
        this.template += '<div class="Dialog-con">'+this.context+'</div></div>';

        $('body').append(this.template);
        $('.kfz-overlay').show();
        $('.kfz-Dialog-view').animate({translateY:'-'+this.transformY+'px'},300,'ease-out');
    },
    event:function(){
        var that = this;
        $('.kfz-Dialog-view').undelegate('.Dialog-tit a','tap').delegate('.Dialog-tit a','tap',function(){
            that.close();
        });
    },
    close:function(){
        $('.kfz-overlay').hide();
        $('.kfz-Dialog-view').animate({translateY:'0px'},300,'ease-in',function(){
            $(this).remove();
        });
    }
};
KFZ.mobile.Enter.prototype = {
    constructor:KFZ.mobile.Enter,
    config:{
        CANCEL:'取消',
        SUBMIT:'确认',
        TITLE:'温馨提示'
    },
    init:function(args){
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;

        this.CANCEL = args.CANCEL || this.config.CANCEL;
        this.SUBMIT = args.SUBMIT || this.config.SUBMIT;
        this.TITLE = args.TITLE || this.config.TITLE;
        this.context = args.context || '';

        this.template();
        this.event();

    },
    template:function(){
        this.template  = '';
        if(!$('.kfz-overlay').length){
            this.template += '<div class="kfz-overlay"></div>'
        }
        this.template += '<div class="kfz-Enter-view" style="display:block;top:0px;left:'+this.screenWidth+'px;" >';
        this.template += '<div class="Enter-tit"><a class="cancel" href="javascript:;">'+this.CANCEL+'</a><a class="submit" href="javascript:;">'+this.SUBMIT+'</a><h3>'+this.TITLE+'</h3></div>';
        this.template += '<div class="Enter-con">'+this.context+'</div></div>';

        $('.kfz-overlay').show();
        $('body').append(this.template);
        $('.kfz-Enter-view').animate({translateX:'-'+this.screenWidth+'px'},300,'ease-in');
    },
    event:function(){
        var that = this;
        $('.kfz-Enter-view').undelegate('.Enter-tit a.cancel','tap').delegate('.Enter-tit a.cancel','tap',function(){
            that.close();
        }).undelegate('.Enter-tit a.submit','tap').delegate('.Enter-tit a.submit','tap',function(){
            that.submit();
        }).swipeRight(function(){
            that.close();
        });
    },
    close:function(){
        $('.kfz-overlay').hide();
        $('.kfz-Enter-view').animate({translateX:'0px'},300,'ease-in',function(){
            $(this).remove();
        });
    },
    submit:function(){
        $('.kfz-overlay').hide();
        $('.kfz-Enter-view').animate({translateX:'0px'},300,'ease-in',function(){
            $(this).remove();
        });
    }
};
KFZ.mobile.Sheet.prototype = {
    constructor:KFZ.mobile.Sheet,
    config:{
        CANCEL:'取消',
        SUBMIT:'确认',
        TITLE:'温馨提示',
        height:400
    },
    init:function(args){
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.height = args.height || this.config.height;

        this.CANCEL = args.CANCEL || this.config.CANCEL;
        this.SUBMIT = args.SUBMIT || this.config.SUBMIT;
        this.TITLE = args.TITLE || this.config.TITLE;
        this.context = args.context || '';

        this.openAfter = args.openAfter;

        this.template();
        this.event();

    },
    template:function(){
        this.template  = '';
        if(!$('.kfz-overlay').length){
            this.template += '<div class="kfz-overlay"></div>'
        }
        this.template += '<div class="kfz-Sheet-view" style="display:block;top:'+this.screenHeight+'px;left:0px">';
        this.template += '<div class="Sheet-tit"><a class="cancel" href="javascript:;">'+this.CANCEL+'</a><a class="submit" href="javascript:;">'+this.SUBMIT+'</a><h3>'+this.TITLE+'</h3></div>';
        this.template += '<div class="Sheet-con">'+this.context+'</div></div>';

        $('.kfz-overlay').show();
        $('body').append(this.template);
        $('.kfz-Sheet-view').animate({translateY:'-'+this.height+'px'},300,'ease-in');
        this.openAfter && this.openAfter.call(this,$('.kfz-Sheet-view'));
    },
    event:function(){
        var that = this;
        $('.kfz-Sheet-view').undelegate('.Sheet-tit a.cancel','tap').delegate('.Sheet-tit a.cancel','tap',function(){
            that.close();
        }).undelegate('.Sheet-tit a.submit','tap').delegate('.Sheet-tit a.submit','tap',function(){
            that.submit();
        }).swipeRight(function(){
            that.close();
        });
    },
    close:function(){
        $('.kfz-overlay').hide();
        $('.kfz-Sheet-view').animate({translateY:'0px'},300,'ease-in',function(){
            $(this).remove();
        });
    },
    submit:function(){
        $('.kfz-overlay').hide();
        $('.kfz-Sheet-view').animate({translateY:'0px'},300,'ease-in',function(){
            $(this).remove();
        });
    }
};
KFZ.mobile.Alert.prototype = {
    constructor:KFZ.mobile.Alert,
    config:{
        width:100,
        height:40,
        timer:2000
    },
    init:function(args){
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.width = args.width || this.config.width;
        this.height = args.height || this.config.height ;

        this.left = (this.screenWidth - this.width)/2;
        this.top = (this.screenHeight - this.height)/2;
        this.timer = args.timer || this.config.timer;
        this.context = args.context || '提示';
        this.template();
    },
    template:function(){
        this.template  = '';
        if($('.kfz-Alert-view').length)$('.kfz-Alert-view').remove();
        this.template += '<div class="kfz-Alert-view">'+this.context+'</div>';
        if(!$('#kfz-Alert-view-style').length){
            this.template += '<style id="kfz-Alert-view-style" type="text/css">';
            this.template += '.kfz-Alert-view.open{';
            this.template += 'display:block;';
            this.template += 'width:'+this.width+'px;';
            this.template += 'height:'+this.height+'px;';
            this.template += 'top:'+this.top+'px;';
            this.template += 'left:'+this.left+'px;';
            this.template += '}';
            this.template += '</style>';
        }
        $('body').append(this.template);
        $('.kfz-Alert-view').addClass('open');
        if(this.TIMER)clearTimeout(this.TIMER);
        this.TIMER = setTimeout(function(){
            $('.kfz-Alert-view').fadeOut(200);
        },this.timer);
    }
};
KFZ.mobile.picScroll = function(args){
    if(!(this instanceof arguments.callee)) return new arguments.callee(args);
    this.init(args||{});
};
KFZ.mobile.picScroll.prototype = {
    constructor:KFZ.mobile.picScroll,
    config:{
        interval:2000,
        duration:400,
        func:'ease-out'
    },
    init:function(args){
        var that = this,
            interval = args.interval,
            duration = args.duration,
            func = args.func;
        if(!args.parent) throw new Error('args.parent is undefined');
        that.$parent = $(args.parent);
        if(that.$parent.length){
            that.$child = args.child?$(args.child):that.$parent.find('img');
            that.count = this.$child.length;
            that.width = this.$parent.width();
            that.index = 0;
            that.$parent.css({'width':that.width*that.count+'px','left':0,'position':'absolute'});
            that.$child.css({'width':that.width+'px'});
            if(args.pointBox){
                $(args.pointBox).css({'position':'relative'}).append(this.template());
            }else{
                that.$parent.parent().css({'position':'relative'}).append(this.template());
            }
            that.$point = $('._point').find('span');
            that.scroll();
            that.event();
        }
    },
    event:function(){
        var that = this;
        that.$parent.bind('swipeLeft','img',function(e){
            if(that.timer)clearInterval(that.timer);
            that.index++;
            that._animate();
            that.scroll();
        }).bind('swipeRight','img',function(e){
            if(that.timer)clearInterval(that.timer);
            that.index--;
            that._animate();
            that.scroll();
        });
    },
    scroll:function(){
        var that = this;
        if(that.timer)clearInterval(that.timer);
        that.timer = setInterval(function(){
            that.index++;
            that._animate();
        },that.config.interval);
    },
    _animate:function(){
        var that = this,L = 0;
        if(that.index >= that.count){
            this.index = 0;
            L = 0;
        }else if(that.index < 0){
            this.index = that.count - 1;
            L =  - this.index * this.width;
        }else{
            L = - this.index * this.width;
        }
        this.$point.css({'background':'#ccc'}).eq(this.index).css({'background':'#175096'});
        this.animate = that.$parent.animate({left:L+'px'},that.config.duration,that.config.func);
    },
    template:function(){
        var template  = '';
        template += '<div class="_point" style="bottom:0;left:0;position:absolute;z-index:10001;text-align:center;width:100%">';
        for(var i = 0 ; i < this.count ; i ++ ){
            template += '<span style="display:inline-block;border-radius:0.125rem;width:0.25rem;height:0.25rem;background:'+(i==0?'#175096':'#cccccc')+';margin:0.25rem;"></span>';
        }
        template += '</div>';
        return template;
    }
};
/*M组件库*/
KFZ.add(['mobile']);
(function(){
    $.each(arguments[0], function(){
        KFZ.mobile[this] = function(args){
            if(!(this instanceof arguments.callee)) return new arguments.callee(args);
            this.init(args||{});
            return this;
        };
    });
})(['Tip','Alert','Dialog','Sheet','Enter']);
KFZ.mobile.Tip.prototype = {
    constructor:KFZ.mobile.Tip,
    config:{
        width:'9rem',
        maxWidth:'15rem',
        minHeight:'1rem',
        timer:2000
    },
    init:function(args){
        var setting = this.setting = {},config = this.config,w = window;
        setting.W = w.innerWidth;
        setting.H = w.innerHeight;
        if(args && args.tipType == 1){
            setting.tipType = 1;
            setting.width = args.width || config.width;
            setting.minHeight = args.height || '4rem';
        }else{
            setting.width = args.maxWidth || config.maxWidth;
            setting.minHeight = args.height || config.minHeight;
        }
        setting.timer = args.timer || config.timer;
        setting.top = (setting.H - parseInt(setting.minHeight)* w.fontSize)/(2 * w.fontSize) + 'rem';
        setting.context = args.context || '';
        this.template();
    },
    template:function(){
        var setting = this.setting,
            template  = '',
            el = '.kfz-Tip-view',
            $el = $(el);
        if($el.length){
            $el.remove();
        }
        template += '<div class="kfz-Tip-view" style="display:none;top:'+setting.top+'">';
        if(setting.tipType && setting.tipType == 1){
            template += '<div class="kfz-Tip-view-con" style="max-width:'+setting.width+'">';
            template += '<span class="icon icon_suc"></span><p style="margin-bottom:0.5rem;font-size:0.6rem">'+setting.context+'</p></div></div>';
        }else{
            template += '<div class="kfz-Tip-view-con" style="max-width:'+setting.width+'">'+setting.context+'</div></div>';
        }

        $('body').append(template).css({position:'relative'});
        $el = $(el).show();
        $con = $el.find('kfz-Tip-view-con');
        if(this.TIMER)clearTimeout(this.TIMER);
        this.TIMER = setTimeout(function(){
            $('.kfz-Tip-view').fadeOut(200);
        },setting.timer);
    }
};
KFZ.mobile.Dialog.prototype = {
    constructor:KFZ.mobile.Dialog,
    config:{
        width:300,
        height:400,
        BACK:'返回',
        TITLE:'温馨提示'
    },
    init:function(args){
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        this.scrollY = window.scrollY;
        this.width = args.width || this.config.width;
        this.height = args.height || this.screenHeight-4*parseInt(window.fontSize);

        this.left = (this.screenWidth - this.width)/2;
        //this.top = (this.screenHeight - this.height)/2;
        this.top =   2*parseInt(window.fontSize);
        this.transformY = this.screenHeight - this.top;

        this.BACK = args.BACK || this.config.BACK;
        this.TITLE = args.TITLE || this.config.TITLE;
        this.context = args.context || '';
        this.afterOpen =  args.afterOpen || '';

        this.template();
        this.event();

    },
    template:function(){
        this.template  = '';
        if(!$('.kfz-overlay').length){
            this.template += '<div class="kfz-overlay"></div>'
        }
        this.conId = 'kfz-'+(Math.random().toString()).substr(2);
        this.template += '<div class="kfz-Dialog-view" style="display:block;top:'+(this.screenHeight+ this.scrollY) +'px;height:'+this.height+'px">';
        this.template += '<div class="Dialog-tit"><a class="icon" href="javascript:;"></a><h3>'+this.TITLE+'</h3></div>';
        this.template += '<div id="'+this.conId+'" class="Dialog-con">'+this.context+'</div></div>';

        $('body').append(this.template);
        $('.kfz-overlay').show();
        $('.kfz-Dialog-view').animate({translateY:'-'+this.transformY+'px'},300,'ease-out');
        this.elStr = '.kfz-Dialog-view';
        this.afterOpen && this.afterOpen.call(this,$(this.elStr));
    },
    event:function(){
        var that = this;
        $('.kfz-Dialog-view').undelegate('.Dialog-tit a','tap').delegate('.Dialog-tit a','tap',function(){
            that.close();
        });
    },
    close:function(){
        $('.kfz-overlay').hide();
        $('.kfz-Dialog-view').animate({translateY:'0px'},300,'ease-in',function(){
            $(this).remove();
        });
    }
};
KFZ.mobile.Alert.prototype = {
    constructor:KFZ.mobile.Alert,
    config:{
        autoSubmit:true,                             //自动提交关闭
        hasTit:true,                                  //是否有标题
        alertTit:'提示',                              //标题内容
        hasSubmitBtn:true,                            //是否有确定按钮
        submitBtn:'确定',                             //确定按钮内容
        hasCancelBtn:true,                            //是否有取消按钮
        cancelBtn:'取消',                             //取消按钮内容
        hasCloseBtn:true,                             //是否有关闭按钮
        alertCon:'暂无内容。'
    },
    init:function(args){
        var config = $.extend(this.config,args||{});     //配置
        this.screenWidth = window.innerWidth;          //浏览器显示宽度
        this.screenHeight = window.innerHeight;        //浏览器显示高度
        this.scrollY = window.scrollY;                 //当前位置
        this.maxHeight = config.height || this.screenHeight-4*parseInt(window.fontSize);   //弹窗最大可视高度
        this.top = this.screenHeight + this.scrollY;    //弹窗的定位TOP
        this.beforeOpen =  config.beforeOpen || '';
        this.afterOpen =  config.afterOpen || '';
        this.beforeClose =  config.beforeClose || '';
        this.afterClose =  config.afterClose || '';
        this.afterSubmit =  config.afterSubmit || '';

        this.template();

        this.event();

    },
    template:function(){
        var template = '', config = this.config , $parent = null , $win = null , that = this;;

        if($('.kfz-Alert-view').length)$('.kfz-Alert-view').remove();
        if(!$('.kfz-overlay').length) template += '<div class="kfz-overlay"></div>';

        template += '<div class="kfz-Alert-view" style="display:block;top:'+this.top+'px;max-height:'+this.maxHeight+'px;">';
        if(config.hasTit){
            template += '<div class="Alert-tit">'+config.alertTit+(config.hasCloseBtn?'<a href="javascript:;"></a>':'')+'</div>';
        }
        template +='<div class="Alert-con"><div class="Alert-con-box">'+config.alertCon+'</div></div>';
        if(config.hasSubmitBtn || config.hasCancelBtn){
            template += '<div class="Alert-btn">';
            if(config.hasCancelBtn) template += '<a href="javascript:;" class="cancel">'+config.cancelBtn+'</a>';
            if(config.hasSubmitBtn) template += '<a href="javascript:;" class="submit">'+config.submitBtn+'</a>';
            template += '</div>';
        }
        template += '</div>';

        if($('.kfz-layout').length){
            $parent = $('.kfz-layout').css('position','relative');
        }else{
            $parent = $('body').css('position','relative');
        }

        $parent.append(template);
        $parent.find('.kfz-overlay').show();
        $win = $parent.find('.kfz-Alert-view');
        this.$win = $win;

        this.beforeOpen && this.beforeOpen.call(that,$win);

        setTimeout(function(){
            var height =  $win.height() , transformY = 0;
            if(height >= that.maxHeight){
                var id = 'kfz-'+(Math.random().toString()).substr(2);
                $win.find('.Alert-con-box').css('height',that.maxHeight-5*window.fontSize+'px').attr('id',id);
                transformY = that.maxHeight + (that.screenHeight - that.maxHeight) / 2;
                that.scrollWarp = new iScroll(id);
            }else{
                transformY = height + (that.screenHeight - height) / 2;
            }
            $win.animate({translateY:'-'+transformY+'px'},300,'ease-out',function(){
                this.afterClose && this.afterClose.call(that,$win);
            });

        });

    },
    event:function(){
        var that = this,$win = that.$win;
        $win
            .undelegate('.Alert-tit a','tap').delegate('.Alert-tit a','tap',function(){
                that.close();
            })
            .undelegate('.Alert-btn a.submit','tap').delegate('.Alert-btn a.submit','tap',function(){
                that.submit();
            })
            .undelegate('.Alert-btn a.cancel','tap').delegate('.Alert-btn a.cancel','tap',function(){
                that.cancel();
            });
    },
    close:function(){
        var that = this,$win = that.$win;
        that.beforeClose && that.beforeClose.call(that,$win);
        setTimeout(function(){
            $('.kfz-overlay').hide();
            $win.animate({translateY:'0px'},300,'ease-in',function(){
                that.beforeClose && that.beforeClose.call(that,$win);
                $(this).remove();
            });
        });
    },
    submit:function(){
        var that = this,$win = that.$win;
        if(that.$win.find('.Alert-btn a.submit').hasClass('disabled')) return false;
        that.afterSubmit && that.afterSubmit.call(that,$win);
        if(that.config.autoSubmit){
            that.close();
        }else{
            that.$win.find('.Alert-btn a.submit').addClass('disabled');
        }
        return false;
    },
    cancel:function(){
        var that = this,$win = that.$win;
        $('.kfz-overlay').hide();
        $win.animate({translateY:'0px'},300,'ease-in',function(){
            $(this).remove();
        });
    },
    openSubmit:function(){
        var that = this,$win = that.$win;
        that.$win.find('.Alert-btn a.submit').removeClass('disabled');
    }
};