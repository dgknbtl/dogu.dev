const { src, dest, watch, series, parallel } = require("gulp");
const pug = require("gulp-pug");
const postcss = require("gulp-postcss");
const del = require("del");
const babel = require("gulp-babel");
const imagemin = require("gulp-imagemin");
const connect = require("gulp-connect");

const PATH = {
  font: [],
  js: ["src/js/**/*.js"],
  img: ["src/img/**"],
  vendor: {
    js: [],
    css: [],
  },
};

function clean() {
  return del("dist/**");
}

function server() {
  connect.server({
    root: "dist",
    livereload: true,
    host: "192.168.1.37",
    port: 3000,
  });
}

function copyFont() {
  return src(PATH.font).pipe(dest("dist/webfonts"));
}

function copyJS() {
  return src(PATH.js)
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(dest("dist/js"))
    .pipe(connect.reload());
}

function copyVendorJS() {
  return src(PATH.vendor.js).pipe(dest("dist/vendor/js"));
}

function copyVendorCSS() {
  return src(PATH.vendor.css).pipe(dest("dist/vendor/css"));
}

function copyVendorSVG() {
  return src(PATH.vendor.svg).pipe(dest("dist/vendor/svg"));
}

function copyImage() {
  return (
    src(PATH.img)
      // .pipe(imagemin())
      .pipe(dest("dist/img"))
  );
}

function pugToHTML() {
  return src("src/pages/*.pug")
    .pipe(
      pug({
        doctype: "html",
        pretty: true,
      })
    )
    .pipe(dest("dist"));
  // .pipe(connect.reload());
}

function postCSS() {
  return src("src/css/app.css")
    .pipe(postcss())
    .pipe(dest("dist/css"))
    .pipe(connect.reload());
}

function watchFiles() {
  watch("src/**/*.pug", pugToHTML);
  watch("src/css/**", postCSS);
  watch("src/js/*.js", copyJS);
}

exports.default = series(
  clean,
  series(
    pugToHTML,
    postCSS,
    copyJS,
    // copyVendorJS,
    // copyVendorCSS,
    // copyVendorSVG,
    // copyFont,
    copyImage
  ),
  parallel(server, watchFiles)
);
