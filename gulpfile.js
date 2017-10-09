var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require('./config.json');
var plugins = require('gulp-load-plugins')({
	pattern: '*'
});

// Clean
require('./gulp-tasks/clean')(gulp, plugins, config);

// Copy
require('./gulp-tasks/copy-dev')(gulp, plugins, config);
require('./gulp-tasks/copy-build')(gulp, plugins, config);

// SCSS
require('./gulp-tasks/scss-lint')(gulp, plugins, config);
require('./gulp-tasks/scss-tidy')(gulp, plugins, config);

require('./gulp-tasks/sass-develop')(gulp, plugins, config);
require('./gulp-tasks/sass-build')(gulp, plugins, config);

// ES6
require('./gulp-tasks/babelify-develop')(gulp, plugins, config);
require('./gulp-tasks/babelify-build')(gulp, plugins, config);

// Image minification
require('./gulp-tasks/image-min')(gulp, plugins, config);

// HTML templating
require('./gulp-tasks/html-templating-develop')(gulp, plugins, config);
require('./gulp-tasks/html-templating-build')(gulp, plugins, config);

// HTML standards
require('./gulp-tasks/html-lint')(gulp, plugins, config, gutil);

// SVG spritesheets
require('./gulp-tasks/svg2png')(gulp, plugins, config);
require('./gulp-tasks/svgo-sprite')(gulp, plugins, config);
require('./gulp-tasks/sprite-create')(gulp, plugins, config);

// BrowserSync
require('./gulp-tasks/browser-sync')(gulp, plugins, config);

// Watch
require('./gulp-tasks/watch')(gulp, plugins, config);

gulp.task('develop', function(callback) {
	plugins.runSequence('copy-dev', 'sprite-create', ['svg2png','svgo-sprite', 'sass-develop', 'babelify-develop', 'html-templating-develop'], 'html-lint', 'browser-sync', 'watch', callback);
});

gulp.task('build', function(callback) {
	plugins.runSequence('copy-build', 'sprite-create', ['svg2png', 'svgo-sprite', 'image-min', 'sass-build', 'babelify-build', 'html-templating-build'], callback);
});


gulp.task('default', ['develop']);
