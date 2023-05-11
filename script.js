const gameClass = document.querySelector('.game');
let imageIndex = 0;
const images = [
    "img/head.png",
    "img/body.png",
    "img/hand-left.png",
    "img/hand-right.png",
    "img/foot-left.png",
    "img/foot-right.png",
];
let formedWord = [];

function raffleWord(){
    const raffle = Math.floor(Math.random() * 78)

    fetch('palavras.json').then((e) => e.json()).then((word) => {
        game(word.palavras[raffle])
    });
}

function game(word){
    const buttons = document.querySelectorAll('.buttons');
    const wordForca = word;

    for(let i = 0; i < wordForca.length; i++){
        createSpan(wordForca[i])
    }

    const letters = document.querySelectorAll('.letters');

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            if(wordForca.indexOf(button.value) >= 0){
                button.disabled = true;
                button.style.background = '#0ed145';

                for(let i = 0; i < wordForca.length; i++){
                    if(wordForca[i] === button.value){
                        letters[i].innerHTML = button.value;
                        formedWord.push(button.value);
                    }
                }

                if(formedWord.length === letters.length){
                    checkWin('win');
                }
            } else {
                button.disabled = true;
                button.style.background = '#ec1c24';

                createImage();

                if(imageIndex > 5){
                    checkWin('defeat', word);
                }
            }
        });
    });
}

function createSpan(){
    const span = document.createElement('span');
    span.setAttribute('class', 'letters');

    gameClass.appendChild(span);
    span.innerHTML = '';
}

function createImage(){
    const imgForca = document.querySelector('.img-forca');
    const img = document.createElement('img');
    img.setAttribute('class', 'images');
    img.src = images[imageIndex];
    imgForca.appendChild(img);
    imageIndex++
}

function checkWin(check, word){
    const screenMessage = document.querySelector('.screen-message');
    const container = document.querySelector('.container');
    const message = document.querySelector('#message');
    const time = 2000;

    screenMessage.classList.add('active');
    container.style.opacity = '0.2';

    if(check === 'win'){
        message.innerHTML = 'Parabéns!! 👏👏';
    } else {
        message.innerHTML = `A palavra era <br> "${word}"`;
    }

    setTimeout(() => {
        location.reload();
    }, time);
}

raffleWord();