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
import { IActionReducerItinerary, IActionReducer } from "../../interface/interfaces";

const FormReceipt = () => {

    //We get the user from the localstorage
    const utilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);

    //Section useReducer of clients section
    const reducerClient = (state: any, action: IActionReducer) => {
        switch (action.type) {
            case "add":
                state.clients.push("");
                return state;
            case "remove":
                state.clients.pop();
                return state;
            case "submit":
                if (action.payload) {
                    state.clients[action.payload.id] = action.payload.value;
                }
                return state
            default:
                return state;
        }
    }
    //Section useReducer of clients section
    const reducerItinerary = (state: any, action: IActionReducerItinerary) => {
        switch (action.type) {
            case "add":
                state.itineraries.push({ origin: "", destination: "", cie: "", volNo: "", classe: "", departure: "", time_d: "", arrival: "", time_a: "", notes: "" });
                console.log(state);
                return state;
            case "remove":
                state.itineraries.pop();
                console.log(state);
                return state;
            case "submit":

                if (action.payload) {
                    console.log("here id:" + action.payload.id);
                    state.itineraries[action.payload.id][action.payload.what] += action.payload.value;
                }
                console.log(state);
                return state
            default:
                return state;
        }
    }

    const [stateClient, dispatchClient] = useReducer(reducerClient, { clients: [""] });
    const [stateItinerary, dispatchItinerary] = useReducer(reducerItinerary, { itineraries: [{ origin: "", destination: "", cie: "", volNo: "", classe: "", departure: "", time_d: "", arrival: "", time_a: "", notes: "" }] });

    const getData = (what: string) => {
        console.log("we here");
        if (what == "itinerary") {
            return stateItinerary;
        }
    }

    return (
        <>
            <NavBar />
            <div className="w-full max-w-screen-lg ml-auto mr-auto mt-10 mb-10 shadow-2xl p-8">
                <Receipt utilisateur={utilisateur} />
                <Passagers dispatchClient={dispatchClient} stateClient={stateClient} />
                <Itinerary dispatchItinerary={dispatchItinerary} stateItinerary={{ ...stateItinerary }} getData={getData} />
                <TravelProducts />
                <OpcRemark />
                <PayementsSummary />
                <GeneralSummary />
                <Terms />
                <button > Envoyer la facture </button>
            </div>
        </>
    );
}

export default FormReceipt;