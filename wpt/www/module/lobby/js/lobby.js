
require(["text!../../module/person/account.html","text!../../module/lobby/game.html","text!../../module/person2/test2.html","text!../../module/inventory/index.html","dialog/avalon.dialog","../js/jquery1.10.2",'domReady!'], function(sourceHTML,sourceHTML2,sourceHTML3,inventoryHtml,dialog,J) {
    /*配置模板html*/
    var  sourceHtml  = [sourceHTML2,sourceHTML,sourceHTML3,inventoryHtml];
    avalon.configSource(sourceHtml);
    /*配置对应模板js*/
    require(["../../common/js/common"]);
    require(["../../common/js/scrollBar"]);
    require(["../../module/person/js/person_popup"]);//个人中心弹窗
    require(["../../module/person2/js/personTest2"]);
    require(["../../module/inventory/js/inventory"]);

});
