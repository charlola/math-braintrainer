const MATH_ADDITION = "addition";
const MATH_SUBTRACTION = "subtraction";
const MATH_MULTIPLICATION = "multiplication";
const MATH_DIVISION = "division";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getDividers(num) {
  const arrayDivision = [];
  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      arrayDivision.push(i);
    }
  }
  return arrayDivision;
}

function getAdditionQuestion(range) {
  const numberOne = getRandomInt(1, range);
  const secondNumberRange = range - numberOne;
  const numberTwo = getRandomInt(1, secondNumberRange);
  return {
    question: `What is ${numberTwo} + ${numberOne}?`,
    answer: numberTwo + numberOne,
    points: 1,
  };
}

function getSubtractionQuestion(range) {
  const numberOne = getRandomInt(1, range);
  const numberTwo = getRandomInt(1, numberOne);
  return {
    question: `What is ${numberOne} - ${numberTwo}?`,
    answer: numberOne - numberTwo,
    points: 1,
  };
}

// function getMultiplicationQuestion(range) {
//   const numberOne = getRandomInt(3, range/2);
//   const numberTwo = getRandomInt(2,range/numberOne);
//   return {
//     question: `What is ${numberOne} * ${numberTwo}?`,
//     answer: numberOne * numberTwo,
//     points: 1,
//   };
// }

function getMultiplicationQuestion(range) {
  const numberOne = getRandomInt(2, range/10);
  const numberTwo = getRandomInt(2,range/numberOne);
  return {
    question: `What is ${numberOne} * ${numberTwo}?`,
    answer: numberOne * numberTwo,
    points: 1,
  };
}

function getDivisionQuestion(range) {
  let numberOne = getRandomInt(3, range);
  let arrayDivision = [];
  while (true) {
    arrayDivision = getDividers(numberOne);
    if (arrayDivision.length > 0) {
      break;
    }
    numberOne = getRandomInt(3, range);
  }
  const numberFour =
    arrayDivision[Math.floor(Math.random() * arrayDivision.length)];
  return {
    question: `What is ${numberOne} / ${numberFour}?`,
    answer: numberOne / numberFour,
    points: 1,
  };
}

const MATH_OPERATIONS = [
  {
    key: MATH_ADDITION,
    getQuestion: getAdditionQuestion,
    label: "Addition",
  },
  {
    key: MATH_SUBTRACTION,
    getQuestion: getSubtractionQuestion,
    label: "Subtraction",
  },
  {
    key: MATH_DIVISION,
    getQuestion: getDivisionQuestion,
    label: "Division",
  },
  {
    key: MATH_MULTIPLICATION,
    getQuestion: getMultiplicationQuestion,
    label: "Multiplication",
  },
];

// refresh Page

function refreshPage(){
  window.location.reload();
} 

// HTML getters

function getVerifyButton() {
  return document.getElementById("verify");
}

function getNewGameButton() {
  return document.getElementById("newGame");
}

function getAnswerInput() {
  return document.getElementById("answer");
}

function getQuestionLabel() {
  return document.getElementById("question");
}

function getGoButton() {
  return document.getElementById("go");
}

function getPointsContainer() {
  return document.getElementById("points");
}
function getTotalContainer() {
  return document.getElementById("total");
}

function getMathOperationSelections() {
  return document.getElementById("math-operation-selections");
}

function getGameModeDisplay() {
  return document.getElementById("gameMode");
}

function getGameDisplay() {
  return document.getElementById("game");
}

function getSettingDisplay() {
  return document.getElementById("settings");
}

function getReadyDisplay() {
  return document.getElementById("ready");
}

function getNewGameDisplay() {
  return document.getElementById("newGame");
}

// Displays

function displayGame() {
  const gameDisplay = getGameModeDisplay();
  gameDisplay.style.display = "block";
  const settingDisplay = getSettingDisplay();
  settingDisplay.style.display = "none";
  const readyDisplay = getReadyDisplay();
  readyDisplay.style.display = "none";
}

function displaySettings() {
  const gameDisplay = getGameModeDisplay();
  gameDisplay.style.display = "none";
  const settingDisplay = getSettingDisplay();
  settingDisplay.style.display = "block";
  const readyDisplay = getReadyDisplay();
  readyDisplay.style.display = "block";
  const newGameDisplay = getNewGameDisplay() ;
  newGameDisplay.style.display = "none";
}

