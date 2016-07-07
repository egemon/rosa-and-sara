var config = require('../conf.js');
var isProd = config.isProd;

var gulp = require('gulp'),
    _if = require('gulp-if'),
    concat = require('gulp-concat'),
    add = require('gulp-add-src'),
    beautify = require('gulp-beautify'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    angularFilesort = require('gulp-angular-filesort'),
    templateCache = require('gulp-angular-templatecache');

    // ========== JS TASKS =============
// lints js code with jshint
gulp.task('lint', function () {
    return gulp.src(config.paths.src.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// create tamplate cache
gulp.task('tmpls', function () {
  return gulp.src(config.paths.src.tmpls)
    .pipe(templateCache({
        standalone: true,
        transformUrl: function (path) {
            var arr = path.split('/');
            if (arr.length === 1) {
                var s = '\\';
                var arr = path.split(s);
            }
            var res = arr[arr.length - 1];
            return res;
        },
    }))
    .pipe(gulp.dest('client/app'));
});

// this task build all angular modules to ng.min,js
gulp.task('js-ng-app', ['tmpls'], function () {
    return gulp.src(config.paths.src.js)
    .pipe(angularFilesort())
    .pipe(concat('custom.js'))
    .pipe(_if(isProd, uglify(), beautify()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.paths.dest.js));
});

//this task collect all libs
gulp.task('js-lib', function () {
  return gulp.src(config.paths.src.jsLibs)
    // .pipe(browserify({
    //     debug: true,
    //     insertGlobals: true
    // }))
    .pipe(concat('libs.js'))
    .pipe(_if(isProd, uglify(), beautify()))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(config.paths.dest.js));
});

// this task unite ng-modules and libs
gulp.task('js',['js-ng-app', 'js-lib'] ,function() {
  return gulp.src(config.paths.dest.js+'/libs.min.js')
    .pipe(add.append(config.paths.dest.js+'/custom.min.js'))
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(config.paths.dest.js));
});
