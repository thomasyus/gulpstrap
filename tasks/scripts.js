var config = require('../package.json').config;

// modules
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');

if (config.enable_browser_sync) {
  var browserSync = require('browser-sync');
}

var output_path = config.build_path + 'js/';
var output_file = 'application.min.js';

var src_files = [
  config.src_path + "js/application.js"
]

var watch_files = [
  config.src_path + "js/**/*",
  config.src_path + "js/*"
];

gulp.task('scripts', () => {
  return gulp.src(src_files)
    .pipe(argv.prod ? gutil.noop() : sourcemaps.init())
    .pipe(browserify({
      insertGlobals: true,
      compress: true
    }).on('error', gutil.log))
    .pipe(uglify().on('error', gutil.log))
    .pipe(argv.prod ? gutil.noop() : sourcemaps.write('../maps'))
    .pipe(gulp.dest(output_path));
})

gulp.task('scripts-reload', () => {
  if (config.enable_browser_sync) {
    return gulp.src(output_path + output_file).pipe(browserSync.reload());
  }
  
  return true;
});

gulp.task('scripts-watch', () => {
  return gulp.watch(watch_files, function() {
    return runSequence('scripts', 'scripts-reload');
  });
});
