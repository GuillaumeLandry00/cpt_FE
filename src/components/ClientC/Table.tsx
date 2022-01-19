import React, { useEffect, useState, useMemo } from "react";
import { getAllClient } from "../../functions/clients";
import { useTable } from "react-table";

const Table = () => {

    const [data, setData] = useState<any[]>([]);

    //Make the request when the component is created
    useEffect(() => {
        const getData = async () => {
            setData(await getAllClient());
        };
        getData();
    }, [])

    return (<>
        <table>
            <tr>
                <th>Nom</th>
                <th>Prenom</th>
                <th>Adresse</th>
            </tr>
            <tbody>
                {data && data.map((res) => {

                })}
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
            </tbody>
        </table>
    </>);
}

export default Table;