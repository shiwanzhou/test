/**
 * Created by Administrator on 15-11-5.
 */
/**
 * author zhousg
 * email 345313727@qq.com
 * date 2015-10-10
 */
$(function(){
    //初始化主视图
    new window.headerView();
    //初始化主视图
    var mainView = new window.mainView();
    //绑定浏览器前进后退
    $(window).bind("popstate", function(){
        mainView.hideFilter();
        mainView.render(1);
    });
});

/*头部视图*/
window.headerView = KFZ.View.extend({
    el:'body',
    initialize:function(){
        $(document).tap(function(e){
            var $tag = $(e.target);
            var flag = $tag.closest('header .nav');
            if(!flag.length && !$tag.is('header .nav_ico')){
                $('header .nav').hide();
                $('header .nav_ico').removeClass('open');
            }
        });
    },
    events:{
        'tap header .nav_ico':'openNav',
        'tap header .nav_ico.open':'closeNav',
        'tap header .up_icon':'closeNav'
    },
    openNav:function(e){
        setTimeout(function(){
            $('header .nav').show();
            $('header .nav_ico').addClass('open');
        },100);
    },
    closeNav:function(e){
        setTimeout(function(){
            $('header .nav').hide();
            $('header .nav_ico').removeClass('open');
        },100);
    }
});

