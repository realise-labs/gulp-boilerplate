module.exports = function(gulp, plugins, config) {
	gulp.task('babelify-build', function() {
		return plugins.browserify(config.paths.input.scripts + 'main.js', { debug: false })
			.transform(plugins.babelify, { presets: ['es2015', 'react'], compact: false })
			.bundle()
			.on('error', function (err) { console.error(err); })
			.pipe(plugins.vinylSourceStream('main.min.js'))
			.pipe(plugins.vinylBuffer())
			.pipe(plugins.uglify())
			.pipe(gulp.dest(config.paths.output.scripts));
	});
};