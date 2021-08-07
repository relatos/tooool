const gulp = require('gulp');
const gutil = require('gulp-util')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const cssminify = require('gulp-minify-css')
var stripDebug = require('gulp-strip-debug')
const replace = require('gulp-replace')  //批量替换
// const gulpsync = require('gulp-sync')(gulp)
const del = require('del');
const uploadPromise=require('./tools/upload')
// const dataStr=`${noe_date.getFullYear()}_${noe_date.getMonth()+1}_${noe_date.getDate()}_${noe_date.valueOf()}`
const dataStr=`build`



//  基本设置
var baseSrcPc = 'developHtml';
var resourceCssPc = baseSrcPc + '/**/*.css';
var resourceJsPc = baseSrcPc + '/**/*.js';
// var resourceHtmlPc = baseSrcPc + '/v/*.html';
var resourceImagePc = [baseSrcPc + '/**/*.png', baseSrcPc + '/**/*.jpg', baseSrcPc + '/**/*.svg', baseSrcPc + '/**/*.ico'];
var resourceFontPc = [baseSrcPc + '/**/*.eot', baseSrcPc + '/**/*.ttf', baseSrcPc + '/**/*.woff', baseSrcPc + '/**/*.woff2', baseSrcPc + '/**/*.svg'];

gulp.task('clean', async function () {
    await del([
    //   'dist/report.csv',
      // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
      'revHtml/build/**/*',
      // 我们不希望删掉这个文件，所以我们取反这个匹配模式
    //   '!dist/mobile/deploy.json'
    ]);
  });

gulp.task('revCssPc', function () {
    return gulp.src(resourceCssPc, {
        base: baseSrcPc
    })
        .pipe(cssminify({
            advancde: false, //是否开启高级优化（合并选择器等）
            keepBreaks: false, //是否保留换行
            keepSpecialComments: '*' //保留所有特殊前缀
        }))
        .pipe(rev())
        .pipe(gulp.dest('revHtml/' + dataStr))
        .pipe(rev.manifest())
        .pipe(gulp.dest('revHtml/' + dataStr + '/json/css'));
});

gulp.task('revJsPc', function () {
    return gulp.src(resourceJsPc, {
        base: baseSrcPc
    })
        .pipe(stripDebug()) //去除console信息
        // .pipe(babel({
        //     presets: [babel_env],
        //     // ignore: ['swiper.min.js', 'JSEncrypt-min.js', 'md5.js']
        // }))
        // .pipe(gulpif(condition, uglify({
        //     // toplevel:true,
        //     keep_fnames: true,
        //     mangle: {
        //         // properties: true,
        //         // reserved: ['_android', 'QRCode', 'require', 'exports', 'module', '$']
        //     }, //排除混淆关键字
        //     // nameCache:{}
        //     // nameCache: JSON.parse(fs.readFileSync(cacheFileName, "utf8"))
        // }))) //压缩js代码
        .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rev())
        .pipe(gulp.dest('revHtml/' + dataStr))
        .pipe(rev.manifest())
        .pipe(gulp.dest('revHtml/' + dataStr + '/json/js'));
});

gulp.task('revImgPc', function () {
    return gulp.src(resourceImagePc, {
        base: baseSrcPc
    })
    .pipe(rev())
    .pipe(gulp.dest('revHtml/' + dataStr))
    .pipe(rev.manifest())
    .pipe(gulp.dest('revHtml/' + dataStr + '/json/img'));
});

gulp.task('revFontPc', function () {
    return gulp.src(resourceFontPc, {
        base: baseSrcPc
    })
    .pipe(rev())
    .pipe(gulp.dest('revHtml/' + dataStr))
    .pipe(rev.manifest())
    .pipe(gulp.dest('revHtml/' + dataStr + '/json/font'));
});

gulp.task('revHtmlPcDev', function () { //批量替换本地连接为CDN链接
    // Util.formatJSON('revHtml/'+dataStr+'/json/css/rev-manifest.json');
    // Util.formatJSON('revHtml/'+dataStr+'/json/js/rev-manifest.json');
    return gulp.src(['revHtml/' + dataStr + '/json/**/*.json', baseSrcPc + '/**/*.html'])
        // .pipe(htmlmin({
        //     collapseWhitespace: true,
        //     removeComments: true,
        //     caseSensitive: true
        // }))
        .pipe(revCollector({
            replaceReved: true,
        }))
        .pipe(replace('./static/', 'https://shop-1256119282.file.myqcloud.com/tooools/static/')) //替换本地链接为线上地址
        .pipe(gulp.dest('revHtml/' + dataStr + '/view'));
});





// gulp.task('asas', gulpsync.sync(['clean','revCssPc', 'revJsPc', 'revFontPc', 'revImgPc','revHtmlPcDev']));
gulp.task('build',gulp.series('clean','revCssPc', 'revJsPc', 'revFontPc', 'revImgPc','revHtmlPcDev',async() => {
    // Do something after a,b, and c are finished.
    await uploadPromise()
    console.log('finish')
}));
