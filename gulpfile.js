// gulp-file-include плагин для сбора всех *html в один
// clean-css для сжатия css файлов
import pkg from 'gulp';
import browsersync from 'browser-sync';
import del from 'del';
import fileinclude from 'gulp-file-include';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import clean_css from 'gulp-clean-css';
import rename from 'gulp-rename';
import uglifyim from 'gulp-uglify-es';
import imagemin from 'gulp-imagemin';

import webp from 'gulp-webp';
import babel from 'gulp-babel';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';
import include from 'gulp-include';
import svgSprite from 'gulp-svg-sprite';

const project_folder = 'dist';
const source_folder = 'src';

const path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/images/',
    videos: project_folder + '/videos/',
    fonts: project_folder + '/fonts/',
  },
  src: {
    html: [source_folder + '/*.html', '!' + source_folder + '/_*.html'],
    css: source_folder + '/scss/style.scss',
    js: source_folder + '/js/script.js',
    img: source_folder + '/images/**/*.*',
    videos: source_folder + '/videos/**/*.{mp4,avi,mkv}',
    fonts: source_folder + '/fonts/*.ttf',
  },
  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/images/**/*.*',
    videos: source_folder + '/videos/**/*.{mp4,avi,mkv}',
  },
  // clean объект который будет содержать путь к папке проекта, будет отвечать за удаление этой папки когдмы мы каждый раз будем запускать gulp
  clean: './' + project_folder + '/',
};
const { src, dest, watch, series, parallel } = pkg;
const sassfn = gulpSass(dartSass);
const uglify = uglifyim.default;

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/',
      directory: true,
    },

    port: 3000,
  });
}

function html() {
  return src(path.src.html).pipe(fileinclude()).pipe(dest(path.build.html)).pipe(browsersync.stream());
}
function css() {
  return src(path.src.css)
    .pipe(
      sassfn({
        outputStyle: 'expanded',
      }),
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true,
      }),
    )
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(
      rename({
        extname: '.min.css',
      }),
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

function js() {
  return src(path.src.js)
    .pipe(include())
    .pipe(dest(path.build.js))
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      }),
    )
    .pipe(uglify())
    .pipe(
      rename({
        extname: '.min.js',
      }),
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

function fonts() {
  src(path.src.fonts).pipe(ttf2woff2()).pipe(dest(path.build.fonts));
  return src(path.src.fonts).pipe(ttf2woff()).pipe(dest(path.build.fonts));
}
function images() {
  return src([path.src.img, '!' + source_folder + '/images/**/*.svg'])
    .pipe(webp())
    .pipe(dest(path.build.img))
    .pipe(src([path.src.img]))
    .pipe(
      imagemin({
        progressive: true,
        svgPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 4,
      }),
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function sprite() {
  return src(project_folder + '/images/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: '../sprite.svg',
            example: true,
          },
        },
      }),
    )
    .pipe(dest(path.build.img));
}

function videos() {
  return src(path.src.videos).pipe(dest(path.build.videos)).pipe(browsersync.stream());
}
function watchFiles() {
  watch([path.watch.html], html);
  watch([path.watch.css], css);
  watch([path.watch.js], js);
  watch([path.watch.img], images);
  watch([path.watch.videos], videos);
}

function clean(params) {
  return del(path.clean, { force: true });
}
// series функции которые должны выполняться друг за другом, по очереди
// parallel
const building = series(clean, parallel(css, html, js, images, videos, fonts));
const watching = parallel(building, watchFiles, browserSync);

// Дружим галп с переменными
// Регестрируем задачи(т.к они просто сейчас как функции)

export { fonts, html, css, js, videos, images, watch, sprite };
export default watching;
