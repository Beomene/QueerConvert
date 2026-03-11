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

// ===== LASER RAINBOW =====
window.triggerLaserRainbow = function() {
    if (window.triggerConfetti) {
        window.triggerConfetti('fabulous');
    }
    
    const colors = [
        '#FF3366', '#FF9933', '#FFCC33', 
        '#33FF66', '#33FFCC', '#3366FF',
        '#9933FF', '#FF33CC', '#FF6633'
    ];
    
    const laserCount = 25;
    
    for (let i = 0; i < laserCount; i++) {
        setTimeout(() => {
            const startX = Math.random() * 120 - 10;
            const startY = Math.random() * 120 - 10;
            
            const controlPoints = [];
            const pointCount = 3 + Math.floor(Math.random() * 3);
            
            for (let j = 0; j < pointCount; j++) {
                controlPoints.push({
                    x: Math.random() * 120 - 10,
                    y: Math.random() * 120 - 10
                });
            }
            
            const endX = Math.random() * 120 - 10;
            const endY = Math.random() * 120 - 10;
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            const thickness = 2 + Math.random() * 5;
            const duration = 4;
            
            const laser = document.createElement('div');
            laser.className = 'laser-beam';
            laser.style.position = 'fixed';
            laser.style.left = startX + '%';
            laser.style.top = startY + '%';
            laser.style.width = '0';
            laser.style.height = '0';
            laser.style.background = 'transparent';
            laser.style.boxShadow = `0 0 20px ${color}, 0 0 40px ${color}`;
            laser.style.pointerEvents = 'none';
            laser.style.zIndex = '9999';
            laser.style.opacity = '0.9';
            
            const trail = document.createElement('div');
            trail.className = 'laser-trail';
            trail.style.position = 'fixed';
            trail.style.left = startX + '%';
            trail.style.top = startY + '%';
            trail.style.width = '0';
            trail.style.height = '0';
            trail.style.background = 'transparent';
            trail.style.boxShadow = `0 0 40px ${color}, 0 0 80px ${color}`;
            trail.style.pointerEvents = 'none';
            trail.style.zIndex = '9998';
            trail.style.opacity = '0.5';
            trail.style.filter = 'blur(4px)';
            
            const style = document.createElement('style');
            const laserId = 'laser-' + Date.now() + '-' + i;
            const trailId = 'trail-' + Date.now() + '-' + i;
            
            laser.setAttribute('data-laser', laserId);
            trail.setAttribute('data-trail', trailId);
            
            let keyframePoints = '';
            let trailKeyframePoints = '';
            
            keyframePoints += `0% { left: ${startX}%; top: ${startY}%; width: 0; height: 0; opacity: 0; }`;
            trailKeyframePoints += `0% { left: ${startX}%; top: ${startY}%; width: 0; height: 0; opacity: 0; }`;
            
            const totalSteps = pointCount + 2;
            for (let step = 1; step <= pointCount; step++) {
                const point = controlPoints[step - 1];
                const percent = (step / totalSteps) * 100;
                keyframePoints += `
                    ${percent}% {
                        left: ${point.x}%;
                        top: ${point.y}%;
                        width: ${thickness}px;
                        height: ${thickness}px;
                        opacity: 1;
                        box-shadow: 0 0 40px ${color}, 0 0 80px ${color};
                    }
                `;
                trailKeyframePoints += `
                    ${percent}% {
                        left: ${point.x}%;
                        top: ${point.y}%;
                        width: ${thickness * 3}px;
                        height: ${thickness * 3}px;
                        opacity: 0.6;
                        box-shadow: 0 0 60px ${color}, 0 0 120px ${color};
                    }
                `;
            }
            
            const finalPercent = 95;
            keyframePoints += `
                ${finalPercent}% {
                    left: ${endX}%;
                    top: ${endY}%;
                    width: ${thickness}px;
                    height: ${thickness}px;
                    opacity: 1;
                    box-shadow: 0 0 40px ${color}, 0 0 80px ${color};
                }
                100% {
                    left: ${endX}%;
                    top: ${endY}%;
                    width: 0;
                    height: 0;
                    opacity: 0;
                    box-shadow: 0 0 70px ${color};
                }
            `;
            
            trailKeyframePoints += `
                ${finalPercent}% {
                    left: ${endX}%;
                    top: ${endY}%;
                    width: ${thickness * 4}px;
                    height: ${thickness * 4}px;
                    opacity: 0.3;
                    box-shadow: 0 0 80px ${color}, 0 0 160px ${color};
                }
                100% {
                    left: ${endX}%;
                    top: ${endY}%;
                    width: 0;
                    height: 0;
                    opacity: 0;
                }
            `;
            
            const keyframes = `
                @keyframes laser-${laserId} {
                    ${keyframePoints}
                }
                @keyframes trail-${trailId} {
                    ${trailKeyframePoints}
                }
            `;
            
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            laser.style.animation = `laser-${laserId} ${duration}s ease-out forwards`;
            trail.style.animation = `trail-${trailId} ${duration}s ease-out forwards`;
            
            document.body.appendChild(laser);
            document.body.appendChild(trail);
            
            setTimeout(() => {
                laser.remove();
                trail.remove();
                style.remove();
            }, duration * 1000 + 200);
            
        }, i * 80);
    }
    
    const btn = document.getElementById('laserRainbowBtn');
    if (btn) {
        btn.style.transform = 'scale(1.1)';
        btn.style.background = 'linear-gradient(135deg, #FF3366, #FF9933, #FFCC33, #33FF66, #3366FF, #9933FF)';
        btn.style.color = '#FFFFFF';
        btn.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            btn.style.transform = 'scale(1)';
            btn.style.background = 'linear-gradient(135deg, rgba(255, 243, 176, 0.2), rgba(217, 176, 255, 0.2))';
            btn.style.color = 'var(--text-primary)';
        }, 300);
    }
};

