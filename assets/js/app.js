var state = {
    // variabila in care se salveaza numarul match-ului
    match: 1,
    // iti arata scorul pe parcursul match-urilor
    score: {
        you: 0,
        computer: 0
    },
    // arata daca e randul lui x sau 0
    turn: 'x',
    // arata cine a castigat
    result: '',
    // tabla pt x si 0 - goala initial
    board: [
        null, null, null,
        null, null, null,
        null, null, null
    ]
};

$(".table-game a").click(function () {
    var value = $(this).data('value');
    playerMove(value);
});

$("#next-match-button").click(function () {
    nextMatch();
});

//player move
function playerMove(value) {
    if (state.turn === 'x' && state.board[value] === null) {
        state.board[value] = 'x';
        drawMove(value);
        checkResult();
    }
}

//computer move
function computerMove() {
    var availableMoves = [];
    for (var i = 0; i < 9; i++) {
        if (state.board[i] === null) {
            availableMoves.push(i);
        }
    }

    var next = Math.floor(Math.random() * availableMoves.length);
    state.board[availableMoves[next]] = '0';
    drawMove(availableMoves[next]);
    checkResult();
}

function drawMove(value) {
    if (state.board[value] != null) {
        $("#position-" + value).text(state.board[value]);
    }
}

//check result
function checkResult() {
    var b = state.board;
    var winner = false;

    //linii
    for (var i = 0; i < 9; i = i + 3) {
        if (b[i] !== null && b[i] === b[i + 1] && b[i + 1] === b[i + 2]) {
            setWinner(b[i]);
            winner = true;
            break
        }
    }

    //coloane
    if (!winner) {
        for (var i = 0; i < 3; i++) {
            if (b[i] !== null && b[i] === b[i + 3] && b[i + 3] === b[i + 6]) {
                setWinner(b[i]);
                winner = true;
                break
            }
        }
    }

    //diagonale
    if (!winner) {
        if (b[0] !== null && b[0] === b[4] && b[4] === b[8]) {
            setWinner(b[0]);
            winner = true;
        }
        else if (b[2] !== null && b[2] === b[4] && b[4] === b[6]) {
            setWinner(b[2]);
            winner = true;
        }
    }

    if (!winner) {
        for (var i = 0; i < 9; i++) {
            if (b[i] === null) {
                nextMove();
                return;
            }
        }
        setWinner(false);
    }
}

//set winner
function setWinner(who) {
    if (who === false) {
        state.result = 'DRAW';
    }
    else if (who === 'x') {
        state.result = 'X WINS';
        state.score.you++;
    }
    else {
        state.result = '0 WINS';
        state.score.computer++;
    }
    $(".show-winner-message").text(state.result).parent().show();
    $("#score-you").text(state.score.you);
    $("#score-computer").text(state.score.computer);


}

function nextMove() {
    if (state.turn === 'x') {
        state.turn = '0';
        computerMove();
    }
    else {
        state.turn = 'x';
    }
}

function nextMatch() {
    state.match++;
    $("#match").text(state.match);
    $(".show-winner-message").text(state.result).parent().hide();
    state.turn = 'x';
    state.board = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    state.result = '';
    $(".table-game a").html('&nbsp;');
}







