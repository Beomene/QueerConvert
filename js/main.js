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

// ===== CONFETTI TRIGGER =====
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

// ===== FABULOUS BUTTON FUNCTIONS =====

// ===== LASER RAINBOW FUNCTION - ÄKTA LASERS SOM FAR! =====
window.triggerLaserRainbow = function() {
    // Trigger confetti som bakgrund
    if (window.triggerConfetti) {
        window.triggerConfetti('fabulous');
    }
    
    const colors = [
        '#FF3131', // Neon Röd
        '#FF9933', // Neon Orange
        '#FFEB33', // Neon Gul
        '#33FF33', // Neon Grön
        '#33FFF3', // Neon Cyan
        '#337AFF', // Neon Blå
        '#8A33FF', // Neon Lila
        '#FF33F3'  // Neon Rosa
    ];
    
    // Antal laserspår
    const laserCount = 40;
    
    for (let i = 0; i < laserCount; i++) {
        setTimeout(() => {
            // Välj slumpmässig riktning
            const direction = Math.floor(Math.random() * 4);
            let startX, startY, endX, endY;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const thickness = 2 + Math.random() * 4; // 2-6px tjocklek
            const duration = 0.8 + Math.random() * 1.5; // 0.8-2.3 sekunder
            
            // Bestäm start- och slutpunkter baserat på riktning
            switch(direction) {
                case 0: // Vänster → Höger
                    startX = -10;
                    startY = Math.random() * 120 - 10;
                    endX = 110;
                    endY = startY + (Math.random() * 40 - 20);
                    break;
                case 1: // Höger → Vänster
                    startX = 110;
                    startY = Math.random() * 120 - 10;
                    endX = -10;
                    endY = startY + (Math.random() * 40 - 20);
                    break;
                case 2: // Topp → Botten
                    startX = Math.random() * 120 - 10;
                    startY = -10;
                    endX = startX + (Math.random() * 40 - 20);
                    endY = 110;
                    break;
                case 3: // Botten → Topp
                    startX = Math.random() * 120 - 10;
                    startY = 110;
                    endX = startX + (Math.random() * 40 - 20);
                    endY = -10;
                    break;
            }
            
            // Skapa laser-elementet
            const laser = document.createElement('div');
            laser.style.position = 'fixed';
            laser.style.left = startX + '%';
            laser.style.top = startY + '%';
            laser.style.width = '0';
            laser.style.height = '0';
            laser.style.background = 'transparent';
            laser.style.boxShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
            laser.style.pointerEvents = 'none';
            laser.style.zIndex = '9999';
            laser.style.opacity = '0.9';
            
            // Skapa en pseudo-effekt med ::after för själva laserstrålen
            const style = document.createElement('style');
            const laserId = 'laser-' + Date.now() + '-' + i;
            laser.setAttribute('data-laser', laserId);
            
            const keyframes = `
                @keyframes laser-${laserId} {
                    0% {
                        left: ${startX}%;
                        top: ${startY}%;
                        width: 0;
                        height: 0;
                        opacity: 0;
                        box-shadow: 0 0 5px ${color};
                    }
                    5% {
                        opacity: 1;
                    }
                    50% {
                        left: ${(startX + endX) / 2}%;
                        top: ${(startY + endY) / 2}%;
                        width: ${thickness * 2}px;
                        height: ${thickness * 2}px;
                        box-shadow: 0 0 30px ${color}, 0 0 60px ${color};
                    }
                    95% {
                        opacity: 1;
                    }
                    100% {
                        left: ${endX}%;
                        top: ${endY}%;
                        width: 0;
                        height: 0;
                        opacity: 0;
                        box-shadow: 0 0 5px ${color};
                    }
                }
            `;
            
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            laser.style.animation = `laser-${laserId} ${duration}s linear forwards`;
            
            document.body.appendChild(laser);
            
            // Städa upp efter animationen
            setTimeout(() => {
                laser.remove();
                style.remove();
            }, duration * 1000 + 100);
            
        }, i * 30); // 30ms mellanrum mellan lasrarna
    }
    
    // Gör knappen glad
    const btn = document.getElementById('extraSparklesBtn');
    if (btn) {
        btn.innerHTML = '🌈 LASER RAINBOW! 🌈';
        btn.style.transform = 'scale(1.2)';
        btn.style.background = 'linear-gradient(135deg, #FF3131, #FF9933, #FFEB33, #33FF33, #33FFF3, #337AFF, #8A33FF, #FF33F3)';
        btn.style.color = '#FFFFFF';
        btn.style.fontWeight = 'bold';
        btn.style.boxShadow = '0 0 50px rgba(255,255,255,0.8)';
        
        setTimeout(() => {
            btn.innerHTML = '🌈 LASER RAINBOW 🌈';
            btn.style.transform = 'scale(1)';
            btn.style.background = 'linear-gradient(135deg, rgba(255, 243, 176, 0.2), rgba(217, 176, 255, 0.2))';
            btn.style.color = 'var(--text-primary)';
            btn.style.boxShadow = '0 0 20px rgba(255, 243, 176, 0.3)';
        }, 400);
    }
};

// F*** ICE FUNCTION (DISCO MODE)
let discoInterval;
let isDiscoMode = false;

