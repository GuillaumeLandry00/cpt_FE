import React, { useEffect } from "react";
import { redirectLogin } from "../../functions/authentification";
import NavBar from "./NavBar";

const Dashboard = () => {

    //we check if the user has the right
    useEffect(() => {
        if (redirectLogin()) {
            //navigate("/");
        }
        console.log(localStorage.getItem("utilisateur"));
    }, [])


    return (
        <NavBar />
    );
}

export default Dashboard;