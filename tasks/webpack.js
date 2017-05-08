/**
 * Created by alexs_000 on 27.07.2016.
 */
var gulp = require('gulp');
var named = require('vinyl-named');
var webpackStream = require('webpack-stream');
var webpack = webpackStream.webpack;

module.exports = function() {
    gulp.task('webpack', function() {
        return gulp.src([
                'client/js/vendor.js',
                'client/js/admin.js',
                'client/js/welcome.js'
            ])
            .pipe(named())
            .pipe(webpackStream({
                watch: true,
                output: {
                    publicPath: '',
                    library: 'app'
                },
                devtool: 'source-map',
                plugins: [
                    new webpack.ProvidePlugin({
                        riot: 'riot'
                    })
                ],
                module: {
                    preLoaders: [
                        { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
                    ],
                    loaders: [{
                        test: /\.js$/,
                        loader: "babel-loader",
                        include: './client/',
                        query: {
                            plugins: ['transform-runtime'],
                            presets: ['es2015', "es2015-riot"]
                        }
                    }]
                }
            }))
            .pipe(gulp.dest('build/js'));
    });
};