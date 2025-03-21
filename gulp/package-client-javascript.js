const gulp = require('gulp')
const rollup = require('gulp-rollup')

gulp.task('package:client-javascript', () => {
  return gulp
    .src(['src/dpr/**/*.mjs'])
    .pipe(
      rollup({
        input: 'src/dpr/all.mjs',
        output: {
          format: 'es',
        },
      }),
    )
    .pipe(gulp.dest('package/dpr/assets/js'))
})
