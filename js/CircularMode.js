export class CircularMode {
    constructor(options) {
        this.canvas = options.canvas;
        this.ctx = options.ctx;
        this.color = options.color;
    }

    draw(data) {
        let start_angle = 0;
        for (let dataValue in data) {
            const val = data[dataValue];
            const slice_angle = (2 * Math.PI * val) / 360;

            this.drawPieSlice(
                this.ctx,
                this.canvas.width / 2,
                this.canvas.height / 2,
                0.7 *
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
                this.color
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
}
