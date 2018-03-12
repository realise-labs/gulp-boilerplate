module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('es-lint', function() {
        return gulp.src([config.paths.input.scripts + '**/*.js', '!' + config.paths.input.scripts + 'vendor/**/*.js'])
            .pipe(plugins.cached('es-lint'))
            .pipe(plugins.eslint())    
            .pipe(plugins.eslint.format());
	});
};
