// Smart Student AI Learning Hub - Study Timer (Pomodoro Engine)

let timerInterval = null;
let totalSeconds = 25 * 60; // Default 25 minutes
let initialSeconds = 25 * 60;
let isRunning = false;

// DOM Elements
const timerDisplay = document.getElementById('timer-display');
const startTimerBtn = document.getElementById('start-timer-btn');
const pauseTimerBtn = document.getElementById('pause-timer-btn');
const resetTimerBtn = document.getElementById('reset-timer-btn');
const focusModeBtn = document.getElementById('focus-mode-btn');
const breakModeBtn = document.getElementById('break-mode-btn');

// Initialize Timer Controls
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();

    if (startTimerBtn) startTimerBtn.addEventListener('click', startTimer);
    if (pauseTimerBtn) pauseTimerBtn.addEventListener('click', pauseTimer);
    if (resetTimerBtn) resetTimerBtn.addEventListener('click', resetTimer);
    
    if (focusModeBtn) focusModeBtn.addEventListener('click', () => setTimerMode(25));
    if (breakModeBtn) breakModeBtn.addEventListener('click', () => setTimerMode(5));
});

// 1. Update Timer Display (MM:SS)
function updateDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (timerDisplay) {
        timerDisplay.textContent = formattedTime;
    }

    // Update Browser Tab Title
    if (isRunning) {
        document.title = `(${formattedTime}) Study Timer - AI Learning Hub`;
    } else {
        document.title = `Smart Student AI Learning Hub`;
    }
}

// 2. Start Countdown
function startTimer() {
    if (isRunning) return;

    isRunning = true;
    if (startTimerBtn) startTimerBtn.classList.add('hidden');
    if (pauseTimerBtn) pauseTimerBtn.classList.remove('hidden');

    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            completeTimer();
        }
    }, 1000);

    if (typeof showToast === 'function') {
        showToast('Study timer started! Stay focused.');
    }
}

// 3. Pause Countdown
function pauseTimer() {
    if (!isRunning) return;

    isRunning = false;
    clearInterval(timerInterval);

    if (pauseTimerBtn) pauseTimerBtn.classList.add('hidden');
    if (startTimerBtn) startTimerBtn.classList.remove('hidden');

    if (typeof showToast === 'function') {
        showToast('Timer paused.');
    }
}

// 4. Reset Countdown
function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);

    totalSeconds = initialSeconds;
    updateDisplay();

    if (pauseTimerBtn) pauseTimerBtn.classList.add('hidden');
    if (startTimerBtn) startTimerBtn.classList.remove('hidden');

    if (typeof showToast === 'function') {
        showToast('Timer reset.');
    }
}

// 5. Mode Switch (Focus 25m / Break 5m)
function setTimerMode(minutes) {
    pauseTimer();
    initialSeconds = minutes * 60;
    totalSeconds = initialSeconds;
    updateDisplay();

    if (typeof showToast === 'function') {
        showToast(`Timer set to ${minutes} minutes.`);
    }
}

// 6. Timer Completion Event
function completeTimer() {
    pauseTimer();
    
    // Play notification alert tone if supported
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        osc.connect(audioCtx.destination);
        osc.frequency.value = 587.33; // D5 note
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
        console.log('Audio alert unsupported');
    }

    if (typeof showToast === 'function') {
        showToast('🎉 Time is up! Take a break or start another session.');
    }
}