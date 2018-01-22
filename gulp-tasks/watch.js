module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('watch', function() {
		gulp.watch(config.paths.input.staticDev,  ['copy-dev']);
		gulp.watch(config.paths.input.styles, ['sass-develop']);
		gulp.watch(config.paths.input.spriteSrc, ['sprite-create']);
		gulp.watch(config.paths.input.images + '**/*.svg', ['svg2png']);
		gulp.watch(config.paths.input.scripts + '**/*.js', ['es-lint', 'babelify-develop']);
		gulp.watch(config.paths.input.htmlWatch, function () {
			plugins.runSequence('html-templating-develop', 'browser-reload');
		});
	});
};
