module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('html-templating-develop', function (callback) {
		plugins.runSequence('merge-data-develop', 'compile-handlebars', callback);
	});

	var combined = {};

	gulp.task('merge-data-develop', function (callback) {
		gulp.src(config.paths.input.data)
			.pipe(plugins.mergeJson({
				endObj: {
					'context': {
						'task': 'develop'
					}
				}
			}))
			.pipe(gulp.dest((output) => {
				combined = JSON.parse(output.contents.toString());

				callback();
				return ''; // Don't actually write the output anywhere
			}));
	});

	gulp.task('compile-handlebars', function () {
		gulp.src(config.paths.input.html)
			.pipe(plugins.nunjucks.compile(combined))
			.pipe(gulp.dest(config.paths.output.devRoot));
	});
};
