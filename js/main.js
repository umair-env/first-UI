const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

const mainNav = document.getElementById('main-nav');
const navToggle = document.getElementById('nav-toggle');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -76 });
            mainNav.classList.remove('menu-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

const navSectionLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const navSections = Array.from(navSectionLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function setActiveNavLink() {
    let current = navSectionLinks[0];
    navSections.forEach((section, i) => {
        if (section.offsetTop <= window.scrollY + 120) {
            current = navSectionLinks[i];
        }
    });
    navSectionLinks.forEach(link => link.classList.toggle('active', link === current));
}

window.addEventListener('scroll', () => {
    mainNav.classList.toggle('scrolled', window.scrollY > 40);
    setActiveNavLink();
}, { passive: true });
setActiveNavLink();

const title = document.querySelector('#split-title');
const text = title.innerText;
title.innerHTML = '';
text.split('').forEach(char => {
    if (char === '\n') {
        title.appendChild(document.createElement('br'));
        return;
    }
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.className = 'char';
    title.appendChild(span);
});

const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.5, ease: "power2.out" });
    });
}

window.addEventListener('load', () => {
    const tl = gsap.timeline();
    tl.to('.char', { y: 0, stagger: 0.04, duration: 1, ease: "power4.out" });
    tl.to('#hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");
    tl.to('#hero-top', { opacity: 1, duration: 0.8 }, "-=0.8");
    tl.to('#hero-desc', { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5");
    tl.to('#hero-actions', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
    tl.to('#hero-stats', { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4");
    tl.to('#scroll-hint', { opacity: 1, duration: 0.8 }, "-=0.3");
});

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.reveal').forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

document.querySelectorAll('.section-label').forEach(label => {
    gsap.fromTo(label,
        { "--line-width": "0%" },
        {
            scrollTrigger: { trigger: label, start: "top 88%" },
            "--line-width": "100%",
            duration: 1
        }
    );
});

document.querySelectorAll('.portfolio-item .parallax-wrap').forEach(item => {
    gsap.to(item, {
        y: -60,
        scrollTrigger: {
            trigger: item.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

const magneticLinks = document.querySelectorAll('.footer-col a, .logo, .btn, .nav-cta');
magneticLinks.forEach(link => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    link.addEventListener('mousemove', (e) => {
        const rect = link.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(link, { x: x * 0.25, y: y * 0.25, duration: 0.3 });
        gsap.to(follower, { scale: 1.5, duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { x: 0, y: 0, duration: 0.3 });
        gsap.to(follower, { scale: 1, duration: 0.3 });
    });
});

document.querySelectorAll('.service-card.black, footer, .cta-band, .marquee-wrap').forEach(el => {
    ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: self => {
            if (!window.matchMedia('(pointer: fine)').matches) return;
            if (self.isActive) {
                gsap.to(cursor, { backgroundColor: '#FFFFFF', duration: 0.3 });
                gsap.to(follower, { borderColor: '#FFFFFF', duration: 0.3 });
            } else {
                gsap.to(cursor, { backgroundColor: '#000000', duration: 0.3 });
                gsap.to(follower, { borderColor: '#000000', duration: 0.3 });
            }
        }
    });
});
