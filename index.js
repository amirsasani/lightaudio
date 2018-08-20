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
            ctx.fillStyle = "#666";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    draw(data) {
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

    drawAudioThumbnail(
        ctx,
        centerX,
        centerY,
        radius,
        startAngle,
        endAngle,
        img
    ) {
        ctx.save();
        ctx.moveTo(centerX, centerY);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(img, 0, 0, 50, 50);

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.clip();
        ctx.closePath();
        ctx.restore();
    }
}
