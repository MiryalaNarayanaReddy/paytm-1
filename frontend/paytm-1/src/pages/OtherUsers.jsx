import React, { useState } from "react";

import { getOtherUsers } from "../helper";
import { ButtonCard } from "../components/HelperCards";
import { Navigate } from "react-router-dom";



function OtherUsers() {

    const [users, setUsers] = useState([])

    const onSend = (name, id) => {

        // history.push('/sendmoney/', { name, id   });

        // Navigate('/sendmoney', { name, id });

        window.location.href = `/sendmoney?name=${name}&id=${id}`;

    }

    React.useEffect(() => {
        getOtherUsers().then((data) => {
            setUsers(data);
        });
    }, []);

    return (
        <div>
            <div className="text-2xl p-4 m-4">Other Users</div>

            <div className="m-4 p-4">

                <div className="grid grid-cols-12  ">
                    {
                        users.map((user) => {
                            return (

                                <div className="col-span-2 bg-gray-300 p-4 m-4 rounded-lg shadow-lg" key={user.id}>

                                    <div className="grid grid-cols-8">
                                        <div className="col-span-4 ml-4 font-bold">
                                            <p>{user.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
                                        </div>

                                        <div className="col-span-4 ml-4">
                                            <ButtonCard title="Send Money" onClick={() => onSend(user.name, user.id)} />
                                        </div>
                                    </div>
                                </div>

                            );
                        })
                    }


                </div>
            </div>
        </div>
    )
}





export default OtherUsers;