import React, { useEffect, useState, } from "react";
import { downloadReceipt, getReceipts } from "../../functions/receipt";
import { Link } from "react-router-dom";

//The icons
import { FcEditImage } from 'react-icons/fc';
import { FcSearch } from 'react-icons/fc';
import { GrDocumentPdf } from 'react-icons/gr';
import { GrFormView } from 'react-icons/gr';
import { IReceipt } from "../../interface/interfaces";

const TableReceipt = () => {

    const [data, setData] = useState<IReceipt[]>([]);
    const [search, setSearch] = useState<string>("");


    //Make the api request
    const getData = async () => {
        if (search == "") {
            setData([...await getReceipts()]);
        } else {
            setData([...await getReceipts(search)]);
        }


    };

    //Make the request when the component is created
    useEffect(() => {
        getData();
    }, [])


    return (<>
        <div className="w-4/5 mb-28 overscroll-auto  ml-auto mr-auto ">
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



            <table className="w-full h-full shadow-2xl mt-8">
                <thead className="bg-gray-800 border-b">
                    <tr>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            #
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Date de création
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                            Nom  client
                        </th>
                        <th scope="col" className="text-sm font-medium text-gray-100 px-1 py-4 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((receipt, index) =>
                        <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={index}>
                            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.dossier_no}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{receipt.date.substring(0, 10)}</td>
                            <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{receipt.nom}</td>
                            <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap flex flex-row">
                                <button className="mr-4" onClick={() => { downloadReceipt(parseInt(receipt.facturationID)) }}>
                                    <GrDocumentPdf size={20} color="grey" />
                                </button>
                                <Link to={`form/?action=edit&id=${receipt.facturationID}`}>
                                    <FcEditImage size={22} className="ml-3" />
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </>);
}

export default TableReceipt;