// Smart Student AI Learning Hub - Interactive Quiz Engine

// Sample Question Bank (Class & Subject Wise Extensible)
const quizData = [
    {
        id: 1,
        question: "What is the main function of the CPU in a computer?",
        options: [
            "Store permanent files",
            "Perform arithmetic and logical operations",
            "Display visual output",
            "Provide internet connection"
        ],
        correct: 1
    },
    {
        id: 2,
        question: "Which data structure uses LIFO (Last In, First Out) principle?",
        options: [
            "Queue",
            "Array",
            "Stack",
            "Tree"
        ],
        correct: 2
    },
    {
        id: 3,
        question: "In Python, which keyword is used to define a function?",
        options: [
            "func",
            "function",
            "def",
            "define"
        ],
        correct: 2
    },
    {
        id: 4,
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Method Level",
            "Home Tool Markup Language"
        ],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let userScore = 0;
let selectedOption = null;

// DOM Elements
const quizWelcomeBox = document.getElementById('quiz-welcome');
const quizQuestionBox = document.getElementById('quiz-question-box');
const quizResultBox = document.getElementById('quiz-result');

const questionTextElem = document.getElementById('question-text');
const optionsGridElem = document.getElementById('options-grid');
const currentQuestionNumElem = document.getElementById('current-question-num');
const totalQuestionsNumElem = document.getElementById('total-questions-num');
const finalScoreElem = document.getElementById('final-score');

const startQuizBtn = document.getElementById('start-quiz-btn');
const nextQuestionBtn = document.getElementById('next-question-btn');
const restartQuizBtn = document.getElementById('restart-quiz-btn');

// Initialize Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    if (startQuizBtn) startQuizBtn.addEventListener('click', startQuiz);
    if (nextQuestionBtn) nextQuestionBtn.addEventListener('click', handleNextQuestion);
    if (restartQuizBtn) restartQuizBtn.addEventListener('click', resetQuiz);
});

// 1. Start Quiz Process
function startQuiz() {
    currentQuestionIndex = 0;
    userScore = 0;
    
    if (quizWelcomeBox) quizWelcomeBox.classList.add('hidden');
    if (quizResultBox) quizResultBox.classList.add('hidden');
    if (quizQuestionBox) quizQuestionBox.classList.remove('hidden');

    if (totalQuestionsNumElem) totalQuestionsNumElem.textContent = quizData.length;
    
    loadQuestion();
}

// 2. Load Single Question to UI
function loadQuestion() {
    selectedOption = null;
    const currentQ = quizData[currentQuestionIndex];

    if (currentQuestionNumElem) {
        currentQuestionNumElem.textContent = currentQuestionIndex + 1;
    }
    
    if (questionTextElem) {
        questionTextElem.textContent = currentQ.question;
    }

    if (optionsGridElem) {
        optionsGridElem.innerHTML = '';

        currentQ.options.forEach((optionText, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = `${String.fromCharCode(65 + index)}. ${optionText}`;
            btn.dataset.index = index;
            btn.addEventListener('click', () => selectOption(btn, index));
            optionsGridElem.appendChild(btn);
        });
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.style.display = 'none';
    }
}

// 3. Option Selection & Visual Feedback
function selectOption(selectedBtn, optionIndex) {
    const optionBtns = optionsGridElem.querySelectorAll('.option-btn');
    
    // Disable multiple selections
    optionBtns.forEach(btn => {
        btn.style.pointerEvents = 'none';
    });

    const currentQ = quizData[currentQuestionIndex];
    selectedOption = optionIndex;

    if (optionIndex === currentQ.correct) {
        selectedBtn.style.backgroundColor = '#ccfbf1';
        selectedBtn.style.borderColor = '#14b8a6';
        selectedBtn.style.color = '#0f766e';
        userScore++;
    } else {
        selectedBtn.style.backgroundColor = '#ffe4e6';
        selectedBtn.style.borderColor = '#e11d48';
        selectedBtn.style.color = '#be123c';

        // Highlight correct answer automatically
        const correctBtn = optionBtns[currentQ.correct];
        if (correctBtn) {
            correctBtn.style.backgroundColor = '#ccfbf1';
            correctBtn.style.borderColor = '#14b8a6';
        }
    }

    if (nextQuestionBtn) {
        nextQuestionBtn.style.display = 'inline-block';
        nextQuestionBtn.textContent = (currentQuestionIndex === quizData.length - 1) ? 'View Results' : 'Next Question';
    }
}

// 4. Handle Next Question or Show Final Results
function handleNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// 5. Calculate & Render Results
function showResults() {
    if (quizQuestionBox) quizQuestionBox.classList.add('hidden');
    if (quizResultBox) quizResultBox.classList.remove('hidden');

    if (finalScoreElem) {
        finalScoreElem.textContent = `${userScore} / ${quizData.length}`;
    }

    // Save Score in LocalStorage for Progress Tracking
    const percentage = Math.round((userScore / quizData.length) * 100);
    localStorage.setItem('latest_quiz_score', percentage);

    if (typeof showToast === 'function') {
        showToast(`Quiz Completed! Score: ${percentage}%`);
    }
}

// 6. Reset Quiz Engine
function resetQuiz() {
    startQuiz();
}