"use strict";

var config = require('./package.json').config;

var gulp = require('gulp');
var gutil = require('gulp-util');
var fs = require('fs-extra');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;

// import all the tasks
requireDir('./tasks/');

/**
 * Watch for file changes
 * But first, build the project and start the browsersync server
 */
gulp.task('watch', (cb) => {
  return runSequence('default',
    'browser-sync',
    ['scripts-watch', 'sass-watch', 'nunjucks-watch', 'imagemin-watch'],
  cb);
});

/**
 * Default: Runs the build process
 */
gulp.task('default', ['build']);

/*
 * Build the entire project. Running all the builds async but not passing the promise till they are all done.
 * If --prod is passed it will clear the build path.
 */
gulp.task('build', function(cb) {
  return runSequence((argv.prod ? 'clean' : 'skip'), 
    ['scripts',
    'sass',
    'imagemin',
    'copy',
    'nunjucks'],
  cb)
});

/**
 * Build and publish the project. Must set --prod flag or --f to force.
 */
gulp.task('publish', (cb) => {
  if (!argv.prod && !argv.f) {
    console.error();
    console.error('Env must be set to prod for publishing or use --f flag to force. Try:'); 
    console.error('\tgulp publish --prod');
    console.error();
    if (cb) cb();
    return false;
  }
  
  return runSequence('build', 'ftp', cb)
});

/**
 * Cleans the build path for a fresh new build
 */
gulp.task('clean', (cb) => {
  return fs.remove(config.build_path, cb);
});

gulp.task('skip', (cb) => {
  cb();
})