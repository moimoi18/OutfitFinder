// Create an audio object for the click sound
const buttonClickSound = new Audio('click.mp3');
buttonClickSound.volume = 0.5; // Adjust volume as needed

function playButtonSound() {
    const sound = buttonClickSound.cloneNode();
    sound.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
}

// Add click sound to all buttons when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Select all buttons on the page
    const buttons = document.querySelectorAll('button');
    
    // Add click sound to each button
    buttons.forEach(button => {
        button.addEventListener('click', playButtonSound);
    });

    // Add click sound to navigation links that look like buttons
    const navLinks = document.querySelectorAll('a button');
    navLinks.forEach(link => {
        link.addEventListener('click', playButtonSound);
    });

    // Special handling for generate button if it exists
    const generateButton = document.querySelector('.generate-button');
    if (generateButton) {
        generateButton.addEventListener('click', playButtonSound);
    }

    // Special handling for go back button if it exists
    const goBackButton = document.querySelector('.go-back-button');
    if (goBackButton) {
        goBackButton.addEventListener('click', playButtonSound);
    }

    // Special handling for nav buttons if they exist
    const navButtons = document.querySelectorAll('.nav-btn');
    if (navButtons) {
        navButtons.forEach(button => {
            button.addEventListener('click', playButtonSound);
        });
    }
});