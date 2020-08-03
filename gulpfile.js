const { src, dest, series } = require('gulp');
const postcss = require('gulp-postcss');
const gulpSass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');

gulpSass.compiler = require('node-sass');

const paths = {
  scss: {
    src: './src/scss/**/*.scss',
    srcDest: './src/scss',
    dest: './dist/css',
  },
};

// Scssをコンパイルするタスク
const scss = () => {
  const postCssPlugins = [autoprefixer(), cssnano({ autoprefixer: false })];

  return src(paths.scss.src)
    .pipe(
      gulpSass({
        outputStyle: 'expanded',
      }).on('error', gulpSass.logError)
    )
    .pipe(postcss(postCssPlugins))
    .pipe(dest(paths.scss.dest));
};

// Scss をリントするタスク
const lint = () => {
  const postCssPlugins = [stylelint({ fix: true }), reporter()];

  return src(paths.scss.src).pipe(postcss(postCssPlugins)).pipe(dest(paths.scss.srcDest));
};

exports.default = series(lint, scss);
exports.scss = scss;
exports.lint = lint;
