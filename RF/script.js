const wheel = document.getElementById('wheel');
const segments = document.querySelectorAll('.segment');
const result = document.getElementById('result');

// Fonction pour lancer la roue
function spinWheel() {
    // Générer un nombre aléatoire entre 0 et 360 pour déterminer l'angle final
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // Faire tourner la roue plusieurs fois
    const spinDuration = 5; // Durée de l'animation en secondes

    // Appliquer la transformation CSS pour faire tourner la roue
    wheel.style.transition = `transform ${spinDuration}s ease-out`;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Calculer le segment sur lequel la roue va s'arrêter
    setTimeout(() => {
        const actualDegree = randomDegree % 360;
        const segmentIndex = Math.floor((actualDegree + 30) / 60); // 360 / 6 segments = 60 degrés par segment
        result.textContent = `Résultat : ${segments[segmentIndex].dataset.value}`;
    }, spinDuration * 1000);
}
