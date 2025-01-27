import React from "react";
import { ISupplier } from "../../../interface/interface_admin";
import { addAiport } from "../../../functions/admin/airport";

type Props = {
    fetchData: () => Promise<void>,
    setResponse: (response: string) => void
}

const AddAirport = ({ fetchData, setResponse }: Props) => {

    const handleBtn = async () => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());
            if ((await addAiport(values["label"])).affectedRows > 0) {
                setResponse("Aéroport ajouté !");
                fetchData();
                myForm.reset();
            } else {
                alert("Erreur");
            }
        }
    }


    return (
        <div className="">
            <h1 className="text-xl"> - Ajouter un aéeroport</h1>
            <form className="w-full  ml-auto mr-auto p-8 " id="myForm">
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Label</label>
                            <input type="text"
                                name="label"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Label" required />
                        </div>
                    </div>

                    <div className="w-1/6 md:w-2/5 mt-6">
                        <button type="button" onClick={() => handleBtn()} className="appearance-none block w-full bg-blue-600 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">Ajouter</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddAirport;