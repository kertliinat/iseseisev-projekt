/*jshint esversion:6*/




window.onload = function() {
  let gameField = document.getElementById("gameFloor");
  let ctx = gameField.getContext("2d");
  let score = document.getElementById("score");
  let destroyedBlocks = document.getElementById("dBlocks");
  let pause = document.getElementById("pauseButton");
  let resume = document.getElementById("resumeButton");

  window.addEventListener('keydown', moveDeck);


  pause.addEventListener('click', pauseGame);
  resume.addEventListener('click', resumeGame);

  let width = document.getElementById("gameFloor").width;
  let height = document.getElementById("gameFloor").height;

  let deckStartPosX = gameField.width/2;
  let deckStartPosY = gameField.height-20;
  let deckWidth = 75;
  let deckHeight = 15;

  let ballRad = 20;


//palli asukoht
  let x = gameField.width/2;
  let y = gameField.height-40;


  //liikumiskiirus
  let px = 2.5;
  let py = -2;

  //lõhutavad objektid
  let blockWidth = 75;
  let blockHeight = 20;

  let scoreCounter = 0;

  let blocks = [ {"x":10, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"green", "hp":1},
                 {"x":130, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"green", "hp":1},
                 {"x":250, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"green", "hp":1},
                 {"x":370, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":490, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":610, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":730, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":850, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":970, "y":50, "width":blockWidth, "height":blockHeight, "fillStyle":"green", "hp":1},
                 
                 {"x":10, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"green", "hp":1},
                 {"x":130, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"green", "hp":1},
                 {"x":250, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"green", "hp":1},
                 {"x":370, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":490, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":610, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":730, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":850, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"blue", "hp":2},
                 {"x":970, "y":150, "width":blockWidth, "height":blockHeight, "fillStyle":"green", "hp":1}
  ];

  let amountOfBlocks = blocks.length;
  let paused = false;
  let interval = setInterval(move, 10);

  function resumeGame(){
    if(paused == true){
      interval = setInterval(move, 10);
      paused = false;
      console.log(paused);
    }
  }
  function pauseGame(){
      if(paused == false){
        clearInterval(interval);
        paused = true;
        console.log(paused);
      }
  }
  function drawBlocks(){
    for(let i = 0; i < blocks.length; i++){
      let b = blocks[i];
      ctx.fillStyle = b.fillStyle;
      ctx.fillRect(b.x, b.y, b.width, b.height);
    }
  }
  function moveDeck(e){
    //console.log("click");
    if(paused == false){
      if(e.keyCode == 37 && deckStartPosX > 10){
        ctx.clearRect(0, 0, gameField.width, gameField.height);
        deckStartPosX -=40;
        ctx.fillRect(deckStartPosX, deckStartPosY, deckWidth, deckHeight);
      }
      if(e.keyCode == 39 && deckStartPosX < (gameField.width-deckWidth)){
        ctx.clearRect(0, 0, gameField.width, gameField.height);
        deckStartPosX +=40;
        ctx.fillRect(deckStartPosX, deckStartPosY, deckWidth, deckHeight);
      }
    }
  }
  function ball(){
    ctx.beginPath();
    ctx.arc(x, y, ballRad, 0, Math.PI*2, false);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
  function deck(){
    ctx.beginPath();
    //x, y, width, height
    ctx.fillStyle = "red";
    ctx.fillRect(deckStartPosX, deckStartPosY, deckWidth, deckHeight);
    ctx.closePath();
  }

  function move(){
    ctx.clearRect(0, 0, gameField.width, gameField.height);
    ball();
    deck();
    drawBlocks();
    score.innerHTML = scoreCounter;
    //destroyedBlocks.innerHTML = amountOfBlocks - blocks.length;

    if(y + py < 0 + ballRad) {
      //lagi
      py = -py;
    }
    if(x+px < 0 + ballRad){
      //vasak sein
      px = -px;
    }
    if(x + px > gameField.width-ballRad){
      //parem sein
      px = -px;
    }
    for(i = 0; i < blocks.length; i++){
      let b = blocks[i];
      let hp = b.hp;
      //(y + py < b.y +blockHeight + ballRad)
      //x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight
      if(x >= b.x && x <= b.x+ballRad+blockWidth && y >= b.y && y <= b.y + blockHeight+ballRad){
            py = -py;
            b.hp -= 1;
            scoreCounter++;
            //console.log("x: "+x +" y: "+y);
            //console.log(b.x+" "+parseInt(b.x)+75);
            //console.log(b.fillStyle+" "+hp);
            //console.log(scoreCounter);
      }
      if(hp == 0){
        blocks.splice(i,1);
      }
      if(blocks.length == 0){
        clearInterval(interval);
        alert("Võitsid mängu");
        window.location.href = "main.html";
      }
    }

    if(y + py > gameField.height-ballRad-deckHeight){
      //puutub decki
      if(x > deckStartPosX && x < deckStartPosX +ballRad+deckWidth) {
        py = -py;
        //kui kiirendad pallipuutega
        //px--;
        //py--;
      }else if(y + py > gameField.height-deckHeight){
        //puutub põrandat
        py = -py;
        alert("Mäng läbi");
        clearInterval(interval);
        window.location.href = "main.html";
      }
    }
    x = x + px;
    y = y + py;
  }

};
