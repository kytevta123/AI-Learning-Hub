// Smart Student AI Learning Hub - Main Application Script

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initClassSubjectSelectors();
    initSmoothScroll();
});

// 1. Navbar & Section Navigation Logic
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.module-section, .hero-section, .dashboard-grid');

    // Update active navbar link on scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// 2. Class & Subject Selectors with LocalStorage Persistence
function initClassSubjectSelectors() {
    const classSelect = document.getElementById('classSelect');
    const subjectSelect = document.getElementById('subjectSelect');

    // Load saved preferences if available
    const savedClass = localStorage.getItem('user_class');
    const savedSubject = localStorage.getItem('user_subject');

    if (savedClass) classSelect.value = savedClass;
    if (savedSubject) subjectSelect.value = savedSubject;

    // Save preferences on change
    classSelect.addEventListener('change', (e) => {
        localStorage.setItem('user_class', e.target.value);
        showToast(`Class updated to ${e.target.options[e.target.selectedIndex].text}`);
    });

    subjectSelect.addEventListener('change', (e) => {
        localStorage.setItem('user_subject', e.target.value);
        showToast(`Subject updated to ${e.target.options[e.target.selectedIndex].text}`);
    });
}

// 3. Smooth Scroll Behavior for Buttons
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 4. Utility Toast Notification System
function showToast(message) {
    let toast = document.getElementById('toast-notification');
    
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #0f766e;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 2000;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2500);
}