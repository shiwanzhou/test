
    var demo2 = avalon.define("demo2", function(vm) {
        var dialog;
        var data = "66666666666666666";
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
            onOpen:function(){
                 $('#s2').scrollBar({
                     scrollbarWidth: 37,
                     arrowSize: 37
                 });
            },
            onConfirm: function() {
                console.log("33222222222submit succe5ffff55ss !");
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
    demo2.init();
    avalon.scan();

