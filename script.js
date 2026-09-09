// ===== SMOOTH SCROLL BEHAVIOR ===== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update active nav link
            updateActiveNavLink(targetId);
        }
    });
});

// ===== ACTIVE NAVIGATION LINK ===== //
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== SCROLL REVEAL ANIMATIONS ===== //
const scrollRevealElements = document.querySelectorAll('section, article, .education-item, .navbar a');

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

scrollRevealElements.forEach(element => {
    observer.observe(element);
});

// ===== EMAIL COPY TO CLIPBOARD ===== //
document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            const email = this.getAttribute('href').replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!');
            }).catch(() => {
                console.log('Email: ' + email);
            });
        });
    }
});

// ===== NOTIFICATION TOAST ===== //
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background-color: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInUp 0.4s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.4s ease-out forwards';
        setTimeout(() => notification.remove(), 400);
    }, 2500);
}

// ===== HEADER ANIMATION ON LOAD ===== //
window.addEventListener('load', () => {
    const headerContent = document.querySelector('.header-content');
    const headerImage = document.querySelector('.header-image');
    
    if (headerContent) {
        headerContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
    if (headerImage) {
        headerImage.style.animation = 'scaleIn 0.8s ease-out 0.2s backwards';
    }
});

// ===== SKILL LEVEL ANIMATION ===== //
const skillItems = document.querySelectorAll('#skills ul li');
skillItems.forEach((skill, index) => {
    skill.style.animation = `fadeInUp 0.6s ease-out ${0.1 * index}s backwards`;
});

// ===== PROJECT HOVER EFFECTS ===== //
const projectArticles = document.querySelectorAll('#projects article');
projectArticles.forEach(article => {
    article.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    article.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== ACHIEVEMENTS COUNTER ===== //
const achievementsList = document.querySelector('#achievements ul');
if (achievementsList) {
    const achievements = achievementsList.querySelectorAll('li');
    const achievementCount = achievements.length;
    
    // You can use this for future enhancement
    console.log(`Total Achievements: ${achievementCount}`);
}

// ===== KEYBOARD NAVIGATION ===== //
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open details elements
        document.querySelectorAll('details[open]').forEach(detail => {
            detail.removeAttribute('open');
        });
    }
});

// ===== MOBILE RESPONSIVENESS ===== //
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow to header when scrolled
    if (scrollTop > 0) {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== DETAILS ANIMATION ===== //
document.querySelectorAll('#learning details').forEach(detail => {
    detail.addEventListener('toggle', function() {
        if (this.open) {
            const content = this.querySelector('p');
            if (content) {
                content.style.animation = 'slideDown 0.3s ease-out';
            }
        }
    });
});

// ===== NAVBAR MOBILE MENU ===== //
// Function to close navbar on mobile
function closeNavbarOnMobile() {
    if (window.innerWidth <= 768) {
        // Any mobile-specific navbar behavior can be added here
    }
}

window.addEventListener('click', (e) => {
    // Close details/menus when clicking outside on mobile
    if (window.innerWidth <= 768 && !e.target.closest('details')) {
        document.querySelectorAll('details[open]').forEach(detail => {
            detail.removeAttribute('open');
        });
    }
});

// ===== LOADING STATE ===== //
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===== BACK TO TOP BUTTON ===== //
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.id = 'backToTop';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        background-color: #6366f1;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#4f46e5';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#6366f1';
        this.style.transform = 'scale(1)';
    });
}

// Initialize back-to-top button after DOM is loaded
document.addEventListener('DOMContentLoaded', createBackToTopButton);

// ===== PERFORMANCE: LAZY LOAD IMAGES ===== //
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                setTimeout(() => {
                    img.style.transition = 'opacity 0.4s ease';
                    img.style.opacity = '1';
                }, 50);
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== ANIMATION KEYFRAMES IN CSS ===== //
// These keyframes are already defined in CSS, but we can enhance them with JS
const style = document.createElement('style');
style.innerHTML = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(30px);
        }
    }
`;
document.head.appendChild(style);

// ===== CONSOLE MESSAGE ===== //
console.log('%cKajal Kumari\'s Portfolio', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cWelcome! Check out the source code and feel free to reach out.', 'font-size: 14px; color: #6b7280;');
console.log('%cEmail: kajalshah6781@gmail.com', 'font-size: 12px; color: #6366f1;');
