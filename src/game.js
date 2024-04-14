import { Graphics } from "./graphics.js"
import { Sound, Sound_Toggle } from "./sound.js"
import { Clock, Timer, Timer_Type } from "./clock.js";

const ItemList = [
    {
        Name: "Candle",
        Image: Graphics.ItemCandle.Image,
        Value: 2,
        Unlocked: true,
        Blocked: false
    },
    {
        Name: "Match",
        Image: Graphics.ItemMatch.Image,
        Value: 10,
        Unlocked: false,
        Blocked: false
    },
    {
        Name: "Paper",
        Image: Graphics.ItemPaper.Image,
        Value: 0,
        Unlocked: false,
        Blocked: false
    },
    {
        Name: "Knife",
        Image: Graphics.ItemKnife.Image,
        Value: 15,
        Unlocked: false,
        Blocked: false
    },
    {
        Name: "Hand",
        Image: Graphics.ItemHand.Image,
        Value: 10,
        Unlocked: false,
        Blocked: false
    },
    {
        Name: "Book",
        Image: Graphics.ItemBook.Image,
        Value: 15,
        Unlocked: false,
        Blocked: false
    },
    {
        Name: "Statuette",
        Image: Graphics.ItemStatuette.Image,
        Value: 15,
        Unlocked: false,
        Blocked: false
    }
];

const Game_State = {
    Start: 0,
    Main: 1,
    Tome: 2,
    Paper: 3,
    Done: 4,
}

export class Game {
    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.context = context;

        this.devotionCurrent = 0;
        this.devotionMax = 100;
        this.stage = 1;
        this.activeItem = 0;
        this.password = '';
        this.newItem = 0;
        this.tutor = 0;
        this.sound = true;

        this.screenShake = 0;
        this.activeTimeouts = [];

