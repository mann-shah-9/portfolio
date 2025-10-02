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

const securityTips = [
    "Enable two-factor authentication on all important accounts to add an extra layer of security.",
    "Regularly update your software and operating systems to patch security vulnerabilities and protect against threats.",
    "Use a VPN when connecting to public Wi-Fi networks to encrypt your internet connection and protect your data.",
    "Be cautious of phishing emails asking for personal information - verify sender authenticity before clicking links.",
    "Backup your important data regularly to secure cloud storage or external drives to prevent data loss.",
    "Use unique, strong passwords for different online accounts and consider using a password manager.",
    "Verify website SSL certificates before entering sensitive data to ensure secure connections.",
    "Regularly review and update your social media privacy settings to control your digital footprint.",
    "Enable biometric authentication where available for more secure and convenient access to devices.",
    "Use encrypted messaging apps for sensitive communications to protect your privacy.",
    "Regularly monitor your financial statements for unauthorized transactions and set up alerts.",
    "Be wary of unsolicited tech support calls - legitimate companies won't contact you unexpectedly.",
    "Use ad blockers and anti-tracking browser extensions to enhance your online privacy.",
    "Secure your home network with a strong Wi-Fi password and WPA3 encryption if available."
];

function refreshTip() {
    const tipElement = document.getElementById('dailyTip');

    // Fade out current tip
    tipElement.classList.add('fade-out');

    setTimeout(() => {
        // Get new random tip
        const randomTip = securityTips[Math.floor(Math.random() * securityTips.length)];
        tipElement.textContent = randomTip;

        // Fade in new tip
        tipElement.classList.remove('fade-out');
        tipElement.classList.add('fade-in');

        // Remove fade-in class after animation
        setTimeout(() => {
            tipElement.classList.remove('fade-in');
        }, 300);
    }, 300);
}

// Initialize with a random tip on page load
document.addEventListener('DOMContentLoaded', function () {
    refreshTip();

    // Auto-refresh tip every 2 minutes (optional)
    setInterval(refreshTip, 120000);
});