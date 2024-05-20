import React from 'react'


function NavBar() {
    return (
        <div className="grid grid-cols-12 gap-4 bg-gray-200 p-4">
            <div className="col-span-5">
                <a href="/home">Paytm</a>
            </div>

            {
                localStorage.getItem('token') ?
                    <>
                        <div className="col-span-3">
                            <a href="/otherusers">users</a>
                        </div>

                        <div className="col-span-2">
                            <a href="/transactions">transactions</a>
                        </div>

                        <div className="col-span-2">
                            <a href="/about">about</a>
                        </div>

                    </>

                    :

                    <>

                        <div className="col-span-7 ">

                        <div className="col-span-1">
                            <a href="/login">login</a>
                        </div>

                        <div className="col-span-1">
                            <a href="/signup">signup</a>
                        </div>
                        </div>
                    </>

            }




        </div>
    )
}

export default NavBar