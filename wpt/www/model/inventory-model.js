

define(function(require,exports){
    var inventoryModel = {
        /*getItemsList 获取背包道具列表*/
        getItemsList:function(data,callback,failcallback,errorcallback){
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
        /*SelectUserInfo获取用户登录信息*/
        getUserInfo:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:PLAY.baseUrl+"UserInfo/SelectUserInfo",
                data:data,
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
        /*setName*/
        setName:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Get({
                url:PLAY.baseUrl+"UserInfo/ModifyUserInfo",
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
        /*emailAddress*/
        emailAddr:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:PLAY.baseUrl+"Passport/ToValidateEmail",
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
        /*password*/
        passWord:function(data,callback,failcallback,errorcallback){
            PLAY.ajax.Post({
                url:PLAY.baseUrl+"Passport/GetPwdLastModifiedDate",
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
    return inventoryModel;
});
/**
 * Created by shiwz on 16-12-2.
 */
