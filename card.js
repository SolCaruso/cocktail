export function cardItem(drink) {

  let cardLayout = `
  <div class="relative rounded-xl shadow-md bg-white transition-transform duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer border border-gray-100">
  <div class="relative bg-white p-2 rounded-xl">
    <img class="rounded-lg w-full" src=${drink.strDrinkThumb} alt=${drink.strDrink}>
  </div>
  <div class="py-1.5 px-4 border-gray-200">
    <h2 class="font-bold text-lg text-gray-600 flex-wrap text-center sm:text-left card-title">
      ${drink.strDrink}
    </h2>
  </div>
</div>
  `;
  return cardLayout;
}


// data-drink='${JSON.stringify(drink)}'




