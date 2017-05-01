/**
 * Created by alexs_000 on 27.07.2016.
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

module.exports = function() {

    var isProd = process.env.NODE_ENV === "prod";

    gulp.task('vendor:styles', function() {
        return gulp.src([
                'client/libs/css/bootstrap.css',
                'client/libs/css/bootstrap-datepicker3.css',
                'client/libs/css/font-awesome.css'
            ])
            .pipe($.sourcemaps.init())
            .pipe($.concat('libs.less'))
            .pipe($.less())
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest('build/css'));
    });

    gulp.task('styles', function() {
        return gulp.src(['client/styles/**/*.less'])
            .pipe($.sourcemaps.init())
            .pipe($.concat('main.less'))
            .pipe($.less())
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest('build/styles'));
    });

    gulp.task('css:all', ['vendor:styles', 'styles']);

    gulp.task('css', ['styles']);
};