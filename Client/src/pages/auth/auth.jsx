import { useState, useContext } from "react";
import Login from "../../components/auth/login";
import Register from "../../components/auth/register";
import ForgotPassword from "../../components/auth/forgotPw";
import { UserContext } from "../../managers/userManager";


export default function Auth() {
    const { handleRegister, handleLogin, changeHandler } = useContext(UserContext)
    const [formMode, setFormMode] = useState(false)

    const changeMode = (e) => {
        e.preventDefault()
        setFormMode(!formMode)
    }
    return (
        <section className=" flex justify-center items-center px-10">
            <form className="AuthContainer w-4/5 h-fit flex flex-wrap" onChange={changeHandler}>
                {formMode ? <Login /> : <Register />}
                <div className=" w-full justify-center gap-2 flex">
                    <p className="mt-10 text-center text-sm text-gray-500">
                        {
                            formMode ? "Already have an account? " : "Don't have an account? "
                        }
                        <button onClick={changeMode} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            {
                                formMode ? "Register" : "Login"
                            }
                        </button>
                    </p>
                </div>
            </form >
        </section>
    )

}