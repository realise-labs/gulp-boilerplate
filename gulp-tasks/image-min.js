module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('image-min', function() {
		return gulp.src(config.paths.input.images)
			.pipe(plugins.plumber(errorHandler))
			.pipe(plugins.imagemin([
				plugins.imageminJpegRecompress({
					quality: 'low'
				})
			]))
			.pipe(gulp.dest(config.paths.output.images));
	});
};