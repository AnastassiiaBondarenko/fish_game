document.addEventListener("DOMContentLoaded", () => {
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


    // open and close rules section 
    function openRulesSection() {
        rulesSection.classList.add("show");
        if (gameStarted) {
            pauseGame();
        } else {
            pauseButton.style.display = "none";
            resumeButton.style.display = "none";
        }
    }

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
    homeIcon.addEventListener("click", () => {
        if (gameStarted) {
            pauseGame();
            hideModal();
            endGame();
        }

    });

    function endGame() {
        clearInterval(timerInterval);
        pauseButton.style.display = "none";
        finalScore.textContent = score;
        endModal.style.display = "block";
        gameEnded = true;
        pauseGame()
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
        catchSound.currentTime = 0;
        catchSound.play();
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

    fishElements.forEach((fish) => {
        fish.addEventListener("click", () => {
            fish.classList.add("wave");
            playCatchSound();
            updateScore();
            fish.style.display = "none";
            setTimeout(() => {
                fish.style.display = "block";
                moveFishToRandomPosition(fish);
                fish.classList.remove("wave");
            }, 200);
        });;

        moveFishToRandomPosition(fish);
    });





    startButton.addEventListener("click", function () {
        if (!gameStarted) {
            showFishElements();
            startGame();
            gameStarted = true;
        }
    });

});