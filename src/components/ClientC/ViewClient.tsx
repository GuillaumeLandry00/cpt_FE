import React, { useEffect, useState } from "react";
import { redirectLogin } from "../../functions/authentification";
import { getClient } from "../../functions/clients";
import NavBar from "../Dashboard/NavBar";

const ViewClient = ({id}:any) => {

    const [client, setClient] = useState<any>();


    const makeRequest = async (id: string) => {
        console.log(id);
        const client = await getClient(id);
        console.log(client);
        setClient(client[0])
    }
    useEffect(() => {
        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        if (id) {
            makeRequest(id);
        }

    }, [])

    return (
        <>
        <NavBar />
        <div className="w-full max-w-screen-lg ml-auto mr-auto mt-10 shadow-2xl p-8">
            {client ?
                (<>
                    <h1 className="text-2xl border-b-2">Détails client: {client.gender}, {client.Nom}, {client.Prenom}</h1>

                    <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                Date de naissance
                            </label>
                            <p>{client.Naissance}</p>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                Adresse
                            </label>
                            <p>{client.Adresse}</p>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                Téléphone (1)
                            </label>
                            <p>{client.Telephone1}</p>
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                Ville
                            </label>
                            <p>{client.Ville}</p>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                Code postal
                            </label>
                            <p>{client.Zip}</p>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                Téléphone (2)
                            </label>
                            <p>{client.Telephone2}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                Notes
                            </label>
                            <p>{client.note ? client.note : "Aucune note"}</p>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                Ajouté le
                            </label>
                            <p>{client.p_date}</p>
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6 mt-5 border-t-2 pt-10">
                        <button type="button" className="px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out w-4/5 md:w-1/3 mb-6 md:mb-0 mr-auto">Modifier</button>

                        <button type="button" className="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-4/5 md:w-1/3 mb-6 md:mb-0">Supprimer</button>

                    </div>
                </>) : (<h1>Vous n'avez pas de client</h1>)}

        </div>
        </>
    );
}

export default ViewClient;