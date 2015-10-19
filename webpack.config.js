var webpack = require('webpack');
var path = require('path');
console.log(path.join(__dirname,'js'));

module.exports = {
	//入口配置
	entry:{
		'webpack_demo':'./js/webpack_demo.js'
	},
	//输出文件
	output:{
		path:'js',
		publicPath:'./',
		filename:'[name]_compile.js'
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
		}]
	},
	//定义全局变量
	externals:{
		// 'Handlebars':'Handlebars',
		// 'Handlebars.runtime':'Handlebars.runtime'
	},
	resolve:{
		extensions:['','.js','.json','.coffee'],
		fallback:path.join(__dirname,'js')
	}
}