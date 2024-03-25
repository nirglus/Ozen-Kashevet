import { useState, useContext } from "react";
import Login from "../../components/auth/login";
import Register from "../../components/auth/register";
import ForgotPassword from "../../components/auth/forgotPw";
import { UserContext } from "../../managers/userManager";


export default function Auth() {

    const { handleRegister, handleLogin } = useContext(UserContext)

    const [formAction, setFormAction] = useState('http://localhost:2500/api/v1/users/login')
    const [formMode, setFormMode] = useState(false)

    const changeMode = (e) => {
        e.preventDefault()
        setFormMode(!formMode)
    }
    return (
        <section className="h-screen flex justify-center items-center px-10">
            <form className="AuthContainer border-solid border-black border w-4/5 h-fit flex flex-wrap">
                {formMode ? <Login /> : <Register />}
                <div className=" w-full justify-center gap-2 flex">
                    <button onClick={changeMode} className="">ChangeMode</button>
                    <button className="">Forgot Password?</button>
                </div>
            </form >
        </section>
    )

}