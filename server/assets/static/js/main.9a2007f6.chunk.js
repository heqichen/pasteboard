(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{21:function(t,e,n){t.exports=n(44)},27:function(t,e,n){},42:function(t,e,n){},44:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),i=n(7),c=n.n(i),r=(n(27),n(15)),l=n(16),s=n(19),u=n(17),h=n(20),d=n(1),m=n(2),p=n.n(m),w=n(8),f=n.n(w),g=n(18),v=n.n(g),y=(n(42),f.a.wrap(v.a)),b="",k=function(t){function e(t){var n;Object(r.a)(this,e),(n=Object(s.a)(this,Object(u.a)(e).call(this,t))).onChange=function(t){n.content=t.toString("html"),n.setState({editorValue:t})},n.onNewButtonCLick=function(){window.location.href="/"},n.onSaveButtonClick=function(){var t={content:n.content},e=JSON.stringify(t);console.log("send content, ",t),f()({method:"post",path:b+"/rest/"+n.title,entity:e,headers:{"Content-Type":"application/json"}}).then(function(t){JSON.parse(t.entity).message?alert("OK"):alert("failed")})};var a=window.location.pathname.split("/")[1];a.length<1&&alert("error"),n.title=a,n.content="",n.state={initialized:!1};var o=Object(d.a)(Object(d.a)(n));return y({path:b+"/rest/"+n.title}).then(function(t){console.log("response: ",t.entity),t.entity.id?(o.content=t.entity.content,o.setState({initialized:!0,editorValue:p.a.createValueFromString(t.entity.content,"html")})):(o.content="",o.setState({initialized:!0,editorValue:p.a.createEmptyValue()}))}),n}return Object(h.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return this.state.initialized?o.a.createElement("div",null,o.a.createElement("span",{className:"button",onClick:this.onNewButtonCLick},"New"),o.a.createElement("span",{className:"button",onClick:this.onSaveButtonClick},"Save"),o.a.createElement(p.a,{value:this.state.editorValue,onChange:this.onChange})):o.a.createElement("h1",null,"Loading...")}}]),e}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[21,2,1]]]);
//# sourceMappingURL=main.9a2007f6.chunk.js.map