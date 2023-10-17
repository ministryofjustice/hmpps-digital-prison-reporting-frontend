const gulp = require('gulp');

gulp.task('docs:copy-gov-assets', () => {
  return gulp.src([
      'node_modules/govuk-frontend/govuk/assets/**',
    ])
    .pipe(gulp.dest('package/dpr/assets/govuk/'));
});