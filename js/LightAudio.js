import { CircularMode } from "./CircularMode";
export class LightAudio {
    constructor(options) {
        this.parent = options.parent;
        this.color = options.color || "#f1c40f";
        this.init();
    }

    init() {
        this.initCanvas();
        this.initAudio();
    }

    initCanvas() {
        const canvas = document.createElement("CANVAS");
        this.ctx = canvas.getContext("2d");
        this.circularMode = new CircularMode(canvas);
        canvas.width = this.parent.innerWidth;
        canvas.height = this.parent.innerHeight;
        this.parent.appendChild(canvas);
    }

    initAudio() {
        const audio = document.querySelector("audio");
        // audio.controls = false; // TODO
        const audioContext = new AudioContext() || window.webkitAudioContext;
        const src = audioContext.createMediaElementSource(audio);
        this.analyser = audioContext.createAnalyser();
        src.connect(this.analyser);
        this.analyser.connect(audioContext.destination);
        this.analyser.fftSize = 256;
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        audio.load();
        audio.play();
        const renderFrame = () => {
            requestAnimationFrame(renderFrame);
            this.analyser.getByteFrequencyData(this.dataArray);
            this.circularMode.drawAudioThumbnail(this.ctx, this.canvas);
            this.circularMode.draw(this.dataArray, this.color);
        };
    }

    renderFrame() {}
}
