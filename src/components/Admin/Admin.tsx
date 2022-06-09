import React, { useEffect, useState } from "react";
import { SITE_URL } from "../../constants/constantes";
import { IUtilisateur } from "../../interface/interfaces";
import AdminTopBar from "./AdminTopBar";
import AddAgent from "./Agent/AddAgent";
import AgentList from "./Agent/AgentList";
import EditAgent from "./Agent/EditAgent";
import DefaultAdmin from "./DefaultAdmin";

const Admin = () => {

    useEffect(() => {
        let user: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string)
        if (user.typeUtilisateur !== 1) window.location.href = SITE_URL;
    }, []);

    const [views, setViews] = useState(<DefaultAdmin />);

    const switchViews = (views: string, id = ""): void => {
        switch (views) {
            case "agents":
                console.log("In  agents");
                setViews(<AgentList switchViews={switchViews} />)
                break;
            case "edit-agent":
                console.log("In edit agent");
                setViews(<EditAgent id={id} switchViews={switchViews} />);
                break;
            case "add-agent":
                console.log("In add agent");
                setViews(<AddAgent switchViews={switchViews} />);
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