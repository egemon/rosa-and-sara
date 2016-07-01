var gulp = require('gulp');
var config = require('./conf.js');
var util = require('gulp-util');

// ========= PUBLIC ============
function buildFor(type, fn) {
    fn = fn || util.noop();

    return function () {
        return gulp.src(config.paths.src[type])
        .pipe(fn)
        .pipe(gulp.dest(config.paths.dest[type]));
    };
}

// ========= PRIVATE ============

exports.buildFor = buildFor;