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
        })
        .catch((err) => {
            console.log(err);
        });

    // Dialog Popover
    document.getElementById('card').addEventListener('click', openDialog);
}

function openDialog(ev) {
    if (ev.target.closest('.card')) {
        const dialog = ev.target.closest('.card').querySelector('#cardDialog');
        dialog.showModal();
        let btn = dialog.querySelector('.btnClose');
        btn.addEventListener('click', closeDialog);
    }
}

function closeDialog(ev) {
    const dialog = ev.target.closest('dialog');
    dialog.close();
    ev.stopPropagation();
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
        })
        .catch((err) => {
            console.log(err);
        });
}

window.addEventListener("DOMContentLoaded", init);
