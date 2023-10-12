const gulp = require('gulp');

gulp.task('package:clean', async () => {
  const { deleteSync } = await import("del");

  return deleteSync([
    'package/dpr',
  ])
});
