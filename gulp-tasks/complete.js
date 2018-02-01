var playSound = require('./play-sound');

module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('complete', function() {
		playSound(config.sounds.success);
	});
};
