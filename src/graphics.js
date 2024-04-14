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
        },
        {
            Paths: ["assets/stages/stage_13_1.png", "assets/stages/stage_13_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_14_1.png", "assets/stages/stage_14_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_15_1.png", "assets/stages/stage_15_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_16_1.png", "assets/stages/stage_16_2.png"],
            Images: []
        },
        {
            Paths: ["assets/stages/stage_17_1.png", "assets/stages/stage_17_2.png"],
            Images: []
        }
    ],

    // Titlescreen
    TitleTop: {
        Path: "assets/title_top.png",
        Image: new Image()
    },
    TitleBottom: {
        Path: "assets/title_bottom.png",
        Image: new Image()
    },

    // Tutorial
    TutorAdd: {
        Path: "assets/tutorial/addthings.png",
        Image: new Image()
    },
    TutorPut: {
        Path: "assets/tutorial/putontable.png",
        Image: new Image()
    },
    TutorDevotion: {
        Path: "assets/tutorial/devotion.png",
        Image: new Image()
    },

    // UI stuff
    Dither: {
        Path: "assets/dither.png",
        Image: new Image()
    },
    Tome: {
        Path: "assets/tome.png",
        Image: new Image()
    },
    PaperClose0: {
        Path: "assets/paperclose_0.png",
        Image: new Image()
    },
    PaperClose1: {
        Path: "assets/paperclose_1.png",
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
    ItemPaper: {
        Path: "assets/paper.png",
        Image: new Image()
    },
    ItemKnife: {
        Path: "assets/knife.png",
        Image: new Image()
    },
    ItemHand: {
        Path: "assets/hand.png",
        Image: new Image()
    },
    ItemBook: {
        Path: "assets/book.png",
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
    "TitleTop",
    "TitleBottom",
    
    "Dither",
    "Tome",
    "PaperClose0",
    "PaperClose1",
    "Shadow",
    "DevotionBar",
    "DevotionFill",
    "Blocked",
    "ButtonBuy",
    "ButtonClose",
    "ButtonLeft",
    "ButtonRight",
    "NewItem",

    "TutorAdd",
    "TutorPut",
    "TutorDevotion",

    "ItemCandle",
    "ItemMatch",
    "ItemPaper",
    "ItemKnife",
    "ItemHand",
    "ItemBook",
    "ItemUnknown"
].forEach(name => {
    Graphics[name].Image.src = Graphics[name].Path;
});