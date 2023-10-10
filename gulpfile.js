const gulp = require("gulp");
const requireDir = require("require-dir");

requireDir("./gulp");

gulp.task(
  "build:clean",
  gulp.series(
    "package:clean",
  )
);

gulp.task(
  "build:package",
  gulp.series(
    "package:clean",
    "package:scss",
    "package:copy-views",
    "package:server-javascript",
    "package:client-javascript",
    "package:images",
    "package:zip",
  )
);
