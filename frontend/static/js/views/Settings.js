import AbstractView from "./AbstractView.js";
import { navigateTo } from "../navigation.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    controller() {
      this.goButton = document.getElementById('go');
      this.goButton.addEventListener('click', () => {
        navigateTo('/gamemode')
      });
    }

    getHtml() {
        return `
        <h1>Brain Trainer</h1>
        <p>Play the game and train your brain! </p>
        <div class="settings">
          <h3>Settings</h3>
          <p> Choose basic operations:</p>
          <div id="math-operation-selections"></div>
          <p>Set timer and range:</p>
          <div>
            <select id="timer">
              <option value="30">30 seconds</option>
              <option value="60">60 seconds</option>
            </select>
            <label for="timer"> Time </label>
          </div>
            <select id="range">
              <option value="100">0 - 100</option>
              <option value="1000">0 - 1000</option>
            </select>
            <label for="range">Range</label>
          </div>
          <div class="ready" >
            <p>Are you ready to play?</p>
            <button id='go'> Let's go!</button>
          </div>
        </div>   
        `;
    }
}