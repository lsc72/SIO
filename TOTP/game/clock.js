 // Fonction pour mettre à jour l'horloge
    function updateClock() {
      const clockElement = document.getElementById('clock');
      const now = new Date();

      // Format de l'heure : HH:mm:ss
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }