import React from "react";

const DefaultAdmin = () => {

    return (
        <div className="w-full">
            <h1 className="text-2xl">Bienvenue sur le nouveau système de comptabilité !</h1>

            <h2 className="text-xl font-bold my-5" >Les fonctionalités du système admin:</h2>

            <a className="text-xl underline">Liste des agents</a>
            <ul className="ml-4">
                <li className="font-bold">- Ajouter un agent</li>
                <li className="font-bold">- Modifier un agent</li>
                <li className="font-bold">- Supprimer un agent</li>
            </ul>
        </div >
    );
}

export default DefaultAdmin;