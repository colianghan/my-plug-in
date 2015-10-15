var data = {title:'hello',description:'world'};

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