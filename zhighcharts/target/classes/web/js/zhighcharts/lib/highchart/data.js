(function(b){var c=b.each;var a=function(d){this.init(d)};b.extend(a.prototype,{init:function(d){this.options=d;this.columns=[];this.parseCSV();this.parseTable();this.parseTypes();this.findHeaderRow();this.parsed();this.complete()},parseCSV:function(){var h=this.options,e=h.csv,i=this.columns,g=h.startRow||0,f=h.endRow||Number.MAX_VALUE,j=h.startColumn||0,k=h.endColumn||Number.MAX_VALUE,d;if(e){d=e.split(h.lineDelimiter||"\n");c(d,function(l,n){if(n>=g&&n<=f){var m=l.split(h.itemDelimiter||",");c(m,function(p,o){if(o>=j&&o<=k){if(!i[o-j]){i[o-j]=[]}i[o-j][n-g]=p}})}})}},parseTable:function(){var f=this.options,j=f.table,g=this.columns,e=f.startRow||0,d=f.endRow||Number.MAX_VALUE,i=f.startColumn||0,k=f.endColumn||Number.MAX_VALUE,h;if(j){if(typeof j==="string"){j=document.getElementById(j)}c(j.getElementsByTagName("tr"),function(m,l){h=0;if(l>=e&&l<=d){c(m.childNodes,function(n){if((n.tagName==="TD"||n.tagName==="TH")&&h>=i&&h<=k){if(!g[h]){g[h]=[]}g[h][l-e]=n.innerHTML;h+=1}})}})}},findHeaderRow:function(){var d=0;c(this.columns,function(e){if(typeof e[0]!=="string"){d=null}});this.headerRow=0},trim:function(d){return d.replace(/^\s+|\s+$/g,"")},parseTypes:function(){var g=this.columns,f=g.length,j,i,d,h,e;while(f--){j=g[f].length;while(j--){i=g[f][j];d=parseFloat(i);h=this.trim(i);if(h==d){g[f][j]=d;if(d>365*24*3600*1000){g[f].isDatetime=true}else{g[f].isNumeric=true}}else{e=Date.parse(i);if(f===0&&typeof e==="number"&&!isNaN(e)){g[f][j]=e;g[f].isDatetime=true}else{g[f][j]=h}}}}},parsed:function(){if(this.options.parsed){this.options.parsed.call(this,this.columns)}},complete:function(){var e=this.columns,l,m,n,o,p=this.options,k,h,d,g,f;if(p.complete){if(e.length>1){n=e.shift();if(this.headerRow===0){n.shift()}l=n.isNumeric||n.isDatetime;if(!l){m=n}if(n.isDatetime){o="datetime"}}k=[];for(g=0;g<e.length;g++){if(this.headerRow===0){d=e[g].shift()}h=[];for(f=0;f<e[g].length;f++){h[f]=e[g][f]!==undefined?(l?[n[f],e[g][f]]:e[g][f]):null}k[g]={name:d,data:h}}p.complete({xAxis:{categories:m,type:o},series:k})}}});b.Data=a;b.data=function(d){return new a(d)}}(Highcharts));