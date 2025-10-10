// Importação dos plugins
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
// const htmlmin = require('gulp-htmlmin'); // Descomente se quiser minificar HTML
const cleanCSS = require('gulp-clean-css'); // garante minificação extra
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');


// =======================
// COPIAR HTML
// (Necessário para o Vercel encontrar o index.html na pasta 'dist')
// =======================
function copyHtml() {
    // Copia o index.html da raiz para a pasta dist
    return gulp.src('./index.html') 
        .pipe(gulp.dest('./dist'));
}


// =======================
// COMPILAR + MINIFICAR SCSS → CSS
// =======================
function styles() {
    return gulp.src('./src/styles/style.scss') // Arquivo principal SCSS
        .pipe(sourcemaps.init())                // Inicia o mapa (útil pra debug)
        .pipe(sass().on('error', sass.logError)) // Compila SCSS → CSS. Se der erro, ele exibe no terminal
        .pipe(cleanCSS())                       // Minifica o CSS
        .pipe(sourcemaps.write('.'))            // Cria o .map (opcional)
        .pipe(gulp.dest('./dist/css'));         // Destino final
}

// =======================
// MINIFICAR JAVASCRIPT
// =======================
function scripts() {
    return gulp.src('./src/scripts/*.js') // Procura todos os arquivos JS em src/scripts
        .pipe(uglify())                   // Minifica o JS
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

// A tarefa 'default' executa todas as funções em paralelo:
exports.default = gulp.parallel(copyHtml, styles, images, scripts);

// A tarefa 'watch' monitora as mudanças:
exports.watch = function () {
    gulp.watch('./index.html', gulp.parallel(copyHtml)); // Adicionado watch para o HTML
    gulp.watch('./src/styles/**/*.scss', gulp.parallel(styles));
    gulp.watch('./src/scripts/*.js', gulp.parallel(scripts));
    gulp.watch('./src/images/**/*', gulp.parallel(images));
    };