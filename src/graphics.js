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
    ButtonBuy: {
        Path: "assets/buy.png",
        Image: new Image()
    },
    ButtonClose: {
        Path: "assets/close.png",
        Image: new Image()
    },

    // Items
    ItemCandle: {
        Path: "assets/candle.png",
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
    "ButtonBuy",
    "ButtonClose",
    
    "ItemCandle"
].forEach(name => {
    Graphics[name].Image.src = Graphics[name].Path;
});