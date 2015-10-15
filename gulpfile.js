var gulp = require('gulp');

var handlebars = require('gulp-handlebars');

var rename = require('gulp-rename');

var wrap = require('gulp-wrap');

var declare = require('gulp-declare');


gulp.task('compile',function(){
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

gulp.task('par',function(){
	gulp.src('handlebars/footer.hbs')
		.pipe(handlebars({
			handlebars:require('handlebars')
		}))
		.pipe(wrap('Handlebars.registerPartial(\'footer\',Handlebars.template(<%= contents %>))'))
		.pipe(declare({
			namespace:'par',
			noRedeclare:true,
			root:'this'
		}))
		//.pipe(rename('footer.js'))
		.pipe(gulp.dest('./'))
})