const gulp = require('gulp')

gulp.task('docs:copy-moj-assets', () => {
  return gulp
    .src([
      'package/dpr/assets/**/*'
    ])
    .pipe(gulp.dest('package/dpr/assets/dpr'))
})
