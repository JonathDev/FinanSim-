function calcul_taux(date,activite) {
  const date1 = new Date(date);
  const date2 = new Date('01/10/2022');
  const date3 = new Date('01/07/2024');
  const date4 = new Date('01/01/2025');
  const date5 = new Date('01/01/2026');
  if (date1.getTime() >= date2.getTime()) {
    if (activite == 'marchandise'){
      return 12.3/100
    } else if (activite == 'commerce') {
      return 21.2/100
    } else if (activite == 'presta' &&  date1.getTime() < date3.getTime()) {
      return 21.1/100
    } else if (activite == 'presta' &&  date1.getTime() < date4.getTime()) {
      return 24.6/100
    } else if (activite == 'presta' &&  date1.getTime() < date5.getTime()) {
      return 26.1/100
    } else if (activite == 'liberal' &&  date1.getTime() < date3.getTime()) {
      return 21.2/100
    } else if (activite == 'liberal' &&  date1.getTime() < date4.getTime()) {
      return 23.2/100
    } else if  (activite == 'tourisme') {
      return 6/100
    }
  } 
}

seuils = {
  'vente': (91900, 101000),
  'service': (36800, 39100),
  'liberal': (36800, 39100),
  'liberal_cipav': (36800, 39100),
  'artisanal': (36800, 39100),
  'commercial': (91900, 101000),
  'restauration': (91900, 101_000),
  'alimentaire': (91900, 101000),
  'presse': (91900, 101000)
}

function calcul_defaut() {
  const valeur=document.getElementById("affaires").value;
  const taux1=calcul_taux('01/01/2025','commerce');
  const taux2=calcul_taux('01/01/2025','marchandise');
  const taux=taux2
  document.getElementById("net").value=valeur*(1-taux);
}

function calcul_date(){
  date=date1.value;
}

function libe_oui() {
  document.getElementById("commune").style.display='inline';
  document.getElementById("libe_non1").style.display='none';
  document.getElementById("enfants").style.display='none';
  document.getElementById("perso").style.display='none';
}

function libe_non() {
  document.getElementById("commune").style.display='none';
  document.getElementById("libe_non1").style.display='inline';
}

document.getElementById("libe_oui").addEventListener("mousedown",libe_oui);
document.getElementById("libe_non").addEventListener("mousedown",libe_non);
document.getElementById("date1").addEventListener("mouseup",calcul_date);

document.getElementById("affaires").addEventListener("keyup",calcul_defaut);

