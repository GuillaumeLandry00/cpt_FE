import React, { useEffect, useState } from "react";
import { SITE_URL } from "../../constants/constantes";
import { IUtilisateur } from "../../interface/interfaces";
import AccountingTopBar from "./AccountingTopBar";
import PurchasesList from "./Administrative Purchases/PurchasesList";
import DefaultAccounting from "./DefaultAccounting";

const Accounting = () => {

    useEffect(() => {
        let user: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)
        if (!(user.typeUtilisateur == 1 || user.typeUtilisateur == 2)) window.location.href = SITE_URL;
    }, []);


    const [views, setViews] = useState(<DefaultAccounting />);

    const switchViews = (views: string, id = ""): void => {
        console.log("views: ", views);

        switch (views) {
            case "achats-administratifs":
                setViews(<PurchasesList switchViews={switchViews} />);
                break;
            default:
                setViews(<DefaultAccounting />)
                break;
        }
    }

    return (
        <div className="w-full">
            <AccountingTopBar switchViews={switchViews} />
            <div className="shadow-xl mt-2 bg-slate-100 p-8 ml-10 mr-10">
                {views}
            </div>
        </div >
    );

}

export default Accounting;