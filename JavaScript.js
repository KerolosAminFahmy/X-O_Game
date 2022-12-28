let AllButton=document.querySelectorAll(".bodyGame div");
var Player="X";
var canvas=document.getElementById("confeti");;
var IsTwoPlayer=false;
var CounterX=0,CounterO=0,CounterD=0;
var TurnPlayerGame=document.getElementById("TurnPlayer1");
var WinnerMessage=document.getElementById("WinPlayer");
var LostMessage=document.getElementById("LostPlayer");
var optionMessage=document.getElementById("option");
var board=[[' ',' ',' '],[' ',' ',' '],[' ',' ' ,' ']]
  AllButton.forEach(function(ele){
    ele.addEventListener("click",()=>{
      if(ele.firstElementChild.classList.contains("Finish")){
        alert("Please Select Empty Area");
      }else{
        TrunPlayer(ele);
        if(!IsTwoPlayer){
          MaxMin(board,100,false);
        }
        
        }
    })
  })
  
  function TrunPlayer(ele){
      if(Player=="X"){
        let demin=ele.firstElementChild.getAttribute("de");
        board[parseInt(demin[0])][parseInt(demin[1])]="X";
        ele.firstElementChild.innerHTML="X";
        ele.firstElementChild.style.color="darksalmon";
        ele.firstElementChild.classList.add("Finish");
        if(IsTwoPlayer){
          Player="O";
          TurnPlayerGame.innerHTML =Player;
        }else{
          TurnPlayerGame.innerHTML ="O";
        }
      }else if(Player=="O" && IsTwoPlayer){
        let demin=ele.firstElementChild.getAttribute("de");
        board[parseInt(demin[0])][parseInt(demin[1])]="O";
        ele.firstElementChild.innerHTML="O";
        ele.firstElementChild.style.color="aquamarine";
        ele.firstElementChild.classList.add("Finish");
        Player="X"
        TurnPlayerGame.innerHTML =Player;
      }
      let result =checkWinner(board);
      setTimeout(()=>{
        if(result==2){
          canvas.classList.remove("InActive");
          WinnerMessage.classList.add("slideDown");
          WinnerMessage.firstElementChild.innerHTML="Player With X won!";
          CounterX++;
          player="X";
          TurnPlayerGame.innerHTML =Player;
      }else if(result==-2){
        if(IsTwoPlayer){
          canvas.classList.remove("InActive");
        }
        WinnerMessage.classList.add("slideDown");
        WinnerMessage.firstElementChild.innerHTML="Player With O won!";
        CounterO++;
        player="X";
        TurnPlayerGame.innerHTML =Player;
      }else if(result==0){
        WinnerMessage.classList.add("slideDown");
        WinnerMessage.firstElementChild.innerHTML="It's Draw!";
        CounterD++;
        player="X";
        TurnPlayerGame.innerHTML =Player;
      }},100)
      
  }


