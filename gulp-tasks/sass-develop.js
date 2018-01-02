module.exports = function(gulp, plugins, config) {
	gulp.task('sass-develop', ['scss-lint'], function() {
		return gulp.src(config.paths.input.styles)
			.pipe(plugins.plumber())
			.pipe(plugins.sass())
			.pipe(gulp.dest(config.paths.output.styles));
	});
};
