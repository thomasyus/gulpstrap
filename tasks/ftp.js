// config
var config = require('../package.json').config;

var gulp = require('gulp');
var gutil = require('gulp-util');
//var ftp = require('gulp-ftp');

var creds = {
        host: 'ftp.domain.com',
        user: 'username',
        pass: 'password',
        remotePath: 'public_html'
    }

var output_path = config.build_path + "**/*";
var watch_files = output_path;

gulp.task('ftp', function () {
    return gulp.src(output_path)
        .pipe(ftp(creds).on('error', gutil.log))
        .pipe(gutil.noop());
});


gulp.task('ftp-watch', function() {
	if (config.enable_auto_ftp) {
    	gulp.watch(watch_files, ['ftp']);
    }
});