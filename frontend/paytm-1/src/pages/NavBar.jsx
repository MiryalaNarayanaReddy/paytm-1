import React, { useEffect } from 'react'
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom'


// hover effect
function NavItem({ title, href }) {
    return (
        <div className="col-span-2 text-center p-2 rounded-lg text-xl">
            <a className="hover:text-gray-700 hover:bg-white p-2 rounded-lg transition duration-500" href={href}>
                {title}
            </a>

        </div>
    )
}


function NavBar() {
    useEffect(() => {
        console.log('NavBar rendered')
        if (localStorage.getItem('token')) {
            console.log('token found')
            const token = localStorage.getItem('token')
            if (jwtDecode(token).exp < Date.now() / 1000) {
                console.log('token expired')
                localStorage.clear()
                Navigate('/login')
            }
        }
    }, [])
    return (
        <div className="grid grid-cols-12 gap-4 bg-gray-700 p-4 text-white">

            <NavItem title="Paytm" href="/home" />


            {
                localStorage.getItem('token') ?
                    <>


                        <NavItem title="Users" href="/otherusers" />
                        <NavItem title="Transactions" href="/transactions" />
                        <div className="col-span-6 pt-2 justify-end flex">
                            <NavItem title="Logout" href="/logout" onClick={() => {
                                localStorage.removeItem('token')
                                Navigate('/login')
                            }} />
                        </div>
                    </>
                    :
                    <>
                        <div className="col-span-10 flex justify-end">
                            <div className="grid grid-cols-5">
                                <NavItem title="Login" href="/login" />
                                <div className="col-span-1 text-center pt-2">/</div>
                                <NavItem title="Signup" href="/signup" />
                            </div>
                        </div>

                    </>
            }
        </div>
    )
}

export default NavBar