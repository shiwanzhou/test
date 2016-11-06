

$(".dl").find(".fff").bind("click",function(){
    $(this).addClass("act");
    $(this).siblings().removeClass("act");

    $("#h1").css("display","none");
    $("#h2").css("display","block");
    $("#h2 >tr >td").css("width","100px");




});




