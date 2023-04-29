var sound_howls = {} // Each sound has an entry in the dict. In each entry is a dictionary with one howl per file

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function fade_out_sound(howl, fade_time, sound_name, file_name){
    howl.fade(howl.volume(), 0.0, fade_time);
    setTimeout(()=>{
        console.log("Unloading "+file_name+" in "+sound_name+" sound.");
        howl.unload();
        delete sound_howls[sound_name][file_name];
        if (Object.keys(myObject).length === 0){
            console.log("Sound "+sound_name+" has no more howls, deleting it.");
            delete sound_howls[sound_name];
        }
    })
}

function get_sound_file_name(sound_name){
    if (sound_name in sound_lore["regions"][region]["sounds override"]){
        return sound_lore["regions"][region]["sounds override"][key]["files"][0];
    } else {
        return sound_lore["sounds"][key]["files"][0];
    }
}

function transition(transition_time){

    // GETTING RID OF SOUNDS NOT IN NEW AMBIENCE OR THAT DON'T HAVE THE SAME FILE
    for(const [sound_name, sound_howl_dict] of Object.entries(sound_howls)){
        var file_name = get_sound_file_name(sound_name);
        if (sound_name in sound_lore["places"][place]["ambiance"]){
            if (!(file_name in sound_howl_dict)){
                fade_out_sound(sound_howl_dict[file_name], transition_time, sound_name, file_name);
            }
        } else {
            for (const [file_name_within, howl] of Object.entries(sound_howl_dict)){
                fade_out_sound(howl, transition_time, sound_name, file_name_within);
            }
        }
    }

    // STARTING NEW SOUNDS
    for (const [sound_name, sound_info] of Object.entries(sound_lore["places"][place]["ambiance"])){
        var file_name = get_sound_file_name(sound_name);
        if (sound_name in sound_howls){
            sound_howls[sound_name].onend = () => { // TODO check if it works to use key and value inside function
                    let interval_time = getRandomArbitrary(sound_info["interval"][0], sound_info["interval"][1]); // TODO pick a time at random
                    console.log(sound_name + " sound ended, setting timeout for in "+interval_time+" seconds.");
                    setTimeout(() => {
                        console.log("Timeout done, playing "+sound_name+" sound.");
                        sound_howls[sound_name].play();
                    }, interval_time*1000);
                };
            
        } else {
            var howl = new Howl({
                src: [file],
                volume: 0.0,
                html5: true,
                onend: () => { // TODO check if it works to use key and value inside function
                    let interval_time = getRandomArbitrary(sound_info["interval"][0], sound_info["interval"][1]); // TODO pick a time at random
                    console.log(sound_name + " sound ended, setting timeout for in "+interval_time+" seconds.");
                    setTimeout(() => {
                        console.log("Timeout done, playing "+sound_name+" sound.");
                        sound_howls[sound_name].play();
                    }, interval_time*1000);
                }
            });
            howl.fade(0.0, sound_info["volume"], transition_time*1000);
            sound_howls[sound_name] = howl;
            setTimeout(()=>{
                sound_howls[sound_name].play();
            }, sound_info["interval"][0]);
        }
    }
}

var test_howl = new Howl({
    src: ["musics/piano_loop.wav"],
    volume: 1.0,
    html5: true,
    onend: () => { // TODO check if it works to use key and value inside function
        let interval_time = 3; // TODO pick a time at random
        setTimeout(() => {
            self.play();
        }, interval_time*1000);
    }
});

function play(){
    test_howl.play();
}

function pause(){
    test_howl.pause();
}

function switch_songs(){
    if (test_howl.src[0]=="musics/piano_loop.wav"){
        test_howl.src = ["musics/bass_kick_loop.wav"];
    } else {
        test_howl.src = ["musics/piano_loop.wav"];
    }
}