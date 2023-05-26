const numberFactList = document.querySelector('.facts-list')
const numbersBaseURL = 'http://numbersapi.com'
const favNumber = 55;

// 1
axios.get(`${numbersBaseURL}/${favNumber}?json`)
.then(data => {
    console.log(data);
})

// 2

const favNumbers = [66, 666, 6666]
axios.get(`${numbersBaseURL}/${favNumbers}?json`)
.then(data => {
    console.log(data);
})

// 3
Promise.all(
    Array.from ({ length: 4 }, () => {
    return axios.get(`${numbersBaseURL}/${favNumber}?json`);
})
).then(facts => {
    facts.forEach(data => {

        console.log(data)

        newListItem = document.createElement('li')
        newListItem.innerText = data.data.text
        numberFactList.appendChild(newListItem)

    })

});
