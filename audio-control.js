// Create audio-control.js
const AudioController = {
    init() {
      if (!this.audio) {
        this.audio = new Audio('dressTI.mp3');
        this.audio.loop = true;
        this.playing = false;
        
        // Restore audio state from localStorage
        const wasPlaying = localStorage.getItem('audioPlaying') === 'true';
        if (wasPlaying) {
          this.play();
        }
        
        // Add audio controls to the page
        this.createAudioControls();
      }
    },
    
    play() {
      this.audio.play();
      this.playing = true;
      localStorage.setItem('audioPlaying', 'true');
      if (this.buttonIcon) {
        this.buttonIcon.textContent = '🔇';
      }
    },
    
    pause() {
      this.audio.pause();
      this.playing = false;
      localStorage.setItem('audioPlaying', 'false');
      if (this.buttonIcon) {
        this.buttonIcon.textContent = '🔊';
      }
    },
    
    toggle() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    
    createAudioControls() {
      const button = document.createElement('button');
      button.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000;
        background-color: #ffeb3b;
        border: 2px solid #000;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        transition: transform 0.2s;
      `;
      
      this.buttonIcon = document.createElement('span');
      this.buttonIcon.textContent = this.playing ? '🔇' : '🔊';
      button.appendChild(this.buttonIcon);
      
      button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
      });
      
      button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
      });
      
      button.addEventListener('click', () => this.toggle());
      
      document.body.appendChild(button);
    }
  };
  
  // Initialize audio controller when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    AudioController.init();
  });