import React, { useEffect, useState } from "react";
import { deletePurchasingIssues } from "../../../functions/accounting/purchasingIssues";
import { IPurchases } from "../../../interface/interface_accounting";

type Props = {
    fetchData: () => Promise<void>,
    id: number,
    setShowModal: (show: boolean) => void,
    setResponse: (response: string) => void
}

const DeletingPurchases = ({ fetchData, id, setShowModal, setResponse }: Props) => {


    const deletePurchases = async () => {
        if ((await deletePurchasingIssues(id)).affectedRows > 0) {
            setResponse("Achat supprimé !");
            setShowModal(false);
            fetchData();
        } else {
            alert("Erreur");
        }
    }


    return (<>

        <div className="fade mt-5 w-full  outline-none">
            <div className="w-4/5 ml-auto mr-auto">
                <div className="modal-dialog relative w-auto">
                    <div className="modal-content shadow-lg relative flex flex-col w-full bg-slate-200 bg-clip-padding rounded-md outline-none text-current">
                        <div
                            className="modal-header flex items-center justify-between p-4 rounded-t-md">
                            <h5 className="text-xl font-medium leading-normal text-gray-800 text-center ml-auto mr-auto" >
                                Désirez-vous supprimer cet achat ?
                            </h5>

                        </div>
                        <div className="relative p-4">
                            <div className="flex flex-shrink-0 flex-wrap items-center p-4 justify-around rounded-b-md">
                                <button
                                    onClick={() => { setShowModal(false); }}
                                    className=" px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out"
                                >Non, revenir en arrière
                                </button>
                                <button onClick={() => { deletePurchases(); }} className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Oui, je confirme</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default DeletingPurchases;