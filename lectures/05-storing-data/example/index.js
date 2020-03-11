import { AppState } from "./state.js";
import { render } from "./render.js";

const button = document.querySelector("#start");
const number = document.querySelector("#N");
const root = document.querySelector("#memory");

const state = new AppState();

button.addEventListener("click", function() {
  state.init(number.value);

  root.innerHTML = render(state);
});

root.addEventListener("click", function(event) {
  const card = event.target.closest(".card");

  if (!card) return;

  if (state.revealed.length === 2) {
    return;
  }

  state.updateStates();

  const td = card.parentNode;
  const tr = td.parentNode;

  const x = td.cellIndex;
  const y = tr.rowIndex;

  if (state.isRevealed(x, y)) {
    return;
  }

  state.reveal(x, y);

  if (state.revealed.length === 2) {
    const [firstCard, secondCard] = state.revealed;

    if (firstCard.number !== secondCard.number) {
      setTimeout(function() {
        state.hideRevealed();
        console.log(state.cards.map(row => row.map(cell => cell.state)));
        root.innerHTML = render(state);
      }, 1000);
    } else {
      state.revealed = [];
    }
  }

  console.log(state.cards.map(row => row.map(cell => cell.state)));
  root.innerHTML = render(state);
});
