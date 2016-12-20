

define(function(require,exports){
    var storeModel = {
        /*getItemsList 获取背包道具列表*/
        getItemList:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:"https://www.playwpt.com/WebAPI/UserInfo/GetItemsList",
                success:function(data,res){
                    if(res){
                        callback&&callback(res);
                    }
                },
                fail:function(data,res){
                    if(res){
                        failcallback && failcallback(res);
                    }
                },
                error:function(data,res){
                    errorcallback && errorcallback(res);
                }
            });
        },
        /*getAvatarList 获取头像列表*/
        getAvatarList:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Get({
                url:"https://avatar.playwpt.com/WebAPI/UserAvatar/GetPersonalAvatarList",
                data:data,
                dataType:"jsonp",
                jsonp: "callback",
                success:function(data,res){
                    if(res){
                        callback&&callback(res);
                    }
                },
                fail:function(data,res){
                    if(res){
                        failcallback && failcallback(res);
                    }
                },
                error:function(data,res){
                    errorcallback && errorcallback(res);
                }

            });
        },
        /* getTicketList 获取门票列表*/
        getTicketList:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:PLAY.baseUrl+"WebAPI/UserInfo/GetTicketList",
                data:data,
                success:function(data,res){
                    if(res){
                        callback && callback(res);
                    }
                },
                fail:function(data,res){
                    if(res){
                        failcallback && failcallback(res);
                    }
                },
                error:function(data,res){
                    errorcallback && errorcallback(res);
                }
            });
        },
        /* getCharmList 获取礼物列表*/
        getCharmList:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:PLAY.baseUrl+"WebAPI/UserInfo/GetCharmList",
                data:data,
                success:function(data,res){
                    if(res){
                        callback && callback(res);
                    }
                },
                fail:function(data,res){
                    if(res){
                        failcallback && failcallback(res);
                    }
                },
                error:function(data,res){
                    errorcallback && errorcallback(res);
                }
            })
        },
        /* getEmojisList 获取表情列表*/
        getEmojisList:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:PLAY.baseUrl+"WebAPI/UserInfo/getEmojisList",
                data:data,
                success:function(data,res){
                    if(res){
                        callback && callback(res);
                    }
                },
                fail:function(data,res){
                    if(res){
                        failcallback && failcallback(res);
                    }
                },
                error:function(data,res){
                    errorcallback && errorcallback(res);
                }
            })
        },
        /*设置幸运物*/
        selectCharm:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:PLAY.baseUrl+"WebAPI/UserInfo/SelectCharm",
                data:data,
                success:function(data,res){
                    if(res){
                        callback && callback(res);
                    }
                },
                fail:function(data,res){
                    if(res){
                        failcallback && failcallback(res);
                    }
                },
                error:function(data,res){
                    errorcallback && errorcallback(res);
                }
            })
        },
        /*设置当前头像*/
        setCurrentAvatar:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:PLAY.baseUrl+"WebAPI/UserAvatar/SetCurrentAvatar",
                data:data,
                success:function(data,res){
                    if(res){
                        callback && callback(res);
                    }
                },
                fail:function(data,res){
                    if(res){
                        failcallback && failcallback(res);
                    }
                },
                error:function(data,res){
                    errorcallback && errorcallback(res);
                }
            })
        }
    };
    return storeModel;
});
/**
 * Created by shiwz on 16-12-19.
 */
