import AbstractView from "./AbstractView.js";
import { navigateTo } from "../navigation.js";
import { MATH_OPERATIONS } from "../math.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    controller() {
      this.goButton = document.getElementById('go');
      this.goButton.addEventListener('click', () => {
          renderCheckboxes(function() {
          const container = document.getElementById('math-operation-selections');
          container.innerHTML = MATH_OPERATIONS.map((d) => {
              return `
                <div>
                  <input type="checkbox" id="${d.key}"> </input>
                  <label for="${d.key}">${d.label}</label>
                </div>
              `
            }).join('');
          });
          getSettings(function () {
            this.arrayWithBoolean = MATH_OPERATIONS.map((d) => {
              const checked = document.getElementById(d.key).checked;
              return {key: d.key, checked};
            });
            this.timeValue = Number(document.getElementById('timer').value);
            this.range = Number(document.getElementById('range').value);
          });
        
          //return basic operations array with Boolean true
          trueSettings = () => {
            this.getSettings();
            const arrayWithTrueBoolean = [];
            for (let i = 0; i < this.arrayWithBoolean.length; i++) {
              if (this.arrayWithBoolean[i].checked) {
                arrayWithTrueBoolean.push(this.arrayWithBoolean[i]);
              }
            }
            return arrayWithTrueBoolean;
          }
          navigateTo('/gamemode');
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