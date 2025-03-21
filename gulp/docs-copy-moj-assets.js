const gulp = require('gulp')

gulp.task('docs:copy-moj-assets', () => {
  return gulp
    .src(['node_modules/@ministryofjustice/frontend/moj/assets', 'node_modules/@ministryofjustice/frontend/moj/all.js'])
    .pipe(gulp.dest('package/dpr/assets/moj/'))
})
