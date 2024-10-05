import { cardItem } from "./card.js";

function init() {
  // ––––––––––––––––––––––––––––––––––– GLOBAL VARIABLES ––––––––––––––––––––––––––––––––––––––– //

  let cards = document.getElementById("card");
  let faveList = JSON.parse(localStorage.getItem("Favourites")) || [];
  let inputError = document.getElementById("inputError");

  // ––––––––––––––––––––––––––––––––––– HOME SCREEN CARDS ––––––––––––––––––––––––––––––––––––––– //
  document.getElementById("findButton").addEventListener("click", searchHandle);
  document.getElementById("findFaves").addEventListener("click", findFaves);

  homeLoad();

  function homeBtn(ev) {
    ev.preventDefault();
    homeLoad();
  }

  (() => {
    document.getElementById("home-btn").addEventListener("click", homeBtn);
  })();

  function homeLoad() {
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
          data.drinks.forEach((drink) => {
            let card = document.createElement("div");
            let id = card.dataset.id;
            let drinkData = card.dataset.drink;
            let toggle = card.dataset.toggle;

            drinkData = JSON.stringify(drink);
            id = drink.idDrink;

            try {
              let parsedValue = JSON.parse(drinkData);
              let exists = faveList.some(
                (fave) => JSON.stringify(fave) === JSON.stringify(parsedValue)
              );

              if (!exists) {
                toggle = "false";
              } else {
                toggle = "true";
              }
            } catch (err) {
              console.error("Invalid JSON string", err);
            }

            card.setAttribute("data-toggle", toggle);
            card.setAttribute("data-drink", drinkData);
            card.setAttribute("data-id", id);
            card.classList.add("card");
            card.innerHTML = cardItem(drink);
            df.append(card);
            console.log(toggle);
          });

          cards.innerHTML = "";
          cards.appendChild(df);

          document
            .querySelector("#cards")
            .addEventListener("click", openDialog);
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
        if (data.drinks == null) {
          inputError.textContent =
            "No cocktails found with that name. Please try again.";
        } else {
          cards.innerHTML = "";
          data.drinks.forEach((drink) => {
            let card = document.createElement("div");
            let id = card.dataset.id;
            let drinkData = card.dataset.drink;
            let toggle = card.dataset.toggle;
            drinkData = JSON.stringify(drink);
            id = drink.idDrink;

            try {
              let parsedValue = JSON.parse(drinkData);
              let exists = faveList.some(
                (fave) => JSON.stringify(fave) === JSON.stringify(parsedValue)
              );

              if (!exists) {
                toggle = "false";
              } else {
                toggle = "true";
              }
            } catch (err) {
              console.error("Invalid JSON string", err);
            }

            card.setAttribute("data-toggle", toggle);
            card.setAttribute("data-drink", drinkData);
            card.setAttribute("data-id", id);
            card.classList.add("card");
            card.innerHTML = cardItem(drink);
            df.append(card);
            console.log(toggle);
          });
          cards.innerHTML = "";
          cards.appendChild(df);
          cards.classList.remove("fav");

          document
            .querySelector("#cards")
            .addEventListener("click", openDialog);
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
      inputError.textContent = "Please enter a real cocktail name.";
    }
  }

  //   (() => {
  //     document
  //       .getElementById("findButton")
  //       .addEventListener("click", searchHandle);
  //   })();

  // ––––––––––––––––––––––––––––––––––––– CARD POPUP DIALOG –––––––––––––––––––––––––––––––––––––– //

  function openDialog(ev) {
    if (ev.target.closest(".card")) {
      ev.preventDefault();
      let cardInfo = ev.target.closest(".card");
      let imgSrc = cardInfo.querySelector("img").getAttribute("src");
      let drink = cardInfo.dataset.drink;
      let id = cardInfo.dataset.id;
      let toggle = cardInfo.dataset.toggle;
      let dialog = document.getElementById("cardDialog");
      let cardName = cardInfo.querySelector("h2").textContent;
      let btn = dialog.querySelector(".btnClose");
      let faveBtn = dialog.querySelector(".cardData");

      let drinkData = JSON.parse(drink);

      const maxLength = 100;
      let instructions = drinkData.strInstructions;
      let truncatedInstructions =
        instructions.length > maxLength
          ? instructions.substring(0, maxLength) + "..."
          : instructions;
      let hasMore = instructions.length > maxLength;

      // Populate dialog with data
      dialog.querySelector("img").setAttribute("src", imgSrc);
      dialog.querySelector(".cardData").setAttribute("data-drink", drink);
      dialog.querySelector(".cardData").setAttribute("data-id", id);
      dialog.querySelector(".cardData").setAttribute("data-toggle", toggle);
      dialog.querySelector("h3").textContent = cardName;

      // Instructions
      let instructionsElem = dialog.querySelector(".instructions");
      instructionsElem.setAttribute("data-full-text", instructions);
      instructionsElem.innerHTML = `${truncatedInstructions} ${
        hasMore
          ? '<span class="text-blue-500 cursor-pointer more">more...</span>'
          : ""
      }`;

      // Ingredients
      let ingredientsElem = dialog.querySelector(".ingredients");
      let ingredients = [];
      for (let i = 1; i <= 15; i++) {
        let ingredient = drinkData[`strIngredient${i}`];
        let measure = drinkData[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push(`${measure ? measure : ""} ${ingredient}`);
        }
      }
      ingredientsElem.innerHTML = ingredients.join("<br>");

      console.log(toggle);

      // Toggle button state
      if (toggle === "false") {
        faveBtn.classList.remove("bg-red-600", "hover:bg-red-500");
        faveBtn.classList.add("bg-blue-600", "hover:bg-blue-500");
        faveBtn.textContent = "Add to favourites";
      } else if (toggle === "true") {
        faveBtn.classList.remove("bg-blue-600", "hover:bg-blue-500");
        faveBtn.classList.add("bg-red-600", "hover:bg-red-500");
        faveBtn.textContent = "Remove favourite";
      }

      faveBtn.addEventListener("click", addFave);
      btn.addEventListener("click", closeDialog);
      dialog.showModal();
      attachMoreLessListeners(dialog);
    }
  }

  function closeDialog(ev) {
    ev.preventDefault();
    let dialog = ev.target.closest("dialog");
    dialog.close();

    // ev.stopPropagation();
  }

  // ––––––––––––––––––––––––––––––––––– FAVOURITES FUNCTIONALITY –––––––––––––––––––––––––––––––––– //

  function addFave(ev) {
    ev.preventDefault();
    let addData = ev.target.closest(".cardData").dataset.drink;
    let faveBtn = ev.target.closest(".cardData");
    let id = ev.target.closest(".cardData").dataset.id;
    let allCards = document.querySelectorAll(".card");

    try {
      let parsedValue = JSON.parse(addData);
      let exists = faveList.some(
        (fave) => JSON.stringify(fave) === JSON.stringify(parsedValue)
      );

      if (!exists) {
        faveList.push(parsedValue);
        localStorage.setItem("Favourites", JSON.stringify(faveList));
        console.log("fave added");
        faveBtn.classList.remove("bg-blue-600", "hover:bg-blue-500");
        faveBtn.classList.add("bg-red-600", "hover:bg-red-500");
        faveBtn.textContent = "Remove favourite";
        allCards.forEach((card) => {
          if (card.dataset.id === id) {
            card.dataset.toggle = "true";
          }
        });
        if (cards.classList.contains("fav")) {
          findFaves(ev);
        }
      } else {
        const indexToRemove = faveList.findIndex(
          (item) => item.idDrink === parsedValue.idDrink
        );

        if (indexToRemove !== -1) {
          faveList.splice(indexToRemove, 1);
        }

        localStorage.setItem("Favourites", JSON.stringify(faveList));

        console.log("fave removed");
        faveBtn.classList.remove("bg-red-600", "hover:bg-red-500");
        faveBtn.classList.add("bg-blue-600", "hover:bg-blue-500");
        faveBtn.textContent = "Add to favourites";

        allCards.forEach((card) => {
          if (card.dataset.id === id) {
            card.dataset.toggle = "false";
          }
        });
        //cretae favourite page
        if (cards.classList.contains("fav")) {
          findFaves(ev);
        }
      }
    } catch (err) {
      console.error("Invalid JSON string", err);
    }
  }

  // –––––––––––––––––––––––––––––––––––––– FAVOURITES SEARCH –––––––––––––––––––––––––––––––––––––––– //

  function findFaves(ev) {
    ev.preventDefault();
    console.log("findFaves function triggered");
    cards.innerHTML = "";
    let df = new DocumentFragment();
    faveList.forEach((drink) => {
      let card = document.createElement("div");
      let id = card.dataset.id;
      let drinkData = card.dataset.drink;
      let toggle = card.dataset.toggle;
      drinkData = JSON.stringify(drink);
      id = drink.idDrink;

      try {
        let parsedValue = JSON.parse(drinkData);
        let exists = faveList.some(
          (fave) => JSON.stringify(fave) === JSON.stringify(parsedValue)
        );

        if (!exists) {
          toggle = "false";
        } else {
          toggle = "true";
        }
      } catch (err) {
        console.error("Invalid JSON string", err);
      }

      card.setAttribute("data-toggle", toggle);
      card.setAttribute("data-drink", drinkData);
      card.setAttribute("data-id", id);
      card.classList.add("card");
      card.innerHTML = cardItem(drink);
      df.append(card);
      console.log(toggle);
    });

    cards.innerHTML = "";
    cards.appendChild(df);
    cards.classList.add("fav");
    document.querySelector("#cards").addEventListener("click", openDialog);
  }

  //   (() => {
  //     document.getElementById("findFaves").addEventListener("click", findFaves);
  //   })();

  // ––––––––––––––––––––––––––––––––––– MORE/LESS FUNCTIONALITY –––––––––––––––––––––––––––––––––––––– //

  function attachMoreLessListeners(container = document) {
    let more = container.querySelector(".more");
    if (more) {
      more.addEventListener("click", moreText);
    }
  }

  function moreText() {
    let instructionsElem = this.parentElement;
    let fullText = instructionsElem.getAttribute("data-full-text");
    instructionsElem.innerHTML = `${fullText} <span class="text-blue-500 cursor-pointer less">less...</span>`;
    attachLessListener(instructionsElem.querySelector(".less"));
  }

  function attachLessListener(less) {
    less.addEventListener("click", function () {
      let instructionsElem = this.parentElement;
      let fullText = instructionsElem.getAttribute("data-full-text");
      const maxLength = 100;
      let truncatedText = fullText.substring(0, maxLength) + "...";
      instructionsElem.innerHTML = `${truncatedText} <span class="text-blue-500 cursor-pointer more">more...</span>`;
      attachMoreLessListeners(instructionsElem);
    });
  }
}

window.addEventListener("DOMContentLoaded", init);
