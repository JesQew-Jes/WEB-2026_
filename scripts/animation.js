const fadeElements = document.querySelectorAll('.fade-up');

function checkFadeIn() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
}

function animateNumbers() {
    const statValues = document.querySelectorAll('.stat-card__value');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (!target || stat.classList.contains('animated')) return;
        
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, stepTime);
        
        stat.classList.add('animated');
    });
}

function checkStatsVisibility() {
    const dashboard = document.querySelector('.dashboard');
    if (!dashboard) return;
    
    const dashboardTop = dashboard.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (dashboardTop < windowHeight - 100) {
        animateNumbers();
    }
}

window.addEventListener('scroll', () => {
    checkFadeIn();
    checkStatsVisibility();
});

window.addEventListener('load', () => {
    checkFadeIn();
    checkStatsVisibility();
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#top') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stat-card');
    const values = [124, 18, 9];
    
    statCards.forEach((card, index) => {
        const valueElement = card.querySelector('.stat-card__value');
        if (valueElement && values[index]) {
            const currentValue = valueElement.textContent;
            valueElement.setAttribute('data-target', values[index]);
            valueElement.textContent = '0';
        }
    });

    const sectionsToAnimate = document.querySelectorAll('.hero, .section, .cta');
    sectionsToAnimate.forEach(section => {
        if (!section.classList.contains('fade-up')) {
            section.classList.add('fade-up');
        }
    });
    
    setTimeout(() => {
        checkFadeIn();
        checkStatsVisibility();
    }, 100);
});

