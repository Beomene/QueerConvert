// ===== FABULOUS THEMED CURSOR =====
class GlitterCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'glitter-cursor';
        document.body.appendChild(this.cursor);
        
        // Create the inner swirling center
        this.center = document.createElement('div');
        this.center.className = 'cursor-center';
        this.cursor.appendChild(this.center);
        
        this.sparkles = [];
        this.lastX = 0;
        this.lastY = 0;
        
        this.bindEvents();
        this.updateThemeColors();
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('click', (e) => this.onClick(e));
        
        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    this.updateThemeColors();
                }
            });
        });
        observer.observe(document.body, { attributes: true });
    }
    
    updateThemeColors() {
        const bodyClass = document.body.className;
        let colors = ['#FFB3B3', '#B0D4FF', '#D9B0FF']; // default rainbow
        
        if (bodyClass.includes('theme-trans')) {
            colors = ['#5bcffb', '#f5a9b8', '#ffffff'];
        } else if (bodyClass.includes('theme-bi')) {
            colors = ['#d60270', '#9b4f96', '#0038a8'];
        } else if (bodyClass.includes('theme-pan')) {
            colors = ['#ff218c', '#ffd800', '#21b1ff'];
        } else if (bodyClass.includes('theme-lesbian')) {
            colors = ['#d52d00', '#ff9a56', '#a30262'];
        } else if (bodyClass.includes('theme-gay')) {
            colors = ['#078d70', '#26ceaa', '#5049cc'];
        } else if (bodyClass.includes('theme-poly')) {
            colors = ['#151647', '#ffd159', '#e82820'];
        } else if (bodyClass.includes('theme-agender')) {
            colors = ['#000000', '#cccccc', '#ffffff'];
        } else if (bodyClass.includes('theme-asexual')) {
            colors = ['#000000', '#a3a3a3', '#ffffff', '#800080'];
        } else if (bodyClass.includes('theme-aromantic')) {
            colors = ['#3da542', '#a7d379', '#ffffff', '#a9a9a9', '#000000'];
        } else if (bodyClass.includes('theme-nonbinary')) {
            colors = ['#fff430', '#ffffff', '#9c59d1', '#2d2d2d'];
        } else if (bodyClass.includes('theme-genderfluid')) {
            colors = ['#ff76a4', '#ffffff', '#bf11d7', '#000000', '#303cbe'];
        } else if (bodyClass.includes('theme-genderqueer')) {
            colors = ['#b57edc', '#ffffff', '#4a8123'];
        } else if (bodyClass.includes('theme-intersex')) {
            colors = ['#ffd800', '#800080'];
        } else if (bodyClass.includes('theme-demigirl')) {
            colors = ['#7f7f7f', '#ffc0cb', '#ffffff', '#ffc0cb', '#7f7f7f'];
        } else if (bodyClass.includes('theme-demiboy')) {
            colors = ['#7f7f7f', '#a4d3ff', '#ffffff', '#a4d3ff', '#7f7f7f'];
        } else if (bodyClass.includes('theme-queer')) {
            colors = ['#e0147c', '#ffffff', '#3fa63f'];
        }
        
        // Uppdatera cursorn med färgerna
        this.center.style.setProperty('--color-1', colors[0]);
        this.center.style.setProperty('--color-2', colors[1] || colors[0]);
        this.center.style.setProperty('--color-3', colors[2] || colors[0]);
        
        // Uppdatera ribbons om de finns
        document.documentElement.style.setProperty('--color-1', colors[0]);
        document.documentElement.style.setProperty('--color-2', colors[1] || colors[0]);
        document.documentElement.style.setProperty('--color-3', colors[2] || colors[0]);
    }
    
    onMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Move main cursor
        this.cursor.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
        
        // Leave sparkle trail (throttled)
        if (Math.hypot(x - this.lastX, y - this.lastY) > 15) {
            this.createSparkle(x, y);
            this.lastX = x;
            this.lastY = y;
        }
    }
    
    onClick(e) {
        // Create extra sparkles on click
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const angle = (i / 8) * Math.PI * 2;
                const distance = 30;
                const sparkleX = e.clientX + Math.cos(angle) * distance;
                const sparkleY = e.clientY + Math.sin(angle) * distance;
                this.createSparkle(sparkleX, sparkleY);
            }, i * 50);
        }
    }
    
    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        
        // Use theme colors for sparkles
        const colors = [
            getComputedStyle(this.center).getPropertyValue('--color-1').trim() || '#FFB3B3',
            getComputedStyle(this.center).getPropertyValue('--color-2').trim() || '#B0D4FF',
            getComputedStyle(this.center).getPropertyValue('--color-3').trim() || '#D9B0FF'
        ];
        
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// ===== PARALLAX BACKGROUND =====
class ParallaxBackground {
    constructor() {
        this.createLayers();
        this.bindScroll();
    }
    
