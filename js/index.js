var img;
function init(){
	manifest = [
		{src: "background.jpg", id: "background"},
	];

	loader = new createjs.LoadQueue(false);
	loader.addEventListener("complete", hello);
	loader.loadManifest(manifest, true, "img/");
	img = document.querySelector('img');
	img.style.top = ((window.innerHeight/2)-100)+'px';
	img.style.left = ((window.innerWidth/2)-100)+'px';
}

function hello(){
	setTimeout(handleComplete,2000);
}


function handleComplete() {
	img.parentNode.removeChild(img);
	var canvas = document.getElementById('canvas');

	var w = canvas.width = 1024;

	var h = canvas.height = 768;

	canvas.style.cssText = 'margin:5px auto;display:block';

	var stage = new createjs.Stage('canvas');

	var backImg = loader.getResult('background');

	var background = new createjs.Bitmap(backImg);

	var people = new createjs.Bitmap('img/people.png');

	var redMogu = new createjs.Bitmap('img/mogu_red.png');

	stage.addChild(background,people,redMogu);

	people.setTransform(24,h-159,0.5,0.5,0,0);

	//redMogu.setTransform(197,245);

	redMogu.x = 24;//197;
	redMogu.y = 245+280;

	redMogu.alpha = 0;

	background.x = 0;

	background.y = h - backImg.height;

	//var init = -250;
	// var a = createjs.Tween.get(background,{loop:true})
	// 	.to({x:init-5},1000,createjs.Ease.linear).addEventListener('change',function(){
	// 		console.log(init);
	// 		init = init-5;
	// 	});
	var init ;
	createjs.Tween.get(background,{loop:false})
		//前进
		.to({x:-90},1000,createjs.Ease.linear)
		//跳上管子
		.to({y:background.y + 110,},1000,createjs.Ease.linear)
		.to({x:-170},1000,createjs.Ease.linear)
		//撞击管子
		.to({y:background.y + 280},1000,createjs.Ease.linear)
		.wait(50)
		//跳下来
		.to({y:background.y + 110},1000,createjs.Ease.linear)
		//调下管子
		.to({x:-250},1000,createjs.Ease.linear)
		.to({y:background.y},1000,createjs.Ease.linear)
		.to({x:-510},3000,createjs.Ease.linear)
		.wait(1000)
		.to({x:-backImg.width+1024},2000,createjs.Ease.linear)
		//.to({scaleX:1,scaleY:1},1000,createjs.Ease.linear)
		.call(function(){
			window.background = background;
			window.backImg = backImg;
		})
		//.paly(createjs.Tween.get(background,{loop:true}).to({y:init-20},1000,createjs.Ease.linear));

	console.log(background.y);
	createjs.Tween.get(redMogu)
		.wait(4000)
		//.to({},50,)
		.to({y:redMogu.y-50,alpha:1},50,createjs.Ease.linear)
		.to({y:redMogu.y-230},1000,createjs.Ease.linear)
		.wait(1000)
		//调下管子
		.to({y:182,x:50},1000,createjs.Ease.linear)
		.call(function(){
			console.log(redMogu.y);
			window.redMogu = redMogu;
		})
		.wait(3000)
		.to({y:redMogu.y+20},1000,createjs.Ease.linear)
		.to({alpha:0},50,createjs.Ease.linear)
		.wait(1000)
		//.to({y:redMogu.y},1000,createjs.Ease.linear)

	createjs.Tween.get(people)
		.wait(11100)
		.to({scaleX:1,scaleY:1,y:people.y-70},1000,createjs.Ease.linear)
		.wait(1000)
		.to({x:1024},3000,createjs.Ease.linear)
		.call(function(){
			createjs.Ticker.removeEventListener('tick');
			stage.removeAllChildren();
			//stage.update();
			var label = window.label = new createjs.Text('success','60px Arail','#ff7700');
			//label.align = 'center';
			label.x = 380;
			label.y = 300;
			stage.addChild(label);
			stage.update();
		})


	createjs.Ticker.setFPS(60);
	
	createjs.Ticker.addEventListener('tick',stage);

	// createjs.Ticker.addEventListener('tick',handleTick);
	// function handleTick(event){
	// 	// if(background.getBounds().width - Math.abs(background.x) > w){
	// 	// 	//createjs.Ticker.removeEventListener('tick');
	// 	// 	background.x -= 5;
	// 	// }else{
	// 	// 	people.x += 5;
	// 	// }
	// 	background.y = h - background.getBounds().height;
	// 	stage.update();
	// }
}

