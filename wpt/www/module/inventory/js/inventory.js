
/*背包模块*/
require(["../../model/inventory-model"], function(inventoryModel) {
    var inventory = avalon.define("inventory", function(vm) {
        /*初始化信息*/
        vm.baseData = [
            "avatars","charms","emojis","items","tickets"
        ];
        vm.items = false;
        vm.tickets = false;
        vm.charms = false;
        vm.emojis = false;
        vm.avatars = true;
        vm.avatarDataIndex = "";
        vm.charmDataIndex = "";
        vm.navIndex = "";
        vm.currentEmojisClass = 'emojis_01';
        vm.showEmojis01 = true;
        vm.showEmojis02 = false;
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
        /**/
        var paramCommon = {"version":Math.random()};
        vm.init = function(){
            /*切换导航*/
            vm.tabClick();
            /*渲染头像信息*/
            vm.renderAvatarsInfo();
            /*渲染礼物信息*/
            vm.renderCharmsInfo();
            /*渲染门票信息*/
            vm.renderTicketsInfo();
            /*渲染表情信息*/
            vm.renderEmojisInfo();
            /*渲染道具信息*/
            vm.renderItemsInfo()
        };
        /*渲染头像信息*/
        vm.renderAvatarsInfo = function(){
            /* inventoryModel.getAvatarList(paramCommon,function(res){
             if(res.Value){
             inventory.avatarsData = res.Value;
             }
             },function(res){
             },function(res){
             });*/
            /* inventoryModel.getCharmList(paramCommon,function(res){
             if(res.Value){
             console.log(res.Value)
             }
             },function(res){
             },function(res){
             });
             inventoryModel.getAvatarList(paramCommon,function(res){
             if(res.Value){
             console.log(res.Value)
             }
             },function(res){
             },function(res){
             });
             inventoryModel.getTicketList(paramCommon,function(res){
             if(res.Value){
             console.log(res.Value)
             }
             },function(res){
             },function(res){
             });
             inventoryModel.getItemList(paramCommon,function(res){
             if(res.Value){
             console.log(res.Value)
             }
             },function(res){
             },function(res){
             });*/
            var data =   [
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                    "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/72x116.png",
                    "BigAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/190x311.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                    "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/72x116.png",
                    "BigAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/190x311.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                    "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                    "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/72x116.png",
                    "BigAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/190x311.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                    "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                    "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/72x116.png",
                    "BigAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/190x311.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                    "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/72x116.png",
                    "BigAvatarUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/190x311.png"
                },
                {
                    "AvatarId": 29,
                    "AvatarCode": "1006",
                    "AvatarName": "1006",
                    "SmallAvatarUrl": "https://image.playwpt.com/group1/M00/1B/61/wKgCy1cv83yD47JyAABWmEz0ZGg654.png",
                    "BigAvatarUrl": "https://image.playwpt.com/group1/M00/1A/DB/wKgCy1cYqgnZgEVtAAElHfnzyss534.png"
                }

            ];
            inventory.avatarsData = data;
            vm.scrollBar("avatars");
        };
        /*渲染礼物信息*/
        vm.renderCharmsInfo = function(){
            inventoryModel.getCharmList(paramCommon,function(res){
                if(res.Value){
                    inventory.avatarsData = res.Value;
                }
            },function(res){
            },function(res){
            });
            var data =   [
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://s02.ourgame.com.cn/g1/M00/1C/C4/wKgCy1ds8W7pd4FCAABR-2aVhS0781.png",
                    "largeUrl":"http://s02.ourgame.com.cn/g1/M00/41/09/wKgCyVds8XP99PljAACBWkWK0V0226.png"
                },
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/57x52.png",
                    "largeUrl":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/83x75.png"
                },
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://s02.ourgame.com.cn/g1/M00/1C/C4/wKgCy1ds8W7pd4FCAABR-2aVhS0781.png",
                    "largeUrl":"http://s02.ourgame.com.cn/g1/M00/41/09/wKgCyVds8XP99PljAACBWkWK0V0226.png"
                },
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/57x52.png",
                    "largeUrl":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/83x75.png"
                },
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://s02.ourgame.com.cn/g1/M00/1C/C4/wKgCy1ds8W7pd4FCAABR-2aVhS0781.png",
                    "largeUrl":"http://s02.ourgame.com.cn/g1/M00/41/09/wKgCyVds8XP99PljAACBWkWK0V0226.png"
                },
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/57x52.png",
                    "largeUrl":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/83x75.png"
                },
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://s02.ourgame.com.cn/g1/M00/1C/C4/wKgCy1ds8W7pd4FCAABR-2aVhS0781.png",
                    "largeUrl":"http://s02.ourgame.com.cn/g1/M00/41/09/wKgCyVds8XP99PljAACBWkWK0V0226.png"
                },
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/57x52.png",
                    "largeUrl":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/83x75.png"
                },
                {
                    "itemId":2382873,
                    "name":"Four Leaf Clover",
                    "url":"http://s02.ourgame.com.cn/g1/M00/1C/C4/wKgCy1ds8W7pd4FCAABR-2aVhS0781.png",
                    "largeUrl":"http://s02.ourgame.com.cn/g1/M00/41/09/wKgCyVds8XP99PljAACBWkWK0V0226.png"
                }


            ];
            inventory.charmsData = data;
        };
        /*点击头像*/
        vm.clickAvatars = function(index){
            vm.avatarDataIndex = index;
            var data =   inventory.avatarsData;
            for(var i=0;i<data.length;i++){
                if(i === index){
                    inventory.bigAvatarUrl = data[i].BigAvatarUrl;
                }
            }
        };
        /*点击礼物*/
        vm.clickCharm = function(index){
            vm.charmDataIndex = index;
            var data =   inventory.charmsData;
            for(var i=0;i<data.length;i++){
                if(i === index){
                    inventory.smallCharmUrl = data[i].url;
                }
            }
        };
        /*切换表情库*/
        vm.tabEmojis = function(param){
            inventory.showEmojis01 = false;
            inventory.showEmojis02 = false;
            vm.currentEmojisClass = param;
            if(param === "emojis_01"){
                inventory.showEmojis01 = true;
            }else{
                inventory.showEmojis02 = true;
            }
            vm.scrollBar("emojis");
        };
        /*点击表情*/
        vm.clickEmojis = function(index){
            console.log(index)
            var data =   [
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                }
            ];
            for(var i=0;i<data.length;i++){
                if(i === index){
                    inventory.bigEmojisUrl = data[i].BigEmojisUrl;
                }
            }
        };
        /*切换导航*/
        vm.tabClick = function(index,param){
            vm.items = false;
            vm.tickets = false;
            vm.charms = false;
            vm.emojis = false;
            vm.avatars = false;
            vm.navIndex = index;
            vm[param] =  true;
            vm.scrollBar(param);
        };
        /*渲染表情信息*/
        vm.renderEmojisInfo = function(){
            /* inventoryModel.getEmojisList(paramCommon,function(res){
             if(res.Value){
             inventory.avatarsData = res.Value;
             }
             },function(res){
             },function(res){
             });*/
            var data =   [
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                }, {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                }
                , {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                }

            ];

            var data2 =   [
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/137x139.png",
                },
                {
                    "AvatarId": 29,
                    "SmallEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                    "BigEmojisUrl": "http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/test74x76.png",
                },



            ];
            inventory.emojisData02 = data2;
            inventory.emojisData01 = data;
        };
        /*渲染门票信息*/
        vm.renderTicketsInfo = function(){
            /*  inventoryModel.getTicketList(paramCommon,function(res){
             if(res.Value){
             inventory.avatarsData = res.Value;
             }
             },function(res){
             },function(res){
             });*/
            var data = [
                {
                    "validTime":"2017-01-07T02:49:57Z",
                    "name":"vfvfvg",
                    "number":"1"
                },
                {
                    "validTime":"2017-01-07T02:49:57Z",
                    "name":"fffffffff",
                    "number":"3"
                },
                {
                    "validTime":"2017-01-07T02:49:57Z",
                    "name":"vfvfvg",
                    "number":"1"
                }

            ];
            /* 建立月份英文简称数组*/
            var monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            for(var i=0;i<data.length;i++){
                var date = PLAY.parseDate(data[i].validTime);
                var month = monthArray[date.getMonth()];
                var year =  date.getFullYear();
                var day  =  date.getDay() > 10 ? date.getDay():"0"+date.getDay();
                data[i].validTime = month+"."+day+"."+year;
            }
            inventory.ticketsData = data;
        };
        /*渲染道具信息*/
        vm.renderItemsInfo = function(){
            /*  inventoryModel.getItemList(paramCommon,function(res){
             if(res.Value){
             inventory.avatarsData = res.Value;
             }
             },function(res){
             },function(res){
             });*/
            var data = [
                {
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/items_01.png",
                    "name":"vfvfvg",
                    "number":"1"
                },
                {
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/items_02.png",
                    "name":"fffffffff",
                    "number":"3"
                },
                {
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/items_01.png",
                    "name":"vfvfvg",
                    "number":"1"
                },
                {
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/items_02.png",
                    "name":"fffffffff",
                    "number":"3"
                },
                {
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/items_01.png",
                    "name":"vfvfvg",
                    "number":"1"
                },
                {
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/items_01.png",
                    "name":"vfvfvg",
                    "number":"1"
                },
                {
                    "url":"http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/wpt/www/module/inventory/images/items_02.png",
                    "name":"fffffffff",
                    "number":"3"
                },



            ]
            inventory.itemsData = data;
        };
        /*样式处理*/
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
            title: "title_inventory",
            modal:"test",
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


