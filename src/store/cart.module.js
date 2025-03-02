import cartService from '@/service/cart.service';
const initalState = {
    items: [],
    total: 0,
    cart: []
};

export const cart = {
    namespaced: true,
    state: initalState,
    getters: {
        getQuantity(state) {
            return state.total;
        }
    },
    actions: {
        fetchData({ commit }) {
            return cartService.getList().then(
                (result) => {
                    commit('setCart', result);
                    const data = {
                        status: 1,
                        type: 'Lấy dữ liệu',
                        message: 'Lấy dữ liệu thành công'
                    };
                    return Promise.resolve(data);
                },
                (error) => {
                    commit('setCartFail', result);
                    const data = {
                        status: 0,
                        type: '0 Lấy dữ liệu',
                        message: 'Lấy dữ liệu 0'
                    };
                    return Promise.resolve(data);
                }
            );
        },
        addToCart({ commit }, product) {
            return cartService.addProductToCart(product).then(
                (result) => {
                    commit('addSuccess', result);
                    const data = {
                        status: 1,
                        type: 'Thay đổi',
                        message: 'Thay đổi thành công!(add)',
                        cart: result
                    };
                    return Promise.resolve(data);
                },
                (error) => {
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
        updateToCart({ commit }, payload) {
            return cartService.updateProductToCart(payload).then(
                (result) => {
                    commit('updateSuccess', result);
                    const data = {
                        status: 1,
                        type: 'Thay đổi',
                        message: 'Thay đổi thành công!(udpate)',
                        cart: result
                    };
                    return Promise.resolve(data);
                },
                (error) => {
                    commit('updateFail');
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
        setCart(state, data) {
            let totalQuantity = 0;
            for (var item of data.products) {
                totalQuantity += item.quantity;
            }

            state.total = totalQuantity;
        },
        setCartFail(state) {},
        updateSuccess(state, data) {
            let totalQuantity = 0;
            for (var item of data.products) {
                totalQuantity += item.quantity;
            }

            state.total = totalQuantity;
        },
        updateFail(state) {},
        addSuccess(state, data) {
            let totalQuantity = 0;
            for (var item of data.products) {
                totalQuantity += item.quantity;
            }

            state.total = totalQuantity;
        },
        addFail(state, cartData) {},
        removeSuccess(state) {
            // state
        },
        removeFail() {}
    }
};
