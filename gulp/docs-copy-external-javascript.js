const gulp = require('gulp');

gulp.task('docs:copy-external-javascript', () => {
  return gulp.src([
      'node_modules/@ministryofjustice/frontend/moj/all.js',
  ])
    .pipe(gulp.dest('package/dpr/assets/js/'));
});