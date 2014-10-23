


$(
    function(){
     var timer;
      $('.scroll-content').mouseover(function(){
                          //鼠标浮上去，清除计时器
                            clearInterval(timer);
                          }).mouseout(function(){
                              //鼠标离开，添加计时器
                              var $container=$('.scroll-content ul');
                              timer=setInterval(function(){
                                 var height=$container.find('li:first').height();
                                 $container.animate({marginTop:'-'+height+'px'},'slow',function(){
                                   $(this).css({marginTop:0}).find('li:first').appendTo($(this));
                                   var _height=$container.find('li:first').height();
                                   $('#scroll-content-div').css({height:_height});
                              });   
                              },2000);
            }).trigger('mouseout'); 
    }
);
























/*
(function($){
   var timer;
      $('.scroll-content').mouseover(function(){
                          //鼠标浮上去，清除计时器
                            clearInterval(timer);
                          }).mouseout(function(){
                              //鼠标离开，添加计时器
                              var $container=$('.scroll-content ul');
                              var width=$container.find('li').width();
                              timer=setInterval(function(){
                                 $container.animate({marginLeft:'-'+width+'px'},'normal',function(){
                                   $(this).css({marginLeft:'auto'}).find('li:first').appendTo($(this));
                              });   
                              },2000);
            }).trigger('mouseout'); 
})(window.jQuery);*/






