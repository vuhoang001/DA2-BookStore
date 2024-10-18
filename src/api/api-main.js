import axios from 'axios';
import authHeader from '@/service/auth-header';
const api = import.meta.env.VITE_APP_API;

class API {
    async get(path) {
        const url = api + path;
        try {
            const res = await axios.get(url, {
                headers: authHeader(),
                timeout: 1000
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async create(path, params) {
        const url = api + path;
        try {
            const res = await axios.post(url, params, {
                headers: authHeader(),
                timeout: 1000
            });
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    async update(path, params) {
        const url = api + path;
        try {
            const res = await axios.patch(url, params, {
                headers: authHeader(),
                timeout: 1000
            });
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    async updateV2(path, params) {
        const url = api + path;
        try {
            const res = await axios.put(url, params, {
                headers: authHeader(),
                timeout: 1000
            });
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    async delete(path, params) {
        const url = api + path;
        try {
            const res = await axios.delete(url, params, {
                headers: authHeader(),
                timeout: 1000
            });
            return res;
        } catch (err) {
            console.log(err);
        }
    }
}

export default new API();
