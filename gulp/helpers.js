var config = require('./conf.js');
var util = require('gulp-util');
var isProd = config.isProd;

// ========= PUBLIC ============
function buildFor(type, fn) {
    var fn = fn || util.noop();

    return function () {

        return gulp.src(config.src[type])
        .pipe(fn)
        .pipe(gulp.dest(config.dest[type]));


    }
}

// ========= PRIVATE ============

exports.buildFor = buildFor;