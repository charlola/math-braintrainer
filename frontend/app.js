const MATH_ADDITION = 'addition';
const MATH_SUBTRACTION = 'subtraction';
const MATH_MULTIPLICATION = 'multiplication';
const MATH_DIVISION = 'division';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getDividers(num) {
  const arrayDivision = [];
  for (let i = 2; i < num; i++) {
    if ((num % i) === 0) {
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
  }
}

function getSubtractionQuestion(range) {
  const numberOne = getRandomInt(1, range);
  const numberTwo = getRandomInt(1,numberOne);
  return {
    question: `What is ${numberOne} - ${numberTwo}?`,
    answer: numberOne - numberTwo,
    points: 1,
  };
}

function getMultiplicationQuestion(range) {
  const numberOne = getRandomInt(3, range);
  const numberTwo = Math.ceil(this.range/numberOne);
  const numberThree = getRandomInt(2,numberTwo);
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
  const numberFour = arrayDivision[Math.floor(Math.random() * arrayDivision.length)];
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
    label: 'Addition'
  },
  {
    key: MATH_DIVISION,
    getQuestion: getDivisionQuestion,
    label: 'Division',
  },
  {
    key: MATH_SUBTRACTION,
    getQuestion: getSubtractionQuestion,
    label: 'Subtraction'
  },
  {
    key: MATH_MULTIPLICATION,
    getQuestion: getMultiplicationQuestion,
    label: 'Multiplication'
  }
];

class GameState {

  renderCheckboxes() {
    const container = document.getElementById('math-operation-selections');
    container.innerHTML = MATH_OPERATIONS.map((d) => {
        return `
          <div>
            <input type="checkbox" id="${d.key}"> </input>
            <label for="${d.key}">${d.label}</label>
          </div>
        `
      }).join('');
  }

  getSettings() {
    this.arrayWithBoolean = MATH_OPERATIONS.map((d) => {
      const checked = document.getElementById(d.key).checked;
      return {key: d.key, checked};
    });
    this.timeValue = Number(document.getElementById('timer').value);
    this.range = Number(document.getElementById('range').value);
  }

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

  init = () => {
    this.verifyButton = document.getElementById('verify');
    this.questionLabel = document.getElementById('question');
    this.answerInput = document.getElementById('answer');
    this.answerInput.addEventListener('keyup', function(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('verify').click();
      }
    });
    this.verifyButton.addEventListener('click', this.verify);
    this.verifyButton.addEventListener('click', this.clearInput);
    this.total = 0;
    this.points = 0;
    this.pointsContainer = document.getElementById('points');
    this.totalContainer = document.getElementById('total');
    this.goButton = document.getElementById('go');
    this.goButton.addEventListener('click', this.checkCheckboxes);
    this.renderCheckboxes();
  }
 

  timeUp() {
    setTimeout(function()
    {alert("Time is up!"); }, this.timeValue*1000);
    //showResults
  };
  
  //Question and Operations
  createQuestion = () => {
    const currentSettings = this.trueSettings();
    const questionTypeIndex = Math.floor(Math.random() * currentSettings.length);
    const questionType = currentSettings[questionTypeIndex].key;

    const {getQuestion} = MATH_OPERATIONS.find(operation => operation.key === questionType);
    return getQuestion(this.range);
  }

  clearInput() {
    const input = document.getElementById('answer');
    input.focus();
    input.select();
    input.value = '';
  }

  renderLevel = () => {
    this.currentQuestion = this.createQuestion();
    this.questionLabel.innerHTML = this.currentQuestion.question;
    this.pointsContainer.innerHTML = this.points;
    this.totalContainer.innerHTML = (this.total);
  }

  verify = () => {
    const answer = Number(this.answerInput.value);
    if (answer === this.currentQuestion.answer) {
      this.points += this.currentQuestion.points;
    } 
    this.total += 1;
    this.renderLevel();
  };

  checkCheckboxes = () => {
    if (this.trueSettings().length === 0) {
      alert('Please choose some basic operations in settings!')
    } else {
      this.renderLevel();
      this.timeUp();
    }
  };
}

const game = new GameState();
game.init();
