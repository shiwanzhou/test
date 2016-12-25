
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
                console.log(222)
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
        vm.$ssOpts2 = {
            title: "gg",
            modal:data,
            width:"1016px",
            onOpen:function(){
                console.log(111)
            },
            onConfirm: function() {
                avalon.scan();
            },
            onClose: function(){

            }
        };
        vm.ooo = function(){
            console.log(234)
            //vm.$ssOpts._close();
            avalon.vmodels["ss2"].toggle  =false;
        }
        /*点击按钮*/
        vm.show = function( id ){
            avalon.vmodels[id].toggle = true;
            if(id == "ss8"){
             console.log(334545)
                avalon.vmodels["ss2"].toggle  =false;
            }
        }
    });
    demo2.init();
    avalon.scan();

