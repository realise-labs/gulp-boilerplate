var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),

	sequence = require('run-sequence'),

	// postcss plugins
	autoprefixer = require('autoprefixer'),
	reporter = require('postcss-reporter'),
	stylelint = require('stylelint'),
	cssnano = require('cssnano'),
	syntax_scss = require('postcss-scss');

var settings = {
	paths: {
		input: {
			styles: 'src/sass/**/*.scss'
		},

		output: {
			styles: 'dist/css'
		}
	}
};

gulp.task('scss-lint', function() {
	return gulp.src([settings.paths.input.styles, '!src/sass/main.scss', '!src/sass/components/_components.scss', '!src/sass/common/_base.scss', '!src/sass/vendor/**/*.scss'])
		.pipe(postcss([
            stylelint(),
            reporter({ clearMessages: true, throwError: true, noIcon: false })
        ], { syntax: syntax_scss }))

});


gulp.task('sass-develop', function() {
	return gulp.src(settings.paths.input.styles)
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([
			autoprefixer({browsers: ['> 1%'], cascade: false}),
			reporter({ clearMessages: true, throwError: true, noIcon: false })
		]))
		.pipe(gulp.dest(settings.paths.output.styles));
});

gulp.task('sass-build', function() {
	return gulp.src(settings.paths.input.styles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(postcss([
			cssnano,
			autoprefixer({browsers: ['> 1%'], cascade: false}),
			reporter({ clearMessages: true, throwError: true, noIcon: false })
		]))
		.pipe(gulp.dest(settings.paths.output.styles))
});


gulp.task('develop', function(callback) {
	sequence('scss-lint','sass-develop');
});

gulp.task('build', function(callback) {
	sequence('scss-lint','sass-develop');
});

gulp.task('default', ['develop']);