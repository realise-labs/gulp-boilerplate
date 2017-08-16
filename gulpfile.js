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
	postcsssorting = require('postcss-sorting'),
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

// configs
var nanoConfig = { safe: false, autoprefixer: false };
var autoprefixerConfig = { browsers: ['> 1%', 'last 3 versions', 'Android >= 4', 'iOS >= 7'] };


gulp.task('scss-lint', function() {
	return gulp.src([settings.paths.input.styles, '!src/sass/main.scss', '!src/sass/components/_components.scss', '!src/sass/common/_base.scss', '!src/sass/common/_mixins.scss', '!src/sass/vendor/**/*.scss'])
		.pipe(postcss([
			stylelint(),
			reporter({ clearReportedMessages: true, throwError: true, noIcon: false, plugins: ['stylelint'] })
        ], { syntax: syntax_scss }))
});

gulp.task('scss-tidy', function() {
	return gulp.src(settings.paths.input.styles)
		.pipe(postcss([
			postcsssorting({ "properties-order": "alphabetical" })
		], { syntax: syntax_scss }))
		.pipe(gulp.dest('src/sass'))
});



gulp.task('sass-develop', ['scss-tidy', 'scss-lint'], function() {
	return gulp.src(settings.paths.input.styles)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(settings.paths.output.styles));
});

gulp.task('sass-build', ['scss-tidy', 'scss-lint'], function() {
	return gulp.src(settings.paths.input.styles)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(postcss([
			cssnano,
			autoprefixer({browsers: ['> 1%'], cascade: false}),
			reporter({ clearMessages: true, throwError: true, noIcon: false })
		]))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(settings.paths.output.styles))
});


gulp.task('develop', function(callback) {
	sequence('sass-develop');
});

gulp.task('build', function(callback) {
	sequence('sass-build');
});

gulp.task('default', ['develop']);