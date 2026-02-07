document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    const ctaButtons = document.querySelectorAll('.scroll-to-contact');
    
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                smoothScroll(href);
                
                const navToggle = document.getElementById('nav-toggle');
                if (navToggle && navToggle.checked) {
                    navToggle.checked = false;
                }
            }
        });
    });
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll('#contact');
            
            const navToggle = document.getElementById('nav-toggle');
            if (navToggle && navToggle.checked) {
                navToggle.checked = false;
            }
        });
    });
    
    function highlightActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink();
    
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            if (scrollTop > lastScrollTop) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('sticky');
            header.classList.remove('hidden');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('animate-on-scroll', 'fade-in-up');
        observer.observe(section);
    });
    
    const statBoxes = document.querySelectorAll('.stat-container > div');
    statBoxes.forEach((box, index) => {
        box.classList.add('animate-on-scroll', 'scale-in', `delay-${(index + 1) * 100}`);
        observer.observe(box);
    });
    
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll', 'fade-in-up', `delay-${Math.min((index % 3 + 1) * 100, 300)}`);
        observer.observe(card);
    });
    
    const benefitItems = document.querySelectorAll('.benefits li');
    benefitItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll', 'fade-in-right', `delay-${Math.min((index + 1) * 100, 400)}`);
        observer.observe(item);
    });
    
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach((card, index) => {
        const direction = index === 0 ? 'fade-in-left' : 'fade-in-right';
        card.classList.add('animate-on-scroll', direction, `delay-${(index + 1) * 200}`);
        observer.observe(card);
    });
    
    const approachTabs = document.querySelectorAll('.approach-tab');
    approachTabs.forEach((tab, index) => {
        tab.classList.add('animate-on-scroll', 'fade-in-left', `delay-${(index + 1) * 100}`);
        observer.observe(tab);
    });
    
    const approachImages = document.querySelectorAll('.img-card');
    approachImages.forEach((img, index) => {
        img.classList.add('animate-on-scroll', 'scale-in', `delay-${(index + 1) * 200}`);
        observer.observe(img);
    });
});
