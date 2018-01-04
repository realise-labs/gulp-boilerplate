module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('sass-build', ['scss-lint'], function() {
		return gulp.src(config.paths.input.styles)
			.pipe(plugins.plumber(errorHandler))
			.pipe(plugins.sourcemaps.init())
			.pipe(plugins.sass())
			.pipe(plugins.sourcemaps.write())
			.pipe(plugins.postcss([
				plugins.cssnano,
				plugins.autoprefixer({browsers: ['> 1%'], cascade: false}),
				plugins.postcssReporter({ clearMessages: true, throwError: true, noIcon: false })
			]))
			.pipe(plugins.rename({suffix: '.min'}))
			.pipe(gulp.dest(config.paths.output.styles));
	});
};
