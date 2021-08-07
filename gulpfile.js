const gulp = require('gulp');
const gutil = require('gulp-util')
const rev = require('gulp-rev')
const revCollector = require('gulp-rev-collector')
const runSequence = require('run-sequence')
const assetRev = require('gulp-asset-rev')
const cssminify = require('gulp-minify-css')
var stripDebug = require('gulp-strip-debug')
const replace = require('gulp-replace')  //批量替换
const gulpsync = require('gulp-sync')(gulp)



//  基本设置
var baseSrcPc = 'developHtml';
var resourceCssPc = baseSrcPc + '/**/*.css';
var resourceJsPc = baseSrcPc + '/**/*.js';
var resourceHtmlPc = baseSrcPc + '/v/*.html';
var resourceImagePc = [baseSrcPc + '/**/*.png', baseSrcPc + '/**/*.jpg', baseSrcPc + '/**/*.svg', baseSrcPc + '/**/*.ico'];
var resourceFontPc = [baseSrcPc + '/**/*.eot', baseSrcPc + '/**/*.ttf', baseSrcPc + '/**/*.woff', baseSrcPc + '/**/*.woff2', baseSrcPc + '/**/*.svg'];