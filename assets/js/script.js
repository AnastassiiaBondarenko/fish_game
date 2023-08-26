const rulesSection = document.getElementById("rules");
const rulesLink = document.getElementById("rules-link");
const closeButton = document.getElementById("rules-close");
const soundControl = document.getElementById("sound-control");
const soundIcon = document.getElementById("sound-icon");
const audioElement = document.getElementById("audio-element");
const startButton = document.querySelector(".start-btn");
const mainTitle = document.querySelector(".main_title");
const playBlock = document.querySelector(".main_block");
const gameSection = document.getElementById("game");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const timer = document.getElementById("timer");
// open and close rules section 
function openRulesSection() {
    rulesSection.classList.add("show");
}

function closeRulesSection() {
    rulesSection.classList.remove("show");
}

rulesLink.addEventListener("click", openRulesSection);

closeButton.addEventListener("click", closeRulesSection);

// sound on and off 
let soundOn = false;

function toggleSound() {
    if (soundOn) {
        audioElement.pause();
        audioElement.currentTime = 0;
        soundIcon.src = "assets/images/icon-mute.png";
    } else {
        audioElement.play();
        soundIcon.src = "assets/images/icon-sound.png";
    }
    soundOn = !soundOn;
}

audioElement.pause();
audioElement.currentTime = 0;
soundIcon.src = "assets/images/icon-mute.png";

soundControl.addEventListener("click", toggleSound);



// start game and pause
let gameStarted = false;
let timerInterval;
let timeLeft = 60;



// Function to start the game
function startGame() {
    mainTitle.style.display = "none";
    playBlock.style.display = "none";

    gameSection.classList.remove("hide");

    pauseButton.style.display = "block";
    resumeButton.style.display = "none";

    updateTimerDisplay(timeLeft);
    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);

    pauseButton.addEventListener("click", pauseGame);
}

// timer 
function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timer.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

//  pause
function pauseGame() {
    clearInterval(timerInterval);
    pauseButton.style.display = "none";
    resumeButton.style.display = "block";
    pauseButton.removeEventListener("click", pauseGame);
    resumeButton.addEventListener("click", resumeGame);
}

// resume 
function resumeGame() {
    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
    pauseButton.style.display = "block";
    resumeButton.style.display = "none";
    resumeButton.removeEventListener("click", resumeGame);
    pauseButton.addEventListener("click", pauseGame);
}

//  end the game
function endGame() {
    clearInterval(timerInterval);
    pauseButton.style.display = "none";
}

startButton.addEventListener("click", function () {
    if (!gameStarted) {
        startGame();
        gameStarted = true;
    }
});