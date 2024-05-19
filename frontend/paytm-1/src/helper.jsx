import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/v1';

const handleOnSignup = async (name, password) => {
    try {
        const response = await axios.post(`${baseUrl}/user/signup`, {
        name: name,
        password: password
        });
        console.log(response);
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
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}



export {
    handleOnSignup,
    handleOnLogin
}

