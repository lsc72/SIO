
document.getElementById('spin-button').addEventListener('click', function() {

��� const wheel = document.getElementById('wheel');

��� const randomDeg = Math.floor(Math.random() * 360) + 3600; // Minimum 10 tours (360 * 10)

����

��� // Ajout d'une transition pour un effet de rotation fluide

��� wheel.style.transition = 'transform 4s ease-out';

��� wheel.style.transform = `rotate(${randomDeg}deg)`;


��� // R�initialisation de la transition apr�s un tour

��� setTimeout(() => {

������� wheel.style.transition = 'none';

��� }, 4000);

});
 