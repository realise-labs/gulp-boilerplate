module.exports = function (gulp, plugins, config, errorHandler) {

  var svgConfig = {
	  svg: {
	    namespaceClassnames: true
	  },
    shape: {
    // Choose a folder to store the
    // intermediate SVG files in.
    dest: config.sprite.shapeDest,
    spacing: {
          padding: 5
        }
},
	  mode: {
	    css: {
        dest: config.sprite.dest,
	      sprite: config.sprite.spritePath,
        layout:'diagonal',
        render: {
            scss: {
              dest: config.sprite.scssDest,
              template: config.sprite.scssTemplate
            }
	    }
	  }
	}
};

  gulp.task('sprite', function (callback) {
    return gulp.src(config.paths.input.spriteSrc).pipe(plugins.svgSprite(svgConfig)).pipe(gulp.dest('.'));
  });

}
