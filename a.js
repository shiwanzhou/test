


var http=require('http');
var cheerio=require('cheerio');//页面获取到的数据模块
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var url2='http://fund.eastmoney.com/160212.html';

var url3='http://fund.eastmoney.com/519983.html';
var url4='http://fund.eastmoney.com/210004.html';
var url5='http://fund.eastmoney.com/519697.html';
function filterData(html,url){
	var $=cheerio.load(html,{
		normalizeWhitespace: true,
			xmlMode: true
	});
	var courseData=[];
	var chapters= $("#increaseAmount_stage").find("tr").first().next();
	var current = $(".dataItem02").find(".dataNums").find(".ui-font-middle").text();
	var guzhi = $("#gz_gszzl").text();
	$(".dataItem02").find("p").find("a").remove();
	var date = $(".dataItem02").find("p").text().trim().substring(1,11);
	var gt = {"名称":"国泰估值优势混合(LOF)","代码":"160212","近1年":"","近2年":"","近3年":"","估值":"","实际值":"","当前时间":""};
	var cx = {"名称":"长信量化先锋混合","代码":"519983","近1年":"","近2年":"","近3年":"","估值":"","实际值":"","当前时间":""};
	var jyu = {"名称":"交银优势行业混合","代码":"519697","近1年":"","近2年":"","近3年":"","估值":"","实际值":"","当前时间":""};
	var jyw = {"名称":"金鹰稳健成长混合","代码":"210004","近1年":"","近2年":"","近3年":"","估值":"","实际值":"","当前时间":""};
	/*var gt = {"title":"国泰估值优势混合(LOF)","titleNum":"160212","year1":"","year2":"","year3":"","估值":"","实际值":""};
	var cx = {"title":"长信量化先锋混合","titleNum":"519983","year1":"","year2":"","year3":"","估值":"","实际值":""};
	var jyu = {"title":"交银优势行业混合","titleNum":"519697","year1":"","year2":"","year3":"","估值":"","实际值":""};
	var jyw = {"title":"金鹰稳健成长混合","titleNum":"210004","year1":"","year2":"","year3":"","估值":"","实际值":""};*/
	var gg = {};
	if(url === url2){
		gg = gt;
	}
	if(url === url3){
		gg = cx;
	}
	if(url === url4){
		gg = jyw;
	}
	if(url === url5){
		gg = jyu;
	}
	gg.实际值 = current;
	gg.估值 = guzhi;
	gg.当前时间 = date;
	chapters.find("td").each(function(i){
		if(i == 6){
			gg.近1年 =$(this).text().trim();
		}
		if(i == 7){
			gg.近2年 =$(this).text().trim();
		}
		if(i == 8){
			gg.近3年 =$(this).text().trim();
		}
	});
	if(url === url2){
		courseData.push(gt)
	}
	if(url === url3){
		courseData.push(cx)
	}
	if(url === url4){
		courseData.push(jyw)
	}
	if(url === url5){
		courseData.push(jyu)
	}
	return courseData
}
function printCourseInfo(courseData){
	courseData.forEach(function(item){
		console.log(item.chaptersTitle+'\n');
		item.videosData.forEach(function(item){
			console.log(item.title+'【'+item.id+'】'+item.price+'\n')
		})
	})
}



http.get(url2,function(res){
	html="";
	res.on("data",function(data){
		html+=data
	})
	res.on('end',function(){
		 courseData=filterData(html,url2);
		console.log("\n")
		console.log(courseData)
		console.log("\n")

		var outputFilename = '/node/js/a.json';
		fs.writeFile(outputFilename, JSON.stringify(courseData, null, 4), function(err) {
			if(err) {
				console.log(err);
			} else {
				//console.log("JSON saved to " + outputFilename);
			}
		});

		http.get(url3,function(res){
			html="";
			res.on("data",function(data){
				html+=data
			})
			res.on('end',function(){
				courseData=filterData(html,url3);
				console.log(courseData)
				console.log("\n")
				var outputFilename = '/node/js/a.json';
				fs.writeFile(outputFilename, JSON.stringify(courseData, null, 4), function(err) {
					if(err) {
						console.log(err);
					} else {
						//console.log("JSON saved to " + outputFilename );
					}
				});
				http.get(url4,function(res){
					html="";
					res.on("data",function(data){
						html+=data
					})
					res.on('end',function(){
						courseData=filterData(html,url4);
						console.log(courseData)
						console.log("\n")
						var outputFilename = '/node/js/a.json';
						fs.writeFile(outputFilename, JSON.stringify(courseData, null, 4), function(err) {
							if(err) {
								console.log(err);
							} else {
								//console.log("JSON saved to " + outputFilename);
							}
						});
						http.get(url5,function(res){
							html="";
							res.on("data",function(data){
								html+=data
							})
							res.on('end',function(){
								courseData=filterData(html,url5);
								console.log(courseData)
								console.log("\n")
								var outputFilename = '/node/js/a.json';
								fs.writeFile(outputFilename, JSON.stringify(courseData, null, 4), function(err) {
									if(err) {
										console.log(err);
									} else {
										//console.log("JSON saved to " + outputFilename);
									}
								});

							})
						})

					})
				})

			})
		})


	})
})






/*
http.createServer(onRequest).listen(8080);*/
