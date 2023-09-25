const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require("gulp-uglify");

gulp.task('package:client-javascript', () => {
  return gulp.src([
      'src/dpr/**/*.js',
    ])
    .pipe(concat('client.js'))
    .pipe(uglify())
    .pipe(gulp.dest('package/dpr/assets/js'));
});
