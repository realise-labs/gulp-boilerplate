module.exports = function (sound) {
	require('child_process').exec('cmdmp3.exe ' + sound, { cwd: process.cwd() + '\\gulp-tasks' });
};