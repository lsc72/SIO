const segments = document.querySelectorAll('.segment');
const wheel = document.getElementById('wheel');
const result = document.getElementById('result');

function spinWheel() {
    // Générer un nombre aléatoire entre 0 et 5 (il y a 6 segments)
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // Pour simuler plusieurs rotations

    // Calculer la durée de l'animation (plus la valeur est grande, plus la roue tourne longtemps)
    const duration = 5; // 5 secondes pour une rotation complète

    // Appliquer la transformation CSS pour tourner la roue
    wheel.style.transition = `transform ${duration}s ease-out`;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // Déterminer sur quel segment la roue va s'arrêter
    setTimeout(() => {
        const actualDegree = randomDegree % 360; // Angle réel de l'arrêt
        const segmentIndex = Math.floor((actualDegree + 30) / 60); // Chaque segment fait 60 degrés

        // Afficher le résultat
        result.textContent = `Résultat : ${segments[segmentIndex].textContent}`;
    }, duration * 1000); // Attendre la fin de l'animation
}
