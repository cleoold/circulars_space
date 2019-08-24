/* uniform circular motion demo! ()cleoold*/
var bgChangeFlag=-1;(()=>{const a=document.querySelector("body"),b=document.querySelector("html"),c=["#30542c","#232170","#530a80","#870c6d","#873a0b"];let d=0;bgChangeFlag=setTimeout(function e(){5==++d&&(d=0),a.style.backgroundColor=c[d],b.style.backgroundColor=c[d],bgChangeFlag&&(bgChangeFlag=setTimeout(e,5e3))},5e3)})(),document.querySelector(".shared-info-container-bo .cancel-bg-change").addEventListener("click",()=>{bgChangeFlag=null});const container=document.querySelector("div#container"),containerWidthText=document.querySelector(".container-width"),origin=document.querySelector("div#origin");var containerLength=0;function floatToPx(a){return a+""+"px"}function parseFloat200(a){let b=parseFloat(a);return isNaN(b)?1/0:b}function wrongInput(a){let b=a.style.backgroundColor;a.style.backgroundColor="#c98d8d",setTimeout(()=>{a.style.backgroundColor=b},400)}function onChangeContainerSize(){containerLength=parseFloat(window.getComputedStyle(container).width);var a=floatToPx(containerLength);container.style.height=a,containerWidthText.value=a,origin.style.left=floatToPx(parseFloat(window.getComputedStyle(container).width)/2-3.6),origin.style.top=floatToPx(parseFloat(window.getComputedStyle(container).height)/2-3.5)}onChangeContainerSize(),window.addEventListener("resize",onChangeContainerSize);function degToRadian(a){return Math.PI*a/180}function rotateX(a,b,c){return Math.cos(c)*a-Math.sin(c)*b}function rotateY(a,b,c){return Math.sin(c)*a+Math.cos(c)*b}function Block(a=0,b=0,c=0,d=0,e=0){this.offset=a,this.initPeriod=b,this.initSemiX=c,this.initSemiY=d,this.initRotate=e,this.period=()=>this.initPeriod,this.omega=a=>2*Math.PI/this.period(a),this.semiX=()=>this.initSemiX,this.semiY=()=>this.initSemiY,this.rotate=()=>this.initRotate,this.yieldX=a=>this.semiX(a)*Math.cos(this.omega(a)*a-this.offset),this.yieldY=a=>this.semiY(a)*Math.sin(this.omega(a)*a-this.offset),this.yieldRotated=a=>{let b=this.yieldX(a),c=this.yieldY(a),d=degToRadian(this.rotate(a));return[rotateX(b,c,d),rotateY(b,c,d)]}}var intervals=40;function BlockInMotion(a){function b(a,b=!0){A=0,z=containerLength/2,n.value=20,p.value=5,r.value=z/2,s.value=z/2,q.value=0,t.value=0,u.value=0,v.value=0,w.value=0,h.style.left="49.1%",h.style.top="48.9%",h.style.width="20px",h.style.height="20px",j.style.left="49.1%",i.style.width="0px",i.style.height="0px",b&&(m.value="yellow",x.style.backgroundColor="yellow",h.style.backgroundColor="yellow",j.style.backgroundColor="yellow"),B=null}function c(a,b,c){return 0>a||a>containerLength-c||0>b||b>containerLength-1.1*c}function d(){A+=intervals;var a=A/1e3;let b=parseFloat(h.style.width),e=z-b/2;const i=g.yieldRotated(a);var m=i[0]+e,n=i[1]+e;return c(m,n,b)?(g.initSemiX=z,g.SemiX=()=>g.initSemiX,g.initSemiY=z,g.SemiY=()=>g.initSemiY,g.initPeriod=0,g.period=()=>g.initPeriod,g.initRotate=0,g.rotate=()=>g.initRotate,u.value=0,v.value=0,void(p.value=0)):void(h.style.left=floatToPx(m),k.value=floatToPx(m),h.style.top=floatToPx(n),l.value=floatToPx(n),j.style.left=floatToPx(m),f(g.semiX(a),g.semiY(a),g.rotate(a)),B=setTimeout(d,intervals))}function f(a,b,c){a=Math.abs(a),b=Math.abs(b),i.style.width=floatToPx(2*a),i.style.height=floatToPx(2*b);let d=parseFloat(window.getComputedStyle(container).width)/2;i.style.left=floatToPx(d-a),i.style.top=floatToPx(d-b),i.style.transform=`rotate(${c}deg)`,i.style.WebkitTransform=`rotate(${c}deg)`}var g=new Block;const h=document.querySelector(`div#moving-obj-${a}`),i=document.querySelector(`div#moving-obj-trajectory-${a}`),j=document.querySelector(`div#moving-obj-prj-${a}`),k=document.querySelector(`#info-container-${a} .box-x`),l=document.querySelector(`#info-container-${a} .box-y`),m=document.querySelector(`#info-container-${a} .set-color`),n=document.querySelector(`#info-container-${a} .set-size`),p=document.querySelector(`#info-container-${a} .set-period`),q=document.querySelector(`#info-container-${a} .set-angle`),r=document.querySelector(`#info-container-${a} .set-semi-X-axis`),s=document.querySelector(`#info-container-${a} .set-semi-Y-axis`),t=document.querySelector(`#info-container-${a} .set-period-change`),u=document.querySelector(`#info-container-${a} .set-semi-X-axis-change`),v=document.querySelector(`#info-container-${a} .set-semi-Y-axis-change`),w=document.querySelector(`#info-container-${a} .set-angle-change`),x=document.querySelector(`#info-container-${a} .set-attr-go`),y=document.querySelector(`#info-container-${a} .set-attr-reset`);var z=0,A=0,B=null,C=!1,D=0,E=0;b(),window.addEventListener("resize",()=>{z=containerLength/2,g.initSemiX>z&&(g.initSemiX=z),g.initSemiY>z&&(g.initSemiY=z);"ontouchstart"in document.documentElement||(r.value=g.initSemiX,s.value=g.initSemiY)}),p.addEventListener("click",()=>{p.value=g.period(A/1e3)}),r.addEventListener("click",()=>{r.value=g.semiX(A/1e3)}),s.addEventListener("click",()=>{s.value=g.semiY(A/1e3)}),q.addEventListener("click",()=>{q.value=g.rotate(A/1e3)}),x.addEventListener("click",function(){const a=parseFloat(n.value);if(30>=a&&5<=a)x.style.backgroundColor=m.value,h.style.backgroundColor=m.value,h.style.width=floatToPx(a),h.style.height=floatToPx(a),j.style.backgroundColor=m.value;else return void wrongInput(n);let b=isNaN(parseFloat(p.value)),c=isNaN(parseFloat(q.value))||360<Math.abs(parseFloat(q.value)),e=Math.abs(parseFloat200(r.value))>z,f=Math.abs(parseFloat200(s.value))>z;if(!e&&!f&&!b&&!c)g.initPeriod=parseFloat(p.value),g.initSemiX=parseFloat(r.value),g.initSemiY=parseFloat(s.value),g.initRotate=parseFloat(q.value),p.value=parseFloat(p.value),r.value=parseFloat(r.value),s.value=parseFloat(s.value),q.value=parseFloat(q.value);else return e&&wrongInput(r),f&&wrongInput(s),b&&wrongInput(p),void(c&&wrongInput(q));t.value||(t.value=0),u.value||(u.value=0),v.value||(v.value=0),w.value||(w.value=0);let i=isNaN(parseFloat(t.value)),k=isNaN(parseFloat(w.value))||360<Math.abs(parseFloat(w.value)),l=Math.abs(parseFloat200(u.value))>z,o=Math.abs(parseFloat200(v.value))>z;if(!l&&!o&&!i&&!k){var y=parseFloat(t.value);g.period=a=>g.initPeriod+a*y;var C=parseFloat(u.value);g.semiX=a=>g.initSemiX+a*C;var D=parseFloat(v.value);g.semiY=a=>g.initSemiY+a*D;var E=parseFloat(w.value);g.rotate=a=>g.initRotate+a*E,t.value=y,u.value=C,v.value=D,w.value=E}else return l&&wrongInput(u),o&&wrongInput(v),i&&wrongInput(t),void(k&&wrongInput(w));const F=A/1e3;clearTimeout(B),g.offset-=g.omega(F)*F,A=0,B=setTimeout(d,intervals),x.value="Change!"}),y.addEventListener("click",()=>{clearTimeout(B),g=null,b(null,!1),g=new Block,x.value="Go!",k.value=null,l.value=null});var F=a=>{a=a||window.event,a.preventDefault(),D=(a.clientX||a.touches[0].clientX)-h.offsetLeft,E=(a.clientY||a.touches[0].clientY)-h.offsetTop,C=!0},G=a=>{if(C){a=a||window.event,a.preventDefault();let b=parseFloat(h.style.width),d=(a.clientX||a.touches[0].clientX)-D,e=(a.clientY||a.touches[0].clientY)-E;if(c(d,e,b))return;h.style.left=floatToPx(d),h.style.top=floatToPx(e),k.value=d,l.value=e,j.style.left=floatToPx(d);let i=d-parseFloat(origin.style.left),m=e-parseFloat(origin.style.top),n=Math.sqrt(i**2+m**2);r.value=n,s.value=n,g.offset=-Math.atan2(m,i),f(n,n,0)}},H=()=>{C=!1,D=0,E=0};"onmousedown"in document.documentElement&&(h.addEventListener("mousedown",F),container.addEventListener("mousemove",G),container.addEventListener("mouseup",H)),"ontouchstart"in document.documentElement&&(h.addEventListener("touchstart",F),container.addEventListener("touchmove",G),container.addEventListener("touchend",H))}const setFpsText=document.querySelector(".shared-info-container-bo > span:nth-child(2)");document.querySelector(".shared-info-container-bo .fps-decrease").addEventListener("click",()=>{let a=parseInt(setFpsText.innerText);return 5>=a?void(setFpsText.innerText=5):void(intervals=parseInt(1e3/a),setFpsText.innerText=a-(40<=a?10:5))}),document.querySelector(".shared-info-container-bo .fps-increase").addEventListener("click",()=>{let a=parseInt(setFpsText.innerText);return 150<=a?void(setFpsText.innerText=150):void(intervals=parseInt(1e3/a),setFpsText.innerText=a+(40<=a?10:5))});const grandContainer=document.querySelector(".grand-container"),infoContainer1=document.querySelector("#info-container-1"),movingObj1=document.querySelector("#moving-obj-1"),movingObjTrajectory1=document.querySelector("#moving-obj-trajectory-1"),objManageNode=document.querySelector(".obj-manage"),movingObjProjection1=document.querySelector("#moving-obj-prj-1"),oneClickGoBtn=document.querySelector(".obj-manage .objs-oneclick-go"),oneClickResetBtn=document.querySelector(".obj-manage .objs-oneclick-reset"),oneClickBtnsSeparator=document.querySelector(".obj-manage br");oneClickGoBtn.style.display="none",oneClickResetBtn.style.display="none",oneClickBtnsSeparator.style.display="none";var prevObjSelect=[],nextObjSelect=[],nextBtnHandlers=[],circular1=new BlockInMotion("1"),CircularsCount=1,Circulars=[];document.querySelector(".obj-manage .append-objs").addEventListener("click",()=>{if(6<=CircularsCount)return;++CircularsCount;var a=infoContainer1.cloneNode(!0);a.id=`info-container-${CircularsCount}`,a.children[0].children[1].innerText=`Block ${CircularsCount}`,a.style.display="none",grandContainer.insertBefore(a,container);var b=movingObj1.cloneNode(!0);b.id=`moving-obj-${CircularsCount}`,container.appendChild(b);var c=movingObjTrajectory1.cloneNode(!0);c.id=`moving-obj-trajectory-${CircularsCount}`,container.insertBefore(c,origin);var d=movingObjProjection1.cloneNode();d.id=`moving-obj-prj-${CircularsCount}`;var e=document.createElement("div");e.setAttribute("class","projections"),e.appendChild(d),grandContainer.insertBefore(e,objManageNode);var f=new BlockInMotion(CircularsCount);document.querySelector(`#info-container-${CircularsCount} .set-color`).value=`rgba(${Math.floor(256*Math.random())},${Math.floor(256*Math.random())},${Math.floor(256*Math.random())},1)`,Circulars.push(f),2==CircularsCount&&(oneClickGoBtn.style.display="",oneClickResetBtn.style.display="",oneClickBtnsSeparator.style.display="");const g=CircularsCount;document.querySelector(`#info-container-${g} .switch-obj-prev`).addEventListener("click",()=>{document.querySelector(`#info-container-${g}`).style.display="none",document.querySelector(`#info-container-${g-1}`).style.display="grid"}),nextBtnHandlers.push(()=>{document.querySelector(`#info-container-${g-1}`).style.display="none",document.querySelector(`#info-container-${g}`).style.display="grid"}),document.querySelector(`#info-container-${g-1} .switch-obj-next`).addEventListener("click",nextBtnHandlers[g-2])}),document.querySelector(".obj-manage .delete-objs").addEventListener("click",()=>{if(1>=CircularsCount)return;delete Circulars[Circulars.length-1],Circulars.pop();const a=document.querySelector(`#info-container-${CircularsCount}`),b=document.querySelector(`#info-container-${CircularsCount-1}`),c="none"!=a.style.display;a.remove(),document.querySelector(`#moving-obj-${CircularsCount}`).remove(),document.querySelector(`#moving-obj-trajectory-${CircularsCount}`).remove(),document.querySelector(`#moving-obj-prj-${CircularsCount}`).parentNode.remove(),document.querySelector(`#info-container-${CircularsCount-1} .switch-obj-next`).removeEventListener("click",nextBtnHandlers.pop()),c&&(b.style.display="grid"),1==--CircularsCount&&(oneClickGoBtn.style.display="none",oneClickResetBtn.style.display="none",oneClickBtnsSeparator.style.display="none")}),document.querySelector(".obj-manage .objs-oneclick-go").addEventListener("click",()=>{var a=document.querySelectorAll(".info-container .set-attr-go");for(each of a)each.click()}),document.querySelector(".obj-manage .objs-oneclick-reset").addEventListener("click",()=>{var a=document.querySelectorAll(".info-container .set-attr-reset");for(each of a)each.click()});const samplesClickDisplay=document.querySelector(".samples-display > h5");let samplesShown=!1;samplesClickDisplay.addEventListener("click",()=>{if(!samplesShown){let a=["./assets/uniformcircular1.gif","./assets/uniformcircular2.gif","./assets/uniformcircular3.gif","./assets/uniformcircular4.gif"];for(url of a){let a=document.createElement("img");a.src=url,document.querySelector(".samples-display").appendChild(a)}}else for(each of document.querySelectorAll(".samples-display img"))each.remove();samplesShown=!samplesShown});