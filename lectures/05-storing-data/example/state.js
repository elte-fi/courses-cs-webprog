import { Card, CardState } from "./card.js";

export class AppState {
  cards = [];
  revealed = [];

  init(N) {
    this.cards = [];
    this.revealed = [];

    const maxNumber = (N * N) / 2;
    const numbers = {};

    for (let i = 0; i < maxNumber; i++) {
      numbers[i] = 2;
    }

    for (let y = 0; y < N; y++) {
      const row = [];

      for (let x = 0; x < N; x++) {
        let number;

        do {
          number = Math.floor(Math.random() * maxNumber);
        } while (numbers[number] === 0);

        row.push(new Card(number));
        numbers[number] -= 1;
      }

      this.cards.push(row);
    }
  }

  updateStates() {
    for (const row of this.cards) {
      for (const card of row) {
        if (card.state === CardState.HIDING) {
          card.state = CardState.HIDDEN;
        } else if (card.state === CardState.REVEALING) {
          card.state = CardState.REVEALED;
        }
      }
    }
  }

  isRevealed(x, y) {
    return this.revealed.includes(this.cards[y][x]);
  }

  reveal(x, y) {
    this.cards[y][x].state = CardState.REVEALING;
    this.revealed.push(this.cards[y][x]);
  }

  hideRevealed() {
    const [firstCard, secondCard] = this.revealed;

    firstCard.state = CardState.HIDING;
    secondCard.state = CardState.HIDING;

    this.revealed = [];
  }
}
