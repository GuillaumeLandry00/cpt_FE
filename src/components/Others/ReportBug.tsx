import React, {useState} from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; // Typescript
import { IUtilisateur } from "../../interface/interfaces";
import axios from "axios";
import { BASE_URL } from "../../constants/constantes";

const ReportBug = () =>{

    const [subject, setSubject] = useState<string>("Section client")
    const [value, setValue] = useState<string>("")

    const handleBtn = async () => {
        let responseText = document.getElementById("responseText")

        //We check if the email is empty
        if(value == ""){   
            if(responseText) responseText.innerHTML = "<span style='color: red; font-size: 18px; font-weight: bold'>Vous devez entrer un message</span>"
            return
        }

        //We send the email
        const params = new URLSearchParams()
        params.append("subject",subject)
        params.append("msg", value)
        
        //We build the footer
        let utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)        
        params.append("footer", `<br> Nom: ${utilisateur.nomComplet}, Email: ${utilisateur.email}`)

        try {
            const response = await axios({
                method: "post",
                url: BASE_URL + "mail/",
                data: params,
                headers: { "x-access-token": localStorage.getItem('token') as string },
            });
            
            if(response.data.success){
                //We send a confirmation to the user
                if(responseText) responseText.innerHTML = "<span style='color: green; font-size: 18px; font-weight: bold'>Le bug a bien été signalé</span>"
                setValue("")
            }
        } catch (error) {
            console.log(error);
        }
    }
 
    return(
        <>
            <div className="w-4/5 ml-auto mr-auto">
                <h1 className="text-xl font-bold text-center mt-5">Signaler un bug</h1>
                <div id="responseText"></div>
                <label className="block uppercase tracking-wide text-gray-700 text-l font-bold">Bug trouvé dans la: </label>
                <select defaultValue="aucun" id="templateSelector" onChange={(e) => { setSubject(e.target.value) }} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                            <option value="client" >Section client</option>
                            <option value="facturation">Section Facturation</option>
                            <option value="autre">Autre (spécifier dans le courriel)</option>
                </select>
                <label className="block uppercase tracking-wide text-gray-700 text-l font-bold mt-5">Description du bug: </label>
                <div className="w-full min-h-55">
                    <ReactQuill theme="snow" value={(value)} onChange={setValue} placeholder="Veuillez écrire les détails du bug ici. (Comment il est arrivé ?, À quel endroit exactement ?, Après quelle manipulation ?) Veuillez fournir le plus de détails possibles."/>
                </div>
                <span className="text-orange-500 underline font-bold">Veuillez noter que votre nom sera signé automatiquement à la fin du courriel</span>
                <button onClick={() => { handleBtn() }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mt-8">Signaler le bug</button>
            </div>
        </>
    )
}

export default ReportBug