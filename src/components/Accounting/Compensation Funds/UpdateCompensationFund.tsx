import React, { useEffect, useState } from "react";
import { SUCC } from "../../../constants/select_constants";
import { getCompensationFund, updateCompensationFundss, validateCompensation } from "../../../functions/accounting/compensationFunds";
import { ICompensation } from "../../../interface/interface_accounting";

type Props = {
    fetchPurchases: () => Promise<void>,
    id: number,
    setResponse: (response: string) => void
}

const UpdatePurchases = ({ fetchPurchases, id, setResponse }: Props) => {

    const fetchPurchase = async () => {
        setIsLoading(true)

        let dataS = await getCompensationFund(id) as ICompensation;

        setReload(components(dataS));
        setIsLoading(false);

    }

    useEffect(() => {
        fetchPurchase()
    }, []);

    useEffect(() => {
        fetchPurchase();
    }, [id]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<any>();

    const handleBtn = async () => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());

            if (validateCompensation(values as ICompensation)) {
                if ((await updateCompensationFundss(values as ICompensation, id)).affectedRows > 0) {
                    setResponse("Fond d'indemnisation modifié !");
                    fetchPurchases();
                } else {
                    alert("Erreur");
                }
            }

        }
    }

    const components = (compen: ICompensation) => {

        return (
            <>
                {isLoading || typeof compen == "undefined" ? (
                    <div className="w-full mt-10" >
                        <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                        <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                    </div >
                ) : (
                    <div className="">
                        <h1 className="text-xl"> - Modifier un fond d'indemnisation</h1>
                        <form className="w-full  ml-auto mr-auto mt-10 p-8 " id="myForm">
                            <div className="flex flex-wrap -mx-3 mb-2">

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date - AU</label>
                                        <input type="date"
                                            name="date_au"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            required
                                            defaultValue={compen.date_au.substring(0, 10)}
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
                                            defaultValue={compen.date_du.substring(0, 10)}
                                        />
                                    </div>
                                </div>

                                <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Succ
                                    </label>
                                    <div className="relative">
                                        <select defaultValue={compen.succ} required name="succ" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
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
                                    <div className="relative" >
                                        <select defaultValue={compen.devise} name="devise" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
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
                                            placeholder="0"
                                            required
                                            defaultValue={compen.ventes}
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
                                            defaultValue={compen.opc}
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
                                            defaultValue={compen.frais}
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
                                            defaultValue={compen.solde}
                                        />
                                    </div>
                                </div>

                                <div className="md:w-2/5 mt-6">
                                    <button type="button" onClick={() => handleBtn()} className="appearance-none block w-full bg-blue-600 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">Modifier</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}</>
        );
    }



    return (<>{reload}</>);
}

export default UpdatePurchases;