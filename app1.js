const numberFactList = document.querySelector('.facts-list')
const numbersBaseURL = 'http://numbersapi.com'
const favNumber = 55;

const favNumbers = [66, 666, 6666]

// 1
async function getFact(favoriteNumber) {

    let fact = await axios.get(`${numbersBaseURL}/${favNumber}?json`);
    return fact.data.text

}

// 2
async function getAndPrintMany(favoriteNumbers) {

    let facts = [];

    for (let number of favoriteNumbers) {
        let fact = await axios.get(`${numbersBaseURL}/${favNumber}?json`);
        facts.push(fact.data.text)
    }

    for (let fact of facts) {
        console.log(fact)
    }
}

// 3
async function addFactsToPage(favoriteNumber, numberOfFacts) {

    let facts = [];

    for (
        let i = 0;
        i < numberOfFacts;
        i++
    ) {
        fetchedFact = await getFact(favoriteNumber);
        facts.push(fetchedFact)
    }

    facts.forEach(fact => {

        newListItem = document.createElement('li');
        newListItem.innerText = fact;
        numberFactList.appendChild(newListItem)

    })

}

async function start() {

    let singleToPrint = await getFact(favNumber)
    console.log(singleToPrint)
    getAndPrintMany(favNumbers)
    addFactsToPage(favNumber, 4)

}

start()