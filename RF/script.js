const segments = document.querySelectorAll('.segment');
const wheel = document.getElementById('wheel');
const result = document.getElementById('result');

function spinWheel() {
    // G�n�rer un nombre al�atoire entre 0 et 5 (il y a 6 segments)
    const randomDegree = Math.floor(Math.random() * 360) + 3600; // Pour simuler plusieurs rotations

    // Calculer la dur�e de l'animation (plus la valeur est grande, plus la roue tourne longtemps)
    const duration = 5; // 5 secondes pour une rotation compl�te

    // Appliquer la transformation CSS pour tourner la roue
    wheel.style.transition = `transform ${duration}s ease-out`;
    wheel.style.transform = `rotate(${randomDegree}deg)`;

    // D�terminer sur quel segment la roue va s'arr�ter
    setTimeout(() => {
        const actualDegree = randomDegree % 360; // Angle r�el de l'arr�t
        const segmentIndex = Math.floor((actualDegree + 30) / 60); // Chaque segment fait 60 degr�s

        // Afficher le r�sultat
        result.textContent = `R�sultat : ${segments[segmentIndex].textContent}`;
    }, duration * 1000); // Attendre la fin de l'animation
}
