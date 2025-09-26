let gameSeq = [];
let userSeq = [];

let btns = ["red","green", "yellow","purple"];

let started = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');
document.addEventListener('keypress',function(){
    if(started == false){
      console.log("game started");
      started = true;
      levelup();
    }
    
});

function levelup(){
    userSeq = []; // jese he level up hoga user ko shuru se value dalne padegi
    level++;
    h2.innerText = `level ${level}`;

    //random button choose by game
   let randIdx = Math.floor(Math.random() * 4);
   let randColor = btns[randIdx];
   // random color ki class ka button acces kar lenge
   let randBtn = document.querySelector(`.${randColor}`); 
   // ab random ko flash karwayenge btnflash() ko bhej ke
   gameSeq.push(randColor);
   console.log(gameSeq);

   gameFlash(randBtn);
}

 function gameFlash(btn){
 btn.classList.add('flash');
 setTimeout(function(){
    btn.classList.remove('flash');
 },250)
}

function userFlash(btn){
    btn.classList.add('userFlash');
    setTimeout(function(){
        btn.classList.remove('userFlash')
    },250)
}

function btnPress(){
    let btn = this      // this humhara cuurrent button press kiya hai voh hoga har barr alg
    userFlash(btn);      // button click hoga toh flash bhe hoga
        
     userColor = btn.getAttribute("id");  //har button ko id di kyuki humhr har button ka color nikalna hai
    userSeq.push(userColor); 
    checkAns(userSeq.length-1);
}
+-


function checkAns(idx){ //user button color add ke baad check karenge gameSeq se

    // check karenge value
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelup,1000)
        }
    }
    else{
        h2.innerHTML=`game over! your score was <b> ${level} </b> <br> Press any key to Start`;
        if(highScore < level ){
            highScore = level;
           h3.innerHTML = ` New highest score is ${level}`
        }
        else{
           
            h3.innerHTML = `highest score is ${highScore}`
        }
       
        document.querySelector("body").style.backgroundColor = "red";


        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white"
        },150)
        reset(); // game over phir reset kar do saari cheech
    }
}

let allBtns = document.querySelectorAll('.btn');
for(btn of allBtns){
    btn.addEventListener('click',btnPress);
}

function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}