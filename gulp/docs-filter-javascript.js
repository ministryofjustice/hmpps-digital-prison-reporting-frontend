const gulp = require('gulp');
const ts = require('gulp-typescript');
const filter = require('gulp-filter');

const tsProject = ts.createProject('tsconfig.json');

gulp.task('docs:filter-javascript', () => {
  return tsProject.src()
    .pipe(filter([
      'src/dpr/utils/urlHelper.ts',
      'src/dpr/setUpNunjucksFilters.ts'
    ]))
    .pipe(tsProject())
    .pipe(gulp.dest('package/dpr/'));
});
