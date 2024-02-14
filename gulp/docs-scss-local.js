const gulp = require('gulp');
const concat = require('gulp-concat');
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const sass = require("gulp-sass")(require("sass"));

gulp.task('docs:scss-local', () => {
  return gulp.src([
      'docs/scss/local-paths.scss',
      'docs/scss/base.scss',
      'docs/scss/tabs.scss',
      'docs/scss/example.scss',
      'src/dpr/components/**/*.scss',
    ])
    .pipe(concat('all.scss'))
    .pipe(sass({
        outputStyle: 'compressed',
        includePaths: [
            'node_modules/govuk-frontend/dist',
            'node_modules/@ministryofjustice/frontend',
        ]
    }))
    .pipe(postcss([autoprefixer, cssnano]))
    .pipe(gulp.dest("package/dpr/assets/css"));
});
