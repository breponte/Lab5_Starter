// expose.js

window.addEventListener('DOMContentLoaded', init);

/* main function */
function init()
{
  /* store updated values */
  let chosenHorn;

  /* store element references */
  const imgElement = document.querySelector("img");
  const audioElement = document.querySelector("audio");

  const volumeCntrl = document.getElementById("volume-controls");
  const volumeValues = volumeCntrl.querySelector("input");
  const volumeImg = volumeCntrl.querySelector("img");

  const playButton = document.querySelector("button");

  const jsConfetti = new JSConfetti()

  
  /* Horn Image/Audio Setup */

  // get horn selector element
  const hornElement = document.getElementById("horn-select");
  // when horn selector changes horn, change image to match chosen horn
  hornElement.addEventListener('change', function() {
    // set image from hornElement's new value
    imgElement.setAttribute("src", "assets/images/"
      + hornElement.value + ".svg");
    // set audio from hornElement's new value
    audioElement.setAttribute("src", "assets/audio/"
      + hornElement.value + ".mp3");

    chosenHorn = hornElement.value
  });


  /* Volume Slider Functionality */
  
  volumeValues.addEventListener('change', function () {
    // number; get chosen volume value
    const volumeLvl = Number(volumeValues.value);
    /* map volume level to volume ranges */
    let threshold;
    if (volumeLvl === 0) {
      threshold = 0;
    } else if (volumeLvl >= 1 && volumeLvl < 33) {
      threshold = 1;
    } else if (volumeLvl >= 33 && volumeLvl < 67) {
      threshold = 2;
    } else {
      threshold = 3;
    }

    // set volume img based on chosen volume level
    volumeImg.setAttribute("src", "assets/icons/volume-level-"
      + threshold + ".svg");

    audioElement.volume = (volumeLvl / 100);
  });


  /* Audio Play Functionality */

  /* attach functionality to button */
  playButton.addEventListener('click', function () {
    /* only allow button functionality if a horn is selected */
    if (chosenHorn != null) {
      audioElement.play();
      /* confetti visuals */
      if (chosenHorn === "party-horn") {
        jsConfetti.addConfetti()
      }
    }
  });
}