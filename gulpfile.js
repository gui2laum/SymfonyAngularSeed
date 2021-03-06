"use strict";

var gulp = require('gulp'),
    vinylPaths = require('vinyl-paths'),
    del = require('del'),
    bower = require('gulp-bower'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    es = require('event-stream'),
    rs = require('run-sequence'),

    minifyCss = require('gulp-minify-css'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),

    ngmin = require('gulp-ng-annotate'),
    connect = require('gulp-connect'),
    proxy = require('proxy-middleware'),
    flatten = require('gulp-flatten'),
    replace = require('gulp-replace');

var webRoot = 'web/',
    folders = {
        resource : 'src/SymfonyAngularSeed/FrontendBundle/Resources/web/',
        index :  'src/SymfonyAngularSeed/FrontendBundle/Resources/views/Default/',
	    tmp : webRoot + '.tmp/',
        node : 'node_modules/',
        symfony_vendor : 'vendor/',
        bin : 'bin/',
        lib : 'lib/',
        css : 'css/',
        images : 'images/',
        scripts : 'scripts/',
        views : 'views/'
    },
    files = {
        index: 'index.html.twig'
    };

// Clean Tasks
gulp.task('clean:lib', function() {
	return gulp.src(webRoot + folders.lib, { read : false })
        .pipe(vinylPaths(del));
});

gulp.task('clean:resource', function() {
	return gulp.src([
        webRoot + folders.css,
        webRoot + folders.images,
        webRoot + folders.scripts,
        webRoot + folders.views
    ], { read : false }).pipe(vinylPaths(del));
});

gulp.task('clean:tmp', function() {
	return gulp.src(folders.tmp, { read : false })
        .pipe(vinylPaths(del));
});

gulp.task('clean:tmp:usemin', function() {
	return gulp.src([
        folders.tmp + folders.scripts,
        folders.tmp + files.index
    ], { read : false }).pipe(vinylPaths(del));
});

gulp.task('clean:tmp:others', function() {
	return gulp.src([
        folders.tmp + folders.images,
        folders.tmp + folders.css,
        folders.tmp + folders.views
    ], { read : false }).pipe(vinylPaths(del));
});

gulp.task('clean:bower', function() {
	return gulp.src([
        folders.resource + folders.lib + '*',
        '!' + folders.resource + folders.lib + '.gitkeep',
    ], { read : false }).pipe(vinylPaths(del));

});

gulp.task('clean:node', function() {
	return gulp.src(folders.node, { read : false })
        .pipe(vinylPaths(del));
});

gulp.task('clean:symfony', function() {
	return gulp.src([folders.bin, folders.symfony_vendor ], { read : false 	})
        .pipe(vinylPaths(del));
});

gulp.task('clean:index', function() {
	return gulp.src(folders.index + files.index, { read : false })
        .pipe(vinylPaths(del));
});

// Tasks
gulp.task('resources:dev', [ 'clean:resource' ], function() {
	return gulp.src([
        folders.resource + folders.css + '**/*.css',
        folders.resource + folders.images + '**/*',
        folders.resource + folders.scripts + '**/*.js',
        folders.resource + folders.views + '**/*.html'
    ], { base : folders.resource }).pipe(gulp.dest(webRoot));
});

gulp.task('lib:dev', [ 'clean:lib' ], function() {
	return gulp.src(folders.resource + folders.lib + '**/*', { base : folders.resource })
        .pipe(gulp.dest(webRoot));
});

gulp.task('index:dev', [ 'clean:index' ], function() {
	return gulp.src(folders.index + files.index + '.dist')
        .pipe(replace(/<script data-usemin=\"js_vendor\" src=\"([0-9a-zA-Z\-_\s\.\/]*)\"><\/script>/g,
            '<script src="{{ asset(\'$1\') }}"></script>'))
        .pipe(replace(/<script data-usemin=\"js_app\" src=\"([0-9a-zA-Z\-_\s\.\/]*)\"><\/script>/g,
            '<script src="{{ asset(\'$1\') }}"></script>'))
        .pipe(rename(files.index))
        .pipe(gulp.dest(folders.index));
});

gulp.task('usemin:index', [ 'clean:tmp:usemin' ], function() {
    return gulp.src(folders.index + files.index + '.dist')
        .pipe(replace(/<script data-usemin=\"js_vendor\" src=\"([0-9a-zA-Z\-_\s\.\/]*)\.js\"><\/script>/g,
            '<script src="../../' + folders.resource + '$1.min.js"></script>'))
        .pipe(replace(/<script data-usemin=\"js_app\" src=\"([0-9a-zA-Z\-_\s\.\/]*)\.js\"><\/script>/g,
            '<script src="../../' + folders.resource + '$1.js"></script>'))
        .pipe(gulp.dest(folders.tmp));
});

gulp.task('usemin', [ 'usemin:index' ], function() {
    return gulp.src(folders.tmp + files.index + '.dist').pipe(usemin({
            html : [ minifyHtml({
                empty : true,
                conditionals : true,
                spare : true,
                quotes : true
            })],
            js_vendor : [ 'concat' ],
            js_app : [ ngmin(), uglify(), 'concat' ]
        }))
        .pipe(gulp.dest(folders.tmp));
});

gulp.task('resources:others', [ 'clean:tmp:others' ], function() {
	return gulp.src([
        folders.resource + folders.css + '**/*.css',
        folders.resource + folders.images + '**/*',
        folders.resource + folders.views + '**/*.html'
    ], { base : folders.resource }).pipe(gulp.dest(folders.tmp));
});

gulp.task('resources', [ 'usemin', 'resources:others', 'clean:resource', 'clean:lib' ], function() {
	var stream1 = gulp.src([
            folders.tmp + folders.css + '**/*.css',
            folders.tmp + folders.images + '**/*',
            folders.tmp + folders.scripts + '**/*.js',
            folders.tmp + folders.views + '**/*.html'
        ], { base : folders.tmp }).pipe(gulp.dest(webRoot));

    var stream2 = gulp.src(folders.tmp + files.index + '.dist')
        .pipe(replace(/<script src=\"([0-9a-zA-Z\-_\s\.\/]*)\"><\/script>/g,
            '<script src="{{ asset(\'$1\') }}"></script>'))
        .pipe(rename(files.index))
        .pipe(gulp.dest(folders.index));

    return es.merge(stream1, stream2);
});

gulp.task('finalization', function(callback) {
    rs('resources', 'clean:tmp', callback);
});

gulp.task('bower', [ 'clean:bower'], function() {
	return bower();
});

// High level tasks
gulp.task('build', [ 'finalization' ]);
gulp.task('build:dev', [ 'resources:dev', 'lib:dev', 'index:dev' ]);
gulp.task('install', [ 'bower' ]);
gulp.task('clean:all', [ 'clean:lib', 'clean:resource', 'clean:install', 'clean:node', 'clean:symfony', 'clean:index' ]);

// LiveReload
gulp.task('watch', function () {
    // Starts the server
    livereload.listen();
    gulp.watch([folders.resource + '**/*', '!' + folders.resource + folders.lib + '**/*' ], ['resources:dev'])
        .on('change', livereload.changed);
});

// Default task
gulp.task('default', function() {
	gulp.run('build');
});
