import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getPurchasingIssues } from "../../../functions/accounting/purchasingIssues";
import { IPurchases, IPurchasingIssues } from "../../../interface/interface_accounting";
import AddPurchases from "./AddPurchasing";
import UpdatePurchases from "./UpdatePurchasing";
import DeletingPurchases from "./DeletingPurchasing";

interface Props {
    switchViews: (views: string, id?: string) => void,
}


const PurchasesList = ({ switchViews }: Props) => {

    const fetchPurchases = async (): Promise<void> => {
        setIsLoading(true);
        setPurchases(await getPurchasingIssues() as IPurchasingIssues[]);
        console.log(await getPurchasingIssues() as IPurchasingIssues[]);

        setIsLoading(false);
    }

    useEffect(() => {
        fetchPurchases();
    }, [])



    const [purchases, setPurchases] = useState<IPurchasingIssues[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [subViews, setSubViews] = useState<any>();
    const [response, setResponse] = useState<string>("");

    return (
        <div className="w-full">
            <div className="w-full flex justify-between border-b-2">
                <h1 className="text-2xl  ">ACHATS ÉMIS {response && (<span className="text-green-500 text-xl">{response && response}</span>)}</h1>
                {showModal ? (<button onClick={() => { setShowModal(false); setResponse("") }}><AiOutlineCloseCircle size={22} /></button>) : (<button onClick={() => { setShowModal(true); setSubViews(<AddPurchases setResponse={setResponse} fetchPurchases={fetchPurchases} />) }} className="w-1/12 ml-auto bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white  px-4 border border-green-500 hover:border-transparent rounded mb-2">Ajouter un achat</button>)}
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
                                    Chèque
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Succ
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Banque
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Date
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Fournisseur
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Payer à
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    État
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Type
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Montant
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Date déposé
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchases && purchases.map((purchase: IPurchasingIssues, index) =>
                                <tr className={`${index % 2 ? " bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>
                                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.cheque}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.succ}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.banque}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.date.substring(0, 10)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.fournisseur}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.payer_a}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.etat}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.type}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{String(purchase.montant).replace(/(.)(?=(\d{3})+$)/g, '$1 ')}$</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.date_echeance.substring(0, 10)}</td>
                                    <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                        <button onClick={() => { setShowModal(true); setSubViews("empty"); setSubViews(<UpdatePurchases setResponse={setResponse} fetchPurchases={fetchPurchases} id={purchase.id} />) }}>
                                            <FcEditImage size={22} className="ml-3" />
                                        </button>
                                        <button onClick={() => { setShowModal(true); setSubViews(<DeletingPurchases setResponse={setResponse} setShowModal={setShowModal} fetchPurchases={fetchPurchases} id={purchase.id} />); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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

export default PurchasesList;