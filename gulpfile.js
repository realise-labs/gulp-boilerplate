var gulp = require('gulp');
var config = require('./config.json');
var plugins = require('gulp-load-plugins')({
	pattern: '*'
});
var errorHandler = require('./gulp-tasks/error')(plugins);


// Clean
require('./gulp-tasks/clean')(gulp, plugins, config, errorHandler);

// Copy
require('./gulp-tasks/copy-dev')(gulp, plugins, config, errorHandler);
require('./gulp-tasks/copy-build')(gulp, plugins, config, errorHandler);

// SCSS
require('./gulp-tasks/scss-lint')(gulp, plugins, config, errorHandler);

require('./gulp-tasks/sass-develop')(gulp, plugins, config, errorHandler);
require('./gulp-tasks/sass-build')(gulp, plugins, config, errorHandler);

// ES6
require('./gulp-tasks/babelify-develop')(gulp, plugins, config, errorHandler);
require('./gulp-tasks/babelify-build')(gulp, plugins, config, errorHandler);

// Image minification
require('./gulp-tasks/image-min')(gulp, plugins, config, errorHandler);

// HTML templating
require('./gulp-tasks/html-templating-develop')(gulp, plugins, config, errorHandler);
require('./gulp-tasks/html-templating-build')(gulp, plugins, config, errorHandler);

// HTML standards
require('./gulp-tasks/html-lint')(gulp, plugins, config, errorHandler);

// SVG spritesheets
require('./gulp-tasks/svg2png')(gulp, plugins, config, errorHandler);
require('./gulp-tasks/svgo-sprite')(gulp, plugins, config, errorHandler);
require('./gulp-tasks/sprite-create')(gulp, plugins, config, errorHandler);

// BrowserSync
require('./gulp-tasks/browser-sync')(gulp, plugins, config, errorHandler);

// Watch
require('./gulp-tasks/watch')(gulp, plugins, config, errorHandler);

gulp.task('develop', function(callback) {
	plugins.runSequence('clean', 'copy-dev', 'sprite-create', ['svg2png','svgo-sprite', 'sass-develop', 'babelify-develop', 'html-templating-develop'], 'html-lint', 'browser-sync', 'watch', callback);
});

gulp.task('build', function(callback) {
	plugins.runSequence('clean', 'copy-build', 'sprite-create', ['svg2png', 'svgo-sprite', 'image-min', 'sass-build', 'babelify-build', 'html-templating-build'], callback);
});


gulp.task('default', ['develop']);