/*Play With Computer Using Algorithm MaxMin */
function haveTheSameValueAndNotEmpty( x,  y,  z) {
  if(x == y && x == z && x != ' ') {
      return true;
  }
  return false;
}
function checkWinner(board) {
  //  2: X winner
  // -2: O winner
  //  0: Tie
  //  1: No winner

  // For rows
  for(let i = 0; i < 3; i++) {
      if(haveTheSameValueAndNotEmpty(board[i][0], board[i][1], board[i][2])) {
        return board[i][0] == 'X' ? 2 : -2;
      }
  }

  // For cols
  for(let i = 0; i < 3; i++) {
      if(haveTheSameValueAndNotEmpty(board[0][i], board[1][i], board[2][i])) {
          return board[0][i] == 'X' ? 2 : -2;
      }
  }
  
  // Diameter 1
  if(haveTheSameValueAndNotEmpty(board[0][0], board[1][1], board[2][2])) {
      return board[0][0] == 'X' ? 2 : -2;
  }

  // Diameter 2
  if(haveTheSameValueAndNotEmpty(board[2][0], board[1][1], board[0][2])) {
      return board[2][0] == 'X' ? 2 : -2;
  }

  // For Tie Case
  let tie = true;
  for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
          if(board[i][j] == ' ') {
              tie = false;
          }
      }   
  }
  if(tie) return 0;

  // Else
  return 1;
}
function MaxMin(board,Depth,isMaximizing,firstTime = true){
  var Result = checkWinner(board);
  if(Depth ==0||Result !=1){
    return Result;
  }
  if(isMaximizing) {
    let finalScore = -10;
    let finalI, finalJ;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == ' ') {
                board[i][j] = 'X';
                let score = MaxMin(board, Depth - 1, false, false);
                board[i][j] = ' ';
                if(score > finalScore) {
                    finalScore = score;
                    finalI = i;
                    finalJ = j;
                }
                if(firstTime) {
                  console.log("Score"+i+" "+j+": "+score);
                }
            }
        }   
    }
    if(firstTime) {
        board[finalI][finalJ] = 'O';
        AllButton.forEach(function(ele){
        let demin=ele.firstElementChild.getAttribute("de");
        if(parseInt(demin[0])==finalI && parseInt(demin[1])==finalJ){
          ele.firstElementChild.innerHTML="O";
          ele.firstElementChild.style.color="aquamarine";
          ele.firstElementChild.classList.add("Finish");
          TurnPlayerGame.innerHTML =Player;
          let result =checkWinner(board);
        setTimeout(()=>{if(result==2){
          WinnerMessage.classList.add("slideDown");
          WinnerMessage.firstElementChild.innerHTML="You won!";
          CounterX++;
        }else if(result==-2){
          CounterO++;
          LostMessage.classList.add("slideDown");
          
        }else if(result==0){
          WinnerMessage.classList.add("slideDown");
          WinnerMessage.firstElementChild.innerHTML="It's Draw!";
          CounterD++;
        }},100)
        }
      })
  }
  return finalScore;
  }else{
    let finalScore = 10;
    let finalI, finalJ;
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(board[i][j] == ' ') {
                board[i][j] = 'O';
                let score = MaxMin(board, Depth - 1, true, false);
                board[i][j] = ' ';
                if(score < finalScore) {
                    finalScore = score;
                    finalI = i;
                    finalJ = j;
                }
                if(firstTime) {
                console.log("Score"+i+" "+j+": "+score);
                }
            }
        }   
    }
    if(firstTime) {
        board[finalI][finalJ] = 'O';
        AllButton.forEach(function(ele){
          let demin=ele.firstElementChild.getAttribute("de");
          if(parseInt(demin[0])==finalI && parseInt(demin[1])==finalJ){
            ele.firstElementChild.innerHTML="O";
            ele.firstElementChild.style.color="aquamarine";
            ele.firstElementChild.classList.add("Finish");
            TurnPlayerGame.innerHTML =Player;
            let result =checkWinner(board);
        setTimeout(()=>{
          if(result==2){
            WinnerMessage.classList.add("slideDown");
            WinnerMessage.firstElementChild.innerHTML="You won!";
            CounterX++;
            Clear();
        }else if(result==-2){
          CounterO++;
          LostMessage.classList.add("slideDown");
        }else if(result==0){
          alert("Draw");
          CounterD++;
          Clear();
        }},100)
          }
        })
    }
    return finalScore;
  }

}

/* End Play With Computer Using Algorithm MaxMin */





