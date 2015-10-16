Handlebars.registerHelper('a',function(name,href,options){
	name = Handlebars.escapeExpression(name);
	href = Handlebars.escapeExpression(href);
	var out = '<a href="'+href+'" target="_blank">'+name+'</a>';
	//console.log(options);
	return  new Handlebars.SafeString(out);
});