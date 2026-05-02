(function() {
    // Custom Cursor
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let cursorEnabled = false;

    function isDesktopCursor() {
        return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }

    function enableCursor() {
        cursorEnabled = true;

        if (cursorDot) cursorDot.style.display = "block";
        if (cursorOutline) cursorOutline.style.display = "block";
        document.body.style.cursor = "none";
    }

    function disableCursor() {
        cursorEnabled = false;

        if (cursorDot) cursorDot.style.display = "none";
        if (cursorOutline) cursorOutline.style.display = "none";
        document.body.style.cursor = "auto";
    }

    function updateCursorMode() {
        if (isDesktopCursor()) {
            enableCursor();
        } else {
            disableCursor();
        }
    }

    document.addEventListener("mousemove", function (e) {
        if (!cursorEnabled) return;

        mouseX = e.clientX;
        mouseY = e.clientY;

        if (cursorDot) {
            cursorDot.style.transform =
                `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        }
    });

    function animateOutline() {
        if (cursorEnabled && cursorOutline) {
            outlineX += (mouseX - outlineX) * 0.18;
            outlineY += (mouseY - outlineY) * 0.18;

            cursorOutline.style.transform =
                `translate(${outlineX}px, ${outlineY}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(animateOutline);
    }

    animateOutline();

    const hoverElements = document.querySelectorAll(
        'a, button, .btn-primary, .btn-outline, .service-card, .tool-card, .work-card, .contact-info-item, input, textarea, .view-btn, .hero-image-container'
    );

    hoverElements.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
            if (!cursorEnabled) return;
            if (cursorDot) cursorDot.classList.add("hover");
            if (cursorOutline) cursorOutline.classList.add("hover");
        });

        el.addEventListener("mouseleave", function () {
            if (!cursorEnabled) return;
            if (cursorDot) cursorDot.classList.remove("hover");
            if (cursorOutline) cursorOutline.classList.remove("hover");
        });
    });

    document.addEventListener("mouseleave", function () {
        if (cursorDot) cursorDot.style.opacity = "0";
        if (cursorOutline) cursorOutline.style.opacity = "0";
    });

    document.addEventListener("mouseenter", function () {
        if (!cursorEnabled) return;
        if (cursorDot) cursorDot.style.opacity = "1";
        if (cursorOutline) cursorOutline.style.opacity = "1";
    });

    window.addEventListener("resize", updateCursorMode);
    updateCursorMode();

    // Particles
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = window.innerWidth < 480 ? 15 : 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.background = Math.random() > 0.5 ? 'rgba(0, 217, 255, 0.4)' : 'rgba(108, 92, 231, 0.4)';
        particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
        particle.style.animationDelay = (Math.random() * 15) + 's';
        particlesContainer.appendChild(particle);
    }

    // Loader
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.body.classList.add('loaded');
            setTimeout(function() {
                const loader = document.getElementById('loader');
                if (loader) loader.style.display = 'none';
            }, 800);
        }, 2000);
    });

    // Typing Effect
    const words = ['Cybersecurity', 'Web Designing', 'Freelancing', 'Virtual Assistance'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const typingEl = document.getElementById('typing-text');

    function typeEffect() {
        if (!typingEl) return;
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        if (!isDeleting && charIndex === currentWord.length) {
            setTimeout(function() {
                isDeleting = true;
                typeEffect();
            }, 2000);
            return;
        }
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 500);
            return;
        }
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    if (typingEl) typeEffect();

    // Theme Toggle
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    const themeIcon = themeBtn?.querySelector('i');
    const themeSpan = themeBtn?.querySelector('span');

    function setTheme(theme) {
        if (theme === 'light') {
            body.classList.add('light');
            body.classList.remove('dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (themeSpan) themeSpan.textContent = 'Light';
            localStorage.setItem('rtcTheme', 'light');
        } else {
            body.classList.remove('light');
            body.classList.add('dark');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (themeSpan) themeSpan.textContent = 'Dark';
            localStorage.setItem('rtcTheme', 'dark');
        }
    }

    const savedTheme = localStorage.getItem('rtcTheme') || 'dark';
    setTheme(savedTheme);

    themeBtn?.addEventListener('click', function() {
        const next = body.classList.contains('light') ? 'dark' : 'light';
        setTheme(next);
    });

    // Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    fadeElements.forEach(function(el) {
        observer.observe(el);
    });

    // Mobile Menu Close
    document.querySelectorAll('.nav-links > li > a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            const parent = this.parentElement;
            if (!parent.classList.contains('dropdown-parent')) {
                document.getElementById('hamburger-toggle').checked = false;
            }
        });
    });

    // Mobile Dropdown Toggle for Navigation
    if (window.innerWidth <= 768) {
        const dropdownParents = document.querySelectorAll('.dropdown-parent > a');
        dropdownParents.forEach(function(parentLink) {
            parentLink.addEventListener('click', function(e) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('open');
            });
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown-parent')) {
                document.querySelectorAll('.dropdown-parent').forEach(function(parent) {
                    parent.classList.remove('open');
                });
            }
        });
    }

// ==============================
// ACTIVE NAVIGATION FINAL
// ==============================
(function () {
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    function clearActive() {
        navLinks.forEach(link => link.classList.remove("active"));
    }

    function setActiveByHref(href) {
        navLinks.forEach(link => {
            if (link.getAttribute("href") === href) {
                link.classList.add("active");
            }
        });
    }

    if (currentPage !== "index.html") {
        clearActive();
        setActiveByHref(currentPage);
        return;
    }

    function updateActiveNav() {
        let currentSection = "home";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        clearActive();

        if (currentSection === "home") {
            setActiveByHref("index.html");
        } 
        else if (currentSection === "services" || currentSection === "tools") {
            setActiveByHref("skills.html");
        }
        else if (currentSection === "works") {
            setActiveByHref("works.html");
        } 
        else {
            setActiveByHref("index.html#" + currentSection);
        }
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();
})();
})();