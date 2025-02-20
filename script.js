// Initialize scripts once DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scrolling: Enhances navigation fluidity
    const navLinks = document.querySelectorAll('.nav-menu a, .btn, .subjects a, .chapter-actions a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Dynamic Active Navigation State: Highlights current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-menu a');
    navItems.forEach(item => {
        const itemPath = item.getAttribute('href').split('/').pop();
        if (itemPath === currentPath) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Search Functionality: Real-time filtering with error handling
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('#search');
    const errorMessage = document.querySelector('.error-message');
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            filterContent(searchInput.value.toLowerCase());
        });
        searchInput.addEventListener('input', () => {
            filterContent(searchInput.value.toLowerCase());
        });
    }

    function filterContent(query) {
        const subjects = document.querySelectorAll('.subjects a');
        const chapters = document.querySelectorAll('.chapters li');
        let visibleItems = 0;

        subjects.forEach(subject => {
            const text = subject.textContent.toLowerCase();
            const isVisible = text.includes(query);
            subject.parentElement.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleItems++;
        });

        chapters.forEach(chapter => {
            const text = chapter.querySelector('h4').textContent.toLowerCase();
            const isVisible = text.includes(query);
            chapter.style.display = isVisible ? '' : 'none';
            if (isVisible) visibleItems++;
        });

        if (errorMessage) {
            errorMessage.style.display = visibleItems === 0 && query ? 'block' : 'none';
        }
    }

    // Micro-Interactions: Adds tactile feedback to buttons
    const buttons = document.querySelectorAll('.btn, .chapter-actions a, .search-form button');
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.98)';
        });
        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });

    // Scroll-Triggered Animations: Reveals content dynamically
    const animatedElements = document.querySelectorAll('.subjects li, .chapters li');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });

    // Onboarding: Hides message after interaction
    const onboardingMessage = document.querySelector('.onboarding-message');
    if (onboardingMessage) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('.hero-cta') || e.target.closest('.nav-menu')) {
                onboardingMessage.style.opacity = '0';
                setTimeout(() => onboardingMessage.style.display = 'none', 300);
            }
        });
    }

    // Error Prevention: Validates chapter links
    const chapterLinks = document.querySelectorAll('.chapter-actions a');
    chapterLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
                e.preventDefault();
                alert('This resource is coming soon! Check back later.');
            }
        });
    });

    // Creative Particle Effect: Adds visual flair to hero (optimized)
    const particleContainer = document.querySelector('.hero-particles');
    if (particleContainer) {
        for (let i = 0; i < 10; i++) { // Reduced count for performance
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
            particleContainer.appendChild(particle);
        }
    }

    // Smart Suggestion: AI-inspired feature with cleanup
    const smartSuggestion = document.querySelector('.smart-suggestion');
    if (smartSuggestion && currentPath === 'index.html') {
        setTimeout(() => {
            smartSuggestion.style.display = 'block';
            setTimeout(() => {
                smartSuggestion.style.opacity = '0';
                setTimeout(() => smartSuggestion.style.display = 'none', 300);
            }, 5000); // Fade out after 5 seconds
        }, 2000); // Show after 2 seconds
    }
});