/*display Character When Hover*/
AllButton.forEach(function(ele){
  ele.addEventListener("mouseover",()=>{
    if(ele.firstElementChild.classList.contains("Finish")){
    }else{
      TestPlayer(ele);
    }
  })
})
AllButton.forEach(function(ele){
  ele.addEventListener("mouseout",()=>{
    if(ele.firstElementChild.classList.contains("Finish")){
    }else{
      RemoveTestPlayer(ele);
    }
  })
})
function TestPlayer(ele){
  if(Player=="X"){
    ele.firstElementChild.innerHTML="X";
    ele.firstElementChild.style.color="#e9967a66";
    
  }else{
    ele.firstElementChild.innerHTML="O";
    ele.firstElementChild.style.color="#7fffd48a";
  }
}
function RemoveTestPlayer(ele){
  if(!ele.firstElementChild.classList.contains("Finish")){
    ele.firstElementChild.innerHTML=" ";
  }
  
}
/*End display Character When Hover*/

/* Start Clear All game */
function Clear(){
Player="X";
GameCounter=0;
board=[[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']]
if(LostMessage.classList.contains("slideDown")){
  LostMessage.classList.remove("slideDown")
  LostMessage.classList.add("slideUp");
}
if(WinnerMessage.classList.contains("slideDown")){
  WinnerMessage.classList.remove("slideDown")
  WinnerMessage.classList.add("slideUp");
}
if(!canvas.classList.contains("InActive")){
  canvas.classList.add("InActive");
}
SetNumberWin();
AllButton.forEach(function(ele){
    ele.firstElementChild.textContent=" ";
    ele.firstElementChild.classList.remove("Finish");
    ele.firstElementChild.classList.remove("WinnerX");
    ele.firstElementChild.classList.remove("WinnerY");
    ele.firstElementChild.classList.remove("WinnerZ");
})
}
/* End Clear All game */
function DrawWinner(WinnerList,val){
if(val=="X"){
  AllButton[WinnerList[0]].firstElementChild.classList.add("WinnerX");
  AllButton[WinnerList[1]].firstElementChild.classList.add("WinnerX");
  AllButton[WinnerList[2]].firstElementChild.classList.add("WinnerX");
}else if(val=="Y"){
  AllButton[WinnerList[0]].firstElementChild.classList.add("WinnerY");
  AllButton[WinnerList[1]].firstElementChild.classList.add("WinnerY");
  AllButton[WinnerList[2]].firstElementChild.classList.add("WinnerY");
}else if(val=="Z"){
  AllButton[WinnerList[0]].firstElementChild.classList.add("WinnerZ");
  AllButton[WinnerList[1]].firstElementChild.classList.add("WinnerZ");
  AllButton[WinnerList[2]].firstElementChild.classList.add("WinnerZ");
} 
}

/*Set Number Win*/
function SetNumberWin(){
  let AllSelectResult=document.querySelectorAll(".WinnerPlayer p span");
  for(let i=0;i<AllSelectResult.length;i++){
    if(i==0){
      AllSelectResult[i].innerHTML =CounterO;
    }else if(i==1){
      AllSelectResult[i].innerHTML =CounterX;
    }else if(i==2){
      AllSelectResult[i].innerHTML =CounterD;
    }
  }
}
/*Choice Mode Game*/
function Choice(Num){
  if(Num==1){
    IsTwoPlayer=false;
  }else if(Num==2){
    IsTwoPlayer=true;
  }
  CounterX=0;
  CounterO=0;
  CounterD=0;
  SetNumberWin();
  if(optionMessage.classList.contains("slideDown")){
    optionMessage.classList.remove("slideDown")
    optionMessage.classList.add("slideUp");
  }else{
    optionMessage.classList.add("slideUp");
  }

  TurnPlayerGame.innerHTML =Player;
}
/*End Choice Mode Game */
/*Start Shaw Mode Game*/
function ShawModeGame(){
  Clear();
  if(LostMessage.classList.contains("slideDown")){
    LostMessage.classList.remove("slideDown")
    LostMessage.classList.add("slideUp");
  }
  if(WinnerMessage.classList.contains("slideDown")){
    WinnerMessage.classList.remove("slideDown")
    WinnerMessage.classList.add("slideUp");

  }
  if(optionMessage.classList.contains("slideUp")){
    optionMessage.classList.add("slideDown")
    optionMessage.classList.remove("slideUp");
  }

}
/*End  Shaw Mode Game*/
/**/
var COLORS, 
    Confetti, 
    NUM_CONFETTI, PI_2, 
     confetti, 
    context, drawCircle, drawCircle2, drawCircle3, i, range, xpos;
 NUM_CONFETTI = 40;
 COLORS = [
   [235, 90, 70],
   [97, 189, 79],
   [242, 214, 0],
   [0, 121, 191],
   [195, 119, 224]
 ];
 PI_2 = 2 * Math.PI;
 canvas = document.getElementById("confeti");
 context = canvas.getContext("2d");
 window.w = 0;
 window.h = 0;
 window.resizeWindow = function() {
   window.w = canvas.width = window.innerWidth;
   return window.h = canvas.height = window.innerHeight
 };
 window.addEventListener("resize", resizeWindow, !1);
 window.onload = function() {
   return setTimeout(resizeWindow, 0)
 };
 range = function(a, b) {
   return (b - a) * Math.random() + a
 };
 drawCircle = function(a, b, c, d) {
   context.beginPath();
   context.moveTo(a, b);
   context.bezierCurveTo(a - 17, b + 14, a + 13, b + 5, a - 5, b + 22);
   context.lineWidth = 2;
   context.strokeStyle = d;
   return context.stroke()
 };
 drawCircle2 = function(a, b, c, d) {
   context.beginPath();
   context.moveTo(a, b);
   context.lineTo(a + 6, b + 9);
   context.lineTo(a + 12, b);
   context.lineTo(a + 6, b - 9);
   context.closePath();
   context.fillStyle = d;
   return context.fill()
 };
 drawCircle3 = function(a, b, c, d) {
   context.beginPath();
   context.moveTo(a, b);
   context.lineTo(a + 5, b + 5);
   context.lineTo(a + 10, b);
   context.lineTo(a + 5, b - 5);
   context.closePath();
   context.fillStyle = d;
   return context.fill()
 };
 xpos = 0.9;
 document.onmousemove = function(a) {
   return xpos = a.pageX / w
 };
 window.requestAnimationFrame = function() {
   return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
     return window.setTimeout(a, 5)
   }
 }();
 Confetti = function() {
   function a() {
     this.style = COLORS[~~range(0, 5)];
     this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
     this.r = ~~range(2, 6);
     this.r2 = 2 * this.r;
     this.replace()
   }
   a.prototype.replace = function() {
     this.opacity = 0;
     this.dop = 0.03 * range(1, 4);
     this.x = range(-this.r2, w - this.r2);
     this.y = range(-20, h - this.r2);
     this.xmax = w - this.r;
     this.ymax = h - this.r;
     this.vx = range(0, 2) + 8 * xpos - 5;
     return this.vy = 0.7 * this.r + range(-1, 1)
   };
   a.prototype.draw = function() {
     var a;
     this.x += this.vx;
     this.y += this.vy;
     this.opacity +=
       this.dop;
     1 < this.opacity && (this.opacity = 1, this.dop *= -1);
     (0 > this.opacity || this.y > this.ymax) && this.replace();
     if (!(0 < (a = this.x) && a < this.xmax)) this.x = (this.x + this.xmax) % this.xmax;
     drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
     drawCircle3(0.5 * ~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
     return drawCircle2(1.5 * ~~this.x, 1.5 * ~~this.y, this.r, this.rgb + "," + this.opacity + ")")
   };
   return a
 }();
 confetti = function() {
   var a, b, c;
   c = [];
   i = a = 1;
   for (b = NUM_CONFETTI; 1 <= b ? a <= b : a >= b; i = 1 <= b ? ++a : --a) c.push(new Confetti);
   return c
 }();
 window.step = function() {
   var a, b, c, d;
   requestAnimationFrame(step);
   context.clearRect(0, 0, w, h);
   d = [];
   b = 0;
   for (c = confetti.length; b < c; b++) a = confetti[b], d.push(a.draw());
   return d
 };
 step();;
   