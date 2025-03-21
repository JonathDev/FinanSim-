

function calcul() {
    const date1 = new Date(document.getElementById('date1').value);
    const date2 = new Date(document.getElementById('date2').value);
    // console.log(document.getElementById('date1').value);
    const difference = date1.getTime() - date2.getTime();
    const TotalDiffDays = Math.ceil(difference / (1000 * 3600 * 24));
    document.getElementById('resultat').innerHTML=TotalDiffDays + ' jours';
}

document.getElementById('bouton').addEventListener('mousedown',calcul);
document.getElementById('calcul').addEventListener('mousedown',changer_calcul());
