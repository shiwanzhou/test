var gulp   = require('gulp');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var del = require('del');
var replace = require('gulp-replace');
var runSequence = require('gulp-run-sequence');
var uglify = require('gulp-uglify');
var  minifycss = require('gulp-minify-css');

/*清空文件夹*/
gulp.task('clean:min', function (cb) {
    del([
        'static/module/index/js/*',
        'static/module/index/css/*'
    ], cb)
});



/*压缩css 生成md5文件*/
gulp.task('cssMin', function () {
    runSequence("clean:min");
    return    gulp.src('www/module/index/css/*.css')
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('static/module/index/css'))
        .pipe( rev.manifest() ) //MD5  生成manifest文件
        .pipe( gulp.dest( 'rev/css' ) );
});


/*压缩js 生成md5文件*/
gulp.task('scriptsMin', function () {
    return   gulp.src('www/module/index/js/*.js')
        .pipe(uglify())    //压缩
        .pipe(rev())  //MD5
        .pipe(gulp.dest('static/module/index/js'))
        .pipe( rev.manifest() )  //生成manifest文件
        .pipe( gulp.dest( 'rev/js' ) );
});



gulp.task('default',['cssMin','scriptsMin'], function () {
    return    gulp.src(['rev/**/*.json',
            'www/module/index/view/*.html'


        ])   //第一个是manifest文件所在目录  index.html为要更改的html文件
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/avalon-demo/static/module/index/css/': '../css/',   //替换规则
                'http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/avalon-demo/static/module/index/js/': '../js/',
                '../css/': 'http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/avalon-demo/static/module/index/css/',   //替换规则
                '../js/': 'http://localhost:63342/www/src/WPTAccount/WPT.Account.Web/avalon-demo/static/module/index/js/',
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        .pipe( gulp.dest('static/module/index/view') );
});



