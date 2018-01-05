module.exports = function (gulp, plugins, config, errorHandler) {
	gulp.task('es-lint', function() {
        return gulp.src([config.paths.input.scripts + '**/*.js', '!' + config.paths.input.scripts + 'vendor/**/*.js'])
            .pipe(plugins.eslint({
                'extends': 'eslint:recommended',
                'parserOptions': {
                    'ecmaVersion': 6,
                    'sourceType': 'module'
                },
                'rules': {
                    // Full list of rules here: https://eslint.org/docs/rules/
                    'camelcase': 'warn',
                    'curly': 'warn',
                    'eqeqeq': 'warn',
                    'indent': ['warn', 'tab'],
                    'no-extra-semi': 'warn',
                    'quotes': ['warn', 'single'],
                    'semi': 'warn'
                }
            }))    
            .pipe(plugins.eslint.format());
	});
};
