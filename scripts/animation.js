const allAnimateElements = document.querySelectorAll(
    '.panel--hero, .dashboard, .card, .problem-list__item, ' +
    '.step-card, .feature-card, .audience-card, .price-card, ' +
    '.benefits__item, .rank-item, .stat-card, .kicker, ' +
    '.title, .desc, .btn-group, .section__header, .cta__panel'
);


const leftSideElements = [];
const rightSideElements = [];
const centerElements = [];

allAnimateElements.forEach((el, index) => {
 
    const hasTransform = el.style.transform !== '' && el.style.transform !== 'none';
    
    if (index % 3 === 0 && !hasTransform) {
        leftSideElements.push(el);
    } else if (index % 3 === 1 && !hasTransform) {
        rightSideElements.push(el);
    } else if (!hasTransform) {
        centerElements.push(el);
    }
});


leftSideElements.forEach((el, index) => {
    if (!el.classList.contains('animated-left')) {
        el.classList.add('animated-left');
        el.style.setProperty('--delay', `${index * 0.08}s`);
        el.style.willChange = 'transform, opacity';
    }
});

rightSideElements.forEach((el, index) => {
    if (!el.classList.contains('animated-right')) {
        el.classList.add('animated-right');
        el.style.setProperty('--delay', `${index * 0.08}s`);
        el.style.willChange = 'transform, opacity';
    }
});

centerElements.forEach((el, index) => {
    if (!el.classList.contains('animated-center')) {
        el.classList.add('animated-center');
        el.style.setProperty('--delay', `${index * 0.06}s`);
        el.style.willChange = 'transform, opacity';
    }
});


function animateElementsOnScroll() {
    const windowHeight = window.innerHeight;
    const triggerPoint = 120;

    leftSideElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - triggerPoint) {
            el.classList.add('visible');
        }
    });
 
    rightSideElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - triggerPoint) {
            el.classList.add('visible');
        }
    });
    
    centerElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - triggerPoint) {
            el.classList.add('visible');
        }
    });
}


function slowParallax() {
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('.panel, .card, .step-card, .feature-card, .audience-card, .price-card');
    
    elements.forEach((el, index) => {
        
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const speed = 0.02 + (index * 0.003);
            const offset = scrolled * speed;
            
            if (!el.classList.contains('animated-left') && 
                !el.classList.contains('animated-right') && 
                !el.classList.contains('animated-center')) {
                el.style.transform = `translateY(${offset * 0.1}px)`;
            }
        }
    });
}


function slowScaleTitles() {
    const titles = document.querySelectorAll('.title, .section__title, .cta__title, .card__title, .step-card__title');
    const windowHeight = window.innerHeight;
    
    titles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            const centerPosition = rect.top + rect.height / 2;
            const windowCenter = windowHeight / 2;
            const distance = Math.abs(centerPosition - windowCenter) / windowHeight;
            
            const scale = 0.95 + (1 - Math.min(distance * 1.5, 1)) * 0.05;
            const opacity = 0.5 + (1 - Math.min(distance * 1.5, 1)) * 0.5;
            
            
            if (!title.closest('.animated-left') && 
                !title.closest('.animated-right') && 
                !title.closest('.animated-center')) {
                title.style.transform = `scale(${scale})`;
                title.style.opacity = opacity;
            }
        }
    });
}


function animateRanking() {
    const rankItems = document.querySelectorAll('.rank-item');
    
    rankItems.forEach((item, index) => {
        if (!item.classList.contains('animated-rank')) {
            item.classList.add('animated-rank');
            item.style.setProperty('--rank-delay', `${index * 0.15}s`);
        
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                item.classList.add('visible');
            }
        }
    });
}


function animateNumbers() {
    const statValues = document.querySelectorAll('.stat-card__value');
    
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        if (!target || stat.classList.contains('animated')) return;
        
        let current = 0;
        const duration = 2500;
        const steps = 60;
        const increment = target / steps;
        const stepTime = duration / steps;
        
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
        setTimeout(animateNumbers, 300);
    }
}


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
            valueElement.setAttribute('data-target', values[index]);
            valueElement.textContent = '0';
        }
    });
 
    setTimeout(() => {
        animateElementsOnScroll();
        animateRanking();
        checkStatsVisibility();
    }, 300);
});



document.querySelectorAll('.mobile-nav .nav__link').forEach(link => {
    link.addEventListener('click', () => {
        const burgerCheckbox = document.getElementById('burger-checkbox');
        if (burgerCheckbox) {
            burgerCheckbox.checked = false;
            document.body.classList.remove('menu-open');
        }
    });
});

const burgerCheckbox = document.getElementById('burger-checkbox');
if (burgerCheckbox) {
    burgerCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    });
}



window.addEventListener('scroll', () => {
    animateElementsOnScroll();
    slowParallax();
    slowScaleTitles();
    checkStatsVisibility();
});

window.addEventListener('load', () => {
    setTimeout(() => {
        animateElementsOnScroll();
        slowParallax();
        slowScaleTitles();
        animateRanking();
        checkStatsVisibility();
    }, 200);
});


