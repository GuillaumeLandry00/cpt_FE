import React, { useEffect, useState } from "react";
import { redirectLogin } from "../../functions/authentification";
import NavBar from "../Dashboard/NavBar";
import Table from "./Table";
import FormClient from "./FormClient";
import ViewClient from "./ViewClient";

const Dashboard = () => {

    const [id, setId] = useState<any>();
    

    useEffect(() => {
        let url:URL = new URL(window.location.href);
        setId(url.searchParams.get("id"));
    }, [])

    


    return (
        <>
            <NavBar />
            <Table/>
            {/* <FormClient /> */}
        </>
    );
}

export default Dashboard;