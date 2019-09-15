var gulp = require('gulp');

//js文件壓縮
var uglify = require('gulp-uglify');
var pump = require('pump');
gulp.task('compress', function (cb) {
    pump([
            gulp.src('lib/*.js'),
            uglify(),
            gulp.dest('dist')
        ],
        cb
    );
});

//css文件壓縮
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
    return gulp.src('styles/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});

//html文件壓縮
var htmlmin = require('gulp-htmlmin');

gulp.task('minify', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

//js代碼檢查

    var jshint = require("gulp-jshint");

gulp.task('jsLint', function () {
    gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter()); // 输出检查结果
});

//文件合并
var  concat = require('gulp-concat');

gulp.task('concat', function () {
    gulp.src('js/*.js')  //要合并的文件
        .pipe(concat('all.js'))  // 合并匹配到的js文件并命名为 "all.js"
        .pipe(gulp.dest('dist/js'));
});

//圖片壓縮
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); //png图片压缩插件
gulp.task('default', function () {
    return gulp.src('src/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] //使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist'));
});

const eslint = require('gulp-eslint');
//eslint矯正
gulp.task('default', () => {
    return gulp.src(['scripts/*.js'])
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

//less的编译
   var less = require('gulp-less');

gulp.task('compile-less', function () {
    gulp.src('less/*.less')
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});