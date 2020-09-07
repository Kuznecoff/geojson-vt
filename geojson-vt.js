!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).geojsonvt=e()}(this,(function(){"use strict";function t(t,e,n,i,r,o){var l=r-n,a=o-i;if(0!==l||0!==a){var s=((t-n)*l+(e-i)*a)/(l*l+a*a);s>1?(n=r,i=o):s>0&&(n+=l*s,i+=a*s)}return(l=t-n)*l+(a=e-i)*a}function e(t,e,i,r){var o={id:null==t?null:t,type:e,geometry:i,tags:r,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0};if("Point"===e||"MultiPoint"===e||"LineString"===e)n(o,i);else if("Polygon"===e)n(o,i[0]);else if("MultiLineString"===e)for(var l=0,a=i;l<a.length;l+=1){n(o,a[l])}else if("MultiPolygon"===e)for(var s=0,u=i;s<u.length;s+=1){n(o,u[s][0])}return o}function n(t,e){for(var n=0;n<e.length;n+=3)t.minX=Math.min(t.minX,e[n]),t.minY=Math.min(t.minY,e[n+1]),t.maxX=Math.max(t.maxX,e[n]),t.maxY=Math.max(t.maxY,e[n+1])}function i(t,n,a,s){if(n.geometry){var u=n.geometry.coordinates,f=n.geometry.type,g=Math.pow(a.tolerance/((1<<a.maxZoom)*a.extent),2),h=[],m=n.id;if(a.promoteId?m=n.properties[a.promoteId]:a.generateId&&(m=s||0),"Point"===f)r(u,h);else if("MultiPoint"===f)for(var p=0,d=u;p<d.length;p+=1){r(d[p],h)}else if("LineString"===f)o(u,h,g,!1);else if("MultiLineString"===f){if(a.lineMetrics){for(var c=0,v=u;c<v.length;c+=1){o(v[c],h=[],g,!1),t.push(e(m,"LineString",h,n.properties))}return}l(u,h,g,!1)}else if("Polygon"===f)l(u,h,g,!0);else{if("MultiPolygon"!==f){if("GeometryCollection"===f){for(var x=0,M=n.geometry.geometries;x<M.length;x+=1){i(t,{id:m,geometry:M[x],properties:n.properties},a,s)}return}throw new Error("Input data is not a valid GeoJSON object.")}for(var y=0,P=u;y<P.length;y+=1){var S=[];l(P[y],S,g,!0),t.push(e(m,"Polygon",S,n.properties))}}h.length>0&&t.push(e(m,f,h,n.properties))}}function r(t,e){e.push(a(t[0]),s(t[1]),0)}function o(e,n,i,r){for(var o,l,u=0,f=0;f<e.length;f++){var g=a(e[f][0]),h=s(e[f][1]);n.push(g,h,0),f>0&&(u+=r?(o*h-g*l)/2:Math.sqrt(Math.pow(g-o,2)+Math.pow(h-l,2))),o=g,l=h}var m=n.length-3;n[2]=1,function e(n,i,r,o){for(var l,a=o,s=r-i>>1,u=r-i,f=n[i],g=n[i+1],h=n[r],m=n[r+1],p=i+3;p<r;p+=3){var d=t(n[p],n[p+1],f,g,h,m);if(d>a)l=p,a=d;else if(d===a){var c=Math.abs(p-s);c<u&&(l=p,u=c)}}a>o&&(l-i>3&&e(n,i,l,o),n[l+2]=a,r-l>3&&e(n,l,r,o))}(n,0,m,i),n[m+2]=1,n.size=Math.abs(u),n.start=0,n.end=n.size}function l(t,e,n,i){for(var r=0;r<t.length;r++){var l=[];o(t[r],l,n,i),e.push(l)}}function a(t){return 1*t/360+.5}function s(t){var e=Math.sin(t*Math.PI/180);return 1*Math.log((1+e)/(1-e))/(4*Math.PI)+.5}function u(t,n,i,r,o,l,a,s){if(r/=n,l>=(i/=n)&&a<r)return t;if(a<i||l>=r)return null;for(var u=[],h=0,p=t;h<p.length;h+=1){var d=p[h],c=d.geometry,v=d.type,x=0===o?d.minX:d.minY,M=0===o?d.maxX:d.maxY;if(x>=i&&M<r)u.push(d);else if(!(M<i||x>=r)){var y=[];if("Point"===v||"MultiPoint"===v)f(c,y,i,r,o);else if("LineString"===v)g(c,y,i,r,o,!1,s.lineMetrics);else if("MultiLineString"===v)m(c,y,i,r,o,!1);else if("Polygon"===v)m(c,y,i,r,o,!0);else if("MultiPolygon"===v)for(var P=0,S=c;P<S.length;P+=1){var Y=[];m(S[P],Y,i,r,o,!0),Y.length&&y.push(Y)}if(y.length){if(s.lineMetrics&&"LineString"===v){for(var X=0,L=y;X<L.length;X+=1){var b=L[X];u.push(e(d.id,v,b,d.tags))}continue}"LineString"!==v&&"MultiLineString"!==v||(1===y.length?(v="LineString",y=y[0]):v="MultiLineString"),"Point"!==v&&"MultiPoint"!==v||(v=3===y.length?"Point":"MultiPoint"),u.push(e(d.id,v,y,d.tags))}}}return u.length?u:null}function f(t,e,n,i,r){for(var o=0;o<t.length;o+=3){var l=t[o+r];l>=n&&l<=i&&p(e,t[o],t[o+1],t[o+2])}}function g(t,e,n,i,r,o,l){for(var a,s,u=h(t),f=0===r?d:c,g=t.start,m=0;m<t.length-3;m+=3){var v=t[m],x=t[m+1],M=t[m+2],y=t[m+3],P=t[m+4],S=0===r?v:x,Y=0===r?y:P,X=!1;l&&(a=Math.sqrt(Math.pow(v-y,2)+Math.pow(x-P,2))),S<n?Y>n&&(s=f(u,v,x,y,P,n),l&&(u.start=g+a*s)):S>i?Y<i&&(s=f(u,v,x,y,P,i),l&&(u.start=g+a*s)):p(u,v,x,M),Y<n&&S>=n&&(s=f(u,v,x,y,P,n),X=!0),Y>i&&S<=i&&(s=f(u,v,x,y,P,i),X=!0),!o&&X&&(l&&(u.end=g+a*s),e.push(u),u=h(t)),l&&(g+=a)}var L=t.length-3,b=t[L],z=t[L+1],w=t[L+2],I=0===r?b:z;I>=n&&I<=i&&p(u,b,z,w),L=u.length-3,o&&L>=3&&(u[L]!==u[0]||u[L+1]!==u[1])&&p(u,u[0],u[1],u[2]),u.length&&e.push(u)}function h(t){var e=[];return e.size=t.size,e.start=t.start,e.end=t.end,e}function m(t,e,n,i,r,o){for(var l=0,a=t;l<a.length;l+=1){g(a[l],e,n,i,r,o,!1)}}function p(t,e,n,i){t.push(e,n,i)}function d(t,e,n,i,r,o){var l=(o-e)/(i-e);return p(t,o,n+(r-n)*l,1),l}function c(t,e,n,i,r,o){var l=(o-n)/(r-n);return p(t,e+(i-e)*l,o,1),l}function v(t,n){for(var i=[],r=0;r<t.length;r++){var o=t[r],l=o.type,a=void 0;if("Point"===l||"MultiPoint"===l||"LineString"===l)a=x(o.geometry,n);else if("MultiLineString"===l||"Polygon"===l){a=[];for(var s=0,u=o.geometry;s<u.length;s+=1){var f=u[s];a.push(x(f,n))}}else if("MultiPolygon"===l){a=[];for(var g=0,h=o.geometry;g<h.length;g+=1){for(var m=[],p=0,d=h[g];p<d.length;p+=1){var c=d[p];m.push(x(c,n))}a.push(m)}}i.push(e(o.id,l,a,o.tags))}return i}function x(t,e){var n=[];n.size=t.size,void 0!==t.start&&(n.start=t.start,n.end=t.end);for(var i=0;i<t.length;i+=3)n.push(t[i]+e,t[i+1],t[i+2]);return n}function M(t,e){if(t.transformed)return t;for(var n=1<<t.z,i=t.x,r=t.y,o=0,l=t.features;o<l.length;o+=1){var a=l[o],s=a.geometry,u=a.type;if(a.geometry=[],1===u)for(var f=0;f<s.length;f+=2)a.geometry.push(y(s[f],s[f+1],e,n,i,r));else for(var g=0;g<s.length;g++){for(var h=[],m=0;m<s[g].length;m+=2)h.push(y(s[g][m],s[g][m+1],e,n,i,r));a.geometry.push(h)}}return t.transformed=!0,t}function y(t,e,n,i,r,o){return[Math.round(n*(t*i-r)),Math.round(n*(e*i-o))]}function P(t,e,n,i,r){for(var o=e===r.maxZoom?0:r.tolerance/((1<<e)*r.extent),l={features:[],numPoints:0,numSimplified:0,numFeatures:t.length,source:null,x:n,y:i,z:e,transformed:!1,minX:2,minY:1,maxX:-1,maxY:0},a=0,s=t;a<s.length;a+=1){S(l,s[a],o,r)}return l}function S(t,e,n,i){var r=e.geometry,o=e.type,l=[];if(t.minX=Math.min(t.minX,e.minX),t.minY=Math.min(t.minY,e.minY),t.maxX=Math.max(t.maxX,e.maxX),t.maxY=Math.max(t.maxY,e.maxY),"Point"===o||"MultiPoint"===o)for(var a=0;a<r.length;a+=3)l.push(r[a],r[a+1]),t.numPoints++,t.numSimplified++;else if("LineString"===o)Y(l,r,t,n,!1,!1);else if("MultiLineString"===o||"Polygon"===o)for(var s=0;s<r.length;s++)Y(l,r[s],t,n,"Polygon"===o,0===s);else if("MultiPolygon"===o)for(var u=0;u<r.length;u++)for(var f=r[u],g=0;g<f.length;g++)Y(l,f[g],t,n,!0,0===g);if(l.length){var h=e.tags||null;if("LineString"===o&&i.lineMetrics){for(var m in h={},e.tags)h[m]=e.tags[m];h.mapbox_clip_start=r.start/r.size,h.mapbox_clip_end=r.end/r.size}var p={geometry:l,type:"Polygon"===o||"MultiPolygon"===o?3:"LineString"===o||"MultiLineString"===o?2:1,tags:h};null!==e.id&&(p.id=e.id),t.features.push(p)}}function Y(t,e,n,i,r,o){var l=i*i;if(i>0&&e.size<(r?l:i))n.numPoints+=e.length/3;else{for(var a=[],s=0;s<e.length;s+=3)(0===i||e[s+2]>l)&&(n.numSimplified++,a.push(e[s],e[s+1])),n.numPoints++;r&&function(t,e){for(var n=0,i=0,r=t.length,o=r-2;i<r;o=i,i+=2)n+=(t[i]-t[o])*(t[i+1]+t[o+1]);if(n>0===e)for(var l=0,a=t.length;l<a/2;l+=2){var s=t[l],u=t[l+1];t[l]=t[a-2-l],t[l+1]=t[a-1-l],t[a-2-l]=s,t[a-1-l]=u}}(a,o),t.push(a)}}var X={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,lineMetrics:!1,promoteId:null,generateId:!1,debug:0},L=function(t,e){var n=(e=this.options=function(t,e){for(var n in e)t[n]=e[n];return t}(Object.create(X),e)).debug;if(n&&console.time("preprocess data"),e.maxZoom<0||e.maxZoom>24)throw new Error("maxZoom should be in the 0-24 range");if(e.promoteId&&e.generateId)throw new Error("promoteId and generateId cannot be used together.");var r=function(t,e){var n=[];if("FeatureCollection"===t.type)for(var r=0;r<t.features.length;r++)i(n,t.features[r],e,r);else"Feature"===t.type?i(n,t,e):i(n,{geometry:t},e);return n}(t,e);this.tiles={},this.tileCoords=[],n&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",e.indexMaxZoom,e.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),(r=function(t,e){var n=e.buffer/e.extent,i=t,r=u(t,1,-1-n,n,0,-1,2,e),o=u(t,1,1-n,2+n,0,-1,2,e);return(r||o)&&(i=u(t,1,-n,1+n,0,-1,2,e)||[],r&&(i=v(r,1).concat(i)),o&&(i=i.concat(v(o,-1)))),i}(r,e)).length&&this.splitTile(r,0,0,0),n&&(r.length&&console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)))};function b(t,e,n){return 32*((1<<t)*n+e)+t}return L.prototype.splitTile=function(t,e,n,i,r,o,l){for(var a=[t,e,n,i],s=this.options,f=s.debug;a.length;){i=a.pop(),n=a.pop(),e=a.pop(),t=a.pop();var g=1<<e,h=b(e,n,i),m=this.tiles[h];if(!m&&(f>1&&console.time("creation"),m=this.tiles[h]=P(t,e,n,i,s),this.tileCoords.push({z:e,x:n,y:i}),f)){f>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",e,n,i,m.numFeatures,m.numPoints,m.numSimplified),console.timeEnd("creation"));var p="z"+e;this.stats[p]=(this.stats[p]||0)+1,this.total++}if(m.source=t,null==r){if(e===s.indexMaxZoom||m.numPoints<=s.indexMaxPoints)continue}else{if(e===s.maxZoom||e===r)continue;if(null!=r){var d=r-e;if(n!==o>>d||i!==l>>d)continue}}if(m.source=null,0!==t.length){f>1&&console.time("clipping");var c=.5*s.buffer/s.extent,v=.5-c,x=.5+c,M=1+c,y=null,S=null,Y=null,X=null,L=u(t,g,n-c,n+x,0,m.minX,m.maxX,s),z=u(t,g,n+v,n+M,0,m.minX,m.maxX,s);t=null,L&&(y=u(L,g,i-c,i+x,1,m.minY,m.maxY,s),S=u(L,g,i+v,i+M,1,m.minY,m.maxY,s),L=null),z&&(Y=u(z,g,i-c,i+x,1,m.minY,m.maxY,s),X=u(z,g,i+v,i+M,1,m.minY,m.maxY,s),z=null),f>1&&console.timeEnd("clipping"),a.push(y||[],e+1,2*n,2*i),a.push(S||[],e+1,2*n,2*i+1),a.push(Y||[],e+1,2*n+1,2*i),a.push(X||[],e+1,2*n+1,2*i+1)}}},L.prototype.getTile=function(t,e,n){t=+t,e=+e,n=+n;var i=this.options,r=i.extent,o=i.debug;if(t<0||t>24)return null;var l=1<<t,a=b(t,e=e+l&l-1,n);if(this.tiles[a])return M(this.tiles[a],r);o>1&&console.log("drilling down to z%d-%d-%d",t,e,n);for(var s,u=t,f=e,g=n;!s&&u>0;)u--,f>>=1,g>>=1,s=this.tiles[b(u,f,g)];return s&&s.source?(o>1&&(console.log("found parent tile z%d-%d-%d",u,f,g),console.time("drilling down")),this.splitTile(s.source,u,f,g,t,e,n),o>1&&console.timeEnd("drilling down"),this.tiles[a]?M(this.tiles[a],r):null):null},function(t,e){return new L(t,e)}}));