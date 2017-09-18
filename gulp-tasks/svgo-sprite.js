module.exports = function(gulp, plugins, config) {
	gulp.task('svgo-sprite', function() {
		return gulp.src('./dist/img/sprites/**/*.svg')
			.pipe(plugins.svgo())
			.pipe(gulp.dest('./dist/img/sprites'))
	})
}