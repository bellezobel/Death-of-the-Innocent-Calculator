function calculateDamage(){

let damage = Number(document.getElementById("damage").value);

let modifier = Number(document.getElementById("modifier").value);

let resistance = Number(document.getElementById("resistance").value);

let finalDamage = damage * modifier;

finalDamage = Math.round(finalDamage);

finalDamage = Math.round(finalDamage * (100-resistance)/100);

document.getElementById("result").innerHTML =
"Final Damage: "+finalDamage;

}