const gulp = require('gulp')

gulp.task('package:client-javascript', () => {
  return gulp.src(['src/dpr/all.min.mjs']).pipe(gulp.dest('package/dpr/assets/js'))
})
