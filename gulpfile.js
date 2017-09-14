// 导入各种包
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var browserify = require('browserify');
var source = require('vinyl-source-stream'); // 这个包可以把普通的数据流转为vinyl对象文件格式
var buffer = require('vinyl-buffer'); // 这个是把vinyl对象文件中的数据转为buffer方式存储
var htmlReplace = require('gulp-html-replace');

// html处理
gulp.task('html', function() {
    gulp.src(['src/**/*.html', 'index.html'])
        .pipe(htmlReplace({
            style: gulp.src('src/html/common/style.html'),
            aside: gulp.src('src/html/common/aside.html'),
            header: gulp.src('src/html/common/header.html'),
            courseEditHeader: gulp.src('src/html/common/course/header.html'),
            courseEditAside: gulp.src('src/html/common/course/aside.html')
        }))
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(gulp.dest('dist'));
});

// less处理
gulp.task('less', function() {
    gulp.src('src/less/index.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
});

// 配置要打包的第三包路径
var jsLibs = [
    'node_modules/art-template/lib/template-web.js',
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/jquery-form/dist/jquery.form.min.js'
];
// 合并所有的第三方包为一个js
gulp.task('jsLib', function() {
    gulp.src(jsLibs)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('dist/js'));
});

// 打包CommonJS模块
var jsModules = [
    //首页
    'src/js/index.js',
    //用户
    'src/js/user/login.js',
    'src/js/user/profile.js',
    'src/js/user/repass.js',
    //讲师
    'src/js/teacher/add.js',
    'src/js/teacher/edit.js',
    'src/js/teacher/list.js',
    //课程
    'src/js/course/add.js',
    'src/js/course/edit1.js',
    'src/js/course/edit2.js',
    'src/js/course/edit3.js',
    'src/js/course/list.js',
    //学科分类
    'src/js/category/add.js',
    'src/js/category/edit.js',
    'src/js/category/list.js',
];

gulp.task('js', function() {
    jsModules.forEach(function(jsPath) {
        var pathArr = jsPath.split('/');
        var jsName = pathArr.pop();
        pathArr.shift();
        browserify(jsPath, { debug: true }).bundle() // 打包index.js
            .pipe(source(jsName))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('dist/' + pathArr.join('/')));
    });;
});
//添加统一打包的任务
gulp.task('build', function() {
    gulp.run(['html', 'less', 'jsLib', 'js']);
});
// 监听文件变化，自动打包
gulp.task('default', function() {
    gulp.run('build');
    gulp.watch(['src/**/*.html', 'index.html'], function() {
        gulp.run('html');
    });
    gulp.watch(['src/**/*.less'], function() {
        gulp.run('less');
    });
    gulp.watch(['src/**/*.js'], function() {
        gulp.run('js');
    });
});