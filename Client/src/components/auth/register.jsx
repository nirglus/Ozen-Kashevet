import React, { useContext } from 'react'
import { UserContext } from '../../managers/userManager'

export default function Register() {
    const { handleRegister } = useContext(UserContext)
    return (
        <div className='w-screen h-fit p-12'>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {/* <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                /> */}
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign up
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        {/* email */}
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                id="email"
                                name='email'
                                type='email'
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                autoComplete="email"
                            />
                        </div>
                        {/* userName */}
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900 mt-6">
                                UserName
                            </label>
                            <div className="mt-2">
                                <input
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name='user_name'></input>
                            </div>
                        </div>
                    </div>

                    {/* password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* bio */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Bio
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                id="bio"
                                name="bio"
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* birthdate */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Birth Date
                        </label>
                        <div className="mt-2">
                            <input
                                required
                                id="birth_date"
                                name="birth_date"
                                type="date"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <span>gender:</span>
                    <div>
                        <label htmlFor='psycho'>man</label>
                        <input id='psycho' type='radio' name='gender' value={"M"}></input>
                        <label htmlFor='user'>women</label>
                        <input id='user' type='radio' name='gender' value={"W"}></input>
                        <label htmlFor='user'>other</label>
                        <input id='user' type='radio' name='gender' value={"O"}></input>
                    </div>
                    <span>Role:</span>
                    <div>
                        <label htmlFor='psycho'>Psycho</label>
                        <input id='psycho' type='radio' name='role' value={"PF"}></input>
                        <label htmlFor='user'>User</label>
                        <input id='user' type='radio' name='role' value={"user"}></input>
                    </div>
                    <div>
                        <button
                            onClick={handleRegister}
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
