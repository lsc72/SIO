let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const messageElement = document.getElementById("message");

// Fonction pour démarrer le chronomètre
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.disabled = true;
        stopButton.disabled = false;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);  // Mise à jour toutes les 10ms
    }
}

// Fonction pour arrêter le chronomètre
function stopTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.disabled = false;
    stopButton.disabled = true;

    const time = (elapsedTime / 1000).toFixed(2);
    timerElement.textContent = time;

    if (time === "3.00") {
        messageElement.textContent = "Gagné!";
    } else {
        messageElement.textContent = `Essai raté. Vous avez arrêté à ${time}s`;
    }
}

// Fonction pour mettre à jour le temps affiché
function updateTimer() {
    elapsedTime = Date.now() - startTime;
    const time = (elapsedTime / 1000).toFixed(2);
    timerElement.textContent = time;
}

// Événements des boutons
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);



