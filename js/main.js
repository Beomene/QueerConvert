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
}
        }
        
        this.center.style.setProperty('--color-1', colors[0]);
        this.center.style.setProperty('--color-2', colors[1]);
        this.center.style.setProperty('--color-3', colors[2]);
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

// EXTRA SPARKLES FUNCTION
window.triggerExtraSparkles = function() {
    if (window.triggerConfetti) {
        window.triggerConfetti('fabulous');
    }
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.className = 'extra-sparkle';
            sparkle.innerHTML = ['✨', '🌟', '💫', '⭐', '🌈'][Math.floor(Math.random() * 5)];
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = Math.random() * 100 + 'vh';
            sparkle.style.color = ['#FFB3B3', '#FFC9A2', '#FFF6B0', '#B0E9CA', '#B0D4FF', '#D9B0FF'][Math.floor(Math.random() * 6)];
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 50);
    }
    
    const btn = document.getElementById('extraSparklesBtn');
    if (btn) {
        btn.style.transform = 'scale(1.2) rotate(5deg)';
        setTimeout(() => btn.style.transform = 'scale(1.05) rotate(-5deg)', 100);
        setTimeout(() => btn.style.transform = 'scale(1) rotate(0)', 200);
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
                    sparkle.innerHTML = ['✨', '🌟', '💫', '⭐', '🌈', '🕺', '💃'][Math.floor(Math.random() * 7)];
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
            iceBtn.innerHTML = '🧊 F*** ICE 🧊';
            iceBtn.style.animation = 'pulse-glow-ice 2s infinite alternate';
        }
        
        if (discoInterval) {
            clearInterval(discoInterval);
        }
        
        if (window.triggerConfetti) {
            window.triggerConfetti('fabulous');
        }
    }
};
// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    new GlitterCursor();
    new ParallaxBackground();
    
    window.triggerConfetti = window.triggerConfetti;
    window.triggerExtraSparkles = window.triggerExtraSparkles;
    window.triggerIceMode = window.triggerIceMode;
});
