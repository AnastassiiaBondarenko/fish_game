// Get a reference to the rules section, the rules link, and the close button
const rulesSection = document.getElementById("rules");
const rulesLink = document.getElementById("rules-link");
const closeButton = document.getElementById("rules-close");

// Function to open the rules section
function openRulesSection() {
    rulesSection.classList.add("show");
}

// Function to close the rules section
function closeRulesSection() {
    rulesSection.classList.remove("show");
}

// Add a click event listener to the rules link to open the rules section
rulesLink.addEventListener("click", openRulesSection);

// Add a click event listener to the close button to close the rules section
closeButton.addEventListener("click", closeRulesSection);

// Get references to the sound control, sound icon, and audio element
const soundControl = document.getElementById("sound-control");
const soundIcon = document.getElementById("sound-icon");
const audioElement = document.getElementById("audio-element");

// Initialize sound status
let soundOn = false;

// Function to toggle sound on and off
function toggleSound() {
    if (soundOn) {
        audioElement.pause();
        audioElement.currentTime = 0; // Rewind audio to the beginning
        soundIcon.src = "assets/images/icon-mute.png"; // Replace with sound off icon
    } else {
        audioElement.play();
        soundIcon.src = "assets/images/icon-sound.png"; // Replace with sound on icon
    }
    soundOn = !soundOn; // Toggle sound status
}

// Initialize with sound off
audioElement.pause();
audioElement.currentTime = 0; // Rewind audio to the beginning
soundIcon.src = "assets/images/icon-mute.png"; // Replace with sound off icon

// Add a click event listener to the sound control
soundControl.addEventListener("click", toggleSound);