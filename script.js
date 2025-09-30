// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Scroll animations
function checkScroll() {
    const elements = document.querySelectorAll('.fadein-left, .fadein-right, .fadein-up, .fadein-down');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fadein');
        }
    });
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', checkScroll);

// Check on scroll
window.addEventListener('scroll', checkScroll);

// Header scroll effect
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

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current section in navigation
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

// Form submission handling (if you add a contact form later)
document.addEventListener('DOMContentLoaded', function () {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    });
});

// Horizontal Scroll Functionality
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

    // Update active dot based on scroll position
    container.addEventListener('scroll', () => {
        const scrollPercentage = container.scrollLeft / (container.scrollWidth - container.clientWidth);
        const activeIndex = Math.floor(scrollPercentage * dots.length);

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    });

    // Click on dots to scroll to specific position
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const scrollPosition = (index / dots.length) * (container.scrollWidth - container.clientWidth);
            container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        });
    });
});

// Visitor Counter Functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize counters
    initializeVisitorCounter();

    function initializeVisitorCounter() {
        // Get current date for today's count
        const today = new Date().toDateString();

        // Get stored data from localStorage
        let totalVisitors = parseInt(localStorage.getItem('totalVisitors')) || 0;
        let todayVisitors = parseInt(localStorage.getItem('todayVisitors')) || 0;
        let lastVisitDate = localStorage.getItem('lastVisitDate');

        // Check if it's a new day
        if (lastVisitDate !== today) {
            todayVisitors = 0;
            localStorage.setItem('lastVisitDate', today);
        }

        // Check if this is a new visit (not page refresh)
        const sessionVisited = sessionStorage.getItem('sessionVisited');
        if (!sessionVisited) {
            // Increment counters
            totalVisitors++;
            todayVisitors++;

            // Update storage
            localStorage.setItem('totalVisitors', totalVisitors);
            localStorage.setItem('todayVisitors', todayVisitors);
            sessionStorage.setItem('sessionVisited', 'true');
        }

        // Simulate online users (random between 1-10)
        const onlineUsers = Math.floor(Math.random() * 10) + 1;

        // Animate counter updates
        animateCounter('visitorCount', totalVisitors);
        animateCounter('todayCount', todayVisitors);
        animateCounter('onlineCount', onlineUsers);

        // Update online users every 30 seconds
        setInterval(() => {
            const newOnlineUsers = Math.floor(Math.random() * 10) + 1;
            animateCounter('onlineCount', newOnlineUsers);
        }, 30000);
    }

    function animateCounter(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const currentValue = parseInt(element.textContent) || 0;

        if (currentValue === targetValue) return;

        // Add animation class
        element.classList.add('updated');

        // Remove animation class after animation completes
        setTimeout(() => {
            element.classList.remove('updated');
        }, 500);

        // Update counter with animation
        let current = currentValue;
        const increment = targetValue > currentValue ? 1 : -1;
        const stepTime = Math.abs(Math.floor(1000 / (targetValue - currentValue)));

        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;

            if (current === targetValue) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Optional: Add real-time updates (every 5 minutes)
    setInterval(() => {
        const totalVisitors = parseInt(localStorage.getItem('totalVisitors')) || 0;
        const todayVisitors = parseInt(localStorage.getItem('todayVisitors')) || 0;

        animateCounter('visitorCount', totalVisitors);
        animateCounter('todayCount', todayVisitors);
    }, 300000); // 5 minutes
});

// Advanced version with more realistic simulation
function simulateRealTraffic() {
    // Simulate traffic patterns (more during day, less at night)
    const hour = new Date().getHours();
    let trafficMultiplier = 1;

    if (hour >= 9 && hour <= 17) {
        // Business hours - higher traffic
        trafficMultiplier = 1.5;
    } else if (hour >= 18 && hour <= 22) {
        // Evening - moderate traffic
        trafficMultiplier = 1.2;
    } else {
        // Night - lower traffic
        trafficMultiplier = 0.8;
    }

    return trafficMultiplier;
}

// Cyber Loader Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('cyber-loader');
    const progressFill = document.querySelector('.progress-fill');
    const progressPercent = document.querySelector('.progress-percent');
    const statusText = document.querySelector('.status-text');
    const tips = document.querySelectorAll('.tip');
    
    let progress = 0;
    let currentTip = 0;
    
    // Simulate loading process
    const loadingSimulation = setInterval(() => {
        progress += Math.random() * 8;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingSimulation);
            
            // Complete loading
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        }
        
        // Update progress
        progressFill.style.width = progress + '%';
        progressPercent.textContent = Math.floor(progress) + '%';
        
        // Update status text based on progress
        updateStatusText(progress);
        
    }, 200);
    
    // Rotate security tips
    setInterval(() => {
        tips[currentTip].classList.remove('active');
        currentTip = (currentTip + 1) % tips.length;
        tips[currentTip].classList.add('active');
    }, 3000);
    
    function updateStatusText(progress) {
        if (progress < 25) {
            statusText.textContent = 'System Scan';
        } else if (progress < 50) {
            statusText.textContent = 'Encrypting Connection';
        } else if (progress < 75) {
            statusText.textContent = 'Loading Modules';
        } else {
            statusText.textContent = 'Finalizing Security';
        }
    }
    
    // Add some random glitch effects
    setInterval(() => {
        if (Math.random() > 0.7) {
            document.querySelector('.glitch-text').style.animation = 'none';
            setTimeout(() => {
                document.querySelector('.glitch-text').style.animation = '';
            }, 100);
        }
    }, 2000);
});

// Optional: Real page load detection
window.addEventListener('load', function() {
    // Force completion if natural load finishes first
    setTimeout(() => {
        const loader = document.getElementById('cyber-loader');
        if (loader && loader.style.display !== 'none') {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 6000); // Maximum 6 seconds show time
});