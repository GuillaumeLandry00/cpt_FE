import React, { useState, useEffect } from "react";
import { getClient } from "../../functions/agent/clients";
import { IClient } from "../../interface/interfaces";
import FormClient from "./FormClient";

type props = {
    setShowModal: (showModal: boolean) => void,
    id: string
}

const ModalClient = ({ setShowModal, id }: props) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [client, setClient] = useState<any>();
    const [view, setView] = useState<string>("view");

    //We fetch data for administrative purchases
    const fetch = async (): Promise<void> => {
        setIsLoading(true);
        setClient((await getClient(id) as IClient[])[0]);
        setIsLoading(false);
    }

    useEffect(() => {
        fetch();
    }, [])

    return (
        <>
            <div
                className="justify-center top-20 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative my-6 mx-auto w-3/5">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}

                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {view == "view" ? <>
                                {client && (<>  <h1 className="text-2xl border-b-2 text-slate-600">Détails client: <strong>{client.Gender}, {client.Nom}, {client.Prenom}</strong></h1>
                                    <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                                Date de naissance
                                            </label>
                                            <p>{client.Naissance.substring(0, 10)}</p>
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
                                            <p>{client.Note ? client.Note : "Aucune note"}</p>
                                        </div>
                                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
                                                Ajouté le
                                            </label>
                                            <p>{client.p_date.substr(0, 10)}</p>
                                        </div>

                                    </div>
                                </>)}
                            </> : <>
                                <FormClient idDefault={parseInt(id)} />
                            </>}





                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            {view == "view" ?
                                <button onClick={() => { /*setView("modify")*/ }} className="py-2.5 mx-2 bg-yellow-500  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out w-1/5  mb-6 md:mb-0 mr-auto">
                                    Modifier
                                </button> :
                                <button onClick={() => { setView("view") }} className="py-2.5 mx-2 bg-cyan-500  text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out w-1/5  mb-6 md:mb-0 mr-auto">
                                    Voir les détails
                                </button>
                            }

                            <button
                                className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Fermer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );
}

export default ModalClient;