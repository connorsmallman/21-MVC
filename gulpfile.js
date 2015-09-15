var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var hbsfy = require('hbsfy');
var watchify = require('watchify');
var gutil = require('gulp-util');

gulp.task('bundle', function() {
	var bundle = browserify('./app.js', {
			debug: true,
			cache: {},
			packageCache: {},
			fullPaths: true
		});

	return bundle
		.transform(babelify.configure({
 			optional: ["runtime"]
		}))
		.transform(hbsfy)
		.bundle()
		.pipe(source('app.min.js'))
		.pipe(gulp.dest('./dist/'))
		.on('error', gutil.log);
});

gulp.task('default', ['bundle']);