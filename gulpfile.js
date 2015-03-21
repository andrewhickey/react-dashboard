var gulp = require("gulp");
var path = require("path");
var $ = require("gulp-load-plugins")();
var del = require("del");
var environment = $.util.env.type || "development"; // set variable via $ gulp --type production
var isProduction = environment === "production";
var webpackConfig = require("./webpack.config.js")[environment];

var port = $.util.env.port || 1337;
var app = "app/";
var dist = "dist/";

// https://github.com/ai/autoprefixer
var autoprefixerBrowsers = [                 
  "ie >= 9",
  "ie_mob >= 10",
  "ff >= 30",
  "chrome >= 34",
  "safari >= 6",
  "opera >= 23",
  "ios >= 6",
  "android >= 4.4",
  "bb >= 10"
];

// add livereload on the given port
gulp.task("serve", function() {
  $.connect.server({
    root: dist,
    port: port,
    livereload: {
      port: 35729
    }
  });
});

gulp.task("scripts", function() {
  return gulp.src(webpackConfig.entry)
    .pipe($.webpack(webpackConfig))
    .pipe(isProduction ? $.uglifyjs() : $.util.noop())
    .pipe(gulp.dest(dist + "js/"))
    .pipe($.size({ title : "js" }))
    .pipe($.connect.reload());
});

// copy html from app to dist
gulp.task("html", function() {
  return gulp.src(app + "index.html")
    .pipe(gulp.dest(dist))
    .pipe($.size({ title : "html" }))
    .pipe($.connect.reload());
});

// copy images
gulp.task("images", function(cb) {
  return gulp.src(app + "images/**/*.{png,jpg,jpeg,gif}")
    .pipe($.size({ title : "images" }))
    .pipe(gulp.dest(dist + "images/"));
});

// copy images
gulp.task("fonts", function(cb) {
  return gulp.src(app + "fonts/**/*.{eot,svg,ttf,woff,woff2,otf}")
    .pipe($.size({ title : "fonts" }))
    .pipe(gulp.dest(dist + "fonts/"));
});

gulp.task("styles",function(cb) {
  // convert stylus to css
  return gulp.src(app + "styles/main.styl")
    .pipe($.stylus({
      // only compress if we are in production
      compress: isProduction,
      // include "normal" css into main.css
      "include css" : true
    }))
    .pipe($.autoprefixer({browsers: autoprefixerBrowsers})) 
    .pipe(gulp.dest(dist + "css/"))
    .pipe($.size({ title : "css" }))
    .pipe($.connect.reload());
});

// remove bundles
gulp.task("clean", function(cb) {
  del([dist], cb);
});

// watch sass, html and js file changes
gulp.task("watch", function() {
  gulp.watch(app + "styles/*.styl", ["styles"]);
  gulp.watch(app + "index.html", ["html"]);
  gulp.watch(app + "scripts/**/*.js", ["scripts"]);
  gulp.watch(app + "scripts/**/*.jsx", ["scripts"]);
});

// by default build project and then watch files in order to trigger livereload
gulp.task("default", ["build", "serve", "watch"]);

// waits until clean is finished then builds the project
gulp.task("build", ["clean"], function(){
  gulp.start(["images", "fonts", "html", "scripts", "styles"]);
});