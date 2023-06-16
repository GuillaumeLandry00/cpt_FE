import React from "react";
import { AiOutlineBug } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";


const Footer = () => {

    const location = useLocation()

    if (location.pathname == "/") {
        return null
    }
    return (
        <div id="bugReporter" className="fixed right-5 bottom-5">
            <Link to={"/report"}><AiOutlineBug size={44} color="blue"/></Link>
        </div>
    )
}

export default Footer;