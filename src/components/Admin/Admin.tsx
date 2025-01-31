import React, { useEffect, useState } from "react";
import { SITE_URL } from "../../constants/constantes";
import { IUtilisateur } from "../../interface/interfaces";
import AdminTopBar from "./AdminTopBar";
import AddAgent from "./Agent/AddAgent";
import AgentList from "./Agent/AgentList";
import EditAgent from "./Agent/EditAgent";
import DefaultAdmin from "./DefaultAdmin";
import SupplierList from "./Supplier/SupplierList";
import AirportList from "./Airport/AirportList";
import ProductsList from "../Admin/Product/ProductsList";
import AddAirport from "./Airport/AddAirport";

const Admin = () => {

    useEffect(() => {
        let user: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)
        if (user.typeUtilisateur !== 99) window.location.href = SITE_URL;
    }, []);

    const [views, setViews] = useState(<DefaultAdmin />);

    const switchViews = (views: string, id = ""): void => {
        switch (views) {
            case "agents":
                setViews(<AgentList switchViews={switchViews} />)
                break;
            case "edit-agent":
                setViews(<EditAgent id={id} switchViews={switchViews} />);
                break;
            case "add-agent":
                setViews(<AddAgent switchViews={switchViews} />);
                break;
            case "fournisseurs":
                setViews(<SupplierList switchViews={switchViews} />)
                break;
            case "aeroport": 
                setViews(<AirportList  switchViews={switchViews}  />);
                break;
            case "produit": 
                setViews(<ProductsList switchViews={switchViews}/>);
                break;
            default:
                setViews(<DefaultAdmin />)
                break;
        }
    }

    return (
        <div className="w-full">
            <AdminTopBar switchViews={switchViews} />
            <div className="shadow-xl mt-2 bg-slate-100 p-8 ml-10 mr-10">
                {views}
            </div>
        </div >
    );
}

export default Admin;