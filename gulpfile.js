var gulp = require('gulp');
var concat  = require('gulp-concat');
var strip = require('gulp-strip-comments');
var uglify = require('gulp-uglify');
var headerfooter = require('gulp-header-footer');

var header="\
/*\n\
    APACHE LICENSE 2 @2017 Ivan Lausuch <ilausuch@gmail.com>\n\
*/";

gulp.task('compile', function(){
    return gulp.src('src/*.js')
        .pipe(strip())
        .pipe(concat('reactAddons.js'))
        .pipe(headerfooter({
            header:header,
            footer:'',
            filter: function(file){
                return true;
            }
          }))
        .pipe(gulp.dest('dist'));
});

/*
gulp.task('minimize', function(){
    return gulp.src('dist/reactAddons.js')
        .pipe(strip())
        .pipe(uglify())
        .pipe(concat('reactAddons.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task("build",["compile","minimize"]);
*/