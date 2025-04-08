// Questions 

const questions = [
    {
        question: "Which keyword is used to declare a variable in Javascript",
        choices: ["var", "let", "const", "All of this"],
        answer: "All of this"
    },

    {
        question: "What will `typeof []` return?",
        choices: ["Array", "Object", "Undefined", "String"],
        answer: "Object"
    },

    {
        question: "Which function is used to print something in the console?",
        choices: ["log()", "console.log()", "print()", "display()"],
        answer: "console.log()"
    },

    {
        question: "How do you declare a array function in Javascript ?",
        choices: ["function myFunc() => {}",
            "const myFunc = () => {}",
            "myFunc: () => {}",
            "arrow function myFunc() {}"],
        answer: "const myFunc = () => {}"
    }
];


// Global variable
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-quiz");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const timerElement = document.getElementById("timer");
const finalScoreElement = document.getElementById("final-score");
const highScoresContainer = document.getElementById("high-scores");
const progressBar = document.getElementById("progress-bar");

// Start quiz
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeLeft = 30;

    startContainer.style.display = "none";
    quizContainer.style.display = "block";
    resultContainer.style.display = "none";

    timer = setInterval(updateTimer, 1000);
    updateProgressBar();
    showQuestion();
}

// Show question
function showQuestion() {
    console.log("showQuestion() is running...");
    if(currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    let currentQuestion = questions[currentQuestionIndex];
    console.log("Current Question:", currentQuestion.question);

    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(choice => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "quiz-option";
        input.value = choice;
        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));
        choicesElement.appendChild(label);
    });

    updateProgressBar();
}


// Check answer
function checkAnswer() {
    let selectedOption = document.querySelector('input[name="quiz-option"]:checked');

    if (!selectedOption) {
        alert("Please select an answer before submitting!");
        return;
    }

    if (selectedOption.value === questions[currentQuestionIndex].answer) {
        score++;
    }

    currentQuestionIndex++;
    showQuestion();
}

// Timer and Progressbar
function updateTimer() {
    timeLeft--;
    timerElement.textContent = `Time: ${timeLeft}s`;
    if (timeLeft <= 0) {
        endQuiz();
    }
}

function updateProgressBar() {
    let progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// End quiz
function endQuiz() {
    clearInterval(timer);
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    finalScoreElement.textContent = `Your Score: ${score}`;
    saveHighScore(score);
    displayHighScores();
}

// Save and display high score
function saveHighScore(newScore) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(newScore);
    highScores.sort((a, b) => b - a);
    highScores = highScores.slice(0, 5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function displayHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresContainer.innerHTML = "<h3>High Scores</h3>";
    highScores.forEach((score, index) => {
        highScoresContainer.innerHTML += `<p>${index + 1}. ${score}</p>`;
    });
}

// Event listener
startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", checkAnswer);
document.getElementById("restart").addEventListener("click", () => {
    startContainer.style.display = "block";
    quizContainer.style.display = "none"; 
    resultContainer.style.display = "none";
});