import React, { useEffect, useState } from "react";
import Passagers from "./Passagers";
import Receipt from "./Receipt";
import Itinerary from "./Itinerary";
import TravelProducts from "./TravelProducts";
import OpcRemark from "./OpcRemark";
import PayementsSummary from "./PayementsSummary";
import GeneralSummary from "./GeneralSummary";
import Terms from "./Terms";
import { buildReceipt, getReceipt, sendReceipt, validateReceipt } from "../../functions/agent/receipt";
import { IUtilisateur, IFactureDB, IReceiptErrors } from "../../interface/interfaces";
import { OPC_RATE, SITE_URL, TPS_RATE, TVQ_RATE } from "../../constants/constantes";
import { Utility } from "../../functions/util/Utility";
import { PRODUCT_TYPE } from "../../constants/select_constants";


const FormReceipt = () => {

    //We get the user from the localstorage
    const utilisateur: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
    const url: URL = new URL(window.location.href);
    const [id, setId] = useState<string>();
    const [data, setData] = useState<IFactureDB>();
    const [opcAmount, setOpcAmount] = useState<number>(0);
    const [grandTotal, setGrandTotal] = useState<number>(0);
    const [response, setResponse] = useState<string>("");
    const [noDossier, setNoDossier] = useState<number>(0);
    const [errors, setErrors] = useState<IReceiptErrors | null>()


    /**
    * This function help get all receipt info
    */
    const getData = async () => {
        const receipt = (await getReceipt(url.searchParams.get("id") as string) as IFactureDB[])[0];
        setData(receipt)
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

        //We get the response
        if (url.searchParams.get("isSuccess")) {
            setResponse("La facture à été mise à jour")
        }

    }, [])

    const handleBtn = (): void => {
        console.log('Save button clicked');

        //We refresh all the price 
        newTaxesCalculator()
        calcPaiement()
        setErrors(null)

        var myForm = document.getElementById('myForm') as HTMLFormElement;
        if (myForm != null) {
            const formData: FormData = new FormData(myForm);
            const values = Object.fromEntries(formData.entries())

            //Make sure that the user has entered en email
            if (values.courriel == "") {
                window.alert("Vous devez entrer un courriel dans sommaire général")
                return
            }
            //we build the receipt object                
            const receipt = buildReceipt(values, utilisateur, "update", url.searchParams.get("id") as string);
            //we validate the receipt
            const errors = validateReceipt(receipt);
            if (errors.general.length > 0 || errors.itinerary.length > 0 || errors.others.length > 0 ||
                errors.paiements.length > 0 || errors.passagers.length > 0 || errors.products.length > 0 || errors.summaryOpc.length > 0) {
                setErrors(errors)
                document.body.scrollTop = document.documentElement.scrollTop = 0;

            } else if (url.searchParams.get("id") && url.searchParams.get("action") == "edit") {

                const response = sendReceipt(receipt, "update")
                response.then((result) => {

                    if (result.affectedRows > 0) {
                        setResponse("La facture à été mise à jour")
                    }
                });
            } else {
                //we add a new one
                const response = sendReceipt(receipt, "add")
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

    //Les fonctions pour calculer le prix.. 
    const calcPaiement = () => {
        let sum = 0;
        let payementsLength = document.querySelectorAll(".payement").length

        for (let i = 0; i < payementsLength; i++) {
            sum += parseFloat((document.getElementById(`tot_paiement${i}`) as HTMLInputElement).value);
        }
        (document.getElementById("total_paiement") as HTMLFormElement).value = Utility.roundNumber(parseFloat(String(sum)));
        (document.getElementById("balance") as HTMLFormElement).value = Utility.roundNumber((parseFloat((document.getElementById("grand_total") as HTMLFormElement).value) - parseFloat(String(sum))));
    }

    const newTaxesCalculator = async () => {
        let productsLength = document.querySelectorAll(".product").length
        for (let i = 0; i < productsLength; i++) {
            if (document.getElementById(`mySelectProduct${i}`)) {
                let index: number = parseFloat((document.getElementById(`mySelectProduct${i}`) as HTMLInputElement).value);

                //we calculate the taxes here..
                let qty: string = (document.getElementById(`qty${i}`) as HTMLInputElement).value;
                let price: string = (document.getElementById(`prix${i}`) as HTMLInputElement).value;

                let sum = parseFloat(qty) * parseFloat(price);
                let tpsSum = PRODUCT_TYPE[index].tps !== '0' ? String(Math.round((sum * TPS_RATE + Number.EPSILON) * 100) / 100) : "0";
                let tvqSum = PRODUCT_TYPE[index].tvq !== '0' ? String(Math.round((sum * TVQ_RATE + Number.EPSILON) * 100) / 100) : "0";

                //We add the correct sum at each field
                (document.getElementsByName(`Tproduit_tps_${i}`)[0] as HTMLInputElement).value = tpsSum;
                (document.getElementsByName(`Tproduit_tvq_${i}`)[0] as HTMLInputElement).value = tvqSum;
                if (PRODUCT_TYPE[index].taxe == '0') {
                    (document.getElementsByName(`Ttaxes${i}`)[0] as HTMLInputElement).value = String(Math.round((parseFloat(tpsSum) + parseFloat(tvqSum) + Number.EPSILON) * 100) / 100)
                }

                let taxSum = PRODUCT_TYPE[index].taxe !== '0' ? parseFloat((document.getElementsByName(`Ttaxes${i}`)[0] as HTMLInputElement).value) * parseFloat(qty) : parseFloat((document.getElementsByName(`Ttaxes${i}`)[0] as HTMLInputElement).value);
                let discountSum = (document.getElementsByName(`Tescompte_${i}`)[0] as HTMLInputElement).value !== "" ? (parseFloat((document.getElementsByName(`Tescompte_${i}`)[0] as HTMLInputElement).value) * parseFloat(qty)) : 0;


                let finalSum = Math.round((sum + taxSum - discountSum + Number.EPSILON) * 100) / 100;

                (document.getElementsByName(`Ttotal_${i}`)[0] as HTMLInputElement).value = String(finalSum)
            }
        }

        //OPC 
        let opcSum = 0;
        let bigSum = 0;
        for (let i = 0; i < productsLength; i++) {
            if (document.getElementById(`mySelectProduct${i}`)) {
                let index: number = parseInt((document.getElementById(`mySelectProduct${i}`) as HTMLInputElement).value);
                let total: number = parseFloat((document.getElementsByName(`Ttotal_${i}`)[0] as HTMLInputElement).value)

                //For opc
                if (PRODUCT_TYPE[index].opc !== '0') {
                    opcSum += total
                }
                //For grand total
                bigSum += total
            }
        }

        (document.getElementById("opc") as HTMLFormElement).value = Math.round((opcSum * OPC_RATE + Number.EPSILON) * 100) / 100;
        (document.getElementById("grand_total") as HTMLFormElement).value = Math.round(((bigSum + opcSum * OPC_RATE) + Number.EPSILON) * 100) / 100;;
    }

    return (
        <>
            <form className="w-full max-w-screen-lg ml-auto mr-auto mt-10 mb-10 shadow-2xl p-8" id={"myForm"} onSubmit={(ev: any) => {
                ev.preventDefault();
                console.log('Form button clicked');

            }}>
                {response && (<span className="text-green-500 font-bold">{response}</span>)}
                <fieldset disabled={url.searchParams.get("action") !== "view" ? false : true}>
                    {errors && (
                        <div className="bg-red-200 p-3 rounded-lg shadow-xl">
                            <p className="text-red-500" style={{ whiteSpace: "pre-wrap" }}>
                                <strong>Il y a une ou plusieurs erreurs:</strong>
                                {"\n- " + errors.passagers.join("\n- ") + errors.itinerary.join("\n- ") + "\n- " +
                                    errors.products.join("\n- ") + errors.others.join("\n- ")}
                            </p>
                        </div>
                    )}
                    <Receipt utilisateur={utilisateur} data={data ? JSON.parse(data.general) : {}} dossier={data ? data.dossier : ""} agence={data ? data.agence : ""} date={data ? data.date : ""} />
                    <Passagers data={data ? JSON.parse(data.passagers) : {}} />
                    <Itinerary data={data ? JSON.parse(data.itinerary) : {}} />
                    <TravelProducts data={data ? JSON.parse(data.products) : {}} newTaxesCalculator={newTaxesCalculator} />
                    <OpcRemark data={data ? JSON.parse(data.remarks) : {}} opcAmount={opcAmount} grandTotal={grandTotal} />
                    <PayementsSummary data={data ? JSON.parse(data.paiements) : {}} calcPaiement={calcPaiement} />
                    <GeneralSummary data={data ? JSON.parse(data.general) : {}} />
                    <Terms data={data ? JSON.parse(data.general) : {}} />
                </fieldset>
                {response && (<span className="text-green-500 font-bold">{response}</span>)}
                {(url.searchParams.get("action") !== "view") && (<button onClick={(e) => { e.preventDefault(); handleBtn() }} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded w-full mt-8">Enregistrer la facture</button>)}

            </form>
        </>
    );
}

export default FormReceipt;