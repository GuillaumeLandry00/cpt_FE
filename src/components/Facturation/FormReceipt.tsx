import React, { useEffect, useState } from "react";
import Passagers from "./Passagers";
import Receipt from "./Receipt";
import Itinerary from "./Itinerary";
import TravelProducts from "./TravelProducts";
import OpcRemark from "./OpcRemark";
import PayementsSummary from "./PayementsSummary";
import GeneralSummary from "./GeneralSummary";
import Terms from "./Terms";
import { buildReceipt, getReceipt } from "../../functions/receipt";
import { IUtilisateur, IGenericObject } from "../../interface/interfaces";
import { Buffer } from "buffer";

const FormReceipt = () => {

    //We get the user from the localstorage
    const utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
    const url: URL = new URL(window.location.href);
    const [id, setId] = useState<string>();
    const [data, setData] = useState<IGenericObject>([]);
    const [opcAmount, setOpcAmount] = useState<number>(0);
    const [grandTotal, setGrandTotal] = useState<number>(0);
    const [response, setResponse] = useState<string>("");

    /**
    * This function help get all receipt info
    */
    const getData = async () => {
        const receipt = await getReceipt(url.searchParams.get("id") as string);

        //We decode the base 64 json
        let buff = Buffer.from(receipt[0].f_data, 'base64');
        let text = buff.toString('utf8');
        setData(JSON.parse(text));
    }

    //this is how we know if we update the client or add a new one
    useEffect(() => {
        if (url.searchParams.get("action")) {
            setId(url.searchParams.get("id") as string);
            //We search all the client info 
            if (url.searchParams.get("id")) {
                getData();
            }
        }

    }, [])

    const handleBtn = (): void => {
        var myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values = Object.fromEntries(formData.entries())
            if (url.searchParams.get("id") && url.searchParams.get("action") == "edit") {
                //we update
                const response = buildReceipt(values, utilisateur, "update", url.searchParams.get("id") as string);
                response.then((result) => {
                    if (result.affectedRows > 0) {
                        setResponse("La facture à été mise à jour")
                    }
                });
            } else {
                //we add a new one
                const response = buildReceipt(values, utilisateur, "add");
                response.then((result) => {
                    if (result.affectedRows > 0) {
                        //We reload the current page
                        setResponse("La facture a bien été ajoutée");

                        let form = document.getElementById("myForm") as HTMLFormElement;
                        form.reset();


                    }
                })
            }
        }
    }


    return (
        <>
            <form className="w-full max-w-screen-lg ml-auto mr-auto mt-10 mb-10 shadow-2xl p-8" id={"myForm"} onSubmit={(ev: any) => {
                ev.preventDefault();
            }}>

                {response && (<span className="text-green-500 font-bold">{response}</span>)}
                <fieldset disabled={url.searchParams.get("action") !== "view" ? false : true}>
                    <Receipt utilisateur={utilisateur} data={data.facturation} />
                    <Passagers data={data.passagers} />
                    <Itinerary data={data.itinerary} />
                    <TravelProducts data={data.product} setOpcAmount={setOpcAmount} setGrandTotal={setGrandTotal} />
                    <OpcRemark data={data.opc} opcAmount={opcAmount} grandTotal={grandTotal} />
                    <PayementsSummary data={data.summary} />
                    <GeneralSummary data={data.others} />
                    <Terms data={data.others} />
                </fieldset>
                {response && (<span className="text-green-500 font-bold">{response}</span>)}
                {(url.searchParams.get("action") !== "view") && (<button onClick={() => { handleBtn() }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mt-8">Enregistrer la facture</button>)}

            </form>
        </>
    );
}

export default FormReceipt;