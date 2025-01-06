const wheel = document.getElementById('wheel');
const segments = document.querySelectorAll('.segment');
const result = document.getElementById('result');

// Fonction pour lancer la roue
function spinWheel() {
    // G�n�rer un nombre al�atoire entre 0 et 360 pour d�terminer l'angle final
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // Faire tourner la roue plusieurs fois
    const spinDuration = 5; // Dur�e de l'animation en secondes

    // Appliquer la transformation CSS pour faire tourner la roue
    wheel.style.transition = `transform ${spinDuration}s ease-out`;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Calculer le segment sur lequel la roue va s'arr�ter
    setTimeout(() => {
        const actualDegree = randomDegree % 360;
        const segmentIndex = Math.floor((actualDegree + 30) / 60); // 360 / 6 segments = 60 degr�s par segment
        result.textContent = `R�sultat : ${segments[segmentIndex].dataset.value}`;
    }, spinDuration * 1000);
}
