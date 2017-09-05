var gulp = require('gulp');
var config = require('./config.json');
var plugins = require('gulp-load-plugins')({
        pattern: '*',
});


// Scss
require('./gulp-tasks/scss-lint')(gulp, plugins, config);
require('./gulp-tasks/scss-tidy')(gulp, plugins, config);

require('./gulp-tasks/sass-develop')(gulp, plugins, config);
require('./gulp-tasks/sass-build')(gulp, plugins, config);

//JS
require('./gulp-tasks/babelify-develop')(gulp, plugins, config);
require('./gulp-tasks/babelify-build')(gulp, plugins, config);

gulp.task('develop', function(callback) {
	plugins.runSequence('sass-develop', 'babelify-develop', callback);
});

gulp.task('build', function(callback) {
	plugins.runSequence('sass-build', 'babelify-build', callback);
});

gulp.task('default', ['develop']);
