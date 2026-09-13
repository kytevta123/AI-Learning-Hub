// Smart Student AI Learning Hub - Dynamic Progress & Badges Tracker

document.addEventListener('DOMContentLoaded', () => {
    initProgressTracker();
    checkBadges();
});

// 1. Initialize & Render Progress Bars
function initProgressTracker() {
    // Fetch latest quiz score from LocalStorage (Default 0 if not taken)
    const latestQuizScore = parseInt(localStorage.getItem('latest_quiz_score')) || 75;
    
    // Elements
    const csProgressBar = document.getElementById('progress-cs');
    const mathProgressBar = document.getElementById('progress-math');
    const phyProgressBar = document.getElementById('progress-phy');

    const csPercentText = document.getElementById('percent-cs');
    const mathPercentText = document.getElementById('percent-math');
    const phyPercentText = document.getElementById('percent-phy');

    // Update Computer Science progress dynamically with quiz result
    if (csProgressBar && csPercentText) {
        csProgressBar.style.width = `${latestQuizScore}%`;
        csPercentText.textContent = `${latestQuizScore}%`;
    }

    // Set Default/Calculated progress for other subjects
    if (mathProgressBar && mathPercentText) {
        const mathScore = 85;
        mathProgressBar.style.width = `${mathScore}%`;
        mathPercentText.textContent = `${mathScore}%`;
    }

    if (phyProgressBar && phyPercentText) {
        const phyScore = 60;
        phyProgressBar.style.width = `${phyScore}%`;
        phyPercentText.textContent = `${phyScore}%`;
    }
}

// 2. Dynamic Gamification Badge Unlock System
function checkBadges() {
    const latestQuizScore = parseInt(localStorage.getItem('latest_quiz_score')) || 0;
    
    const starterBadge = document.getElementById('badge-starter');
    const scholarBadge = document.getElementById('badge-scholar');
    const masterBadge = document.getElementById('badge-master');

    // Unlock Starter Badge if at least 1 quiz completed
    if (latestQuizScore > 0 && starterBadge) {
        unlockBadgeElement(starterBadge);
    }

    // Unlock Scholar Badge if score >= 70%
    if (latestQuizScore >= 70 && scholarBadge) {
        unlockBadgeElement(scholarBadge);
    }

    // Unlock Master Badge if score >= 90%
    if (latestQuizScore >= 90 && masterBadge) {
        unlockBadgeElement(masterBadge);
    }
}

// Helper: Unlock styling application
function unlockBadgeElement(badgeElem) {
    badgeElem.classList.remove('locked');
    badgeElem.classList.add('unlocked');
    
    const badgeStatus = badgeElem.querySelector('.badge-status');
    if (badgeStatus) {
        badgeStatus.textContent = 'Unlocked';
        badgeStatus.style.color = '#0f766e';
    }
}

// 3. Global Function to Manually Trigger Progress Update (Called by Quiz/Timer)
function updateProgress(subject, newPercentage) {
    localStorage.setItem(`progress_${subject}`, newPercentage);
    initProgressTracker();
    checkBadges();
    
    if (typeof showToast === 'function') {
        showToast(`Progress for ${subject.toUpperCase()} updated to ${newPercentage}%!`);
    }
}