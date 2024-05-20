import React from "react";
import { WraperCard } from "../components/HelperCards";
import { ButtonCard } from "../components/HelperCards";
import { getTransactionHistory } from "../helper";

// history of transactions

function RecievedCard({ transaction }) {
    return (

        <div className="col-span-12 m-4 font-bold bg-green-300 rounded-lg shadow-lg p-4">
            <div className="text-lg">Recieved from</div>
            <div className= "text-right text-xl">
                {transaction.sender.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
            <div className="text-lg">Amount</div>
            <div className="text-right text-3xl">{transaction.amount}</div>
        </div>

    );
}

function SentCard({ transaction }) {

    return (
        <div className="col-span-12 m-4 font-bold bg-red-300 rounded-lg shadow-lg p-4">
            <div className="text-lg">Sent to</div>

            <div className= "text-right text-xl">
                {transaction.receiver.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
            <div className="text-lg">Amount</div>
            <div className="text-right text-3xl">{transaction.amount}</div>
        </div>
    );
}


function Transactions() {


    const [transactions, setTransactions] = React.useState([]);

    React.useEffect(() => {
        getTransactionHistory().then((data) => {
            setTransactions(data);
            // { sender, receiver, amount}
        });
    }, []);

    return (
        <WraperCard title="Transaction History">
            <div className="grid grid-cols-12  ">

                {
                    transactions.map((transaction) => {
                        if (transaction.sender === localStorage.getItem('name')) {
                            return <SentCard transaction={transaction} />
                        }
                        else {
                            return <RecievedCard transaction={transaction} />
                        }
                    })
                }
            </div>
        </WraperCard>
    );
}

export default Transactions;

