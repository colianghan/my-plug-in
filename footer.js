this["par"] = this["par"] || {};
this["par"]["footer"] = Handlebars.registerPartial('footer',Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<footer>\r\n	<p>this is par footer</p>\r\n"
    + ((stack1 = container.invokePartial(partials["@partial-block"],depth0,{"name":"@partial-block","data":data,"indent":"\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "</footer>";
},"usePartial":true,"useData":true}));