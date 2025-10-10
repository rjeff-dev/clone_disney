// Importação dos plugins
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css'); // garante minificação extra
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');

// =======================
// COMPILAR + MINIFICAR SCSS → CSS
// =======================
function styles() {
  return gulp.src('./src/styles/style.scss') // arquivo principal SCSS
    .pipe(sourcemaps.init())                 // inicia o mapa (útil pra debug)
    .pipe(sass().on('error', sass.logError)) // compila SCSS → CSS
    .pipe(cleanCSS())                        // minifica o CSS
    .pipe(sourcemaps.write('.'))             // cria o .map (opcional)
    .pipe(gulp.dest('./dist/css'));          // destino final
}

// =======================
// MINIFICAR JAVASCRIPT
// =======================
function scripts() {
    return gulp.src('./src/scripts/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/scripts'));
}

// =======================
// OTIMIZAR IMAGENS
// =======================
function images() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
    }

// =======================
// TAREFAS PADRÃO E WATCH
// =======================
exports.default = gulp.parallel(styles, images, scripts);

exports.watch = function () {
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
    gulp.watch('./src/images/**/*', gulp.parallel(images));
    };
