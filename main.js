import { cardItem } from "./card.js";

function init() {
    console.log("Fetching Mojito Cocktail API");
    const cards = document.getElementById("card");
    let randomUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito`;
    fetch(randomUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error with initial API fetch");
            }
            return res.json();
        })
        .then((data) => {
            let df = new DocumentFragment();
            console.log(data);
            data.drinks.forEach(drink => {
                let card = document.createElement("div");
                card.classList.add("card");
                let cardInfo = cardItem(drink);
                card.innerHTML = cardInfo;
                df.append(card);
            });
            cards.innerHTML = "";
            cards.appendChild(df);

            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', openDialog);
            });

            attachMoreLessListeners();
        })
        .catch((err) => {
            console.log(err);
        });
}

function openDialog(ev) {
    if (ev.target.closest('.card')) {
        const dialog = ev.target.closest('.card').querySelector('#cardDialog');
        const drinkName = card.querySelector('h2').innerText;
        const originalUrl = window.location.href;
        const newUrl = new URL(originalUrl);
        newUrl.searchParams.set('drink',drinkName);

        history.pushState({ drinkName, originalUrl}, '', newUrl.href)
        dialog.showModal();
        let btn = dialog.querySelector('.btnClose');
        btn.addEventListener('click', closeDialog);
        attachMoreLessListeners(dialog);
    }
}

function closeDialog(ev) {
    const dialog = ev.target.closest('dialog');
    dialog.close();
    history.back();
    ev.stopPropagation(); 
}

function attachMoreLessListeners(container = document) {
    container.querySelectorAll('.more').forEach(more => {
        more.addEventListener('click', function() {
            const instructionsElem = this.parentElement;
            const fullText = instructionsElem.getAttribute('data-full-text');
            instructionsElem.innerHTML = `${fullText} <span class="text-blue-500 cursor-pointer less">less...</span>`;
            attachLessListener(instructionsElem.querySelector('.less'));
        });
    });
}

function attachLessListener(less) {
    less.addEventListener('click', function() {
        const instructionsElem = this.parentElement;
        const fullText = instructionsElem.getAttribute('data-full-text');
        const maxLength = 100;
        const truncatedText = fullText.substring(0, maxLength) + '...';
        instructionsElem.innerHTML = `${truncatedText} <span class="text-blue-500 cursor-pointer more">more...</span>`;
        attachMoreLessListeners(instructionsElem); 
    });
}

(() => {
    document.getElementById("findButton").addEventListener("click", searchHandle);
})();

let inputError = document.getElementById("inputError");

function searchHandle(ev) {
    ev.preventDefault();
    console.log("nameFind function triggered");
    inputError.textContent = ``;
    let userInput = document.getElementById("cocktailInput").value.trim();
    document.getElementById("cocktailInput").value = "";
    if (userInput) {
        findCocktail(userInput);
    } else {
        inputError.textContent = 'Please enter a real cocktail name.';
    }
}

function findCocktail(userInput) {
    console.log("Fetching from API");
    let cards = document.getElementById("card");
    cards.innerHTML = "";
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`;
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Error with input cocktail API fetch");
            }
            return res.json();
        })
        .then((data) => {
            let df = new DocumentFragment();
            console.log(data);
            data.drinks.forEach(drink => {
                let card = document.createElement("div");
                card.classList.add("card");
                let cardInfo = cardItem(drink);
                card.innerHTML = cardInfo;
                df.append(card);
            });
            cards.innerHTML = "";
            cards.appendChild(df);

            document.querySelectorAll('.card').forEach(card => {
                card.addEventListener('click', openDialog);
            });

            attachMoreLessListeners();
        })
        .catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", init);


