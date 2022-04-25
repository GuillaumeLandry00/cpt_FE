import React, { useEffect, useState } from "react";
import { deleteClient, downloadPassport, getClient } from "../../functions/clients";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ViewClient = ({ id }: any) => {

    const [client, setClient] = useState<any>();
    const [enablePassword, setEnablePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [returnMessage, setReturnMessage] = useState<string>("");
    const url = new URL(window.location.href);

    const makeRequest = async (id: string) => {
        const client = await getClient(id);
        setClient(client[0])
    }
    useEffect(() => {
        let id = url.searchParams.get("id");
        if (id) {
            makeRequest(id);
        }

    }, [])

    const handleDelete = () => {
        if (window.confirm("Désirez-vous vraiment supprimer cet utilisateur ?")) {
            //We delete the user
            deleteClient(parseInt(url.searchParams.get("id") as string));
        }
    }

    console.log(client);

    return (
        <>
            <div className="w-full max-w-screen-xl ml-auto mr-auto mt-10 shadow-2xl p-8">
                {returnMessage !== "" && (
                    <div className="w-full bg-blue-500 opacity-80 mb-4 rounded-lg text-white text-lg p-4 flex space-between">
                        {returnMessage}
                        <button className="ml-auto mt-1" onClick={() => setReturnMessage("")} >
                            <AiOutlineCloseCircle size={22} color="white" />
                        </button>

                    </div>
                )}
                {client ?
                    (<>
                        <h1 className="text-2xl border-b-2 text-slate-600">Détails client: <strong>{client.gender}, {client.Nom}, {client.Prenom}</strong></h1>

                        <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                    Date de naissance
                                </label>
                                <p>{client.Naissance.substr(0, 10)}</p>
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
                                <p>{client.p_date.substr(0, 10)}</p>
                            </div>

                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6 mt-5 border-t-2 pt-10 justify-between">
                            {(client.Passeport !== "No Passport" && client.Passeport !== "") && (<button type="button" onClick={() => { enablePassword ? setEnablePassword(false) : setEnablePassword(true) }} className="py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/5  mb-6 md:mb-0">Télécharger le passport</button>)}

                            <Link to={`/dashboard/client/form/?action=edit&id=${client.ID}`} replace className="py-2.5 mx-2 bg-yellow-500  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out w-1/5  mb-6 md:mb-0 mr-auto">
                                <p className="text-center">Modifier</p>
                            </Link>
                            <button type="button" onClick={() => { handleDelete() }} className="py-2.5  bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-2/5  mb-6 md:mb-0">Supprimer</button>
                        </div>
                        {enablePassword && (
                            <>
                                <h4 className="block uppercase tracking-wide text-gray-700 text-l font-bold ">Vous devez entrer votre mot de passe pour télécharger le Passeport</h4>
                                <div className="flex flex-wrap -mx-3 mt-0 border-t-2 pt-10 justify-between">
                                    <input type="password" placeholder={"Mot de passe"} value={password} className="mt-0 appearance-none block w-3/4 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" onChange={(e) => { setPassword(e.target.value) }} required />
                                    <button onClick={async () => { setReturnMessage(await downloadPassport(password, client.Passeport)) }} className="py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-1/5  mb-6 md:mb-0"> Télécharger</button>
                                </div>
                            </>
                        )}
                    </>) : (<h1>Vous n'avez pas de client</h1>)}

            </div>
        </>
    );
}

export default ViewClient;