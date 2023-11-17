function getRandomNumber5() {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  var randomDecimal = Math.random();

  // Scale the random decimal to the range 0 to 5 (inclusive)
  var randomNumber = Math.floor(randomDecimal * 5);

  return randomNumber;
}

function getRandomNumber() {
  // Generate a random decimal between 0 (inclusive) and 1 (exclusive)
  var randomDecimal = Math.random();

  // Scale the random decimal to the range 0 to 9 (inclusive)
  var randomNumber = Math.floor(randomDecimal * 10);

  return randomNumber;
}

// Example usage
// var randomNum = getRandomNumber5();

function getRandomNumbersList(length) {
  var numbers = [];

  // Fill the array with numbers from 0 to 9
  for (var i = 0; i < 10; i++) {
    numbers.push(i);
  }

  var randomNumbers = [];

  // Randomly select numbers and add them to the result array
  for (var j = 0; j < length; j++) {
    var randomIndex = Math.floor(Math.random() * numbers.length);
    var randomNumber = numbers.splice(randomIndex, 1)[0];
    randomNumbers.push(randomNumber);
  }

  return randomNumbers;
}

// Example usage: Get a list of 5 unique random numbers
var randomNumbersList = getRandomNumbersList(10);
// console.log(randomNumbersList);

let correctQuestions = 0;
let incorrectQuestions = 0;

let questionNumber = getRandomNumber();
let questionNumber5 = getRandomNumber5();

const questionElement = document.querySelector(".question");
questionElement.innerHTML = `What is the index of the number ${randomNumbersList[questionNumber5]} ?`;

const element = document.querySelector(".container");
element.innerHTML = `
<div onclick=" check0 ();" class="subcontainer">
    ${randomNumbersList[0]}
</div>
<div onclick=" " class="subcontainer one">
    ${randomNumbersList[1]}
</div>
<div class="subcontainer">
    ${randomNumbersList[2]}
</div>
<div class="subcontainer">
    ${randomNumbersList[3]}
</div>
<div class="subcontainer">
    ${randomNumbersList[4]}
</div>
`;

let shoudCount = true;

function nextQuestion() {
    shoudCount = true;

  questionNumber = getRandomNumber();
  // Example usage: Get a list of 5 unique random numbers
  var randomNumbersList = getRandomNumbersList(10);
  //   console.log(randomNumbersList);

  const questionElement = document.querySelector(".question");
  questionElement.innerHTML = `What is the index of the number ${randomNumbersList[questionNumber]} ?`;

  const element = document.querySelector(".container");
  element.innerHTML = `
<div class="subcontainer">
    ${randomNumbersList[0]}
</div>
<div class="subcontainer">
    ${randomNumbersList[1]}
</div>
<div class="subcontainer">
    ${randomNumbersList[2]}
</div>
<div class="subcontainer">
    ${randomNumbersList[3]}
</div>
<div class="subcontainer">
    ${randomNumbersList[4]}
</div>
<div class="subcontainer">
    ${randomNumbersList[5]}
</div>
<div class="subcontainer">
    ${randomNumbersList[6]}
</div>
<div class="subcontainer">
    ${randomNumbersList[7]}
</div>
<div class="subcontainer">
    ${randomNumbersList[8]}
</div>
<div class="subcontainer">
    ${randomNumbersList[9]}
</div>

`;
  document.querySelector(".text-box").value = "";
  document.querySelector(".outcome").innerHTML = "";
}

function checkAnswer() {
  const answerElement = document.querySelector(".text-box");
  const answerValue = answerElement.value;
  console.log(`Input value: ${answerValue}`);

  const outcomeElement = document.querySelector(".outcome");
  if (!answerValue) {
    outcomeElement.innerHTML = `
      <div style="color: red; font-weight: bold" class="correct">
        Please enter an index number
      </div>
    `;
  } else if (
    Number(answerValue) === questionNumber ||
    Number(answerValue) === questionNumber5
  ) {
    if (shoudCount) {
      correctQuestions++;
      shoudCount = false;
    }
    outcomeElement.innerHTML = `
      <div style="font-weight: bold" class="correct">
        Correct
      </div>
    `;
  } else {
    if (shoudCount) {
      incorrectQuestions++;
      shoudCount = false;
    }
    outcomeElement.innerHTML = `
      <div style="color: red; font-weight: bold" class="incorrect">
        Incorrect
      </div>
    `;
  }
  console.log(`correct: ${correctQuestions}`);
  console.log(`incorrect: ${incorrectQuestions}`);

  // Call the function
  incrementLSCorrect(getCookie("_id"), correctQuestions, incorrectQuestions)
    .then((data) => console.log(data))
    .catch((error) => console.log("There was an error!", error));
}

async function getStudent(id) {
  const response = await fetch(`http://localhost:4000/api/students/${id}`);
  const student = await response.json();
  return student;
}

async function incrementLSCorrect(id, LSCORRECT, LSINCORRECT) {
  const student = await getStudent(id);
  const LSCORRECTNEW = student.LSCORRECT + LSCORRECT;
  const LSINCORRECTNEW = student.LSINCORRECT + LSINCORRECT;

  const response = await fetch(`http://localhost:4000/api/students/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      LSCORRECT: LSCORRECTNEW,
      LSINCORRECT: LSINCORRECTNEW,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

console.log(document.cookie)

function getCookie(_id) {
  let cookieArr = document.cookie.split("; ");
  
  for(let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    
    if(_id == cookiePair[0]) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  
  // Return null if the cookie wasn't found
  return null;
}

console.log(getCookie('_id'));  // Replace 'username' with the name of your cookie

module.exports = { getRandomNumber, getRandomNumber5, getRandomNumbersList };
