import React, { useEffect, useState } from "react";
import { addPurchases, getPurchase, updatePurchases } from "../../../functions/accounting/purchase";
import { IPurchases } from "../../../interface/interface_accounting";

type Props = {
    fetchPurchases: () => Promise<void>,
    id: number,
    setResponse: (response: string) => void
}

const UpdatePurchases = ({ fetchPurchases, id, setResponse }: Props) => {

    const fetchPurchase = async () => {
        setIsLoading(true)

        let dataS = await getPurchase(id) as IPurchases
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

            if ((await updatePurchases(values as IPurchases, id)).affectedRows > 0) {
                setResponse("Achat modifié !");
                fetchPurchases();
            } else {
                alert("Erreur");
            }
        }
    }

    const components = (purchase: IPurchases) => {
        console.log("My pruchase" + purchase);

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
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Fournisseur</label>
                                        <input type="text"
                                            name="fournisseur"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Fournisseur" defaultValue={purchase?.fournisseur} />

                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description</label>
                                        <input type="text"
                                            name="description"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Description" defaultValue={purchase?.description} />

                                    </div>
                                </div>

                                <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Succ
                                    </label>
                                    <div className="relative">
                                        <select name="succ" defaultValue={purchase?.succ} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value={"003"}>Msh</option>
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
                                        <select name="devise" defaultValue={purchase?.devise} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
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
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date</label>
                                        <input type="date"
                                            name="date"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            defaultValue={purchase?.date.substring(0, 10)}
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Facture</label>
                                        <input type="text"
                                            name="facture"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Facture" defaultValue={purchase?.facture} />

                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date due</label>
                                        <input type="date"
                                            name="date_due"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            defaultValue={purchase?.date_due.substring(0, 10)}
                                        />
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
                                            defaultValue={String(purchase?.solde).replace(/\s/g, '')}
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