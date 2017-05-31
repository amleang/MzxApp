const gulp = require('gulp');
const config = require('./webpack.dev.conf');
const webpack = require('webpack-stream');


gulp.task('default', () => {
  return gulp.src('./start.js')
        .pipe(webpack(config))
        .pipe(gulp.dest('dist/'));
});

