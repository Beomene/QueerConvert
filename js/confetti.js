// confetti.js - Enkel, anropar pink confetti från main.js
// Denna fil finns mest för bakåtkompatibilitet

// Om main.js redan har triggerPinkConfetti, använd den
window.triggerConfetti = window.triggerConfetti || function(intensity) {
    if (window.triggerPinkConfetti) {
        window.triggerPinkConfetti(intensity);
    }
};
