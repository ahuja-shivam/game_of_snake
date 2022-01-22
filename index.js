let velocity = {
    x: 0,
    y: 0
};

const food_sound = new Audio("music/food.mp3");
const gameover_sound = new Audio("music/gameover.mp3");
const move_sound = new Audio("music/move.mp3");
const game_sound = new Audio("music/music.mp3");


score_tile = document.getElementById("score_tile");
board = document.getElementById('board');
localStorage.setItem('hiscore', 0 );
let score = 0;
let hiscore = localStorage.getItem('hiscore');
let time_variable = 0;
let speed = 10;
let snakeArr = [
    {x: 13, y: 15}
];

let food = {x: 5, y: 5}

function main(ctime){
    window/requestAnimationFrame(main);
    if((ctime - time_variable)/1000 < 1/speed){
        // console.log(ctime)
        return;
    }
    time_variable = ctime;
    game_engine();
}

function isCollide(s_arr){
    if(s_arr[0].x<1 || s_arr[0].y<1|| s_arr[0].x>17||s_arr[0].y>17){
        return true;
    }
    
    for (let i = 1; i < snakeArr.length; i++) {
        if(snakeArr[i].x == snakeArr[0].x && snakeArr[i].y == snakeArr[0].y){
            return true;
        }
        
    }
    
    return false;
}

function game_engine(){
    game_sound.play();
    // After collision of snake
    if(isCollide(snakeArr)){
        game_sound.pause();
        gameover_sound.play();
        velocity = {x: 0, y: 0};
        alert("Game over, press any key to start a new game");
        score = 0;
        score_tile.innerHTML = `Score: ${score} `; 

        game_sound.play();
        snakeArr = [{x:13, y: 15}];
        hiscore = localStorage.getItem('hiscore');
        if(score>hiscore){
            localStorage.setItem('hiscore', score);
        }
    }

    // When the snake eats food
    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y){
        score = score+1;
        score_tile.innerHTML = `Score: ${score} `; 
        food_sound.play();

        snakeArr.unshift({x: snakeArr[0].x + velocity.x, y: snakeArr[0].y + velocity.y});
        let a = 1;
        let b = 17;
        
        food = {
            x: Math.round(a + (b-a)* Math.random()),
            y: Math.round(a + (b-a)* Math.random())
        }
    }   

    // moving of snake
    for (let i = snakeArr.length - 2; i >=0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += velocity.x;
    snakeArr[0].y += velocity.y;
    //dispay the snake
    board.innerHTML = "";
    snakeArr.forEach(function(e, i) {
       snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = e.x;
       snakeElement.style.gridColumnStart = e.y;
       if(i == 0){
           snakeElement.classList.add('head');
    
       }
       else{ 
            snakeElement.classList.add('snake');
       }
       board.appendChild(snakeElement);
    });
    // display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.x;
    foodElement.style.gridColumnStart = food.y;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

//main logic starts from here  
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    velocity = {x: 0, y: 1};
    move_sound.play();
    switch (e.key){
        case 'ArrowUp':
            //console.log("Up pressed");
            velocity = {x: -1, y: 0};
            break;
        case 'ArrowDown':
            // console.log("down pressed")
            velocity = {x: 1, y:0};
            break;
        case 'ArrowLeft':
            velocity = {x: 0, y: -1};
            // console.log("left pressed")
            break;
        case 'ArrowRight':
            velocity = {x: 0, y: 1};
            // console.log("right pressed")
            break;
        default:
            break;                  
    }
    
})
