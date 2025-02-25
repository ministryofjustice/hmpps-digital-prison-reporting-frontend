const gulp = require('gulp')
const requireDir = require('require-dir')

requireDir('./gulp')

gulp.task(
  'build:package',
  gulp.series(
    'package:clean',
    'package:scss',
    'package:copy-views',
    'package:copy-routes',
    'package:server-javascript',
    'package:client-javascript',
    'package:client-javascript-libs',
    'package:images',
    'package:zip',
  ),
)

gulp.task(
  'build:docs',
  gulp.series(
    'package:clean',
    'docs:scss',
    'package:copy-views',
    'package:client-javascript',
    'package:client-javascript-libs',
    'docs:copy-external-javascript',
    'package:images',
    'docs:assets',
    'docs:copy-gov-assets',
    'docs:copy-moj-assets',
    'docs:filter-javascript',
  ),
)

gulp.task(
  'build:docs-local',
  gulp.series(
    'package:clean',
    'docs:scss-local',
    'package:copy-views',
    'package:copy-routes',
    'package:client-javascript',
    'package:client-javascript-libs',
    'docs:copy-external-javascript',
    'package:images',
    'docs:assets',
    'docs:copy-gov-assets',
    'docs:copy-moj-assets',
    'docs:filter-javascript',
  ),
)
