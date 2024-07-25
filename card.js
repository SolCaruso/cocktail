export function cardItem(drink) {
  const maxLength = 100;
  let instructions = drink.strInstructions;
  let truncatedInstructions = instructions.length > maxLength ? instructions.substring(0, maxLength) + '...' : instructions;
  let hasMore = instructions.length > maxLength;

  let ingredients = [];
    for (let i = 1; i <= 15; i++) {
        let ingredient = drink[`strIngredient${i}`];
        if (ingredient) {
            ingredients.push(ingredient);
        } else {
            break;
        }
    }

    let ingredientsList = ingredients.join(', ');

  let cardLayout = `
      <div class="transform transition-transform duration-300 hover:scale-101 hover:-translate-y-1 cursor-pointer md:my-6 card">
          <img class="rounded-2xl w-full" src=${drink.strDrinkThumb} alt=${drink.strDrink}>
          <h2 class="font-bold text-xl flex-wrap text-center sm:text-left px-2 py-4">${drink.strDrink}</h2>
          <dialog id="cardDialog" class='rounded-2xl p-6 shadow-2xl mx-8 sm:mx-auto'>
              <div class='flex flex-col h-full'>
                  <img class="rounded-2xl w-full" src=${drink.strDrinkThumb} alt=${drink.strDrink}>
                  <h3 class="text-center text-xl mt-4 font-bold">${drink.strDrink}</h3>
                  <p class="text-center text-lg pb-4 max-w-2xl mx-auto flex-grow mt-4 instructions" data-full-text="${instructions}">
                      ${truncatedInstructions}
                      ${hasMore ? `<span class="text-blue-500 hover:underline cursor-pointer more">more...</span>` : ''}
                  </p>
                  <p class='font-bold text-gray-600'>Ingredients:</p>
                  <p class='text-gray-600'>${ingredientsList}.</p>
                  <div class="w-full flex justify-center text-center mt-4">
                      <button class="bg-gray-100 px-2 h-9 rounded hover:bg-gray-200 font-bold text-gray-600 w-1/2 m-1 btnClose">Close</button>
                      <button id="addFavourites" class="bg-blue-600 px-2 h-9 rounded hover:bg-blue-500 font-bold text-white w-1/2 m-1 text-center faveBtn" data-drink='${drink.strDrink}' >Add<span class="hidden sm:inline"> to favourites</span></button>
                  </div>
              </div>
          </dialog>
      </div> 
  `;
  return cardLayout;
}


// data-drink='${JSON.stringify(drink)}'




