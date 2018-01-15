module.exports = function(gulp, plugins, config, errorHandler) {
	gulp.task('babelify-build', function() {
		config.bundles.forEach((bundle) => {
			plugins.browserify(config.paths.input.scripts + bundle + '.js', { debug: false })
			.transform(plugins.babelify, { presets: ['es2015'], compact: false })
			.bundle()
			.on('error', function (error) {
				error.plugin = 'babelify';
				errorHandler.call(this, error);
			})
			.pipe(plugins.vinylSourceStream(bundle + '.min.js'))
			.pipe(plugins.vinylBuffer())
			.pipe(plugins.uglify())
			.pipe(gulp.dest(config.paths.output.scripts));
		});
	});
};