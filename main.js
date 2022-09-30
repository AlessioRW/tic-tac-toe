let board = '012345678'
let playsMade = 0
let counters = ['X','O']
let score = [0,0]
let gameOver = false
let funMode = false
let botPlaying = false
const statusText = document.getElementById('status')
const resetButton = document.getElementById('reset-button')
const scoreX = document.getElementById('score-X')
const scoreY = document.getElementById('score-Y')
const turnText = document.getElementById('turn')
const body = document.getElementById('body')
resetButton.hidden = true


function checkWin(board){
    for (i=0;i<2;i++){
        counter = counters[i]
        expression = new RegExp('\\bx{3}|.{3}x{3}.{3}|x{3}\\b|x.{2}x.{2}x|x.{3}x.{3}x|.{2}x.x.x.{2}'.replaceAll('x',counter))
        if (expression.test(board)){
            return counter
        }
    }
    return false
}

function play(cell){
    cellElement = document.getElementById(cell)
    if (cellElement.innerText === '' && gameOver === false){
        cellElement.innerText = counters[playsMade%2]
        board = board.replace(cell,counters[playsMade%2])
        playsMade += 1

        winner = checkWin(board)
        if (winner != false){
            statusText.innerText = `${winner} has won!`
            gameOver = true
            resetButton.hidden = false
            updateScore(winner)
            if (funMode){
                for (i=0; i<9;i++){
                    cellElement = document.getElementById(i)
                    cellElement.style.backgroundImage = "url('images/clapping.gif')"
                }
            }

        }
        else if (playsMade == 9){
            statusText.innerText = 'It\s a draw!'
            gameOver = true
            resetButton.hidden = false
        }
    }
    turnText.innerText = `Turn: ${counters[playsMade%2]}`
}

function reset(){
    resetButton.hidden = true
    board = '012345678'
    turnText.innerText = 'Turn: X'
    playsMade = 0
    gameOver = false
    statusText.innerText = ''
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
    scoreX.innerText = `X: ${score[0]}`
    scoreY.innerText = `O: ${score[1]}`
}

function resetScore(){
    score = [0,0]
    scoreX.innerText = `X: ${score[0]}`
    scoreY.innerText = `O: ${score[1]}`
}

function funButton(){
    if (funMode){
        funMode = false
        document.getElementById('fun-button').innerText = 'Fun Mode: Off'
    }
    else{
        funMode = true
        document.getElementById('fun-button').innerText = 'Fun Mode: On'
    }
}
