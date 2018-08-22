import "./css/style.scss";
import { LightAudio } from "./js/LightAudio";

const lightaudio = document.querySelectorAll(".lightaudio__container");

for (let laElem of lightaudio) {
    const la = new LightAudio({
        parent: laElem,
        audioTitle: "Mohsen yeganeh - Tanhaei"
    });
}
