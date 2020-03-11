export const CardState = {
  REVEALED: 1,
  REVEALING: 2,
  HIDDEN: 4,
  HIDING: 8
};

export class Card {
  number = NaN;
  state = CardState.HIDDEN;

  constructor(number) {
    this.number = number;
  }
}
