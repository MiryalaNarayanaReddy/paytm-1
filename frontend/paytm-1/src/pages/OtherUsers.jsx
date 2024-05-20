import React, { useState } from "react";

import { getOtherUsers } from "../helper";
import { ButtonCard } from "../components/HelperCards";

function OtherUsers() {
    
    const [users, setUsers] = useState([]);
    
    React.useEffect(() => {
        getOtherUsers().then((data) => {
            setUsers(data);
        });
    }, []);
    
    return (
        <div>
            <h1>Other Users</h1>
            <div>
                {
                    users.map((user) => {
                        return (
                            <div key={user.id}>
                                <h2>{user.name}</h2>

                                <ButtonCard title="Send Money" onClick={() => { window.location.href = `/sendmoney/${user.id}` }} />

                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}



export default OtherUsers;