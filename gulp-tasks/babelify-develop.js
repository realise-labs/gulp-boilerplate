module.exports = function(gulp, plugins, config) {
	gulp.task('babelify-develop', function() {
		plugins.browserify(config.paths.input.scripts + 'main.js', { debug: true })
			.transform(plugins.babelify, { presets: ['es2015', 'react'], compact: false })
			.bundle()
			.on('error', function (err) { console.error(err); })
			.pipe(plugins.vinylSourceStream('main.js'))
			.pipe(plugins.vinylBuffer())
			.pipe(gulp.dest(config.paths.output.scripts));
	});
};
