module.exports = function(gulp, plugins, config) {
	gulp.task('babelify-develop', function() {
		var args = plugins.watchify.args;
		args.debug = true;

		return plugins.watchify(plugins.browserify(config.paths.input.scripts + 'main.js', args))
			.transform(plugins.babelify, { presets: ['es2015', 'react'], compact: false })
			.bundle()
			.on('error', function (err) { console.error(err); })
			.pipe(plugins.vinylSourceStream('main.js'))
			.pipe(plugins.vinylBuffer())
			.pipe(gulp.dest(config.paths.output.scripts));
	});
};
