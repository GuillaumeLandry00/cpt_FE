import React, { useEffect, useState } from "react";
import { getSupplier, updateSupplier, validateSupplier } from "../../../functions/admin/supplier";
import { ISupplier } from "../../../interface/interface_admin";

type Props = {
    fetchData: () => Promise<void>,
    id: number,
    setResponse: (response: string) => void
}

const UpdateSupplier = ({ fetchData, id, setResponse }: Props) => {

    const fetchSupplier = async () => {
        setIsLoading(true)

        let dataS = await getSupplier(id) as ISupplier
        console.log(dataS);

        setReload(components(dataS));
        setIsLoading(false);

    }

    useEffect(() => {
        fetchSupplier()
    }, []);

    useEffect(() => {
        setReload("Reloading...")
        fetchSupplier()
        console.log("ComponentReloaded wiht id ", id);
    }, [id]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reload, setReload] = useState<any>();

    const handleBtn = async () => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());

            if (validateSupplier(values as ISupplier)) {
                if ((await updateSupplier(values as ISupplier, id)).affectedRows > 0) {
                    setResponse("Fournisseur modifié !");
                    fetchData();
                } else {
                    alert("Erreur");
                }
            }

        }
    }

    const components = (supplier: ISupplier) => {

        return (
            <>
                {isLoading || typeof supplier == "undefined" ? (
                    <div className="w-full mt-10" >
                        <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                        <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                    </div >
                ) : (
                    <div className="">
                        <h1 className="text-xl"> - Modifier un fournisseur</h1>
                        <form className="w-full  ml-auto mr-auto p-8 " id="myForm">
                            <div className="flex flex-wrap -mx-3 mb-2">

                                <div className="w-1/6 md:w-1/5 px-3 mb-3 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Type de Fournisseur
                                    </label>
                                    <div className="relative">
                                        <select name="type" defaultValue={supplier.type} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
                                            <option value={"admin"}>Administratif</option>
                                            <option value={"voyage"}>Voyage</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Code</label>
                                        <input type="text"
                                            name="code"
                                            defaultValue={supplier.code}
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Code" required />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nom</label>
                                        <input type="text"
                                            name="nom"
                                            defaultValue={supplier.nom}
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Nom" required />
                                    </div>
                                </div>

                                <div className="w-1/6 md:w-1/5 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Devise
                                    </label>
                                    <div className="relative">
                                        <select required name="devise" defaultValue={supplier.devise} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                            <option value={"CAD"}>CAD</option>
                                            <option value={"USD"} selected>USD</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Gl Achat</label>
                                        <input type="number"
                                            name="gl_achat"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="0"
                                            defaultValue={supplier.gl_achat}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Adresse</label>
                                        <input type="text"
                                            name="adresse"
                                            defaultValue={supplier.adresse}
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            placeholder="Adresse" required />
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Agent</label>
                                        <select name="agent" defaultValue={supplier.agent} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
                                            <option value={"1"}>Visible</option>
                                            <option value={"0"} selected>Non visible</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4 mt-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                    <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Status</label>
                                        <select name="inactif" defaultValue={supplier.inactif} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" required>
                                            <option value={"1"}>Actif</option>
                                            <option value={"0"} selected>Inactif</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-10 w-4 mt-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>
                                </div>


                                <div className="w-1/6 md:w-2/5 mt-6">
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

export default UpdateSupplier;