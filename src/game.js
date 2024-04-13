import { Graphics } from "./graphics.js"
import { Clock, Timer, Timer_Type } from "./clock.js";

const ItemList = [
    {
        Name: "Candle",
        Image: Graphics.ItemCandle.Image,
        Cost: 5,
        Unlocked: true
    }
];

const Game_State = {
    Main: 1,
    Tome: 2
}

export class Game {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.context = context;

        this.devotionCurrent = 0;
        this.devotionGoal = 100;
        this.stage = 0;
        this.activeItem = 0;

        this.state = Game_State.Main;
    }

    update(dt, tick) {

    }

    draw(tick) {
        let flipflop = Math.abs(Math.round(tick / 500) % 2);

        this.context.drawImage(Graphics.Stage[this.stage].Images[flipflop], 0, 0);

        switch (this.state) {
            case Game_State.Main:
                this.context.drawImage(Graphics.ButtonBuy.Image, 0, 0);
                break;
            case Game_State.Tome:
                this.context.drawImage(Graphics.Dither.Image, 0, 0);
                this.context.drawImage(Graphics.Tome.Image, 0, Math.round(Math.sin(tick / 1000) * 5) + 10);

                this.context.drawImage(Graphics.Shadow.Image, 0, Math.round(Math.sin(200 + tick / 1000) * 5) + 10);
                this.context.drawImage(ItemList[this.activeItem].Image, 0, Math.round(Math.sin(300 + tick / 1000) * 5) - 10);

                this.context.drawImage(Graphics.ButtonClose.Image, 0, 0);
                break;
        }

        this.context.drawImage(Graphics.DevotionBar.Image, 0, 0);
    }

    clickEvent(x, y) {
        // Click on buy-button
        if (x > 121 && y > 123 && x < 156 && y < 140 && this.state === Game_State.Main) {
            this.state = Game_State.Tome;
            return;
        }

        // Click on close-button
        if (x > 140 && y > 124 && x < 154 && y < 138 && this.state === Game_State.Tome) {
            this.state = Game_State.Main;
            return;
        }
    }
}