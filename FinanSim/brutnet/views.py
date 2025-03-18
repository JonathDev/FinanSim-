from django.shortcuts import render

def conversion_salaire(request):
    salaire_annuel_brut = salaire_annuel_net = None
    salaire_mensuel_brut = salaire_mensuel_net = None
    taux_horaire_brut = taux_horaire_net = None
    statut = "non-cadre"

    if request.method == "POST":
        try:
            champ_modifie = request.POST.get('champ_modifie')
            
            salaire_annuel_brut = request.POST.get("salaire_annuel_brut")
            salaire_annuel_net = request.POST.get("salaire_annuel_net")
            salaire_mensuel_brut = request.POST.get("salaire_mensuel_brut")
            salaire_mensuel_net = request.POST.get("salaire_mensuel_net")
            taux_horaire_brut = request.POST.get("taux_horaire_brut")
            taux_horaire_net = request.POST.get("taux_horaire_net")
            statut = request.POST.get("statut", "non-cadre")

            salaire_annuel_brut = float(salaire_annuel_brut) if salaire_annuel_brut else None
            salaire_annuel_net = float(salaire_annuel_net) if salaire_annuel_net else None
            salaire_mensuel_brut = float(salaire_mensuel_brut) if salaire_mensuel_brut else None
            salaire_mensuel_net = float(salaire_mensuel_net) if salaire_mensuel_net else None
            taux_horaire_brut = float(taux_horaire_brut) if taux_horaire_brut else None
            taux_horaire_net = float(taux_horaire_net) if taux_horaire_net else None

            taux_charges = {
                "non-cadre": 0.22,
                "cadre": 0.25,
                "fonction-publique": 0.17,
                "profession-liberale": 0.35,
                "portage-salarial": 0.47
            }
            taux_reduction = taux_charges.get(statut, 0.22)

            if champ_modifie == "statut":
                # On recalcule depuis le premier champ disponible rempli
                if salaire_mensuel_brut is not None:
                    champ_modifie = "salaire_mensuel_brut"
                elif salaire_annuel_brut is not None:
                    champ_modifie = "salaire_annuel_brut"
                elif taux_horaire_brut is not None:
                    champ_modifie = "taux_horaire_brut"
                elif salaire_mensuel_net is not None:
                    champ_modifie = "salaire_mensuel_net"
                elif salaire_annuel_net is not None:
                    champ_modifie = "salaire_annuel_net"
                elif taux_horaire_net is not None:
                    champ_modifie = "taux_horaire_net"

            # Maintenant on recalcule selon le champ modifié (qu'il ait été changé directement ou par statut)
            if champ_modifie == "salaire_mensuel_brut" and salaire_mensuel_brut is not None:
                salaire_annuel_brut = salaire_mensuel_brut * 12
                taux_horaire_brut = salaire_mensuel_brut / 151.67
                salaire_annuel_net = salaire_annuel_brut * (1 - taux_reduction)
                salaire_mensuel_net = salaire_mensuel_brut * (1 - taux_reduction)
                taux_horaire_net = taux_horaire_brut * (1 - taux_reduction)

            elif champ_modifie == "salaire_annuel_brut" and salaire_annuel_brut is not None:
                salaire_mensuel_brut = salaire_annuel_brut / 12
                taux_horaire_brut = salaire_mensuel_brut / 151.67
                salaire_annuel_net = salaire_annuel_brut * (1 - taux_reduction)
                salaire_mensuel_net = salaire_mensuel_brut * (1 - taux_reduction)
                taux_horaire_net = taux_horaire_brut * (1 - taux_reduction)

            elif champ_modifie == "taux_horaire_brut" and taux_horaire_brut is not None:
                salaire_mensuel_brut = taux_horaire_brut * 151.67
                salaire_annuel_brut = salaire_mensuel_brut * 12
                salaire_annuel_net = salaire_annuel_brut * (1 - taux_reduction)
                salaire_mensuel_net = salaire_mensuel_brut * (1 - taux_reduction)
                taux_horaire_net = taux_horaire_brut * (1 - taux_reduction)

            elif champ_modifie == "salaire_mensuel_net" and salaire_mensuel_net is not None:
                salaire_mensuel_brut = salaire_mensuel_net / (1 - taux_reduction)
                salaire_annuel_brut = salaire_mensuel_brut * 12
                taux_horaire_brut = salaire_mensuel_brut / 151.67
                salaire_annuel_net = salaire_annuel_brut * (1 - taux_reduction)
                taux_horaire_net = taux_horaire_brut * (1 - taux_reduction)

            elif champ_modifie == "salaire_annuel_net" and salaire_annuel_net is not None:
                salaire_annuel_brut = salaire_annuel_net / (1 - taux_reduction)
                salaire_mensuel_brut = salaire_annuel_brut / 12
                taux_horaire_brut = salaire_mensuel_brut / 151.67
                salaire_mensuel_net = salaire_mensuel_brut * (1 - taux_reduction)
                taux_horaire_net = taux_horaire_brut * (1 - taux_reduction)

            elif champ_modifie == "taux_horaire_net" and taux_horaire_net is not None:
                taux_horaire_brut = taux_horaire_net / (1 - taux_reduction)
                salaire_mensuel_brut = taux_horaire_brut * 151.67
                salaire_annuel_brut = salaire_mensuel_brut * 12
                salaire_annuel_net = salaire_annuel_brut * (1 - taux_reduction)
                salaire_mensuel_net = salaire_mensuel_brut * (1 - taux_reduction)

        except ValueError:
            pass

    return render(request, "brutnet/conversion.html", {
    "salaire_annuel_brut": f"{salaire_annuel_brut:.2f}" if salaire_annuel_brut is not None else "",
    "salaire_annuel_net": f"{salaire_annuel_net:.2f}" if salaire_annuel_net is not None else "",
    "salaire_mensuel_brut": f"{salaire_mensuel_brut:.2f}" if salaire_mensuel_brut is not None else "",
    "salaire_mensuel_net": f"{salaire_mensuel_net:.2f}" if salaire_mensuel_net is not None else "",
    "taux_horaire_brut": f"{taux_horaire_brut:.2f}" if taux_horaire_brut is not None else "",
    "taux_horaire_net": f"{taux_horaire_net:.2f}" if taux_horaire_net is not None else "",
    "statut": statut,
})