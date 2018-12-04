var gulp         = require('gulp');
var sass         = require('gulp-sass');
var babel        = require('gulp-babel');
var cleanCSS     = require('gulp-clean-css');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

// Config
var config = {
    srcCSS: 'src/**/*.scss',
    distCSS: 'css',
    srcJS: 'src/**/*.js',
    distJS: 'js'
}

// Browser Sync
gulp.task('browser-sync', function() {
    browserSync({
        server: './'
    });
});

// Javascript
gulp.task('js', function() {
    return gulp.src(config.srcJS)
        .pipe(babel({retainLines: true}))
        .pipe(uglify())
        .pipe(gulp.dest(config.distJS))
        .pipe(browserSync.stream());
});

// Sass
gulp.task('sass', function() {
    return gulp.src(config.srcCSS)
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({cascade: false}))
        .pipe(gulp.dest(config.distCSS))
        .pipe(browserSync.stream())
        .pipe(cleanCSS())
        .pipe(gulp.dest(config.distCSS))
        .pipe(browserSync.stream());
});

// Main task
gulp.task('run', ['browser-sync', 'sass', 'js'], function() {
    gulp.watch(config.srcCSS, ['sass']);
    gulp.watch(config.srcJS, ['js']);
    gulp.watch('*.html', browserSync.reload);
});

gulp.task('default', ['run']);