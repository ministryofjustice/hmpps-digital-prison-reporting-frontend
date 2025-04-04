const gulp = require('gulp')
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const sass = require('gulp-sass')(require('sass'))

gulp.task('package:scss', () => {
  return gulp
    .src(['src/dpr/**/*.scss'])
    .pipe(concat('all.scss'))
    .pipe(gulp.dest('package/dpr/'))
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: ['node_modules/govuk-frontend/dist'],
      }),
    )
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(gulp.dest('package/dpr/assets/css'))
})
