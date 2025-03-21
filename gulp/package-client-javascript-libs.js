const gulp = require('gulp')
const concat = require('gulp-concat')

gulp.task('package:client-javascript-libs', () => {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/dayjs/dayjs.min.js',
      'node_modules/dayjs/plugin/customParseFormat.js',
      'node_modules/chart.js/dist/chart.umd.js',
      'node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.min.js',
      'package/dpr/assets/js/all.mjs',
    ])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('package/dpr/assets'))
})
