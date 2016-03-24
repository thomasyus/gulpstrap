"use strict";

var config = require('../package.json').config;

// node modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var newer = require('gulp-newer');

var copy_config = {
  "fonts": ["node_modules/font-awesome/fonts/*"]
};

/**
 * Copy files (usually for fonts or other assets being copied)
 * from node_modules into the build directory
 */
gulp.task('copy', () => {
  for (var outputPath in copy_config) {
      gulp.src(copy_config[outputPath])
      .pipe(newer(config.build_path + outputPath))
      .pipe(gulp.dest(config.build_path + outputPath));
  }
  return true;
});