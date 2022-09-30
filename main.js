let board = '012345678';
let playsMade = 0;
let score = [0,0];
let gameOver = false;
let funMode = false;
let botPlaying = false;
const diffucltyCounter = 0;
const counters = ['X','O'];
const difficultyList = ['Easy','Hard'];
document.getElementById('reset-button').hidden = true


function getBestPath(currentBoard,move,movesTested){
    var currentBoard = currentBoard.replace(move.toString(),['O','X'][movesTested%2]);
    var pathScore = 0

    var winner = checkBoard(currentBoard);
    if (winner === 'O'){
        pathScore -= 1;
    }
    else if (winner === 'X'){
        pathScore += 1;
    }

    if ((new RegExp('[0-8]','g')).test(currentBoard) == false || movesTested > [0,10][diffucltyCounter%difficultyList.length]){ // board is full/Difficulty Reached
        return pathScore
    }

    for (var x=0; x<9; x++){
        if (currentBoard.includes(x)){
            var nextPathScore = getBestPath(currentBoard,x,movesTested+1);
            pathScore += nextPathScore;
        }
    }
    return pathScore
    
}

function botMove(){
    let paths = [];
    for (i = 0; i<9; i++){
        if (board.includes(i)){
            let virtualBoard = board; //define temporary board to the checks don't overwrite the real board
            var pathScore = getBestPath(virtualBoard,i,0);
            paths.push({pathNumber:i, score:pathScore})
        }
    }
    let highestScore = Infinity
    bestCell = -1
    paths.forEach(function(path) {
        if (path.score < highestScore){
            highestScore = path.score
            bestCell = path.pathNumber
        }
    });

    return bestCell

}
function checkBoard(board){
    for (var i=0;i<2;i++){
        let counter = counters[i]
        let expression = new RegExp('\\bx{3}|.{3}x{3}.{3}|x{3}\\b|x.{2}x.{2}x|x.{3}x.{3}x|.{2}x.x.x.{2}'.replaceAll('x',counter))
        if (expression.test(board)){
            return counter
        }
    }
    return false
}

function checkWin(){
    winner = checkBoard(board)
    if (winner != false){
        document.getElementById('status').innerText = `${winner} has won!`
        gameOver = true
        document.getElementById('reset-button').hidden = false
        updateScore(winner)
        if (funMode){
            for (i=0; i<9;i++){
                cellElement = document.getElementById(i)
                cellElement.style.backgroundImage = "url('images/clapping.gif')"
            }
        }
        return
    }
    else if (playsMade == 9){
        document.getElementById('status').innerText = 'It\s a draw!'
        gameOver = true
        document.getElementById('reset-button').hidden = false
    }
}

function play(cell){

    var cellElement = document.getElementById(cell)
    if (cellElement.innerText === '' && gameOver === false){
        cellElement.innerText = counters[playsMade%2]
        board = board.replace(cell,counters[playsMade%2])
        playsMade += 1

        checkWin()
    }

    if (counters[playsMade%2] === 'O' && botPlaying === true){
        bestCell = botMove()
        var cellElement = document.getElementById(bestCell)
        cellElement.innerHTML = 'O'
        board = board.replace(bestCell,'O')
        playsMade += 1
        checkWin()
        return
    }
    document.getElementById('turn').innerText = `Turn: ${counters[playsMade%2]}`
}

function reset(){
    document.getElementById('reset-button').hidden = true
    board = '012345678'
    document.getElementById('turn').innerText = 'Turn: X'
    playsMade = 0
    gameOver = false
    document.getElementById('status').innerText = ''
    for (i=0; i<9;i++){
        cellElement = document.getElementById(i)
        cellElement.innerText = ''
        cellElement.style.backgroundImage = "none"
    }
}

function updateScore(winner){
    if (winner === 'X'){
        score[0] += 1
    }
    else{
        score[1] += 1
    }
    document.getElementById('score-X').innerText = `X: ${score[0]}`
    document.getElementById('score-Y').innerText = `O: ${score[1]}`
}

function resetScore(){
    score = [0,0]
    document.getElementById('score-X').innerText = `X: ${score[0]}`
    document.getElementById('score-Y').innerText = `O: ${score[1]}`
}

function toggleFun(){
    if (funMode){
        funMode = false
        document.getElementById('fun-button').innerText = 'Fun Mode: Off'
    }
    else{
        funMode = true
        document.getElementById('fun-button').innerText = 'Fun Mode: On'
    }
}


function toggleBot(){
    if (botPlaying){
        botPlaying = false
        document.getElementById('bot-button').innerText = 'Computer: Off'
    }
    else{
        botPlaying = true
        document.getElementById('bot-button').innerText = 'Computer: On'
    }
}

function toggleDifficulty(){
    diffucltyCounter += 1
    document.getElementById('difficulty-button').innerText = `Difficulty:${difficultyList[diffucltyCounter%difficultyList.length]}`
}
