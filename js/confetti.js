// confetti.js - Anropar pink confetti från main.js
window.triggerConfetti = window.triggerConfetti || function(intensity) {
    if (window.triggerPinkConfetti) {
        window.triggerPinkConfetti(intensity);
    }
};
