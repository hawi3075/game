const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreElement = document.getElementById("finalScore");

const box = 20; 
let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreElement.innerText = highScore;

let snake = [{ x: 8 * box, y: 10 * box }];
let food = getRandomFood();
let d = "RIGHT"; // Start moving right
let gameRunning = true;

// Handle Keyboard and Button Clicks
document.addEventListener("keydown", (e) => {
    if(e.keyCode == 37) changeDir("LEFT");
    if(e.keyCode == 38) changeDir("UP");
    if(e.keyCode == 39) changeDir("RIGHT");
    if(e.keyCode == 40) changeDir("DOWN");
});

function changeDir(newDir) {
    if(newDir == "LEFT" && d != "RIGHT") d = "LEFT";
    else if(newDir == "UP" && d != "DOWN") d = "UP";
    else if(newDir == "RIGHT" && d != "LEFT") d = "RIGHT";
    else if(newDir == "DOWN" && d != "UP") d = "DOWN";
}

function getRandomFood() {
    return {
        x: Math.floor(Math.random() * 14 + 1) * box,
        y: Math.floor(Math.random() * 14 + 1) * box
    };
}

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake (Green color from your design)
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#4ADE80" : "#22C55E"; 
        ctx.fillRect(snake[i].x, snake[i].y, box - 2, box - 2); // Small gap for grid look
    }

    // Draw Food (Red)
    ctx.fillStyle = "#F87171";
    ctx.fillRect(food.x, food.y, box - 2, box - 2);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // Eating food
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        scoreElement.innerText = score;
        food = getRandomFood();
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    // Collision & Game Over
    if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
        endGame();
        return;
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for(let i = 0; i < array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) return true;
    }
    return false;
}

function endGame() {
    gameRunning = false;
    clearInterval(gameLoop);
    
    // Update High Score
    if(score > highScore) {
        highScore = score;
        localStorage.setItem("snakeHighScore", highScore);
        highScoreElement.innerText = highScore;
    }

    // Show Game Over Screen from your Stitch design
    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove("hidden");
}

function resetGame() {
    location.reload(); // Simplest way to restart
}

let gameLoop = setInterval(draw, 120);