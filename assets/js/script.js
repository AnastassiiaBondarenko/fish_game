/* jshint esversion: 8, jquery: true, scripturl: true */
// This event listener ensures that the DOM is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", () => {
    // Get references to various DOM elements
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
    const catchSound = document.getElementById("catchSound");
    const homeIcon = document.getElementById("home-link");
    const main = document.getElementById("main");
    const fishElements = document.querySelectorAll(".fish");
    const scoreElement = document.getElementById("score");
    const toggleButton = document.getElementById("toggle-footer");
    const footer = document.getElementById("hidden-footer");
    const closeFooterButton = document.getElementById("close-footer");

    let gameStarted = false;
    let timerInterval;
    let timeLeft = 60;
    let gameEnded = false;
    let soundOn = false;
    let score = 0;
    // Open and close rules section
    /**
     * This function opens the rules section and handles game pause logic if the game has started.
     */
    function openRulesSection() {
        rulesSection.classList.add("show");
        if (gameStarted) {
            pauseGame();
        } else {
            pauseButton.style.display = "none";
            resumeButton.style.display = "none";
        }
    }

    /**
     * This function closes the rules section and handles game resume logic if the game has started.
     */
    function closeRulesSection() {
        rulesSection.classList.remove("show");
        if (gameStarted) {
            resumeGame();
        } else {
            pauseButton.style.display = "none";
            resumeButton.style.display = "none";
        }
    }

    rulesLink.addEventListener("click", openRulesSection);
    closeButton.addEventListener("click", closeRulesSection);

    /**
     * This function toggles the game sound on and off.
     */
    function toggleSound() {
        if (soundOn) {
            audioElement.pause();
            audioElement.currentTime = 0;
            soundIcon.src = "assets/images/icon-mute.png";
            catchSound.muted = true;
        } else {
            audioElement.play();
            soundIcon.src = "assets/images/icon-sound.png";
            catchSound.muted = false;
        }
        soundOn = !soundOn;
    }

    // Initialize sound settings
    audioElement.pause();
    audioElement.currentTime = 0;
    soundIcon.src = "assets/images/icon-mute.png";
    catchSound.muted = true;

    soundControl.addEventListener("click", toggleSound);

    /**
     * This function starts the game, hides the main title and play block,
     * displays the game section, sets up timers, and handles game-related UI changes.
     */
    function startGame() {
        if (gameEnded) {
            return;
        }
        mainTitle.style.display = "none";
        playBlock.style.display = "none";
        main.style.backgroundImage = 'url("assets/images/fishplay.png")';
        main.style.backgroundSize = "cover";
        main.style.backgroundRepeat = "no-repeat";
        main.style.backgroundPosition = "center";
        gameSection.style.display = "block";
        fishElements.forEach((fish) => {
            fish.style.display = "block";
        });
        pauseButton.style.display = "block";
        resumeButton.style.display = "none";
        document.querySelector('.timer_cn').style.display = "block";
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

    /**
     * This function updates the timer display with the remaining time in minutes and seconds.
     */
    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timer.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    pauseButton.style.display = "none";
    resumeButton.style.display = "none";
    confirmationModal.style.display = "none";

    pauseButton.addEventListener("click", () => {
        confirmationModal.style.display = "block";
    });

    /**
     * This function hides the pause confirmation modal.
     */
    function hideModal() {
        confirmationModal.style.display = "none";
    }

    continueButton.addEventListener("click", () => {
        hideModal();
        resumeGame();
    });

    homeButton.addEventListener("click", () => {
        hideModal();
        window.location.href = "https://anastassiiabondarenko.github.io/fish_game/";
    });

    /**
     * This function pauses the game, clears the timer, and handles fish animation pause.
     */
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

    /**
     * This function resumes the game, restarts the timer, and resumes fish animations.
     */
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

    // End the game
    homeIcon.addEventListener("click", () => {
        if (gameStarted) {
            hideModal();
            endGame();
        }
    });

    /**
     * This function ends the game, clears the timer, displays the final score, and handles game end logic.
     */
    function endGame() {
        clearInterval(timerInterval);
        pauseButton.style.display = "none";
        finalScore.textContent = score;
        endModal.style.display = "block";
        gameEnded = true;
        pauseGame();
    }

    /**
     * This function closes the end game modal and redirects the player to the main page.
     */
    function closeModalAndRedirect() {
        endModal.style.display = "none";
        window.location.href = "https://anastassiiabondarenko.github.io/fish_game/";
        gameEnded = false;
    }

    returnButton.addEventListener("click", closeModalAndRedirect);

    startButton.addEventListener("click", function () {
        if (!gameStarted) {
            startGame();
            gameStarted = true;
        }
    });

    // Game area

    /**
     * This function plays the catch sound when a fish is caught.
     */
    function playCatchSound() {
        catchSound.currentTime = 0;
        catchSound.play();
    }

    /**
     * This function updates the player's score and displays it on the screen.
     */
    function updateScore() {
        score++;
        scoreElement.textContent = score;
    }

    /**
     * This function moves a fish element to a random position within the game area.
     */
    function moveFishToRandomPosition(fish) {
        let fishWidth = fish.offsetWidth;
        let fishHeight = fish.offsetHeight;
        let maxX = window.innerWidth - fishWidth;
        let maxY = window.innerHeight - fishHeight;
        let newX = Math.random() * maxX;
        let newY = Math.random() * maxY;

        fish.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    fishElements.forEach((fish) => {
        fish.addEventListener("click", () => {
            playCatchSound();
            updateScore();
            fish.style.display = "none";
            setTimeout(() => {
                fish.style.display = "block";
                moveFishToRandomPosition(fish);
            });
        });

        moveFishToRandomPosition(fish);
    });

    startButton.addEventListener("click", function () {
        if (!gameStarted) {
            showFishElements();
            startGame();
            gameStarted = true;
        }
    });

    /**
     * This function closes the footer and makes it unvisible.
     */
    function hideFooter() {
        footer.style.bottom = "-300px";
    }

    toggleButton.addEventListener("click", () => {
        if (footer.style.bottom === "-300px" || !footer.style.bottom) {
            footer.style.bottom = "0";
        } else {
            hideFooter();
        }
    });

    // close the footer when clicked inside
    footer.addEventListener("click", (event) => {
        if (event.target === footer) {
            hideFooter();
        }
    });

    closeFooterButton.addEventListener("click", () => {
        hideFooter();
    });
});