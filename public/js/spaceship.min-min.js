function Butterfly(e,t){var i=0;this.x=e,this.y=t,this.show=function(e){translate(this.x,this.y),rotate(PI/2),beginShape(),stroke(255),fill(colorAlpha("#29323c",.5)),strokeWeight(1);for(var t=PI/100,s=0,o=-PI/2;o<=PI/2;o+=t){var n=noise(s,i),r=sin(2*o)*map(n,0,1,50,100),a=r*sin(o)*e,c=r*cos(o)*e;s+=.1,vertex(c,a)}for(var o=PI/2;o<=3*PI/2;o+=t){var n=noise(s,i),r=sin(2*o)*map(n,0,1,50,100),a=r*sin(o)*e,c=r*cos(o)*e;s-=.1,vertex(c,a)}endShape(),i+=.1}}function Cluster(e,t,i){this.nodes=[],this.diameter=t;for(var s=0;s<e;s++)this.nodes.push(new Node(i.add(Vec2D.randomVector())));for(var s=0;s<this.nodes.length-1;s++)for(var o=s+1;o<this.nodes.length;o++)physics.addSpring(new VerletSpring2D(this.nodes[s],this.nodes[o],this.diameter,.01));this.display=function(){for(var e=0;e<this.nodes.length;e++)this.nodes[e].display()},this.showConnections=function(){stroke(255,150),strokeWeight(2);for(var e=0;e<this.nodes.length-1;e++)for(var t=e+1;t<this.nodes.length;t++)line(this.nodes[e].x,this.nodes[e].y,this.nodes[t].x,this.nodes[t].y)}}function Node(e){VerletParticle2D.call(this,e),this.display=function(){fill(255),stroke(255,.4),strokeWeight(2),ellipse(this.x,this.y,16,16)}}function setup(){createCanvas(window.innerWidth,window.innerHeight),b1=color("#485563"),b2=color("#29323c"),physics=new VerletPhysics2D,physics.setWorldBounds(new Rect(0,0,width,height)),cluster=new Cluster(8,100,new Vec2D(width/2,height/2))}function draw(){setGradient(0,0,windowWidth,windowHeight,b1,b2,X_AXIS),spaceship(soundcloud.frequencySUM()/512)}function spaceship(e){e>40?(showPhysics=!showPhysics)||(showParticles=!0):e>20?(showParticles=!showParticles)||(showPhysics=!0):e>10&&(physics.clear(),cluster=new Cluster(Math.floor(random(2,floor(e))),random(10,height-100),new Vec2D(width/2,height/2))),physics.update(),showParticles&&cluster.display(),showPhysics&&cluster.showConnections()}function setGradient(e,t,i,s,o,n,r){if(noFill(),r==Y_AXIS)for(var a=t;a<=t+s;a++){var c=map(a,t,t+s,0,1),h=lerpColor(o,n,c);stroke(h),line(e,a,e+i,a)}else if(r==X_AXIS)for(var a=e;a<=e+i;a++){var c=map(a,e,e+i,0,1),h=lerpColor(o,n,c);stroke(h),line(a,t,a,t+s)}}function windowResized(){resizeCanvas(window.innerWidth,window.innerHeight),cluster=new Cluster(8,100,new Vec2D(width/2,height/2))}function colorAlpha(e,t){var i=color(e);return color("rgba("+[red(i),green(i),blue(i),t].join(",")+")")}var VerletPhysics2D=toxi.physics2d.VerletPhysics2D,VerletParticle2D=toxi.physics2d.VerletParticle2D,VerletSpring2D=toxi.physics2d.VerletSpring2D,VerletMinDistanceSpring2D=toxi.physics2d.VerletMinDistanceSpring2D,Vec2D=toxi.geom.Vec2D,Rect=toxi.geom.Rect;Node.prototype=Object.create(VerletParticle2D.prototype),Node.prototype.constructor=Node;var sound=function(e){"use strict";function t(s){if(!(this instanceof t))return e.initialize({client_id:i}),new t(s);this._init.apply(this,arguments)}var i="802c2f1c80c96881ff265799929e8a2c";return t.fn=t.prototype={constructor:t,author:"sona",version:"1.0.0",_init:function(e){var t=new(window.AudioContext||window.webkitAudioContext),i=t.createMediaElementSource(e);this.audio=e,this.analyser=t.createAnalyser(),this.analyser.smoothingTimeConstant=.2,this.analyser.fftSize=1024,this.analyser.connect(t.destination),this.audio.crossOrigin="anonymous",i.connect(this.analyser);var s=this.analyser.frequencyBinCount;this.dataArray=new Uint8Array(s)},search:function(t,s,o){e.resolve(t).then(function(e){if(e.stream_url){var t=e.stream_url+"?client_id="+i,n=e.artwork_url;s.call(this,t,n)}else o("Playlist is not supported")}).catch(function(e){o(e)})},play:function(e){this.audio.src="data:audio/mpeg;base64,/+MYxAAAAANIAUAAAASEEB/jwOFM/0MM/90b/+RhST//w4NFwOjf///PZu////9lns5GFDv//l9GlUIEEIAAAgIg8Ir/JGq3/+MYxDsLIj5QMYcoAP0dv9HIjUcH//yYSg+CIbkGP//8w0bLVjUP///3Z0x5QCAv/yLjwtGKTEFNRTMuOTeqqqqqqqqqqqqq/+MYxEkNmdJkUYc4AKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",this.audio.setAttribute("src",e),this.audio.play()},frequencySUM:function(){this.analyser.getByteFrequencyData(this.dataArray);for(var e=0,t=0,i=this.dataArray.length;t<i;t++)e+=this.dataArray[t];return e}},t}(SC),physics,cluster,showPhysics=!0,showParticles=!0,Y_AXIS=1,X_AXIS=2,b1,b2,audio=document.querySelectorAll(".audio-player")[0],soundcloud=sound(audio),deepshower="https://soundcloud.com/vegastripseoul/deepshower-replay-feat-jeebanoff";soundcloud.search(deepshower,function(e,t){soundcloud.play(e)},function(e){console.log(e)});