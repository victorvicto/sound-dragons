// GLOBALS
var region = "default";
var place = "default";
var music_context = "main";
var modifier = "no modifier";

// FUNCTIONS

function capitalise(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function change_region(evt){
    region = evt.target.value;
    console.log(region);
    update_music_contexts();
    update_modifiers();
}

function change_place(evt){
    place = evt.target.value;
    console.log(place);
    update_music_contexts();
    update_modifiers();
}

function change_music_context(evt){
    music_context = evt.target.value;
    console.log(music_context);
}

function change_modifier(evt){
    modifier = evt.target.value;
    console.log(modifier);
}

function generate_radio_button(id_base, parent, text, active, funct){
    var i = document.createElement("input");
    i.type = "radio";
    i.classList.add("btn-check");
    i.name = id_base +"-"+"btnradio";
    i.id = id_base +"-"+ text;
    i.autocomplete = "off";
    i.value = text;
    i.onchange = funct;
    if (active){
        i.checked = true;
    }
    parent.appendChild(i);
    var l = document.createElement("label");
    l.classList.add("btn");
    l.classList.add("btn-outline-primary");
    l.classList.add("mt-1");
    l.htmlFor = i.id;
    l.innerText = capitalise(text);
    parent.appendChild(l);
}

function update_music_contexts(){
    var music_contexts_container = document.getElementById("music-contexts-container");
    music_contexts_container.innerHTML = "";
    for (const [key, value] of Object.entries(sound_lore["music contexts"])){
        generate_radio_button("music-context", music_contexts_container, key, key=="main", change_music_context);
    }
    if ("music contexts" in sound_lore["places"][place]){
        for (const [key, value] of Object.entries(sound_lore["places"][place]["music contexts"])){
            if (!(key in sound_lore["music contexts"])){
                generate_radio_button("music-context", music_contexts_container, key, false, change_music_context);
            }
        }
    }
}

function update_modifiers(){
    var modifiers_container = document.getElementById("modifiers-container");
    modifiers_container.innerHTML = "";
    generate_radio_button("modifier", modifiers_container, "no modifier", true);
    if ("theme modifiers" in sound_lore["music contexts"][music_context]){
        for (const [key, value] of Object.entries(sound_lore["music contexts"][music_context]["theme modifiers"])){
            generate_radio_button("modifier", modifiers_container, key, false, change_modifier);
        }
    }
    if ("music contexts" in sound_lore["places"][place]){
        if (music_context in sound_lore["places"][place]["music contexts"]){
            if ("theme modifiers" in sound_lore["places"][place]["music contexts"][music_context]){
                for (const [key, value] of Object.entries(sound_lore["places"][place]["music contexts"][music_context]["theme modifiers"])){
                    generate_radio_button("modifier", modifiers_container, key, false, change_modifier);
                }
            }
        }
    }
}

// SETUP
var regions_container = document.getElementById("regions-container");
for (const [key, value] of Object.entries(sound_lore["regions"])){
    generate_radio_button("region", regions_container, key, key=="default", change_region);
}

var places_container = document.getElementById("places-container");
for (const [key, value] of Object.entries(sound_lore["places"])){
    generate_radio_button("place", places_container, key, key=="default", change_place);
}

update_music_contexts();
update_modifiers();

var transitions_container = document.getElementById("transitions-container");
for (const [transition_name, transition_info] of Object.entries(sound_lore["transitions"])){
    var but = document.createElement("button");
    but.innerText = capitalise(transition_name);
    but.classList.add("btn");
    but.classList.add("btn-primary");
    but.type = "button";
    transitions_container.appendChild(but);
    but.onclick = ()=>{
        console.log("transitioning "+transition_name);
        transition(transition_info["time"]);
        var howl_list = [];
        for (const [sound_to_play_name, sound_to_play_info] of Object.entries(transition_info["play"])){
            setTimeout(()=>{
                var h = play_punctual_sound(sound_to_play_name, sound_to_play_info["volume"]);
                howl_list.push(h);
            }, sound_to_play_info["timing"]);
        }
        setTimeout(()=>{
            for (var h of howl_list){
                h.unload();
            }
        }, transition_info["time"]+5000);
    };
}