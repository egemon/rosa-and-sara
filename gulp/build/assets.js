var config = require('../conf.js');
var isProd = config.isProd;
var helper = require('../helpers.js');

var gulp = require('gulp'),
    _if = require('gulp-if'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    shell = require('gulp-shell'),
    htmlmin = require('gulp-htmlmin');

// ============ ASSESTS TASK ============
// copies fonts from src to dest
gulp.task('font', helper.buildFor('font'));

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
    return gulp.src(config.src.html)
    .pipe(_if(isProd, htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(config.dest.html));
});

gulp.task('favicon', function() {
    return gulp.src(config.src.favicon)
      .pipe(gulp.dest(config.dest.favicon));
});