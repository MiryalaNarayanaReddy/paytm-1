import React, { useState } from 'react';
import axios from 'axios';
import {WraperCard, InputCard, ButtonCard} from '../components/HelperCards';
import { handleOnSignup } from '../helper';

function Signup() {

  const [name, setName] = useState('');
  const [password,setPassword] = useState('')

  return (
    <WraperCard title="Signup">
      <InputCard title="Name" type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
      <InputCard title="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <ButtonCard title="Signup" onClick={() => handleOnSignup(name, password)} />
    </WraperCard>
  )
}

export default Signup;