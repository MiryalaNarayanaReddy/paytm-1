import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { WraperCard } from "../components/HelperCards";
import { ButtonCard, InputCard } from "../components/HelperCards";


function SendMoney() {

    // get things from params   

    const [searchParams, setSearchParams] = useSearchParams();

    const name = searchParams.get('name');
    
    const id = searchParams.get('id');

    const [amount, setAmount] = useState(0);




  return (
 
    <WraperCard title="Send Money">
        <div className="text-xl">Send Money to <div className="text-blue-500">{name}</div></div>
        <InputCard title="Amount" type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <ButtonCard title="Send Money" onClick={() => handleOnSendMoney(amount, id)} />

    </WraperCard>


  );
}

export default SendMoney;