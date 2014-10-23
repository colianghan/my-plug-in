var gulp =require('gulp');
var browserSync=require('browser-sync');
var reload=browserSync.reload;

gulp.task('server',function(){
    browserSync({
        server:{
            baseDir:'./'
        }
    });
})

gulp.task('default',['server'],function(){
    gulp.watch('*.html',reload);
});