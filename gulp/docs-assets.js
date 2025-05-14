const gulp = require("gulp");

gulp.task('docs:assets', async () => {
  return gulp
    .src("docs/assets/**/*.*", { encoding: false })
    .pipe(gulp.dest("package/dpr/assets/"));
});
