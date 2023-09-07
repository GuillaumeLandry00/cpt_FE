import React, { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { validateClient, addClient, getClient, updateClient, buildClientArray, calcAddedClients } from "../../functions/agent/clients";
import NavBar from "../Dashboard/NavBar";
import { log } from "console";

type props = {
    idDefault: number
}

const FormClient = ({ idDefault }: props) => {

    const [name, setName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [gender, setGender] = useState<string>("M");
    const [birthdate, setBirthDate] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [zip, setZip] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [language, setLanguage] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [file, setFile] = useState<any>();
    const [errors, setErrors] = useState<string[]>([]);
    const [confirmation, setConfirmation] = useState<[{ affectedRows: number }] | null>(null);
    const [id, setId] = useState<any>();
    const [linkFile, setLinkFile] = useState<string>("");
    const url = new URL(window.location.href);

    //Var for adding/removing passanger
    const [compteur, setCompteur] = useState<number>(1);
    const [passengerDiv, setPassengerDiv] = useState<Array<any>>([]);
    let affectedClients: number = 0;

    /**
     * This function help get all client info
     */
    const request = async () => {
        let client: any = null;


        if (idDefault == 0) {
            client = await getClient(url.searchParams.get("id") as string);
        } else {

            client = await getClient(idDefault);
        }

        //we update the form
        setGender(client[0].gender)
        setAddress(client[0].Adresse);
        setEmail(client[0].Courriel);
        setLanguage(client[0].Langue);
        setBirthDate(client[0].Naissance.substr(0, 10));
        setName(client[0].Nom);
        setLastName(client[0].Prenom);
        setProvince(client[0].Province);
        setPhone(client[0].Telephone1);
        setCity(client[0].Ville);
        setZip(client[0].Zip);
        setGender(client[0].gender);
        setNote(client[0].note);
        setLinkFile(client[0].Passeport)
    }

    //this is how we know if we update the client or add a new one
    useEffect(() => {

        if (url.searchParams.get("action") == "edit" || idDefault !== 0) {
            setId(url.searchParams.get("id"));
            //We search all the client info 
            if (url.searchParams.get("id") || idDefault !== 0) {
                request();
            }
        }

    }, [])

    const handleSubmit = async () => {
        let checkClient: string[] = validateClient({ nom: name, prenom: lastName, naissance: birthdate, ville: city, adresse: address, zip: zip, phone1: phone, courriel: email });
        if (checkClient.length > 0) {
            setErrors(checkClient);
        } else {
            let clientDb;
            let changes: boolean = false;

            //Ok no error, we send the request
            if (id || idDefault) {
                //we update
                clientDb = await updateClient({ nom: name, prenom: lastName, genre: gender, naissance: birthdate, pays: country, ville: city, adresse: address, province: province, zip: zip, phone1: phone, courriel: email, langue: language, note: note, file: file, id: idDefault ? idDefault : id, })
                if (clientDb.affectedRows > 0) changes = true;
            } else {
                //We get all the form data
                var myForm = document.getElementById('myForm') as HTMLFormElement;
                const formData: FormData = new FormData(myForm);
                const values = Object.fromEntries(formData.entries());

                //we build the array 
                let clients_array = buildClientArray(values);
                clientDb = await addClient({ nom: name, prenom: lastName, genre: gender, naissance: birthdate, pays: country, ville: city, adresse: address, province: province, zip: zip, phone1: phone, courriel: email, langue: language, note: note, file: file, }, clients_array)

                //We calculate the number of client added.
                affectedClients = calcAddedClients(clientDb);
                console.log(affectedClients);

                if (affectedClients > 0) changes = true;
            }

            //We confirm the changes
            if (changes) {
                setConfirmation(clientDb);
                let myForm = document.getElementById("myForm") as HTMLFormElement;
                if (url.searchParams.get("action") !== "edit") myForm.reset();
                if (clientDb !== "") setErrors([]);
            } else {
                alert("Erreur");
            }
        }
    }


    //This will handle click for adding/removing passanger
    //This handle our click by removing/adding inputs
    const handleClick = (action: string): void => {
        if (action === "add") {
            if (compteur < 12) {
                setCompteur(compteur + 1);
                setPassengerDiv([...passengerDiv, divPassanger(compteur)]);
            }
        } else {
            if (compteur > 1) {

                setCompteur(compteur - 1);
                let newArray: Array<any> = passengerDiv;
                newArray.pop();
                setPassengerDiv([...newArray]);
            }
        }
    }

    /**
     * Component for generating the form for extra passangers
     */
    const divPassanger = (id: number) => {
        return (
            <div key={id}>
                <h4>Client # {id + 1}</h4>
                <div className="flex flex-wrap -mx-3 mt-2" key={id}>
                    <div className="w-1/6 md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Genre
                        </label>
                        <div className="relative">
                            <select name={`${id}_genre`} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option value={"M"} selected>M</option>
                                <option value={"Mrs"}>Mrs</option>
                                <option value={"Mme"}>Mme</option>
                                <option value={"Miss"}>Miss</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Nom
                        </label>
                        <input name={`${id}_nom`} className="appearance-none block w-full bg-gray-200 text-gray-700 borde rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Nom" />
                    </div>
                    <div className="w-full md:w-1/6 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Prénom
                        </label>
                        <input name={`${id}_prenom`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Prénom" />
                    </div>
                    <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date de naissance</label>
                            <input name={`${id}_naissance`} type="date" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder="Select a date" data-mdb-toggle="datepicker" />
                        </div>
                    </div>
                    <div className="w-full md:w-1/6 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Téléphone
                        </label>
                        <input name={`${id}_phone1`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Téléphone" />
                    </div>
                    <div className="w-full md:w-1/6 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Courriel
                        </label>
                        <input name={`${id}_courriel`} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Courriel" />
                    </div>

                </div>
            </div>
        );
    }



    //Final component to render
    return (
        <>
            <form className="w-full max-w-screen-lg ml-auto mr-auto mt-10 shadow-2xl p-8" id="myForm">
                <h1 className="text-2xl border-b-2">Formulaire client {id ? "Modification" : "Ajout"}{confirmation !== null && <strong className="text-xl text-green-500">   Client {id || idDefault !== 0 ? "Modifié" : `ajouté (${confirmation[0].affectedRows})`}</strong>}</h1>
                <div className="flex flex-wrap -mx-3 mb-6 mt-5">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Nom
                        </label>
                        <input value={name} onChange={(e) => setName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Nom" />
                        {errors.indexOf("client_name") > -1 && (<p className="text-red-500 text-xs italic">Veuillez entrer un nom valide</p>)}

                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Prénom
                        </label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Prénom" />
                        {errors.indexOf("client_lastname") > -1 && (<p className="text-red-500 text-xs italic">Veuillez entrer un prénom valide</p>)}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    {/* Gender */}
                    <div className="w-1/3 md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Genre
                        </label>
                        <div className="relative">
                            <select onChange={(e) => setGender(e.target.value)} value={gender} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                <option value={"M"} >M</option>
                                <option value={"Mrs"}>Mrs</option>
                                <option value={"Mme"}>Mme</option>
                                <option value={"Miss"}>Miss</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Date de naissance</label>
                            <input type="date"
                                value={birthdate} onChange={(e) => setBirthDate(e.target.value)}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Select a date" data-mdb-toggle="datepicker" />
                            {errors.indexOf("birthdate") > -1 && (<p className="text-red-500 text-xs italic">Veuillez entrer une date</p>)}
                        </div>
                    </div>

                    {/* Phone number */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <div className="datepicker relative form-floating mb-3" data-mdb-toggle-button="false">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Numéro de téléphone</label>
                            <input type="text"
                                value={phone} onChange={(e) => setPhone(e.target.value)}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Numéro de téléphone" />
                            {errors.indexOf("telephone") > -1 && (<p className="text-red-500 text-xs italic">Veuillez entrer un téléphone valide</p>)}
                        </div>
                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Adresse
                        </label>
                        <input value={address} onChange={(e) => setAddress(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Adresse" />
                        {errors.indexOf("address") > -1 && (<p className="text-red-500 text-xs italic">Veuillez entrer une adresse valide</p>)}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">

                    {/* Pays */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Pays
                        </label>
                        <div className="relative">
                            <select onChange={(e) => setCountry(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                {/* <option value={"État-unis"}>État-unis</option> */}
                                <option selected value={"Canada"}>Canada</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Province */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Province
                        </label>
                        <div className="relative">
                            <select onChange={(e) => setProvince(e.target.value)} value={province} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                <option>Alberta</option>
                                <option selected>Québec</option>
                                <option>Québec région métropolitaine de la ville de Québec</option>
                                <option>Ontario</option>
                                <option>Colombie britanique</option>
                                <option>Saskatchewan</option>
                                <option>Nouveau-brunswick</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* City */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Ville
                        </label>
                        <input value={city} onChange={(e) => setCity(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ville" />
                        {errors.indexOf("client_name") > -1 && (<p className="text-red-500 text-xs italic">Veuillez entrer une ville valide</p>)}

                    </div>


                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    {/* Zip code */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Code postale
                        </label>
                        <input value={zip} onChange={(e) => setZip(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="A0A 0A0" />
                        {errors.indexOf("zip_code") > -1 && (<p className="text-red-500 text-xs italic">Veuillez entrer un code postal valide</p>)}
                    </div>

                    {/* Courriel */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Courriel
                        </label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="email" placeholder="Courriel" />
                        {errors.indexOf("email") > -1 && (<p className="text-red-500 text-xs italic">Veuillez entrer un courriel valide</p>)}
                    </div>

                    {/* Langue */}
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Langue
                        </label>
                        <div className="relative">
                            <select onChange={(e) => setLanguage(e.target.value)} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                                <option value={"Français"} selected>Français</option>
                                <option value={"Anglais"}>Anglais</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Autres informations</label>
                        <textarea onChange={(e) => setNote(e.target.value)} value={note} name="notes" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm"></textarea>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold">Téléverser le passeport </label>
                        <small className="tracking-wide text-blue-600 text-xs font-bold mb-4">Veuillez bien le renommer avant</small>

                        <input onChange={(e) => setFile(e.target.files![0])} type="file" accept="application/pdf" required className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                        {(linkFile !== "No passport" && linkFile !== "") && (<p className="text-orange-400">**Attention Vous avez déjà ajouté un passeport, modifier le passeport va supprimer l'ancien</p>)}
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-3">
                        <label className="tracking-wide text-gray-700 text-sm font-bold  mb-3">Veuillez valider toutes les informations</label>
                        <button onClick={() => handleSubmit()} type="button" className=" mt-4 appearance-none block w-full bg-blue-600 text-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">{id || idDefault !== 0 ? "Modifier" : "Ajouter"}</button>
                    </div>
                </div>
                {(url.searchParams.get("action") !== "edit" && idDefault == 0) && (<>
                    {passengerDiv.map((div) => div)}
                    <small className="text-sm text-orange-400 mb-2">** Vous pouvez ajouter plusieurs clients à la même adresse</small>
                    <div className="mt-2">
                        <button onClick={() => handleClick("remove")}><AiOutlineMinusCircle size={28} color={"red"} /></button>
                        <button className="ml-2" onClick={() => handleClick("add")}><AiOutlinePlusCircle size={28} color={"green"} /></button>

                    </div>
                </>)}
            </form>
        </>
    );
}

export default FormClient;