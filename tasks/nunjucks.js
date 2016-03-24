"use strict";

var app = require('../package.json');
var config = app.config;

// modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var fs = require('fs-extra');
var nunjucksRender = require('gulp-nunjucks-render');
var htmlmin = require('gulp-htmlmin');

var output_path = config.build_path;

var input_files = [
	config.src_path + 'views/*.html',
	config.src_path + 'views/**/*.html'
];

var watch_dir = config.src_path + "views/";

var watch_files = [
  watch_dir + '*.html',
	watch_dir + '**/*.htm',
  watch_dir + '**/*.html'
];

var context = {
  "config": {
      "app_name": app.name,
      "version": app.version,
      "base_path": "/"
  }
};

var minConfig = {
	removeComments: true,
	minifyJs: true,
	minifyCss: true,
	collapseWhitespace: true
};

// configure nunjucks internal watch directory
nunjucksRender.nunjucks.configure([watch_dir]);

/**
 * Compile nunjucks templates.
 */
gulp.task('nunjucks-render', () => {
	return gulp.src(input_files)
    .pipe(nunjucksRender({
			data: context,
			ext: '/index.html', // lets us use pretty URLs without any server conf
			path: watch_dir
		}).on('error', gutil.log))
		.pipe(argv.prod ? htmlmin(minConfig).on('error', gutil.log) : gutil.noop())
		.pipe(gulp.dest(output_path));
});

gulp.task('nunjucks-rename-index', (cb) => {
	return fs.move(output_path + "index/index.html", output_path + "index.html", { clobber: true }, 
		(err) => {
			if (err) {
				console.log(err);
				cb()
			}
			
			fs.remove(output_path + "index", cb);
		}
	);
});

gulp.task('nunjucks', (cb) => {
	return runSequence('nunjucks-render', 'nunjucks-rename-index', cb);
});

gulp.task('nunjucks-watch', () => {
	return gulp.watch(watch_files, () => {
		return runSequence('nunjucks', 'browser-reload');
	});
});