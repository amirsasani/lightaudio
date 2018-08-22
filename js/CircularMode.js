export class CircularMode {
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
