const playerHandP = document.getElementById('player-hand');
const playerScoreP = document.getElementById('player-score');
const dealerHandP = document.getElementById('dealer-hand');
const dealerScoreP = document.getElementById('dealer-score');
const messageP = document.getElementById('message');

const btnHit = document.getElementById('btn-hit');
const btnStand = document.getElementById('btn-stand');
const btnRestart = document.getElementById('btn-restart');



// fonction pour creer le deck des 52 cartes avec leur couleurs et leur valeurs
function createDeck() {
    const labels = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    const suits = ['hearts ♥', 'diamonds ♦', 'spades ♠', 'clubs ♣'];
    const newDeck = [];

    for (let suit of suits) {
        for (let label of labels) {
            newDeck.push({
                label: label,
                suit: suit,
                value: getCardValue(label)
            });
        }
    }

    return newDeck;
}

// fonction pour atribuer une valeur au cartes visage
function getCardValue(label) {
    if (label === "Jack" || label === "Queen" || label === "King") return 10;
    if (label === 'Ace') return 11;
    return parseInt(label)
}


//fonction qui calcul le score
function calculateScore(hand) {
    let total = 0;
    let aceCount = 0;

    for (let card of hand) {
        total += card.value;
        if (card.label === 'A') {
            aceCount++;
        }
    }

    // Si le score dépasse 21 et qu’on a des As, on les fait valoir 1 au lieu de 11
    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount--;
    }

    return total;
}


// foction pour tirer une carte 
function drawCard(deck) {
    let index = Math.floor(Math.random() * deck.length);
    let card = deck[index];
    deck.splice(index, 1); // enlève la carte du deck
    return card;
}

//  variable des mains du dealer et du joeur
let playerHand = [];
let dealerHand = [];



// fonction pour relancer la partie
function restartGame() {
    deck = createDeck();
    playerHand = [];
    dealerHand = [];

    // Donne 2 cartes au joueur, 1 au dealer
    playerHand.push(drawCard(deck));
    playerHand.push(drawCard(deck));

    dealerHand.push(drawCard(deck));

    // Affichage
    updateHandDisplay(playerHand, playerHandP);
    updateHandDisplay(dealerHand, dealerHandP);

    playerScoreP.textContent = "Score : " + calculateScore(playerHand);
    dealerScoreP.textContent = "Score : " + calculateScore(dealerHand);

    // (Plus tard ici : réactiver les boutons, cacher les messages, etc.)
}

//ajoute les cartes dans les mains et met a jour
function updateHandDisplay(hand, element) {
    element.textContent = hand.map(card => `${card.label} of ${card.suit}`).join(' + ');
}


//boutons actions du joeur
document.getElementById('btn-hit').addEventListener('click', () => {
    playerHit()
});

document.getElementById('btn-stand').addEventListener('click', () => {

});

document.getElementById('btn-restart').addEventListener('click', () => {
    restartGame()
});