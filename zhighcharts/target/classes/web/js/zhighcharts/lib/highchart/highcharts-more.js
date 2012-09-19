(function(h,w){function G(b,c,a){this.init.call(this,b,c,a)}function q(b,c,a){b.call(this,c,a);if(this.chart.polar){this.closeSegment=function(e){var d=this.xAxis.center;e.push("L",d[0],d[1])},this.closedStacks=!0}}function s(a,b){var c=this.chart,d=this.options.animation,f=this.group,e=this.markerGroup,g=this.xAxis.center,i=c.plotLeft,m=c.plotTop;if(c.polar){if(c.renderer.isSVG){if(d===!0&&(d={}),b){if(f.attrSetters.scaleX=f.attrSetters.scaleY=function(C,H){this[H]=C;this.scaleX!==w&&this.scaleY!==w&&this.element.setAttribute("transform","translate("+this.translateX+","+this.translateY+") scale("+this.scaleX+","+this.scaleY+")");return !1},c={translateX:g[0]+i,translateY:g[1]+m,scaleX:0,scaleY:0},f.attr(c),e){e.attrSetters=f.attrSetters,e.attr(c)}}else{c={translateX:i,translateY:m,scaleX:1,scaleY:1},f.animate(c,d),e&&e.animate(c,d),this.animate=null}}}else{a.call(this,b)}}var p=h.each,y=h.extend,o=h.merge,u=h.map,n=h.pick,A=h.pInt,j=h.getOptions().plotOptions,k=h.seriesTypes,D=h.extendClass,l=h.wrap,r=h.Axis,z=h.Tick,F=h.Series,t=k.column.prototype,v=function(){};y(G.prototype,{init:function(c,d,e){var a=this,b=a.defaultOptions;a.chart=d;if(d.angular){b.background={}}a.options=c=o(b,c);(c=c.background)&&p([].concat(h.splat(c)).reverse(),function(f){var g=f.backgroundColor,f=o(a.defaultBackgroundOptions,f);if(g){f.backgroundColor=g}f.color=f.backgroundColor;e.options.plotBands.unshift(f)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:Number.MIN_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"}});var E=r.prototype,r=z.prototype,B={getOffset:v,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:v,setCategories:v,setTitle:v},x={isRadial:!0,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,plotBands:[],tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,plotBands:[],showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},plotBands:[],showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(a){this.options=o(this.defaultOptions,this.defaultRadialOptions,a)},getOffset:function(){E.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=k.pie.prototype.getCenter.call(this.pane)},getLinePath:function(b,c){var a=this.center,c=n(c,a[2]/2-this.offset);return this.chart.renderer.symbols.arc(this.left+a[0],this.top+a[1],c,c,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0})},setAxisTranslation:function(){E.setAxisTranslation.call(this);if(this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.isXAxis)){this.minPixelPadding=this.transA*this.minPointOffset+(this.reversed?(this.endAngleRad-this.startAngleRad)/4:0)}},beforeSetTickPositions:function(){this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange)},setAxisSize:function(){E.setAxisSize.call(this);if(this.center){this.len=this.width=this.height=this.isCircular?this.center[2]*(this.endAngleRad-this.startAngleRad)/2:this.center[2]/2}},getPosition:function(a,b){if(!this.isCircular){b=this.translate(a),a=this.min}return this.postTranslate(this.translate(a),n(b,this.center[2]/2)-this.offset)},postTranslate:function(c,d){var a=this.chart,b=this.center,c=this.startAngleRad+c;return{x:a.plotLeft+b[0]+Math.cos(c)*d,y:a.plotTop+b[1]+Math.sin(c)*d}},getPlotBandPath:function(C,a,b){var c=this.center,e=this.startAngleRad,d=c[2]/2,f=[n(b.outerRadius,"100%"),b.innerRadius,n(b.thickness,10)],g=/%$/,i,m=this.isCircular;this.options.gridLineInterpolation==="polygon"?c=this.getPlotLinePath(C).concat(this.getPlotLinePath(a,!0)):(m||(f[0]=this.translate(C),f[1]=this.translate(a)),f=u(f,function(H){g.test(H)&&(H=A(H,10)*d/100);return H}),b.shape==="circle"||!m?(C=-Math.PI/2,a=Math.PI*1.5,i=!0):(C=e+this.translate(C),a=e+this.translate(a)),c=this.chart.renderer.symbols.arc(this.left+c[0],this.top+c[1],f[0],f[0],{start:C,end:a,innerR:n(f[1],f[0]-f[2]),open:i}));return c},getPlotLinePath:function(c,d){var e=this.center,f=this.chart,i=this.getPosition(c),g,a,b;this.isCircular?b=["M",e[0]+f.plotLeft,e[1]+f.plotTop,"L",i.x,i.y]:this.options.gridLineInterpolation==="circle"?(c=this.translate(c))&&(b=this.getLinePath(0,c)):(g=f.xAxis[0],b=[],c=this.translate(c),e=g.tickPositions,g.autoConnect&&(e=e.concat([e[0]])),d&&(e=[].concat(e).reverse()),p(e,function(C,m){a=g.getPosition(C,c);b.push(m?"L":"M",a.x,a.y)}));return b},getTitlePosition:function(){var b=this.center,c=this.chart,a=this.options.title;return{x:c.plotLeft+b[0]+(a.x||0),y:c.plotTop+b[1]-{high:0.5,middle:0.25,low:0}[a.align]*b[2]+(a.y||0)}}};l(E,"init",function(a,b,c){var d=this,f=b.angular,e=b.polar,g=c.isX,i=f&&g,m;if(f){if(y(this,i?B:x),m=!g){this.defaultRadialOptions=this.defaultRadialGaugeOptions}}else{if(e){y(this,x),this.defaultRadialOptions=(m=g)?this.defaultRadialXOptions:o(this.defaultYAxisOptions,this.defaultRadialYOptions)}}a.call(this,b,c);if(!i&&(f||e)){a=this.options;if(!b.panes){b.panes=u(h.splat(b.options.pane),function(C){return new G(C,b,d)})}this.pane=f=b.panes[c.pane||0];e=f.options;b.inverted=!1;b.options.chart.zoomType=null;this.startAngleRad=f=(e.startAngle-90)*Math.PI/180;this.endAngleRad=e=(n(e.endAngle,e.startAngle+360)-90)*Math.PI/180;this.offset=a.offset||0;if((this.isCircular=m)&&c.max===w&&e-f===2*Math.PI){this.autoConnect=!0}}});l(r,"getPosition",function(c,d,e,f,b){var a=this.axis;return a.getPosition?a.getPosition(e):c.call(this,d,e,f,b)});l(r,"getLabelPosition",function(f,g,i,m,H,C,I,a,e){var J=this.axis,c=C.y,b=C.align,d=(J.translate(this.pos)+J.startAngleRad+Math.PI/2)/Math.PI*180;J.isRadial?(f=J.getPosition(this.pos,J.center[2]/2+n(C.distance,-25)),C.rotation==="auto"?m.attr({rotation:d}):c===null&&(c=A(m.styles.lineHeight)*0.9-m.getBBox().height/2),b===null&&(b=J.isCircular?d>20&&d<160?"left":d>200&&d<340?"right":"center":"center",m.attr({align:b})),f.x+=C.x,f.y+=c):f=f.call(this,g,i,m,H,C,I,a,e);return f});l(r,"getMarkPath",function(c,d,e,f,i,g,a){var b=this.axis;b.isRadial?(c=b.getPosition(this.pos,b.center[2]/2+f),d=["M",d,e,"L",c.x,c.y]):d=c.call(this,d,e,f,i,g,a);return d});j.arearange=o(j.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},trackByArea:!0,dataLabels:{xLow:0,xHigh:0,yLow:16,yHigh:-6},shadow:!1});r=h.extendClass(h.Point,{applyOptions:function(c,d){var e=this.series,f=e.pointArrayMap,a=0,g=0,b=f.length;if(typeof c==="object"&&typeof c.length!=="number"){y(this,c),this.options=c}else{if(c.length){if(c.length>b){if(typeof c[0]==="string"){this.name=c[0]}else{if(typeof c[0]==="number"){this.x=c[0]}}a++}for(;g<b;){this[f[g++]]=c[a++]}}}this.y=this[e.pointValKey];if(this.x===w&&e){this.x=d===w?e.autoIncrement():d}return this},toYData:function(){return[this.low,this.high]}});k.arearange=h.extendClass(k.area,{type:"arearange",pointArrayMap:["low","high"],pointClass:r,pointValKey:"low",translate:function(){var a=this.yAxis;k.area.prototype.translate.apply(this);p(this.points,function(b){if(b.y!==null){b.plotLow=b.plotY,b.plotHigh=a.translate(b.high,0,1,0,1)}})},getSegmentPath:function(c){for(var d=[],e=c.length,a=F.prototype.getSegmentPath,b;e--;){b=c[e],d.push({plotX:b.plotX,plotY:b.plotHigh})}c=a.call(this,c);a=a.call(this,d);d=[].concat(c,a);a[0]="L";this.areaPath=this.areaPath.concat(c,a);return d},drawDataLabels:function(){var c=this.data,d=c.length,e,f=[],i=F.prototype,g=this.options.dataLabels,a,b=this.chart.inverted;if(g.enabled||this._hasPointLabels){for(e=d;e--;){a=c[e],a.y=a.high,a.plotY=a.plotHigh,f[e]=a.dataLabel,a.dataLabel=a.dataLabelUpper,b?(g.align="left",g.x=g.xHigh):g.y=g.yHigh}i.drawDataLabels.apply(this,arguments);for(e=d;e--;){a=c[e],a.dataLabelUpper=a.dataLabel,a.dataLabel=f[e],a.y=a.low,a.plotY=a.plotLow,b?(g.align="right",g.x=g.xLow):g.y=g.yLow}i.drawDataLabels.apply(this,arguments)}},getSymbol:k.column.prototype.getSymbol,drawPoints:v});j.areasplinerange=o(j.arearange);k.areasplinerange=D(k.arearange,{type:"areasplinerange",getPointSpline:k.spline.prototype.getPointSpline});j.columnrange=o(j.column,j.arearange,{lineWidth:1,pointRange:null});k.columnrange=D(k.arearange,{type:"columnrange",translate:function(){var a=this.yAxis,b;t.translate.apply(this);p(this.points,function(c){var d=c.shapeArgs;c.plotHigh=b=a.translate(c.high,0,1,0,1);c.plotLow=c.plotY;d.y=b;d.height=c.plotY-b;c.trackerArgs=d})},drawGraph:v,pointAttrToOptions:t.pointAttrToOptions,drawPoints:t.drawPoints,drawTracker:t.drawTracker,animate:t.animate});j.gauge=o(j.line,{dataLabels:{enabled:!0,y:30,borderWidth:1,borderColor:"silver",borderRadius:3,style:{fontWeight:"bold"}},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1});j={type:"gauge",pointClass:h.extendClass(h.Point,{setState:function(a){this.state=a}}),angular:!0,translate:function(){var b=this,c=b.yAxis,a=c.center;b.generatePoints();p(b.points,function(e){var g=o(b.options.dial,e.dial),f=A(n(g.radius,80))*a[2]/200,i=A(n(g.baseLength,70))*f/100,C=A(n(g.rearLength,10))*f/100,d=g.baseWidth||3,m=g.topWidth||1;e.shapeType="path";e.shapeArgs={d:g.path||["M",-C,-d/2,"L",i,-d/2,f,-m/2,f,m/2,i,d/2,-C,d/2,"z"],translateX:a[0],translateY:a[1],rotation:(c.startAngleRad+c.translate(e.y))*180/Math.PI};e.plotX=a[0];e.plotY=a[1]})},drawPoints:function(){var c=this,d=c.yAxis.center,e=c.pivot,f=c.options,b=f.pivot,a=f.dial;p(c.points,function(C){var g=C.graphic,i=C.shapeArgs,m=i.d;g?(g.animate(i),i.d=m):C.graphic=c.chart.renderer[C.shapeType](i).attr({stroke:a.borderColor||"none","stroke-width":a.borderWidth||0,fill:a.backgroundColor||"black",rotation:i.rotation}).add(c.group)});e?e.animate({cx:d[0],cy:d[1]}):c.pivot=c.chart.renderer.circle(d[0],d[1],n(b.radius,5)).attr({"stroke-width":b.borderWidth||0,stroke:b.borderColor||"silver",fill:b.backgroundColor||"black"}).add(c.group)},animate:function(){var a=this;p(a.points,function(c){var b=c.graphic;b&&(b.attr({rotation:a.yAxis.startAngleRad*180/Math.PI}),b.animate({rotation:c.shapeArgs.rotation},a.options.animation))});a.animate=null},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);k.pie.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:k.pie.prototype.setData,drawTracker:k.column.prototype.drawTracker};k.gauge=h.extendClass(k.line,j);j=F.prototype;D=h.MouseTracker.prototype;j.toXY=function(c){var d,a=this.chart;d=c.plotX;var b=c.plotY;c.rectPlotX=d;c.rectPlotY=b;c.deg=d/Math.PI*180;d=this.xAxis.postTranslate(c.plotX,this.yAxis.len-b);c.plotX=c.polarPlotX=d.x-a.plotLeft;c.plotY=c.polarPlotY=d.y-a.plotTop};l(k.area.prototype,"init",q);l(k.areaspline.prototype,"init",q);l(k.spline.prototype,"getPointSpline",function(g,i,m,C){var a,H,b,d,c,f,e;if(this.chart.polar){a=m.plotX;H=m.plotY;g=i[C-1];b=i[C+1];this.connectEnds&&(g||(g=i[i.length-2]),b||(b=i[1]));if(g&&b){d=g.plotX,c=g.plotY,i=b.plotX,f=b.plotY,d=(1.5*a+d)/2.5,c=(1.5*H+c)/2.5,b=(1.5*a+i)/2.5,e=(1.5*H+f)/2.5,i=Math.sqrt(Math.pow(d-a,2)+Math.pow(c-H,2)),f=Math.sqrt(Math.pow(b-a,2)+Math.pow(e-H,2)),d=Math.atan2(c-H,d-a),c=Math.atan2(e-H,b-a),e=Math.PI/2+(d+c)/2,Math.abs(d-e)>Math.PI/2&&(e-=Math.PI),d=a+Math.cos(e)*i,c=H+Math.sin(e)*i,b=a+Math.cos(Math.PI+e)*f,e=H+Math.sin(Math.PI+e)*f,m.rightContX=b,m.rightContY=e}C?(m=["C",g.rightContX||g.plotX,g.rightContY||g.plotY,d||a,c||H,a,H],g.rightContX=g.rightContY=null):m=["M",a,H]}else{m=g.call(this,i,m,C)}return m});l(j,"translate",function(a){a.call(this);if(this.chart.polar&&!this.preventPostTranslate){for(var a=this.points,b=a.length;b--;){this.toXY(a[b])}}});l(j,"getSegmentPath",function(b,c){var a=this.points;if(this.chart.polar&&this.options.connectEnds!==!1&&c[c.length-1]===a[a.length-1]&&a[0].y!==null){this.connectEnds=!0,c=[].concat(c,[a[0]])}return b.call(this,c)});l(j,"animate",s);l(t,"animate",s);l(j,"setTooltipPoints",function(a,b){this.chart.polar&&y(this.xAxis,{tooltipLen:360,tooltipPosName:"deg"});return a.call(this,b)});l(t,"translate",function(c){var d=this.xAxis,e=this.yAxis.len,f=d.center,a=d.startAngleRad,g=this.chart.renderer,b;this.preventPostTranslate=!0;c.call(this);if(d.isRadial){c=this.points;for(b=c.length;b--;){d=c[b],d.shapeType="path",d.shapeArgs={d:g.symbols.arc(f[0],f[1],e-d.plotY,null,{start:a+d.barX,end:a+d.barX+d.pointWidth,innerR:e-n(d.yBottom,e)})},this.toXY(d)}}});l(D,"getIndex",function(c,d){var e,a=this.chart,b;a.polar?(b=a.xAxis[0].center,e=d.chartX-b[0]-a.plotLeft,a=d.chartY-b[1]-a.plotTop,e=180-Math.round(Math.atan2(e,a)/Math.PI*180)):e=c.call(this,d);return e});l(D,"getMouseCoordinates",function(c,d){var a=this.chart,b={xAxis:[],yAxis:[]};a.polar?p(a.axes,function(i){var e=i.isXAxis,f=i.center,g=d.chartX-f[0]-a.plotLeft,f=d.chartY-f[1]-a.plotTop;b[e?"xAxis":"yAxis"].push({axis:i,value:i.translate(e?Math.PI-Math.atan2(g,f):Math.sqrt(Math.pow(g,2)+Math.pow(f,2)),!0)})}):b=c.call(this,d);return b})})(Highcharts);