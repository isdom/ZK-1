(function(){var a=Highcharts,s=a.Chart,o=a.addEvent,q=a.removeEvent,n=a.createElement,p=a.discardElement,l=a.css,f=a.merge,c=a.each,t=a.extend,b=Math,k=b.max,z=document,e=window,u=z.documentElement.ontouchstart!==undefined,h="M",i="L",m="div",r="hidden",j="none",d="highcharts-",x="absolute",g="px",y,v=a.getOptions();t(v.lang,{downloadPNG:"Download PNG image",downloadJPEG:"Download JPEG image",downloadPDF:"Download PDF document",downloadSVG:"Download SVG vector image",exportButtonTitle:"Export to raster or vector image",printButtonTitle:"Print the chart"});v.navigation={menuStyle:{border:"1px solid #A0A0A0",background:"#FFFFFF"},menuItemStyle:{padding:"0 5px",background:j,color:"#303030",fontSize:u?"14px":"11px"},menuItemHoverStyle:{background:"#4572A5",color:"#FFFFFF"},buttonOptions:{align:"right",backgroundColor:{linearGradient:[0,0,0,20],stops:[[0.4,"#F7F7F7"],[0.6,"#E3E3E3"]]},borderColor:"#B0B0B0",borderRadius:3,borderWidth:1,height:20,hoverBorderColor:"#909090",hoverSymbolFill:"#81A7CF",hoverSymbolStroke:"#4572A5",symbolFill:"#E0E0E0",symbolStroke:"#A0A0A0",symbolX:11.5,symbolY:10.5,verticalAlign:"top",width:24,y:10}};v.exporting={type:"image/png",url:"http://export.highcharts.com/",width:800,buttons:{exportButton:{symbol:"exportIcon",x:-10,symbolFill:"#A8BF77",hoverSymbolFill:"#768F3E",_id:"exportButton",_titleKey:"exportButtonTitle",menuItems:[{textKey:"downloadPNG",onclick:function(){this.exportChart()}},{textKey:"downloadJPEG",onclick:function(){this.exportChart({type:"image/jpeg"})}},{textKey:"downloadPDF",onclick:function(){this.exportChart({type:"application/pdf"})}},{textKey:"downloadSVG",onclick:function(){this.exportChart({type:"image/svg+xml"})}}]},printButton:{symbol:"printIcon",x:-36,symbolFill:"#B5C9DF",hoverSymbolFill:"#779ABF",_id:"printButton",_titleKey:"printButtonTitle",onclick:function(){this.print()}}}};t(s.prototype,{getSVG:function(E){var F=this,G,A,C,B,D=f(F.options,E);if(!z.createElementNS){z.createElementNS=function(I,H){return z.createElement(H)}}A=n(m,null,{position:x,top:"-9999em",width:F.chartWidth+g,height:F.chartHeight+g},z.body);t(D.chart,{renderTo:A,forExport:true});D.exporting.enabled=false;D.chart.plotBackgroundImage=null;D.series=[];c(F.series,function(H){B=f(H.options,{animation:false,showCheckbox:false,visible:H.visible});if(!B.isInternal){if(B&&B.marker&&/^url\(/.test(B.marker.symbol)){B.marker.symbol="circle"}D.series.push(B)}});G=new Highcharts.Chart(D);c(["xAxis","yAxis"],function(H){c(F[H],function(L,J){var K=G[H][J],N=L.getExtremes(),M=N.userMin,I=N.userMax;if(M!==y||I!==y){K.setExtremes(M,I,true,false)}})});C=G.container.innerHTML;D=null;G.destroy();p(A);C=C.replace(/zIndex="[^"]+"/g,"").replace(/isShadow="[^"]+"/g,"").replace(/symbolName="[^"]+"/g,"").replace(/jQuery[0-9]+="[^"]+"/g,"").replace(/isTracker="[^"]+"/g,"").replace(/url\([^#]+#/g,"url(#").replace(/<svg /,'<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ href=/g," xlink:href=").replace(/\n/," ").replace(/<\/svg>.*?$/,"</svg>").replace(/&nbsp;/g,"\u00A0").replace(/&shy;/g,"\u00AD").replace(/<IMG /g,"<image ").replace(/height=([^" ]+)/g,'height="$1"').replace(/width=([^" ]+)/g,'width="$1"').replace(/hc-svg-href="([^"]+)">/g,'xlink:href="$1"/>').replace(/id=([^" >]+)/g,'id="$1"').replace(/class=([^" ]+)/g,'class="$1"').replace(/ transform /g," ").replace(/:(path|rect)/g,"$1").replace(/style="([^"]+)"/g,function(H){return H.toLowerCase()});C=C.replace(/(url\(#highcharts-[0-9]+)&quot;/g,"$1").replace(/&quot;/g,"'");if(C.match(/ xmlns="/g).length===2){C=C.replace(/xmlns="[^"]+"/,"")}return C},exportChart:function(B,E){var D,C=this,A=C.getSVG(f(C.options.exporting.chartOptions,E));B=f(C.options.exporting,B);D=n("form",{method:"post",action:B.url,enctype:"multipart/form-data"},{display:j},z.body);c(["filename","type","width","svg"],function(F){n("input",{type:r,name:F,value:{filename:B.filename||"chart",type:B.type,width:B.width,svg:A}[F]},null,D)});D.submit();p(D)},print:function(){var D=this,B=D.container,E=[],C=B.parentNode,A=z.body,F=A.childNodes;if(D.isPrinting){return}D.isPrinting=true;c(F,function(H,G){if(H.nodeType===1){E[G]=H.style.display;H.style.display=j}});A.appendChild(B);e.print();setTimeout(function(){C.appendChild(B);c(F,function(H,G){if(H.nodeType===1){H.style.display=E[G]}});D.isPrinting=false},1000)},contextMenu:function(R,K,G,F,L,J){var I=this,P=I.options.navigation,C=P.menuItemStyle,N=I.chartWidth,E=I.chartHeight,Q="cache-"+R,B=I[Q],M=k(L,J),A="3px 3px 10px #888",O,H,D;if(!B){I[Q]=B=n(m,{className:d+R},{position:x,zIndex:1000,padding:M+g},I.container);O=n(m,null,t({MozBoxShadow:A,WebkitBoxShadow:A,boxShadow:A},P.menuStyle),B);H=function(){l(B,{display:j})};o(B,"mouseleave",H);c(K,function(S){if(S){var T=n(m,{onmouseover:function(){l(this,P.menuItemHoverStyle)},onmouseout:function(){l(this,C)},innerHTML:S.text||I.options.lang[S.textKey]},t({cursor:"pointer"},C),O);T[u?"ontouchstart":"onclick"]=function(){H();S.onclick.apply(I,arguments)};I.exportDivElements.push(T)}});I.exportDivElements.push(O,B);I.exportMenuWidth=B.offsetWidth;I.exportMenuHeight=B.offsetHeight}D={display:"block"};if(G+I.exportMenuWidth>N){D.right=(N-G-L-M)+g}else{D.left=(G-M)+g}if(F+J+I.exportMenuHeight>E){D.bottom=(E-F-M)+g}else{D.top=(F+J-M)+g}l(B,D)},addButton:function(P){var J=this,I=J.renderer,C=f(J.options.navigation.buttonOptions,P),O=C.onclick,B=C.menuItems,K=C.width,L=C.height,G,E,F,A=C.borderWidth,M={stroke:C.borderColor},N={stroke:C.symbolStroke,fill:C.symbolFill},D=C.symbolSize||12;if(!J.exportDivElements){J.exportDivElements=[];J.exportSVGElements=[]}if(C.enabled===false){return}function H(){E.attr(N);G.attr(M)}G=I.rect(0,0,K,L,C.borderRadius,A).align(C,true).attr(t({fill:C.backgroundColor,"stroke-width":A,zIndex:19},M)).add();F=I.rect(0,0,K,L,0).align(C).attr({id:C._id,fill:"rgba(255, 255, 255, 0.001)",title:J.options.lang[C._titleKey],zIndex:21}).css({cursor:"pointer"}).on("mouseover",function(){E.attr({stroke:C.hoverSymbolStroke,fill:C.hoverSymbolFill});G.attr({stroke:C.hoverBorderColor})}).on("mouseout",H).on("click",H).add();if(B){O=function(){H();var Q=F.getBBox();J.contextMenu("export-menu",B,Q.x,Q.y,K,L)}}F.on("click",function(){O.apply(J,arguments)});E=I.symbol(C.symbol,C.symbolX-(D/2),C.symbolY-(D/2),D,D).align(C,true).attr(t(N,{"stroke-width":C.symbolStrokeWidth||1,zIndex:20})).add();J.exportSVGElements.push(G,F,E)},destroyExport:function(){var A,B=this,C;for(A=0;A<B.exportSVGElements.length;A++){C=B.exportSVGElements[A];C.onclick=C.ontouchstart=null;B.exportSVGElements[A]=C.destroy()}for(A=0;A<B.exportDivElements.length;A++){C=B.exportDivElements[A];q(C,"mouseleave");B.exportDivElements[A]=C.onmouseout=C.onmouseover=C.ontouchstart=C.onclick=null;p(C)}}});function w(A){var B=A.length;while(B--){if(typeof A[B]==="number"){A[B]=Math.round(A[B])-0.5}}return A}a.Renderer.prototype.symbols.exportIcon=function(B,D,C,A){return w([h,B,D+C,i,B+C,D+A,B+C,D+A*0.8,B,D+A*0.8,"Z",h,B+C*0.5,D+A*0.8,i,B+C*0.8,D+A*0.4,B+C*0.4,D+A*0.4,B+C*0.4,D,B+C*0.6,D,B+C*0.6,D+A*0.4,B+C*0.2,D+A*0.4,"Z"])};a.Renderer.prototype.symbols.printIcon=function(B,D,C,A){return w([h,B,D+A*0.7,i,B+C,D+A*0.7,B+C,D+A*0.4,B,D+A*0.4,"Z",h,B+C*0.2,D+A*0.4,i,B+C*0.2,D,B+C*0.8,D,B+C*0.8,D+A*0.4,"Z",h,B+C*0.2,D+A*0.7,i,B,D+A,B+C,D+A,B+C*0.8,D+A*0.7,"Z"])};s.prototype.callbacks.push(function(A){var D,C=A.options.exporting,B=C.buttons;if(C.enabled!==false){for(D in B){A.addButton(B[D])}o(A,"destroy",A.destroyExport)}})}());