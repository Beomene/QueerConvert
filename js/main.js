// ===== GLITTER CURSOR =====
class GlitterCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'glitter-cursor';
        document.body.appendChild(this.cursor);
        
        this.sparkles = [];
        this.lastX = 0;
        this.lastY = 0;
        
        this.bindEvents();
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('click', (e) => this.onClick(e));
    }
    
    onMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        
        // Move main cursor
        this.cursor.style.transform = `translate(${x - 10}px, ${y - 10}px)`;
        
        // Leave sparkle trail (throttled for performance)
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
        
        // Random pastel color
        const colors = [
            'var(--rainbow-red)',
            'var(--rainbow-orange)',
            'var(--rainbow-yellow)',
            'var(--rainbow-green)',
            'var(--rainbow-blue)',
            'var(--rainbow-purple)'
        ];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        document.body.appendChild(sparkle);
        
        // Remove after animation
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
    // Create confetti explosion with pastel colors
    const colors = [
        '#FFB3B3', '#FFC9A2', '#FFF6B0', 
        '#B0E9CA', '#B0D4FF', '#D9B0FF'
    ];
    
    // Set count based on intensity
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
    
    // Make confetti globally available
    window.triggerConfetti = window.triggerConfetti;
});
