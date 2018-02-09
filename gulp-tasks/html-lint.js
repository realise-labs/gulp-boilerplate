module.exports = function (gulp, plugins, config, errorHandler) {
	var reload = plugins.browserSync.reload;
	gulp.task('html-lint', function() {
		return gulp.src(config.paths.output.html)
			.pipe(plugins.plumber(errorHandler))
	        .pipe(plugins.htmllint({
	        	'rules' : {
	        		'doctype-first' : true,
	        		'line-end-style' : false,
					'attr-name-style' : 'dash',
					'attr-name-ignore-regex': ':',
					'attr-quote-style': 'double',
	        		'doctype-html5' : true,
	        		'html-req-lang' : true,
	        		'id-class-style' : 'dash',
	        		'img-req-alt' : 'allownull',
	        		'input-req-label' : true
	        	},
	        	'failOnError' : false
			}, htmllintReporter))
	        .pipe(reload({ stream: true}));
	});

	function htmllintReporter(filepath, issues) {
	    if (issues.length > 0) {
			console.log();
			console.log(plugins.util.colors.white(filepath));

	        issues.forEach(function (issue) {
				console.log(plugins.util.colors.white(issue.line + ':' + issue.column + '     ' + issue.msg) + plugins.util.colors.yellow(' [htmllint]'));
				// plugins.util.log(plugins.util.colors.cyan('[gulp-htmllint] ') + plugins.util.colors.white(filepath + ' [' + issue.line + ',' + issue.column + ']: ') + plugins.util.colors.red('(' + issue.code + ') ' + issue.msg));
			});
			console.log();
	    }
	}
};
