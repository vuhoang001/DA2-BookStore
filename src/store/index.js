import { createStore } from 'vuex';
import { auth } from './auth.module';
import { cart } from './cart.module';

const store = createStore({
    modules: {
        auth,
        cart
    }
});
export default store;
