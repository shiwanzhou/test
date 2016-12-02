
//配置
require.config({
    baseUrl: '../../../',
    paths: {
        jquery: 'common/js/jquery1.10.2',
        avalon: "common/js/avalon",
        personModel: 'model/person-model',
        common: 'common/js/common'
    },
    priority: ['text', 'css'],
    shim: {
        jquery: {
            exports: "jQuery"
        },
        avalon: {
            exports: "avalon"
        }
    }
});
require(["jquery","common","personModel","avalon"], function(jq,common,pModel,j) {
        var model = pModel;
        var  personModel = avalon.define({
                 $id:"person",
                 isPersonal:true,
                 isBilling:false,
                 isAvatar:false,
                 isCharm:false,
                 isTicket:false,
                 isCloseName:false,
                 isClosePwd:false,
                 isCloseAddr:false,
                 isCloseCity:false,
                 isCloseSate:false,
                 fullName:"",
                 tabInit:function(){
                     personModel.isPersonal = false;
                     personModel.isBilling = false;
                     personModel.isAvatar = false;
                     personModel.isCharm = false;
                     personModel.isTicket = false;
                 },
                 /*tab 切换*/
                 clickTab:function(param){
                     personModel.tabInit();
                     if(param === "isPersonal"){
                         personModel.isPersonal = true;
                     }
                     if(param === "isBilling"){
                         personModel.isBilling = true;
                     }
                     if(param === "isAvatar"){
                         personModel.isAvatar = true;
                     }
                     if(param === "isCharm"){
                         personModel.isCharm = true;
                     }
                     if(param === "isTicket"){
                         personModel.isTicket = true;
                     }
                 },
                 /*点击修改name*/
                 editName:function(param){
                     if(param == "open"){
                         personModel.isCloseName = true;
                     }else{
                         personModel.isCloseName = false;
                     }
                 },
                 /*提交name*/
                 editPostName:function(){
                     var param  = {
                         "fullName":personModel.fullName
                     };
                     model._postName(param,function(res){
                         console.log(res)
                         personModel.isCloseName = false;
                     },function(res){
                     },function(res){
                     });
                 }
         });
});
