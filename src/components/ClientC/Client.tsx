import React, { useEffect } from "react";
import { redirectLogin } from "../../functions/authentification";
import NavBar from "../Dashboard/NavBar";
import Table from "./Table";

const Dashboard = () => {

    //we check if the user has the right
    useEffect(() => {
        if (redirectLogin()) {
            //navigate("/");
        }
    }, [])


    return (
        <>
            <NavBar />
            <Table />
        </>
    );
}

export default Dashboard;