var fs = require("fs");
var gulp = require('gulp');
var sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

var scriptSrc = ['./src/*.js'];
var sassSrc = ['./src/*.scss'];
var reload = browserSync.reload;


function styles() {
  return gulp.src(sassSrc)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 1%',
            'last 3 versions',
            'ie >= 10'],
            cascade: false,
            grid: true
        }))       
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());//instead of reloading, injecting css
}


function scripts() {
  return gulp.src(scriptSrc)
    .pipe(gulp.dest('./js'));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: "./",
            directory: true
        }
    });

}

var build = gulp.series(gulp.parallel(styles, scripts));

function watch() {
  gulp.watch(sassSrc, styles);
  gulp.watch(scriptSrc, scripts).on('change', reload);
  gulp.watch('./*.html' ).on('change', reload);
}

gulp.task('sass', styles );
gulp.task('scripts', scripts );
gulp.task('watch', gulp.parallel(watch, serve));
gulp.task('build', build);
gulp.task('serve', serve);