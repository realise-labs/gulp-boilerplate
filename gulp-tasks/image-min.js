module.exports = function(gulp, plugins, config) {
	gulp.task('image-min', function() {
		return gulp.src(config.paths.input.images)
			.pipe(plugins.imagemin([
				plugins.imageminJpegRecompress({
					quality: 'low'
				})
			]))
			.pipe(gulp.dest(config.paths.output.images));
	});
};