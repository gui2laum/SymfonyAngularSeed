,'use strict';

var gulp = require('gulp'), //
    minifyCss = require('gulp-minify-css'), //
    usemin = require('gulp-usemin'), //
    uglify = require('gulp-uglify'), //
    minifyHtml = require('gulp-minify-html'), //
    livereload = require('gulp-livereload'), //
    ngmin = require('gulp-ng-annotate'), //
    connect = require('gulp-connect'), //
    proxy = require('proxy-middleware'), //
    flatten = require('gulp-flatten'), //
    clean = require('gulp-clean'), //
    replace = require('gulp-replace'), //
    bower = require('gulp-bower');

var webRoot = 'web/',
    assets = webRoot + 'assets/',
    folders = {
        resource : 'src/SymfonyAngularSeed/FrontendBundle/Resources/public/',
	    assets_app : assets + 'frontend/',
        assets_vendor : assets + 'vendor/',
	    tmp : webRoot + '.tmp/',
        node : 'node_modules/',
        symfony_vendor : 'vendor/',
        bin : 'bin/'
    };

// Tasks
gulp.task('clean:build', function() {
	return gulp.src(assets, {
		read : false
	}).pipe(clean());
});

gulp.task('clean:tmp', function() {
	return gulp.src(folders.tmp, {
		read : false
	}).pipe(clean());
});

gulp.task('clean:install', function() {
	return gulp.src([folders.resource + 'lib/', folders.node, folders.bin, folders.symfony_vendor ], {
		read : false
	}).pipe(clean());
});

gulp.task('resources:dev', function() {
	return gulp.src([folders.resource + 'css', folders.resource + 'images', folders.resource + 'scripts', folders.resource + 'views']).pipe(gulp.dest(folders.assets_app));
});

gulp.task('lib:dev', function() {
	return gulp.src(folders.resource + 'lib').pipe(gulp.dest(folders.assets_vendor));
});

gulp.task('bower', function() {
	return bower();
});

// High level tasks
gulp.task('build', [ 'clean:build' ]);
gulp.task('build:dev', [ 'clean:build', 'resources:dev', 'lib:dev' ]);
gulp.task('install', [ 'bower' ]);
gulp.task('clean:all', [ 'clean:build', 'clean:install' ]);

// Default task
gulp.task('default', function() {
	gulp.run('build');
});
