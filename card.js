export function cardItem(drink) {
    let cardLayout = `
        <div class="transform transition-transform duration-300 hover:scale-101 hover:-translate-y-1 cursor-pointer md:my-6">
            <img class="rounded-2xl w-full" src=${drink.strDrinkThumb} alt=${drink.strDrink}>
            <h2 class="font-bold text-xl flex-wrap text-center sm:text-left px-2 py-4">${drink.strDrink}</h2>
        </div>
      `;
    return cardLayout;
  }
  