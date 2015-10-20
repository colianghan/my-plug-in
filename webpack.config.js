var webpack = require('webpack');
var path = require('path');
//console.log(path.join(__dirname,'js'));

//console.log(__dirname+'js')

module.exports = {
	//入口配置
	entry:{
		'webpack_demo':'./js/webpack_demo.js'
	},
	//输出文件
	output:{
		/*输出的文件目录*/
		path: __dirname + '/js',
		/*webpack-dev-server 时用到的path*/
		publicPath:'./',
		/*要生成的文件名字*/
		filename:'[name]_compile.js',
		/*获取当前的文件来源,在开发时很方便*/
		pathinfo:true,
		/*设置输出的是依赖*/
		library:'test_libray',
		/*设置依赖的类型*/
		libraryTarget:'umd',
		/*当libraryTarget设置为umd，且library设置后，设置umdNamedDefine为true，可以命名amd为library的值*/
		umdNamedDefine:true
	},
	//加载器
	module:{
		loaders:[{
			test:/\.hbs$/,
			query:{
				helperDirs:path.join(__dirname,'js')
				//knownHelpers:['@partial-block']
			},
			loader:'handlebars'
		}],
		//noParse:[/handlebars/]
	},
	//定义全局变量
	externals:[
		// {	
		//  'Handlebars':'Handlebars',
		//  'Handlebars.runtime':'Handlebars.runtime'
		// }
		// './a',
		// function(context,request,callback){
		// 	if(request === './b'){
		// 		return callback(null,'var d = 321');
		// 	}
		// 	callback();
		// }
	],
	resolve:{
		extensions:['','.js','.json','.coffee'],
		fallback:path.join(__dirname,'js')
	},
	//target:'web',
	//debug:true,
	//devtool:'#inline-source-map',
	recordsPath:path.resolve(__dirname,'records.json')
}