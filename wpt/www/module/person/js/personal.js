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
    name:'',
    email:'',
    address:'',
    country:'',
    city:'',
    state:'',
    postalcode:'',
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
    //-------------------获取用户信息----------------------
    gUserInfo:function(){
      per_model.getUserInfo("",function(res){
        var guideData=res.Value;
        personModel.name=guideData.FullName;
        personModel.address=guideData.AddrDetail;
        personModel.country=guideData.AddrCountry;
        personModel.city=guideData.AddrCity;
        personModel.state=guideData.AddrState;
        personModel.postalcode=guideData.AddrPostCode;
      })
    },
    //-------------------修改name----------------------
    editPostName:function(){
      per_model.setName("",function(res){
        var guideData=res.Value;
        console.log(guideData);
      });
    }


  });
  avalon.scan();//含有两个可选参数，1：扫描的起点元素 2：VM对象
});
