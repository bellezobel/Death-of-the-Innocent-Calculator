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
        DAMAGE CALCULATOR
=======================================*/


function calculateDamage(){


    //----------------------------------
    // Base Damage
    //----------------------------------

    let damage = Number(
        document.getElementById("damageBase").value
    );


    //----------------------------------
    // Rev / Crit Modifier
    //----------------------------------

    let modifier = Number(
        document.getElementById("damageModifier").value
    );


    //----------------------------------
    // Resistance
    //----------------------------------

    let resistance = Number(
        document.getElementById("damageResistance").value
    );


    //----------------------------------
    // Weakness
    //----------------------------------

    let weakness = Number(
        document.getElementById("damageWeakness").value
    );


    //----------------------------------
    // Damage × Rev
    //----------------------------------

    damage *= modifier;

    damage = Math.round(damage);


    //----------------------------------
    // Resistance
    //----------------------------------

    damage *= (100-resistance)/100;

    damage = Math.round(damage);


    //----------------------------------
    // Weakness
    //----------------------------------

    damage *= (100+weakness)/100;

    damage = Math.round(damage);


    //----------------------------------
    // Result
    //----------------------------------

    document.getElementById("damageResult").innerHTML =
        damage;


}



/*=======================================
      PLACEHOLDER FUNCTIONS
=======================================*/


/*=======================================
        WEAPON DATABASE
=======================================*/

const weapons = {

    "Rusty Pipe": {
        attack: 15
    },

    "Black Steel": {
        attack: 30
    }

};


const weaponSkills = {

    "None": {
        multiplier: 1
    },

    "Adrenalinrush 1": {
        multiplier: 1.5
    },

    "Adrenalinrush 2": {
        multiplier: 2
    }

};



/*=======================================
        WEAPON CALCULATOR
=======================================*/

function calculateWeapon(){

    //----------------------------------
    // Base Attack
    //----------------------------------

    const baseAttack = Number(
        document.getElementById("weaponBaseAttack").value
    );



    //----------------------------------
    // Weapon
    //----------------------------------

    const weaponName =
        document.getElementById("weaponSelect").value;

    const weaponAttack =
        weapons[weaponName].attack;



    //----------------------------------
    // Skill
    //----------------------------------

    const skillName =
        document.getElementById("weaponSkill").value;

    const skillMultiplier =
        weaponSkills[skillName].multiplier;



    //----------------------------------
    // Formula
    //----------------------------------

    let damage =
        (baseAttack + weaponAttack) * 3;

    damage *= skillMultiplier;

    damage = Math.round(damage);



    //----------------------------------
    // Result
    //----------------------------------

    document.getElementById("weaponResult").innerHTML =
        damage;

}


/*=======================================
            SPELL DATABASE
=======================================*/

const accessories = {

    "None": {
        magic:0
    },

    "Chac Chac": {
        magic:10
    },

    "Molded Doll": {
        magic:6
    }

};



const spellSkills = {

    "None":{
        multiplier:1
    },

    "La Danse Macabre 1":{
        multiplier:1.5
    },

    "La Danse Macabre 2":{
        multiplier:2
    }

};



const spells = {

    "Hurting":{

        formula:function(mAttack){

            return 40 + (mAttack*2);

        }

    },

    "Combustion":{

        formula:function(mAttack){

            return mAttack*2;

        }

    }

};

/*=======================================
        SPELL CALCULATOR
=======================================*/

function calculateSpell(){


    //----------------------------------
    // Base Magic Attack
    //----------------------------------

    const baseMagic =
        Number(
            document.getElementById("spellBaseAttack").value
        );



    //----------------------------------
    // Accessory
    //----------------------------------

    const accessoryName =
        document.getElementById("spellAccessory").value;

    const accessoryBonus =
        accessories[accessoryName].magic;



    //----------------------------------
    // Final Magic Attack
    //----------------------------------

    const totalMagic =
        baseMagic + accessoryBonus;



    //----------------------------------
    // Spell
    //----------------------------------

    const spellName =
        document.getElementById("spellSelect").value;

    let damage =
        spells[spellName].formula(totalMagic);



    //----------------------------------
    // Skill
    //----------------------------------

    const skillName =
        document.getElementById("spellSkill").value;

    damage *=
        spellSkills[skillName].multiplier;



    //----------------------------------
    // Round
    //----------------------------------

    damage =
        Math.round(damage);



    //----------------------------------
    // Result
    //----------------------------------

    document.getElementById("spellResult").innerHTML =
        damage;

}