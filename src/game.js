import { Graphics } from "./graphics.js"
import { Clock, Timer, Timer_Type } from "./clock.js";

const ItemList = [
    {
        Name: "Candle",
        Image: Graphics.ItemCandle.Image,
        Cost: 5,
        Unlocked: true,
        Blocked: false
    },
    {
        Name: "Match",
        Image: Graphics.ItemMatch.Image,
        Cost: 30,
        Unlocked: false,
        Blocked: false
    },
    {
        Name: "Knife",
        Image: Graphics.ItemUnknown.Image,
        Cost: 30,
        Unlocked: false,
        Blocked: false
    },
    {
        Name: "Hand",
        Image: Graphics.ItemUnknown.Image,
        Cost: 30,
        Unlocked: false,
        Blocked: false
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

        this.devotionCurrent = 50;
        this.devotionMax = 100;
        this.timeToDevotion = 2000;
        this.timeToDevotionLeft = this.timeToDevotion;
        this.stage = 1;
        this.activeItem = 0;

        this.state = Game_State.Main;
    }

    update(dt, tick) {
        this.timeToDevotionLeft -= dt;
        if (this.timeToDevotionLeft <= 0) {
            this.timeToDevotionLeft = this.timeToDevotion;
            this.devotionCurrent = this.devotionCurrent >= 100 ? 100 : this.devotionCurrent + 1;
        }
    }

    draw(tick) {
        let flipflop = Math.abs(Math.round(tick / 500) % 2);
        let animationSpeed = 700;

        this.context.drawImage(Graphics.Stage[this.stage].Images[flipflop], 0, 0);

        switch (this.state) {
            case Game_State.Main:
                this.context.drawImage(Graphics.ButtonBuy.Image, 0, 0);
                break;
            case Game_State.Tome:
                this.context.drawImage(Graphics.Dither.Image, 0, 0);
                this.context.drawImage(Graphics.Tome.Image, 0, Math.round(Math.sin(tick / animationSpeed) * 5) + 10);

                this.context.drawImage(Graphics.Shadow.Image, 0, Math.round(Math.sin(200 + tick / animationSpeed) * 5) + 10);

                if (ItemList[this.activeItem].Unlocked) {
                    this.context.drawImage(ItemList[this.activeItem].Image, 0, Math.round(Math.sin(300 + tick / animationSpeed) * 5) - 10);
                } else {
                    this.context.drawImage(Graphics.ItemUnknown.Image, 0, Math.round(Math.sin(300 + tick / animationSpeed) * 5) - 10);
                }

                if (ItemList[this.activeItem].Blocked) {
                    this.context.drawImage(Graphics.Blocked.Image, 0, Math.round(Math.sin(250 + tick / animationSpeed) * 5) - 10);
                }

                this.context.drawImage(Graphics.ButtonLeft.Image, -63, Math.round(Math.sin(400 + tick / animationSpeed) * 5) + 10);
                this.context.drawImage(Graphics.ButtonRight.Image, 63, Math.round(Math.sin(400 + tick / animationSpeed) * 5) + 10);

                this.context.drawImage(Graphics.ButtonClose.Image, 0, 0);
                break;
        }

        this.context.drawImage(Graphics.DevotionBar.Image, 0, 0);

        let width = Math.round((146 / this.devotionMax) * this.devotionCurrent);
        this.context.drawImage(Graphics.DevotionFill.Image, 0, 0, 7 + width, 144, 0, 0, 7 + width, 144);
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

        // Click previous tome-button
        if (x > 8 && y > 57 && x < 26 && y < 96 && this.state === Game_State.Tome) {
            this.activeItem--;
            if (this.activeItem < 0) {
                this.activeItem = ItemList.length - 1;
            }
            return;
        }

        // Click next tome-button
        if (x > 133 && y > 57 && x < 151 && y < 96 && this.state === Game_State.Tome) {
            this.activeItem++;
            if (this.activeItem >= ItemList.length) {
                this.activeItem = 0;
            }
            return;
        }

        // Click item
        if (x > 62 && y > 39 && x < 96 && y < 91 && this.state === Game_State.Tome) {
            let item = ItemList[this.activeItem];

            if (this.stage > 0 && this.stage < 6 && item.Name === "Candle") {
                if (this.devotionCurrent >= item.Cost) {
                    this.devotionCurrent -= item.Cost;
                    this.stage++;
                    this.state = Game_State.Main;

                    if (this.stage === 6) {
                        item.Blocked = true;
                        ItemList[1].Unlocked = true;
                    }
                    
                    return;
                }
            } else if (this.stage === 6 && item.Name === "Match") {
                if (this.devotionCurrent >= item.Cost) {
                    this.devotionCurrent -= item.Cost;
                    this.stage++;
                    this.state = Game_State.Main;
                    item.Blocked = true;
                    return;
                }
            }
        }

        if (x > 66 && y > 54 && x < 90 && y < 77 && this.state === Game_State.Main && this.stage === 7) {
            this.stage++;
            return;
        }

        if (x > 25 && y > 18 && x < 133 && y < 119 && this.state === Game_State.Main && this.stage === 8) {
            this.stage++;
            return;
        }

        console.log(x,y);
    }

    keyboardEvent(code) {
        switch (code) {
            case "NumpadAdd":
                this.stage++;
                break;
            case "NumpadSubtract":
                this.stage--;
                break;
        }
        console.log(code);
    }
}