const gulp = require('gulp')

gulp.task('package:copy-fonts', () => {
  return gulp
    .src(['node_modules/@material-design-icons/font/material-icons.woff2'])
    .pipe(gulp.dest('package/dpr/assets/fonts'))
})
