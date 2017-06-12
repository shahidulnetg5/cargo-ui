var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var webpack = require('gulp-webpack');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'webpack'], function () {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/assets/sass/*.scss", ['sass']);
    gulp.watch("app/assets/js/*.js", ['webpack']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("app/assets/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/public/css"))
        .pipe(browserSync.stream());
});

// Compile js auto-inject into browsers
gulp.task('webpack', function () {
    return gulp.src('app/assets/js/app.js')
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('app/public/js'));
});

gulp.task('default', ['serve']);
