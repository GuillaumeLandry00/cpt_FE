import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ITaxes } from "../../../interface/interface_accounting";
import AddTaxes from "./AddTaxes";
import UpdateTaxes from "./UpdateTaxes";
import DeletingTaxes from "./DeletingTaxes";
import { getTaxes } from "../../../functions/accounting/taxes";

interface Props {
    switchViews: (views: string, id?: string) => void,
}

const TaxesList = ({ switchViews }: Props) => {

    const fetchPurchases = async (): Promise<void> => {
        setIsLoading(true);
        setFunds(await getTaxes() as ITaxes[]);
        console.log("My list ", await getTaxes() as ITaxes[]);

        setIsLoading(false);
    }

    useEffect(() => {
        fetchPurchases();
    }, [])



    const [funds, setFunds] = useState<ITaxes[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [subViews, setSubViews] = useState<any>();
    const [response, setResponse] = useState<string>("");

    return (
        <div className="w-full">
            <div className="w-full flex justify-between border-b-2">
                <h1 className="text-2xl  ">Taxes {response && (<span className="text-green-500 text-xl">{response && response}</span>)}</h1>
                {showModal ? (<button onClick={() => { setShowModal(false); setResponse("") }}><AiOutlineCloseCircle size={22} /></button>) : (<button onClick={() => { setShowModal(true); setSubViews(<AddTaxes setResponse={setResponse} fetchPurchases={fetchPurchases} />) }} className="w-1/12 ml-auto bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white  px-4 border border-green-500 hover:border-transparent rounded mb-2">Ajouter un fond d'indemnisation</button>)}
            </div>

            {isLoading ? (
                <div className="w-full mt-10">
                    <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                    <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                </div>
            ) : (
                <div>
                    {showModal && (
                        <div>
                            {subViews}
                        </div>)}
                    <table className="w-full h-full shadow-2xl mt-8">
                        <thead className="bg-gray-800 border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Date - Du
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Date - Au
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Date - Paiement
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Type
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Chéque
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Écriture
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Montant
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {funds && funds.map((fund: ITaxes, index) =>
                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{fund.date_du ? fund.date_du.substring(0, 10) : "-------------------"}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.date_au.substring(0, 10)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.date_paiement.substring(0, 10)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.type}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.cheque}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.ecriture ? fund.ecriture : "-------------------"}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.montant.toLocaleString()}</td>
                                    <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                        <button onClick={() => { setShowModal(true); setSubViews("empty"); setSubViews(<UpdateTaxes setResponse={setResponse} fetchPurchases={fetchPurchases} id={fund.id} />) }}>
                                            <FcEditImage size={22} className="ml-3" />
                                        </button>
                                        <button onClick={() => { setShowModal(true); setSubViews(<DeletingTaxes setResponse={setResponse} setShowModal={setShowModal} fetchPurchases={fetchPurchases} id={fund.id} />); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                            <MdOutlineDeleteForever size={22} color="#fa1e3c" className="ml-3" />
                                        </button>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

        </div >
    );
}

export default TaxesList;