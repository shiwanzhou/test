/**
 * Created by shiwanzhou on 16-11-6.
 */

   var SWZ = window.SWZ = {};

     SWZ.tmpl = SWZ.template = (function(){
	var cache = {};
	return function tmpl(str, data){
		var fn = !/\W/.test(str) ? cache[str] || (cache[str] = tmpl(document.getElementById(str).innerHTML)) :
			new Function('o',
				"var p=[];" +
					"with(o){p.push('" +
					str.replace(/[\r\t\n]/g, " ")
						.split("<%").join("\t")
						.replace(/((^|%>)[^\t]*)'/g, "$1\r")
						.replace(/\t=(.*?)%>/g, "',$1,'")
						.split("\t").join("');")
						.split("%>").join("p.push('")
						.split("\r").join("\\'") +
					"');}return p.join('');");
		return data ? fn(data) : fn;
	};
})();


$(function(){
       /* var model = [
	        {"title":"国泰估值优势混合(LOF)","titleNum":"160212","year1":"","year2":"","year3":""},
	        {"title":"长信量化先锋混合","titleNum":"519983","year1":"","year2":"","year3":""},
	        {"title":"交银优势行业混合","titleNum":"519697","year1":"","year2":"","year3":""},
	        {"title":"金鹰稳健成长混合","titleNum":"210004","year1":"","year2":"","year3":""}

        ]



	var html = SWZ.template("aaa",{model:model});
	$("#content").html(html);*/
	var model = [];
	$.ajax({
		url:   "js/a.json",
		error: function(XMLHttpRequest, textStatus, errorThrown){
		},
		success: function(data){
			var aa = data[0];
			model.push(aa);
			$.ajax({
				url:   "js/b.json",
				error: function(XMLHttpRequest, textStatus, errorThrown){
				},
				success: function(data){
					var bb = data[0];
					model.push(bb);
					$.ajax({
						url:   "js/c.json",
						error: function(XMLHttpRequest, textStatus, errorThrown){
							var s1=XMLHttpRequest;
							var s2=textStatus;
							var s3=errorThrown;
							console.log("error mesffsage : "+errorThrown.toString())
						},
						success: function(data){
							var cc = data[0];
							model.push(cc);
							$.ajax({
								url:   "js/d.json",
								error: function(XMLHttpRequest, textStatus, errorThrown){
									var s1=XMLHttpRequest;
									var s2=textStatus;
									var s3=errorThrown;
									console.log("error mesffsage : "+errorThrown.toString())
								},
								success: function(data){
									var dd = data[0];
									model.push(dd);
									console.log(model)
									var html = SWZ.template("aaa",{model:model});
									$("#content").html(html)
								}
							});
						}
					});

				}
			});
		}
	});


});
