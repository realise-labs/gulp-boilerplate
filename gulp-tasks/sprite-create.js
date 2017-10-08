module.exports = function(gulp, plugins, config) {
	gulp.task('sprite-create', function() {
		return gulp.src('**/*.svg', {cwd: 'src/images/sprite-src'})
			.pipe(plugins.svgSprite(config.sprite))
			.pipe(gulp.dest('./'));
	});
};