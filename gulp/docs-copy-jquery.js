const gulp = require('gulp');

gulp.task('docs:copy-jquery', () => {
  return gulp.src([
      'node_modules/jquery/dist/jquery.min.js',
    ])
    .pipe(gulp.dest('package/dpr/js/'));
});