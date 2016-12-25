/**
 * Created by liuhuan on 2016/11/16.
 */
require.config({
  baseUrl:"../../",
  paths:{
    jquery:"common/js/jquery1.10.2",
    personModel:"model/personal-model",
    avalon:"common/js/avalon",
    common:"common/js/common"
  },
  shim:{
    avalon:{exports:"avalon"}
  }
});
require(['jquery','personModel','avalon','common'],function(jq,perModel,ava,common){
  var per_model=perModel.model;
  var personModel=avalon.define({
    $id:'personal',
    show_info: true,//个人信息
    show_txt: false,//个人信息修改文本框
    show_edit: true,//edit按钮

    name:'',
    email:'',
    address:'',
    country:'',
    city:'',
    state:'',
    postalcode:'',
aaa:'test',
    show_erro:'',
    focus:function(){
     this.selected=true;
    },
    blur:function(){
      personModel.set_name();
    },
    //-------------------获取登录信息----------------------
    getLoginInfo:function(){
      per_model.getLoginInfo("",function(res){
        var guideData=res.Value;
        if(guideData&& guideData.IsLogined==true){
          personModel.email=guideData.Email;//获取用户email地址
          personModel.gUserInfo();//如果登录成功则调用获取用户信息
        }
      })
    }(),
    show_change:function(param){
      if(param=='txt_name'){
        personModel.show_info=false;//隐藏个人信息
        personModel.show_txt=true;//显示修改文本框
        personModel.show_edit=false;//隐藏edit按钮
        personModel.focus();
      }
    },
    //-------------------获取用户信息----------------------
    gUserInfo:function(){
      per_model.getUserInfo("",function(res){
        var guideData=res.Value;
        if(guideData.FullName==""||guideData.FullName==null){
          personModel.name='';
        }else{
          personModel.name=guideData.FullName;
        }
        var shwo_addr=guideData.AddrDetail;
        if(shwo_addr!=""&&shwo_addr!=null){
          shwo_addr=personModel.htmlDecodeByRegExp(shwo_addr);//地址解码
          if(shwo_addr.length>30){
            shwo_addr=shwo_addr.substring(0,30)+"...";
            personModel.address=shwo_addr;
          }else{
            personModel.address=shwo_addr;
          }
        }else{
          personModel.address='';
        }
        if(guideData.AddrCountry==""||guideData.AddrCountry==null){
          personModel.country='';
        }else{
          personModel.country=guideData.AddrCountry;
        }
        if(guideData.AddrCity==""||guideData.AddrCity==null){
          personModel.city='';
        }else{
          personModel.city=guideData.AddrCity;
        }
        if(guideData.AddrState==""||guideData.AddrState==null){
          personModel.state='';
        }else{
          personModel.state=guideData.AddrState;
        }
        if(guideData.AddrPostCode==""||guideData.AddrPostCode==null){
          personModel.postalcode='';
        }else{
          personModel.postalcode=guideData.AddrPostCode;
        }
      })
    },
    //-------------------修改name----------------------
    set_name:function(){
      var txt_name=$("#txt_name").val();
      if(txt_name==null||txt_name==""){
        personModel.show_erro='Please input your Name.';
      }else{
        personModel.editPostName(txt_name);
      }
    },
    editPostName:function(txt_name){
      per_model.setName(txt_name,function(res){
        var guideData=res.Value;
        personModel.show_info=true;//显示个人信息
        personModel.show_txt=false;//隐藏修改文本框
        personModel.show_edit=true;//显示edit按钮
        personModel.name=personModel.htmlEncodeByRegExp(txt_name);
        console.log(guideData);
      });
    },
        /*1.用正则表达式实现html转码*/
        htmlEncodeByRegExp:function (str){
             var s = "";
             if(str.length == 0) return "";
             s = str.replace(/&/g,"&amp;");
             s = s.replace(/</g,"&lt;");
             s = s.replace(/>/g,"&gt;");
             s = s.replace(/ /g,"&nbsp;");
             s = s.replace(/\'/g,"&#39;");
             s = s.replace(/\"/g,"&quot;");
             return s;
       },
       /*2.用正则表达式实现html解码*/
       htmlDecodeByRegExp:function (str){
             var s = "";
             if(str.length == 0) return "";
             s = str.replace(/&amp;/g,"&");
             s = s.replace(/&lt;/g,"<");
             s = s.replace(/&gt;/g,">");
             s = s.replace(/&nbsp;/g," ");
             s = s.replace(/&#39;/g,"\'");
             s = s.replace(/&quot;/g,"\"");
             return s;
       }

  });
  avalon.scan();//含有两个可选参数，1：扫描的起点元素 2：VM对象
});
