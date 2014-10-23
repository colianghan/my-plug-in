(function($){
    //backbone model
    var model=Backbone.Model.extend({
        initialize:function(){
            alert('这是模型');
        },
        delfault:{
            name:''
        }
    });
    var _model =new model();
    
    
    
    //backbone collections
     var collection =Backbone.Collection.extend({
         initialize:function(){
             alert('this is collection');
         },
     });
    var _collection =new collection();
    
    
    
    
    
    
    //bcakbone router
    var router=Backbone.Router.extend({
        initialize:function(){
            alert('this is router');
        },
        routes:{
            'roter/:id':'Rout_alert',
            '*actions':'defaultRoute'
        },
        defaultRoute:function(){
            alert('this is defaultRoute');
        },
        Rout_alert:function(){
            alert('this is first Router');
        }
    });
    var _router =new router();
    Backbone.history.start();
    
    
    
    
    
    
    
    
    //backbone 视图
    var view =Backbone.View.extend({
        el:'#back-test',
        initialize:function(){
            this.render({name:'123'});
        },
        events:{
            'click h2':'doAlert',
            'mouseover h2':'doSelect'
        },
        doAlert:function(event){
            alert(event.target.tagName+' #'+'haha');
        },
        doSelect:function(e){
            console.warn('选择');
        },
        render:function(content){
          var template=_.template($('#backBone-template').html(),content);
          $(this.el).html(template);
       }
    });
     var _view =new view();
    
    
    
    
    
    
    ///////////
    var artist = new Backbone.Model({
      firstName: "立华",
      lastName: "咸"
    });

    artist.set({birthday: "December 13, 1979"});
    var _a =JSON.stringify(artist);
    console.log(_a+'  '+typeof _a);
    console.log(artist.toJSON()+'  '+typeof artist.toJSON());
    
    ///////
    
    var stooges = new Backbone.Collection([
      new Backbone.Model({name: "Curly"}),
      new Backbone.Model({name: "Larry"}),
      new Backbone.Model({name: "Moe"})
    ]);

    var names = stooges.pluck("name");

    console.log(JSON.stringify(names));
})(window.jQuery)