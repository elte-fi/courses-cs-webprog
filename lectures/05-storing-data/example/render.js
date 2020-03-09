import { CardState } from "./card.js";

export function render(state) {
  return renderTable(state.cards);
}

export function renderTable(cards) {
  return `
    <table>
      ${cards.map(renderRow).join("")}
    </table>`;
}

export function renderRow(row) {
  return `
    <tr>
      ${row.map(renderCard).join("")}
    </tr>
  `;
}

export function renderCard(card) {
  const classes = ["card"];

  if (card.state === CardState.REVEALED) {
    classes.push("revealed");
  } else if (card.state === CardState.REVEALING) {
    classes.push("revealing");
  } else if (card.state === CardState.HIDING) {
    classes.push("hiding");
  } else if (card.state === CardState.HIDDEN) {
    classes.push("hidden");
  }

  const showNumber = card.state & (CardState.REVEALING | CardState.REVEALED);

  return `
    <td>
      <div class="${classes.join(" ")}">
        ${showNumber ? card.number : ""}
      </div>
    </td>
  `;
}