// KFZ.page.key  异步渲染需要set
/*大搜索视图*/
window.mainView = KFZ.View.extend({
    el:'body',
    initialize:function(){
        //搜索框
        this.$searchBox = $('.result_search_box');
        //联想区
        this.$assBox = $('#result_search_ass');
        //筛选栏
        this.$filterBar = $('.result_filter_bar');
        //筛选项
        this.$filterBox = $('.result_filter_box');
        //结果区
        this.$contentBox = $('#result_search_con');

        //缓存联想数据
        if(!KFZ.page.sugWords)KFZ.page.sugWords = [];
        //初始化关键字
        KFZ.page.key = $.trim(this.$searchBox.find('input').val());

        this.paramDic = {           // 数据字典
            catNum:'cat_',	    // 分类编号
            isImg:'img_',	    // 图文 1 2
            nickName:'l',         // 作者
            press:'m',          // 出版社
            years:'n',          // 年代
            special1:'o',	    // 著录项1
            special2:'p',	    // 著录项2
            special3:'q',	    // 著录项3
            itemName:'s',       // 书名称
            price:'t',          // 店主昵称
            shopName:'r',       // 店铺名称
            order:'v',          // 排序
            pageNum:'w',        // 分页
            xkey:'x',          // 排除关键字
            key:'z',            // 关键字
            area:'u'            //地区
        }

        this.SEARCHURL = KFZ.sites.adapter.search + (/product/.test(location.pathname)?'product/':'');

        this.CURRENTURL = KFZ.url.host+ (/product/.test(location.pathname)?'product/':'');

        // 渲染图文
        this.$filterBar.find('.pic_word_box span').attr('class',/img_2/.test(location.pathname)?'s_icon_word':'s_icon_pic');

        KFZ.common.Mpage();

    },
    events:{
        'tap .s_icon_goBack':'eventBackHistory',                       //返回
        'focus .search_box_input input':'eventSearch',                 //去搜索
        'keyup .search_box_input input':'eventSubmit',                 //搜索
        'tap .search_box_input .icon_search':'eventSubmit',            //搜索
        'tap .search_box_input .s_icon_clear':'eventClear',            //清空
        'tap .result_search_box .btn_cancel':'eventCancel',            //取消
        'tap .ass_item li':'eventChangeAss',                           //选择联想输入

        'tap .result_filter_bar .flex_box_item':'eventChangeFilter',                //筛选栏 筛选项 事件
        'tap .result_filter_bar .pic_word_box':'eventChangePW',                     //筛选栏 图文切换 事件

        'tap .result_filter_box_order ul li a':'eventFilterOrder',
        'tap .result_filter_box_input .btn_submit':'eventFilterInputSubmit',
        'tap .result_filter_box_input .btn_reset':'eventFilterInputReset',
        'tap .result_filter_box_input .btn_area':'eventFilterChangeArea',
        'click .result_filter_box_cat a':'eventAjaxLoad',
        'click .kfz_page_box a':'eventAjaxLoad'
    },
    eventBackHistory:function(){
        location.href =  KFZ.sites.adapter.shop;
        return false;
    },
    eventSearch:function(e){
        var  $this =  $(e.currentTarget);
        $this.attr("placeholder","");
        var that = this;
        that.hideFilter();
        that.$searchBox.find('input').css('width','8rem').val(KFZ.page.key.replace(/（共\d*件商品）$/,''));
        that.$searchBox.find('.btn_cancel').show();
        that.$assBox.show();
        that.$filterBar.hide();
        that.$filterBox.hide();
        that.$contentBox.hide();
        that.getAss(function(val,sugWords){
            //记录联想记录
            if(sugWords && $.isArray(sugWords) && !KFZ.page.sugWords[val]){
                KFZ.page.sugWords[val] = sugWords;
            }
            that.renderAss(sugWords);
        });
        return false;
    },
    eventClear:function(){
        this.$searchBox.find('input').val('');
        return false;
    },
    eventCancel:function(){
        var that = this;
        that.$searchBox.find('input').removeAttr('style').blur().val(KFZ.page.key);
        that.$searchBox.find('.btn_cancel').hide();
        that.$assBox.hide();
        that.$filterBar.show();
        that.$filterBox.show();
        that.$contentBox.show();
        return false;
    },
    eventChangeAss:function(e){
        var that = this;
        that.$searchBox.find('input').val($.trim($(e.currentTarget).attr('data-key')));
        that.$searchBox.find('.btn_cancel').hide();
        that.$assBox.hide();
        that.$filterBar.show();
        that.$filterBox.show();
        that.$contentBox.show();
        /*获取新的url最后一级别参数*/
        var urlLastParam =  that.getNewUrl({z: $.trim($(e.currentTarget).attr('data-key'))});
        /*获取新url的pathname*/
        var pathArr = window.location.pathname.split("/");
        var firstLevelClass = "";
        if(pathArr[1] != "" && pathArr[1].substring(0,1) == "C"){
            firstLevelClass = pathArr[1];
        }
        var newPathName = firstLevelClass+"/"+urlLastParam;
        /*检测url是否改变,若改变重新请求数据*/
        that._rememberHistory(newPathName,function(){
            that.hideFilter();
            that.render(1);
        });
        return false;
    },
    eventSubmit:function(e){
        var that = this,
            e = e || window.event;
        if(e.keyCode == 13){
            e.preventDefault();
            /*获取新的url最后一级别参数*/
            var urlLastParam =  that.getNewUrl({z: $.trim($(e.currentTarget).val())});
            /*获取新url的pathname*/
            var pathArr = window.location.pathname.split("/");
            var firstLevelClass = "";
            if(pathArr[1] != "" && pathArr[1].substring(0,1) == "C"){
                firstLevelClass = pathArr[1];
            }
            var newPathName = firstLevelClass+"/"+urlLastParam;
            /*检测url是否改变,若改变重新请求数据*/
            that._rememberHistory(newPathName,function(){
                that.hideFilter();
                that.render(1);
            });
            return false;
        }
        that.getAss(function(val,sugWords){
            //记录联想记录
            if(sugWords && $.isArray(sugWords) && !KFZ.page.sugWords[val]){
                KFZ.page.sugWords[val] = sugWords;
            }
            that.renderAss(sugWords);
        });
        return false;
    },
    eventChangeFilter:function(e){
        var that = this,$this = $(e.currentTarget),bar = $this.attr('data-bar');
        $this.addClass("blue");
        $this.siblings(".flex_box_item").removeClass("blue");
        var top = $this.offset().top + $this.height() + 'px';
        if($this.find('.s_icon_down').length){
            $('.result_filter_box').css({'top':top}).children('div').hide();
            $('.result_filter_box_'+bar).show(320);
            var wh = $(window).height(),dh = $(document).height();
            var h = (wh>dh?wh:dh)- parseInt(top) + 'px';
            $('.kfz-mask-layer').css({'display':'block','top':top,'height':h});
            that.$filterBar.find('.s_icon_up').attr('class','s_icon_down');
            $this.find('.s_icon_down').attr('class','s_icon_up');
        }else{
            $('.result_filter_box').children('div').hide();
            $('.kfz-mask-layer').css('display','none');
            $this.find('.s_icon_up').attr('class','s_icon_down');
        }
        return false;
    },
    eventChangePW:function(e){
        var that = this,
            requestData = {};
        that.hideFilter();
        var isImg = $(e.currentTarget).find('.s_icon_pic').length?2:1;
        /*获取新的url最后一级别参数*/
        var urlLastParam = that._getParams().replace(/img_\d+/,'')+'img_'+isImg;
        /*获取新url的pathname*/
        var pathArr = window.location.pathname.split("/");
        var firstLevelClass = "";
        if(pathArr[1] != "" && pathArr[1].substring(0,1) == "C"){
            firstLevelClass = pathArr[1];
        }
        var newPathName = firstLevelClass+"/"+urlLastParam;
        /*检测url是否改变,若改变重新请求数据*/
        that._rememberHistory(newPathName,function(){
            that.hideFilter();
            that.render(1);
        });
        return false;
    },
    eventFilterOrder:function(e){
        var that = this,
            $this = $(e.currentTarget),
            name = $this.attr('data-name'),
            value = $this.attr('data-value');
        /*获取新的url最后一级别参数*/
        var urlLastParam = that._getParams().replace(/v\d+/,'')+'v'+value;
        /*获取新url的pathname*/
        var pathArr = window.location.pathname.split("/");
        var firstLevelClass = "";
        if(pathArr[1] != "" && pathArr[1].substring(0,1) == "C"){
            firstLevelClass = pathArr[1];
        }
        var newPathName = firstLevelClass+"/"+urlLastParam;
        /*检测url是否改变,若改变重新请求数据*/
        that._rememberHistory(newPathName,function(){
            that.hideFilter();
            that.render(1);
        });
        return false;
    },
    eventAjaxLoad:function(e){
        var that = this,$this = $(e.currentTarget),href = $this.attr('href');
        if(!href || href == 'javascript:;') return false;
        var url = href.replace(location.host,'').replace(/http:\/\/|https:\/\//,'');
        /*获取新的url最后一级别参数*/
        var urlLastParam = that._getParams('string',url);
        /*获取新url的pathname*/
        var pathArr = window.location.pathname.split("/");
        var firstLevelClass = "";
        if(pathArr[1] != "" && pathArr[1].substring(0,1) == "C"){
            firstLevelClass = pathArr[1];
        }
        var newPathName = firstLevelClass+"/"+urlLastParam;
        /*检测url是否改变,若改变重新请求数据*/
        that._rememberHistory(newPathName,function(){
            that.hideFilter();
            that.render(1);
        });
        e.stopPropagation();
        return false;
    },
    eventFilterInputSubmit:function(){
        var that = this,
            $params = that.$filterBox.find('.result_filter_box_input [data-name]'),
            paramDic = that.paramDic,
            requestData = {};
        $.each($params,function(k,v){
            var $this = $(this),
                name = $this.attr('data-name'),
                value = $.trim($this.val())||'';
            if(name == 'area'){
                value = $this.attr('data-value')||'';
            }
            if(name == 'price') return;
            requestData[paramDic[name]] = value;
        });
        var price = '',
            $price = $('[data-name=price]'),
            valS = $.trim($price?$price.eq(0).val():''),
            valE = $.trim($price?$price.eq(1).val():''),
            price = valS&&valE?(valS+'h'+valE):(valS&&!valE?(valS+'h'):(!valS&&valE?('h'+valE):''));
        if(price){
            requestData[paramDic['price']] = price;
        }
        /*获取新的url最后一级别参数*/
        var urlLastParam = that.getNewUrl(requestData);
        /*获取新url的pathname*/
        var pathArr = window.location.pathname.split("/");
        var firstLevelClass = "";
        if(pathArr[1] != "" ){
            firstLevelClass = pathArr[1];
        }
         var newPathName = firstLevelClass+"/"+urlLastParam;
        /*检测url是否改变,若改变重新请求数据*/
        that._rememberHistory(newPathName,function(){
            that.hideFilter();
            that.render(1);
        });
        return false;
    },
    eventFilterInputReset:function(){
        this.$filterBox.find('.result_filter_box_input [data-name]').val('');
        this.$filterBox.find('.result_filter_box_input [data-name=area]').attr('data-value','').html('不限');
        return false;
    },
    eventFilterChangeArea:function(e){
        var that = this,$this = $(e.currentTarget);
        var name = $this.html(),value = $this.attr('data-value');
        that.$filterBox.find('.result_filter_box_input [data-name=area]').attr('data-value',value).html(name);
        return false;
    },
    render:function(isNeedFilterList){
        /*传递url最后一级的参数*/
        var that = this,paramsStr = that._getParams();
        that.getData(function(){
            /*通过新url的地址获取用户操作数据*/
            var requestData = that.getRequestDataByUrl(),
                data = KFZ.page.searchData;
            // 渲染内容
            that.$contentBox.html(KFZ.template('template_con',{model:data}));
            if(isNeedFilterList){
                // 渲染分类
                that.$filterBox.find('.result_filter_box_cat').html(KFZ.template('template_filter',{model:data}));
            }
            // 渲染筛选输入框
            var $inputs = that.$filterBox.find('.result_filter_box_input').find('[data-name]');
            $.each($inputs,function(){
                var $input = $(this),name = $input.attr('data-name');
                if(name == 'price') return;
                if(name == 'area'){
                    $input.attr('data-value',requestData.area);
                    if(!requestData.area)$input.html('不限');
                    else $input.html($('[data-value='+requestData.area+']').html());
                }else{
                    $input.val(requestData[name]||'');
                }
            });
            var price = requestData.price?requestData.price.split('h'):'';
            var $price = $('[data-name=price]');
            $price.eq(0).val(price && price[0]?price[0]:'');
            $price.eq(1).val(price && price[1]?price[1]:'');
            // 头部输入框
            if(requestData.key){
                var val = requestData.key+'（共'+(data.productList.total_found||'0')+'件商品）';
                KFZ.page.key = val;
                that.$searchBox.find('input').val(val).blur();
            }
            // 渲染排序
            var $order = $('.result_filter_box_order ul li').removeClass('now').eq(parseInt(requestData.order||'0')).addClass('now');
            // 渲染分页
            $('.kfz_page_box').html(KFZ.template('template_page',{pageCtrl:data.pageCtrl}));
            // 渲染图文
            that.$filterBar.find('.pic_word_box span').attr('class',/img_2/.test(paramsStr)?'s_icon_word':'s_icon_pic');
            //模糊
            if(data.fuzzyWord && data.fuzzyWord.key){
                $('.result_search_vague').show().find('span').html(data.fuzzyWord.key||'');
                $('.result_search_vague').show().find('i').html(data.fuzzyWord.total||'');
            }else{
                $('.result_search_vague').hide().find('span').html('');
                $('.result_search_vague').hide().find('i').html('');
            }
            //更新title
            document.title = data.mataInfo.title;
        },paramsStr,isNeedFilterList);
        return false;
    },
    getNewUrl:function(requestData){
        var params = this._getParams('array'),
            requestData = requestData == undefined ?{} :requestData;
        for (var k in requestData) {
            var fpk = requestData[k],
                hasIt = 0;	                    // 判断是否地址栏里已存在此参数的标识位
            if (fpk === undefined) continue;	// 当fpk为undefined时
            for (var i = 0; i < params.length; i ++) {
                var op  = params[i],
                    opk = op.substr(0, 1);
                if (op === "cat_") continue;
                // 去分页参数
                if (opk === "w") {
                    params[i] = "";
                    continue;
                }
                // 判断是否地址栏里已存在此参数
                if (opk === k) {
                    if (fpk === "") {
                        params[i] = "";
                    } else {
                        if( k=='t' || k == 'u'){
                            params[i] = k + fpk;
                        }else{
                            fpk = KFZ.util.charToUnicode(fpk);
                            var isLM = /l|m/.test(k);
                            if (op.substr(1).replace(/[\d]*h/, "") !== fpk) {	// 判断其值是否有改动
                                params[i] = k + (isLM ? "h" : "") + fpk;
                            }
                        }
                    }
                    hasIt = 1;
                    break;
                }
            }
            if (!hasIt) {
                if (fpk === "") {
                    params[params.length] = "";
                } else {
                    if( k=='t' || k == 'u'){
                        params[params.length] = k + fpk;
                    }else {
                        fpk = KFZ.util.charToUnicode(fpk);
                        var isLM = /l|m/.test(k);
                        params[params.length] = k + (isLM ? "h" : "") + fpk;
                    }
                }
            }
        }
        var pathname = params.join("");
        return pathname;
    },
    getRequestDataByUrl:function(){
        var params = this._getParams('array'),
            paramDic = this.paramDic,
            requestData = {};
        params && $.each(params,function(i,item){
            var op  = params[i],
                opk = op.substr(0, 1),
                value = '';
            if (op.match('cat_')) return;
            if (op.match('img_')) opk = 'img_';

            if( opk =='t' || opk == 'u' || opk == 'v' || opk == 'w'){
                value = op.substr(1);
            }else if(opk == 'img_'){
                value = op.replace('img_','');
            }else{
                value = op.substr(1);
                if(/l|m/.test(opk)){
                    value = value.replace(/[\d]*h/, "");
                }
                if(value) value = KFZ.util.unicodeToChar(value);
            }
            var key = KFZ.common.getKey(paramDic,opk);
            if(key)requestData[key] = value;
        });
        return requestData;
    },
    getData:function(callback,params,isNeedFilterList){
        var data = {type: 1, params: params};
        var pathname  = window.location.pathname;
        var pathArr = pathname.split("/");
        /*book域若有分类则传递cat参数，通过域名一级分类以C开头区分*/
        if(pathArr[1] != "" && pathArr[1].substring(0,1) == "C"){
            pathArr[1] = pathArr[1].replace(pathArr[1].substring(0,1),"");
            var catParam = pathArr[1];
        }
        if(catParam){
            data = {type: 1, params: params,cat:catParam};
        }
        if(isNeedFilterList) {
            data["isNeedFilterList"] = 1;
        }
        var host = window.location.host;
        if(!host.match(/search/g)){//如果不是搜索域需要加上参数cat
            var cat = params.match(/(C[0-9a-z]*\/)/g);
            if (cat && cat.length) {
                cat = cat[0];
                if(cat){
                    cat = cat.replace(/\//, "").replace(/C/, "");
                    data["cat"] = cat;
                }
            }
        }
        // 发送请求
        $.ajax({
            url:  KFZ.url.host + 'product/',
            data:data,
            success: function(data){
                var data = JSON.parse(data);
                if(data){
                    KFZ.page.searchData = data;
                    callback && callback(data);
                }
            },
            error:function(){
                KFZ.mobile.Tip({content: "搜索失败！"});
            }
        });
    },
    renderAss:function(sugWords){
        this.$assBox.html(KFZ.template('template_ass',{model:sugWords}));
    },
    getAss:function(callback){
        var val = $.trim(this.$searchBox.find('input').val());
        if(!val) return false;
        //如果记录中有数据之间回调
        if(KFZ.page.sugWords[val]){
            callback(val, KFZ.page.sugWords[val]);
            return false;
        }
        //如果有定时任务先清除
        if(KFZ.page.timer) clearTimeout(KFZ.page.timer);
        KFZ.page.timer = setTimeout(function(){
            $.ajax({
                url: KFZ.url.host + 'sug/suggest_server.jsp',
                data: {query: val},
                type: 'GET',
                timeout: 5000,
                dataType: 'script',
                success: function(){
                    try{
                        sugWords && callback(val, sugWords);
                    }catch(e){}
                }
            });
        },150);
    },
    hideFilter:function(){
        //隐藏筛选项
        var that = this;
        setTimeout(function(){
            that.$filterBox.children('div').hide();
            $('.kfz-mask-layer').css('display','none');
            that.$filterBar.find('.s_icon_up').attr('class','s_icon_down');
        },320);

    },
    /*得到url的param*/
    _getParams:function(type,url){
        var pathname = window.location.pathname;
        if(url && url != undefined){
            pathname = url;
        }
        pathname = pathname.replace(/\/product\//, "");      //对当前url适配，防止url未修改，针对product
        pathname = pathname.replace(/v6g0/, "");      //对当前url适配，防止url未修改，针对product
        pathname = pathname.replace(/\/author\//, "");       //对当前url适配，防止url未修改，针对author
        pathname = pathname.replace(/(C[0-9a-z]*\/)/g,"");   //去除一级分类
        pathname = pathname.replace(/\/$/, "");
        pathname = pathname.replace(/^\//, "");
        //根据所需类型返回
        if(type && type == 'array'){
            pathname = pathname.toLowerCase()
                .replace(/(cat_|img_|[l-z])/ig, '-$1')
                .replace(/ca-t_/, 'cat_')
                .replace(/^-/, '');
                return pathname?pathname.split('-'):[];
        }else{
            return pathname || "";
        }
    },
    /*记录历史*/
    _rememberHistory:function(params,callback){
        /*若url改变修改url地址，否则用原先的地址*/
        var url = KFZ.url.host + (!params?params:params + "/");
        var isnotH5 = KFZ.util.dealHistory(url, function() {
            callback && callback();
        });
        if(isnotH5){
            location.href = url;
            return false;
        }
    }


});
KFZ.common.getKey = function(Obj,value){
    var key = '';
    if(Obj && value){
        $.each(Obj,function(k,v) {
            if (v == value) {
                key = k||'';
                return;
            }
        });
    }
    return key;
}
//分页效果小工具
KFZ.common.Mpage = function(el){
    var $el = $('.kfz_page_box'),timer = '',that = this;
    $(el?el:'#result_search_con').on('touchstart MSPointerDown pointerdown',function(e){
        that.touchStartY = e.targetTouches[0].clientY;
        e.stopPropagation();
    });
    $(el?el:'#result_search_con').on('touchmove MSPointerMove pointermove',function(e){
        if(that.touchRun)clearTimeout(that.touchRun);
        that.touchRun = setTimeout(function(){
            if(that.touchStartY > e.targetTouches[0].clientY){
                $el.show().siblings('.kfz_page_box_top').show();
            }else{
                $el.hide().siblings('.kfz_page_box_top').hide();
            }
        }, 100);
        e.stopPropagation();
    });
};