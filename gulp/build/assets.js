var config = require('../conf.js');
var isProd = config.isProd;
var helper = require('../helpers.js');

var gulp = require('gulp'),
    _if = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    shell = require('gulp-shell'),
    rename = require('gulp-rename'),
    htmlmin = require('gulp-htmlmin');

// ============ ASSESTS TASK ============
// copies fonts from src to dest
gulp.task('font', helper.buildFor('fonts'));

// this task minify images
gulp.task('img', helper.buildFor('img',
    cache(
        imagemin({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })
    ))
);

// minifies html
gulp.task('html', function () {
    return gulp.src(config.paths.src.prodhtml)
    .pipe(_if(isProd, htmlmin({collapseWhitespace: true})))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.paths.dest.general));
});

gulp.task('favicon', function() {
    return gulp.src(config.paths.src.favicon)
      .pipe(gulp.dest(config.paths.dest.general));
});