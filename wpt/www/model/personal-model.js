/**
 * Created by liuhuan on 2016/11/16.
 */
var http_type=location.protocol+'//';
var baseUrl=http_type+"www.playwpt.com/WebAPI/";
define(function(require,exports){
  var _person={
    /*GetLoginUserInfo获取用户登录信息*/
    getLoginInfo:function(data,callback,failcallback,errorcallback){
      PLAY.ajax.Get({
        url:baseUrl+"Passport/GetLoginUserInfo",
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
    /*SelectUserInfo获取用户登录信息*/
    getUserInfo:function(data,callback,failcallback,errorcallback){
      PLAY.ajax.Post({
        url:baseUrl+"UserInfo/SelectUserInfo",
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
        url:baseUrl+"UserInfo/ModifyUserInfo",
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
        url:baseUrl+"Passport/ToValidateEmail",
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
        url:baseUrl+"Passport/GetPwdLastModifiedDate",
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
  exports.model=_person;
});
