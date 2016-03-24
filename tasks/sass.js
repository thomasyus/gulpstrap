"use strict";

var config = require('../package.json').config;

// modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');

if (config.enable_browser_sync) {
    var browserSync = require('browser-sync');
}

var output_path = config.build_path + "css/";
var output_file = "screen.css";
var input_files = [config.src_path + "/scss/screen.scss"];
var watch_files = [config.src_path + "/scss/**/*.scss"];

var paths = [
  config.src_path + "/scss",
  "./node_modules/bootstrap/scss",
  "./node_modules"
];

gulp.task('sass', () => {
  return gulp.src(input_files)
    .pipe(argv.prod ? gutil.noop() : sourcemaps.init())
    .pipe(sass({
      includePaths: paths
    }).on('error', sass.logError))
    .pipe(cleanCss({
      keepSpecialComments: false
    }))
    .pipe(argv.prod ? gutil.noop() : sourcemaps.write('../maps'))
    .pipe(gulp.dest(output_path));
});

gulp.task('sass-reload', () => {
  if (config.enable_browser_sync) {
    return gulp.src(output_path + output_file)
      .pipe(browserSync.reload({
        stream:true
      }).on('error', gutil.log));
  }
  
  return false;
});
 
gulp.task('sass-watch', () => {
  return gulp.watch(watch_files, function() {
    return runSequence('sass', 'sass-reload');
  });
});