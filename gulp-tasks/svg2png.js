module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('svg2png', function () {
		gulp.src('./dist/images/sprites/**/*.svg')
		.pipe(plugins.plumber())
		.pipe(plugins.svg2png())
		.pipe(gulp.dest('./dist/images/sprites/'));
	});
};