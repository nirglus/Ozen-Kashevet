import { useState } from "react";
import Login from "../../components/auth/login";
import Register from "../../components/auth/register";
import ForgotPassword from "../../components/auth/forgotPw";

export default function Auth() {

    const [formMode, setFormMode] = useState(false)

    const changeMode = (e) => {
        e.preventDefault()
        setFormMode(!formMode)
    }
    return (
        <section className="h-screen flex justify-center items-center">
            <form className="AuthContainer border-solid border-black border w-screen h-fit flex flex-wrap">
                {formMode ? <Login /> : <Register />}
                <div className=" w-full justify-center gap-2 flex">
                    <button onClick={changeMode} className="">ChangeMode</button>
                    <button className="">Forgot Password?</button>
                </div>
            </form >
        </section>
    )

}