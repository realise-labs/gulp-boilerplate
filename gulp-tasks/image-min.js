module.exports = function(gulp, plugins, config) {
	gulp.task('image-min', function() {
		return gulp.src(config.paths.input.images)
			.pipe(plugins.imagemin([
				plugins.imageminJpegRecompress({
					quality: 'low'
				}),
				plugins.imageminPngquant({
					speed: 1,
					quality: 75 //lossy settings
            	}),
				plugins.imageminZopfli({
                	more: true
            	}),
				plugins.imagemin.svgo({plugins: [{removeViewBox: true}]}),
				plugins.imagemin.gifsicle({interlaced: true})
			], {
				verbose: true
			}))
			.pipe(gulp.dest(config.paths.output.images));
	});
};
