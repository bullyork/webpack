const gulp = require('gulp');
const gulpTslint = require('gulp-tslint');
// ...
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
      .pipe(gulpTslint())
      .pipe(gulpTslint.report());
});
