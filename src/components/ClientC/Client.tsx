import React, { useEffect, useState } from "react";
import { redirectLogin } from "../../functions/authentification";
import NavBar from "../Dashboard/NavBar";
import Table from "./Table";

const Dashboard = () => {

    return (
        <>
            <Table />
            {/* <FormClient /> */}
        </>
    );
}

export default Dashboard;