require('bluebird');
var config = require('./gulp/conf.js');
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    del = require('del'),
    requireDir = require('require-dir');
var tasks = requireDir('./gulp', {recurse: true});

//  ====================== GENERAL ===============
gulp.task('clean', function() {
    return del([config.paths.dest.general]);
});
gulp.task('dev-build', ['tmpls', 'inject']);
gulp.task('build-all',['js', 'css', 'img', 'favicon', 'html', 'font']);
gulp.task('build', ['clean'], function () {
    return runSequence('build-all');
});

gulp.task('serve', ['dev-build'] ,function () {
    runSequence('watch', 'init-browser');
});
gulp.task('default',['clean'],function() {
    return runSequence('serve');
});


