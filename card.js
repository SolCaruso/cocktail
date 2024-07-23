
export function cardItem(drink) {
  let cardLayout = `
      <div class="transform transition-transform duration-300 hover:scale-101 hover:-translate-y-1 cursor-pointer md:my-6 card">
          <img class="rounded-2xl w-full" src=${drink.strDrinkThumb} alt=${drink.strDrink}>
          <h2 class="font-bold text-xl flex-wrap text-center sm:text-left px-2 py-4">${drink.strDrink}</h2>
          <dialog id="cardDialog" class='rounded-md py-12 px-16'>
              <p class='text-center p-10 text-3xl'>Insert message here</p>
              <p class='text-center p-10 text-3xl'>Insert message here</p>
              <ul>
              </ul>
              <div class='w-full flex justify-center text-center'>
                  <button class="bg-gray-100 px-2 h-9 rounded hover:bg-gray-200 font-bold text-gray-600 w-1/2 m-1 btnClose">Close</button>
                  <button class='bg-gray-100 px-2 h-9 rounded hover:bg-gray-200 font-bold text-gray-600 w-1/2 m-1'>Add to favourites</button>
              </div>
          </dialog>
      </div>
  `;
  return cardLayout;
}

  