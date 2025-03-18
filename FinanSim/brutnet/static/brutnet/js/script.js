document.addEventListener("DOMContentLoaded", function() {

    const form = document.getElementById('formSalaire');
    const inputs = form.querySelectorAll('input[type="number"], input[type="radio"]');
    const champModifie = document.getElementById('champ_modifie');

    const tempsTravail = document.getElementById('temps_travail');
    const tempsTravailVal = document.getElementById('temps_travail_val');

    // On mémorise les valeurs initiales immédiatement après chargement
    const salaireAnnuelBrutInput = document.getElementById('salaire_annuel_brut');
    const salaireAnnuelNetInput = document.getElementById('salaire_annuel_net');
    const salaireMensuelBrutInput = document.getElementById('salaire_mensuel_brut');
    const salaireMensuelNetInput = document.getElementById('salaire_mensuel_net');

    const salairesInitiaux = {
        annuelBrut: parseFloat(salaireAnnuelBrutInput.value) || 0,
        annuelNet: parseFloat(salaireAnnuelNetInput.value) || 0,
        mensuelBrut: parseFloat(salaireMensuelBrutInput.value) || 0,
        mensuelNet: parseFloat(salaireMensuelNetInput.value) || 0
    };

    // Fonction pour recalculer sans recharger
    function ajusterSalairesSelonTempsTravail() {
        const facteur = parseFloat(tempsTravail.value) / 100;
        tempsTravailVal.textContent = tempsTravail.value;

        salaireAnnuelBrutInput.value = (salairesInitiaux.annuelBrut * facteur).toFixed(2);
        salaireAnnuelNetInput.value = (salairesInitiaux.annuelNet * facteur).toFixed(2);
        salaireMensuelBrutInput.value = (salairesInitiaux.mensuelBrut * facteur).toFixed(2);
        salaireMensuelNetInput.value = (salairesInitiaux.mensuelNet * facteur).toFixed(2);
    }

    // Événement déclenché à chaque mouvement du curseur (temps réel)
    tempsTravail.addEventListener('input', ajusterSalairesSelonTempsTravail);

    // Les autres inputs provoquent un submit classique
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            champModifie.value = e.target.name === 'statut' ? 'statut' : e.target.name;
            form.submit();
        });
    });

    // Initialisation au chargement
    ajusterSalairesSelonTempsTravail();
});
