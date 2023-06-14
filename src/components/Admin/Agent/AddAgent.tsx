import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { addAgentDB } from "../../../functions/admin/agent";

interface Props {
    switchViews: (views: string) => void,
}

type resultsAddAgent = {
    message: string,
    errors: string[],
    affectedRows: number
}

const AddAgent = ({ switchViews }: Props) => {

    let responseText: HTMLElement | null;

    const handleBtn = async () => {
        let myForm = document.getElementById('myForm') as HTMLFormElement;
        responseText = document.getElementById("responseText")

        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values: any = Object.fromEntries(formData.entries());
            let results: resultsAddAgent = await addAgentDB(values)

            if(results.errors){
                if(responseText) responseText.innerHTML =`<span style="color: red;">Veuillez corriger les erreurs suivantes: ${results.errors.join(", ")}</span>`
            }

            if(results.message){
                console.log("There is an error " , results.message, responseText);
                
                if(responseText) responseText.innerHTML = `<span style="color: red;">${results.message}</span>`
            }

            if (results.affectedRows > 0) {
                if(responseText) responseText.innerHTML =`<span style="color: green;">Agent ajouté</span>`
                myForm.reset();
            }
        }
    }


    return (
        <div className="w-full">
            <button className="mb-10" onClick={() => { switchViews("agents") }}>
                <BiArrowBack size={34} />
            </button>
            <h1 className="text-2xl border-b-2">Formulaire agent: <div id="responseText"></div></h1>
            <form className="w-full  ml-auto mr-auto mt-10 p-8 " id="myForm">
                <div className="flex flex-wrap -mx-3 mb-2">

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Courriel</label>
                            <input type="email"
                                name="email"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Courriel" />

                        </div>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Prénom</label>
                            <input type="text"
                                name="name"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Prénom" />

                        </div>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nom</label>
                            <input type="text"
                                name="last_name"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Nom" />

                        </div>
                    </div>

                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Nom d'artiste</label>
                            <input type="text"
                                name="artist_name"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Nom artiste" />

                        </div>
                    </div>

                    {/* Bottom section */}
                    <div className="w-1/6 md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Type Utilisateur
                        </label>
                        <div className="relative">
                            <select name="user_type" defaultValue={0} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                <option value={1}>Admin</option>
                                <option value={0}>Agent</option>
                                <option value={2}>Comptable</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Comm</label>
                            <input type="number"
                                name="comm"
                                defaultValue={0.00}
                                min={0.00}
                                max={100.00}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Comm" />

                        </div>
                    </div>
                    <div className="w-1/6 md:w-1/4 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Agence
                        </label>
                        <div className="relative">
                            <select name="agences" className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                <option value={"bsp cwt"}>BSP & CWT</option>
                                <option value={"cwt"}>CWT</option>
                                <option value={"bsp"}>BSP</option>

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>

                    </div>
                    <div className="w-1/6 md:w-1/4 mt-6">
                        <button type="button" onClick={() => handleBtn()} className="appearance-none block w-full bg-blue-600 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">Modifier</button>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default AddAgent;