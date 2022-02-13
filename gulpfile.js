/*
root/
├─ public/
│  ├─ assets/
│  │  ├─ css/bundle.css
│  │  ├─ js/bundle.js
│  │  ├─ vendors/
│  │  ├─ image/
│  ├─ data/
│  ├─ *.html
├─ src/
│  ├─ assets/
│  │  ├─ scss/index.scss
│  │  ├─ js/*
│  │  ├─ vendors/
│  │  ├─ image/
│  ├─ data/
│  ├─ pages/*.html
*/

// config
const { public, src, prefixValue } = {
    public: {
        css: { path: 'public/assets/css/', fileName: 'bundle.css' },
        js: { path: 'public/assets/js/', fileName: 'bundle.js' },
        vendors: 'public/assets/vendors/',
        image: 'public/assets/image/',
        data: 'public/data/',
        root: 'public/'
    },
    src: {
        css: { path: 'src/assets/scss/', index: 'src/assets/scss/index.scss' },
        js: { path: 'src/assets/js/', index: 'src/assets/js/index.js' },
        vendors: 'src/assets/vendors/**',
        image: 'src/assets/image/*',
        data: 'src/data/*',
        html: { pages: 'src/pages/*.html', all: 'src/pages/**/*.html' }
    },
    prefixValue: 'last 2 versions'
}

const
    gulp = require('gulp'),
    gulpIf = require('gulp-if'),
    imagemin = require('gulp-imagemin'), //To Optimize Images
    uglify = require('gulp-uglify'), //To Minify JS files

    // css
    sass = require('gulp-sass'), //For Compiling SASS files
    postcss = require('gulp-postcss'), //For Compiling tailwind utilities with tailwind config
    tailwind = require('tailwindcss'),
    cleanCSS = require('gulp-clean-css'), //To Optimize css
    purgecss = require('gulp-purgecss'), // Remove Unused CSS from Styles
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),

    // files
    del = require('del'), //For Cleaning build/dist for fresh export
    rename = require('gulp-rename'),
    fileinclude = require('gulp-file-include'), // for partials

    browserSync = require("browser-sync").create();

function dataTask(done) {
    del(`${public.data}**`, { force: true })
    gulp.src(src.data)
        .pipe(gulp.dest(public.data));
    done();
}

function vendorsTask(done) {
    del(`${public.vendors}**`, { force: true })
    gulp.src(src.vendors)
        .pipe(gulp.dest(public.vendors));
    done();
}

function htmlTask(done, minify = false) {
    gulp.src(src.html.pages)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(public.root));
    done();
}

function imageTask(done, minify = false) {
    del(`${public.image}**`, { force: true })
    gulp.src(src.image)
        .pipe(gulpIf(minify, imagemin()))
        .pipe(gulp.dest(public.image));
    done();
}

function cssTask(done, minify = false) {

    gulp.src(src.css.index)
        .pipe(gulpIf(!minify, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css.path))
        .pipe(postcss([
            tailwind('./tailwind.config.js'),
        ]))
        .pipe(purgecss({
            content: ['./src/**/*.{html,js}']
        }))
        .pipe(prefix(prefixValue))
        .pipe(gulpIf(minify, cleanCSS()))
        .pipe(rename(public.css.fileName))
        .pipe(gulpIf(!minify, sourcemaps.write()))
        .pipe(gulp.dest(public.css.path))
        .pipe(browserSync.stream());

    done();
}

function jsTask(done, minify = false) {
    gulp.src([src.js.index])
        .pipe(gulpIf(!minify, sourcemaps.init()))
        .pipe(fileinclude({
            prefix: '// @@',
            basepath: '@file'
        }))
        .pipe(gulpIf(minify, uglify()))
        .pipe(rename(public.js.fileName))
        .pipe(gulpIf(!minify, sourcemaps.write()))
        .pipe(gulp.dest(public.js.path))
        .pipe(browserSync.stream());
    done();
}

// clean public
gulp.task('clean', function () {
    return del(public.root, { force: true });
});

// copy data
gulp.task('data', (done) => dataTask(done));

// copy vendors
gulp.task('vendors', (done) => vendorsTask(done));

// copy HTML
gulp.task('html', (done) => htmlTask(done));

// copy Images
gulp.task('image', (done) => imageTask(done));

// Compile scss
gulp.task('css', (done) => cssTask(done));

// Scripts
gulp.task('js', (done) => jsTask(done));

// browser-sync
gulp.task('browser-sync', gulp.series('css', async function () {

    browserSync.init({
        server: public.root,
        open: false,
        notify: false
    });

    gulp.watch(`${src.css.path}**/*.scss`, gulp.series('css'));
    gulp.watch(src.html.all).on('change', browserSync.reload);
}));
gulp.task('jsWatch', gulp.series('js', function (done) {
    browserSync.reload();
    done();
}));

gulp.task('default', gulp.parallel('browser-sync', function (done) {
    gulp.watch(`${src.js.path}*.js`, gulp.series('js'));
    gulp.watch(src.image, gulp.series('image'));
    gulp.watch(src.data, gulp.series('data'));
    gulp.watch(src.vendors, gulp.series('vendors'));
    gulp.watch('./src/**/*.{html,js,scss}', gulp.series('css'));
    gulp.watch(src.html.all, gulp.series('html'));
    gulp.watch(src.html.all, browserSync.reload);
    done();
}));

// production
gulp.task('production', function (done) {
    cssTask(() => { }, true);
    imageTask(() => { }, true);
    jsTask(() => { }, true);
    done();
});