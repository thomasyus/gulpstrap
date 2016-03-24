"use strict";

var config = require('../package.json').config;

// modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');

var output_path = config.build_path + "img/";

var input_files = [
	config.src_path + "img/**/*.gif", 
	config.src_path + "img/**/*.jpg",
	config.src_path + "img/**/*.png", 
	config.src_path + "img/**/*.svg"
];

var watch_files = input_files;

// Available options: https://www.npmjs.com/package/gulp-imagemin#imageminoptions
var options = {};

/**
 * Copy and compress static images
 *
 * @return
 */
gulp.task('imagemin', () => {
    return gulp.src(input_files)
        .pipe(newer(output_path))
        .pipe(imagemin(options).on('error', gutil.log))
        .pipe(gulp.dest(output_path));
});

gulp.task('imagemin-watch', () => {
	return gulp.watch(watch_files, () => {
		return runSequence('imagemin', 'browser-reload');
	});
});