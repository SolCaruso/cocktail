import {
    cardItem
} from "./card.js";

function init() {
    console.log("Fetching Mojito Cocktail API");
    let cards = document.getElementById("card");
    let randomUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito`;
    homeLoad();
    function homeLoad(){
        fetch(randomUrl)
        .then((res) => {
            if (!res) {
                throw new Error("Error with initial API fetch");
            }
            return res.json();
        })
        .then((data) => {
            if (data.drinks) {
                console.log(data);
                let df = new DocumentFragment();
                data.drinks.forEach(drink => {
                let card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = cardItem(drink);
                
                df.append(card);
                });
                
                cards.innerHTML = "";
                cards.appendChild(df);

                document.querySelectorAll('.card').forEach(card => {
                    card.addEventListener('click', openDialog);
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });

    }

    function openDialog(ev) {
        if (ev.target.closest('.card')) {
            let dialog = ev.target.closest('.card').querySelector('#cardDialog');
            dialog.showModal();
            let btn = dialog.querySelector('.btnClose');
            let faveBtn = dialog.querySelector('.faveBtn');
            btn.addEventListener('click', closeDialog);
            faveBtn.addEventListener('click', addFave);
            attachMoreLessListeners(dialog);
        }
    }

    let faveList = [];

    function addFave(ev) {
        ev.preventDefault();
        let faveBtn = ev.target.closest('.faveBtn');
        console.log(faveBtn);
        let addFave = faveBtn.dataset.drink;
        console.log('fave added');
   
        
        if(addFave) {
            faveList.push(JSON.parse(addFave));
            console.log(faveList);
            localStorage.setItem("Favourites", JSON.stringify(faveList));
            faveBtn.classList.add("hidden");
        }
    }

    // function removeFave(ev) {
    //     ev.preventDefault();
    //     let remBtn = ev.target.closest('.remFave');
    //     let remFave = remBtn.dataset.drink;
    //     console.log(remFave);
    //     if(remFave) {
    //         faveList.splice(JSON.parse(remFave));
    //         console.log(faveList);
    //         localStorage.setItem("Favourites", JSON.stringify(faveList));
    //     }
    // }
   
    function closeDialog(ev) {
        let dialog = ev.target.closest('dialog');
        dialog.close();
        ev.stopPropagation();
    }

    function attachMoreLessListeners(container = document) {
        console.log(container);
        let more = container.querySelector('.more')
            console.log(more);
            more.addEventListener('click', moreText);
    }

    function moreText () {
        let instructionsElem = this.parentElement;
        console.log(instructionsElem)
        let fullText = instructionsElem.getAttribute('data-full-text');
        instructionsElem.innerHTML = `${fullText} <span class="text-blue-500 cursor-pointer less">less...</span>`;
        attachLessListener(instructionsElem.querySelector('.less'));
    };

    function attachLessListener(less) {
        less.addEventListener('click', function () {
            let instructionsElem = this.parentElement;
            let fullText = instructionsElem.getAttribute('data-full-text');
            let maxLength = 100;
            let truncatedText = fullText.substring(0, maxLength) + '...';
            instructionsElem.innerHTML = `${truncatedText} <span class="text-blue-500 cursor-pointer more">more...</span>`;
            attachMoreLessListeners(instructionsElem);
        });
    }

    (() => {
        document.getElementById("findButton").addEventListener("click", searchHandle);
    })();

    (() => {
        document.getElementById("findFaves").addEventListener("click", findFaves);
    })();

    (() => {
        document.getElementById('home-btn').addEventListener("click", homeBtn);
    })();

    // (() => {
    //     document.getElementById('remFave').addEventListener("click", removeFave);
    // })();



    function homeBtn(ev) {
        ev.preventDefault();
        homeLoad();
    };

    function findFaves(ev) {
        ev.preventDefault();
        console.log("findFaves function triggered");
        let df = new DocumentFragment();
        cards.innerHTML = "";
        faveList.forEach(drink => {
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
    };

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
                if (data.drinks==null) {
                     inputError.textContent = "No cocktails found with that name. Please try again."
                } else {
                cards.innerHTML = "";
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
            }
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


window.addEventListener("DOMContentLoaded", init);
