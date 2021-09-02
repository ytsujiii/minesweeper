(this.webpackJsonpminesweeper=this.webpackJsonpminesweeper||[]).push([[0],{51:function(e,t,r){},58:function(e,t,r){"use strict";r.r(t);var n,c=r(0),o=r.n(c),a=r(5),i=r.n(a),u=(r(51),r(14)),d=r(80),l=r(85),s=r(82),b=r(87),f=r(88),h=r(86),m=r(34);!function(e){e[e.zero=0]="zero",e[e.one=1]="one",e[e.two=2]="two",e[e.three=3]="three",e[e.four=4]="four",e[e.five=5]="five",e[e.six=6]="six",e[e.seven=7]="seven",e[e.eight=8]="eight",e[e.hidden=9]="hidden",e[e.bomb=10]="bomb",e[e.flagged=11]="flagged",e[e.bombHidden=12]="bombHidden",e[e.bombFlagged=13]="bombFlagged",e[e.bombExploded=14]="bombExploded",e[e.flaggedIncorrect=15]="flaggedIncorrect"}(n||(n={}));var g=function(e){switch(e){case n.zero:return" ";case n.one:return"1";case n.two:return"2";case n.three:return"3";case n.four:return"4";case n.five:return"5";case n.six:return"6";case n.seven:return"7";case n.eight:return"8";case n.hidden:return" ";case n.bomb:return"B";case n.flagged:return"F";case n.bombHidden:return" ";case n.bombFlagged:return"F";case n.bombExploded:return"B";case n.flaggedIncorrect:return"F";default:return" "}},x=function(e){return e!==n.hidden&&e!==n.bombHidden&&e!==n.flagged&&e!==n.bombFlagged&&e!==n.bomb&&e!==n.flaggedIncorrect},j=r(3),p=r(4),y=Object(d.a)({square:{width:"23px",height:"23px",border:"1px solid black",display:"flex",justifyContent:"center",alignItems:"center"},opened:{backgroundColor:"#DDDDDD"},bombExploded:{backgroundColor:"red"},flaggedIncorrect:{color:"#0000FF"}});function O(e){var t=y(),r=e.state,c=e.onLeftClick,o=e.onRightClick;return Object(p.jsx)("div",{className:Object(j.a)(t.square,x(r)&&t.opened,r===n.bombExploded&&t.bombExploded,r===n.flaggedIncorrect&&t.flaggedIncorrect),onClick:c,onContextMenu:o,children:g(r)})}var v,C,w=r(84),k=function(e,t){return{y:e,x:t}};!function(e){e[e.completed=0]="completed",e[e.exploded=1]="exploded"}(v||(v={})),function(e){e[e.normal=0]="normal",e[e.expert=1]="expert"}(C||(C={}));var A=function(e){switch(e){case C.normal:return{width:16,height:16,bombCount:40};case C.expert:return{width:30,height:16,bombCount:99}}},E=Object(d.a)({row:{display:"flex"},messagesRow:{display:"flex"},finishMessage:{display:"flex",alignItems:"center",marginLeft:"20px"}});function F(e){var t=E(),r=e.field,o=Object(c.useState)(null),a=Object(u.a)(o,2),i=a[0],d=a[1],l=Object(c.useState)(!1),b=Object(u.a)(l,2),f=b[0],h=b[1],g=Object(c.useState)(0),j=Object(u.a)(g,2),y=j[0],C=j[1],A=Object(c.useState)(null),F=Object(u.a)(A,2),I=F[0],H=F[1],S=Object(c.useState)(null),D=Object(u.a)(S,2),M=D[0],N=D[1],z=Object(c.useCallback)((function(e,t){if(M&&f){if(!I)return G(t),void H(t);var r;if(!x(M[t.y][t.x])&&(r=M[t.y][t.x])!==n.flagged&&r!==n.bombFlagged)J(t,M)}}),[M,f]),B=Object(c.useCallback)((function(e,t){e.preventDefault(),f&&I&&R(t)}),[f,I]),R=Object(c.useCallback)((function(e){if(M){var t=M.slice();M[e.y][e.x]===n.hidden?t[e.y][e.x]=n.flagged:M[e.y][e.x]===n.bombHidden?t[e.y][e.x]=n.bombFlagged:M[e.y][e.x]===n.flagged?t[e.y][e.x]=n.hidden:M[e.y][e.x]===n.bombFlagged&&(t[e.y][e.x]=n.bombHidden),N(t)}}),[M]),L=function(e){return 0<=e.y&&e.y<r.height&&0<=e.x&&e.x<r.width},q=Object(c.useCallback)((function(e){if(!M)return 0;var t=0;return[-1,0,1].forEach((function(r){[-1,0,1].forEach((function(c){if(0!==r||0!==c){var o=k(e.y+r,e.x+c);L(o)&&(M[e.y+r][e.x+c]!==n.bombHidden&&M[e.y+r][e.x+c]!==n.bombFlagged||t++)}}))})),t}),[M]),J=Object(c.useCallback)((function(e,t){var r=0;!function e(t,c){if(c[t.y][t.x]===n.bombHidden)return c[t.y][t.x]=n.bombExploded,void K(v.exploded);if(c[t.y][t.x]===n.hidden){r++;var o=q(t);c[t.y][t.x]=function(e){switch(e){case 0:return n.zero;case 1:return n.one;case 2:return n.two;case 3:return n.three;case 4:return n.four;case 5:return n.five;case 6:return n.six;case 7:return n.seven;case 8:return n.eight;default:return n.hidden}}(o),0===o&&[-1,0,1].forEach((function(r){[-1,0,1].forEach((function(o){if(0!==r||0!==o){var a=k(t.y+r,t.x+o);L(a)&&c[t.y+r][t.x+o]===n.hidden&&e(a,c)}}))}))}}(e,t),C(y-r),N(Object(m.a)(t))}),[M,q,y]),T=Object(c.useCallback)((function(){var e=Array.from(Array(r.height),(function(){return Array.from(Array(r.width),(function(){return n.hidden}))}));N(e),C(r.width*r.height-r.bombCount),H(null),h(!0),d(null)}),[r]),G=Object(c.useCallback)((function(e){var t=Array.from(Array(r.height),(function(){return Array.from(Array(r.width),(function(){return n.hidden}))})),c=Array.from(Array(r.height*r.width),(function(e,t){return t})).filter((function(t,n){return n!==r.height*e.y+e.x}));Object(m.a)(Array(r.bombCount)).forEach((function(){var e=c.splice(Math.random()*c.length,1)[0];t[Math.floor(e/r.width)][e%r.width]=n.bombHidden})),N(t)}),[r]),K=Object(c.useCallback)((function(e){if(M){var t=M.slice();Array.from(Array(r.height),(function(e,t){return t})).forEach((function(c){Array.from(Array(r.width),(function(e,t){return t})).forEach((function(r){t[c][r]===n.bombHidden?t[c][r]=e===v.completed?n.bombFlagged:n.bomb:t[c][r]===n.flagged&&(t[c][r]=n.flaggedIncorrect)}))})),e===v.exploded?d("Boooooom!"):e===v.completed&&d("Completed!"),N(t),h(!1)}}),[M]);return Object(c.useEffect)((function(){T()}),[r]),Object(c.useEffect)((function(){I&&M&&J(I,M)}),[I]),Object(c.useEffect)((function(){0===y&&K(v.completed)}),[y]),Object(p.jsxs)("div",{className:"App",children:[Object(p.jsx)(s.a,{onClick:T,color:"primary",variant:"contained",children:"Start"}),Object(p.jsxs)("div",{className:t.messagesRow,children:[Object(p.jsxs)(w.a,{children:["Blocks remaining: ",y]}),Object(p.jsx)("div",{className:t.finishMessage,children:i})]}),M&&Array.from(Array(r.height)).map((function(e,n){return Object(p.jsx)("div",{className:t.row,children:Array.from(Array(r.width)).map((function(e,t){return Object(p.jsx)(O,{state:M[n][t],onLeftClick:function(e){return z(e,k(n,t))},onRightClick:function(e){return B(e,k(n,t))}},t)}))},n)}))]})}var I=Object(d.a)({mainContainer:{marginTop:"40px",display:"flex",justifyContent:"center"}});function H(){var e=I(),t=Object(c.useState)(null),r=Object(u.a)(t,2),n=r[0],o=r[1],a=Object(c.useState)(A(C.normal)),i=Object(u.a)(a,2),d=i[0],m=i[1],g=Object(c.useCallback)((function(e){o(null),m(A(e))}),[]);return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsxs)(l.a,{position:"static",color:"default",children:[Object(p.jsx)(s.a,{"aria-controls":"simple-menu","aria-haspopup":"true",onClick:function(e){o(e.currentTarget)},children:"Difficulty"}),Object(p.jsxs)(b.a,{id:"difficulty-menu",keepMounted:!0,anchorEl:n,open:Boolean(n),anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:[Object(p.jsx)(f.a,{onClick:function(){return g(C.normal)},children:"Normal"}),Object(p.jsx)(f.a,{onClick:function(){return g(C.expert)},children:"Expert"})]})]}),Object(p.jsx)(h.a,{className:e.mainContainer,children:Object(p.jsx)(F,{field:d})})]})}i.a.render(Object(p.jsx)(o.a.StrictMode,{children:Object(p.jsx)(H,{})}),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.3ae35fd9.chunk.js.map