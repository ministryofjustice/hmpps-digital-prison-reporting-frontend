const gulp = require('gulp')

gulp.task('docs:copy-external-javascript', () => {
  return gulp
    .src([
      'node_modules/dayjs/dayjs.min.js',
      'node_modules/dayjs/plugin/customParseFormat.js',
      'node_modules/chart.js/dist/chart.umd.js',
      'node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.min.js',
    ])
    .pipe(gulp.dest('package/dpr/assets/js/'))
})
