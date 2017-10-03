'use strict'

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const image = require('gulp-image');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const DEV_FOLDER = 'src';
const PROD_FOLDER = 'public';

gulp.task('styles', () => {
    return gulp.src(`./${DEV_FOLDER}/styles/**/*.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(`./${PROD_FOLDER}/styles`))
        .pipe(reload({stream: true}));
});

gulp.task('images', () => {
    return gulp.src(`./${DEV_FOLDER}/assets/*`)
        .pipe(image())
        .pipe(gulp.dest(`${PROD_FOLDER}/assets`))
});

gulp.task('scripts', () => {
    gulp.src(`./${DEV_FOLDER}/scripts/index.js`)
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest(`./${PROD_FOLDER}/scripts`))
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: '.'  
  })
});

gulp.task('watch', () => {
    gulp.watch(`./${DEV_FOLDER}/styles/**/*.scss`, ['styles']);
    gulp.watch('*.html', reload);
    gulp.watch(`./${DEV_FOLDER}/assets/*`, ['image']);
    return gulp.watch(`./${DEV_FOLDER}/scripts/index.js`, ['scripts']);
});

gulp.task('default', ['browser-sync', 'images', 'styles', 'scripts', 'watch']);