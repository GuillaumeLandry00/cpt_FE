import React, { useEffect, useState } from "react";
import { IUtilisateur } from "../../interface/interfaces";
import CronTable from "../Email/CronTable";

const Dashboard = () => {

    const [utilisateur, setUtilisateur] = useState<any>(JSON.parse(localStorage.getItem("utilisateur") as string));

    return (
        <>
            <div className="w-4/5 ml-auto mr-auto shadow-xl mt-11 bg-slate-100 p-8">
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
                    <li className="font-bold">- Programmer envoie de courriel</li>
                </ul>

                <h3 className="text-xl">Call center</h3>
                <ul className="ml-4">
                    <li className="font-bold">- Réservation</li>
                    <li className="font-bold">- Visualisation de l'horaire</li>
                </ul>

                <p className="mt-11">Pour tout problème technique veuillez me contacter directement par courriel: <a className="underline decoration-solid" href="mailto:landry.guillaume00@hotmail.com">landry.guillaume00@hotmail.com</a></p>

            </div>
            <CronTable utilisateur={utilisateur} />
        </>
    );
}

export default Dashboard;