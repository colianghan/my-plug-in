// module.exports = function(name,href,options){
// 	name = Handlebars.escapeExpression(name);
// 	href = Handlebars.escapeExpression(href);
// 	var out = '<a href="'+href+'" target="_blank">'+name+'</a>';
// 	return  new Handlebars.SafeString(out);
// }
// 
module.exports = function(name){
	return name;
}