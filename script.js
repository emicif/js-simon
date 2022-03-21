console.log('JS OK!!');

// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.


const numeriDaIndovinare = 5;


// recupero elementi HTML

const button = document.getElementById('start');
const gameArea = document.getElementById('game-area');


// genero 5 numeri casuali
const numbersToShow = generareNumeri(numeriDaIndovinare);

generareNumeri ();

function generareNumeri (arrayLength) {
    const unique = [];

    while(unique.length < arrayLength) {
            const numero = generateRandomNumber (1, 100);
            if(!unique.includes(numero)) {
                unique.push(numero)
            }
    }
    return unique;  
} 


function generateRandomNumber(min, max) {
    const range = max - min + 1;
    return Math.floor(Math.random()*range) + min;
}


// al click
button.addEventListener('click', () => {
    //appaiono 5 numeri
    gameArea.innerText = numbersToShow.join(' '); // serve per visualizzarle nel testo in modo carino - ma funziona anche senza .join

    //countdown 30sec
    setTimeout(endTimeout, 300);

});


// al termine del countdown
function endTimeout () {
    // i numeri si nascondono
    gameArea.innerText = '';
    // lascio del tempo al browser per renderzzare la pagina
    setTimeout(waitRenderingEnd, 1000);
}
function waitRenderingEnd(){
    // chiesti i 5 num all'utente
    const userNumbers = askNumbers(numeriDaIndovinare);
    console.log(userNumbers);
    showGame(userNumbers);
}

// software comunica
function showGame (userInput) {
    // quali indovinati
    const rightNumbers = [];
    
    for(let i = 0; i<numbersToShow.length; i ++) {
        // recupero il numero che è stato visualizzato
        const number = numbersToShow[i];
        // ciclo i numeri inseriti dall'utente e controllo che presenti nel mio random
        const isPresent = userInput.includes(number);

        // se presente per la prima volta lo metto tra i num giusti
        if (isPresent && !rightNumbers.includes()){
            rightNumbers.push(number);
        }
    }
     // quanti indovinati
    gameArea.innerText = `${rightNumbers.join(' ')}
    Numeri risposte corrette: ${rightNumbers.length}
    `; 
   
       
}

function askNumbers(numbersToAsk) {
    const userNumbers = [];
    let number;
    for (let i = 0; i < numbersToAsk; i++) {
        do {
            number = parseInt(prompt('Che numero hai visto?'));
        } while(isNaN(number));
       userNumbers.push(number);
    }
    return userNumbers;
}