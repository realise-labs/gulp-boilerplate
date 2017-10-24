module.exports = function(gulp, plugins, config) {
	//browser-sync task for starting the server.
	gulp.task('browser-sync', function() {
		//watch files
		var files = [
			//update this for all theme base file types
			config.paths.output.styles + '/*.css',
			config.paths.output.scripts + '/*.js',
			config.paths.output.html
		];

		if (config.browserSync.useProxy) {
			plugins.browserSync.init(files, {
				proxy: config.browserSync.proxyUrl,
				notify: false
			});
		} else {
			//initialize browsersync
			plugins.browserSync.init(files, {
				server: {
					baseDir: config.paths.output.devRoot
				}
			});
		}
	});
};