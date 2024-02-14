const gulp = require("gulp");
const flatten = require("gulp-flatten");

gulp.task('package:images', async () => {
  return gulp
    .src("src/dpr/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(flatten())
    .pipe(gulp.dest("package/dpr/assets/images/"));
});
