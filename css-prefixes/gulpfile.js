'use strict';

const gulp = require('gulp'),
    sass = require('gulp-sass')(require('node-sass')),
    concat = require('gulp-concat'),
    del = require('del'),
    through = require('through2'),
    postcss = require('postcss'),
    postcss_class_prefix = require('postcss-class-prefix');

let componentPrefix = () => {
    function injectComponentPrefix(file, encoding, callback) {
        let fileName = file.path.replace(file.base, '');
        if (fileName.startsWith('/components/') && fileName.endsWith('.css')) {
            let componentName = fileName.replace('/components/', '').replace('.css', '');
            let convertedCss = postcss()
                .use(postcss_class_prefix(componentName + '_'))
                .process(file.contents.toString());

            file.contents = Buffer.from(convertedCss.toString(), 'utf8');
        }
        this.push(file);
        callback();
    }

    return through.obj(injectComponentPrefix);
};

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
    .pipe(componentPrefix())
    .pipe(concat('index.css'))
    .pipe(gulp.dest(options.css_path))
));

gulp.task('default', gulp.series('build:css'));
