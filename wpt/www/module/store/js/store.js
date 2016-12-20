
/*商城模块*/
require(["../../model/store-model"], function(storeModel) {
    var store = avalon.define("store", function(vm) {
        /* 初始化信息 */
        vm.baseData = ["gold","silver","items"];
        vm.baseData2 = ["avatars","charms","emojis","other"];
        vm.glod = false;
        vm.silver = false;
        vm.items = true;
        vm.avatars = false;
        vm.charms  = false;
        vm.emojis = true;
        vm.other = false;
        vm.smallNavIndex = "";
        vm.bigNavIndex = "";
        /*头像信息*/
        vm.avatarsData = [];
        vm.bigAvatarUrl = "";
        /*礼物信息*/
        vm.charmsData = [];
        vm.smallCharmUrl = "";
        /*表情信息*/
        vm.emojisData01 = [];
        vm.emojisData02 = [];
        vm.bigEmojisUrl = "";
        /*道具信息*/
        vm.itemsData = [];
        /*门票信息*/
        vm.ticketsData = [];
        /*公共参数*/
        var paramCommon = {"version":Math.random()};
        vm.init = function(){
            /*切换大导航*/
            vm.bigTabClick();
            /*切换小导航*/
            vm.smallTabClick();
        };
        /*切换大导航*/
        vm.bigTabClick = function(index,param){
            var baseData = vm.baseData;
            for(var i=0;i<baseData.length;i++){
                vm[baseData[i]] = false;
            }
            vm.bigNavIndex = index;
            vm[param] =  true;
           // vm.scrollBar(param);
        };
        /*切换小导航*/
        vm.smallTabClick = function(index,param){
            var baseData = vm.baseData2;
            for(var i=0;i<baseData.length;i++){
                vm[baseData[i]] = false;
            }
            vm.smallNavIndex = index;
            vm[param] =  true;
          //  vm.scrollBar(param);
        };
        /*有无滚动条样式处理*/
        vm.styleHandle = function($scrollPane,$li){
            var param = {
                "emojis":{
                    "showScroll":function(){
                        $scrollPane.css("paddingLeft","33px");
                        $li.css("marginRight","35px")
                    },
                    "hideScroll":function(){
                        $scrollPane.css("paddingLeft","36px");
                        $li.css("marginRight","43px");
                    }
                },
                "charms":{
                    "showScroll":function(){
                        $scrollPane.css("paddingLeft","20px");
                        $li.css("marginRight","12px")
                    },
                    "hideScroll":function(){
                        $scrollPane.css("paddingLeft","25px");
                        $li.css("marginRight","4%");
                    }
                },
                "avatars":{
                    "showScroll":function(){
                        $scrollPane.css("paddingLeft","20px");
                        $li.css("marginRight","12px")
                    },
                    "hideScroll":function(){
                        $scrollPane.css("paddingLeft","25px");
                        $li.css("marginRight","4%");
                    }
                },
                "items":{
                    "showScroll":function(){
                        $scrollPane.css("paddingLeft","16px");
                        $li.css("marginRight","45px");
                    },
                    "hideScroll":function(){
                        $scrollPane.css("paddingLeft","17px");
                        $li.css("marginRight","56px");
                    }
                },
                "tickets":{
                    "showScroll":function(){
                        return false;
                    },
                    "hideScroll":function(){
                        return false;
                    }
                }
            };
            return param;
        };
        /*滚动条效果*/
        vm.scrollBar = function(param){
            if(param){
                var $param = $('#'+param),$scrollPane = $param.find(".scroll-pane");
                $scrollPane.scrollBar({
                    scrollbarWidth: 37,
                    scrollbarMargin:0,
                    arrowHeight: 78
                });
                /*有无滚动条样式处理*/
                var $scrollBarTrack = $param.find(".scrollBarTrack");
                var $li = $scrollPane.find("li");
                if($scrollBarTrack.length){
                    vm.styleHandle($scrollPane,$li)[param].showScroll();
                }else{
                    vm.styleHandle($scrollPane,$li)[param].hideScroll();
                }
            }
        };
        /*弹出框*/
        vm.openDialog = {
            title: "title_store",
            modal:"store",
            width:"1016px",
            onOpen:function(){
                vm.init();
            },
            onConfirm: function() {
            },
            onClose: function(){
            }
        };
        /*点击按钮*/
        vm.show = function( id ){
            avalon.vmodels[id].toggle = true;
        }
    });
    avalon.scan();
});


