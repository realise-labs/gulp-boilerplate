module.exports = function (gulp, plugins, config, errorHandler) {
	var reload = plugins.browserSync.reload;
	gulp.task('html-lint', function() {
	    return gulp.src('dist/index.html')
	        .pipe(plugins.htmllint({
	        	"rules" : {
	        		'doctype-first' : true,
	        		'line-end-style' : false,
	        		'attr-name-style' : 'dash',
	        		'doctype-html5' : true,
	        		'html-req-lang' : true,
	        		'id-class-style' : 'dash',
	        		'img-req-alt' : 'allownull',
	        		'input-req-label' : true
	        	},
	        	"failOnError" : true
	        }, htmllintReporter))
	        .pipe(reload({ stream: true}));
	});

	function htmllintReporter(filepath, issues) {
	    if (issues.length > 0) {
	        issues.forEach(function (issue) {
				plugins.gutil.log(plugins.gutil.colors.cyan('[gulp-htmllint] ') + plugins.gutil.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + plugins.gutil.colors.red('(' + issue.code + ') ' + issue.msg));
	        });

	        //process.exitCode = 1;
	    }
	}
};
