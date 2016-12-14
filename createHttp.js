var PORT = 8080;
var http = require('http');
var url=require('url');
var fs=require('fs');
var mine=require('./mine').types;
var path=require('path');

var aaa = function(){
    console.log(9999)
}

/*创建服务*/
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = path.join("assets", pathname);
    console.log(realPath);
    var ext = path.extname(realPath);
    ext = ext ? ext.slice(1) : 'unknown';
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/plain'
            });
            response.write("This request URL " + pathname + " was not found on this server.");
            response.end();
        } else {
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    response.end(err);
                } else {
                    var contentType = mine[ext] || "text/plain";
                    response.writeHead(200, {
                        'Content-Type': contentType
                    });
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");


var process = require('child_process');
//直接调用cmd命令执行
var createDir = function (){
    process.exec('explorer "http://localhost:8080/index.html"',
    function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}
createDir()
//调用bat 文件执行文件
/*exports.openApp = function(){
    process.execFile('D:/testweb/aaa.bat',null,{cwd:'D:/'},
        function (error,stdout,stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
}*/
exports.aaa =  aaa;
/**
 * Created by shiwz on 16-11-7.
 */
/*
 http://www.cnblogs.com/shawn-xie/archive/2013/06/06/3121173.html
* */