    createLayers() {
        for (let i = 1; i <= 3; i++) {
            const layer = document.createElement('div');
            layer.className = `parallax-layer layer-${i}`;
            document.body.appendChild(layer);
        }
    }
    
    bindScroll() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const layers = document.querySelectorAll('.parallax-layer');
            
            layers.forEach((layer, index) => {
                const speed = 0.05 * (index + 1);
                const yPos = -(scrolled * speed);
                layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        });
    }
}

// ===== UPPDATERAD CONFETTI - SNABBARE FALL! =====
window.triggerConfetti = function(intensity = 'medium') {
    const colors = [
        '#FFB3B3', '#FFC9A2', '#FFF6B0', 
        '#B0E9CA', '#B0D4FF', '#D9B0FF'
    ];
    
    let count = 50;
    if (intensity === 'low') count = 25;
    if (intensity === 'medium') count = 50;
    if (intensity === 'high') count = 100;
    if (intensity === 'fabulous') count = 150;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -20 + 'px';
            confetti.style.width = Math.random() * 15 + 5 + 'px';
            confetti.style.height = Math.random() * 15 + 5 + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.boxShadow = '0 0 10px currentColor';
            confetti.style.animation = `fall ${1 + Math.random() * 1.5}s linear forwards`; // SNABBARE!
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 15); // Tätare intervall
    }
};

