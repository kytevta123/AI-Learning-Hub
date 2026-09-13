// Dynamic Question Bank Categorized by Class and Subject
const questionBank = {
    "10th-computer": [
        {
            question: "What is the main function of the CPU in a computer?",
            options: ["Store permanent files", "Perform arithmetic and logical operations", "Display visual output", "Provide internet connection"],
            correct: 1
        },
        {
            question: "In C Language / Python, which symbol is commonly used for assignment?",
            options: ["==", "=", "===", ":="],
            correct: 1
        }
    ],
    "10th-math": [
        {
            question: "What is the standard form of a Quadratic Equation?",
            options: ["ax + b = 0", "ax² + bx + c = 0", "ax³ + b = 0", "a + b = c"],
            correct: 1
        }
    ],
    "9th-computer": [
        {
            question: "Which component is considered the brain of the computer?",
            options: ["RAM", "Hard Disk", "CPU", "Monitor"],
            correct: 2
        }
    ]
};

let currentQuizData = [];
let currentQuestionIndex = 0;
let userScore = 0;

// DOM Elements
const questionTextElem = document.getElementById('question-text');
const optionsGridElem = document.getElementById('options-grid');
const startQuizBtn = document.getElementById('start-quiz-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const quizWelcomeBox = document.getElementById('quiz-welcome');
const quizQuestionBox = document.getElementById('quiz-question-box');
const quizResultBox = document.getElementById('quiz-result');

document.addEventListener('DOMContentLoaded', () => {
    if (startQuizBtn) startQuizBtn.addEventListener('click', startQuiz);
    if (nextQuestionBtn) nextQuestionBtn.addEventListener('click', handleNextQuestion);
});

// Function to fetch active questions based on Dropdown Selections
function getSelectedQuizData() {
    const classSelect = document.getElementById('classSelect')?.value || '10th';
    const subjectSelect = document.getElementById('subjectSelect')?.value || 'computer';
    
    // Normalizing key string (e.g., "10th-computer")
    const key = `${classSelect.toLowerCase()}-${subjectSelect.toLowerCase()}`;
    
    // Return selected array or fallback default
    return questionBank[key] || questionBank["10th-computer"];
}

function startQuiz() {
    currentQuizData = getSelectedQuizData();
    currentQuestionIndex = 0;
    userScore = 0;

    if (quizWelcomeBox) quizWelcomeBox.classList.add('hidden');
    if (quizResultBox) quizResultBox.classList.add('hidden');
    if (quizQuestionBox) quizQuestionBox.classList.remove('hidden');

    loadQuestion();
}

function loadQuestion() {
    const currentQ = currentQuizData[currentQuestionIndex];
    if (!currentQ) return;

    if (questionTextElem) questionTextElem.textContent = currentQ.question;
    if (optionsGridElem) {
        optionsGridElem.innerHTML = '';
        currentQ.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = `${String.fromCharCode(65 + index)}. ${opt}`;
            btn.addEventListener('click', () => selectOption(btn, index, currentQ.correct));
            optionsGridElem.appendChild(btn);
        });
    }
    if (nextQuestionBtn) nextQuestionBtn.style.display = 'none';
}

function selectOption(btn, index, correctIndex) {
    const optionBtns = optionsGridElem.querySelectorAll('.option-btn');
    optionBtns.forEach(b => b.style.pointerEvents = 'none');

    if (index === correctIndex) {
        btn.style.backgroundColor = '#ccfbf1';
        btn.style.borderColor = '#14b8a6';
        userScore++;
    } else {
        btn.style.backgroundColor = '#ffe4e6';
        btn.style.borderColor = '#e11d48';
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.style.display = 'inline-block';
        nextQuestionBtn.textContent = (currentQuestionIndex === currentQuizData.length - 1) ? 'View Results' : 'Next Question';
    }
}

function handleNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuizData.length) {
        loadQuestion();
    } else {
        if (quizQuestionBox) quizQuestionBox.classList.add('hidden');
        if (quizResultBox) quizResultBox.classList.remove('hidden');
        document.getElementById('final-score').textContent = `${userScore} / ${currentQuizData.length}`;
    }
}