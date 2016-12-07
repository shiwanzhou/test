
/*背包模块*/
require(["../../model/inventory-model"], function(inventoryModel) {
    var inventory = avalon.define("inventory", function(vm) {
        /*初始化信息*/
        vm.items = false;
        vm.tickets = false;
        vm.charms = false;
        vm.emojis = false;
        vm.avatars = true;
        vm.avatarsNow = "now";
        vm.charmsNow = "";
        vm.itemsNow = "";
        vm.emojisNow = "";
        vm.ticketsNow = "";
        vm.toggleAvatars = true;
        vm.dataIndex = 1;
        vm.init = function(){
            /*切换导航*/
            vm.tabClick();
            /*获取背包道具列表*/
            console.log("准备获取背包道具列表1")
            vm.getTicketsInfo();
            /*点击头像*/
            vm.clickAvatars();
            /*点击礼物*/
            vm.clickCharm();
           /* inventoryModel.getItemsList("",function(res){
                console.log(res)
            },function(res){
            },function(res){
            })*/
        };
        vm.renderAvatars = function(){
             var data =   [
                    {
                        "AvatarId": 29,
                        "AvatarCode": "1006",
                        "AvatarName": "1006",
                        "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                        "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png",
                        "IsCurrentAvatar": true,
                        "UserId": 5,
                        "RoleName": "tanhongsing",
                        "LzAccount": "w~43128689181594316",
                        "CreatedOnUtc": "2016-06-13 02:29:42",
                        "CreatedOnBias": 480.0
                    },
                 {
                     "AvatarId": 29,
                     "AvatarCode": "1006",
                     "AvatarName": "1006",
                     "SmallAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/72x116.png",
                     "BigAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/190x311.png",
                     "IsCurrentAvatar": true,
                     "UserId": 6,
                     "RoleName": "tanhongsing",
                     "LzAccount": "w~43128689181594316",
                     "CreatedOnUtc": "2016-06-13 02:29:42",
                     "CreatedOnBias": 480.0
                 }
                ];

        };
        /*点击头像*/
        vm.clickAvatars = function(index){
            vm.dataIndex = index;
        };
        /*点击礼物*/
        vm.clickCharm = function(index){
            vm.dataIndex = index;
        };
        /*切换导航*/
        vm.tabClick = function(param){
            vm.items = false;
            vm.tickets = false;
            vm.charms = false;
            vm.emojis = false;
            vm.avatars = false;
            vm.avatarsNow = "";
            vm.charmsNow = "";
            vm.itemsNow = "";
            vm.emojisNow = "";
            vm.ticketsNow = "";
            vm[param] = true;
            vm[param+"Now"] = "now";
            vm.scrollBar(param);
        };
        /*获取门票数据并渲染*/
        vm.getTicketsInfo = function(){


        };
        /*滚动条效果*/
        vm.scrollBar = function(param){
            if(param){
                $('#'+param).find(".scroll-pane").scrollBar({
                    scrollbarWidth: 37,
                    scrollbarMargin:0,
                    arrowHeight: 78
                });
            }
        };
        /*弹出框*/
        vm.openDialog = {
            title: "title_inventory",
            modal:"test",
            width:"1016px",
            onOpen:function(){
                vm.scrollBar("avatars");
                vm.init();
            },
            onConfirm: function() {

            },
            onClose: function(){
                console.log("close!");
            }
        };
        /*点击按钮*/
        vm.show = function( id ){
            avalon.vmodels[id].toggle = true;
        }
    });
    avalon.scan();
});


