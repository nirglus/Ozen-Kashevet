import React, { Fragment,useState, useContext } from 'react'
import { UserContext } from '../../managers/userManager'
import logo from '../../assets/img/logoWithText.png'
import logo2 from '../../assets/img/justLogo.png'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
    {
        id: 0,
        name: 'Select gender',
        avatar:
            '',
            value:'M'
    },
    {
        id: 1,
        name: 'Male',
        avatar:
            'https://cdn.icon-icons.com/icons2/38/PNG/512/maleuser_4943.png',
            value:'M'
    },
    {
        id: 2,
        name: 'Female',
        avatar:
            'https://cdn4.iconfinder.com/data/icons/budicon-user-solid/25/female-user-512.png',
            value:'F'
    },
    {
        id: 3,
        name: 'Other',
        avatar:
            'https://media.istockphoto.com/id/1300219145/vector/unisex-washroom-accessibility-icon.jpg?s=612x612&w=0&k=20&c=EVvjtcwm-QAKhZ1cZz83RTSA03lDMpIeeNCAy4ZoWuM=',
            value:'O'
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Register() {
    const [selected, setSelected] = useState(people[0])
    const { handleRegister } = useContext(UserContext)
    return (
        <div className='w-screen  p-5'>
            <div className="  ">
                <img
                    className="mx-auto h-15 rounded-2xl "
                    src={logo2}
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Create your account
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

                    <label className="block text-sm font-medium leading-6 text-gray-900 ">
                        gender
                    </label>
                    <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                            <>
                                <div className="relative mt-2">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                        <span className="flex items-center">
                                            <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                            <span className="ml-3 block truncate">{selected.name}</span>
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {people.map((person) => (
                                                
                                                <Listbox.Option
                                                    key={person.id}
                                                    className={({ active }) =>
                                                        classNames(
                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                                        )
                                                    }
                                                    value={person}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                >
                                                                    {person.name}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                    )}
                                                                >
                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                    {/* <div>
                        <label htmlFor='psycho'>man</label>
                        <input id='psycho' type='radio' name='gender' value={"M"}></input>
                        <label htmlFor='user'>women</label>
                        <input id='user' type='radio' name='gender' value={"W"}></input>
                        <label htmlFor='user'>other</label>
                        <input id='user' type='radio' name='gender' value={"O"}></input>
                    </div> */}
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                        Role
                    </label>
                    <div className='flex gap-2'>
                        <label htmlFor='psycho'>Therapist</label>
                        <input id='psycho' type='radio' name='role' value={"PF"}></input>
                        <label htmlFor='user'>User</label>
                        <input id='user' type='radio' name='role' value={"user"}></input>
                    </div>
                    <p><b>NOTE:</b> In order to register as a therapist you'll need further validation with our staff.</p>
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
