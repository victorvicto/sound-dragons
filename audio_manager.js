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