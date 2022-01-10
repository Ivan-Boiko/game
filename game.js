(() => {

const container = document.querySelector('#game');
let gameTimer = NaN;
const btn = document.querySelector('.btn');

function createCard () {
  const divCard = document.createElement('div')

  divCard.classList.add('div-card')

  return divCard
}

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array
}

function modalOpen() {
  const modal = document.querySelector('.modal')

  modal.classList.add("modal-active")

 setTimeout(() => {
    modal.classList.remove("modal-active")
  }, 3000);
}

function removeCard () {
  let divCardMass = document.querySelectorAll('.div-card')

  divCardMass.forEach((es) => {
    es.remove();
  })
}

function createGame() {

  const AMOUNT_CARD = 16;
  const massNumber = [];
  const divCard = [];
  const cards = [];
  const temp = [];

  for (let c = 1; c <= 8; c++) {
    massNumber.push(c)
    massNumber.push(c)
  }

  shuffle(massNumber)


for (let i = 0; i < AMOUNT_CARD; i++) {

    const divElem = createCard();

    divCard.push(divElem);
    container.append(divElem);

    divElem.addEventListener('click', function (e) {
    if(e.target.classList.contains('div-card-open')) return;
    let index = divCard.findIndex(el => el === e.target)
    let showNumber = divElem.textContent = massNumber[index];

    e.currentTarget.classList.add('div-card-open');
    temp.push(showNumber)
    cards.push(divElem)


    if(cards.length === 2) {
      const cardActive = [...cards];
      if(temp[0] === temp[1]) {
        cardActive.forEach((es) => {
            es.classList.add('active')
            });
        }
        else {
          setTimeout(() => {
            cardActive.forEach((es) => {
                es.classList.remove('div-card-open')
                es.textContent = "";
            })
          }, 1000);
        }
        temp.length = 0;
        cards.length = 0
        const activeCard = document.querySelectorAll(".active");
        let activeCardMass = [];

        activeCard.forEach((e) => {
        activeCardMass.push(e)

         if (activeCardMass.length === AMOUNT_CARD) {
          modalOpen();

          clearInterval(gameTimer);

          btn.disabled = false;
          }
        })
      }

    })
    }
}

function starGame () {

    const timer = document.querySelector('.timer')
    let timerNumber = Number(timer.textContent = "50")
    const starTimer = timerNumber;

    btn.addEventListener('click' , function() {
    removeCard();

    createGame();

    timer.textContent = starTimer;
    timerNumber = starTimer;

    btn.disabled = true;

      gameTimer = setInterval(() => {
         timer.textContent = timerNumber--

         if(timerNumber === -2) {
          timer.textContent = 0;

          clearInterval(gameTimer)

          if(confirm('Время вышло! Вы проиграли!! Хотите попробовать еще?')) {
            removeCard();
            btn.disabled = false;
            timer.textContent = starTimer;
            timerNumber = starTimer;
          }

        }
       }, 1000);

    })

}

starGame()

})();