        this.state = Game_State.Start;
    }

    init() {
        Sound.Song.play();
    }

    update(dt, tick) {
        this.screenShake = this.screenShake <= 0 ? 0 : this.screenShake - dt;
        this.newItem = this.newItem <= 0 ? 0 : this.newItem - dt;
    }

    draw(tick) {
        let flipflop = Math.abs(Math.round(tick / 500) % 2);
        let screenShake = {
            x: Math.round((Math.random() * 4 - 2) * (this.screenShake / 1000)),
            y: Math.round((Math.random() * 4 - 2) * (this.screenShake / 1000)),
        }
        let animationSpeed = 700;

        if (this.state === Game_State.Start) {
            this.context.drawImage(Graphics.Stage[0].Images[flipflop], 0, 0);

            this.context.drawImage(Graphics.TitleTop.Image, 0, Math.round(Math.sin(200 + tick / animationSpeed) * 5));
            this.context.drawImage(Graphics.TitleBottom.Image, 0, Math.round(Math.sin(300 + tick / animationSpeed) * 5));
        } else {
            this.context.drawImage(Graphics.Stage[this.stage].Images[flipflop], 0 + screenShake.x, screenShake.y);

            if (this.tutor === 0) {
                this.context.drawImage(Graphics.TutorAdd.Image, 0, 0);
            }

            switch (this.state) {
                case Game_State.Main:
                    this.context.drawImage(Graphics.ButtonBuy.Image, 0, 0);
                    if (this.newItem) {
                        this.context.drawImage(Graphics.NewItem.Image, 0, 0);
                    }
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

                    let navpoints = ItemList.length;
                    let navwidth = 6 * navpoints;
                    for (let i = 0; i < navpoints; i++) {
                        this.context.fillStyle = "#381233";
                        this.context.fillRect((80 - navwidth / 2) + 6 * i + 1, 110, 4, 4);
                        if (i === this.activeItem) {
                            this.context.fillStyle = "#da871d";
                            this.context.fillRect((80 - navwidth / 2) + 6 * i + 2, 111, 2, 2);
                        }
                    }

                    if (this.tutor === 0) {
                        this.context.drawImage(Graphics.TutorPut.Image, 0, 0);
                    }

                    this.context.drawImage(Graphics.ButtonLeft.Image, -63, Math.round(Math.sin(400 + tick / animationSpeed) * 5) + 10);
                    this.context.drawImage(Graphics.ButtonRight.Image, 63, Math.round(Math.sin(400 + tick / animationSpeed) * 5) + 10);

                    this.context.drawImage(Graphics.ButtonClose.Image, 0, 0);
                    break;
                case Game_State.Paper:
                    this.context.drawImage(Graphics["PaperClose" + flipflop].Image, 0, 0);
                    break;
            }

            this.context.drawImage(Graphics.DevotionBar.Image, 0, 0);

            let width = Math.round((146 / this.devotionMax) * this.devotionCurrent);
            this.context.drawImage(Graphics.DevotionFill.Image, 0, 0, 7 + width, 144, 0, 0, 7 + width, 144);

            if (this.tutor === 3 && this.state === Game_State.Main) {
                this.context.drawImage(Graphics.TutorDevotion.Image, 0, 0);
            }
        }

        if (this.sound) {
            this.context.drawImage(Graphics.ButtonSoundOn.Image, 0, 0);
        } else {
            this.context.drawImage(Graphics.ButtonSoundOff.Image, 0, 0);
        }
    }

    clickEvent(x, y) {
        if (x > 4 && y > 125 && x < 17 && y < 138) {
            this.sound = !this.sound;
            Sound_Toggle();
            return;
        }

        if (this.state === Game_State.Start) {
            this.state = Game_State.Main;
            return;
        }

        if (this.state === Game_State.Paper) {
            this.state = Game_State.Main;
            Sound.Paper.play();
            return;
        }

        // Click on buy-button
        if (x > 121 && y > 123 && x < 156 && y < 140 && this.state === Game_State.Main) {
            this.state = Game_State.Tome;
            Sound.OpenBook.play();
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
            Sound.Page.play();
            return;
        }

        // Click next tome-button
        if (x > 133 && y > 57 && x < 151 && y < 96 && this.state === Game_State.Tome) {
            this.activeItem++;
            if (this.activeItem >= ItemList.length) {
                this.activeItem = 0;
            }
            Sound.Page.play();
            return;
        }

        // Click item
        if (x > 62 && y > 39 && x < 96 && y < 91 && this.state === Game_State.Tome) {
            let item = ItemList[this.activeItem];

            if (this.stage > 0 && this.stage < 6 && item.Name === "Candle") {
                this.devotionCurrent += item.Value;
                this.stage++;
                Sound.Candle.play();
                this.state = Game_State.Main;
                this.screenShake = 500;
                this.tutor++;

                if (this.stage === 6) {
                    item.Blocked = true;
                    ItemList[1].Unlocked = true;
                    Sound.NewItem.play();
                    this.newItem = 3000;
                }
                
                return;
            } else if (this.stage === 6 && item.Name === "Match") {
                this.devotionCurrent += item.Value;
                this.stage++;
                this.state = Game_State.Main;
                this.screenShake = 1000;
                Sound.LightMatch.play();
                item.Blocked = true;
                return;
            } else if (this.stage === 9 && item.Name === "Knife") {
                this.stage++;
                this.state = Game_State.Main;
                this.screenShake = 1000;
                Sound.KnifeDown.play();
                item.Blocked = true;
                return;
            } else if (this.stage === 12 && item.Name === "Hand") {
                this.stage++;
                this.state = Game_State.Main;
                this.screenShake = 1000;
                item.Blocked = true;
                Sound.NewItem.play();
                Sound.HandDown.play();
                this.newItem = 3000;
                ItemList[5].Unlocked = true;
                this.devotionCurrent += item.Value;
                return;
            } else if (this.stage === 13 && item.Name === "Book") {
                this.stage++;
                this.state = Game_State.Main;
                this.screenShake = 1000;
                Sound.BookDown.play();
                item.Blocked = true;
                this.devotionCurrent += item.Value;
                return;
            } else if (item.Name === "Paper" && item.Unlocked === true && !item.Blocked) {
                if (this.stage === 26) {
                    Sound.Paper.play();
                    this.state = Game_State.Main;
                    this.stage++;
                    this.screenShake = 1000;
                    this.devotionCurrent += 10;
                    item.Blocked = true;
                    Sound.Eyes.play();
                    setTimeout(() => { this.stage = 28; }, 500);
                    setTimeout(() => { this.stage = 29; }, 1000);
                    setTimeout(() => { this.stage = 30; }, 1500);
                    return;
                } else {
                    this.state = Game_State.Paper;
                    Sound.Paper.play();
                    return;
                }
            } else if (this.stage === 40 && item.Name === "Statuette") {
                this.stage++;
                this.state = Game_State.Main;
                this.screenShake = 1000;
                Sound.BookDown.play();
                item.Blocked = true;
                this.devotionCurrent += 10;

                this.activeTimeouts.push(setTimeout(() => { this.stage = 42; }, 6000));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 43; }, 6500));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 44; }, 7000));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 45; }, 7500));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 46; }, 8000));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 47; }, 8500));
                this.activeTimeouts.push(setTimeout(() => { this.state = Game_State.Done; }, 9000));
                return;
            }
        }

        if (x > 66 && y > 54 && x < 90 && y < 77 && this.state === Game_State.Main && this.stage === 7) {
            this.stage++;
            Sound.Paper.play();
            return;
        }

        if (x > 25 && y > 18 && x < 133 && y < 119 && this.state === Game_State.Main && this.stage === 8) {
            this.stage++;
            ItemList[2].Unlocked = true;
            ItemList[3].Unlocked = true;
            Sound.NewItem.play();
            this.newItem = 3000;
            return;
        }

        if (x > 75 && y > 91 && x < 148 && y < 119 && this.state === Game_State.Main && this.stage === 10) {
            this.stage++;
            Sound.KnifeUp.play();
            return;
        }

        if (x > 25 && y > 18 && x < 133 && y < 119 && this.state === Game_State.Main && this.stage === 11) {
            this.devotionCurrent += ItemList[3].Value;
            this.stage++;
            Sound.HandOff.play();
            ItemList[4].Unlocked = true;
            Sound.NewItem.play();
            this.newItem = 3000;
            this.screenShake = 1000;
            return;
        }

        if (x > 52 && y > 49 && x < 67 && y < 62 && this.state === Game_State.Main && this.stage === 14) {
            Sound.Tick.play();
            this.stage++;
            return;
        }

        if (this.stage === 15) {
            if (x > 65 && y > 30 && x < 79 && y < 39 && this.state === Game_State.Main) {
                Sound.Tick.play();
                this.stage++;
                return;
            } else {
                this.stage--;
                return;
            }
        }

        if (this.stage === 16) {
            if (x > 38 && y > 71 && x < 54 && y < 84 && this.state === Game_State.Main) {
                Sound.Tick.play();
                Sound.BookOpen.play();
                this.stage++;
                this.screenShake = 1000;
                this.devotionCurrent += 10;
                return;
            } else {
                Sound.Tick.play();
                this.stage--;
                this.stage--;
                return;
            }
        }

        if (this.stage >= 17 && this.stage <= 20) {
            Sound.Scrape.play();
            if (this.stage === 17) { this.password = ''; }

            if (x > 74 && y > 66 && x < 84 && y < 76) {
                this.password += 'a';
                this.stage++;
            }

            if (x > 36 && y > 73 && x < 46 && y < 84) {
                this.password += 'b';
                this.stage++;
            }

            if (x > 64 && y > 35 && x < 77 && y < 44) {
                this.password += 'c';
                this.stage++;
            }

            if (x > 96 && y > 95 && x < 108 && y < 106) {
                this.password += 'd';
                this.stage++;
            }

            if (this.password.length === 4) {
                setTimeout(() => {
                    if (this.password === "abcd") {
                        Sound.SymbolGlow.play();
                        this.devotionCurrent += 10;
                        this.stage = 22;
                        this.screenShake = 500;
                        setTimeout(() => { this.stage = 23; this.screenShake = 1000; Sound.SymbolSuccess.play(); }, 1500);
                        setTimeout(() => { this.stage = 24; }, 1750);
                        setTimeout(() => { this.stage = 25; }, 2000);
                        setTimeout(() => { this.stage = 26; }, 2250);
                    } else {
                        Sound.SymbolGlow.play();
                        this.stage = 22;
                        this.screenShake = 500;
                        setTimeout(() => { this.stage = 17; Sound.SymbolFail.play(); }, 1500);
                    }
                }, 500);
            }
            
            return;
        }

        if (this.stage === 30) {
            if (x > 62 && y > 26 && x < 92 && y < 110 && this.state === Game_State.Main) {
                this.stage = 31;
                this.screenShake = 1000;
                Sound.MouthOpen.play();
                this.activeTimeouts.push(setTimeout(() => { this.stage = 32; }, 750));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 31; this.screenShake = 1000; Sound.MouthClose.play(); }, 3750));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 30; }, 4500));
                return;
            }
        }

        if (this.stage === 32) {
            if (x > 112 && y > 43 && x < 147 && y < 71 && this.state === Game_State.Main) {
                this.activeTimeouts.forEach((thisTimeout) => { clearTimeout(thisTimeout); });

                this.screenShake = 1000;
                this.stage = 33;
                this.devotionCurrent += 5;
                Sound.MouthFeed.play();
                this.activeTimeouts.push(setTimeout(() => { this.stage = 34; }, 750));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 35; }, 1500));

                this.activeTimeouts.push(setTimeout(() => { this.stage = 36; }, 4000));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 37; }, 4500));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 38; }, 5000));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 39; }, 5500));
                this.activeTimeouts.push(setTimeout(() => { this.stage = 40; }, 6000));

                this.activeTimeouts.push(setTimeout(() => { this.newItem = 3000; ItemList[6].Unlocked = true; Sound.SymbolSuccess.play(); }, 10000));
                return;
            }
        }

        console.log(x,y, this.stage);
    }

    keyboardEvent(code) {
        // Nothing
    }
}