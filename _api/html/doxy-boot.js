$( document ).ready(function() {

	$("div.headertitle").addClass("page-header");
	$("div.title").addClass("h1");
	
	$('li > a[href="index.html"] > span').before("<i class='fa fa-cog'></i> ");
	$('li > a[href="index.html"] > span').text("Fogo API");
	$('li > a[href="modules.html"] > span').before("<i class='fa fa-square'></i> ");
	$('li > a[href="namespaces.html"] > span').before("<i class='fa fa-bars'></i> ");
	$('li > a[href="annotated.html"] > span').before("<i class='fa fa-list-ul'></i> ");
	$('li > a[href="classes.html"] > span').before("<i class='fa fa-book'></i> ");
	$('li > a[href="inherits.html"] > span').before("<i class='fa fa-sitemap'></i> ");
	$('li > a[href="functions.html"] > span').before("<i class='fa fa-list'></i> ");
	$('li > a[href="functions_func.html"] > span').before("<i class='fa fa-list'></i> ");
	$('li > a[href="functions_vars.html"] > span').before("<i class='fa fa-list'></i> ");
	$('li > a[href="functions_enum.html"] > span').before("<i class='fa fa-list'></i> ");
	$('li > a[href="functions_eval.html"] > span').before("<i class='fa fa-list'></i> ");
	$(".icona .icon").addClass("label label-danger");
	$(".icona .icon").after(" ");

	$('img[src="closed.png"]').before("<i class='fa fa-chevron-right'></i> ");
	$('img[src="closed.png"]').hide();

	$("div.qindex").css("margin-bottom", "3em");
	$("div.textblock").css("margin-bottom", "3em");
	$("table.memberdecls").css("margin-bottom", "3em");
	$("table.memberdecls").css("margin-top", "3em");


	$("span.arrow").replaceWith("<i class='fa fa-chevron-right'></i> ");

	$("ul.tablist").addClass("nav nav-pills");
	$("ul.tablist").css("margin-top", "0.5em");
	$("ul.tablist").css("margin-bottom", "0.5em");
	$("li.current").addClass("active");
	$("iframe").attr("scrolling", "yes");
	
	$("#nav-path > ul").addClass("breadcrumb");
	
	$("table.params").addClass("table");
	$("div.ingroups").wrapInner("<small></small>");
	$("div.levels").css("margin", "0.5em");
	$("div.levels > span").addClass("btn btn-default btn-xs");
	$("div.levels > span").css("margin-right", "0.25em");
	
	$("table.directory").addClass("table table-striped table-bordered");
	$("[class^=separator]").remove();

	$("div.summary > a").addClass("btn btn-default btn-xs");
	$("table.fieldtable").addClass("table");
	$(".fragment").addClass("well");
	$(".memitem").addClass("panel panel-default");
	$(".memproto").addClass("panel-heading");
	$(".memdoc").addClass("panel-body");
	$("span.mlabel").addClass("label label-info");
	
	$("table.memberdecls").addClass("table table-bordered");
	//$("[class^=memitem]").addClass("active");
	
	$("div.ah").addClass("btn btn-default");
	$("span.mlabels").addClass("pull-right");
	$("table.mlabels").css("width", "100%")
	$("td.mlabels-right").addClass("pull-right");

	$("div.ttc").addClass("panel panel-info");
	$("div.ttname").addClass("panel-heading");
	$("div.ttdef,div.ttdoc,div.ttdeci").addClass("panel-body");
	
	
});