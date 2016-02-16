function game(){
	this.clientW=document.documentElement.clientWidth;
	this.clientH=document.documentElement.clientHeight;
	this.letterArr=["A","B","C","D","E","F","G","H","I","G","K","L","M","N","O","P","Q","R","S","T"];
	this.letterLen=5;
	this.speed=5;
	this.spans=[];
	this.currArr=[];
	this.currPosArr=[];
	this.die=10;
	this.score=0;
	this.currScore=0;
	this.num=10;
	this.scoreEle=document.getElementsByClassName("scoreNum")[0];
	this.dieEle=document.getElementsByClassName("dieNum")[0];
	this.step=10;
	this.aa=1;
}
game.prototype={
	play:function(){
		// 将字母显示到body里
		this.getLetter(this.letterLen);
		this.move();
		this.key();
	},
	key:function(){
		var that=this;
		document.onkeydown=function(e){
			var ev=e||window.event;    //处理兼容性问题
			var code=String.fromCharCode(ev.keyCode);
			for(var i=0;i<that.spans.length;i++){			
				// if(that.spans[i].innerHTML==code){
				if(that.spans[i].getAttribute("data")==code){
					document.body.removeChild(that.spans[i]);
					that.spans.splice(i,1);
					that.currArr.splice(i,1);
					that.currPosArr.splice(i,1);
					that.getLetter(1);
					that.score++;
					that.currScore++;
					that.scoreEle.innerHTML=that.score;
					if(that.currScore%that.step==0){
						that.aa++;
						if(that.aa==6){
							that.aa=1;
						}
						that.die++;
						clearInterval(that.t);
						document.getElementsByClassName("win")[0].style.display="block";
						document.getElementsByClassName("nth-num")[0].innerHTML="第"+that.aa+"关";
						setTimeout(function(){
							document.getElementsByClassName("win")[0].style.display="none";
						},2000);
						document.getElementsByClassName("tips")[0].innerHTML="<img src='images/"+that.aa+".svg'/>";
						that.next();
						 //alert("第"+that.aa+"关");
						 //that.next();
					}
					break;
				}
			}
		}
	},
	next:function(){
        clearInterval(this.t);
        for(var i=0;i<this.spans.length;i++){
            document.body.removeChild(this.spans[i]);
        }
        this.spans=[];
        this.currArr=[];
        this.currPosArr=[];

        this.speed++;
        console.log(this.speed);
        if(this.speed==10){
            this.speed=5;
        }

        this.letterLen++;
        this.currScore=0;
        this.num+=10;
        this.play();
	},
	move:function(){
		var that=this;
		this.t=setInterval(function(){
			for(var i=0;i<that.spans.length;i++){
				var top=that.spans[i].offsetTop+that.speed;
				that.spans[i].style.top=top+"px";
				if(top>that.clientH){
					document.body.removeChild(that.spans[i]);
					that.spans.splice(i,1);
					that.currArr.splice(i,1);
					that.currPosArr.splice(i,1);
					that.getLetter(1);
					that.die--;
					that.dieEle.innerHTML=that.die;
					if(that.die==0){
						clearInterval(that.t);
						document.getElementsByClassName("dieNum")[0].style.color="red";
						document.getElementsByClassName("fail")[0].style.display="block";

                        //失败时不能暂停、继续？（）
                        //if(document.getElementsByClassName("fail")[0].style.display=="block"){
                        //    document.getElementsByClassName("pauseBtn")[0].onclick=null;
                        //    document.getElementsByClassName("continueBtn")[0].onclick=null;
                        //}
                        //-----------------------------------------------------------------


						document.onkeydown=null;
						document.getElementsByClassName("replay")[0].onclick=function(){
							that.restart();
							document.getElementsByClassName("fail")[0].style.display="none";
						}
						 //alert("game over");
						 //that.restart();
					}
				}
			}
		},60);
	},
	restart:function(){
		clearInterval(this.t);
		for(var i=0;i<this.spans.length;i++){
			document.body.removeChild(this.spans[i]);
		}

		this.spans=[];
		this.currArr=[];
		this.currPosArr=[];
		this.die=10;
		this.speed=5;
		this.letterLen=5;
        this.score=0;
		this.currScore=0;
		this.num=10;
        this.aa=0;
        this.arr=[];
        document.getElementsByClassName("scoreNum")[0].innerHTML=0;
        document.getElementsByClassName("dieNum")[0].innerHTML=10;
        document.getElementsByClassName("dieNum")[0].style.color="white";
        document.getElementsByClassName("tips")[0].innerHTML="<img src='images/1.svg'/>";
        this.play();
	},
	getLetter:function(num){
		// 先获取到指定的字母
		var arr=this.getRand(num);
		var posxArr=[];
		var eleArr=[];
		for(var i=0;i<arr.length;i++){
			var span=document.createElement("span");
			// span.innerHTML=arr[i];

			var x=100+(this.clientW-200)*Math.random();
			var y=100*Math.random();
			var width=100;
            //防止字母在水平方向重叠在一起
            //while(this.check1(this.currPosArr,x,width)){
				//x=100+(this.clientW-200)*Math.random();
            //}
			posxArr.push({minx:x,maxx:x+width});
			this.currPosArr.push({minx:x,maxx:x+width});
			span.style.cssText="width:"+width+";height:100px;display:block;background:url('images/"+arr[i]+".svg');background-size:cover;position:absolute;left:"+x+";top:"+y+";right:0;bottom:0;";
			span.setAttribute("data",arr[i]);
			document.body.appendChild(span);
			this.spans.push(span);
		}
	},
	check1:function(arr,x,width){
		for(var i=0;i<arr.length;i++){
			if(!(x+width<arr[i].minx || arr[i].maxx+width<x)){
				return true;
			}
		}
		return false;
	},
	getRand:function(num){
		var arr=[];
		for(var i=0;i<num;i++){
			var rand=Math.floor(this.letterArr.length*Math.random());
		    while(this.check(this.currArr,this.letterArr[rand])){
		    	rand=Math.floor(this.letterArr.length*Math.random());
		    }
		    arr.push(this.letterArr[rand]);
		    this.currArr.push(this.letterArr[rand]);
		}
		return arr;
	},
	check:function(arr,val){
		for(var i=0;i<arr.length;i++){
			if(arr[i]==val){
				return true;
			}
		}
		return false;
	}
}