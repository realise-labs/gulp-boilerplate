module.exports = function(gulp, plugins, config) {
	gulp.task('watch', function() {
		gulp.watch(config.paths.input.staticDev,  ['copy-dev']);
		gulp.watch(config.paths.input.styles, ['sass-develop']);
		gulp.watch(config.paths.input.spriteSrc, ['sprite-create']);
		gulp.watch(config.paths.input.images + '**/*.svg', ['svg2png']);
		gulp.watch(config.paths.input.scripts + '**/*.js', ['babelify-develop']);
		gulp.watch(config.paths.input.html, ['html-templating-develop']);
	});
};