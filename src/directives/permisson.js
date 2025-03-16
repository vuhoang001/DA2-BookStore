import { useStore } from 'vuex';

export default {
    beforeMount(el, binding) {
        const authStore = useStore();
        console.log(authStore);
    }
};
