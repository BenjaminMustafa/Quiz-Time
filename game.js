const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "Koj ima najveke tituli vo liga sampioni?",
    choice1: "Internazionale",
    choice2: "Benfica",
    choice3: "Nottm Forest",
    choice4: "Juventus",
    answer: 1
  },
  {
    question:
      " Fudbalski klub CHelsea doaga od koj grad?",
    choice1: "Liverpool",
    choice2: "Sheffield",
    choice3: "London",
    choice4: "Manchester",
    answer: 3
  },
  {
    question: " Tancot Cha-cha-cha poteknuva od koja zemja",
    choice1: "Francija",
    choice2: "Spanija",
    choice3: "Brazil",
    choice4: "Kuba",
    answer: 4
  },
  {
    question: "Koja zaednicka boja ja imaat na znameto Latvia, Makedonija, Svedska i Moldavia?",
    choice1: "Plava;",
    choice2: "Crvena",
    choice3: "Zolta",
    choice4: "zelena",
    answer: 3
  },
  {
    question: "Vo 1990 vo Bari Crvena zvezda osvoi liga sampioni protiv koj klub?",
    choice1: "Spartak Moskva;",
    choice2: "Bayern",
    choice3: "Marseille",
    choice4: "Real Madrid",
    answer: 3
  },
  {
    question: "Koj ima najak Opium vo svetot?",
    choice1: "Makedonija;",
    choice2: "India",
    choice3: "Kina",
    choice4: "Turska",
    answer: 1
  },
  {
    question: "Na koja data Makedonija dobiva nezavisnost i se odcepuva od jugoslavia?",
    choice1: "11 Oktomvri;",
    choice2: "8 Septemvri",
    choice3: "24 Maj",
    choice4: "2 Avgust",
    answer: 2
  },
  {
    question: "Koe ezero e najstaro vo Evropa?",
    choice1: "Lugano;",
    choice2: "Komo",
    choice3: "Balaton",
    choice4: "Ohridsko ezero",
    answer: 4
  },
  {
    question: "Prv grad vo evropa koj voveduva elektricen tram?",
    choice1: "Paris;",
    choice2: "Belgrad",
    choice3: "London",
    choice4: "Saraevo",
    answer: 4
  },
  {
    question: "Koja e zemjata so najveke planini na svojata teritorija?",
    choice1: "Makedonija;",
    choice2: "peru",
    choice3: "crnagora",
    choice4: "svajcaria",
    answer: 3
  },

];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();