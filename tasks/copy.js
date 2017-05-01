var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function() {

    gulp.task('fonts', function() {
        return gulp.src(['node_modules/bootstrap/dist/fonts/*',
                'node_modules/font-awesome/fonts/*'
            ])
            .pipe(gulp.dest('build/fonts/'))
    });

    // Copy all third party dependencies from node_modules to vendor directory
    gulp.task('copy', ['fonts']);
};