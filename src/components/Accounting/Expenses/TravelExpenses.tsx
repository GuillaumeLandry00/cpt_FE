import React, { useState } from "react";
import { SUCC } from "../../../constants/select_constants";
import { generateExpenses } from "../../../functions/accounting/purchase";
import { validatePurchase } from "../../../functions/accounting/purchasingIssues";
import { Utility } from "../../../functions/util/Utility";
import { IExpensesForm, IGeneral, Iitinerary, IOpc, IPaiements, IProducts, IPurchases, IReceiptDB } from "../../../interface/interface_accounting";
import Loading from "../../Others/Loading";
import ModalAdminPurchase from "../others/ModalSuppliers";
import { GrDocumentPdf } from 'react-icons/gr';
import { BASE_URL, SITE_URL } from "../../../constants/constantes";
import ModalSuppliers from "../others/ModalSuppliers";
import { capitalizeString } from "../../../functions/agent/clients";
import { FcEditImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import ModalExpenses from "./ModalExpenses";
import { MdOutlineAttachMoney } from "react-icons/md";

const TravelExpenses = () => {

    const [suppliers, setSuppliers] = useState<string>("Tout");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>("supplier");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<string>("Veuillez appuyer sur générer");
    const [products, setProducts] = useState<IProducts[]>([]);
    const [opc, setOpc] = useState<IOpc | null>(null);

    const [data, setData] = useState<IReceiptDB[]>([]);




    const handleBtn = async (pdf = false) => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());
            if (validatePurchase(values as IPurchases)) {
                if (pdf) {
                    let path = await generateExpenses(values as IExpensesForm, true, true);

                    window.location.assign(BASE_URL + `accounting/expenses/pdf/${path}`);

                } else {
                    const api_request: IReceiptDB[] = await generateExpenses(values as IExpensesForm, false, true);
                    if (api_request.length > 0) {
                        //Now we list...
                        setData(api_request)


                    } else {
                        setResponse("Aucun résultat trouvé");
                    }
                }
            }
        }
    }

    return (
        <div className="">
            <h1 className="text-2xl border-b-2">Déboursés Voyages</h1>
            {showModal ? (modalType == "supplier" ? <ModalSuppliers type="voyage" setSupplier={setSuppliers} setShowModal={setShowModal} multiSelect={true} /> : <ModalExpenses setShowModal={setShowModal} products={products} opc={opc} />) : ""}

            <form className="w-full  ml-auto mr-auto mt-10 p-8 " id="myForm">
                <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="w-1/6 md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Succursales
                        </label>
                        <div className="relative">
                            <select name="succ" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                <option value="Tout">Tout</option>
                                {SUCC.map((item, index) =>
                                    <option key={index} value={item.code}>{item.nom}</option>
                                )}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">En date du</label>
                            <input type="date"
                                name="date_du"
                                defaultValue={Utility.getCurrentDate()}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-2/6 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Fournisseur</label>
                            <input type="text"
                                name="suppliers"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                required
                                readOnly
                                value={suppliers}
                                onClick={() => { setModalType("supplier"); setShowModal(true) }}
                            />
                        </div>
                    </div>

                    <div className="w-1/6 md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Devise
                        </label>
                        <div className="relative">
                            <select name="currency" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                <option value="CAD">Cad</option>
                                <option value="USD">Usd</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/6 mt-6">
                        <button type="button" onClick={() => handleBtn()} className="appearance-none block w-full bg-blue-600 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">Générer</button>
                    </div>
                </div>
            </form>
            {isLoading ? (<Loading />) :
                (
                    <>
                        {data.length > 0 ? (
                            <>

                                <table className=" h-full block  mt-2 overflow-x-auto min-w-min	mr-auto ml-auto">
                                    <thead className="bg-gray-800 border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Action
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Fournisseur
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Référence
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Facture
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Net
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Montant payé
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                À payer
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Paiement
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Fonds
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Date due
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Départ
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Date facture
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Produit
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Comm
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                TPS
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                TVQ
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Comm %
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Dossier
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Nom du passager
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((purchase: IReceiptDB, index) => {

                                            let general: IGeneral = JSON.parse(purchase.general);
                                            let paiments: IPaiements = JSON.parse(purchase.paiements); let opc: IOpc = JSON.parse(purchase.remarks);
                                            let products: IProducts[] = JSON.parse(purchase.products);
                                            let itinerary: Iitinerary[] = JSON.parse(purchase.itinerary);
                                            // if (index == 0) {
                                            //     console.log(general);
                                            //     console.log(paiments);
                                            //     console.log(products);
                                            //     console.log(itinerary);
                                            // }

                                            if (itinerary[0] && itinerary[0].cie) {


                                                return (
                                                    <tr className={`${index % 2 ? " bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>
                                                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 flex flex-row">

                                                            <a href={`${SITE_URL}dashboard/facturation/form/?action=edit&id=${purchase.id}`}>
                                                                <FcEditImage size={22} className="ml-4" />
                                                            </a>
                                                            <button onClick={() => { setProducts(products); setOpc(opc); setModalType("expense"); setShowModal(true) }}>
                                                                <MdOutlineAttachMoney size={22} className="ml-4" />
                                                            </button>

                                                        </td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{itinerary[0].cie}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">Ref</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.dossier}-1</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{opc.grand_total ? opc.grand_total : products[0].total}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-emerald-600">{general.tot_paiement ? general.tot_paiement : general.total_paiements}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-red-600">{general.balance}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-blue-800">0.00</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{Utility.roundNumber(parseFloat(general.tot_paiement ? general.tot_paiement : general.total_paiements) - (opc.grand_total ? opc.grand_total : products[0].total))}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{general.general_date}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{itinerary[0].date_depart}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.date.substring(0, 10)}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{opc.opc_remarque1 ? opc.opc_remarque1 : products[0].type_produit}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{Utility.roundNumber((opc.grand_total * (purchase.comm / 100)))}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{products[0].produit_tps}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{products[0].produit_tvq}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.comm}%</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.dossier}</td>
                                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.nom_passager}</td>
                                                    </tr>)
                                            }
                                        }


                                        )}
                                    </tbody>
                                </table>
                                <div className="mt-2 ">
                                    <button className="flex-row" onClick={() => { handleBtn(true) }}><GrDocumentPdf size={32} /></button>
                                </div>
                            </>) : (<p className="text-xl text-center font-bold">{response}</p>)}
                    </>
                )}

        </div>
    );
}

export default TravelExpenses;