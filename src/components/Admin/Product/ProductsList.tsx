import React, { useEffect, useState } from "react";
import { FcEditImage, FcSearch } from "react-icons/fc";
import axios from "axios";
import { BASE_URL } from "../../../constants/constantes";
import AddProduct from "./AddProduct";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface Props {
    switchViews: (views: string, id?: string) => void,
}

interface IProduct {
    id: number,
    label: string,
    taxe: number, 
    tps: number,
    tvq: number, 
    opc: number, 
    rabais: number
}

const ProductsList = ({ switchViews }: Props) => {

    const fetchProducts = async (): Promise<void> => {
        setIsLoading(true)
        const products = await axios.get(BASE_URL + "product", { headers: { "x-access-token": localStorage.getItem('token') as string } });
        setProducts([... products.data]);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchProducts();
    }, []);


    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [subViews, setSubViews] = useState<any>();
    const [response, setResponse] = useState<string>("");

    return (
        <div className="w-full">
            <div className="flex">
                <h1 className="text-xl font-bold w-11/12">Liste des produits {response && (<span className="text-green-500 text-xl">{response && response}</span>)}</h1>
                {showModal ? (<button onClick={() => { setShowModal(false); setResponse("") }}><AiOutlineCloseCircle size={22} /></button>) : (<button onClick={() => { setShowModal(true); setSubViews(<AddProduct setResponse={setResponse} fetchData={fetchProducts} />) }} className="w-1/12 ml-auto bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white  px-4 border border-green-500 hover:border-transparent rounded mb-2">Ajouter un produit</button>)}
            </div>
            {showModal && (
                    <div>{subViews}</div>
            )}
            {isLoading ? (
                <div className="w-full mt-10">
                    <h3 className="text-l font-bold text-center mt-5">Chargement en cours</h3>
                    <img className="ml-auto mr-auto" src="https://guillaumeartiste3d.ca/wp-content/uploads/loader.gif" width={100} height={100} alt="" />
                </div>
            ) : (
                <div>
                    <table className="w-full h-full shadow-2xl mt-8">
                        <thead className="bg-gray-800 border-b">
                            <tr>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    #
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Label
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Taxe
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    TPS
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    TVQ
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    Rabais
                                </th>
                                <th scope="col" className="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                    OPC
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: IProduct, index) =>
                                <tr className={`${index % 2 ? " bg-white" : "bg-gray-200"} border-b transition duration-300 ease-in-out hover:bg-gray-100`} key={index}>
                                    <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{product.label}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{product.taxe ? "Oui" : "Non"}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{product.tps ? "Oui" : "Non"}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{product.tvq ? "Oui" : "Non"}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{product.rabais ? "Oui" : "Non"}</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-2 whitespace-nowrap">{product.opc ? "Oui" : "Non"}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            )}
        </div>
    );
}

export default ProductsList;