const gulp = require('gulp');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const terser = require('gulp-terser');
const path = require('path');

const babelConfig = require('./babel.config');

const generatePaths = (root, extras, extension = 'js') => [
  path.resolve(root, `src/**/*.${extension}`),
  `!${path.resolve(root, `src/**/*.{spec,test,fixture,mock}.${extension}`)}`,
  `!${path.resolve(root, 'src/**/__{tests,fixtures,mocks}__')}`,
  `!${path.resolve(root, `src/**/__{tests,fixtures,mocks}__/*.${extension}`)}`,
  ...extras.map((it) => it.replace(/^(!?)(.*)$/, (match, $1, $2) => `${$1}${path.resolve(root, $2)}`)),
];

module.exports = (root, extras = []) => {
  gulp.task(
    'js',
    () => gulp.src(generatePaths(root, extras))
      .pipe(babel(babelConfig))
      .pipe(terser())
      .pipe(gulp.dest('dist')),
  );
  gulp.task(
    'ts',
    () => gulp.src(generatePaths(root, extras, 'ts'))
      .pipe(ts())
      .pipe(terser())
      .pipe(gulp.dest('dist')),
  );
  return gulp.task('default', gulp.series(['js', 'ts']));
};
