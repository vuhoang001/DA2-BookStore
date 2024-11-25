import cartService from '@/service/cart.service';

const initalState = {
    items: [],
    total: 0
};

export const cart = {
    namespaced: true,
    state: initalState,
    actions: {
        addToCart({ commit }, product) {
            return cartService.addProductToCart(product).then(
                (result) => {
                    commit('addSuccess', result);
                    const data = {
                        status: 1,
                        type: 'Thay đổi',
                        message: 'Thay đổi thành công!',
                        cart: result
                    };
                    return Promise.resolve(data);
                },
                (error) => {
                    console.log(error);
                    commit('addFail');
                    const data = {
                        status: 0,
                        type: 'Thay đổi',
                        message: error
                    };
                    return Promise.resolve(data);
                }
            );
        },
        removeProduct({ commit }, ids) {
            return cartService.removeProductToCart(ids).then(
                (result) => {
                    commit('removeSuccess');
                    const data = {
                        status: 1,
                        type: 'Xóa',
                        message: 'Xóa thành công!', 
                        message2: result
                    };
                    return Promise.resolve(data);
                },
                (error) => {
                    commit('removeFail');
                    const data = {
                        status: 0,
                        type: 'Xóa',
                        message: 'Xóa thất bại',
                        message2: error
                    };
                    return Promise.resolve(data);
                }
            );
        }
    },
    mutations: {
        addSuccess(state, cartData) {
            state.items = cartData.items;
        },
        addFail(state, cartData) {},
        removeSuccess(state) {
            // state
        },
        removeFail() {}
    }
};
