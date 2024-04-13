export const Graphics = {
    // The game stages
    Stage: [
        {
            Paths: ["assets/stages/stage_00_1.png", "assets/stages/stage_00_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_01_1.png", "assets/stages/stage_01_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_02_1.png", "assets/stages/stage_02_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_03_1.png", "assets/stages/stage_03_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_04_1.png", "assets/stages/stage_04_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_05_1.png", "assets/stages/stage_05_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_06_1.png", "assets/stages/stage_06_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_07_1.png", "assets/stages/stage_07_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_08_1.png", "assets/stages/stage_08_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_09_1.png", "assets/stages/stage_09_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_10_1.png", "assets/stages/stage_10_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_11_1.png", "assets/stages/stage_11_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_12_1.png", "assets/stages/stage_12_2.png"],
            Images: []
        }
    ],

    // UI stuff
    Dither: {
        Path: "assets/dither.png",
        Image: new Image()
    },
    Tome: {
        Path: "assets/tome.png",
        Image: new Image()
    },
    Shadow: {
        Path: "assets/shadow.png",
        Image: new Image()
    },
    DevotionBar: {
        Path: "assets/devotion_bar.png",
        Image: new Image()
    },
    DevotionFill: {
        Path: "assets/devotion_fill.png",
        Image: new Image()
    },
    Blocked: {
        Path: "assets/blocked.png",
        Image: new Image()
    },
    ButtonBuy: {
        Path: "assets/buy.png",
        Image: new Image()
    },
    ButtonClose: {
        Path: "assets/close.png",
        Image: new Image()
    },
    ButtonLeft: {
        Path: "assets/arrow_left.png",
        Image: new Image()
    },
    ButtonRight: {
        Path: "assets/arrow_right.png",
        Image: new Image()
    },
    NewItem: {
        Path: "assets/newitem.png",
        Image: new Image()
    },

    // Items
    ItemCandle: {
        Path: "assets/candle.png",
        Image: new Image()
    },
    ItemMatch: {
        Path: "assets/match.png",
        Image: new Image()
    },
    ItemKnife: {
        Path: "assets/knife.png",
        Image: new Image()
    },
    ItemUnknown: {
        Path: "assets/unknown.png",
        Image: new Image()
    },
}

// Go though stages
Graphics.Stage.forEach(stage => {
    stage.Paths.forEach(path => {
        let newImage = new Image();
        newImage.src = path;
        stage.Images.push(newImage);
    });
});

// Ugly, but fine way to assign all image-paths
[
    "Dither",
    "Tome",
    "Shadow",
    "DevotionBar",
    "DevotionFill",
    "Blocked",
    "ButtonBuy",
    "ButtonClose",
    "ButtonLeft",
    "ButtonRight",
    "NewItem",

    "ItemCandle",
    "ItemMatch",
    "ItemKnife",
    "ItemUnknown"
].forEach(name => {
    Graphics[name].Image.src = Graphics[name].Path;
});