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

export const MATH_OPERATIONS = [
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