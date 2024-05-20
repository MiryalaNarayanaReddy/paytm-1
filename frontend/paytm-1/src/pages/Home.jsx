import React from "react";
import { useState } from "react";
import { getBalanceAmount } from "../helper";
import { createWallet } from "../helper";
import { ButtonCard, WraperCard } from "../components/HelperCards";

function Home() {

    const [balance, setBalance] = useState(0);
    const [wallet, setWallet] = useState(false);
    const [name, setName] = useState('');

    React.useEffect(() => {
        setName(localStorage.getItem('name'));
        
        getBalanceAmount().then((data) => {
            if (data !== -1) {
                setBalance(data);
                setWallet(true);
            }
            
        }
        );

    }, []);

    return (
        <WraperCard title="Home">
            <h1 className="text-2xl">Welcome {name}</h1>
            {/* <h2 className="text-xl">Your balance is {balance}</h2> */}

            {
                wallet ? <h2 className="text-xl">Your balance is {balance}</h2> 
                : <ButtonCard title="Create Wallet" onClick={createWallet} />

            }
        
        </WraperCard>
    )
}
   

export default Home