function displayNewGame() {
  const newGameDisplay = getNewGameDisplay();
  newGameDisplay.style.display = "block";
  const turnGameDisplayOff = getGameDisplay();
  turnGameDisplayOff.style.display = "none";
}


// switchDisplay
// function switchDisplay(){
//   const display = arguments()
// }

// Initial state

const gameState = {
  total: 0,
  points: 0,
  currentQuestion: "",
};

// Render logic

function renderCheckboxes() {
  const container = getMathOperationSelections();
  container.innerHTML = MATH_OPERATIONS.map((d) => {
    return `
          <div>
            <input type="checkbox" id="${d.key}"> </input>
            <label for="${d.key}">${d.label}</label>
          </div>
        `;
  }).join("");
}

function getSettings() {
  const arrayWithBoolean = MATH_OPERATIONS.map((d) => {
    const checked = document.getElementById(d.key).checked;
    return { key: d.key, checked };
  });
  const timeValue = Number(document.getElementById("timer").value);
  const range = Number(document.getElementById("range").value);
  return {
    timeValue,
    range,
    arrayWithBoolean,
  };
}

const trueSettings = (settings) => {
  const { arrayWithBoolean } = settings;
  const arrayWithTrueBoolean = [];
  for (let i = 0; i < arrayWithBoolean.length; i++) {
    if (arrayWithBoolean[i].checked) {
      arrayWithTrueBoolean.push(arrayWithBoolean[i]);
    }
  }
  return arrayWithTrueBoolean;
};



function timeUp(timeValue) {
  setTimeout(function () {

  if (window.confirm(`Time is up!\nYou have ${gameState.points} correct from ${gameState.total} answers.\n\nDo you want to start a new game?`))
    {
       refreshPage()

      // Das wäre ohne RefreshPage(), Punktestand wird zurückgesetzt. Allerdings wird beim nächsten Game nochmal init() gestartet und das alte init() läuft noch.
      // gameState.points = 0;
      // gameState.total = 0;
      // getPointsContainer().innerHTML = gameState.points;
      // getTotalContainer().innerHTML = gameState.total;
      // displaySettings();
    }
  else
    {
        displayNewGame();
    }
  }, timeValue*1000);

}

//Question and Operations
const createQuestion = (settings) => {
  const currentSettings = trueSettings(settings);
  window.questionTypeIndex = Math.floor(Math.random() * currentSettings.length);
  window.questionType = currentSettings[window.questionTypeIndex].key;

  const { getQuestion } = MATH_OPERATIONS.find(
    (operation) => operation.key === questionType
  );
  return getQuestion(settings.range);
};

function clearInput() {
  const input = document.getElementById("answer");
  input.focus();
  input.select();
  input.value = "";
}

function renderLevel(settings) {
  let currentQuestion = createQuestion(settings);
  gameState.currentQuestion = currentQuestion;
  getQuestionLabel().innerHTML = gameState.currentQuestion.question;
  getPointsContainer().innerHTML = gameState.points;
  getTotalContainer().innerHTML = gameState.total;
}

const verify = (settings) => {
  const input = document.getElementById("answer");
  const answer = Number(input.value);
  if (answer === gameState.currentQuestion.answer) {
    gameState.points += gameState.currentQuestion.points;
  }
  if (answer !== gameState.currentQuestion.answer) {
    console.log(answer);
    console.log(gameState.currentQuestion.answer);
    console.log(Number(getAnswerInput().value));
    console.log((getAnswerInput().value));
    console.log(document.getElementById("answer"));
  }
  gameState.total += 1;
  renderLevel(settings);
  clearInput();
};

const startGame = () => {
  const settings = getSettings();
  getVerifyButton().addEventListener("click", () => verify(settings));
  getAnswerInput().addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("verify").click();
    }
  });

  if (trueSettings(settings).length === 0) {
    alert("Please choose some basic operations in settings!");
  } else {
    displayGame();
    renderLevel(settings);
    timeUp(settings.timeValue);
  }
};

function init() {
  renderCheckboxes();
  getGoButton().addEventListener("click", startGame);
  getNewGameButton().addEventListener("click", refreshPage);
  // getVerifyButton().addEventListener("click", clearInput);
}

// Start everything.

init();