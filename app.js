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

function getMultiplicationQuestion(range) {
  const numberOne = getRandomInt(3, range);
  const numberTwo = Math.ceil(range / numberOne);
  const numberThree = getRandomInt(2, numberTwo);
  return {
    question: `What is ${numberOne} * ${numberThree}?`,
    answer: numberOne * numberThree,
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
    key: MATH_DIVISION,
    getQuestion: getDivisionQuestion,
    label: "Division",
  },
  {
    key: MATH_SUBTRACTION,
    getQuestion: getSubtractionQuestion,
    label: "Subtraction",
  },
  {
    key: MATH_MULTIPLICATION,
    getQuestion: getMultiplicationQuestion,
    label: "Multiplication",
  },
];

// HTML getters

function getVerifyButton() {
  return document.getElementById("verify");
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
    alert("Time is up!");
  },  timeValue * 1000);
  //showResults
}

//Question and Operations
const createQuestion = (settings) => {
  const currentSettings = trueSettings(settings);
  const questionTypeIndex = Math.floor(Math.random() * currentSettings.length);
  const questionType = currentSettings[questionTypeIndex].key;

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
  currentQuestion = createQuestion(settings);
  gameState.currentQuestion = currentQuestion;
  getQuestionLabel().innerHTML = gameState.currentQuestion.question;
  getPointsContainer().innerHTML = gameState.points;
  getTotalContainer().innerHTML = gameState.total;
}

const verify = (settings) => {
  const answer = Number(getAnswerInput().value);
  if (answer === gameState.currentQuestion.answer) {
    gameState.points += gameState.currentQuestion.points;
  }
  gameState.total += 1;
  renderLevel(settings);
};

const startGame = () => {
  const settings = getSettings();

  getVerifyButton().addEventListener("click", () => verify(settings));

  if (trueSettings(settings).length === 0) {
    alert("Please choose some basic operations in settings!");
  } else {
    renderLevel(settings);
    timeUp(settings.timeValue);
  }
};

function init() {
  renderCheckboxes();
  getAnswerInput().addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("verify").click();
    }
  });
  getVerifyButton().addEventListener("click", clearInput);
  getGoButton().addEventListener("click", startGame);
}

// Start everything.

init();