from django.shortcuts import render

def conversion_salaire(request):
    session = request.session
    statut = request.POST.get("statut", session.get('statut', "non-cadre"))
    session['statut'] = statut
    temps_travail = float(request.POST.get("temps_travail", session.get('temps_travail', 100)))

    salaire_annuel_brut = salaire_annuel_net = ""
    salaire_mensuel_brut = salaire_mensuel_net = ""
    taux_horaire_brut = taux_horaire_net = ""

    taux_charges = {
        "non-cadre": 0.22,
        "cadre": 0.25,
        "fonction-publique": 0.17,
        "profession-liberale": 0.35,
        "portage-salarial": 0.47
    }
    taux_reduction = taux_charges.get(statut, 0.22)

    if request.method == "POST":
        try:
            champ_modifie = request.POST.get('champ_modifie')

            if champ_modifie in ["salaire_annuel_brut", "salaire_annuel_net",
                                 "salaire_mensuel_brut", "salaire_mensuel_net"]:
                
                salaire_mensuel_brut_initial = float(request.POST.get("salaire_mensuel_brut") or 0)
                salaire_annuel_brut_initial = salaire_mensuel_brut_initial * 12
                salaire_annuel_net_initial = salaire_annuel_brut_initial * (1 - taux_reduction)
                salaire_mensuel_net_initial = salaire_mensuel_brut_initial * (1 - taux_reduction)

                session['initial'] = {
                    "salaire_annuel_brut": salaire_annuel_brut_initial,
                    "salaire_annuel_net": salaire_annuel_net_initial,
                    "salaire_mensuel_brut": salaire_mensuel_brut_initial,
                    "salaire_mensuel_net": salaire_mensuel_net_initial,
                }
                session['temps_travail'] = 100
                session.modified = True

                salaire_annuel_brut = salaire_annuel_brut_initial
                salaire_annuel_net = salaire_annuel_net_initial
                salaire_mensuel_brut = salaire_mensuel_brut_initial
                salaire_mensuel_net = salaire_mensuel_net_initial

            elif champ_modifie == "statut":
                initial = session.get('initial', {"salaire_mensuel_brut": 0})
                salaire_mensuel_brut = initial["salaire_mensuel_brut"]
                salaire_annuel_brut = salaire_mensuel_brut * 12
                salaire_annuel_net = salaire_annuel_brut * (1 - taux_reduction)
                salaire_mensuel_net = salaire_mensuel_brut * (1 - taux_reduction)

                session['initial'] = {
                    "salaire_annuel_brut": salaire_annuel_brut,
                    "salaire_annuel_net": salaire_annuel_net,
                    "salaire_mensuel_brut": salaire_mensuel_brut,
                    "salaire_mensuel_net": salaire_mensuel_net,
                }
                session.modified = True

            # Recalcul des taux horaires dès que salaire mensuel brut est dispo
            if salaire_mensuel_brut:
                taux_horaire_brut = salaire_mensuel_brut / 151.67
                taux_horaire_net = taux_horaire_brut * (1 - taux_reduction)
            else:
                taux_horaire_brut = taux_horaire_net = ""

        except ValueError:
            salaire_annuel_brut = salaire_annuel_net = ""
            salaire_mensuel_brut = salaire_mensuel_net = ""
            taux_horaire_brut = taux_horaire_net = ""

    return render(request, "brutnet/conversion.html", {
        "salaire_annuel_brut": f"{salaire_annuel_brut:.2f}" if salaire_annuel_brut else "",
        "salaire_annuel_net": f"{salaire_annuel_net:.2f}" if salaire_annuel_net else "",
        "salaire_mensuel_brut": f"{salaire_mensuel_brut:.2f}" if salaire_mensuel_brut else "",
        "salaire_mensuel_net": f"{salaire_mensuel_net:.2f}" if salaire_mensuel_net else "",
        "taux_horaire_brut": f"{taux_horaire_brut:.2f}" if taux_horaire_brut else "",
        "taux_horaire_net": f"{taux_horaire_net:.2f}" if taux_horaire_net else "",
        "statut": statut,
        "temps_travail": temps_travail,
    })
