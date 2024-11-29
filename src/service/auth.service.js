import axios from 'axios';
const api = import.meta.env.VITE_APP_API_LG;

class AuthServices {
    funLogin(user) {
        return axios.post(api + 'login', user).then((res) => {
            if (res.data) {
                const currentDate = new Date();
                const expireTokenTime = new Date(currentDate.getTime() + res.data.metadata.atokenExp * 60 * 1000).toString();
                const jToken = { ExpireToken: expireTokenTime, ...res.data };
                localStorage.setItem('user', JSON.stringify(jToken));
            }
            return res.data;
        });
    }

    funcLoggout() {
        localStorage.removeItem('user');
        return axios.post()
    }
    funRegister(user) {
        return axios.post(api + 'signup', user).then((res) => {
            return res.data;
        });
    }
}

export default new AuthServices();
