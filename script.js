const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const cell_element = document.querySelectorAll('[data-cell]')
const board = document.querySelector('[board]')
let winning_container = document.querySelector('[winning-container]')
let winning_message = document.querySelector('[winning-text]')
let restart_button =document.querySelector('[restart-button]')
let circleTurn
let player_one_value = 0
let player_two_value = 0
const player_one = document.querySelector('[player_one]')
const player_two = document.querySelector('[player_two]')
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

restart_button.addEventListener('click', startGame)


startGame()

// Function to allow hover effect onload of the startGame function
function startGame(){
    circleTurn = false
    cell_element.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handler)
    cell.addEventListener('click', handler, {once: true})
    })
    setBoardHoverClass()
    winning_container.classList.remove('show')
}

// OBJECTIVES
// Place mark 💹
// switch turns 💹
// Check for win
// check for draw
// Display scores
// Set timer

function handler(e) {
    const cell = e.target
    const current_class = circleTurn ? CIRCLE_CLASS : X_CLASS

    placeMark(cell, current_class)
    if(checkWin(current_class)){
        console.log('WINNER')
        addScore(current_class)
        endGame(false)
    }else if(isDraw()) {
        console.log('DRAW')
        endGame(true)
    }else{
        swapTurn()
        setBoardHoverClass()
    }
}


function placeMark(cell, current_class) {
    cell.classList.add(current_class)
}
 
function swapTurn() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(current_class) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cell_element[index].classList.contains(current_class)
        })
    })
}

function isDraw() {
    return [...cell_element].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function endGame(draw) {
    if(draw){
        winning_message.innerHTML = 'Draw'
    }else{
        winning_message.innerHTML = `${circleTurn ? "O's" : "X's"} Wins`
    }
    winning_container.classList.add('show')
}


function addScore(current_class) {
    if(current_class == X_CLASS){
        player_one_value++
        player_one.textContent = player_one_value
    }else if(current_class == CIRCLE_CLASS){
        player_two_value++
        player_two.textContent = player_two_value
    }
}