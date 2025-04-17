
const gulp = require('gulp')

gulp.task('package:copy-middleware', () => {
  return gulp.src(['src/dpr/middleware/**/*.ts']).pipe(gulp.dest('package/dpr/middleware'))
})
