const spells = {


"Hurting":{

image:"images/grogoroth.png",

target:"Single Target",

damageType:"Otherwordly",

effect:"None",

hitBonus:+5,


formula:function(mAttack){

return 10+(mAttack*2);

}

},



"Combustion":{

image:"images/vinushka.png",

target:"Multi Target",

damageType:"Fire",

effect:"50% Burn",

hitBonus:+5,


formula:function(mAttack){

return mAttack*4;

}

}


};
