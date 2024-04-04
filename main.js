const canvas = document.querySelector('canvas');
const count = document.querySelector('.count');
const speed = document.querySelector('.speed');
const bronze_cup = document.getElementById("bronze");
const silver_cup = document.getElementById("silver");
const gold_cup = document.getElementById("gold");
const length = document.querySelector('.length');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 320;

const snake = [{
    x: 0,
    y: 0
}];

length.textContent = snake.length;
let current_speed = 500;
speed.textContent = current_speed;
let score = 0;
count.textContent = score;

const box = 20;

const food = {
    x: 0,
    y: 0
};

let dx = 0;
let dy = 0;

let position_x = [];
let position_y = [];

function handleKey(event) {
    switch (event.key) {
        case "ArrowUp":
            if(dy != box) {
                dx = 0;
                dy = -box;
            }
            break;
        case "ArrowDown":
            if(dy != -box) {
                dx = 0;
                dy = box;
            }
            break;
        case "ArrowRight":
            if(dx != -box) {
                dx = box;
                dy = 0;
            }
            break;
        case "ArrowLeft":
            if(dx != box) {
                dx = -box;
                dy = 0;
            }
            break;
    }
}

function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

    if(head.x == food.x && head.y == food.y) {
        length.textContent = snake.length;
        score++;
        count.textContent = score;
        generationFood();
    } else {
        snake.pop();
    }

    if(snake.length > 1) {
        if(snake.length != position_x.length) {
            position_x.push(snake[0].x);
        }

        for(let i = 0; i < position_x.length; i++) {
            if(i == 0 || i != 0 && position_x[position_x.length - 1] == position_x[position_x.length - 1]) {
                continue;
            }

            updatePosition(i);
        }
    }
}

function updatePosition(pos) {
    position_x[0] = snake[0].x;
    position_x[pos] = snake[pos].x;
    console.log(position_x);
    // position_y[pos] = snake[pos].y;
    // position_y[pos] = snake[pos].y;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
    
    if(checkCollision()) {
        clearInterval(game);
        alert("Game Over!");
    }
}

function checkCollision() {
    const head = snake[0];

    if(head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        score--;
        count.textContent = score;

        if(score == 0) {
            return true;
        }
    }

    if(score < 0) {
        return true;
    }

    switch(score) {
        case 10:
            current_speed = 300;
            speed.textContent = current_speed;
            clearInterval(game);
            game = setInterval(draw, current_speed);
            break;
        case 20:
            current_speed = 250;
            speed.textContent = current_speed;
            clearInterval(game);
            game = setInterval(draw, current_speed);
            break;
        case 30:
            current_speed = 200;
            bronze_cup.style.display = "block";
            speed.textContent = current_speed;
            clearInterval(game);
            game = setInterval(draw, current_speed);
            break;
        case 40:
            current_speed = 150;
            speed.textContent = current_speed;
            clearInterval(game);
            game = setInterval(draw, current_speed);
            break;
        case 50:
            current_speed = 100;
            speed.textContent = current_speed;
            clearInterval(game);
            game = setInterval(draw, current_speed);
            break;
        default:
            if(score < 30) {
                bronze_cup.style.display = "none";
            }
    }

    return false;
}

function drawSnake() {
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, box, box);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

function generationFood() {
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;
}

function generationSnake() {
    snake.forEach(segment => {
        segment.x = Math.floor(Math.random() * (canvas.width / box)) * box;
        segment.y = Math.floor(Math.random() * (canvas.height / box)) * box;
    });
}

addEventListener("keydown", handleKey);
generationFood();
generationSnake();

let game = setInterval(draw, current_speed);