class GlitterCursor {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        this.element.addEventListener('mousemove', this.updatePosition.bind(this));
    }

    updatePosition(event) {
        this.element.style.left = event.clientX + 'px';
        this.element.style.top = event.clientY + 'px';
    }
}

class ParallaxBackground {
    constructor(element) {
        this.element = element;
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.update.bind(this));
    }

    update() {
        const scrollPosition = window.scrollY;
        this.element.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
    }
}

function triggerConfetti() {
    // Simple confetti trigger function
    console.log('Confetti triggered!');
    // You can implement confetti library usage here
}