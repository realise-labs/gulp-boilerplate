module.exports = function(gulp, plugins, config) {
	gulp.task('scss-lint', function() {
		return gulp.src(config.lintedFiles)
			.pipe(plugins.postcss([
				plugins.stylelint(),
				plugins.postcssReporter({ clearReportedMessages: true, throwError: true, noIcon: false, plugins: ['stylelint'] })
			], { syntax: plugins.postcssScss }));
	});
};
