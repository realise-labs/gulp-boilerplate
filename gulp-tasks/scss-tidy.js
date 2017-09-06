module.exports = function(gulp, plugins, config) {

	gulp.task('scss-tidy', function() {
		return gulp.src(config.paths.input.styles)
			.pipe(plugins.postcss([
				plugins.postcssSorting({ "properties-order": "alphabetical" })
			], { syntax: plugins.postcssScss }))
			.pipe(gulp.dest('src/sass'));
	});
};




/*gulp.task('scss_tidy', function() {
	return gulp.src(settings.paths.input.styles)
		.pipe(postcss([
			postcsssorting({ "properties-order": "alphabetical" })
		], { syntax: syntax_scss }))
		.pipe(gulp.dest('src/sass'));
});

gulp.task('sass_develop', ['scss-tidy', 'scss-lint'], function() {
	return gulp.src(settings.paths.input.styles)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(settings.paths.output.styles));
});

gulp.task('sass_build', ['scss-tidy', 'scss-lint'], function() {
	return gulp.src(settings.paths.input.styles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(postcss([
			cssnano,
			autoprefixer({browsers: ['> 1%'], cascade: false}),
			reporter({ clearMessages: true, throwError: true, noIcon: false })
		]))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(settings.paths.output.styles));
});*/
