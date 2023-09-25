const gulp = require('gulp');
const ts = require('gulp-typescript');
const filter = require('gulp-filter');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('package:server-javascript', () => {
  return tsProject.src()
    .pipe(filter(['**', '!**/*.test.ts']))
    .pipe(gulp.dest('package/dpr/'))
    .pipe(tsProject())
    .pipe(gulp.dest('package/dpr/'));
});
