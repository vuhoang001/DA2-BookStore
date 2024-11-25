import axios from 'axios';
import authHeader from './auth-header';

const api = import.meta.env.VITE_APP_API_LG;

class CartService {
    addProductToCart(payload) {
        return axios
            .post(api + 'cart/add', payload, {
                headers: authHeader(),
                timeout: 10000
            })
            .then((res) => {
                if (res.data) {
                    console.log(123);
                }
                return res.data;
            });
    }
    removeProductToCart(ids) {
        return axios
            .post(api + 'cart/remove', ids, {
                headers: authHeader(),
                timeout: 10000,
                data: { ids }
            })
            .then((res) => {
                if (res.data) {
                }
                return res.data;
            });
    }
}

export default new CartService();
