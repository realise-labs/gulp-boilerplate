module.exports = function(gulp, plugins, config) {

    gulp.task('copy-dev', function() {
        //copy static files
        gulp.src(config.paths.input.staticBuild).pipe(gulp.dest(config.paths.output.devRoot));
    });
};