window.triggerIceMode = function() {
    const body = document.body;
    const iceBtn = document.getElementById('iceButton');
    
    if (!isDiscoMode) {
        isDiscoMode = true;
        body.classList.add('disco-mode');
        
        if (iceBtn) {
            iceBtn.innerHTML = '🧊 F*** ICE (ON) 🧊';
            iceBtn.style.animation = 'pulse-glow-ice 0.2s infinite alternate';
        }
        
        discoInterval = setInterval(() => {
            if (window.triggerConfetti) {
                window.triggerConfetti('low');
            }
            
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'extra-sparkle';
                    sparkle.innerHTML = ['✨', '🌟', '💫'][Math.floor(Math.random() * 7)];
                    sparkle.style.left = Math.random() * 100 + 'vw';
                    sparkle.style.top = Math.random() * 100 + 'vh';
                    sparkle.style.fontSize = '2rem';
                    sparkle.style.color = ['#FFB3B3', '#FFC9A2', '#FFF6B0', '#B0E9CA', '#B0D4FF', '#D9B0FF'][Math.floor(Math.random() * 6)];
                    document.body.appendChild(sparkle);
                    setTimeout(() => sparkle.remove(), 1500);
                }, i * 100);
            }
        }, 500);
        
    } else {
        isDiscoMode = false;
        body.classList.remove('disco-mode');
        
        if (iceBtn) {
            iceBtn.innerHTML = 'F*** 🧊';
            iceBtn.style.animation = 'pulse-glow-ice 2s infinite alternate';
        }
        
        if (discoInterval) {
            clearInterval(discoInterval);
        }
        
        if (window.triggerConfetti) {
            window.triggerConfetti('fabulous');
        }
    }
// ===== F*** ICE FUNCTION (med counter OCH nya effekter) =====
let discoInterval;
let isDiscoMode = false;
let iceClickCount = 0; // Counter för ICE-knappen

window.triggerIceMode = function() {
    const body = document.body;
    const iceBtn = document.getElementById('iceButton');
    const iceCounter = document.getElementById('iceCounter');
    
    // ÖKA COUNTER!
    iceClickCount++;
    iceCounter.textContent = iceClickCount;
    
    // Ändra färg baserat på hur många gånger man tryckt
    if (iceClickCount >= 20) {
        iceCounter.setAttribute('data-hot', '20');
    } else if (iceClickCount >= 10) {
        iceCounter.setAttribute('data-hot', '10');
    } else if (iceClickCount >= 5) {
        iceCounter.setAttribute('data-hot', '5');
    }
    
    // Skapa IS-effekter istället för emojis!
    createIceEffects();
    
    // Fortsätt med disco mode (men utan emojis)
    if (!isDiscoMode) {
        isDiscoMode = true;
        body.classList.add('disco-mode');
        
        if (iceBtn) {
            iceBtn.innerHTML = '🧊 F*** ICE (ON) 🧊';
            iceBtn.style.animation = 'pulse-glow-ice 0.2s infinite alternate';
        }
        
        discoInterval = setInterval(() => {
            if (window.triggerConfetti) {
                window.triggerConfetti('low');
            }
            
            // Skapa is-effekter kontinuerligt i disco mode
            if (iceClickCount % 5 === 0) { // Var 5:e klick, extra effekter
                createIceEffects(10);
            } else {
                createIceEffects(5);
            }
            
        }, 500);
        
    } else {
        isDiscoMode = false;
        body.classList.remove('disco-mode');
        
        if (iceBtn) {
            iceBtn.innerHTML = '🧊 F*** ICE 🧊';
            iceBtn.style.animation = 'pulse-glow-ice 2s infinite alternate';
        }
        
        if (discoInterval) {
            clearInterval(discoInterval);
        }
        
        if (window.triggerConfetti) {
            window.triggerConfetti('fabulous');
        }
        
        // Skapa en stor ICE-explosion när man stänger av
        createIceEffects(30);
    }
};

// ===== ICE-EFFEKTER - inga emojis! =====
function createIceEffects(count = 15) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const ice = document.createElement('div');
            ice.className = 'ice-effect';
            
            // Slumpmässig form
            const shape = Math.random();
            if (shape < 0.3) {
                // Iskristall
                ice.style.width = '8px';
                ice.style.height = '8px';
                ice.style.background = 'transparent';
                ice.style.border = '2px solid rgba(200, 230, 255, 0.8)';
                ice.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else if (shape < 0.6) {
                // Isflinga
                ice.style.width = '4px';
                ice.style.height = '20px';
                ice.style.background = 'linear-gradient(to bottom, #aaddff, #88ccff, #aaddff)';
                ice.style.borderRadius = '2px';
                ice.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else {
                // Isbit
                ice.style.width = '12px';
                ice.style.height = '12px';
                ice.style.background = 'rgba(200, 230, 255, 0.6)';
                ice.style.borderRadius = '3px';
                ice.style.boxShadow = 'inset 2px 2px 5px rgba(255,255,255,0.5), inset -2px -2px 5px rgba(0,0,0,0.1)';
            }
            
            ice.style.position = 'fixed';
            ice.style.left = Math.random() * 100 + '%';
            ice.style.top = Math.random() * 100 + '%';
            ice.style.pointerEvents = 'none';
            ice.style.zIndex = '9998';
            ice.style.animation = `ice-float ${1 + Math.random() * 2}s ease-out forwards`;
            ice.style.opacity = 0.7 + Math.random() * 0.3;
            
            document.body.appendChild(ice);
            setTimeout(() => ice.remove(), 2500);
        }, i * 50);
    }
}

// Lägg till animationer i CSS (kommer i nästa steg)
};

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    new GlitterCursor();
    new ParallaxBackground();
    
    window.triggerConfetti = window.triggerConfetti;
    window.triggerLaserRainbow = window.triggerLaserRainbow;
    window.triggerIceMode = window.triggerIceMode;
});
