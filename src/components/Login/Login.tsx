import React, { useState, useEffect, useRef } from "react";
import { checkLoginStatus, checkAuth, redirectLogin } from "../../functions/authentification";
import { useNavigate } from "react-router-dom"

const Login = () => {

    //We initialize data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData]: Array<any> = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        if (data) {
            if (data.code === 200) {

                //We register the token
                localStorage.setItem("token", data.token);
                navigate("/dashboard")
            } else {
                setErr(data['message']);
            }
        }

    }, [data])

    return (
        <div className="w-full pt-32 from-red-600 to-red-200 bg-gradient-to-b h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80 ml-auto mr-auto">
                <img src="https://www.voyagesgabymsh.ca/wp-content/uploads/2019/07/ctww.jpg" className="max-h-24 ml-auto mr-auto" alt="logo" />
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Courriel :</label>
                    <input
                        name="email"
                        type="text"
                        value={email}
                        className="shadow appearance-none border border-red-600 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline focus:shadow-outline"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">Mot de passe :</label>
                    <input
                        name="password"
                        type="text"
                        value={password}
                        className="shadow appearance-none border border-red-600 rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline focus:shadow-outline"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <p className="text-rose-600 text-center mb-2">{err}</p>
                <div className="flex items-center justify-between">
                    <button className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  w-full" type="button" onClick={async () => setData(await checkLoginStatus())}>
                        Me connecter
                    </button>
                </div>
            </form>
        </div>

    );
}

export default Login;