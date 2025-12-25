// Add this at the top of your script
let highScore = localStorage.getItem("snakeHighScore") || 0;
document.getElementById("highScore").innerText = highScore;

// Replace your old direction logic with this function
function changeDir(newDir) {
    if(newDir == "LEFT" && d != "RIGHT") d = "LEFT";
    if(newDir == "UP" && d != "DOWN") d = "UP";
    if(newDir == "RIGHT" && d != "LEFT") d = "RIGHT";
    if(newDir == "DOWN" && d != "UP") d = "DOWN";
}

// In your Game Over logic, add this:
if(score > highScore) {
    localStorage.setItem("snakeHighScore", score);
}