// Add keyframe animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== LASER RAINBOW - STUDsANDE, LYSANDE BAND =====
window.triggerLaserRainbow = function() {
    if (window.triggerConfetti) {
        window.triggerConfetti('fabulous');
    }
    
    // Färgpalett - pastell, starka, och svart/vit/grå
    const colors = [
        // Pasteller (mjuka, ljusa)
        '#FFB3B3', '#FFC9A2', '#FFF6B0', '#B0E9CA', '#B0D4FF', '#D9B0FF',
        // Vita och ljusa
        '#FFFFFF', '#FFF0F0', '#FFF9E6', '#F0FFF0', '#F0F0FF',
        // Starka neon (enstaka)
        '#FF3366', '#FF9933', '#33FF66', '#3366FF', '#9933FF',
        // Svarta, gråa, vita (monokroma band)
        '#FFFFFF', '#E0E0E0', '#C0C0C0', '#A0A0A0', '#808080', '#606060', '#404040', '#202020', '#000000'
    ];
    
    const bandCount = 20; // 20 studsande band
    
    for (let i = 0; i < bandCount; i++) {
        setTimeout(() => {
            // Skapa ett långt band
            const band = document.createElement('div');
            band.className = 'rainbow-band';
            
            // Slumpmässig startposition (kan börja utanför skärmen)
            const startX = -20 + Math.random() * 100;
            const startY = -20 + Math.random() * 100;
            
            // Slumpmässig längd (10-50% av skärmen)
            const length = 10 + Math.random() * 20;
            
            // Slumpmässig rotation (0-360 grader)
            const rotation = Math.random() * 360;
            
            // Välj 2-6 färger för detta band
            const bandColors = [];
            const colorCount = 2 + Math.floor(Math.random() * 5);
            for (let j = 0; j < colorCount; j++) {
                bandColors.push(colors[Math.floor(Math.random() * colors.length)]);
            }
            
            // Skapa gradient - olika riktningar för variation
            const gradientDirection = Math.random() > 0.5 ? '90deg' : '45deg';
            const gradientStops = [];
            for (let j = 0; j < bandColors.length; j++) {
                const pos = (j / (bandColors.length - 1)) * 100;
                gradientStops.push(`${bandColors[j]} ${pos}%`);
            }
            
            // Bandet är en lång rektangel
            band.style.position = 'fixed';
            band.style.left = startX + '%';
            band.style.top = startY + '%';
            band.style.width = length + 'vw';
            band.style.height = '4px'; // Tjocklek
            band.style.background = `linear-gradient(${gradientDirection}, ${gradientStops.join(', ')})`;
            band.style.transform = `rotate(${rotation}deg)`;
            band.style.transformOrigin = 'center center';
            band.style.boxShadow = `0 0 40px ${bandColors[0]}, 0 0 90px ${bandColors[bandColors.length-1]}`;
            band.style.pointerEvents = 'none';
            band.style.zIndex = '9999';
            band.style.opacity = '0.99';
            band.style.filter = 'blur(3px)';
            band.style.mixBlendMode = 'screen';
            
            // Animera bandet - studsande rörelse!
            const duration = 2; // 2 sekunder
            
            // Skapa en kaotisk bana med 3-5 punkter
            const points = [];
            const pointCount = 3 + Math.floor(Math.random() * 3);
            
            let currentX = startX;
            let currentY = startY;
            
            for (let j = 0; j < pointCount; j++) {
                // Studsa i olika riktningar
                currentX += (Math.random() - 0.5) * 40;
                currentY += (Math.random() - 0.5) * 80;
                
                // Håll inom rimliga gränser (kan gå utanför, det är coolt)
                points.push({
                    x: currentX,
                    y: currentY,
                    rotate: rotation + (Math.random() - 0.5) * 180,
                    scale: 0.5 + Math.random() * 0.5
                });
            }
            
            const bandId = 'band-' + Date.now() + '-' + i;
            band.setAttribute('data-band', bandId);
            
            // Bygg keyframes med alla punkter
            let keyframeText = '';
            
            // Start (0%)
            keyframeText += `
                0% {
                    left: ${startX}%;
                    top: ${startY}%;
                    transform: rotate(${rotation}deg) scale(1);
                    opacity: 0;
                    box-shadow: 0 0 30px ${bandColors[0]};
                }
            `;
            
            // Första punkten (20%)
            if (points.length > 0) {
                keyframeText += `
                    20% {
                        left: ${points[0].x}%;
                        top: ${points[0].y}%;
                        transform: rotate(${points[0].rotate}deg) scale(${points[0].scale});
                        opacity: 1;
                        box-shadow: 0 0 60px ${bandColors[0]}, 0 0 120px ${bandColors[bandColors.length-1]};
                    }
                `;
            }
            
            // Andra punkten (40%)
            if (points.length > 1) {
                keyframeText += `
                    40% {
                        left: ${points[1].x}%;
                        top: ${points[1].y}%;
                        transform: rotate(${points[1].rotate}deg) scale(${points[1].scale});
                        opacity: 1;
                        box-shadow: 0 0 80px ${bandColors[0]}, 0 0 160px ${bandColors[bandColors.length-1]};
                    }
                `;
            }
            
            // Tredje punkten (60%)
            if (points.length > 2) {
                keyframeText += `
                    60% {
                        left: ${points[2].x}%;
                        top: ${points[2].y}%;
                        transform: rotate(${points[2].rotate}deg) scale(${points[2].scale});
                        opacity: 1;
                        box-shadow: 0 0 100px ${bandColors[0]}, 0 0 200px ${bandColors[bandColors.length-1]};
                    }
                `;
            }
            
            // Fjärde punkten (80%)
            if (points.length > 3) {
                keyframeText += `
                    80% {
                        left: ${points[3].x}%;
                        top: ${points[3].y}%;
                        transform: rotate(${points[3].rotate}deg) scale(${points[3].scale});
                        opacity: 0.8;
                        box-shadow: 0 0 60px ${bandColors[0]}, 0 0 120px ${bandColors[bandColors.length-1]};
                    }
                `;
            }
            
            // Slut (100%) - försvinner
            const endX = points.length > 0 ? points[points.length-1].x + (Math.random() - 0.5) * 40 : startX + (Math.random() - 0.5) * 60;
            const endY = points.length > 0 ? points[points.length-1].y + (Math.random() - 0.5) * 40 : startY + (Math.random() - 0.5) * 60;
            
            keyframeText += `
                100% {
                    left: ${endX}%;
                    top: ${endY}%;
                    transform: rotate(${rotation + (Math.random() - 0.5) * 360}deg) scale(0.5);
                    opacity: 0;
                    box-shadow: 0 0 20px ${bandColors[0]};
                }
            `;
            
            const keyframes = `
                @keyframes band-${bandId} {
                    ${keyframeText}
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            band.style.animation = `band-${bandId} ${duration}s ease-in-out forwards`;
            
            document.body.appendChild(band);
            
            setTimeout(() => {
                band.remove();
                style.remove();
            }, duration * 1000 + 200);
            
        }, i * 60); // 60ms mellanrum
    }
    
    // Gör knappen glad
    const btn = document.getElementById('laserRainbowBtn');
    if (btn) {
        btn.style.transform = 'scale(1.1)';
        btn.style.background = 'linear-gradient(135deg, #FFB3B3, #FFC9A2, #FFF6B0, #B0E9CA, #B0D4FF, #D9B0FF, #FF3366, #000000)';
        btn.style.color = '#FFFFFF';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.style.background = 'linear-gradient(135deg, rgba(255, 243, 176, 0.2), rgba(217, 176, 255, 0.2))';
            btn.style.color = 'var(--text-primary)';
        }, 300);
    }
};

// ===== PINK CONFETTI FÖR ICE =====
const PINK_COLORS = [
    '#FF1493', '#FF69B4', '#FF00FF', 
    '#DA70D6', '#FF007F', '#FF218C',
    '#FF33CC', '#FF0099'
];

window.triggerPinkConfetti = function(intensity = 'medium') {
    let count = intensity === 'low' ? 20 : intensity === 'medium' ? 40 : 80;
    
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = -20 + 'px';
            confetti.style.width = Math.random() * 10 + 3 + 'px';
            confetti.style.height = Math.random() * 10 + 3 + 'px';
            confetti.style.background = PINK_COLORS[Math.floor(Math.random() * PINK_COLORS.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.boxShadow = '0 0 15px currentColor';
            confetti.style.animation = `fall ${1 + Math.random() * 1.5}s linear forwards`; // SNABBARE!
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 15);
    }
};

// ===== CHOCKVÅGOR =====
function createShockwave() {
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    shockwave.style.position = 'fixed';
    shockwave.style.left = '50%';
    shockwave.style.top = '50%';
    shockwave.style.width = '10px';
    shockwave.style.height = '10px';
    shockwave.style.borderRadius = '50%';
    shockwave.style.background = 'transparent';
    shockwave.style.border = `3px solid ${PINK_COLORS[Math.floor(Math.random() * PINK_COLORS.length)]}`;
    shockwave.style.transform = 'translate(-50%, -50%)';
    shockwave.style.pointerEvents = 'none';
    shockwave.style.zIndex = '9999';
    shockwave.style.animation = 'shockwave 1s ease-out forwards';
    shockwave.style.boxShadow = `0 0 50px ${PINK_COLORS[Math.floor(Math.random() * PINK_COLORS.length)]}`;
    
    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 1000);
}

// ===== ICE-EFFEKTER =====
function createIceEffects(count = 15) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const ice = document.createElement('div');
            ice.className = 'ice-effect';
            
            const pinkColor = PINK_COLORS[Math.floor(Math.random() * PINK_COLORS.length)];
            
            const shape = Math.random();
            if (shape < 0.3) {
                ice.style.width = '6px';
                ice.style.height = '6px';
                ice.style.background = 'transparent';
                ice.style.border = `2px solid ${pinkColor}`;
                ice.style.boxShadow = `0 0 15px ${pinkColor}`;
                ice.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else if (shape < 0.6) {
                ice.style.width = '3px';
                ice.style.height = '16px';
                ice.style.background = `linear-gradient(to bottom, ${pinkColor}, #FF69B4, ${pinkColor})`;
                ice.style.borderRadius = '2px';
                ice.style.boxShadow = `0 0 15px ${pinkColor}`;
                ice.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else {
                ice.style.width = '10px';
                ice.style.height = '10px';
                ice.style.background = pinkColor;
                ice.style.borderRadius = '3px';
                ice.style.boxShadow = `0 0 20px ${pinkColor}, inset 2px 2px 5px rgba(255,255,255,0.5)`;
            }
            
            ice.style.position = 'fixed';
            ice.style.left = Math.random() * 100 + '%';
            ice.style.top = Math.random() * 100 + '%';
            ice.style.pointerEvents = 'none';
            ice.style.zIndex = '9998';
            ice.style.animation = `ice-float ${1.5 + Math.random() * 2}s ease-out forwards`;
            ice.style.opacity = 0.8 + Math.random() * 0.2;
            
            document.body.appendChild(ice);
            setTimeout(() => ice.remove(), 3000);
        }, i * 40);
    }
}

// ===== BEAT-EFFEKT FÖR DISCO =====
let beatInterval;

function startBeat() {
    if (beatInterval) clearInterval(beatInterval);
    
    beatInterval = setInterval(() => {
        createShockwave();
        window.triggerPinkConfetti('low');
        
        const iceBtn = document.getElementById('iceButton');
        if (iceBtn) {
            iceBtn.style.transform = 'scale(1.05)';
            iceBtn.style.boxShadow = '0 0 50px #FF1493';
            setTimeout(() => {
                iceBtn.style.transform = 'scale(1)';
                iceBtn.style.boxShadow = '0 0 20px #FF1493';
            }, 200);
        }
    }, 500);
}

function stopBeat() {
    if (beatInterval) {
        clearInterval(beatInterval);
        beatInterval = null;
    }
}

// ===== F*** ICE FUNKTION =====
let discoInterval;
let isDiscoMode = false;
let iceClickCount = 0;

window.triggerIceMode = function() {
    const body = document.body;
    const iceBtn = document.getElementById('iceButton');
    const iceCounter = document.getElementById('iceCounter');
    
    iceClickCount++;
    iceCounter.textContent = iceClickCount;
    localStorage.setItem('iceClickCount', iceClickCount);
    
    createIceEffects(15);
    createShockwave();
    
    if (iceClickCount >= 99) {
        iceClickCount = 0;
        iceCounter.textContent = iceClickCount;
        localStorage.setItem('iceClickCount', iceClickCount);
        
        body.classList.add('disco-mode');
        body.classList.add('ultra-disco');
        
        startBeat();
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createIceEffects(20);
                window.triggerPinkConfetti('high');
                createShockwave();
            }, i * 200);
        }
        
        setTimeout(() => {
            body.classList.remove('disco-mode');
            body.classList.remove('ultra-disco');
            stopBeat();
        }, 10000);
        
        return;
    }
    
    if (!isDiscoMode) {
        isDiscoMode = true;
        body.classList.add('disco-mode');
        
        if (iceBtn) {
            iceBtn.innerHTML = 'F-ICE (ON)';
        }
        
        startBeat();
        
        discoInterval = setInterval(() => {
            window.triggerPinkConfetti('low');
            createIceEffects(8);
        }, 400);
        
    } else {
        isDiscoMode = false;
        body.classList.remove('disco-mode');
        
        if (iceBtn) {
            iceBtn.innerHTML = 'F-ICE';
        }
        
        if (discoInterval) {
            clearInterval(discoInterval);
        }
        
        stopBeat();
        
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                window.triggerPinkConfetti('high');
                createIceEffects(30);
                createShockwave();
            }, i * 100);
        }
    }
};

