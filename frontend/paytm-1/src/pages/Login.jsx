import React, {useState} from 'react';
import axios from 'axios';
import {WraperCard, InputCard, ButtonCard} from '../components/HelperCards';
import { handleOnLogin } from '../helper';


function Login() {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    return (
        <WraperCard title="Login">
            <InputCard title="Name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            <InputCard title="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <ButtonCard title="Login" onClick={() => handleOnLogin(name, password)} />
        </WraperCard>
    )
}

export default Login