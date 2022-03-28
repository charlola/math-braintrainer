
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("GameMode");
    }

    async getHtml() {
        return `
        <h1>Brain Trainer</h1>
        <p>Play the game and train your brain! </p>
        <div class="game">
          <h3>Game</h3>
          <label id="question" for="answer">start Game...</label>
          <input id="answer"></input>
          <button id="verify">Verify</button>
      </div>
        `;
    }
}