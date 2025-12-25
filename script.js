const canvas = document.getElementById("snakeGame");
const ctx = canvas.getContext("2d");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScoreElement = document.getElementById("finalScore");

// GAME CONFIGURATION
const box = 20; 
const gameSpeed = 250; // INCREASED: 250ms is much slower and easier to control

let score = 0;
let highScore = localStorage.getItem("snakeHighScore") || 0;
highScoreElement.innerText = highScore;

let snake = [{ x: 8 * box, y: 10 * box }];
let food = getRandomFood();
let d = null; 
let nextDir = null; 
let gameRunning = true;

// Direction Logic
document.addEventListener("keydown", (e) => {
    if(e.keyCode == 37) changeDir("LEFT");
    if(e.keyCode == 38) changeDir("UP");
    if(e.keyCode == 39) changeDir("RIGHT");
    if(e.keyCode == 40) changeDir("DOWN");
});

function changeDir(newDir) {
    if(newDir == "LEFT" && d == "RIGHT") return;
    if(newDir == "UP" && d == "DOWN") return;
    if(newDir == "RIGHT" && d == "LEFT") return;
    if(newDir == "DOWN" && d == "UP") return;
    nextDir = newDir; 
}

function getRandomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box - 1)) * box,
        y: Math.floor(Math.random() * (canvas.height / box - 1)) * box
    };
}

function draw() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Food
    ctx.fillStyle = "#F87171";
    ctx.fillRect(food.x + 2, food.y + 2, box - 4, box - 4);

    // Draw Snake
    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "#4ADE80" : "#22C55E"; 
        ctx.fillRect(snake[i].x + 1, snake[i].y + 1, box - 2, box - 2);
    }

    if (nextDir) {
        d = nextDir;
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if( d == "LEFT") snakeX -= box;
        if( d == "UP") snakeY -= box;
        if( d == "RIGHT") snakeX += box;
        if( d == "DOWN") snakeY += box;

        if(snakeX == food.x && snakeY == food.y) {
            score++;
            scoreElement.innerText = score;
            food = getRandomFood();
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if(snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
            endGame();
            return;
        }
        snake.unshift(newHead);
    }
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
    if(score > highScore) {
        localStorage.setItem("snakeHighScore", score);
        highScoreElement.innerText = score;
    }
    finalScoreElement.innerText = score;
    gameOverScreen.classList.remove("hidden");
    canvas.style.filter = "blur(4px)";
}

function resetGame() {
    location.reload();
}

// Start the loop at the NEW slower speed
let gameLoop = setInterval(draw, gameSpeed);