import React from "react";
import { ISupplier } from "../../../interface/interface_admin";
import { addAiport } from "../../../functions/admin/airport";
import { addProduct } from "../../../functions/admin/product";

type Props = {
    fetchData: () => Promise<void>,
    setResponse: (response: string) => void
}

const AddProduct = ({ fetchData, setResponse }: Props) => {

    const handleBtn = async () => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());
            if ((await addProduct(values["label"], values["taxe"], values["tps"], values["tvq"], values["rabais"], values["opc"])).affectedRows > 0) {
                setResponse("Produit ajouté !");
                fetchData();
                myForm.reset();
            } else {
                alert("Erreur");
            }
        }
    }


    return (
        <div className="">
            <h1 className="text-xl"> - Ajouter un produit</h1>
            <form className="w-full  ml-auto mr-auto p-8 " id="myForm">
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Label</label>
                            <input type="text"
                                name="label"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Label" required />
                        </div>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Taxes: </label>
                                <select name="taxe" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="1">Oui</option>
                                    <option value="0">Non</option>
                                </select>
                        </div>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TPS: </label>
                                <select name="tps" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="1">Oui</option>
                                    <option value="0">Non</option>
                                </select>
                        </div>
                    </div>

                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">TVQ: </label>
                                <select name="tvq" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="1">Oui</option>
                                    <option value="0">Non</option>
                                </select>
                        </div>
                    </div>

                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Rabais: </label>
                                <select name="rabais" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="1">Oui</option>
                                    <option value="0">Non</option>
                                </select>
                        </div>
                    </div>

                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">OPC: </label>
                                <select name="opc" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                    <option value="1">Oui</option>
                                    <option value="0">Non</option>
                                </select>
                        </div>
                    </div>

                    <div className="md:w-1/6 mt-6">
                        <button type="button" onClick={() => handleBtn()} className="appearance-none block w-full bg-blue-600 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">Ajouter</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddProduct;