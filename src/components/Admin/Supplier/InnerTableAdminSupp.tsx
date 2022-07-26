import React, { useState } from "react";
import { ISupplier } from "../../../interface/interface_admin";


interface Props {
    suppliers: ISupplier[],
    setSupplier: (supplier: string) => void,
    setShowModal: (showModal: boolean) => void,
    multiSelect: boolean
}


const AdminTopBar = ({ suppliers, setSupplier, setShowModal, multiSelect }: Props) => {

    const [suppliersList, setSuppliersList] = useState<string>("");

    return (
        <>
            <table className="w-full shadow-2xl mt-3 h-4/5">
                <thead className="bg-gray-800 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            ID
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Nom
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Devise
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Gl Achat
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Agent
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Status
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers && suppliers.map((purchase: ISupplier, index) =>
                        <tr className={`${index % 2 ? "bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>
                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.id}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.nom}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.devise}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.gl_achat}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.agent ? "Visible" : "Non visible"}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.inactif ? "Actif" : "Inactif"}</td>
                            <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                {multiSelect ? (
                                    <button

                                        className="bg-emerald-500 text-white active:bg-emerald-600 uppercase  py-1 px-2 text-xs rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => { setSuppliersList(suppliersList + purchase.nom + ","); }}
                                    >
                                        Ajouter
                                    </button>
                                ) : (
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 uppercase  py-1 px-2 text-xs rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => { setSupplier(purchase.nom); setShowModal(false) }}
                                    >
                                        Selectionner
                                    </button>)}

                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {multiSelect &&
                <div className="flex justify-between mt-5">
                    <button
                        className="bg-cyan-500 text-white active:bg-cyan-600 uppercase w-1/6 py-1 px-2 text-xs rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => { setSupplier("Tout"); setShowModal(false) }}
                    >
                        Ajouter tout
                    </button>
                    <span className="w-4/6">{suppliersList}</span>
                    <button
                        className="bg-blue-500 text-white active:bg-blue-600 uppercase w-2/6 py-1 px-2 text-xs rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => { setSupplier(suppliersList); setShowModal(false) }}
                    >
                        Confirmer selection
                    </button>

                </div>
            }
        </>
    );
}

export default AdminTopBar;