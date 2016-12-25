/**
 * Created by shiwz on 16-10-25.
 */

// 模板
// @param str {string} 模板选择器ID
// @param data {object} 传入模板的数据对象
window.PLAY = {};
PLAY.baseUrl =  location.protocol + '//' + location.host + '/';

// AJAX-request
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
PLAY.ajax = {};
PLAY.ajax.request = function(method, options){
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
            if(typeof res === "string"){
                res = JSON.parse(res);
            }
            if(res && res.State === 1){
                success && success.call(this, data, res);
            }else{
                fail && fail.call(this, data, res);
            }
        },
        error: function(jqXHR, textStatus, errThrown) {
            error && error.call(this, errThrown);
        }
    });
};

// AJAX-GET方法
PLAY.ajax.Get = function(options) {
    return PLAY.ajax.request('GET', options);
};

// AJAX-POST方法
PLAY.ajax.Post = function(options) {
    return PLAY.ajax.request('POST', options);
};

PLAY.url  = {};
PLAY.url.getQuery = function(){
    var i, paramsArr = window.location.search.substr(1).split('&'), params = {}, aParam;
    for (i = 0; i<paramsArr.length; i++){
        aParamArr = paramsArr[i].split('=');
        if (aParamArr[0].length) {
            params[aParamArr[0]] = decodeURI(aParamArr[1]);
        }
    }
    return params;
};


PLAY.parseDate = function(dateString) {
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)Z\s*$/,
        date = new Date(NaN), month,
        parts = isoExp.exec(dateString);
    if(parts) {
        month = +parts[2];
        date.setFullYear(parts[1], month - 1, parts[3]);//设置年份月份及日
        date.setHours(parts[4],parts[5],parts[6]);//设置时分秒
        if(month != date.getMonth() + 1) {
            date.setTime(NaN);
        }
    }
    return date;
};
