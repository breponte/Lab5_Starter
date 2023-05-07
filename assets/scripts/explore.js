// explore.js

window.addEventListener('DOMContentLoaded', init);


function init() {

  /* HTML element references */
  const voiceRef = document.getElementById("voice-select");
  const faceRef = document.querySelector("img");
  const ttsRef = document.getElementById("text-to-speak");
  const talkButton = document.querySelector("button");

  const synth = window.speechSynthesis;
  let voices = [];
  

  /* Voice Setup */
  
  window.onload = function() {
    /* wait for voices to load, then populate select menu */
    window.speechSynthesis.onvoiceschanged = function() {
      voices = synth.getVoices();
      /* populate select menu */
      for (let i = 0; i < voices.length; i++) {
        const voice = document.createElement("option");
        voice.textContent = `${voices[i].name} (${voices[i].lang})`;
        console.log(`${voices[i].name} (${voices[i].lang})`);
        voice.setAttribute("value", voices[i].name);
        voice.setAttribute("data-name", voices[i].name);
        voiceRef.appendChild(voice);
      }
    };
  };


  /* TTS Functionality */
  talkButton.addEventListener('click', function () {
    const speech = new SpeechSynthesisUtterance(ttsRef.value);
    let speaker = voiceRef.selectedOptions[0].getAttribute("data-name");
    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === speaker) {
        speech.voice = voices[i];
      }
    }
    if (speech.voice != null) {
      speechSynthesis.speak(speech);
      faceRef.setAttribute("src", "assets/images/smiling-open.png");
    }

    speech.onend = function () {
      faceRef.setAttribute("src", "assets/images/smiling.png");
    };
  });
}