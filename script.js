// Optimized preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.querySelector('.preloader');
    
    // Show content immediately
    document.body.style.visibility = 'visible';
    
    // Hide preloader after 500ms (minimum time to prevent flash)
    setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }, 500);
});

// Mobile Menu Toggle - optimized
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-times');
    navbar.classList.toggle('active');
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link - optimized
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('fa-times');
        navbar.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Sticky Header - optimized with debounce
let lastScroll = 0;
const header = document.querySelector('.header');

function handleScroll() {
    const currentScroll = window.scrollY;
    if (Math.abs(currentScroll - lastScroll) > 5) {
        header.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// Typing Effect - optimized
const typingText = document.querySelector('.typing-text');
if (typingText) {
    const words = ['Web Developer', 'Frontend Engineer', 'React Developer', 'UI/UX Enthusiast'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeTimeout;

    const type = () => {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.querySelector('span').textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            typeTimeout = setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            typeTimeout = setTimeout(type, 50);
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            typeTimeout = setTimeout(type, 1000);
        }
    };

    // Start typing effect
    typeTimeout = setTimeout(type, 1000);
}

// Tab Switching - optimized
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Achievements Slider - optimized
const initSlider = () => {
    const sliderTrack = document.querySelector('.slider-track');
    if (!sliderTrack) return;

    const slides = document.querySelectorAll('.slider-slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentSlide = 0;
    const slideWidth = slides[0].clientWidth;
    let slideInterval;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    const updateSlider = () => {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    };
    
    const goToSlide = (slideIndex) => {
        currentSlide = slideIndex;
        updateSlider();
        resetInterval();
    };
    
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    };
    
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    };
    
    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    };
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });
    
    // Auto slide
    slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    sliderTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderTrack.addEventListener('mouseleave', resetInterval);
    
    // Responsive adjustments
    window.addEventListener('resize', () => {
        sliderTrack.style.transition = 'none';
        updateSlider();
        setTimeout(() => {
            sliderTrack.style.transition = 'transform 0.5s ease';
        }, 10);
    });
};

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlider);

// Form Submission - optimized
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        console.log({ name, email, subject, phone, message });
        
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Active section highlighting - optimized with IntersectionObserver
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for all links - optimized
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});