import React, { useReducer } from "react";
import NavBar from "../Dashboard/NavBar";
import Passagers from "./Passagers";
import Receipt from "./Receipt";
import { IReducerClientArray, IActionReducer } from "../../interface/interfaces";
const FormReceipt = () => {

    //We get the user from the localstorage
    const utilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);

    const reducerClient = (state: any, action: IActionReducer) => {
        console.log(state);
        switch (action.type) {
            case "add":
                state.clients.push("");
                return state;
            case "remove":
                return state.clients.pop();
            case "submit":
                break;
            default:
                return state;
        }
        return state;
    }
    //Section useReducer of clients section
    const [stateClient, dispatchClient] = useReducer(reducerClient, { clients: [] });



    return (
        <>
            <NavBar />
            <div className="w-full max-w-screen-lg ml-auto mr-auto mt-10 shadow-2xl p-8">
                {/* <button onClick={() => { dispatchClient({ type:"add" }) }}>Press me</button> */}
                <Receipt utilisateur={utilisateur} />
                <Passagers dispatchClient={dispatchClient} stateClient={stateClient} test={"test"} />
            </div>
        </>
    );
}

export default FormReceipt;