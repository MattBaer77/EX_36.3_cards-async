// Global Variables
const drawButton = document.querySelector('.draw-button');
const cardArea = document.querySelector('.card-area');
const cardsBaseURL = 'https://deckofcardsapi.com/api/deck';
let pageDeckId;
let previousOffset=0;

// Create Card HTML
function createCardHTML(imgSrc, offset) {

    const newCard = document.createElement('img')
    newCard.classList.add('card')
    newCard.src = imgSrc
    newCard.style.translate = `0px ${offset}px`

    return newCard

}

async function shuffleReturnDeckID() {
    const deck = await axios.get(`${cardsBaseURL}/new/shuffle`);
    return deck.data.deck_id
}

function stringFromCard(res) {

    return `${res.data.cards[0].value} of ${res.data.cards[0].suit}`

}

// 1
async function getSingle(deckId) {

    const res = await axios.get(`${cardsBaseURL}/${deckId}/draw`);

    return res

}

// 2
async function getMultiple(deckId, numberToGet) {
    
    const cards = [];

    for (
        let i = 0;
        i < numberToGet;
        i++
    ) {
        const fetchedCard = await getSingle(deckId)
        cards.push(fetchedCard)
    }

    return cards
}

async function start() {

    const deckId = await shuffleReturnDeckID()
    const singleCard = await getSingle(deckId)
    const singleCardString = stringFromCard(singleCard)
    console.log(singleCardString)

    const deck2Id = await shuffleReturnDeckID()
    const multipleCards = await getMultiple(deck2Id, 2)
    for (let card of multipleCards) {console.log(stringFromCard(card))}

    pageDeckId = await shuffleReturnDeckID()

    // Event Listener for button click.
    drawButton.addEventListener('click', async (e) => {

        let fetchedCard = await getSingle(pageDeckId)

        let imgSrc = fetchedCard.data.cards[0].image;
        let offset = previousOffset + 60;

        let newCard = createCardHTML(imgSrc,offset);
        cardArea.appendChild(newCard);
        previousOffset = offset;

        if (fetchedCard.data.remaining === 0) {
            drawButton.style.display = "none"
        }

    })

    drawButton.style.display="block"

}

start()