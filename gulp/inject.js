var config = require('./conf.js');
var gulp = require('gulp'),
    es = require('event-stream'),
    shell = require('gulp-shell'),
    add = require('gulp-add-src'),
    runSequence = require('run-sequence'),
    fileSort = require('gulp-angular-filesort'),
    inject = require('gulp-inject');

gulp.task('inject-css', function() {
    var libs = gulp.src(config.paths.src.cssLibs, {read:false});
    var custom = gulp.src(config.paths.src.css, {read:false});
    var html = gulp.src(config.paths.src.html);

    return html.pipe(inject(es.merge(libs, custom), {relative: true}))
    .pipe(gulp.dest(config.paths.src.general));
});

gulp.task('inject-js', function() {
  var libs = gulp.src(config.paths.src.jsLibs, {read:false});
  var custom = gulp.src(config.paths.src.js).pipe(fileSort());
  var html = gulp.src(config.paths.src.html);

  return html.pipe(inject(es.merge(libs, custom), {relative: true}))
  .pipe(gulp.dest(config.paths.src.general));
});

gulp.task('inject', ['inject-css', 'inject-js']);