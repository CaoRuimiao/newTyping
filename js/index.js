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
    this.scoreEle=document.getElementsByClassName("score")[0].getElementsByTagName("span")[1];
    this.dieEle=document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
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
            var code=String.fromCharCode(ev.keyCode);console.log(code);
            for(var i=0;i<that.spans.length;i++){		console.log(code,that.spans[i]);
                //if(that.spans[i].innerHTML==code){
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
                        that.die++;
                        alert("第"+that.aa+"关");
                        that.next();
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
        if(this.speed==15){
            this.speed=5;
        }
        this.letterLen++;
        this.play();
        this.currScore=0;
        this.num+=10;
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
                        alert("game over");
                        that.restart();
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
        this.speed=5;
        this.letterLen=3;
        this.currScore=0;
        this.num+=10;
        this.play();
    },
    getLetter:function(num){
        // 先获取到指定的字母
        var arr=this.getRand(num);
        var posxArr=[];
        // var posyArr=[];
        var eleArr=[];
        for(var i=0;i<arr.length;i++){
            var span=document.createElement("span");
            //span.innerHTML=arr[i];

            var x=100+(this.clientW-200)*Math.random();
            var y=100*Math.random();
            var width=100,height=100;
            while(this.check1(this.currPosArr,x,width)){
                x=100+(this.clientW-200)*Math.random();
            }
            // while(this.check2(posyArr,y,height)){
            // 	y=100*Math.random();
            // }
            posxArr.push({minx:x,maxx:x+width});
            this.currPosArr.push({minx:x,maxx:x+width});
            span.style.cssText="width:"+width+";height:100px;display:block;background:url('images/"+arr[i]+".svg');background-size:cover;position:absolute;left:"+x+";top:"+y+";right:0;bottom:0;";
            span.setAttribute("data",arr[i]);
            document.body.appendChild(span);
            this.spans.push(span);
        }
        // return span;
        // console.log(arr);
    },
    check1:function(arr,x,width){
        for(var i=0;i<arr.length;i++){
            if(!(x+width<arr[i].minx || arr[i].maxx+width<x)){
                return true;
            }
        }
        return false;
    },
    // check2:function(arr,y,height){
    // 	for(var i=0;i<arr.length;i++){
    // 		if(!(y+height<arr[i].miny || arr[i].maxy+height<y)){
    // 			return true;
    // 		}
    // 	}
    // 	return false;
    // },
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

