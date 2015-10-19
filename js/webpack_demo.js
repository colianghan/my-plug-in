var header = require('../handlebars/header.hbs');

~ function init() {
	// var data = {
	// 	title:'hello webpack',
	// 	hello:'test hello'
	// }
	var data = {title:'hello',description:'world',arr:[
	{name:'张三',age:10},
	{name:'李四',age:20},
	{name:'候五',age:30}
],arr_1:[{name:'张三',age:14},
	{name:'李四',age:25},
	{name:'候五',age:36}]};
	var _header = header(data);
	document.write(_header);
	document.close();
}();