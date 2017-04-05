'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

gulp.task('eslint:tests', () => {
  return gulp.src(['src/**/*.spec.js'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('eslint:code', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('mochaTest', () => {
  return gulp.src('src/**/*.spec.js', { read: false }).pipe(mocha({ reporter: 'dot' }));
});

gulp.task('watch', ['test'], () => {
  gulp.watch('src/**/*.js', ['mochaTest']);
});

gulp.task('test', ['eslint:tests', 'eslint:code', 'mochaTest']);
gulp.task('default', ['clean:dist', 'test', 'build', 'compress']);