// ===== F*** ICE FUNKTION MED PINK EFFEKTER, CHOCKVÅGOR OCH BEAT =====
let discoInterval;
let isDiscoMode = false;
let iceClickCount = 0;
let discoTimeout;
let beatInterval;

// Bright pink färger
const PINK_COLORS = [
    '#FF1493', // Deep Pink
    '#FF69B4', // Hot Pink
    '#FF00FF', // Magenta
    '#DA70D6', // Orchid
    '#FF007F', // Rose
    '#FF218C', // Stark pink
    '#FF33CC', // Neon pink
    '#FF0099'  // Stark magenta
];

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

// ===== ICE-EFFEKTER - BRIGHT PINK! =====
function createIceEffects(count = 15) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const ice = document.createElement('div');
            ice.className = 'ice-effect';
            
            const pinkColor = PINK_COLORS[Math.floor(Math.random() * PINK_COLORS.length)];
            
            const shape = Math.random();
            if (shape < 0.3) {
                // Pink kristall
                ice.style.width = '6px';
                ice.style.height = '6px';
                ice.style.background = 'transparent';
                ice.style.border = `2px solid ${pinkColor}`;
                ice.style.boxShadow = `0 0 15px ${pinkColor}`;
                ice.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else if (shape < 0.6) {
                // Pink flinga
                ice.style.width = '3px';
                ice.style.height = '16px';
                ice.style.background = `linear-gradient(to bottom, ${pinkColor}, #FF69B4, ${pinkColor})`;
                ice.style.borderRadius = '2px';
                ice.style.boxShadow = `0 0 15px ${pinkColor}`;
                ice.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else {
                // Pink bit
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

// ===== PINK CONFETTI =====
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
            confetti.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 15);
    }
};

// ===== BEAT-EFFEKT FÖR DISCO =====
function startBeat() {
    if (beatInterval) clearInterval(beatInterval);
    
    beatInterval = setInterval(() => {
        // Skapa en puls varje halvsekund
        createShockwave();
        
        // Skapa extra pink confetti på varje beat
        window.triggerPinkConfetti('low');
        
        // Pulsa på knappen
        const iceBtn = document.getElementById('iceButton');
        if (iceBtn) {
            iceBtn.style.transform = 'scale(1.05)';
            iceBtn.style.boxShadow = '0 0 50px #FF1493';
            setTimeout(() => {
                iceBtn.style.transform = 'scale(1)';
                iceBtn.style.boxShadow = '0 0 20px #FF1493';
            }, 200);
        }
    }, 500); // Beat varje halvsekund
}

function stopBeat() {
    if (beatInterval) {
        clearInterval(beatInterval);
        beatInterval = null;
    }
}

// ===== F*** ICE FUNKTION =====
window.triggerIceMode = function() {
    const body = document.body;
    const iceBtn = document.getElementById('iceButton');
    const iceCounter = document.getElementById('iceCounter');
    
    // ÖKA COUNTER!
    iceClickCount++;
    iceCounter.textContent = iceClickCount;
    localStorage.setItem('iceClickCount', iceClickCount);
    
    // Skapa PINK ice-effekter och chockvågor
    createIceEffects(15);
    createShockwave();
    
    // Om vi når 999, starta UNIK DISCO-EFFEKT i 10 sekunder
    if (iceClickCount >= 999) {
        iceClickCount = 0;
        iceCounter.textContent = iceClickCount;
        localStorage.setItem('iceClickCount', iceClickCount);
        
        // Starta EXTRA DISCO i 10 sekunder
        body.classList.add('disco-mode');
        body.classList.add('ultra-disco');
        
        // Starta beat!
        startBeat();
        
        // Skapa massor med pink effekter
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                createIceEffects(20);
                window.triggerPinkConfetti('high');
                createShockwave();
            }, i * 200);
        }
        
        // Stäng av efter 10 sekunder
        setTimeout(() => {
            body.classList.remove('disco-mode');
            body.classList.remove('ultra-disco');
            stopBeat();
        }, 10000);
        
        return;
    }
    
    // Normal F*** ICE-funktionalitet
    if (!isDiscoMode) {
        isDiscoMode = true;
        body.classList.add('disco-mode');
        
        if (iceBtn) {
            iceBtn.innerHTML = 'F-ICE (ON)';
        }
        
        // Starta beat i disco mode
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
        
        // Stoppa beat
        stopBeat();
        
        // Stor avslutning
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                window.triggerPinkConfetti('high');
                createIceEffects(30);
                createShockwave();
            }, i * 100);
        }
    }
};

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

// ===== ADD STYLES FOR SHOCKWAVE =====
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
`;
document.head.appendChild(shockwaveStyle);

// ===== CONFETTI TRIGGER (original, behålls för bakåtkompatibilitet) =====
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
            confetti.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 20);
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
    
    // Ladda sparad ice counter
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
