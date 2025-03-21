const gulp = require('gulp')

gulp.task('docs:copy-gov-assets', () => {
  return gulp
    .src([
      'node_modules/govuk-frontend/dist/govuk/assets/**',
      'node_modules/govuk-frontend/dist/govuk/govuk-frontend.min.js',
    ])
    .pipe(gulp.dest('package/dpr/assets/govuk/'))
})
