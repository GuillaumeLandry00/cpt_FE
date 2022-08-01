import React, { useState } from "react";
import { SUCC } from "../../../constants/select_constants";
import { generateExpenses } from "../../../functions/accounting/purchase";
import { validatePurchase } from "../../../functions/accounting/purchasingIssues";
import { Utility } from "../../../functions/util/Utility";
import { IExpensesForm, IPurchases } from "../../../interface/interface_accounting";
import Loading from "../../Others/Loading";
import ModalAdminPurchase from "../others/ModalSuppliers";
import { GrDocumentPdf } from 'react-icons/gr';
import { BASE_URL } from "../../../constants/constantes";
import ModalSuppliers from "../others/ModalSuppliers";

const AdminExpenses = () => {

    const [suppliers, setSuppliers] = useState<string>("Tout");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<string>("Veuillez appuyer sur générer");
    const [data, setData] = useState<IPurchases[]>([]);

    const handleBtn = async (pdf = false) => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());
            if (validatePurchase(values as IPurchases)) {
                if (pdf) {
                    let path = await generateExpenses(values as IExpensesForm, true);

                    window.location.assign(BASE_URL + `accounting/expenses/pdf/${path}`);

                } else {
                    const api_request: IPurchases[] = await generateExpenses(values as IExpensesForm);
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
            <h1 className="text-2xl  border-b-2">Déboursés admin</h1>
            {showModal && <ModalSuppliers type="admin" setSupplier={setSuppliers} setShowModal={setShowModal} multiSelect={true} />}

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
                                onClick={() => { setShowModal(true) }}
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

                                <table className="w-full h-full shadow-2xl mt-2">
                                    <thead className="bg-gray-800 border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Fournisseur
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
                                                Date
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Date due
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                                Description
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.map((purchase: IPurchases, index) =>

                                            <tr className={`${index % 2 ? " bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>

                                                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.id}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.fournisseur}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.facture}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.montant}</td>
                                                <td className="text-sm text-emerald-600 font-bold px-6 py-2 whitespace-nowrap">{Utility.calcToPay(String(purchase.montant), String(purchase.solde))}</td>
                                                <td className="text-sm text-red-500 font-bold px-6 py-2 whitespace-nowrap">{purchase.solde}</td>
                                                <td className="text-sm text-blue-600 font-bold px-6 py-2 whitespace-nowrap">0.00</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.date.substring(0, 10)}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.date_due.substring(0, 10)}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.description}</td>
                                            </tr>
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

export default AdminExpenses;