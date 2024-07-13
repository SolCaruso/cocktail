export function cardItem(drink) {
    let cardLayout = `
      <div class="product">
            <img src=${drink.strDrinkThumb} alt=${drink.strDrink}>
            </div>
                <h2>${drink.strDrink}</h2>
            </div>
        </div>
      `;
    return cardLayout;
  }
  