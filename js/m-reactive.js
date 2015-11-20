(function(w,d){
    var w = w || window, d = d || document;
    var initScreen = function(){
        if(!(this instanceof arguments.callee)) return new arguments.callee();
        this.init();
    };
    initScreen.prototype = {
        constructor:initScreen,
        init:function(){
            this.config = {
                fontSize:20
            };
            this.adapter();
            this.reSize();
        },
        reSize:function(){
            var that = this;
            window.onload = function(){
                that.adapter(d.body.clientWidth);
                d.body.onresize = function(){
                    that.adapter(d.body.clientWidth);
                };
            };
        },
        adapter:function(width){
            var that = this;
            if(!that.htmlObject){
                var html = d.getElementsByTagName('html');
                if(html && html.length) that.htmlObject = html[0];
            }
            var fz = that.config.fontSize,p_w = w.innerWidth, p_h = w.innerHeight;
            if(p_w < 300){
                fz = p_w/16;
            }else if(p_w >= 300 && p_w <= 640){
                fz = p_w/12.8;
            }else{
                fz = 40;
            }
            that.htmlObject.style.fontSize = fz+'px';
            window.fontSize = fz;
            //window.scrollTo(0, 1);
        }
    };
    w.initScreen = new initScreen();
})(window,document);
