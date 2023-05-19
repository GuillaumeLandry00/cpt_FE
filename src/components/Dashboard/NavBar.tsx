import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"
import { IUtilisateur } from "../../interface/interfaces";

const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    let user: IUtilisateur = JSON.parse(localStorage.getItem("utilisateur") as string);
    const location = useLocation()

    if (location.pathname == "/") {
        return null
    }



    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 pl-10">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link to={"/dashboard"}>
                                    <img
                                        className="h-10 w-22"
                                        src="https://www.voyagesgabymsh.ca/wp-content/uploads/2022/08/new-logo.png"
                                        alt="logo"
                                    />
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">

                                    {/* {user && user.typeUtilisateur == 1 && (
                                        <Link to={'/admin'} className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Admin
                                        </ Link>
                                    )}
                                    {user && (user.typeUtilisateur == 1 || user.typeUtilisateur == 2) && (
                                        <Link to={'/comptabilite'} className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                            Comptabilité
                                        </ Link>
                                    )} */}
                                    <Link to={'/dashboard/client'} className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Client
                                    </ Link>
                                    <Link to={'/dashboard/facturation'} className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Facturation
                                    </ Link>
                                    <Link to={'/dashboard/reservation'} className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium">
                                        Call center
                                    </ Link>
                                    <a href="https://www.voyagesgabymsh.ca/backend/login.php" target="_blank" className="hover:bg-gray-700 ml-auto text-white px-3 py-2 rounded-md text-sm font-medium w-56">
                                        Ancien système de facturation
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
}

export default NavBar;