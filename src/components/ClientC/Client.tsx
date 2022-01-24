import React, { useEffect } from "react";
import { redirectLogin } from "../../functions/authentification";
import NavBar from "../Dashboard/NavBar";
import Table from "./Table";
import FormClient from "./FormClient";
import ViewClient from "./ViewClient";

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
            {/* <FormClient /> */}
            {/* <Table /> */}
            <ViewClient />
        </>
    );
}

export default Dashboard;