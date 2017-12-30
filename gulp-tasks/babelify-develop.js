module.exports = function(gulp, plugins, config) {
	gulp.task('babelify-develop', function() {
		var args = plugins.watchify.args;
		args.debug = true;

		return plugins.watchify(plugins.browserify(config.paths.input.scripts + 'main.js', args))
			.transform(plugins.babelify, { presets: ['es2015', 'react'], compact: false })
			.bundle()
			.on('error', function (err) {
				console.log();
				console.log('\x1b[31mJavaScript error!\x1b[0m');
				console.log(err.message);
				console.log();
				console.log(err.filename);
				console.log('Line ' + err.loc.line + ' Column ' + err.loc.column);
				console.log(err.codeFrame);
				console.log();
			})
			.pipe(plugins.vinylSourceStream('main.js'))
			.pipe(plugins.vinylBuffer())
			.pipe(gulp.dest(config.paths.output.scripts));
	});
};
