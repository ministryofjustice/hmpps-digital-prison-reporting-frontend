const gulp = require("gulp");

gulp.task('docs:assets', async () => {
  return gulp
    .src("docs/assets/**/*.*")
    .pipe(gulp.dest("package/dpr/assets/"));
});
