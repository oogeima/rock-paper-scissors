(() => {
    const ROCK = 'rock';
    const PAPER = 'paper';
    const SCISSORS = 'scissors';

    const WIN = 'win';
    const LOSS = 'loss';
    const TIE = 'tie';
    const loserFor = {
        [ROCK]: SCISSORS,
        [PAPER]: ROCK,
        [SCISSORS]: PAPER,
    };
    const options = Object.keys(loserFor);
    const computerMove = () => options[parseInt(Math.random() * 3)];
    const title = s => s[0].toUpperCase() + s.slice(1);
    let score = [0, 0, 0];

    function play(player) {
        const computer = computerMove();
        if (computer === player) {
            return ['Tie!', TIE];
        } else if (loserFor[player] === computer) {
            return [`You win this round! ${title(player)} beats ${title(computer)}!`, WIN];
        } else {
            return [`You lose this round! ${title(computer)} beats ${title(player)}!`, LOSS];
        }
    }

    function render(message) {
        const [wins, losses, ties] = score;
        document.getElementById('score').textContent = `${wins}-${losses}-${ties}`;
        if (message !== undefined) {
            document.getElementById('message').textContent = message;
        }
    }

    function playMove(move) {
        return () => {
            const [message, result] = play(move);
            let gameOverMessage = null;
            switch (result) {
                case WIN:
                    score[0]++;
                    if (score[0] === 5) {
                        gameOverMessage = 'You win the game!';
                    }
                    break;
                case LOSS:
                    score[1]++;
                    if (score[1] === 5) {
                        gameOverMessage = 'You lose the game. :(';
                    }
                    break;
                case TIE:
                    score[2]++;
                    break;
            }
            render(gameOverMessage || message);
            if (gameOverMessage) {
                gameOver();
            }
        };
    }

    function gameOver() {
        document.querySelectorAll('#choices button').forEach(button => button.disabled = true);
        document.getElementById('reset').style = 'display: inline-block;';
    }

    function reset() {
        document.querySelectorAll('button').forEach(button => button.disabled = false);
        score = [0, 0, 0];
        render('');
        document.getElementById('reset').style = '';
    }

    document.getElementById('rock').addEventListener('click', playMove(ROCK));
    document.getElementById('paper').addEventListener('click', playMove(PAPER));
    document.getElementById('scissors').addEventListener('click', playMove(SCISSORS));
    document.getElementById('reset').addEventListener('click', reset);

    render();
})();
