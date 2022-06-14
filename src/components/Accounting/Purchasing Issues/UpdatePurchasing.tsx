import React, { useEffect, useState } from "react";
import { updatePurchasingIssues, getPurchasingIssue, validatePurchase } from "../../../functions/accounting/purchasingIssues";
import { IPurchases, IPurchasingIssues } from "../../../interface/interface_accounting";

type Props = {
    fetchPurchases: () => Promise<void>,
    id: number,
    setResponse: (response: string) => void
}

const UpdatePurchases = ({ fetchPurchases, id, setResponse }: Props) => {

    const fetchPurchase = async () => {
        setIsLoading(true)

        let dataS = await getPurchasingIssue(id) as IPurchasingIssues
        console.log(dataS);

        setReload(components(dataS));
        setIsLoading(false);

    }

    useEffect(() => {
        fetchPurchase()
    }, []);

    useEffect(() => {
        setReload("Reloading...")
        fetchPurchase()
        console.log("ComponentReloaded wiht id ", id);
    }, [id]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<any>();

    const handleBtn = async () => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());

            if (validatePurchase(values as IPurchasingIssues)) {
                if ((await updatePurchasingIssues(values as IPurchasingIssues, id)).affectedRows > 0) {
                    setResponse("Achat modifié !");
                    fetchPurchases();
                } else {
                    alert("Erreur");
                }
            }

        }
    }

    const components = (purchase: IPurchasingIssues) => {
        console.log("My pruchase " + purchase);

        return (
            <>
                {isLoading || typeof purchase == "undefined" ? (
                    <div className="w-full mt-10" >
                        <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                        <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                    </div >
                ) : (
                    <div className="">
                        <h1 className="text-xl"> - Modifier un achat</h1>
                        <form className="w-full  ml-auto mr-auto mt-10 p-8 " id="myForm">
                            <div className="flex flex-wrap -mx-3 mb-2">

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Chèque</label>
                                        <input type="text"
                                            name="cheque"
                                            required
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Chèque" defaultValue={purchase?.cheque} />

                                    </div>
                                </div>

                                <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Banque
                                    </label>
                                    <div className="relative">
                                        <select required name="banque" defaultValue={purchase?.banque} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value={"008"}>TD</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>

                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Fournisseur</label>
                                        <input type="text"
                                            name="fournisseur"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Description" defaultValue={purchase?.fournisseur} required />

                                    </div>
                                </div>

                                <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Succ
                                    </label>
                                    <div className="relative">
                                        <select required name="succ" defaultValue={purchase?.succ} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value={"003"}>Msh</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>

                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date</label>
                                        <input type="date"
                                            name="date"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            defaultValue={purchase?.date.substring(0, 10)} required
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Payer à</label>
                                        <input type="text"
                                            name="payer_a"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Facture" defaultValue={purchase?.payer_a} required />

                                    </div>
                                </div>


                                <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        État
                                    </label>
                                    <div className="relative">
                                        <select required name="etat" defaultValue={purchase?.etat} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value={"En circulation"}>En circulation</option>
                                            <option value={"Déposé"}>Déposé</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>




                                <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Type
                                    </label>
                                    <div className="relative">
                                        <select required name="type" defaultValue={purchase?.etat} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value={"Administratif"}>Administratif</option>
                                            <option value={"Voyage"}>Voyage</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Montant</label>
                                        <input type="number"
                                            name="montant"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="0"
                                            defaultValue={String(purchase?.montant).replace(/\s/g, '')}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date Écheance</label>
                                        <input type="date"
                                            name="date_echeance"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            defaultValue={purchase?.date_echeance.substring(0, 10)}
                                            required
                                        />
                                    </div>
                                </div>



                                <div className="w-1/6 md:w-1/5 mt-6">
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