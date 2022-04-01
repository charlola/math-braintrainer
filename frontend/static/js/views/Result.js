import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Result");
    }

    controller() {
    }

    getHtml() {
        return `
        <h1>Brain Trainer</h1>
        <p>Play the game and train your brain! </p>
        <div class="results">
            <h3>Results</h3>
            <div>POINTS: <span id="points">...</span></div>
            <div>Total Answers: <span id="total">...</span></div>
        </div>
        `;
    }
}