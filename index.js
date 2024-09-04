document.addEventListener("DOMContentLoaded", () => {

    let table = document.getElementById("ping-pong-table");
    let ball = document.getElementById("ball");
    let paddle = document.getElementById("paddle");
    let paddle2 = document.getElementById("paddle2");

    let leftScore = 0;
    let rightScore = 0;

    let leftScoreElem = document.getElementById("left-score");
    let rightScoreElem = document.getElementById("right-score");

    let ballX = 10;
    let ballY = 10;

    let dx = 2;
    let dy = 2;

    ball.style.left = `${ballX}px`;
    ball.style.top = `${ballY}px`;

    setInterval(function exec() {
        ballX += dx;
        ballY += dy;

        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;

        // Collision with the first paddle
        if (ballX <= paddle.offsetLeft + paddle.offsetWidth &&
            ballX >= paddle.offsetLeft &&
            ballY + ball.offsetHeight >= paddle.offsetTop &&
            ballY <= paddle.offsetTop + paddle.offsetHeight) {
            dx *= -1;
            ballX = paddle.offsetLeft + paddle.offsetWidth;
        }

        // Collision with the second paddle
        if (ballX + ball.offsetWidth >= paddle2.offsetLeft &&
            ballX + ball.offsetWidth <= paddle2.offsetLeft + paddle2.offsetWidth &&
            ballY + ball.offsetHeight >= paddle2.offsetTop &&
            ballY <= paddle2.offsetTop + paddle2.offsetHeight) {
            dx *= -1;
            ballX = paddle2.offsetLeft - ball.offsetWidth;
        }

        // Bounce off the table edges
        if (ballX >= table.offsetWidth - ball.offsetWidth) {
            leftScore++;
            leftScoreElem.textContent = leftScore;
            resetBall();
        } else if (ballX <= 0) {
            rightScore++;
            rightScoreElem.textContent = rightScore;
            resetBall();
        }

        if (ballY >= table.offsetHeight - ball.offsetHeight || ballY <= 0) {
            dy *= -1;
        }
    }, 10);

    function resetBall() {
        ballX = table.offsetWidth / 2 - ball.offsetWidth / 2;
        ballY = table.offsetHeight / 2 - ball.offsetHeight / 2;
        dx *= -1; // Change ball direction after scoring
    }

    let paddleY = 0;
    let dPy = 10;
    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        if (event.keyCode == 38 && paddleY > 0) {
            paddleY += (-1) * dPy;
        } else if (event.keyCode == 40 && paddleY < table.offsetHeight - paddle.offsetHeight) {
            paddleY += dPy;
        }
        paddle.style.top = `${paddleY}px`;
    });

    let paddle2Y = 0;
    document.addEventListener("keydown", (event) => {
        event.preventDefault();
        if (event.keyCode == 87 && paddle2Y > 0) { // 'W' key
            paddle2Y += (-1) * dPy;
        } else if (event.keyCode == 83 && paddle2Y < table.offsetHeight - paddle2.offsetHeight) { // 'S' key
            paddle2Y += dPy;
        }
        paddle2.style.top = `${paddle2Y}px`;
    });

    document.addEventListener("mousemove", (event) => {
        if (event.clientX > table.offsetLeft + (table.offsetWidth / 2)) return;
        let mouseDistanceFromTop = event.clientY;
        let distanceOfTableFromTop = table.offsetTop;
        let mousePointControl = mouseDistanceFromTop - distanceOfTableFromTop - paddle.offsetHeight / 2;
        paddleY = mousePointControl;

        if (paddleY <= 0 || paddleY > table.offsetHeight - paddle.offsetHeight) return;
        paddle.style.top = `${paddleY}px`;
    });

    document.addEventListener("mousemove", (event) => {
        if (event.clientX <= table.offsetLeft + (table.offsetWidth / 2)) return;
        let mouseDistanceFromTop = event.clientY;
        let distanceOfTableFromTop = table.offsetTop;
        let mousePointControl = mouseDistanceFromTop - distanceOfTableFromTop - paddle2.offsetHeight / 2;
        paddle2Y = mousePointControl;

        if (paddle2Y <= 0 || paddle2Y > table.offsetHeight - paddle2.offsetHeight) return;
        paddle2.style.top = `${paddle2Y}px`;
    });

});
