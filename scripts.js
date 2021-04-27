
    

//=============================================InitialPosition==================================

let snakeDotsPosition = 
[  
    snakeBlock = {
        x: 0,
        y: 0
    },
    snakeBlock = {
        x: 10,
        y: 0
    },
    snakeBlock = {
        x: 20,
        y: 0
    },
   
];

let blockwidth = 10;
let blockheight = 5;
let snakeLength = 3;
let direction = [10, 0];
let appleColision = false;
let appleX = 10;
let appleY = 145;

let canvas = document.getElementById('screen');
canvasContext = canvas.getContext('2d');

//========================================Grid==============================================

function drawGrid(context, color, stepx, stepy) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = 0.5;

    for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
        context.moveTo(i, 0);
        context.lineTo(i, context.canvas.height);
        context.stroke();
    }

    for (var i = stepy + 0.5; i < context.canvas.height; i += stepy) {
        context.moveTo(0, i);
        context.lineTo(context.canvas.width, i);
        context.stroke();
    }
}

//===================================ClearScreen===============================================

function clearScreen(){
    canvasContext.fillStyle = "#fff";
    canvasContext.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

//=====================================SnakeAdvance============================================

function snakeMovement(){
    let newBlock = {
        x: snakeDotsPosition[0].x + direction[0],
        y: snakeDotsPosition[0].y + direction[1],
    }

    if(newBlock.x > canvas.width - 10) newBlock.x = 0;
    if(newBlock.y > canvas.height - 5) newBlock.y = 0;
    if(newBlock.x < 0) newBlock.x = 290;
    if(newBlock.y < 0) newBlock.y = 145;

    snakeDotsPosition.unshift(newBlock);
    snakeDotsPosition.pop();
    
}
//==================================SnakeDirection============================================

window.addEventListener('keydown', setSnakeDirection);

function setSnakeDirection(e) {
    if(e.keyCode >= 37 && e.keyCode <= 40){
        switch (e.keyCode){
            case 37:
                direction = [-10,0];
            break;
            case 38:
                direction = [0,-5];
            break;
            case 39:
                direction = [10,0];
            break;
            case 40:
                direction = [0, 5];
            break;
        }
    }
}
//================================ DrawSnake =================================================

const drawSnake = (snakeBlock) =>canvasContext.fillRect(snakeBlock.x, snakeBlock.y, blockwidth, blockheight);

//=================================SnakeCollision===============================================

const checkSnakeCollision = () => {
    
}

//===================================Apple=====================================================

const appleGenerate = () => {

    appleX = Math.floor(Math.random() *  290/10) * 10;
    appleY = Math.floor(Math.random() * 140/5) * 5 ;

}

const appleDraw =() => canvasContext.fillRect(appleX, appleY, blockwidth, blockheight);

const checkAppleCollision = () => {
    

    if(appleX == snakeDotsPosition[0].x && appleY == snakeDotsPosition[0].y){
        
        let newSnakeBlock = {
            x: appleX,
            y: appleY
        }
    
        snakeDotsPosition.unshift(newSnakeBlock);
        snakeLength++;
        appleColision = true;
    } 
    
}


//======================================Main=========================================
function loop(){

    setTimeout(() => {
        if(appleColision){
            appleGenerate();
            appleColision = false;
        }
        clearScreen();
        canvasContext.fillStyle = "#000";
        snakeMovement();
        snakeDotsPosition.forEach(drawSnake);
        appleDraw();
        drawGrid(canvasContext, "#fff", 10, 5);
        checkAppleCollision();
        checkSnakeCollision();
        loop()
    }, 100);
}

loop();











