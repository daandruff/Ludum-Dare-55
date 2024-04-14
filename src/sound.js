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
    HandOff: new Audio("assets/sound/handoff.wav"),
    HandDown: new Audio("assets/sound/handdown.wav"),
    BookDown: new Audio("assets/sound/bookontable.wav"),
    Tick: new Audio("assets/sound/tick.wav"),
    BookOpen: new Audio("assets/sound/bookopen.wav"),
    Scrape: new Audio("assets/sound/scrape.wav"),
    SymbolGlow: new Audio("assets/sound/symbolglow.wav"),
    SymbolFail: new Audio("assets/sound/symbolfail.wav"),
    SymbolSuccess: new Audio("assets/sound/symbolsuccess.wav"),
    Eyes: new Audio("assets/sound/eyes.wav"),
    MouthOpen: new Audio("assets/sound/mouthopen.wav"),
    MouthClose: new Audio("assets/sound/mouthclose.wav"),
    MouthFeed: new Audio("assets/sound/mouthfeed.wav")
}

let SoundOn = 1;

Sound.Song.volume = 0.25;
Sound.Song.loop = true;

export function Sound_Toggle() {
    SoundOn = SoundOn === 1 ? 0 : 1;
    for (let key in Sound) {
        Sound[key].volume = SoundOn;
    }

    Sound.Song.volume = 0.25 * SoundOn;
}