// ===== SHOCKWAVE STYLES =====
const shockwaveStyle = document.createElement('style');
shockwaveStyle.textContent = `
    @keyframes shockwave {
        0% {
            width: 10px;
            height: 10px;
            opacity: 1;
            border-width: 3px;
        }
        100% {
            width: 500px;
            height: 500px;
            opacity: 0;
            border-width: 1px;
        }
    }
    
    @keyframes ice-float {
        0% {
            transform: translate(0, 0) rotate(0deg) scale(0.3);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translate(15px, -20px) rotate(45deg) scale(1);
        }
        40% {
            transform: translate(-20px, -50px) rotate(90deg) scale(0.9);
        }
        60% {
            transform: translate(25px, -80px) rotate(135deg) scale(1.1);
        }
        80% {
            transform: translate(-15px, -110px) rotate(180deg) scale(0.8);
            opacity: 0.6;
        }
        100% {
            transform: translate(0, -140px) rotate(225deg) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(shockwaveStyle);

// ===== FIXA RIBBONS =====
function fixRibbons() {
    const oldRibbons = document.querySelectorAll('.theme-ribbon');
    oldRibbons.forEach(r => r.remove());
    
    const topRibbon = document.createElement('div');
    topRibbon.className = 'theme-ribbon ribbon-top';
    document.body.appendChild(topRibbon);
    
    const bottomRibbon = document.createElement('div');
    bottomRibbon.className = 'theme-ribbon ribbon-bottom';
    document.body.appendChild(bottomRibbon);
    
    const bodyClass = document.body.className;
    let colors = ['#FFB3B3', '#B0D4FF', '#D9B0FF'];
    
    if (bodyClass.includes('theme-trans')) {
        colors = ['#5bcffb', '#f5a9b8', '#ffffff'];
    } else if (bodyClass.includes('theme-bi')) {
        colors = ['#d60270', '#9b4f96', '#0038a8'];
    } else if (bodyClass.includes('theme-pan')) {
        colors = ['#ff218c', '#ffd800', '#21b1ff'];
    } else if (bodyClass.includes('theme-lesbian')) {
        colors = ['#d52d00', '#ff9a56', '#a30262'];
    } else if (bodyClass.includes('theme-gay')) {
        colors = ['#078d70', '#26ceaa', '#5049cc'];
    } else if (bodyClass.includes('theme-poly')) {
        colors = ['#151647', '#ffd159', '#e82820'];
    }
    
    document.documentElement.style.setProperty('--color-1', colors[0]);
    document.documentElement.style.setProperty('--color-2', colors[1] || colors[0]);
    document.documentElement.style.setProperty('--color-3', colors[2] || colors[0]);
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    new GlitterCursor();
    new ParallaxBackground();
    
    fixRibbons();
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                fixRibbons();
            }
        });
    });
    observer.observe(document.body, { attributes: true });
    
    const savedCount = localStorage.getItem('iceClickCount');
    if (savedCount) {
        iceClickCount = parseInt(savedCount);
        const iceCounter = document.getElementById('iceCounter');
        if (iceCounter) {
            iceCounter.textContent = iceClickCount;
        }
    }
    
    window.triggerConfetti = window.triggerConfetti;
    window.triggerPinkConfetti = window.triggerPinkConfetti;
    window.triggerLaserRainbow = window.triggerLaserRainbow;
    window.triggerIceMode = window.triggerIceMode;
});
