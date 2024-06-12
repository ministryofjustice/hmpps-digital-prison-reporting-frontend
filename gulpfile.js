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
    'package:copy-fonts',
    'package:server-javascript',
    'package:client-javascript',
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
    'docs:copy-external-javascript',
    'package:images',
    'docs:assets',
    'docs:copy-gov-assets',
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
    'package:copy-fonts',
    'package:client-javascript',
    'docs:copy-external-javascript',
    'package:images',
    'docs:assets',
    'docs:copy-gov-assets',
    'docs:filter-javascript',
  ),
)
