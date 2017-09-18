module.exports = function(gulp, plugins, config) {
	var lintedFiles = [
		config.paths.input.styles,
		'!src/sass/main.scss',
		'!src/sass/common/_spritesheet.scss',
		'!src/sass/components/_components.scss',
		'!src/sass/common/_base.scss',
		'!src/sass/common/_mixins.scss',
		'!src/sass/vendor/**/*.scss'
	]

	gulp.task('scss-lint', function() {
		return gulp.src(lintedFiles)
			.pipe(plugins.postcss([
				plugins.stylelint(),
				plugins.postcssReporter({ clearReportedMessages: true, throwError: true, noIcon: false, plugins: ['stylelint'] })
	        ], { syntax: plugins.postcssScss }));
	});
};
