import { useState, useContext } from "react";
import {loginUser} from "../services/user_service";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function LoginPage () {

    const navigate = useNavigate();
    const [required, setRequired] = useState(false);
    const [animation, setAnimation] = useState(false);
    const [ showError, setShowError ] = useState(false);
    const { login } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user, password } = e.target;
        const userValue = user.value.trim();
        const passwordValue = password.value.trim();

        if (userValue === "" || passwordValue === "") {            
            setRequired(true);
        } else {
            setRequired(false);
            setAnimation(true);            
            try{
                const credenciales = {
                    user: userValue,
                    password: passwordValue
                }
                const result = await loginUser(credenciales)
                const data = result.data;
                login(data);
                setAnimation(false);
                navigate("/admin");
            } catch (err) {
                setShowError(true);
                setAnimation(false);
            }
            
        }
    };

    return(
        <section className="md:max-w-[35rem] mx-auto flex flex-col items-center justify-center px-4 md:px-10 lg:px-20 mt-20 md:mt-30">
            <img className="w-36 h-auto mb-10" src="/images/Logo.png" alt="Logo navbar" />
            <form onSubmit={handleSubmit}  className="flex w-full flex-col gap-5">
                <div>
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="user"
                >
                    Usuario <span className="text-red-500">*</span>
                </label>
                <input
                    className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="user"
                    name="user"
                />
                </div>
                <div>
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="password"
                >
                    Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                    min={0}
                    className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    step="any"
                    type="password"
                />
                </div>
                <div className={`text-red-600 text-center bg-red-300 py-2 ${required ? 'block' : 'hidden'}`}>
                    Complete los espacios faltantes
                </div>
                <div className={`text-red-600 text-center bg-red-300 py-2 ${showError ? 'block' : 'hidden'}`}>
                    Credenciales inválidas
                </div>
                <button
                    className={`py-2 shadow uppercase font-bold border-2 rounded text-white bg-[#308e42] ${animation ? 'animation-btn' : ''}`}
                    type="submit"
                    >
                    Iniciar sesión
                </button>
            </form>
        </section>
    )
}

export default LoginPage;