import React, { useEffect, useState } from "react";
import { SITE_URL } from "../../../constants/constantes";
import { IUtilisateur } from "../../../interface/interfaces";
import AccountingReceivingTopBar from "./AccountingReceivingTopBar";
import PurchasesList from "../Administrative Purchases/PurchasesList";
import DefaultAccounting from "../DefaultAccounting";
import PurchasingList from "../Purchasing Issues/PurchasingList";
import CompensationFundsList from "../Compensation Funds/CompensationFundList";
import TaxesList from "../Taxes/TaxesList";
import AdminExpenses from "../AdminExpense/AdminExpenses";

const AccountingReceiving = () => {

    useEffect(() => {
        let user: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)
        if (!(user.typeUtilisateur == 1 || user.typeUtilisateur == 2)) window.location.href = SITE_URL;
    }, []);


    const [views, setViews] = useState(<DefaultAccounting />);

    const switchViews = (views: string, id = ""): void => {

        switch (views) {
            case "achats-administratifs":
                setViews(<PurchasesList switchViews={switchViews} />);
                break;
            case "achats-emis":
                setViews(<PurchasingList switchViews={switchViews} />);
                break;
            case "fonds-indemnisation":
                setViews(<CompensationFundsList switchViews={switchViews} />);
                break;
            case "paiements-taxe":
                setViews(<TaxesList switchViews={switchViews} />);
                break;
            case "debourses-admin":
                setViews(<AdminExpenses />);
                break;
            default:
                setViews(<DefaultAccounting />)
                break;
        }
    }

    return (
        <div className="w-full">
            <AccountingReceivingTopBar switchViews={switchViews} />
            <div className="shadow-xl mt-2 bg-slate-100 p-8 ml-10 mr-10">
                {views}
            </div>
        </div >
    );

}

export default AccountingReceiving;