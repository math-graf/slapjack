let playerCards = []
let opponentCards = []
let discardCards = []

const cardItems = document.querySelectorAll('.discard-pile > div')
const playerSide = document.querySelector('.player-side')
const discardPile = document.querySelector('.discard-pile')
const cardsLeftPlayer = document.querySelector('.player-cards')
const cardsLeftOpponent = document.querySelector('.opponent-cards')

const functions = {
    shuffle(deck) {

        let currentCard = deck.length
        let randomCard
        let temporaryCard
        
        while (currentCard !== 0) {
            randomCard = Math.floor(Math.random()*currentCard)
            currentCard -= 1
    
            temporaryCard = deck[currentCard]
            deck[currentCard] = deck[randomCard]
            deck[randomCard] = temporaryCard
        }
        return deck
    },
    pickCard(event) {
    
        const target = event.target.id
        let card = []
    
        if (target === 'player') {
            functions.opponentFace('thoughtful')
            console.log('You played')
            card = playerCards[0]
            discardCards.push(card)
            playerCards.splice(0, 1)
    
        } else if (target === 'opponent') {
            console.log('Opponent played')
            card = opponentCards[0]
            discardCards.push(card)
            opponentCards.splice(0, 1)
        }
    
        functions.calculateCards()
    
        let suit = card.substring(1, 2)
        let number = card.substring(0, 1)
    
        if (card.length == 3) {
            number = card.substring(0, 2)
            suit = card.substring(2, 3)
        }
    
        for (let i = 0; i < cardItems.length; i++) {
            
            let suitSymbol
            let suitColor
    
            if (i == 0 || i == 2) {
                cardItems[i].classList.remove('red')
                cardItems[i].classList.remove('black')
                switch (suit) {
                    case 'H': {
                        cardItems[i].innerText = number + '\n' + '♥'
                        cardItems[i].classList.add('red')
                        break
                    } case 'S': {
                        cardItems[i].innerText = number + '\n' + '♠'
                        cardItems[i].classList.add('black')
                        break
                    } case 'D': {
                        cardItems[i].innerText = number + '\n' + '♦'
                        cardItems[i].classList.add('red')
                        break
                    } default: {
                        cardItems[i].innerText = number + '\n' + '♣'
                        cardItems[i].classList.add('black')
                    }
                }
            } else {
                
                if (Number(number)) {
    
                    for (let x = 0; x < number; x++) {
                        
                        switch (suit) {
                            case 'H': {
                                suitSymbol = '♥'
                                suitColor = 'red'
                                break
                            } case 'S': {
                                suitSymbol = '♠'
                                suitColor = 'black'
                                break
                            } case 'D': {
                                suitSymbol = '♦'
                                suitColor = 'red'
                                break
                            } default: {
                                suitSymbol = '♣'
                                suitColor = 'black'
                            }
                        }
                        cardItems[i].innerHTML = ''
                        const symbolContainer = document.createElement('div')
                        symbolContainer.innerText = suitSymbol
                        symbolContainer.className = suitColor
                        cardItems[i].appendChild(symbolContainer)
                    }
    
                } else if (!Number(number)) {
    
                    switch (number) {
                        case 'J':
                            suitSymbol = `🤵`
                            break
                        case 'Q':
                            suitSymbol = `👸`
                            break
                        case 'K':
                            suitSymbol = `🤴`
                            break
                        default:
                        switch (suit) {
                            case 'H':
                                suitSymbol = '♥'
                                suitColor = 'red'
                                break
                            case 'S':
                                suitSymbol = '♠'
                                suitColor = 'black'
                                break
                            case 'D':
                                suitSymbol = '♦'
                                suitColor = 'red'
                                break
                            default:
                            suitSymbol = '♣'
                            suitColor = 'black'
    
                        }
                    }
                    cardItems[i].innerHTML = ''
                    const symbolContainer = document.createElement('div')
                    symbolContainer.innerText = suitSymbol
                    symbolContainer.className = suitColor
                    cardItems[i].appendChild(symbolContainer)
                }
            }
        }
        if (number < 4) {
            cardItems[1].style.flexFlow = 'column wrap'
        }
    
        if (discardCards.length != 0) {
            discardPile.style.visibility = 'visible'
        } else if (discardCards.length == 0) {
            discardPile.style.visibility = 'hidden'
        }
        functions.opponentAI(target)
    },
    opponentAI(lastPlayer) {
        const reactionTime = Math.floor(Math.random()*(1400 - 900) + 900)
        window.clearTimeout(reaction)
        reaction = window.setTimeout(() => {
            if (discardCards.length > 0 && discardCards[discardCards.length - 1].includes('J')) {
                console.log('Slap!')
                functions.slap()
            } else if (lastPlayer === 'player') {
                let event = new Object
                event.target = new Object
                event.target.id = 'opponent'
                functions.pickCard(event)
            }
        }, reactionTime)
    },
    slap(event) {

        let currentPlayer
        
        if (event !== undefined) {
            currentPlayer = 'player'
        } else {
            currentPlayer = 'opponent'
        }
    
        if (discardCards.length > 0 && discardCards[discardCards.length - 1].includes('J')) {
            discardPile.style.visibility = 'hidden'
            if (currentPlayer === 'player') {
                functions.opponentFace('disappointed')
                playerCards = playerCards.concat(functions.shuffle(discardCards))
                console.log(playerCards)
                window.clearTimeout(reaction)
            } else if (currentPlayer === 'opponent') {
                functions.opponentFace('happy')
                opponentCards = opponentCards.concat(functions.shuffle(discardCards))
                functions.opponentAI('player')
            }
            discardCards = []
        } else if (discardCards.length > 0 && !discardCards[discardCards.length - 1].includes('J')) {
            discardPile.style.visibility = 'hidden'
            functions.opponentFace('happy')
            opponentCards = opponentCards.concat(functions.shuffle(discardCards))
            functions.opponentAI('player')
        }
        functions.calculateCards()
    },
    opponentFace(mood) {
        const face = document.querySelector('.opponents-face')
        const time = Math.floor(Math.random() * ( 2000 - 1000) + 1000)
        
        if (mood == 'happy') {
            face.innerText = '😆'
        } else if (mood == 'angry') {
            face.innerText = '😠'
        } else if (mood == 'disappointed') {
            face.innerText = '😒'
        } else if (mood == 'thoughtful') {
            face.innerText = '🤨'
        }
    
        setTimeout(() => {
           face.innerText = '🙂' 
        }, time);
    },
    calculateCards() {
        cardsLeftPlayer.innerText = playerCards.length
        cardsLeftOpponent.innerText = opponentCards.length
    }
}

for (let i = 0; i < 4; i++) {
    // Hearts, diamonds, spades, club
    let naipe

    switch (i) {
        case 0:
            naipe = 'H'
            break
        case 1:
            naipe = 'D'
            break
        case 2:
            naipe = 'S'
            break
        default:
            naipe = 'C'
    }

    for (let x = 1; x <= 13; x++) {

        switch (x) {
            case 1:
                discardCards.push('A' + naipe)
                break
            case 11:
                discardCards.push('J' + naipe)
                break
            case 12:
                discardCards.push('Q' + naipe)
                break
            case 13:
                discardCards.push('K' + naipe)
                break
            default:
                discardCards.push(x + naipe)
        }
    }
}

functions.shuffle(discardCards)

for (let i = 0; i < 52; i++) {

    if (i % 2 == 0) {
        playerCards.push(discardCards[i])
    } else if (i % 2 != 0) {
        opponentCards.push(discardCards[i])
    }
    functions.calculateCards()
}

discardCards = []

let reaction

playerSide.addEventListener('click', functions.pickCard)
discardPile.addEventListener('click', functions.slap)