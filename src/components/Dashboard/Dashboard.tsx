import React, { useEffect, useState } from "react";
import { IUtilisateur } from "../../interface/interfaces";
import CronTable from "../Email/CronTable";

const Dashboard = () => {

    const [utilisateur, setUtilisateur] = useState<any>(JSON.parse(localStorage.getItem("utilisateur") as string));

    return (
        <>
            <div className="w-4/5 ml-auto mr-auto shadow-xl mt-11 bg-slate-100 p-8 flex">
                <div className="w-1/2">
                    <h1 className="text-2xl">Bienvenue sur le nouveau système de comptabilité !</h1>

                    <h2 className="text-xl font-bold my-5" >Les fonctionalités du système:</h2>

                    <h3 className="text-xl">Section client</h3>
                    <ul className="ml-4">
                        <li className="font-bold">- Rechercher un client</li>
                        <li className="font-bold">- Ajouter un client</li>
                        <li className="font-bold">- Supprimer un client</li>
                    </ul>

                    <h3 className="text-xl">Section facturation</h3>
                    <ul className="ml-4">
                        <li className="font-bold">- Rechercher une facture</li>
                        <li className="font-bold">- Ajouter une facture</li>
                        <li className="font-bold">- Supprimer une facture</li>
                        <li className="font-bold">- Imprimer une facture</li>
                    </ul>

                    <h3 className="text-xl">Courriel</h3>
                    <ul className="ml-4">
                        <li className="font-bold">- Envoyer des courriels</li>
                        <li className="font-bold">- Programmer envoi de courriel</li>
                    </ul>

                    <h3 className="text-xl">Call center</h3>
                    <ul className="ml-4">
                        <li className="font-bold">- Réservation</li>
                        <li className="font-bold">- Visualisation de l'horaire</li>
                    </ul>
                </div>
                <div className="w-1/2">
                    <h1 className="text-2xl font-bold">Bug fix</h1>
                    <ul className="ml-4">
                        <li className="">- L'ajout de nouveaux clients marche</li>
                        <li className="">- L'ajout de nouveaux clients avec le même nom de famille marche</li>
                        <li className="">- Le calcul des taxes se comporte exactement comme l'ancien système</li>
                        <li className="">- Le champ genre ne change plus automatiquement</li>
                        <li className="">- Le champ arrivée dans la facture est devenu sous le format AAAA-MM-JJ</li>
                        <li className="">- Le total des paiements et la balance à recevoir se calculent maintenant</li>
                    </ul>
                    <h1 className="text-2xl font-bold mt-5">Bug découvert (Présentement en train d'être corrigé))</h1>
                    <ul className="ml-4">
                        <li className="">- Problème de clients qui disparaissent</li>
                        <li className="">- Problème de factures qui disparaissent</li>
                    </ul>
                </div>



            </div>
            <p className="mt-11 text-center">Pour tout problème technique veuillez me contacter directement par courriel: <a className="underline decoration-solid to-blue-700" href="mailto:guillaume@voyagesgabymsh.ca">guillaume@voyagesgabymsh.ca</a></p>
            <CronTable utilisateur={utilisateur} />
        </>
    );
}

export default Dashboard;