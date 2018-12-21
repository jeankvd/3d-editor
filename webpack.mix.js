let mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react("resources/js/app.js", "public/js")
    .sourceMaps()
    .sass("resources/sass/app.scss", "public/css");
//
mix.browserSync({
    proxy: "https://3d-editor.dev/",
    host: "3d-editor.dev/",
    open: "local"
});
