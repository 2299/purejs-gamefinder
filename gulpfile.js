const {src, dest, series, watch, parallel} = require('gulp')
const include = require('gulp-file-include')
const del = require('del')
const sync = require('browser-sync').create()

let path = {
    build: {
        html: 'build/',
        js: 'build/js',
        style: 'build/css/',
        img: 'build/img/'
    },
    src: { 
        html: 'src/*.html', 
        js: 'src/js/*.js',
        style: 'src/css/*.*',
        img: 'src/img/**/*.*'
    }, 
    watch: {
        html: 'src/*.html',
        html_parts: 'src/parts/*.html', 
        js: 'src/js/*.js',
        style: 'src/css/*.*',
        img: 'src/img/**/*.*'
    },
    clean: './build'
}

function html() {
    return src(path.src.html)
        .pipe(include ({
            prefix: '@@'
        }))
        .pipe(dest(path.build.html))
}

function css() {
    return src(path.src.style)
        .pipe(dest(path.build.style))
}

function img() {
    return src(path.src.img)
        .pipe(dest(path.build.img))
}

function pureJS() {
    return src(path.src.js)
        .pipe(dest(path.build.js))
}

function clear() {
    return del(path.clean)
}

function serve() {
    sync.init({
        server: './build'
    })

    watch(path.watch.html, series(html)).on('change', sync.reload)
    watch(path.watch.html_parts, series(html)).on('change', sync.reload)
    watch(path.watch.style, series(css)).on('change',sync.reload)
    watch(path.watch.js, series(pureJS)).on('change',sync.reload)
}

exports.build = series(clear, css, html, pureJS, img)
exports.serve = series(clear, css, html, pureJS, img, serve)
exports.clear = clear