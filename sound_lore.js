var sound_lore = {
    "sounds":{
        "trees wind":{
            "files": [
                "sounds/trees.mp3"
            ],
            "quicksound category": "long"
        },
        "birds":{
            "files": [
                "sounds/birds.mp3"
            ],
            "quicksound category": "long"
        },
        "door":{
            "files": [
                "sounds/door.mp3"
            ],
            "quicksound category": "indoors"
        },
        "fireplace":{
            "files": [
                "sounds/fireplace.mp3"
            ],
            "quicksound category": "fire"
        },
        "shop bell":{
            "files": [
                "sounds/shop_bell.mp3"
            ],
            "quicksound category": "indoors"
        },
        "writing":{
            "files": [
                "sounds/writing.mp3"
            ],
            "quicksound category": "indoors"
        },
        "pages turned":{
            "files": [
                "sounds/pages_turned.mp3"
            ],
            "quicksound category": "indoors"
        },
        "wood squeeking":{
            "files": [
                "sounds/wood_squeeking.mp3"
            ],
            "quicksound category": "indoors"
        },
        "steps on wood":{
            "files": [
                "sounds/steps_on_wood.mp3"
            ],
            "quicksound category": "indoors"
        }
    },
    "themes":{
        "main adventure":[
            {
                "file": "musics/quiet_zelda_adventure.mp3",
                "volume": 0.5
            },
            {
                "file": "musics/medieval_adventure.mp3",
                "volume": 0.5
            }
        ],
        "naruto epic fight":{
            "file": "musics/naruto_fight.mp3"
        },
        "irish pub":[
            {
                "file": "music/irish_pub.mp3",
                "volume": 0.5
            }
        ],
        "shop":[
            {
                "file": "music/medieval_shop.mp3",
                "volume": 0.5
            }
        ],
        "calm night":[
            {
                "file": "music/calm_night.mp3",
                "volume": 0.5
            }
        ],
    },
    "music contexts":{
        "main":{
            "theme":{
                "name": "main adventure"
            }
        }
    },
    "transitions":{
        "default":{
            "time": 10000,
            "play":{}
        },
        "instant":{
            "time": 0,
            "play": {}
        },
        "door":{
            "time": 1000,
            "play":{
                "door": 0
            }
        },
        "shop":{
            "time": 1000,
            "play":{
                "door":0,
                "shop bell":0
            }
        }
    },
    "places":{
        "default":{
            "ambiance":{},
            "ambiance modifiers":{},
            "music contexts":{
                "main":{
                    "theme modifiers":{
                        "night":{
                            "theme":{
                                "name": "calm night"
                            }
                        }
                    }
                }
            }
        },
        "shop":{
            "ambiance":{
                "writing":{
                    "volume": 0.5,
                    "interval": [15000, 30000]
                },
                "wood squeeking":{
                    "volume": 0.3,
                    "interval": [15000, 30000]
                },
                "steps on wood":{
                    "volume": 0.3,
                    "interval": [15000, 30000]
                },
                "pages turned":{
                    "volume": 0.5,
                    "interval": [15000, 30000]
                }
            },
            "ambiance modifiers":{
                "winter": {
                    "fireplace":{
                        "volume": 0.4,
                        "interval": [0,0]
                    }
                }
            },
            "music contexts":{
                "main":{
                    "theme":{
                        "name": "shop"
                    }
                }
            }
        }
    },
    "regions":{
        "default":{},
        "oriental":{
            "sounds override":{
                "shop bell":{
                    "files": [
                        "sounds/shop_chimes.mp3"
                    ]
                },
                "birds":{
                    "files":[
                        "sounds/exotic_birds.mp3"
                    ]
                }
            },
            "themes override":{
                "main adventure":[
                    {
                        "file": "musics/cleopatra.mp3",
                        "volume": 0.5
                    }
                ],
                "shop":[
                    {
                        "file": "musics/riental_shop.mp3",
                        "volume": 0.5
                    }
                ]
            }
        }
    }
}