var demo = avalon.define("demo", function(vm) {
    var dialog;
    var data = "333333333333333";
    vm.data = [];
    /*初始化渲染*/
    vm.init = function(){
        var data = [];
        for(var i=0;i<20;i++){
            var te = {"name":"name","value":"测试数据"};
            data.push(te);
        }
        vm.data = data;
    };
    /*弹出框*/
    vm.$ssOpts = {
        title: "gg",
        modal:data,
        width:"1016px",
        onConfirm: function() {
            console.log("11111111111submit succe5ffff55ss !");
            vm.data = [{"item":"vfv","index":"111"}]
            avalon.scan();
        },
        onClose: function(){

        }
    };
    vm.$ggOpts = {
        title: "gg dialog,在ss dialog之上",
        showClose: false,
        width:"747px",
        smallDialog:true,
        onConfirm: function() {
            console.log("11111111111submit succe5ffff55ss !");
            vm.data = [{"item":"vfv","index":"111"}]
            avalon.scan();
        },
        onClose: function(){

        }
    };
    /*点击按钮*/
    vm.show = function( id ){
        avalon.vmodels[id].toggle = true;
    }
});
demo.init();
avalon.scan();
