import axios from "axios"
import { BASE_URL } from "../constants/constantes"

export const checkLoginStatus = () => {
    axios.post(BASE_URL + "auth/login", { "email": "landry.guillaume00@hotmail.com", "password": "54321Guy" }).then((result: Object) => {
        console.log(result);
    }).finally(() => {

    })
}