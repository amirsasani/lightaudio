import "./css/style.scss";
import { LightAudio } from "./js/LightAudio";

const lightaudio = document.querySelectorAll(".lightaudio__container");

for (let laElem of lightaudio) {
    const la = new LightAudio({
        parent: laElem,
        color: "#f1c40f"
    });
}

// file.onchange = function() {
//     const files = this.files;
//     audio.src = URL.createObjectURL(files[0]);

//     const audioContext = new AudioContext() || window.webkitAudioContext;
//     const src = audioContext.createMediaElementSource(audio);
//     const analyser = audioContext.createAnalyser();
//     src.connect(analyser);
//     analyser.connect(audioContext.destination);
//     analyser.fftSize = 256;
//     const bufferLength = analyser.frequencyBinCount;
//     const dataArray = new Uint8Array(bufferLength);

//     function renderFrame() {
//         requestAnimationFrame(renderFrame);

//         analyser.getByteFrequencyData(dataArray);

//         circularMode.drawAudioThumbnail(ctx, canvas);
//         circularMode.draw(dataArray, "#f1c40f");
//     }
//     audio.load();
//     audio.play();
//     renderFrame();
// };
