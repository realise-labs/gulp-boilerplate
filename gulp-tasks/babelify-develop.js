module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('babelify-develop', function() {
		var args = plugins.watchify.args;
		args.debug = true;

		config.bundles.forEach((bundle) => {
			plugins.watchify(plugins.browserify(config.paths.input.scripts + bundle + '.js', args))
			.transform(plugins.babelify, { presets: ['es2015'], compact: false })
			.bundle()
			.on('error', errorHandler)
			.pipe(plugins.vinylSourceStream(bundle + '.js'))
			.pipe(plugins.vinylBuffer())
			.pipe(gulp.dest(config.paths.output.scripts));
		});
	});
};
