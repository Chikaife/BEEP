
let firstCard
let secondCard
let sum = 0
let hasBlackJack = false
let isAlive = false
let roundStarted = false
let payoutClaimed = false

let instruction = document.querySelector("#display")
let playerCard = document.querySelector("#cards")
let cardSum = document.querySelector("#sums")
let money = document.querySelector("#cash")

let balance = Number(money.textContent.replace(/,/g, ""))

let roundCost = 200000
let drawCost = 100000
let price = 2100000

let cards = []

function updateBalance() {
    money.textContent = balance.toLocaleString("en-US")
}

updateBalance()

function getRandomCard() {
    return Math.floor(Math.random() * 13) + 1
}

function startGame() {
    if (roundStarted && isAlive) {
        instruction.textContent = "Finish your current round first."
        return
    }

    if (balance < roundCost) {
        alert("Insufficient balance. Please fund your account.")
        return
    }

    balance -= roundCost
    updateBalance()

    firstCard = getRandomCard()
    secondCard = getRandomCard()

    cards = [firstCard, secondCard]
    sum = firstCard + secondCard

    hasBlackJack = false
    isAlive = true
    roundStarted = true
    payoutClaimed = false

    renderGame()
}

function drawNewCard() {
    if (!roundStarted || !isAlive) {
        instruction.textContent = "Start a game first."
        return
    }

    if (balance < drawCost) {
        alert("Insufficient balance. Please fund your account.")
        return
    }

    balance -= drawCost
    updateBalance()

    let newCard = getRandomCard()

    cards.push(newCard)
    sum += newCard

    renderGame()
}

function renderGame() {
    playerCard.textContent = cards.join(", ")
    cardSum.textContent = sum

    if (sum < 21) {
        instruction.textContent =
            "Your sum is " + sum + ". Do you want to draw a new card?"
    } else if (sum === 21) {
        instruction.textContent = "BEEP! You won!"
        hasBlackJack = true
        isAlive = false
        awardPayout()
    } else {
        instruction.textContent = "You lost!"
        isAlive = false
    }
}

function awardPayout() {
    if (payoutClaimed) {
        return
    }

    balance += price
    updateBalance()
    payoutClaimed = true
}

function newGame() {
    cards = []
    sum = 0
    hasBlackJack = false
    isAlive = false
    roundStarted = false
    payoutClaimed = false

    instruction.textContent = "Wanna play a new round?"
    playerCard.textContent = ""
    cardSum.textContent = ""
}
