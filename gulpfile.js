const { src, dest } = require('gulp');
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
    dest: './dist/css'
  }
};

// Scssをコンパイルするタスク
const scss = () => {
  const plugins = [autoprefixer(), cssnano({ autoprefixer: false })];

  return src(paths.scss.src)
    .pipe(postcss([stylelint(), reporter()]))
    .pipe(
      gulpSass({
        outputStyle: 'expanded'
      }).on('error', gulpSass.logError)
    )
    .pipe(postcss(plugins))
    .pipe(dest(paths.scss.dest));
};

exports.default = scss;
