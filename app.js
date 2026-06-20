let currentTheme = 'dark';
let currentLang = 'EN';

const translations = {
    EN: { tagline: "Creative Multidisciplinary" },
    UR: { tagline: "تخلیقی تکنیکی ماہر" },
    TR: { tagline: "Yaratıcı Multidisipliner" }
};

// --- 1. DYNAMIC FLUID CURSOR FOLLOWERS ENGINE ---
const cursor = document.getElementById('custom-cursor');
const cursorDot = document.getElementById('custom-cursor-dot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    // Anchor core dot instantly to the pointer coordinates
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

// Smooth fluid tracking interpolation loop
function animateCursor() {
    let dt = 0.12; // Interpolation friction vector
    cursorX += (mouseX - cursorX) * dt;
    cursorY += (mouseY - cursorY) * dt;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Mouse pointer hover feedback triggers
document.querySelectorAll('a, button, .polaroid-card').forEach(item => {
    item.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


// --- 2. MULTI-LAYER RESPONSIVE SPIRAL PATHS GENERATOR ---
const spiralGroup = document.getElementById('spiral-group');

function generateMultiSpirals() {
    spiralGroup.innerHTML = '';
    const w = window.innerWidth, h = window.innerHeight;
    const cx = w / 2, cy = h / 2 - 40;
    const isMobile = w < 768;

    const lineCount = isMobile ? 10 : 6;
    const offsetSpacing = isMobile ? 6 : 12;
    const strokeColor = currentTheme === 'dark' ? '#f2eae1' : '#1b3322';

    for (let i = 0; i < lineCount; i++) {
        const step = i * offsetSpacing;
        let dLeft, dRight;

        if (isMobile) {
            dLeft = `M -40,${h * 0.1 + step * 2} C ${w * 0.45},${h * 0.02 + step} ${0 - step},${cy - 60} ${cx - 45 + step * 0.3},${cy - 25} Q ${cx},${cy + 45 - step * 0.4} ${cx},${cy}`;
            dRight = `M ${w + 40},${h * 0.9 - step * 2} C ${w * 0.55},${h * 0.98 - step} ${w + step},${cy + 60} ${cx + 45 - step * 0.3},${cy + 25} Q ${cx},${cy - 45 + step * 0.4} ${cx},${cy}`;
        } else {
            dLeft = `M -50,${h * 0.2 + step} Q ${w * 0.22},${h * 0.05 + step} ${w * 0.33},${cy - step * 0.5} T ${cx - 50 + step * 0.3},${cy + 30 - step * 0.2} Q ${cx},${cy + 50 - step} ${cx},${cy}`;
            dRight = `M ${w + 50},${h * 0.8 - step} Q ${w * 0.78},${h * 0.95 - step} ${w * 0.67},${cy + step * 0.5} T ${cx + 50 - step * 0.3},${cy - 30 + step * 0.2} Q ${cx},${cy - 50 + step} ${cx},${cy}`;
        }

        [dLeft, dRight].forEach(d => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', strokeColor);
            path.setAttribute('stroke-width', i === 0 ? '1.25' : '0.75');
            path.setAttribute('opacity', (isMobile ? 0.38 - (i * 0.035) : 0.4 - (i * 0.05)).toString());
            path.setAttribute('class', 'spiral-line');
            spiralGroup.appendChild(path);
        });
    }
}


// --- 3. ISOLATED SECTION PATTERN CANVAS ENGINE ---
const sectionContainer = document.getElementById('creator-section');
const localCanvas = document.getElementById('gridPatternCanvas');

let localW, localH;
let waveLines = [];

if (localCanvas && sectionContainer) {
    const localCtx = localCanvas.getContext('2d');

    function resizeLocalCanvas() {
        localW = localCanvas.width = sectionContainer.clientWidth;
        localH = localCanvas.height = sectionContainer.clientHeight;
        
        waveLines = [];
        for(let i = 0; i < 3; i++) {
            waveLines.push({
                x: localW * (0.25 + i * 0.25),
                speed: 0.004 + (i * 0.002),
                offset: Math.random() * 100
            });
        }
    }

    function drawSectionPattern() {
        localCtx.clearRect(0, 0, localW, localH);
        localCtx.strokeStyle = currentTheme === 'dark' ? '#f2eae1' : '#1b3322';
        localCtx.lineWidth = 0.5;
        
        waveLines.forEach(line => {
            line.offset += line.speed;
            localCtx.beginPath();
            for(let y = 0; y <= localH; y += 10) {
                let xOffset = Math.sin(y * 0.004 + line.offset) * 30;
                if(y === 0) localCtx.moveTo(line.x + xOffset, y);
                else localCtx.lineTo(line.x + xOffset, y);
            }
            localCtx.stroke();
        });
        requestAnimationFrame(drawSectionPattern);
    }

    resizeLocalCanvas();
    drawSectionPattern();
}


// --- 4. TACTILE POLAROID STACK CARD LOOPING ENGINE ---
let cardStack = Array.from(document.querySelectorAll('.stack-card'));
let isAnimatingCard = false;

cardStack.forEach((card, idx) => {
    card.addEventListener('click', () => {
        // Prevent click registration if card swipe translation sequence is currently executing
        if (isAnimatingCard || card.style.getPropertyValue('--index') !== '0') return;
        isAnimatingCard = true;

        // Animate the top card sliding outwards with an arching sweep
        gsap.to(card, {
            x: window.innerWidth < 768 ? 160 : 220,
            rotation: 15,
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                // Shift stack variables index counters internally
                cardStack.forEach(c => {
                    let cIdx = parseInt(c.style.getPropertyValue('--index'));
                    let newIdx = cIdx === 0 ? cardStack.length - 1 : cIdx - 1;
                    c.style.setProperty('--index', newIdx);
                    
                    if(newIdx === 0) c.classList.add('cursor-pointer');
                    else c.classList.remove('cursor-pointer');
                });

                // Drop swiped card back onto background tier matching deck positions
                gsap.fromTo(card, 
                    { x: window.innerWidth < 768 ? -160 : -220, rotation: -15, opacity: 0 },
                    { x: 0, rotation: -4, opacity: 1, duration: 0.4, ease: "power2.out", onComplete: () => {
                        isAnimatingCard = false;
                    }}
                );
            }
        });
    });
});


// --- 5. THEME & UTILITIES EVENT HANDLING HANDLERS ---
const themeToggle = document.getElementById('theme-toggle');
const iconPath = document.getElementById('icon-path');

themeToggle.addEventListener('click', () => {
    const body = document.body;
    if (currentTheme === 'dark') {
        currentTheme = 'light';
        body.classList.remove('bg-brand-darkGreen', 'text-brand-cream');
        body.classList.add('bg-brand-beige', 'text-brand-darkGreen');
        iconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
    } else {
        currentTheme = 'dark';
        body.classList.remove('bg-brand-beige', 'text-brand-darkGreen');
        body.classList.add('bg-brand-darkGreen', 'text-brand-cream');
        iconPath.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
    }
    generateMultiSpirals();
});

const langMenuBtn = document.getElementById('lang-menu-btn');
const langDropdown = document.getElementById('lang-dropdown');
const langActive = document.getElementById('lang-active');
const heroTagline = document.getElementById('hero-tagline');

langMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('opacity-0');
    langDropdown.classList.toggle('pointer-events-none');
    langDropdown.classList.toggle('translate-y-[-10px]');
});

document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        langActive.innerText = lang;
        
        heroTagline.style.opacity = '0';
        setTimeout(() => {
            heroTagline.innerText = translations[lang].tagline;
            heroTagline.style.opacity = '0.7';
        }, 300);
    });
});

document.addEventListener('click', () => {
    langDropdown.classList.add('opacity-0', 'pointer-events-none', 'translate-y-[-10px]');
});

// --- 6. CORE ON-LOAD SEQUENCER ---
generateMultiSpirals();
window.addEventListener('resize', () => {
    bgW = bgCanvas.width = window.innerWidth;
    bgH = bgCanvas.height = window.innerHeight;
    generateMultiSpirals();
});

window.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    tl.to("#portrait-wrapper", { opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" });
    tl.fromTo(".spiral-line", { strokeDasharray: "2000", strokeDashoffset: "2000" }, { strokeDashoffset: "0", duration: 2.2, ease: "power2.inOut", stagger: 0.07 }, "-=0.9");
    tl.to("#hero-name", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.2");
    tl.to("#hero-tagline", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.9");
});