/* ======================================
   Death of the Innocent Companion
   script.js
======================================*/


/*=======================================
            TAB SYSTEM
=======================================*/

function showTab(tabName){

    const tabs = document.getElementsByClassName("tabContent");

    for(let tab of tabs){
        tab.classList.add("hidden");
    }

    document.getElementById(tabName).classList.remove("hidden");


    const buttons = document.getElementsByClassName("tabButton");

    for(let button of buttons){
        button.classList.remove("active");
    }

    event.target.classList.add("active");

}



/*=======================================
        DAMAGE MODIFIER SYSTEM
=======================================*/


function applyModifiers(
    damage,
    rev,
    crit,
    resistance,
    weakness
){

    damage *= rev;

    damage *= crit;


    // Resistance

    damage *= (100 - resistance) / 100;


    // Weakness

    damage *= (100 + weakness) / 100;


    return Math.round(damage);

}



/*=======================================
        WEAPON DATABASE
=======================================*/


const weapons = {

    "Rusty Pipe": {
        attack:5
    },

    "Black Steel": {
        attack:15
    }

};



const weaponSkills = {

    "None":{
        multiplier:1
    },

    "Adrenalinrush I":{
        multiplier:1.5
    },

    "Adrenalinrush II":{
        multiplier:2
    }

};



/*=======================================
        WEAPON CALCULATOR
=======================================*/


function calculateWeapon(){


    const baseAttack =
        Number(
            document.getElementById("weaponBaseAttack").value
        );


    const weaponName =
        document.getElementById("weaponSelect").value;


    const weaponAttack =
        weapons[weaponName].attack;



    const skillName =
        document.getElementById("weaponSkill").value;


    const skillMultiplier =
        weaponSkills[skillName].multiplier;



    let damage =
        (baseAttack + weaponAttack) * 2;


    damage *= skillMultiplier;



    const rev =
        Number(
            document.getElementById("weaponRev").value
        );


    const crit =
        Number(
            document.getElementById("weaponCrit").value
        );


    const resistance =
        Number(
            document.getElementById("weaponResistance").value
        );


    const weakness =
        Number(
            document.getElementById("weaponWeakness").value
        );



    damage = applyModifiers(
        damage,
        rev,
        crit,
        resistance,
        weakness
    );



    document.getElementById("weaponResult").innerHTML =
        damage;

}



/*=======================================
            SPELL DATABASE
=======================================*/


const accessories = {

    "None":{
        magic:0
    },

    "Chac Chac":{
        magic:10
    },

    "Molded Doll":{
        magic:6
    }

};



const spellSkills = {

    "None":{
        multiplier:1
    },

    "La Danse Macabre I":{
        multiplier:1.5
    },

    "La Danse Macabre II":{
        multiplier:2
    }

};



const spells = {

    "Hurting":{

        formula:function(mAttack){

            return 25 + (mAttack * 2);

        }

    },


    "Combustion":{

        formula:function(mAttack){

            return mAttack * 4;

        }

    }

};



/*=======================================
        SPELL CALCULATOR
=======================================*/


function calculateSpell(){


    const baseMagic =
        Number(
            document.getElementById("spellBaseAttack").value
        );



    const accessoryName =
        document.getElementById("spellAccessory").value;


    const accessoryBonus =
        accessories[accessoryName].magic;



    const totalMagic =
        baseMagic + accessoryBonus;



    const spellName =
        document.getElementById("spellSelect").value;



    let damage =
        spells[spellName].formula(totalMagic);



    const skillName =
        document.getElementById("spellSkill").value;


    damage *=
        spellSkills[skillName].multiplier;



    const rev =
        Number(
            document.getElementById("spellRev").value
        );


    const crit =
        Number(
            document.getElementById("spellCrit").value
        );


    const resistance =
        Number(
            document.getElementById("spellResistance").value
        );


    const weakness =
        Number(
            document.getElementById("spellWeakness").value
        );



    damage = applyModifiers(
        damage,
        rev,
        crit,
        resistance,
        weakness
    );



    document.getElementById("spellResult").innerHTML =
        damage;

}