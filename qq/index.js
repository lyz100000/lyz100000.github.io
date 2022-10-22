<script>

var maxDoubleHit=localStorage.getItem('eliminateCount')||0

var currentDoubleHit=0

var bnElements=[];//存放所有气球

var random=Math.random;//随机函数

var wW=window.innerWidth;//窗口宽度

var wH=window.innerHeight;//窗口高度

var ballW=160;//气球的宽度

var ballH=300;//气球的宽度

var minSpeed=3;//最小速度，每次向上移动至少3px

var speedNum=8;//速度的定量

var defBnNumber=8;//初始化气球

var moveTimer;

var isEnd=false;

var jindex=1;

var ballDiv=document.getElementById('ballDiv');

//初始化

init(defBnNumber);

//移动

move();

//绑定单击事件

bindClick();

//游戏信息

document.getElementById('maxDoubleHit').innerText=maxDoubleHit

function record(){

if(isEnd){

clearTimeout(moveTimer);

bnElements=[];

document.getElementById('gamemsg').style.display='block';

document.getElementById('gameinfo').style='transform: translateZ(360px);position: fixed;top:0;left:0;z-index:999';

}

else{

init(1);

document.getElementById('currentDoubleHit').innerText=++currentDoubleHit;

if(currentDoubleHit>maxDoubleHit){

document.getElementById('maxDoubleHit').innerText=currentDoubleHit;

localStorage.setItem('eliminateCount',currentDoubleHit)

}

}

}

//初始化气球

function init(num){

//创建一个虚拟文档节点

var docFragment=document.createDocumentFragment();

for(var i=0;i<num;i++){

var bnElement=document.createElement('div');

bnElement.className='balloon';

//速度随机，限定最小值

var speed=Math.max(minSpeed,~~(random()*speedNum));

bnElement.setAttribute('speed',speed);//~~取整 移动速度

bnElement.setAttribute('id','ball-'+jindex++);

//分散排列

var x=(~~(random()*wW))-ballW;

x=Math.max(0,x);

bnElement.style.left=x+'px';

bnElement.style.top=wH+'px';//露一点出来

//1.先将创建的气球放入创建的虚拟文档节点

docFragment.appendChild(bnElement);

bnElements.push(bnElement);

}

//2.将虚拟文档节点添加到body中

ballDiv.appendChild(docFragment);

}

function move(){

var bl=bnElements.length

for(var i=0;i<bl;i++){

var currentElement=bnElements[i]

if(currentElement==null){

continue;

}

var offsetTop=currentElement.offsetTop;

if(offsetTop>0){//窗口中

var speed=currentElement.getAttribute('speed');

currentElement.style.top=offsetTop-speed+'px'

}

else{

//移除dom节点

//ballDiv.removeChild(currentElement);

//移除数组中

//bnElements.splice(i,1);

//init(1);

isEnd=true;

record();

}

}

moveTimer=setTimeout(move,1000/30);

}

function bindClick(){

ballDiv.addEventListener('click',clickFunc,false);

function clickFunc(e){

if(!isEnd && e.target.className=='balloon'){

boom.call(e.target,function(){

record();

});

}

}

}

function boom(callback){

//var that=this; //替换了上下文，但是没有使用this的意义.

var speed=this.getAttribute('speed');

this.timer=setInterval(function(){

this.style.opacity=0.1*(speed--)

if(speed<1){

if(this.parentNode){

this.parentNode.removeChild(this);

bnElements.splice(bnElements.lastIndexOf(this),1);

callback&&callback();

}

clearInterval(this.timer);

}

}.bind(this),30);

}

</script>