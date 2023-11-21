import React, { useEffect, useState, } from "react";
import { duplicateReceipt, getReceipts } from "../../functions/agent/receipt";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../constants/constantes";

//The icons
import { FcEditImage } from 'react-icons/fc';
import { FcSearch, FcPlus } from 'react-icons/fc';
import { GrDocumentPdf } from 'react-icons/gr';
import { AiOutlineMail } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import { GrFormView, } from 'react-icons/gr';
import { IFacture } from "../../interface/interfaces";
import { capitalizeString } from "../../functions/agent/clients";
import FilterReceipt from "./FilterReceipt";
import DuplicateReceipt from "./DuplicateReceipt";

const TableReceipt = () => {

    const [data, setData] = useState<IFacture[]>([]);
    const [search, setSearch] = useState<string>("");

    //Filter useState
    const [order, setOrder] = useState<string>("DESC");
    const [by, setBy] = useState<string>("date");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [idDuplicate, setIdDuplicate] = useState<number>(0)
    const [response, setResponse] = useState<string>("");

    //Make the api request
    const getData = async (limit = 50) => {
        if (search == "") {
            setData([...await getReceipts(order, by, "", limit)]);
        } else {
            setData([...await getReceipts(order, by, search, limit)]);
        }
    };

    const dupReceipt = async () => {
        if (idDuplicate) {
            let response = duplicateReceipt(idDuplicate);
            response.then((result: { affectedRows: number, dossier: number }) => {
                if (result.affectedRows > 0) {
                    setShowModal(false)
                    setResponse(`La facture a été dupliqué, le nouveau numéro de dossier est: ${result.dossier}`)
                    getData()
                }
            })
        }
    }

    //Make the request when the component is created
    useEffect(() => {
        getData();
    }, [])


    return (<>

        <div className="w-4/5 mb-28 overscroll-auto  ml-auto mr-auto">

            <div className="w-full block mb-0 mt-7">
                <p className="ml-auto text-right">
                    <Link to="form/" className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                        Ajouter une facutre
                    </Link>
                </p>
            </div>

            <h2 className="text-center mt-8 font-bold text-xl">Liste de mes factures</h2>

            <div className="pt-2 relative mx-auto text-gray-600" >
                <input onKeyDown={(e) => e.key === 'Enter' ? getData() : ""} id="searchInput" className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none w-full" type="search" name="rechercher" placeholder="Rechercher un dossier" onChange={(e) => setSearch(e.target.value)} value={search} />
                <button type="submit" className="absolute right-0 top-0 mt-4 mr-4" onClick={() => getData()}>
                    <FcSearch size={28} />
                </button>
            </div>
            {response !== "" && (<div className="bg-green-200 p-3 rounded-lg shadow-xl mt-4 flex flex-row justify-between">
                <p className="text-green-500" style={{ whiteSpace: "pre-wrap" }}>
                    <strong>{response}</strong>
                </p>
                <button className="text-green-500" onClick={() => { setResponse("") }}><MdCancel size={22} /></button>

            </div>)}
            <FilterReceipt setOrder={setOrder} setBy={setBy} getData={getData} />
            {showModal && (<DuplicateReceipt setShowModal={setShowModal} duplicateReceipt={dupReceipt} />)}
            {data.length == 0 ? (<span className="text-center font-bold text-lg">Vous n'avez pas de facture</span>) : (

                <table className="w-full h-full shadow-2xl mt-8">
                    <thead className="bg-gray-800 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left w-1/6">
                                No dossier
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left w-2/6">
                                Date de création
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left w-2/6">
                                Nom  client
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left w-2/6">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((receipt, index) =>
                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.dossier}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{receipt.date.substring(0, 10)}</td>
                                <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{capitalizeString(receipt.NOM)}</td>
                                <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                    {String(receipt.dossier).charAt(0) == "|" ? (
                                        <a href="https://www.voyagesgabymsh.ca/backend/login.php" className="underline font-bold" target={"_blank"}>(Voir autre système)</a>
                                    ) : (
                                        <>
                                            <Link to={`form/?action=view&id=${receipt.id}`}>
                                                <GrFormView size={22} />
                                            </Link>
                                            <Link to={`form/?action=edit&id=${receipt.id}`}>
                                                <FcEditImage size={22} className="ml-4" />
                                            </Link>

                                            <a className="ml-4" href={`${BASE_URL}receipt/generate/${receipt.id}`} >
                                                <GrDocumentPdf size={20} color="grey" />
                                            </a>
                                            <Link to={`mail?to=${JSON.parse(receipt.general).courriel}&receipt=${receipt.id}`}>
                                                <AiOutlineMail size={22} className="ml-4" />
                                            </Link>
                                            <a className="ml-4 cursor-pointer">
                                                <FcPlus size={20} color="white" onClick={() => { setIdDuplicate(receipt.id); setShowModal(true); }} />
                                            </a>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            {(data.length > 15) && (
                <button className="ml-auto mr-auto mt-10 font-semibold underline text-l w-full" onClick={() => { getData(10000); }}>Voir toutes factures</button>
            )}
        </div >
    </>);
}

export default TableReceipt;