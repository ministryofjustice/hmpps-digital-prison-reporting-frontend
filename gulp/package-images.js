const gulp = require("gulp");
const cache = require("gulp-cache");
const flatten = require("gulp-flatten");

// Compresses png, jpeg, gif, png and svg images
gulp.task('package:images', async () => {
  const { default: imagemin } = await import("gulp-imagemin");

  return gulp
    .src("src/dpr/**/*.+(png|jpg|jpeg|gif|svg)")
    .pipe(
      cache(
        imagemin({
          interlaced: true,
        })
      )
    )
    .pipe(flatten())
    .pipe(gulp.dest("package/dpr/assets/images/"));
});
