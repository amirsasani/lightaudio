import { CircularMode } from "./CircularMode";

export class LightAudio {
    constructor(options) {
        this.parent = options.parent;
        this.audioTitle = options.audioTitle || "";
        const _thumb = options.thumbnail || this.parent.querySelector("img");
        const _audio = this.parent.querySelector("audio");

        if (!this.parent.classList.contains("lightaudio__parent"))
            this.parent.classList.add("lightaudio__parent");

        this.removeUnsusedElements(_thumb, _audio);

        const _rgb = this.getAverageRGB(this.thumbnail);
        this.color =
            options.color ||
            `rgba(${255 - _rgb.r}, ${255 - _rgb.g}, ${255 - _rgb.b}, 0.7)`;

        this.thumbnail.style.display = "none";
        this.init();
        this.textX = 5;
    }

    init() {
        this.initCanvas();
        this.initAudio();
    }

    removeUnsusedElements(_thumb, _audio) {
        this.thumbnail = _thumb.cloneNode(true);
        this.parent.removeChild(_thumb);

        this.audio = _audio.cloneNode(true);
        this.parent.removeChild(_audio);
    }

    initCanvas() {
        this.canvas = document.createElement("CANVAS");
        this.ctx = this.canvas.getContext("2d");
        this.circularMode = new CircularMode({
            canvas: this.canvas,
            ctx: this.ctx,
            color: this.color
        });
        this.canvas.width = this.parent.offsetWidth;
        this.canvas.height = this.parent.offsetHeight;
        this.parent.appendChild(this.canvas);

        this.canvas.addEventListener("mousedown", e => {
            this.handleMouse(e);
        });

        this.canvas.addEventListener("mousemove", e => {
            this.canvas.style.cursor = "pointer";
        });
    }

    initAudio() {
        this.audio.controls = false;

        const audioContext = new AudioContext() || window.webkitAudioContext;
        const src = audioContext.createMediaElementSource(this.audio);
        this.analyser = audioContext.createAnalyser();
        src.connect(this.analyser);
        this.analyser.connect(audioContext.destination);
        this.analyser.fftSize = 256;
        const bufferLength = this.analyser.frequencyBinCount;

        this.dataArray = new Uint8Array(bufferLength);

        this.audio.load();
        // this.audio.play();

        this.renderFrame();
    }

    renderFrame() {
        requestAnimationFrame(() => this.renderFrame());

        this.analyser.getByteFrequencyData(this.dataArray);

        this.drawAudioThumbnail(this.ctx, this.canvas, this.thumbnail);

        this.drawAudioInfo();
        this.circularMode.draw(this.dataArray, this.color);
    }

    drawAudioThumbnail(ctx, canvas, img, grayScale = false) {
        if (grayScale) {
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }

    drawAudioInfo() {
        const _currentTime = {
            m: pad(parseInt(this.audio.currentTime / 60, 10), 2),
            s: pad(parseInt(this.audio.currentTime % 60, 10), 2)
        };

        const _duration = {
            m: pad(parseInt(this.audio.duration / 60, 10), 2),
            s: pad(parseInt(this.audio.duration % 60, 10), 2)
        };

        this.ctx.font = "16px Arial";
        this.ctx.fillText(_currentTime.m + ":" + _currentTime.s, 5, 20);
        this.ctx.fillText(
            _duration.m + ":" + _duration.s,
            this.canvas.width -
            this.ctx.measureText(_duration.m + ":" + _duration.s).width -
            5,
            20
        );

        if (this.audio.ended || this.audio.paused) {
            if (this.canvas.width > this.textX) {
                this.textX++;
            } else {
                this.textX = 5 - this.ctx.measureText(this.audioTitle).width;
            }
        } else {
            const centerPosition =
                (this.canvas.width -
                    this.ctx.measureText(this.audioTitle).width) /
                2;

            if (centerPosition <= this.textX) {
                this.textX--;
            } else {
                this.textX++;
            }
        }

        this.ctx.fillText(this.audioTitle, this.textX, this.canvas.height - 10);
    }

    playPausePlayer() {
        if (this.audio.ended || this.audio.paused) {
            this.audio.play();
        } else {
            this.audio.pause();
        }
    }

    handleMouse(e) {
        e.preventDefault();
        this.playPausePlayer();
    }

    getAverageRGB(imgEl) {
        var blockSize = 5,
            defaultRGB = { r: 50, g: 50, b: 50 },
            canvas = document.createElement("canvas"),
            context = canvas.getContext && canvas.getContext("2d"),
            data,
            width,
            height,
            i = -4,
            length,
            rgb = { r: 0, g: 0, b: 0 },
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        height = canvas.height =
            imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width =
            imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

        context.drawImage(imgEl, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch (e) {
            console.error("LIGHTAUDIO: image is in another domain");
            return defaultRGB;
        }

        length = data.data.length;

        while ((i += blockSize * 4) < length) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }

        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        return rgb;
    }
}

function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}
