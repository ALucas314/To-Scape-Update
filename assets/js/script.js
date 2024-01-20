document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.getElementById('game-container');
    const player = document.getElementById('player');
    const opponent = document.getElementById('opponent');
    const resultMessage = document.getElementById('result');
    const timeDisplay = document.getElementById('time');
    const startButton = document.getElementById('startButton');

    let playerPosition = { x: 5, y: 5 };
    let opponentPosition = { x: 15, y: 15 };
    let timeRemaining = 80;
    let gameStarted = false;
    let gameInterval;

    function renderGame() {
        if (window.innerWidth <= 376) {
            // Ajusta os limites do gamer container para uma tela de 376px
            player.style.left = `${playerPosition.x * 17}px`;
            player.style.top = `${playerPosition.y * 17}px`;

            opponent.style.left = `${opponentPosition.x * 17}px`;
            opponent.style.top = `${opponentPosition.y * 17}px`;
        } else {
            // Usa os limites padrão
            player.style.left = `${playerPosition.x * 19.50}px`;
            player.style.top = `${playerPosition.y * 19.50}px`;

            opponent.style.left = `${opponentPosition.x * 20}px`;
            opponent.style.top = `${opponentPosition.y * 20}px`;
        }
        
    }
    
    function updateGame() {
        renderGame();

        // Verifica colisão
        if (playerPosition.x === opponentPosition.x && playerPosition.y === opponentPosition.y) {
            endGame(false);
        }

        // Verifica vitória
        if (timeRemaining === 0) {
            endGame(true);
        }
    }

    function endGame(playerWins) {
        clearInterval(gameInterval);

        if (playerWins) {
            resultMessage.textContent = 'Você sobreviveu!';
        } else {
            resultMessage.textContent = 'Oponente pegou você! Você perdeu.';
        }

        startButton.textContent = 'Jogar Novamente';
        gameStarted = false;
    }

    function movePlayer(direction) {
        if (!gameStarted) {
            return; // Não permite movimento se o jogo não começou
        }

        // Define os limites para a tela de 376px
        const maxX = window.innerWidth <= 376 ? 16 : 19;
        const maxY = window.innerWidth <= 376 ? 16 : 19;

        switch (direction) {
            case 'up':
                playerPosition.y = Math.max(playerPosition.y - 1, 0);
                break;
            case 'down':
                playerPosition.y = Math.min(playerPosition.y + 1, maxY);
                break;
            case 'left':
                playerPosition.x = Math.max(playerPosition.x - 1, 0);
                break;
            case 'right':
                playerPosition.x = Math.min(playerPosition.x + 1, maxX);
                break;
        }

        // Atualiza o jogo apenas se as novas posições estiverem dentro dos limites
        if (playerPosition.x >= 0 && playerPosition.x <= maxX && playerPosition.y >= 0 && playerPosition.y <= maxY) {
            updateGame();
        }
    }

    function moveOpponent() {
        if (Math.random() < 0.5) {
            opponentPosition.x += (playerPosition.x > opponentPosition.x) ? 1 : -1;
        } else {
            opponentPosition.y += (playerPosition.y > opponentPosition.y) ? 1 : -1;
        }
    }

    function startGame() {
        // Reinicializa as posições e o tempo
        playerPosition = { x: 5, y: 5 };
        opponentPosition = { x: 15, y: 15 };
        timeRemaining = 80;

        // Reinicia o texto do resultado
        resultMessage.textContent = '';

        // Reinicia o estilo do botão
        startButton.textContent = 'Start';

        // Reinicia o intervalo do jogo
        clearInterval(gameInterval);

        // Inicia o novo intervalo do jogo
        gameInterval = setInterval(function () {
            timeRemaining--;
            timeDisplay.textContent = timeRemaining;

            moveOpponent();
            updateGame();
        }, 100);

        // Define gameStarted para true
        gameStarted = true;

        // Atualiza o jogo após o reinício
        updateGame();
    }

    // Adiciona um evento de clique para o botão
    startButton.addEventListener('click', function () {
        if (gameStarted) {
            // Se o jogo já começou, não inicia novamente
            return;
        }
        startGame();
    });

    // Adiciona eventos de teclado para as teclas WASD
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'w':
                movePlayer('up');
                break;
            case 's':
                movePlayer('down');
                break;
            case 'a':
                movePlayer('left');
                break;
            case 'd':
                movePlayer('right');
                break;
        }
    });

    // Adiciona eventos de clique para as setas
    const arrowUp = document.getElementById('up');
    const arrowDown = document.getElementById('down');
    const arrowLeft = document.getElementById('left');
    const arrowRight = document.getElementById('right');

    arrowUp.addEventListener('click', function () {
        movePlayer('up');
    });

    arrowDown.addEventListener('click', function () {
        movePlayer('down');
    });

    arrowLeft.addEventListener('click', function () {
        movePlayer('left');
    });

    arrowRight.addEventListener('click', function () {
        movePlayer('right');
    });

    // Restante do código permanece inalterado
});
