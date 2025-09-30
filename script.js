// =========== MOBILE NAVIGATION TOGGLE ===========

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a nav link (better UX on mobiles)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});


// =========== SCROLL ANIMATIONS ===========

function checkScroll() {
    const elements = document.querySelectorAll('.fadein-left, .fadein-right, .fadein-up, .fadein-down');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // Distance from viewport bottom + offset for triggering

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fadein');
        }
    });
}
// Run animation check on load and scroll
document.addEventListener('DOMContentLoaded', checkScroll);
window.addEventListener('scroll', checkScroll);


// =========== HEADER SCROLL EFFECT ===========

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '20px 0';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});


// =========== SMOOTH ANCHOR SCROLLING ===========

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header height
                behavior: 'smooth'
            });
        }
    });
});


// =========== NAVIGATION ACTIVE LINK HIGHLIGHTING ===========

window.addEventListener('scroll', function () {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


// =========== FORM SUBMISSION HANDLING ===========

document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Placeholder for form sending logic
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    });
});


// =========== HORIZONTAL SCROLL FUNCTIONALITY (CERTIFICATES) ===========

document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.certificates-container');
    const leftBtn = document.querySelector('.scroll-btn.left');
    const rightBtn = document.querySelector('.scroll-btn.right');
    const dots = document.querySelectorAll('.scroll-dot');

    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
            container.scrollBy({ left: -400, behavior: 'smooth' });
        });

        rightBtn.addEventListener('click', () => {
            container.scrollBy({ left: 400, behavior: 'smooth' });
        });
    }

    container.addEventListener('scroll', () => {
        const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        const activeIndex = Math.floor(scrollPercentage * dots.length);

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const scrollPosition = (index / dots.length) * (container.scrollWidth - container.clientWidth);
            container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        });
    });
});


// =========== VISITOR COUNTER FUNCTIONALITY ===========

document.addEventListener('DOMContentLoaded', function () {
    initializeVisitorCounter();

    function initializeVisitorCounter() {
        const today = new Date().toDateString();

        let totalVisitors = parseInt(localStorage.getItem('totalVisitors')) || 0;
        let todayVisitors = parseInt(localStorage.getItem('todayVisitors')) || 0;
        let lastVisitDate = localStorage.getItem('lastVisitDate');

        if (lastVisitDate !== today) {
            todayVisitors = 0;
            localStorage.setItem('lastVisitDate', today);
        }

        const sessionVisited = sessionStorage.getItem('sessionVisited');
        if (!sessionVisited) {
            totalVisitors++;
            todayVisitors++;
            localStorage.setItem('totalVisitors', totalVisitors);
            localStorage.setItem('todayVisitors', todayVisitors);
            sessionStorage.setItem('sessionVisited', 'true');
        }

        const onlineUsers = Math.floor(Math.random() * 10) + 1;

        animateCounter('visitorCount', totalVisitors);
        animateCounter('todayCount', todayVisitors);
        animateCounter('onlineCount', onlineUsers);

        setInterval(() => {
            const newOnlineUsers = Math.floor(Math.random() * 10) + 1;
            animateCounter('onlineCount', newOnlineUsers);
        }, 30000);
    }

    function animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        if (!element) return;
        const currentValue = parseInt(element.textContent) || 0;

        if (currentValue === targetValue) return;

        element.classList.add('updated');

        setTimeout(() => {
            element.classList.remove('updated');
        }, 500);

        let current = currentValue;
        const increment = targetValue > currentValue ? 1 : -1;
        const stepTime = Math.abs(Math.floor(1000 / Math.max(Math.abs(targetValue - currentValue), 1)));

        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            if (current === targetValue) clearInterval(timer);
        }, stepTime);
    }

    // Periodic update every 5 minutes for counters
    setInterval(() => {
        const totalVisitors = parseInt(localStorage.getItem('totalVisitors')) || 0;
        const todayVisitors = parseInt(localStorage.getItem('todayVisitors')) || 0;

        animateCounter('visitorCount', totalVisitors);
        animateCounter('todayCount', todayVisitors);
    }, 300000);
});


// =========== SIMULATE REAL TRAFFIC PATTERNS ===========

function simulateRealTraffic() {
    const hour = new Date().getHours();
    let trafficMultiplier = 1;

    if (hour >= 9 && hour <= 17) {
        trafficMultiplier = 1.5; // Business hours
    } else if (hour >= 18 && hour <= 22) {
        trafficMultiplier = 1.2; // Evening
    } else {
        trafficMultiplier = 0.8; // Night time
    }

    return trafficMultiplier;
}


// =========== CYBER LOADER FUNCTIONALITY ===========

document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('cyber-loader');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercent = document.querySelector('.progress-percent');
    const statusText = document.querySelector('.status-text');
    const tips = document.querySelectorAll('.tip');

    let progress = 0;
    let currentTip = 0;

    const loadingSimulation = setInterval(() => {
        progress += Math.random() * 8;

        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingSimulation);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 500);
        }

        progressFill.style.width = progress + '%';
        progressPercent.textContent = Math.floor(progress) + '%';
        updateStatusText(progress);

    }, 200);

    setInterval(() => {
        tips[currentTip].classList.remove('active');
        currentTip = (currentTip + 1) % tips.length;
        tips[currentTip].classList.add('active');
    }, 3000);

    function updateStatusText(progress) {
        if (progress < 25) statusText.textContent = 'System Scan';
        else if (progress < 50) statusText.textContent = 'Encrypting Connection';
        else if (progress < 75) statusText.textContent = 'Loading Modules';
        else statusText.textContent = 'Finalizing Security';
    }

    setInterval(() => {
        if (Math.random() > 0.7) {
            const glitchText = document.querySelector('.glitch-text');
            glitchText.style.animation = 'none';
            setTimeout(() => glitchText.style.animation = '', 100);
        }
    }, 2000);
});


// =========== PAGE LOAD HANDLING ===========

window.addEventListener('load', function () {
    setTimeout(() => {
        const loader = document.getElementById('cyber-loader');
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }
    }, 6000); // Max 6 seconds for loading screen
});

const now = Date.now();
const sessionVisited = sessionStorage.getItem('sessionVisited');
const lastVisit = localStorage.getItem('lastVisitTime');

// If no session visit or last visit was long ago, count as new visit.
if (!sessionVisited || (lastVisit && now - lastVisit > 30 * 60 * 1000)) { // 30 minutes session timeout
  totalVisitors++;
  todayVisitors++;
  localStorage.setItem('totalVisitors', totalVisitors);
  localStorage.setItem('todayVisitors', todayVisitors);
  localStorage.setItem('lastVisitTime', now);
  sessionStorage.setItem('sessionVisited', 'true');
}
