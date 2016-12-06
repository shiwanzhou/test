
require(["text!../../module/person/test.html","text!../../module/lobby/game.html","text!../../module/person2/test2.html","dialog/avalon.dialog","../js/jquery1.10.2",'domReady!'], function(sourceHTML,sourceHTML2,sourceHTML3,dialog,J) {
    /*配置模板html*/
    var  sourceHtml  = [sourceHTML2,sourceHTML,sourceHTML3];
    avalon.configSource(sourceHtml);
    /*配置对应模板js*/
    require(["../../common/js/scrollBar"]);
   // require(["../../module/person/js/personTest1"]);
    require(["../../module/person2/js/personTest2"]);

});