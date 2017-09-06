var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),
	sequence = require('run-sequence'),
	// svg sprite stuff
	size = require('gulp-size'),
	svgsprite = require('gulp-svg-sprite'),
	svgo = require('gulp-svgo'),
	svg2png = require('gulp-svg2png'),

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
			styles: 'src/sass/**/*.scss',
			spritesrc: 'src/img/sprite-src'
		},

		output: {
			styles: 'dist/css',
			sprite: 'dist/img/sprites'
		}
	}
};

// configs
var nanoConfig = { safe: false, autoprefixer: false };
var autoprefixerConfig = { browsers: ['> 1%', 'last 3 versions', 'Android >= 4', 'iOS >= 7'] };
var spriteConfig = {
	mode: {
		css: {
			dest: "./",
			sprite: "dist/img/sprites/sprites.svg",
			bust: false,
			render: {
				scss: {
					dest: "./src/sass/common/_spritesheet.scss",
					template: "./src/sass/vendor/_sprite-template.scss"
				}
			},
		},
	},
	variables: {
		mapname: "icons"
	}
};


//tasks
gulp.task('svg2png', function () {
    gulp.src('./dist/img/sprites/**/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./dist/img/sprites/'));
});

gulp.task('svgo-sprite', function() {
	return gulp.src('./dist/img/sprites/**/*.svg')
		.pipe(svgo())
		.pipe(gulp.dest('./dist/img/sprites'))
})

gulp.task('sprite', function() {
	return gulp.src('**/*.svg', {cwd: 'src/img/sprite-src'})
		.pipe(svgsprite(spriteConfig))
		.pipe(gulp.dest('./'))
})

gulp.task('scss-lint', function() {
	return gulp.src([settings.paths.input.styles, '!src/sass/common/_spritesheet.scss','!src/sass/main.scss', '!src/sass/components/_components.scss', '!src/sass/common/_base.scss', '!src/sass/common/_mixins.scss', '!src/sass/vendor/**/*.scss'])
		.pipe(postcss([
			stylelint(),
			reporter({ clearAllMessages : true, throwError: true, noIcon: false })
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
			//reporter({ clearReportedMessages : true, throwError: true, noIcon: false, formatter: function(input) { return input.source + ' produced ' + input.messages.length + ' messages';} })
		]))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(settings.paths.output.styles))
});


gulp.task('develop', function(callback) {
	sequence('sprite', 'sass-develop');
});

gulp.task('build', function(callback) {
	sequence('sprite', 'svg2png', 'svgo-sprite', 'sass-build');
});

gulp.task('default', ['develop']);