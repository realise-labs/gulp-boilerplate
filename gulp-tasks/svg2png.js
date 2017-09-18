module.exports = function(gulp, plugins, config) {
	gulp.task('svg2png', function () {
	    gulp.src('./dist/img/sprites/**/*.svg')
	        .pipe(plugins.svg2png())
	        .pipe(gulp.dest('./dist/img/sprites/'));
	});
}