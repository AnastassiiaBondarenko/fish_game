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
const confirmationModal = document.getElementById("confirmation-modal");
const continueButton = document.getElementById("continue-button");
const homeButton = document.getElementById("home-button");

const endModal = document.getElementById("end-game-modal");
const finalScore = document.getElementById("final-score");
const returnButton = document.getElementById("return-button");


// open and close rules section 
function openRulesSection() {
    rulesSection.classList.add("show");
    pauseGame();
}

function closeRulesSection() {
    rulesSection.classList.remove("show");
    resumeGame();
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
let gameEnded = false;


// Function to start the game


function startGame() {

    if (gameEnded) {
        return;
    }
    mainTitle.style.display = "none";
    playBlock.style.display = "none";
    const gameContainer = document.getElementById("game");
    gameContainer.style.backgroundImage = 'url("../images/fishplay.png")';
    gameSection.classList.remove("hide");

    pauseButton.style.display = "block";
    resumeButton.style.display = "none";

    document.querySelector('.timer_cn').classList.remove("hide");
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
pauseButton.style.display = "none";
resumeButton.style.display = "none";
confirmationModal.style.display = "none";

pauseButton.addEventListener("click", () => {
    confirmationModal.style.display = "block";
});

function hideModal() {
    confirmationModal.style.display = "none";
}


continueButton.addEventListener("click", () => {
    hideModal();
    resumeGame();
});


homeButton.addEventListener("click", () => {
    hideModal();
    endGame()
    window.location.href = window.location.origin;
});


function pauseGame() {
    clearInterval(timerInterval);
    pauseButton.style.display = "none";
    resumeButton.style.display = "block";
    pauseButton.removeEventListener("click", pauseGame);
    resumeButton.addEventListener("click", resumeGame);
    fishElements.forEach((fish) => {
        const computedStyle = window.getComputedStyle(fish);
        fish.style.animationPlayState = computedStyle.getPropertyValue("animation-play-state") === "paused" ? "running" : "paused";
    });
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
    fishElements.forEach((fish) => {
        fish.style.animationPlayState = "running";
    });
}

//  end the game
function endGame() {
    clearInterval(timerInterval);
    pauseButton.style.display = "none";
    gameSection.classList.remove("bg-active");
    finalScore.textContent = score;
    endModal.style.display = "block";
    gameEnded = true;
}

function closeModalAndRedirect() {
    endModal.style.display = "none";
    window.location.href = window.location.origin;
    gameEnded = false;
}

returnButton.addEventListener("click", closeModalAndRedirect);

startButton.addEventListener("click", function () {
    if (!gameStarted) {
        startGame();
        gameStarted = true;
    }
});



startButton.addEventListener("click", function () {
    if (!gameStarted) {
        startGame();
        gameStarted = true;
    }
});


// game area 
const fishElements = document.querySelectorAll(".fish");
const scoreElement = document.getElementById("score");

let score = 0;

function playCatchSound() {
    newAudio.src = "../images/bubbles.mp3";
}

function updateScore() {
    score++;
    scoreElement.textContent = score;
}

function moveFishToRandomPosition(fish) {
    const fishWidth = fish.offsetWidth;
    const fishHeight = fish.offsetHeight;
    const maxX = window.innerWidth - fishWidth;
    const maxY = window.innerHeight - fishHeight;
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;


    fish.style.transform = `translate(${newX}px, ${newY}px)`;
}

fishElements.forEach((fish, index) => {
    fish.addEventListener("click", () => {
        playCatchSound();
        updateScore();
        fish.style.display = "none";
        setTimeout(() => {
            fish.style.display = "block";
            moveFishToRandomPosition(fish);
        }, 1000);
    });

    moveFishToRandomPosition(fish);
});