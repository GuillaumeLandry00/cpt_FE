import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getPurchasingIssues } from "../../../functions/accounting/purchasingIssues";
import { ICompensation, IPurchases, IPurchasingIssues } from "../../../interface/interface_accounting";
import AddCompensation from "./AddCompensationFund";
import UpdateCompensation from "./UpdateCompensationFund";
import DeletingCompensation from "./DeletingCompensationFund";
import { getCompensationFunds } from "../../../functions/accounting/compensationFunds";
import SearchBar from "../../Others/SearchBar";
import BottomBarList from "../../Others/BottomBarList";

interface Props {
    switchViews: (views: string, id?: string) => void,
}

const PurchasesList = ({ switchViews }: Props) => {

    const fetchPurchases = async (position = 25, offset = 0): Promise<void> => {
        setIsLoading(true);
        setFunds(await getCompensationFunds(search, position, offset) as ICompensation[]);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchPurchases();
    }, [])



    const [funds, setFunds] = useState<ICompensation[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [subViews, setSubViews] = useState<any>();
    const [response, setResponse] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [offset, setOffset] = useState<number>(0);

    return (
        <div className="w-full">
            <div className="w-full flex justify-between border-b-2">
                <h1 className="text-2xl  ">Fonds d'indemnisation {response && (<span className="text-green-500 text-xl">{response && response}</span>)}</h1>
                {showModal ? (<button onClick={() => { setShowModal(false); setResponse("") }}><AiOutlineCloseCircle size={22} /></button>) : (<button onClick={() => { setShowModal(true); setSubViews(<AddCompensation setResponse={setResponse} fetchPurchases={fetchPurchases} />) }} className="w-1/12 ml-auto bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white  px-4 border border-green-500 hover:border-transparent rounded mb-2">Ajouter un fond d'indemnisation</button>)}
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
                    <SearchBar search={search} setSearch={setSearch} fetch={fetchPurchases} />
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
                                    Succursales
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Devise
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Ventes
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    OPC
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Frais
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Solde
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {funds && funds.map((fund: ICompensation, index) =>
                                <tr className={`${index % 2 ? " bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>
                                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{fund.date_du.substring(0, 10)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.date_au.substring(0, 10)}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.succ}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.devise}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.ventes.toLocaleString()}$</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.opc.toLocaleString()}$</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.frais.toLocaleString()}$</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{fund.solde.toLocaleString()}$</td>
                                    <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                        <button onClick={() => { setShowModal(true); setSubViews("empty"); setSubViews(<UpdateCompensation setResponse={setResponse} fetchPurchases={fetchPurchases} id={fund.id} />) }}>
                                            <FcEditImage size={22} className="ml-3" />
                                        </button>
                                        <button onClick={() => { setShowModal(true); setSubViews(<DeletingCompensation setResponse={setResponse} setShowModal={setShowModal} fetchPurchases={fetchPurchases} id={fund.id} />); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                            <MdOutlineDeleteForever size={22} color="#fa1e3c" className="ml-3" />
                                        </button>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <BottomBarList getData={fetchPurchases} offset={offset} setOffset={setOffset} setIsLoading={setIsLoading} data={funds} />
                </div>
            )}

        </div >
    );
}

export default PurchasesList;