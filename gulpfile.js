var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var postCSS = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');

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



gulp.task('develop', function(callback) {});

gulp.task('build', function(callback) {});

gulp.task('default', ['develop']);