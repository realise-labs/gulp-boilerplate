var gulp = require('gulp');
var config = require('./config.json');
var plugins = require('gulp-load-plugins')({
        pattern: '*',
});

//Clean
require('./gulp-tasks/clean')(gulp, plugins, config);

// Copy
require('./gulp-tasks/copy-dev')(gulp, plugins, config);
require('./gulp-tasks/copy-build')(gulp, plugins, config);

// Scss
require('./gulp-tasks/scss-lint')(gulp, plugins, config);
require('./gulp-tasks/scss-tidy')(gulp, plugins, config);

require('./gulp-tasks/sass-develop')(gulp, plugins, config);
require('./gulp-tasks/sass-build')(gulp, plugins, config);

//JS
require('./gulp-tasks/babelify-develop')(gulp, plugins, config);
require('./gulp-tasks/babelify-build')(gulp, plugins, config);

// SVG spritesheets
require('./gulp-tasks/svg2png')(gulp, plugins, config);
require('./gulp-tasks/svgo-sprite')(gulp, plugins, config);
require('./gulp-tasks/sprite-create')(gulp, plugins, config);

//browsersync
require('./gulp-tasks/browser-sync')(gulp, plugins, config);

gulp.task('develop', function(callback) {
	plugins.runSequence('copy-dev', 'sprite-create', 'sass-develop', 'babelify-develop', 'browser-sync', callback);
});

gulp.task('build', function(callback) {
	plugins.runSequence('copy-build', 'sprite-create', 'svg2png', 'svgo-sprite', 'sass-build', 'babelify-build', callback);
});

gulp.task('default', ['develop']);
