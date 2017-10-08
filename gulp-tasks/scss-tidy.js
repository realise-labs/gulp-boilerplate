module.exports = function(gulp, plugins, config) {

	gulp.task('scss-tidy', function() {
		return gulp.src(config.paths.input.styles)
			.pipe(plugins.postcss([
				plugins.postcssSorting({ 'properties-order': 'alphabetical' })
			], { syntax: plugins.postcssScss }))
			.pipe(gulp.dest('src/sass'));
	});
};