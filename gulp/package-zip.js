const gulp = require('gulp')
const zip = require('gulp-zip')

gulp.task('package:zip', () => {
  return gulp.src('package/**').pipe(zip('package.zip')).pipe(gulp.dest('package'))
})
