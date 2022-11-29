import { IProducts } from "../../interface/interface_accounting";
import { authToken } from "../agent/authentification";

// export const getProducts = async (search = "", limit = 25, offset = 0): Promise<unknown> => {
//     try {

//         // //We make the request
//         // const response = await axios.get<IPurchases[]>(BASE_URL + `accounting/purchases?search=${search}&limit=${limit}&offset=${offset}`, { headers: { "x-access-token": localStorage.getItem('token') as string } });
//         // authToken(response.data);
//         // return response.data;
//     } catch (error) {
//         console.log(error);
//     }
// }