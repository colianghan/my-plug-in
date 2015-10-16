this["template"] = this["template"] || {};
this["template"]["header"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "	this is the header;\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.li,depth0,{"name":"li","hash":{"zh":(depths[1] != null ? depths[1].title : depths[1])},"data":data,"indent":"\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=container.escapeExpression, alias3=helpers.helperMissing, alias4="function";

  return "			"
    + alias2(helpers.log.call(alias1,(depth0 != null ? depth0.name : depth0),{"name":"log","hash":{},"data":data}))
    + "\r\n			<li>"
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "的年龄是"
    + alias2(helpers.lookup.call(alias1,(depths[1] != null ? depths[1].description : depths[1]),{"name":"lookup","hash":{},"data":data}))
    + ",测试"
    + alias2(((helper = (helper = helpers.zh || (depth0 != null ? depth0.zh : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"zh","hash":{},"data":data}) : helper)))
    + "</li>\r\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "	hello world footer\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<section>\r\n	<h1>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h1>\r\n	<p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n	"
    + ((stack1 = (helpers.a || (depth0 && depth0.a) || alias2).call(alias1,"百度","http://www.baidu.com",{"name":"a","hash":{"class":"text"},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n	<p>this is the reload</p>\r\n	<ul>\r\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.arr : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\r\n</section>\r\n"
    + ((stack1 = container.invokePartial(partials.footer,depth0,{"name":"footer","fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"5_d":  function(fn, props, container, depth0, data, blockParams, depths) {

  var decorators = container.decorators;

  fn = decorators.inline(fn,props,container,{"name":"inline","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"args":["li"],"data":data}) || fn;
  return fn;
  }

,"useDecorators":true,"usePartial":true,"useData":true,"useDepths":true});