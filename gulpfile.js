var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');

var config = {
  styles: {
    main: './files-dev/stylus/main.styl',
    watch: './files-dev/stylus/**/*.styl',
    output: './files/css'
  },
  html: {
    watch: './*.html'
  }
};

gulp.task('server', function() {
  gulp.src('./')
    .pipe(webserver({
      host: '0.0.0.0',
      port: 3355,
      livereload: true
    }));
});

gulp.task('build:css', function() {
  gulp.src(config.styles.main)
    .pipe(stylus({
      use: nib(),
      'include css': true
    }))
    .pipe(minifyCSS())
    .pipe(gulp.dest(config.styles.output));
});

gulp.task('watch', function() {
  gulp.watch(config.styles.watch, ['build:css']);
  gulp.watch(config.html.watch, ['build']);
});

gulp.task('build', ['build:css']);

gulp.task('default', ['server', 'watch', 'build']);
