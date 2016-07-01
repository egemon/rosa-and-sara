var config = require('../conf.js');

var isProd = config.isProd;
var gulp = require('gulp'),
    cssnano = require('gulp-cssnano'),
    _if = require('gulp-if'),
    add = require('gulp-add-src'),
    cssbeautify = require('gulp-cssbeautify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat');

// ======================  STYLES  ====================

//collects lib css files and concat them
gulp.task('css-lib', function() {
  return gulp.src(config.paths.src.cssLibs)
    .pipe(concat('lib.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(_if(isProd, cssnano(), cssbeautify()))
    .pipe(gulp.dest(config.paths.dest.css));
});

//collects custom css files and concat them
gulp.task('css-custom', function() {
  return gulp.src(config.paths.src.css)
    .pipe(concat('custom.css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(_if(isProd, cssnano(), cssbeautify()))
    .pipe(gulp.dest(config.paths.dest.css));
});

// this task unite ng-modules and libs
gulp.task('css',['css-custom', 'css-lib'] ,function() {
  return gulp.src(config.paths.dest.css + '/lib.min.css')
    .pipe(add.append(config.paths.dest.css + '/custom.min.css'))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest(config.paths.dest.css));
});
