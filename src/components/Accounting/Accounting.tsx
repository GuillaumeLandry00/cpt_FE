import React, { useEffect, useState } from "react";
import { SITE_URL } from "../../constants/constantes";
import { IUtilisateur } from "../../interface/interfaces";
import AccountingTopBar from "./AccountingTopBar";
import PurchasesList from "./Administrative Purchases/PurchasesList";
import DefaultAccounting from "./DefaultAccounting";
import PurchasingList from "./Purchasing Issues/PurchasingList";
import AcountingReceiving from "./AccountingReceiving/AcountingReceiving";
import TaxesList from "./Taxes/TaxesList";

const Accounting = () => {

    useEffect(() => {
        let user: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)
        if (!(user.typeUtilisateur == 1 || user.typeUtilisateur == 2)) window.location.href = SITE_URL;
    }, []);


    const [views, setViews] = useState(<DefaultAccounting />);

    const switchViews = (views: string, id = ""): void => {

        switch (views) {
            case "comptes-payables":
                setViews(<AcountingReceiving />);
                break;
            case "achats-emis":
                setViews(<PurchasingList switchViews={switchViews} />);
                break;
            default:
                setViews(<DefaultAccounting />)
                break;
        }
    }

    return (
        <div className="w-full">
            <AccountingTopBar switchViews={switchViews} />
            <div>
                {views}
            </div>
        </div >
    );

}

export default Accounting;