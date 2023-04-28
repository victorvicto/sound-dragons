var current_howls = []

function transition(time){
    var new_howls = {};
    for (const [key, value] of Object.entries(sound_lore["places"][place]["ambiance"])){
        var file = "";
        if (key in sound_lore["regions"][region]["sounds override"]){
            file = sound_lore["regions"][region]["sounds override"][key]["files"][0];
        } else {
            file = sound_lore["sounds"][key]["files"][0];
        }
        var howl = new Howl({
            src: [file],
            volume: 0.0,
            html5: true,
            onend: () => { // TODO check if it works to use key and value inside function
                let time = value["interval"][0]; // TODO pick a time at random
                setTimeout(() => {
                    if (key in new_howls){
                        new_howls[key].play();
                    } else {
                        current_howls[key].play();
                    }
                }, time*1000);
            }
          });
        howl.play();
        howl.fade(0.0, value["volume"], time*1000);
        new_howls[key] = howl;
    }
}

var sound = new Howl({
    src: ['./Sounds/woodwind.mp3'],
    loop: true,
    volume: 0.5,
    html5: true
  });

function play(){
    sound.play();
}

function pause(){
    sound.pause();
}