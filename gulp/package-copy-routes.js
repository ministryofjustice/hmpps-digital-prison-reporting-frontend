const gulp = require('gulp')

gulp.task('package:copy-routes', () => {
  return gulp.src(['src/dpr/routes/**/*.js']).pipe(gulp.dest('package/dpr/routes'))
})
