/* ======================================
   Death of the Innocent Companion
   script.js
====================================== */


/* ======================================
        VARIABLES
====================================== */


let activeStatuses = [];

let activeBuffs = [];





/* ======================================
        TAB SYSTEM
====================================== */


function showTab(tabName, button){


    const tabs =
        document.getElementsByClassName("tabContent");


    for(let tab of tabs){

        tab.classList.add("hidden");

    }



    document
        .getElementById(tabName)
        .classList.remove("hidden");



    const buttons =
        document.getElementsByClassName("tabButton");


    for(let btn of buttons){

        btn.classList.remove("active");

    }



    button.classList.add("active");

}







/* ======================================
        DROPDOWNS
====================================== */


function populateDropdown(id, database){


    const select =
        document.getElementById(id);



    for(let item in database){


        const option =
            document.createElement("option");


        option.value = item;

        option.textContent = item;


        select.appendChild(option);


    }

}





function loadDropdowns(){



    populateDropdown(
        "weaponSelect",
        weapons
    );



    populateDropdown(
        "spellSelect",
        spells
    );



    populateDropdown(
        "spellAccessory1",
        accessories
    );


    populateDropdown(
        "spellAccessory2",
        accessories
    );


    populateDropdown(
        "spellAccessory3",
        accessories
    );



    populateDropdown(
        "weaponSkill",
        weaponSkills
    );



    populateDropdown(
        "spellSkill",
        spellSkills
    );


}









/* ======================================
        ITEM PREVIEW
====================================== */


function updateItemPreview(type){



    if(type === "weapon"){



        const weapon =

        weapons[
            document
            .getElementById("weaponSelect")
            .value
        ];



        document
        .getElementById("weaponImage")
        .src = weapon.image;



        document
        .getElementById("weaponSelect")
        .value;



        document
        .getElementById("weaponInfo")
        .textContent =

		weapon.damageType
		+
		" | Hit Bonus: +"
		+
		weapon.hitBonus
		+
		" | Effect: "
		+
		weapon.effect


    }







    if(type === "spell"){



        const spell =

        spells[
            document
            .getElementById("spellSelect")
            .value
        ];


        document
        .getElementById("spellImage")
        .src = spell.image;



        document
        .getElementById("spellSelect")
        .value;



        document
        .getElementById("spellInfo")
        .textContent =

		spell.target
		+
		" | "
		+
		spell.damageType
		+
		" | Hit Bonus: +"
		+
		spell.hitBonus
		+
		" | Effect: "
		+
		spell.effect


    }


}









/* ======================================
        ICON SYSTEM
====================================== */


function createIcons(
    database,
    containerID,
    className,
    array
){


    const container =
        document.getElementById(containerID);



    for(let name in database){


        const img =
            document.createElement("img");



        img.src =
            database[name].image;



        img.title =
            name;



        img.alt =
            name;



        img.className =
            className;





        img.onclick=function(){



            img.classList.toggle("active");



            if(array.includes(name)){


                array.splice(
                    array.indexOf(name),
                    1
                );


            }
            else{


                array.push(name);


            }


        };



        container.appendChild(img);



    }


}









/* ======================================
        DAMAGE
====================================== */


function applyStatusAndBuffs(
    damage,
    type
){


    let modifier = 1;



    activeStatuses.forEach(status=>{


        modifier *=
        statusEffects[status][type];


    });




    activeBuffs.forEach(buff=>{


        modifier *=
        buffs[buff][type];


    });



    return damage * modifier;


}








function applyModifiers(
    damage,
    rev,
    crit,
    resistance,
    weakness,
    type
){


    damage *= rev;


    damage *= crit;



    damage *=
    (100 - resistance) / 100;



    damage *=
    (100 + weakness) / 100;




    damage =
    applyStatusAndBuffs(
        damage,
        type
    );



    return Math.round(damage);


}









/* ======================================
        WEAPON CALCULATION
====================================== */


function calculateWeapon(){



    const baseAttack =

    Number(
        document
        .getElementById("weaponBaseAttack")
        .value
    );




    const weapon =

    weapons[
        document
        .getElementById("weaponSelect")
        .value
    ];




    let damage =

    (baseAttack + weapon.attack) * 2;





    damage *=

    weaponSkills[
        document
        .getElementById("weaponSkill")
        .value
    ]
    .multiplier;






    damage =

    applyModifiers(

        damage,

        Number(document.getElementById("weaponRev").value),

        Number(document.getElementById("weaponCrit").value),

        Number(document.getElementById("weaponResistance").value),

        Number(document.getElementById("weaponWeakness").value),

        "physical"

    );




    document
    .getElementById("weaponResult")
    .textContent = damage;


}









/* ======================================
        SPELL CALCULATION
====================================== */


function calculateSpell(){



    const baseMagic =

    Number(
        document
        .getElementById("spellBaseAttack")
        .value
    );




    let magicBonus = 0;




    [

        "spellAccessory1",

        "spellAccessory2",

        "spellAccessory3"


    ].forEach(id=>{


        magicBonus +=

        accessories[

            document
            .getElementById(id)
            .value

        ]

        .magic;


    });






    let damage =

    spells[

        document
        .getElementById("spellSelect")
        .value

    ]

    .formula(

        baseMagic + magicBonus

    );






    damage *=

    spellSkills[

        document
        .getElementById("spellSkill")
        .value

    ]

    .multiplier;







    damage =

    applyModifiers(

        damage,

        Number(document.getElementById("spellRev").value),

        Number(document.getElementById("spellCrit").value),

        Number(document.getElementById("spellResistance").value),

        Number(document.getElementById("spellWeakness").value),

        "magic"

    );





    document
    .getElementById("spellResult")
    .textContent = damage;


}









/* ======================================
        COIN FLIP
====================================== */


function coinFlip(amount){


    let coins = [];


    coins.push(
        document.getElementById("coinResult1")
    );


    let secondCoin =
        document.getElementById("coinResult2");



    if(amount === 2){

        secondCoin.classList.remove("hiddenCoin");

        coins.push(secondCoin);

    }
    else{

        secondCoin.classList.add("hiddenCoin");

        secondCoin.src = "images/coin.gif";

    }



    coins.forEach((coin)=>{


        const heads =
            Math.random() < 0.5;



        if(heads){


            coin.src =
            "images/coinfliphead.gif";


            setTimeout(()=>{


                coin.src =
                "images/coinhead.gif";


            },2900);


        }

        else{


            coin.src =
            "images/coinfliptail.gif";


            setTimeout(()=>{


                coin.src =
                "images/cointail.gif";


            },2900);


        }


    });


}









/* ======================================
        START
====================================== */


window.onload=function(){



    loadDropdowns();



    createIcons(
        statusEffects,
        "statusContainer",
        "statusIcon",
        activeStatuses
    );



    createIcons(
        buffs,
        "buffContainer",
        "buffIcon",
        activeBuffs
    );



    document
    .getElementById("weaponSelect")
    .addEventListener(
        "change",
        ()=>updateItemPreview("weapon")
    );



    document
    .getElementById("spellSelect")
    .addEventListener(
        "change",
        ()=>updateItemPreview("spell")
    );



    updateItemPreview("weapon");

    updateItemPreview("spell");


};