import { cardItem} from "./card.js";

function init() {




     // ––––––––––––––––––––––––––––––––––– GLOBAL VARIABLES ––––––––––––––––––––––––––––––––––––––– //

    let cards = document.getElementById("card");
    let faveList = JSON.parse(localStorage.getItem("Favourites")) || [];
    let inputError = document.getElementById("inputError");




    // ––––––––––––––––––––––––––––––––––– HOME SCREEN CARDS ––––––––––––––––––––––––––––––––––––––– //

    homeLoad();

    function homeBtn(ev) {
        ev.preventDefault();
        homeLoad();
    };

    (() => {
        document.getElementById('home-btn').addEventListener("click", homeBtn);
    })();
    
    function homeLoad(){
        console.log("Fetching Mojito Cocktail API");
        let randomUrl = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=mojito`;
        fetch(randomUrl)
        .then((res) => {
            if (!res) {
                throw new Error("Error with initial API fetch");
            }
            return res.json();
        })
        .then((data) => {
            if (data.drinks) {
                let df = new DocumentFragment();
                data.drinks.forEach(drink => {
                    let card = document.createElement("div");
                    card.dataset.drink = JSON.stringify(drink);
                    card.dataset.id = drink.idDrink;
                    card.dataset.toggle = false;
                    card.classList.add("card");
                    card.innerHTML = cardItem(drink);
                    df.append(card);
                });
                
                cards.innerHTML = "";
                cards.appendChild(df);

                document.querySelector('#cards').addEventListener('click', openDialog);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }




    // ––––––––––––––––––––––––––––––––––– SEARCH FUNCTIONALITY ––––––––––––––––––––––––––––––––––––– //

    function findCocktail(userInput) {
        console.log("Fetching from API");
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
                if (data.drinks==null) {
                     inputError.textContent = "No cocktails found with that name. Please try again."
                } else {
                cards.innerHTML = "";
                data.drinks.forEach(drink => {
                    let card = document.createElement("div");
                    card.classList.add("card");
                    let cardInfo = cardItem(drink);
                    card.dataset.drink = JSON.stringify(drink);
                    card.dataset.id = drink.idDrink;
                    card.dataset.toggle = false;
                    card.innerHTML = cardInfo;
                    df.append(card);
                });
                cards.innerHTML = "";
                cards.appendChild(df);

                document.querySelector('#cards').addEventListener('click', openDialog);
              
            }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function searchHandle(ev) {
        ev.preventDefault();
        inputError.textContent = ``;
        let userInput = document.getElementById("cocktailInput").value.trim();
        document.getElementById("cocktailInput").value = "";
        if (userInput) {
            findCocktail(userInput);
        } else {
            inputError.textContent = 'Please enter a real cocktail name.';
        }
    }

    (() => {
        document.getElementById("findButton").addEventListener("click", searchHandle);
    })();




    // ––––––––––––––––––––––––––––––––––––– CARD POPUP DIALOG –––––––––––––––––––––––––––––––––––––– //

    function openDialog(ev) {
        if (ev.target.closest('.card')) {
            let cardInfo = ev.target.closest('.card');
            let imgSrc = cardInfo.querySelector('img').getAttribute('src');
            let drink = cardInfo.dataset.drink;
            let id = cardInfo.dataset.id;
            let toggle = cardInfo.dataset.toggle;
            let dialog = document.getElementById('cardDialog');
            let cardName = cardInfo.querySelector('h2').textContent;
            let btn = dialog.querySelector('.btnClose');
            let faveBtn = dialog.querySelector('.cardData');
            dialog.querySelector('img').setAttribute('src', imgSrc);
            dialog.querySelector('.cardData').setAttribute('data-drink', drink);
            dialog.querySelector('.cardData').setAttribute('data-id', id);
            dialog.querySelector('.cardData').setAttribute('data-toggle', toggle);
            dialog.querySelector('h3').textContent = cardName;
            
            console.log(toggle);
   
            if (toggle === 'false') {
                faveBtn.classList.remove('bg-red-600', 'hover:bg-red-500');
                faveBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
                faveBtn.textContent = 'Add to favourites';
                faveBtn.addEventListener('click', addFave);
            } else if (toggle === 'true') {
                faveBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
                faveBtn.classList.add('bg-red-600', 'hover:bg-red-500');
                faveBtn.textContent = 'Remove';
                faveBtn.addEventListener('click', removeFave);
            }

            btn.addEventListener('click', closeDialog);
            dialog.showModal();
            // attachMoreLessListeners(dialog);
        }
    }

    function closeDialog(ev) {
        let dialog = ev.target.closest('dialog');
        dialog.close();
        ev.stopPropagation();

        
    }




    // –––––––––––––––––––––––––––––––––– FAVOURITES FUNCTIONALITY –––––––––––––––––––––––––––––––––– //


    function addFave(ev) {
        ev.preventDefault();
        let addData = ev.target.closest('.cardData').dataset.drink;
        let toggle = ev.target.closest('.cardData').dataset.toggle;
        let faveBtn = ev.target.closest('.cardData');

        try {
            let parsedValue = JSON.parse(addData);
            let exists = faveList.some(fave => JSON.stringify(fave) === JSON.stringify(parsedValue));
           
            if (!exists) {
                faveList.push(parsedValue);
                localStorage.setItem("Favourites", JSON.stringify(faveList));
                console.log('fave added');
                toggle = 'true';
                faveBtn.classList.add('bg-red-600', 'hover:bg-red-500');
                faveBtn.textContent = 'Remove';
          
            } else {
                console.log("Drink already in favourites");
                toggle = 'true';
            }
        } catch (err) {
            console.error("Invalid JSON string", err);
        }
    
    };

    function removeFave(ev) {
        ev.preventDefault();
        let addData = ev.target.closest('.cardData').dataset.drink;
        let toggle = ev.target.closest('.cardData').dataset.toggle;
        let faveBtn = ev.target.closest('.cardData');

        try {
            let parsedValue = JSON.parse(addData);
            let exists = faveList.some(fave => JSON.stringify(fave) === JSON.stringify(parsedValue));
           
            if (exists) {
                faveList.parse(parsedValue);
                localStorage.removeItem("Favourites", JSON.stringify(faveList));
                console.log('fave removed');
                toggle = 'false';
                faveBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
                faveBtn.textContent = 'Add to favourites';
          
            } else {
                console.log("Drink is not in favourites");
                toggle = 'false';
            }
        } catch (err) {
            console.error("Invalid JSON string", err);
        }
    
    };


    // function findFaves(ev) {
    //     ev.preventDefault();
    //     console.log("findFaves function triggered");
    //     let df = new DocumentFragment();
    //     cards.innerHTML = "";
    //     faveList.forEach(drink => {
    //         let card = document.createElement("div");
    //         card.classList.add("card");
    //         let cardInfo = cardItem(drink);
    //         card.innerHTML = cardInfo;
    //         df.append(card);
    //     });
    //     cards.innerHTML = "";
    //     cards.appendChild(df);
    //     document.querySelector('#cards').addEventListener('click', openDialog);
    // };

    // (() => {
    //     document.getElementById("findFaves").addEventListener("click", findFaves);
    // })();

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


    // MORE/LESS FUNCTIONALITY

    // function attachMoreLessListeners(container = document) {
    //     console.log(container);
    //     let more = container.querySelector('.more')
    //         console.log(more);
    //         more.addEventListener('click', moreText);
    // }

    // function moreText () {
    //     let instructionsElem = this.parentElement;
    //     console.log(instructionsElem)
    //     let fullText = instructionsElem.getAttribute('data-full-text');
    //     instructionsElem.innerHTML = `${fullText} <span class="text-blue-500 cursor-pointer less">less...</span>`;
    //     attachLessListener(instructionsElem.querySelector('.less'));
    // };

    // function attachLessListener(less) {
    //     less.addEventListener('click', function () {
    //         let instructionsElem = this.parentElement;
    //         let fullText = instructionsElem.getAttribute('data-full-text');
    //         let maxLength = 100;
    //         let truncatedText = fullText.substring(0, maxLength) + '...';
    //         instructionsElem.innerHTML = `${truncatedText} <span class="text-blue-500 cursor-pointer more">more...</span>`;
    //         attachMoreLessListeners(instructionsElem);
    //     });
    // }


    // (() => {
    //     document.getElementById('remFave').addEventListener("click", removeFave);
    // })();

    
}

window.addEventListener("DOMContentLoaded", init);
