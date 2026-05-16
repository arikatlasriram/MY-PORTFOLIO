document.addEventListener('DOMContentLoaded', () => {
    // Intro Loader Timeout
    const loader = document.getElementById('intro-loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
    }, 3000); // 3 seconds


    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < triggerBottom) {
                reveal.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Mobile Menu Toggle (Simplified)
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Add actual mobile menu logic here if needed
    });

    // Smooth Scrolling for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending...</span>';
            formStatus.textContent = 'Sending your message...';
            formStatus.className = '';

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = 'Message sent! If this is your first time, please check your email (and Spam folder) to click "Activate Form".';
                    formStatus.className = 'success';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                    } else {
                        formStatus.textContent = 'Oops! There was a problem submitting your form.';
                    }
                    formStatus.className = 'error';
                }
            } catch (error) {
                formStatus.textContent = 'Oops! There was a problem connecting to the server.';
                formStatus.className = 'error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Message</span><i data-lucide="send"></i>';
                lucide.createIcons();
            }
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Active Section Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });

        // Scroll Progress Bar
        const scrollProgress = document.getElementById('scroll-progress');
        const scrollTotal = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTotal / height) * 100;
        if(scrollProgress) {
            scrollProgress.style.width = scrollPercentage + '%';
        }
    });

    // Hero Name Animation (Simple & Professional Reveal)
    const heroName = document.getElementById('hero-name');
    if (heroName) {
        const text = heroName.textContent;
        heroName.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${i * 0.04}s`;
            heroName.appendChild(span);
        });
    }

    // Initialize Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
