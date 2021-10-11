'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass')(require('node-sass')),
    del = require('del');

let options = {
    sass_path: __dirname + '/sources/sass/',
    css_path: __dirname + '/css/'
};

let scssFiles = [
    options.sass_path + '**/*.scss',
    '!' + options.sass_path + '**/_*.scss',
];

gulp.task('clean:css', () => del([
        options.css_path + '**/*.css',
        options.css_path + '**/*.map'
    ], {force: true})
);

gulp.task('build:css', gulp.series('clean:css', () => gulp.src(scssFiles)
    .pipe(sass({
        noCache: true,
        outputStyle: 'develop'
    }))
    .pipe(gulp.dest(options.css_path))
));

gulp.task('default', gulp.series('build:css'));
