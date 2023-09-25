const gulp = require('gulp');

gulp.task('package:copy-views', () => {
  return gulp.src([
      'src/dpr/**/*.njk',
    ])
    .pipe(gulp.dest('package/dpr'));
});