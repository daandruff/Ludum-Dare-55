export const Sound = {
    Song: new Audio("assets/sound/song.ogg"),
    Candle: new Audio("assets/sound/candle.wav"),
    NewItem: new Audio("assets/sound/newitem.wav"),
    OpenBook: new Audio("assets/sound/openbook.wav"),
    Page: new Audio("assets/sound/page.wav"),
    LightMatch: new Audio("assets/sound/lightmatch.wav"),
    Paper: new Audio("assets/sound/paper.wav"),
    KnifeDown: new Audio("assets/sound/knifedown.wav"),
    KnifeUp: new Audio("assets/sound/knifeup.wav"),
    HandOff: new Audio("assets/sound/handoff.wav")
}

Sound.Song.volume = 0.25;
Sound.Song.loop = true;
