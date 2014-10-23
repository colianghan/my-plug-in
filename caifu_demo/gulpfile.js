var gulp =require('gulp');
var browserSync =require('browser-sync');
var reload =browserSync.reload;

gulp.task('default',['server'],function(){
	gulp.watch('index.html',reload);
	gulp.watch('css/*.css',reload);
});

gulp.task('server',function(){
	browserSync({
		server:{
			baseDir:'./'
		}
	})
});