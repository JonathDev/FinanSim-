var taux = 0;
var port = 0;
var temps_travail=1;

function horaire_brut() {
  const horaire_brut=document.getElementById("horaire_brut").value;
  document.getElementById("horaire_net").value=Math.round(horaire_brut*(1-port/100));
  document.getElementById("mensuel_brut").value=Math.round(horaire_brut*151.667*temps_travail);
  document.getElementById("annuel_brut").value=Math.round(horaire_brut*151.667*temps_travail)*12;
  const horaire_net=document.getElementById("horaire_net").value;
  document.getElementById("mensuel_net").value=Math.round(horaire_net*151.667*temps_travail);
  document.getElementById("annuel_net").value=Math.round(horaire_net*151.667*temps_travail)*12;
  calcul_taux()
  }

function mensuel_brut() {
  const mensuel_brut=document.getElementById("mensuel_brut").value;
  document.getElementById("horaire_brut").value=parseFloat((mensuel_brut/(151.667*temps_travail)).toFixed(2));
  document.getElementById("annuel_brut").value=mensuel_brut*12;
  const horaire_brut=document.getElementById("horaire_brut").value;
  document.getElementById("horaire_net").value=Math.round(horaire_brut*(1-port/100));
  const horaire_net=document.getElementById("horaire_net").value;
  document.getElementById("mensuel_net").value=Math.round(horaire_net*temps_travail*151.667);
  document.getElementById("annuel_net").value=Math.round(horaire_net*temps_travail*151.667)*12;
  calcul_taux()
  }

function annuel_brut() {
  const annuel_brut=document.getElementById("annuel_brut").value;
  document.getElementById("mensuel_brut").value=Math.round(annuel_brut/12);
  document.getElementById("horaire_brut").value=parseFloat((annuel_brut/(12*151.667*temps_travail)).toFixed(2));
  const horaire_brut=document.getElementById("horaire_brut").value;
  document.getElementById("horaire_net").value=Math.round(horaire_brut*(1-port/100));
  const horaire_net=document.getElementById("horaire_net").value;
  document.getElementById("mensuel_net").value=Math.round(horaire_net*temps_travail*151.667);
  document.getElementById("annuel_net").value=Math.round(horaire_net*temps_travail*151.667)*12;
  calcul_taux()
  }

function horaire_net() {
  const horaire_net=document.getElementById("horaire_net").value;
  document.getElementById("horaire_brut").value=Math.round(horaire_net/(1-port/100));
  document.getElementById("mensuel_net").value=Math.round(horaire_net*151.667*temps_travail);
  document.getElementById("annuel_net").value=Math.round(horaire_net*151.667*temps_travail)*12;
  const horaire_brut=document.getElementById("horaire_brut").value;
  document.getElementById("mensuel_brut").value=Math.round(horaire_brut*151.667*temps_travail);
  document.getElementById("annuel_brut").value=Math.round(horaire_brut*151.667*temps_travail)*12;
  calcul_taux()
  }

function mensuel_net() {
  const mensuel_net=document.getElementById("mensuel_net").value;
  document.getElementById("horaire_net").value=parseFloat((mensuel_net/(151.667*temps_travail)).toFixed(2));
  document.getElementById("annuel_net").value=mensuel_net*12;
  document.getElementById("mensuel_brut").value=Math.round(mensuel_net/(1-port/100));
  const mensuel_brut=document.getElementById("mensuel_brut").value;
  document.getElementById("horaire_brut").value=parseFloat((mensuel_brut/(151.667*temps_travail)).toFixed(2));
  document.getElementById("annuel_brut").value=mensuel_brut*12;
  calcul_taux()
  }

function annuel_net() {
  const annuel_net=document.getElementById("annuel_net").value;
  document.getElementById("mensuel_net").value=Math.round(annuel_net/12);
  document.getElementById("horaire_net").value=parseFloat((annuel_net/(12*151.667*temps_travail)).toFixed(2));
  const horaire_net=document.getElementById("horaire_net").value;
  document.getElementById("horaire_brut").value=Math.round(horaire_net/(1-port/100));
  const horaire_brut=document.getElementById("horaire_brut").value;
  document.getElementById("mensuel_brut").value=Math.round(horaire_brut*151.667*temps_travail);
  document.getElementById("annuel_brut").value=Math.round(horaire_brut*151.667*temps_travail)*12;
  calcul_taux()
  }



function fn_statut() {
    const statut=document.getElementById("statut").value
    switch (statut) {
        case "0":
            port=22;
            break;
        case "1":
            port=25;
            break;
        case "2":
            port=17;
            break;
        case "3":
            port=35;
            break;
        case "4":
            port=47;
            break;
    }
    horaire_brut()
}

function calcul_taux() {
    const mensuel_net=document.getElementById("mensuel_net").value
    if (mensuel_net <= 1620){
        taux=0;
    } else if (mensuel_net <= 1682){
        taux=0.5;
    } else if (mensuel_net <= 1790){
        taux=1.3;
    } else if (mensuel_net <= 1910){
        taux=2.1;
    } else if (mensuel_net <= 2041){
        taux=2.9;
    } else if (mensuel_net <= 2150){
        taux=3.5;
    } else if (mensuel_net <= 2293){
        taux=4.1;
    } else if (mensuel_net <= 2713){
        taux=5.3;
    } else if (mensuel_net <= 3106){
        taux=7.5;
    } else if (mensuel_net <= 3538){
        taux=9.9;
    } else if (mensuel_net <= 3982){
        taux=11.9;
    } else if (mensuel_net <= 4647){
        taux=13.8;
    } else if (mensuel_net <= 5573){
        taux=15.8;
    } else if (mensuel_net <= 6973){
        taux=17.9;
    } else if (mensuel_net <= 8710){
        taux=20;
    } else if (mensuel_net <= 12090){
        taux=24;
    } else if (mensuel_net <= 16375){
        taux=28;
    } else if (mensuel_net <= 25705){
        taux=33;
    } else if (mensuel_net <= 55061){
        taux=38;
    } else {
        taux=43;
    }
    document.getElementById("taux_text").innerHTML=taux;
    document.getElementById("taux").value=taux;
    document.getElementById("resultat").innerHTML=Math.round((100-taux)/100*mensuel_net);
}

function fn_taux() {
    taux=document.getElementById("taux").value;
    document.getElementById("taux_text").innerHTML=taux;
    const mensuel_net=document.getElementById("mensuel_net").value
    document.getElementById("resultat").innerHTML=Math.round((100-taux)/100*mensuel_net);
}

function fn_temps_travail() {
    temps_travail=document.getElementById("temps_travail").value/100;
    document.getElementById("temps_travail_text").innerHTML=Math.round(temps_travail*100);
    horaire_brut();
}

document.getElementById("temps_travail").value=temps_travail*100;
document.getElementById("temps_travail_text").innerHTML=Math.round(temps_travail*100);
fn_statut()
document.getElementById("horaire_brut").addEventListener("keyup",horaire_brut);
document.getElementById("mensuel_brut").addEventListener("keyup",mensuel_brut);
document.getElementById("annuel_brut").addEventListener("keyup",annuel_brut);
document.getElementById("horaire_net").addEventListener("keyup",horaire_net);
document.getElementById("mensuel_net").addEventListener("keyup",mensuel_net);
document.getElementById("annuel_net").addEventListener("keyup",annuel_net);
document.getElementById("statut").addEventListener("mouseup",fn_statut);
document.getElementById("taux").addEventListener("mousemove",fn_taux);
document.getElementById("temps_travail").addEventListener("mousemove",fn_temps_travail);
