const spells = {


"Hurting":{

image:"images/grogoroth.png",

target:"Single Target",

damageType:"Otherwordly",

effect:"None",

hitBonus:+5,


formula:function(mAttack){

return 25+(mAttack*2);

}

},


"Combustion":{

image:"images/vinushka.png",

target:"Multi Target",

damageType:"Fire",

effect:"50% Burning",

hitBonus:+5,


formula:function(mAttack){

return mAttack*4;

}

},


"Roots that reap":{

image:"images/vinushka.png",

target:"Multi Target",

damageType:"Normal",

effect:"10% Can't do shit",

hitBonus:+5,


formula:function(mAttack){

return mAttack*4;

}

},


"Pyromancy Trick":{

image:"images/vinushka.png",

target:"Single Target",

damageType:"Fire",

effect:"50% Burning",

hitBonus:+5,


formula:function(mAttack){

return mAttack*4;

}

},


"Scorched Earth":{

image:"images/vinushka.png",

target:"Multi Target",

damageType:"Fire",

effect:"100% Severe Burning, 20% Fire Weakness",

hitBonus:+5,


formula:function(mAttack){

return mAttack;

}

},


"Black Orb":{

image:"images/grogoroth.png",

target:"Single Target",

damageType:"Otherwordly",

effect:"Deals Damage 4-Times",

hitBonus:+5,


formula:function(mAttack){

return 10+(mAttack*2);

}

},


"Lunar Meteorite":{

image:"images/rher.png",

target:"Single Target",

damageType:"Otherwordly",

effect:"10% Light Sensitive",

hitBonus:+5,


formula:function(mAttack){

return 25+(mAttack*3);

}

},


"Lunar Storm":{

image:"images/rher.png",

target:"Multi Target",

damageType:"Otherwordly",

effect:"10% Light Sensitive",

hitBonus:+5,


formula:function(mAttack){

return 20+(mAttack*3);

}

},


"Chains of Torment":{

image:"images/placeholder.png",

target:"Single Target",

damageType:"Otherwordly",

effect:"20% Severe Bleeding",

hitBonus:+5,


formula:function(mAttack){

return 40+(mAttack*4);

}

}

};