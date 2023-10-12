const gulp = require("gulp");

gulp.task('docs:assets', async () => {
  return gulp
    .src("docs/**/*.+(png|jpg|jpeg|gif|svg|ico|woff2)")
    .pipe(gulp.dest("package/dpr/"));
});
