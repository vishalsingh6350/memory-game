const card = document.querySelectorAll('.card');
const backface = document.querySelectorAll('.backSide')
const cardConainer = document.querySelector('.cards-container')
const backgroundImages = ['001-bullbasaur', '002-jigglypuff', '003-meowth', '004-pikachu', '005-charmander', '006-snorlax', '001-bullbasaur', '002-jigglypuff', '003-meowth', '004-pikachu', '005-charmander', '006-snorlax']
const shuffledBackgroundImages = backgroundImages.sort(() => Math.random() - 0.5);
// console.log(shuffledBackgroundImages)
let i = 0;
backface.forEach(item => {
    let img = document.createElement('img');
    img.setAttribute('src', 'images/' + shuffledBackgroundImages[i] + '.png')
    item.appendChild(img);
    i++;
})

let clickedCards = []
let cardsLeft = 6;
let date = new Date();
let enteredHour = date.getHours();
let enteredMinute = date.getMinutes();
let enteredSecond = date.getSeconds();
console.log("entered times are as follows")
console.log(enteredHour)
console.log(enteredMinute)
console.log(enteredSecond)
card.forEach(item => {
    item.addEventListener('click', (e) => {
        e.target.style.transform = 'rotateY(180deg)';
        // console.log(e.target.closest('.card'))
        console.log(clickedCards.length)
        if (clickedCards.length < 2) {
            clickedCards.push(e.target.children[0].children[0]);
        }
        // console.log(clickedCards[0].src)
        // console.log(clickedCards[0].parentElement.parentElement)
        if (clickedCards.length === 2) {
            // =====================================================================================================================================this will handle the case in which the user clicks the same element twice in succession which will lead to same element being in the clicked cards array==============================================================================================================================
            if (clickedCards[0].closest('.card').classList[1] === clickedCards[1].closest('.card').classList[1]) {
                clickedCards[0].closest('.card').style.transform = "rotateY(0deg)";
                clickedCards[1].closest('.card').style.transform = "rotateY(0deg)";
                clickedCards = [];
                console.log(clickedCards.length)
            }
            // ==================this will check if the last two cards collected are same or not==================
            if (!(clickedCards[1].src === clickedCards[0].src)) {
                setTimeout(() => {
                    rotateElement(clickedCards[0].parentElement.parentElement)
                    rotateElement(clickedCards[1].parentElement.parentElement)
                    clickedCards = [];
                }, 300)
            } else {
                clickedCards = [];
                cardsLeft--;
            }
        }
        if (cardsLeft == 0) {
            let date = new Date();
            let leftHour = date.getHours();
            let leftMinute = date.getMinutes();
            let leftSecond = date.getSeconds();
            console.log("left time is as follows")
            console.log(leftHour)
            console.log(leftMinute)
            console.log(leftSecond)
            if (leftSecond < enteredSecond) {
                leftMinute--;
                console.log("left Second was less than left Minute so we borrowed from minutes so now minutes left= " + leftMinute);
                leftSecond += 60;
                console.log("left Second is now= " + leftSecond);
            }
            if (leftMinute < enteredMinute) {
                leftHour--;
                console.log("left Minute was less than left Hour so we borrowed from Hour so now Hour left= " + leftHour);
                leftMinute += 60;
                console.log("left Minute is now= " + leftMinute);
            }
            timeElapsedInMinute = leftMinute - enteredMinute;
            timeElapsedInSecond = leftSecond - enteredSecond;
            console.log("congrats you have completed this game in " + timeElapsedInMinute + "minutes and " + timeElapsedInSecond + " seconds")
            setTimeout(() => {
                let newElement = document.createElement('div');
                newElement.setAttribute('class', 'scorecardContainer')
                newElement.innerHTML = `<div class="scoreCard">Congrats!! you have completed this round in <span class="number"> ${timeElapsedInMinute}:${timeElapsedInSecond} minutes</span></div>
                <button onclick="location.reload()">reload</button>`;
                cardConainer.appendChild(newElement);
            }, 500)
        }
    });
})

function rotateElement(item) {
    item.style.transform = "rotateY(0deg)";
}

// setTimeout(() => {
//     console.log("eventListerner is removed and element is rotated by 180deg")
//     card.style.transform = "rotateY(180deg)"
//     card.removeEventListener('click', rotatingElement)
// }, 5000)