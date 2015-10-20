var gulp = require('gulp');

var handlebars = require('gulp-handlebars');

var rename = require('gulp-rename');

var wrap = require('gulp-wrap');

var declare = require('gulp-declare');

var browserSync = require('browser-sync');

var reload = browserSync.reload;

var webpack = require('webpack');

var webpack_configer = require('./webpack.config.js');


gulp.task('template',function(){
	gulp.src('handlebars/header.hbs')
		.pipe(handlebars({
			handlebars:require('handlebars')
		}))
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
			namespace:'template',
			noRedeclare:true,
			root:'this'
		}))
		.pipe(gulp.dest('./'))
})

gulp.task('partial',function(){
	gulp.src('handlebars/footer.hbs')
		.pipe(handlebars({
			handlebars:require('handlebars')
		}))
		.pipe(wrap('Handlebars.registerPartial("<%= name %>",Handlebars.template(<%= contents %>))'))
		.pipe(declare({
			namespace:'par',
			noRedeclare:true,
			root:'this'
		}))
		//.pipe(rename('footer.js'))
		.pipe(gulp.dest('./'))
})


gulp.task('watch',function(){
	gulp.watch('handlebars/*.hbs',['template','partial',reload]);
})

gulp.task('webpack',function(){
	console.log(webpack_configer);
	webpack(webpack_configer,function(err,state){
		if(err){
			return console.log('error');
		}
		console.log(state.toJSON());
	})
});

gulp.task('server',['watch'],function(){
	browserSync({
		server:{
			baseDir:'./'
		},
		open:true
	});	
});
