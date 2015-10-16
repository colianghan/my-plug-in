var data = {title:'hello',description:'world',arr:[
	{name:'张三',age:10},
	{name:'李四',age:20},
	{name:'候五',age:30}
],arr_1:[{name:'张三',age:14},
	{name:'李四',age:25},
	{name:'候五',age:36}]};

~function init () {
  var i = 0,j=0; 
  
  /*while(i<100000){
  	j += ''+(++j);
  	i++;
  }*/
 
  compile();

  //setTimeout(function(){document.write('hello world!!!!')},2000);
}();

function compile(){
	//var html = Handlebars.templates['header.hbs'](data);
	var html = template['header'](data);
	document.write(html);
	// document.write('<h1>test</h1>');
	// document.close();
}