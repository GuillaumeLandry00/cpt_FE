import React, { useEffect, useState } from "react";
import { FcEditImage, FcSearch } from "react-icons/fc";
import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { getSuppliers } from "../../../functions/admin/supplier";
import AddSupplier from "./AddSupplier";
import UpdateSupplier from "./UpdateSupplier";
import DeletingSupplier from "./DeletingSupplier";
import { ISupplier } from "../../../interface/interface_admin";
import BottomBarList from "../../Others/BottomBarList";

interface Props {
    switchViews: (views: string, id?: string) => void,
}


const SupplierList = ({ switchViews }: Props) => {

    const fetch = async (limit: number = 25, offset: number = 0): Promise<void> => {
        setIsLoading(true);
        setData(await getSuppliers(search, limit, offset) as ISupplier[]);
        console.log(await getSuppliers(search, limit, offset));

        setIsLoading(false);
    }

    useEffect(() => {
        fetch();
    }, [])



    const [data, setData] = useState<ISupplier[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [subViews, setSubViews] = useState<any>();
    const [response, setResponse] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const [offset, setOffset] = useState<number>(0);
    const [type, setType] = useState<string>("");


    return (
        <div className="w-full">
            <div className="w-full flex justify-between border-b-2">
                <h1 className="text-2xl  ">Fournisseurs {response && (<span className="text-green-500 text-xl">{response && response}</span>)}</h1>
                {showModal ? (<button onClick={() => { setShowModal(false); setResponse("") }}><AiOutlineCloseCircle size={22} /></button>) : (<button onClick={() => { setShowModal(true); setSubViews(<AddSupplier setResponse={setResponse} fetchData={fetch} />) }} className="w-1/12 ml-auto bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white  px-4 border border-green-500 hover:border-transparent rounded mb-2">Ajouter un fournisseur</button>)}
            </div>

            {isLoading ? (
                <div className="w-full mt-10">
                    <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                    <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                </div>
            ) : (
                <div>
                    {showModal && (
                        <div>
                            {subViews}
                        </div>)}
                    <div className="pt-2 relative mx-auto text-gray-600" >
                        <input onKeyDown={(e) => e.key === 'Enter' ? fetch() : ""} id="searchInput" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full" type="search" name="rechercher" placeholder="Rechercher par nom" onChange={(e) => setSearch(e.target.value)} value={search} />
                        <button type="submit" className="absolute right-0 top-0 mt-4 mr-4" onClick={() => fetch()}>
                            <FcSearch size={28} />
                        </button>
                    </div>
                    <table className="w-full h-full shadow-2xl mt-8">
                        <thead className="bg-gray-800 border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    ID
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Nom
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Devise
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Gl Achat
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Agent
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Status
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((purchase: ISupplier, index) =>
                                <tr className={`${index % 2 ? "bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>
                                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{purchase.id}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.nom}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.devise}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.gl_achat}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.agent ? "Visible" : "Non visible"}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{purchase.inactif ? "Actif" : "Inactif"}</td>
                                    <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                        <button onClick={() => { setShowModal(true); setSubViews("empty"); setSubViews(<UpdateSupplier setResponse={setResponse} fetchData={fetch} id={purchase.id} />) }}>
                                            <FcEditImage size={22} className="ml-3" />
                                        </button>
                                        <button onClick={() => { setShowModal(true); setSubViews(<DeletingSupplier setResponse={setResponse} setShowModal={setShowModal} fetchData={fetch} id={purchase.id} />); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                                            <MdOutlineDeleteForever size={22} color="#fa1e3c" className="ml-3" />
                                        </button>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <BottomBarList getData={fetch} offset={offset} setOffset={setOffset} setIsLoading={setIsLoading} data={data} />
                </div>
            )}

        </div >
    );
}

export default SupplierList;