<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const email = ref('');
const password = ref('');
const checked = ref(false);
const store = useStore();
const router = useRouter();

const Login = () => {
    const user = {
        email: email.value,
        password: password.value
    };

    store.dispatch('auth/login', user).then((res) => {
        if (!res.status) {
            console.log('error');
        } else {
            if (res.user.metadata.information.roles == 'A') {
                router.push('/admin');
            } else {
                router.push('/');
            }
        }
    });
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Chào mừng bạn quay lại BookStore</div>
                        <span class="text-muted-color font-medium">Đăng nhập để tiếp tục</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Địa chỉ email" class="w-full md:w-[30rem] mb-8" v-model="email" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"> Mật khẩu</label>
                        <Password id="password1" v-model="password" placeholder=" Mật khẩu" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Ghi nhớ tôi</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"> Quên mật khẩu?</span>
                        </div>
                        <Button label="Đăng nhập" class="w-full" @click="Login()"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
