import React, { useState } from "react";
import { SUCC } from "../../../constants/select_constants";
import { addCompensationFunds, validateCompensation } from "../../../functions/accounting/compensationFunds";
import { ICompensation } from "../../../interface/interface_accounting";

type Props = {
    fetchPurchases: () => Promise<void>,
    setResponse: (response: string) => void
}

const AddCompensationFunds = ({ fetchPurchases, setResponse }: Props) => {

    const handleBtn = async () => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());
            if (validateCompensation(values as ICompensation)) {
                if ((await addCompensationFunds(values as ICompensation)).affectedRows > 0) {
                    setResponse("Fonds ajouté !");
                    fetchPurchases();
                    myForm.reset();
                } else {
                    alert("Erreur");
                }
            }
        }
    }


    return (
        <div className="">
            <h1 className="text-xl"> - Ajouter un fond d'indemnisation</h1>
            <form className="w-full  ml-auto mr-auto mt-10 p-8 " id="myForm">
                <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date - AU</label>
                            <input type="date"
                                name="date_au"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date - DU</label>
                            <input type="date"
                                name="date_du"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Succ
                        </label>
                        <div className="relative">
                            <select required name="succ" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                {SUCC.map((item) =>
                                    <option value={item.code}>{item.nom}</option>
                                )}

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Devise
                        </label>
                        <div className="relative">
                            <select name="devise" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                <option value={"CAD"}>CAD</option>
                                <option value={"USD"}>USD</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Ventes</label>
                            <input type="number"
                                name="ventes"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder=""
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Opc</label>
                            <input type="number"
                                name="opc"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Frais</label>
                            <input type="number"
                                name="frais"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Solde</label>
                            <input type="number"
                                name="solde"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="0"
                                required
                            />
                        </div>
                    </div>

                    <div className="md:w-2/5 mt-6">
                        <button type="button" onClick={() => handleBtn()} className="appearance-none block w-full bg-blue-600 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">Ajouter</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddCompensationFunds;