import axios from 'axios';
import { Navigate } from 'react-router-dom';

const baseUrl = 'http://localhost:3001/api/v1';

const handleOnSignup = async (name, password) => {
    try {
        const response = await axios.post(`${baseUrl}/user/signup`, {
            name: name,
            password: password
        });
        // console.log(response);
        if (response.status === 201) {
            console.log('User created successfully');
            alert('Signup successful');
            Navigate('/login');
        }
    } catch (error) {
        console.error(error);
    }
}

const handleOnLogin = async (name, password) => {
    try {
        const response = await axios.post(`${baseUrl}/user/login`, {
            name: name,
            password: password
        });
        // console.log(response);
        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('id', response.data.id);

            console.log('User logged in successfully');
            const d = alert('Login successful');

            if (d) {
                // window.location.href = '/home';
                Navigate('/home');
            }
        }
    } catch (error) {
        console.error(error);
    }
}

const getOtherUsers = async () => {
    try {
        const response = await axios.get(`${baseUrl}/transaction/otherusers`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log(response);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

const getBalanceAmount = async () => {
    try {
        const response = await axios.get(`${baseUrl}/wallet/balance`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log(response);
        if (response.status === 200) {
            // return response.data.balance
            console.log(response.data.balance);
            return response.data.balance;
        }
    } catch (error) {       
        console.error(error);
        return -1;

    }
}

const handleOnSendMoney = async (amount, id) => {
    try {
        const response = await axios.post(`${baseUrl}/transaction/send`, {
            amount: amount,
            to_id: id
        }, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log(response);
        if (response.status === 201) {
            // alert('Money sent successfully');
            const d = alert(response.data.message);

            if (d) {
                Navigate('/otherusers');
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}




const getTransactionHistory = async () => {
    try {
        const response = await axios.get(`${baseUrl}/transaction/history`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log(response);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error(error);
    }
}

const createWallet = async () => {
    try {
        const response = await axios.post(`${baseUrl}/wallet/create`, {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        // console.log(response);
        if (response.status === 201) {
            alert('Wallet created successfully');
            window.location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}





export {
    handleOnSignup,
    handleOnLogin,

    getOtherUsers,
    getBalanceAmount,
    createWallet,

    handleOnSendMoney,
    getTransactionHistory
}