//function game(){
//    this.clientw = document.documentElement.clientWidth;
//    this.clientH = document.documentElement.clientHeight;
//    this.wordArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
//    this.wordNum = 5;
//    this.speed = 5;
//    this.spans = [];
//    this.currArr = [];
//    this.currPosArr = [];
//    this.die = 10;
//    this.score = 0;
//    this.currScore = 0;
//    this.currNum = 10;
//    this.preNum = 0;
//    this.scoreEle = document.getElementsByClassName("score")[0].getElementsByTagName("span")[1];
//    this.dieEle = document.getElementsByClassName("die")[0].getElementsByTagName("span")[1];
//
//    this.gameOver = document.getElementsByClassName("default")[0];
//    this.yes = document.getElementsByClassName("yes")[0];
//    this.no = document.getElementsByClassName("no")[0];
//    this.close = document.getElementsByClassName("close")[0];
//    this.playUI = document.getElementsByClassName("play")[0];
//    this.guanka = document.getElementsByClassName("guanka")[0];
//    this.guankaW = document.getElementsByClassName("guanka")[0].getElementsByTagName("span")[0];
//    this.sure = document.getElementsByClassName("sure")[0];
//    //this.selectButton = document.getElementsByClassName("select-button")[0];
//
//    this.level = 1;
//}
//game.prototype={
//    play:function(){
//        //将字母显示到body里面
//        this.getword(this.wordNum);
//        this.move();
//        this.key();
//    },
//    key:function(){
//        var that = this;
//        document.onkeydown = function(e){
//            var ev = e||window.event;
//            var code = String.fromCharCode(ev.keyCode);
//            for(var i = 0;i<that.spans.length;i++){
//                if(code == that.spans[i].innerHTML){
//                    document.body.removeChild(that.spans[i]);
//                    that.spans.splice(i,1);
//                    that.getword(1);
//                    that.currArr.splice(i,1);
//                    that.currPosArr.splice(i,1);
//
//                    that.score++;
//                    that.currScore++;
//
//                    that.scoreEle.innerHTML = that.score;
//                    if(that.currScore == that.currNum+that.preNum && that.die!==0){
//                        that.level++;
//                        that.guankaW.innerHTML = that.level;
//                        that.guanka.style.display="block";
//                        clearInterval(that.timerId);
//                        that.sure.onclick = function(){
//                            that.guanka.style.display="none";
//                            that.next();
//                        }
//                    }
//                }
//            }
//        }
//    },
//    next:function(){
//        clearInterval(this.timerId);
//        for(var i = 0;i<this.spans.length;i++){
//            document.body.removeChild(this.spans[i]);
//        }
//        this.spans = [];
//        this.currArr = [];
//        this.currPosArr = [];
//
//        this.preNum = this.currNum;
//        this.currNum += 10;
//
//        this.speed++;
//        this.wordNum++;
//        this.play();
//    },
//    move:function(){
//        var that = this;
//        this.timerId = setInterval(function(){
//            for(var i = 0;i<that.spans.length;i++){
//                var top = that.spans[i].offsetTop+that.speed;
//                that.spans[i].style.top = top+"px";
//                if(top>that.clientH){
//                    document.body.removeChild(that.spans[i]);
//                    that.spans.splice(i,1);
//                    that.currArr.splice(i,1);
//                    that.currPosArr.splice(i,1);
//                    that.getword(1);
//                    that.die--;
//                    that.dieEle.innerHTML = that.die;
//                    if(that.die == 0){
//                        that.gameOver.style.display="block";
//                        clearInterval(that.timerId);
//                        that.close.onclick=function(){
//                            that.restart();
//                            that.gameOver.style.display="none";
//                            that.playUI.style.display="block";
//                        }
//                        that.no.onclick=function(){
//                            that.restart();
//                            that.gameOver.style.display="none";
//                            that.play();
//                        }
//                        that.yes.onclick=function(){
//                            that.restart();
//                            that.gameOver.style.display="none";
//                            that.playUI.style.display="block";
//
//                        }
//                    }
//                }
//            }
//        },60);
//    },
//    restart:function(){
//        clearInterval(this.timerId);
//        for(var i = 0;i<this.spans.length;i++){
//            document.body.removeChild(this.spans[i]);
//        }
//        this.spans = [];
//        this.currArr = [];
//        this.currPosArr = [];
//        this.score = 0;
//        this.currScore = 0;
//        this.currNum = 10;
//        this.speed = 5;
//        this.wordNum = 5;
//        this.die = 10;
//
//        this.scoreEle.innerHTML = 0;
//        this.dieEle.innerHTML = 10;
//    },
//    getword:function(num){
//        //先获取到指定的字母
//        var arr = this.getRand(num);
//        // console.log(arr);
//        var positionArr = [];
//        for(var i = 0;i<arr.length;i++){
//            var span = document.createElement("span");
//            span.innerHTML = arr[i];
//
//            var x = 100+(this.clientw-200)*Math.random();
//            var y = 100*Math.random();
//            var width = 60;
//            var height = 60;
//            while(this.check1(this.currPosArr,x,width)){
//                x = 100+(this.clientw-200)*Math.random();
//            }
//            positionArr.push({minx:x,maxx:x+width});
//            this.currPosArr.push({minx:x,maxx:x+width} );
//            span.style.cssText="width:"+width+"px;height:"+height+"px;position:absolute;left:"+x+"px;top:"+y+"px;color:#fff;font-size:0px;background:url(images/"+arr[i]+".png) no-repeat;";
//            document.body.appendChild(span);
//            this.spans.push(span);
//            // console.log(this.spans);
//        }
//    },
//    check1:function(arr,x,width){
//        for(var i = 0;i<arr.length;i++){
//            if(!(x+width<arr[i].minx || x>arr[i].maxx+width)){
//                return true;
//            }
//        }
//        return false;
//    },
//    getRand:function(num){
//        var arr = [];
//        for(var i = 0;i<num;i++){
//            var rand = Math.floor(Math.random()*(this.wordArr.length));
//            while(this.check(this.currArr,this.wordArr[rand])){
//                rand = Math.floor(Math.random()*(this.wordArr.length));
//            }
//            arr.push(this.wordArr[rand]);
//            this.currArr.push(this.wordArr[rand]);
//        }
//        return arr;
//    },
//    check:function(arr,val){
//        for(var i = 0;i<arr.length;i++){
//            if(arr[i] == val){
//                return true;
//            }
//        }
//        return false;
//    }
//}



