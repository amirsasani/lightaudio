import "./css/style.scss";

window.onload = () => {
    const file = document.getElementById("thefile");
    const audio = document.getElementById("audio");
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const circularMode = new CircularMode(canvas);

    file.onchange = function() {
        const files = this.files;
        audio.src = URL.createObjectURL(files[0]);
        const context = new AudioContext() || window.webkitAudioContext;
        const src = context.createMediaElementSource(audio);
        const analyser = context.createAnalyser();
        src.connect(analyser);
        analyser.connect(context.destination);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        function renderFrame() {
            requestAnimationFrame(renderFrame);

            analyser.getByteFrequencyData(dataArray);

            circularMode.drawAudioThumbnail(ctx, canvas);
            circularMode.draw(dataArray, "#f1c40f");
        }
        audio.load();
        audio.play();
        renderFrame();
    };
};

class CircularMode {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
    }

    draw(data, thumbnail = "./thumbnail.jpg") {
        let start_angle = 0;
        for (let dataValue in data) {
            const val = data[dataValue];
            const slice_angle = (2 * Math.PI * val) / 360;
            const color = "#F6F49D";

            this.drawPieSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                0.5 *
                    Math.min(
                        this.canvas.width / 2,
                        this.canvas.height / 2,
                        Math.max(
                            (this.canvas.width / 2, this.canvas.height / 2) -
                                val,
                            0
                        )
                    ),
                start_angle,
                start_angle + slice_angle,
                color
            );

            this.drawAudioThumbnail(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                0.4 *
                    Math.min(
                        this.canvas.width / 2,
                        this.canvas.height / 2,
                        Math.max(
                            (this.canvas.width / 2, this.canvas.height / 2) -
                                val,
                            0
                        )
                    ),
                start_angle,
                start_angle + slice_angle,
                thumbnail
            );

            start_angle += slice_angle;
        }
    }

    drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }

    drawAudioThumbnail(ctx, canvas, img) {
        const _img = new Image();

        _img.onload = () => {
            ctx.drawImage(_img, 0, 0, canvas.width, canvas.height);
        };
        _img.src = img;
    }
}
