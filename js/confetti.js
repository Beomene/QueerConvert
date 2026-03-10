// Confetti manager for tool pages
class ConfettiManager {
    constructor() {
        this.colors = [
            '#FFB3B3', '#FFC9A2', '#FFF6B0', 
            '#B0E9CA', '#B0D4FF', '#D9B0FF'
        ];
        this.isExploding = false;
    }
    
    explode(intensity = 'medium') {
        if (this.isExploding) return;
        this.isExploding = true;
        
        const counts = {
            low: 30,
            medium: 60,
            high: 100,
            fabulous: 150
        };
        
        const count = counts[intensity] || counts.medium;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => this.createConfetti(i), i * 20);
        }
        
        setTimeout(() => {
            this.isExploding = false;
        }, count * 20 + 2000);
    }
    
    createConfetti(index) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = -20 + 'px';
        confetti.style.width = Math.random() * 15 + 5 + 'px';
        confetti.style.height = Math.random() * 15 + 5 + 'px';
        confetti.style.background = this.colors[Math.floor(Math.random() * this.colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.boxShadow = '0 0 10px currentColor';
        confetti.style.animation = `fabulousFall ${2 + Math.random() * 4}s linear forwards`;
        
        // Add sparkle to some confetti
        if (Math.random() > 0.7) {
            confetti.style.animation += ', sparkle 1s infinite';
        }
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 6000);
    }
    
    rainbowExplosion(x, y) {
        // Create a burst of confetti from a specific point
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            const angle = (i / 20) * Math.PI * 2;
            const velocity = 5 + Math.random() * 5;
            
            confetti.style.position = 'fixed';
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.background = this.colors[Math.floor(Math.random() * this.colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `burst ${1 + Math.random()}s ease-out forwards`;
            confetti.style.setProperty('--angle', angle);
            confetti.style.setProperty('--velocity', velocity);
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }
    }
}

// Add burst animation
const burstStyle = document.createElement('style');
burstStyle.textContent = `
    @keyframes fabulousFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes burst {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * 100px * var(--velocity)),
                calc(sin(var(--angle)) * 100px * var(--velocity))
            ) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(burstStyle);

// Initialize and make available globally
const confetti = new ConfettiManager();
window.confetti = confetti;

// Also keep the simple trigger for backward compatibility
window.triggerConfetti = function(intensity = 'medium') {
    confetti.explode(intensity);
};
