import React, { useEffect, useState } from "react";
import Passagers from "./Passagers";
import Receipt from "./Receipt";
import Itinerary from "./Itinerary";
import TravelProducts from "./TravelProducts";
import OpcRemark from "./OpcRemark";
import PayementsSummary from "./PayementsSummary";
import GeneralSummary from "./GeneralSummary";
import Terms from "./Terms";
import { buildReceipt, getReceipts } from "../../functions/receipt";
import { IUtilisateur, IGenericObject } from "../../interface/interfaces";
import { Buffer } from "buffer";

const FormReceipt = () => {

    //We get the user from the localstorage
    const utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
    const url: URL = new URL(window.location.href);
    const [id, setId] = useState<string>();
    const [data, setData] = useState<IGenericObject>([]);

    /**
    * This function help get all receipt info
    */
    const getData = async () => {
        const receipt = await getReceipts("", url.searchParams.get("id") as string);

        //We decode the base 64 json
        let buff = Buffer.from(receipt[0].f_data, 'base64');
        let text = buff.toString('ascii');
        setData(JSON.parse(text));
        console.log("JSON:", JSON.parse(text));
    }

    //this is how we know if we update the client or add a new one
    useEffect(() => {
        if (url.searchParams.get("action") == "edit") {
            setId(url.searchParams.get("id") as string);
            //We search all the client info 
            if (url.searchParams.get("id")) {
                console.log("we here");

                getData();
            }
        }

    }, [])

    const handleBtn = (): void => {
        var myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values = Object.fromEntries(formData.entries())
            buildReceipt(values, utilisateur);

        }
    }



    return (
        <>
            <form className="w-full max-w-screen-lg ml-auto mr-auto mt-10 mb-10 shadow-2xl p-8" id={"myForm"} onSubmit={(ev: any) => {
                ev.preventDefault();
            }}>
                <Receipt utilisateur={utilisateur} data={data.facturation} />
                <Passagers data={data.passagers} />
                <Itinerary data={data.itinerary} />
                <TravelProducts data={data.product} />
                <OpcRemark data={data.opc} />
                <PayementsSummary data={data.summary} />
                <GeneralSummary data={data.others} />
                <Terms data={data.others} />
                <button onClick={() => { handleBtn() }}>Press me</button>
            </form>
        </>
    );
}

export default FormReceipt;