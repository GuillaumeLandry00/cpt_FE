import React from "react";


interface Props {
    switchViews: (viewsa: string) => void,
}


const AdminTopBar = ({ switchViews }: Props) => {

    return (
        <div className="w-full h-14 bg-gray-800 ">
            <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <button className="hover:bg-gray-700 text-white  pl-2 ml-1 py-2 rounded-md text-m font-xl font-bold" onClick={() => switchViews("")} >
                        Navigation Admin
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("agents")}>
                        Agents
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("aeroport")}>
                        Aéroports
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("produit")}>
                        Produits
                    </ button>
                    <button className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium" onClick={() => switchViews("fournisseurs")}>
                        Fournisseurs
                    </ button>

                </div>
            </div>
        </div >
    );
}

export default AdminTopBar;