"use strict";

var config = require('../package.json').config;

// modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');

/* checkout more options at http://www.browsersync.io/docs/options */

// Static server
gulp.task('browser-sync', () => {
    if (config.enable_browser_sync) {
        console.log('* Browser sync enabled *');
        return browserSync({
            server: {
                baseDir: config.build_path,
                index: "index.html",
                directory: false
            }
        });
    }
    
    return true;
});

gulp.task('browser-reload', () => {
  if (config.enable_browser_sync) {
    return browserSync.reload();
  }
  
  return true;
})