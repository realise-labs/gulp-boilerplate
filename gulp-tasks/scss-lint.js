module.exports = function(gulp, plugins, config) {
	var lintedFiles = [
		config.paths.input.styles,
		'!' + config.paths.input.stylesFolder + '/main.scss',
		'!' + config.paths.input.stylesFolder + '/common/_spritesheet.scss',
		'!' + config.paths.input.stylesFolder + '/components/_components.scss',
		'!' + config.paths.input.stylesFolder + '/common/_base.scss',
		'!' + config.paths.input.stylesFolder + '/common/_mixins.scss',
		'!' + config.paths.input.stylesFolder + '/vendor/**/*.scss'
	]

	gulp.task('scss-lint', function() {
		return gulp.src(lintedFiles)
			.pipe(plugins.postcss([
				plugins.stylelint(),
				plugins.postcssReporter({ clearReportedMessages: true, throwError: true, noIcon: false, plugins: ['stylelint'] })
	        ], { syntax: plugins.postcssScss }));
	});
};
