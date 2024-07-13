import { cardItem } from "./card.js";

function init() {
    console.log("Fetching Mojito Cocktail API")
    const cards = document.getElementById("card");
    let randomUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito`;
    fetch (randomUrl)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Something ain't right dog");
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

(()=> {
    document.getElementById("findButton").addEventListener("click", searchHandle);
})();

let inputError = document.getElementById("inputError");

function searchHandle(ev) { 
    ev.preventDefault();
    console.log("nameFind function triggered");
    inputError.textContent = `` ;
    let userInput = document.getElementById("cocktailInput").value.trim();
    document.getElementById("cocktailInput").value="";
    if (userInput) {
        findCocktail(userInput);
    }
    else {
        inputError.textContent = 'Please enter a real cocktail name.';
    }
}

function findCocktail(userInput) {

    console.log("Fetching from API")
    let cards = document.getElementById("card");
    cards.innerHTML = "";
    let url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`;
    fetch (url)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Something ain't right dog");
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