import React, { useReducer } from "react";
import NavBar from "../Dashboard/NavBar";
import Passagers from "./Passagers";
import Receipt from "./Receipt";
import Itinerary from "./Itinerary";
import TravelProducts from "./TravelProducts";
import OpcRemark from "./OpcRemark";
import PayementsSummary from "./PayementsSummary";
import GeneralSummary from "./GeneralSummary";
import Terms from "./Terms";
import { buildReceipt } from "../../functions/receipt";
import { IUtilisateur } from "../../interface/interfaces";

const FormReceipt = () => {

    //We get the user from the localstorage
    const utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);

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
            <NavBar />
            <form className="w-full max-w-screen-lg ml-auto mr-auto mt-10 mb-10 shadow-2xl p-8" id={"myForm"} onSubmit={(ev: any) => {
                ev.preventDefault();
            }}>
                <Receipt utilisateur={utilisateur} />
                <Passagers />
                <Itinerary />
                <TravelProducts />
                <OpcRemark />
                <PayementsSummary />
                <GeneralSummary />
                <Terms />
                <button onClick={() => { handleBtn() }}>Press me</button>
            </form>
        </>
    );
}

export default FormReceipt;