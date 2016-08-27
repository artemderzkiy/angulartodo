const gulp = require('gulp');
const bs = require('browser-sync');

gulp.task('default', ['connect', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./*.html').on('change', bs.reload);
  gulp.watch('./*.css').on('change', bs.reload);
  gulp.watch('./*.js').on('change', bs.reload);
});

gulp.task('connect', function() {
  bs.init({
    server: './',
      port: 8000
  });
});