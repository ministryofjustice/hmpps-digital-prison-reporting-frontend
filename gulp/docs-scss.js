const gulp = require('gulp');
const concat = require('gulp-concat');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sass = require("gulp-sass")(require("sass"));

gulp.task('docs:scss', () => {
  return gulp.src([
      'docs/base.scss',
      'src/dpr/components/**/*.scss',
    ])
    .pipe(concat('all.scss'))
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [
            'node_modules/govuk-frontend',
            'node_modules/@ministryofjustice/frontend',
        ]
    }))
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(gulp.dest("package/dpr/assets/css"));
});
