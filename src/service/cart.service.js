import axios from 'axios';
import authHeader from './auth-header';

const api = import.meta.env.VITE_APP_API_LG;

class CartService {
    async addProductToCart(payload) {
        try {
            const response = await axios.post(api + 'cart/add?a=1', payload, {
                headers: authHeader(),
                timeout: 10000
            });
            console.log(response);
            return response.data.metadata;
        } catch (error) {
            throw error; // Hoặc xử lý lỗi theo cách bạn muốn
        }
    }

    async updateProductToCart(payload) {
        try {
            const response = await axios.post(api + `cart/add?a=0`, payload, {
                headers: authHeader(),
                timeout: 10000
            });
            if (response.data) {
                console.log('Update product to cart success');
            }
            return response.data.metadata;
        } catch (error) {
            throw error;
        }
    }

    async removeProductToCart(ids) {
        try {
            const response = await axios.post(
                api + 'cart/remove',
                { ids },
                {
                    headers: authHeader(),
                    timeout: 10000
                }
            );
            return response.data.metadata;
        } catch (error) {
            console.error('Error removing product from cart:', error);
            throw error;
        }
    }

    async getList() {
        try {
            const response = await axios.get(api + 'cart', {
                headers: authHeader(),
                timeout: 10000
            });
            return response.data.metadata;
        } catch (error) {
            console.error('Error removing product from cart:', error);
            throw error;
        }
    }
}

export default new CartService();
