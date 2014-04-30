(function () {
var root = this, exports = {};

// The jade runtime:
var jade = exports.jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});


// create our folder objects
exports["includes"] = {};
exports["pages"] = {};
exports["views"] = {};

// includes/headInclude.jade compiled template
exports["includes"]["headInclude"] = function tmpl_includes_headInclude() {
    return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
};

// pages/todoPage.jade compiled template
exports["pages"]["todoPage"] = function tmpl_pages_todoPage() {
    return '<section id="todoapp"><header id="header"><h1>todos</h1><input id="new-todo" placeholder="What needs to be done?" autofocus=""/></header><section id="main"><input id="toggle-all" type="checkbox"/><label for="toggle-all">Mark all as complete</label><ul id="todo-list"></ul></section><footer id="footer"><span id="todo-count"><strong></strong></span><ul id="filters"><li><a href="/" class="selected">All</a></li><li><a href="/active">Active</a></li><li><a href="/completed">Completed</a></li></ul><button id="clear-completed"></button></footer></section>';
};

// views/bodyView.jade compiled template
exports["views"]["bodyView"] = function tmpl_views_bodyView() {
    return '<body><div class="container"><main id="pages" role="page-container"></main></div></body><footer id="info"><p>Double-click to edit a todo</p><p>Written by<a href="https://github.com/rachkoud">Rachkoud</a></p><p>Inspired by <a href="http://todomvc.com">TodoMVC</a></p></footer>';
};

// views/todoView.jade compiled template
exports["views"]["todoView"] = function tmpl_views_todoView() {
    return '<li><div class="view"><input type="checkbox" class="toggle"/><label></label><button class="destroy"></button></div><input class="edit"/></li>';
};


// attach to window or export with commonJS
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();