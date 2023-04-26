// GLOBALS
var region = "default";
var place = "default";
var music_context = "main";
// const max_radio_per_line

// FUNCTIONS

function capitalise(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function generate_radio_button(id_base, parent, text, active){
    var i = document.createElement("input");
    i.type = "radio";
    i.classList.add("btn-check");
    i.name = id_base +"-"+"btnradio";
    i.id = id_base +"-"+ text;
    i.autocomplete = "off";
    if (active){
        i.checked = true;
    }
    parent.appendChild(i);
    var l = document.createElement("label");
    l.classList.add("btn");
    l.classList.add("btn-outline-primary");
    l.classList.add("mb-1");
    l.htmlFor = i.id;
    l.innerText = capitalise(text);
    parent.appendChild(l);
}

// SETUP
var regions_container = document.getElementById("regions-container");
for (const [key, value] of Object.entries(sound_lore["regions"])){
    generate_radio_button("region", regions_container, key, key=="default");
}

var places_container = document.getElementById("places-container");
for (const [key, value] of Object.entries(sound_lore["places"])){
    generate_radio_button("place", places_container, key, key=="default");
}

var music_contexts_container = document.getElementById("music-contexts-container");
for (const [key, value] of Object.entries(sound_lore["music contexts"])){
    generate_radio_button("music-context", music_contexts_container, key, key=="main");
}

var modifiers_container = document.getElementById("modifiers-container");
generate_radio_button("modifier", modifiers_container, "No modifier", true);
if ("theme modifiers" in sound_lore["music contexts"][music_context]){
    for (const [key, value] of Object.entries(sound_lore["music contexts"][music_context]["theme modifiers"])){
        generate_radio_button("modifier", modifiers_container, key, false);
    }
}
if ("music contexts" in sound_lore["places"][place]){
    if (music_context in sound_lore["places"][place]["music contexts"]){
        if ("theme modifiers" in sound_lore["places"][place]["music contexts"][music_context]){
            for (const [key, value] of Object.entries(sound_lore["places"][place]["music contexts"][music_context]["theme modifiers"])){
                generate_radio_button("modifier", modifiers_container, key, false);
            }
        }
    }
}