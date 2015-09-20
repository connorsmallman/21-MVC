var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var hbsfy = require('hbsfy');
var watchify = require('watchify');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');

var b = watchify(browserify('./app.js', {
	debug: true,
	cache: {},
	packageCache: {},
	fullPaths: true
}));

b.on('update', bundle);
b.on('log', gutil.log);
b.on('error', gutil.log);

gulp.task('bundle', bundle);

function bundle() {
	return b
		.transform(babelify.configure({
 			optional: ["runtime"]
		}))
		.transform(hbsfy)
		.bundle()
		.pipe(plumber())
		.pipe(source('app.min.js'))
		.pipe(gulp.dest('./dist/'));
}


gulp.task('default', ['bundle']);