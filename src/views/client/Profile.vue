<template>
    <Toast />
    <div class="flex gap-5">
        <div class="basis-3/12 min-h-[755px] flex flex-col justify-between card border">
            <div class="flex gap-4 flex-col items-center">
                <div class="relative">
                    <img crossorigin="anonymous" class="rounded-full w-[15rem] h-[15rem] object-cover" :src="dataUser.thumbnail" />
                    <i @click="OpenFile()" class="pi pi-pencil absolute bottom-[30px] right-[6px] text-green-600 bg-white border-green-200 border p-2 rounded-full cursor-pointer hover:text-white hover:bg-green-400"></i>
                </div>
                <strong>{{ dataUser.name }}</strong>
                <!-- <Button @click="OpenFile()" label="Chọn ảnh" text icon="pi pi-cloud-upload" class="text-white btn-up-file"></Button> -->
                <input type="file" class="hidden click-file" @change="UploadFileLocal($event, 0)" />
            </div>
            <div>
                <Button @click="logout()" class="w-full" icon="pi pi-sign-out" severity="danger" label="Đăng xuất"></Button>
            </div>
        </div>
        <div class="basis-9/12">
            <Tabs value="0">
                <TabList>
                    <Tab value="0">Thông tin chung</Tab>
                    <Tab value="1">Lịch sử mua hàng</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0">
                        <div class="card border">
                            <h4 class="font-bold text-xl mb-4">Thông tin người dùng</h4>

                            <div class="flex gap-8">
                                <div class="basis-1/2 flex flex-col gap-4">
                                    <div class="flex flex-col gap-2">
                                        <label for=""> Tên hiển thị</label>
                                        <InputText class="w-full" v-model="dataUser.name" readonly="true"></InputText>
                                    </div>
                                    <!-- <div class="flex flex-col gap-2">
                            <label for=""> Họ và tên </label>
                            <InputText class="w-full" readonly></InputText>
                        </div> -->
                                    <div class="flex flex-col gap-2">
                                        <label for=""> Địa chỉ</label>
                                        <InputText class="w-full" v-model="dataUser.address" readonly></InputText>
                                    </div>
                                </div>
                                <div class="basis-1/2 flex flex-col gap-4">
                                    <div class="flex flex-col gap-2">
                                        <label for="">Tên đăng nhập/Email</label>
                                        <InputText class="w-full" v-model="dataUser.email" readonly></InputText>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for=""> Số điện thoại</label>
                                        <InputText class="w-full" v-model="dataUser.phone" readonly></InputText>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end mt-4">
                                <Button label="Chỉnh sửa thông tin" @click="toggleDialog()"></Button>
                            </div>
                        </div>
                        <Dialog v-model:visible="visible" modal header="Chỉnh sửa thông tin" :style="{ width: '25%' }">
                            <span class="text-surface-500 dark:text-surface-400 block mb-8">Chỉnh sửa thông tin</span>
                            <div class="flex flex-col gap-4 mb-4">
                                <label for="username" class="font-semibold">Tên hiển thị</label>
                                <InputText id="username" v-model="payload.name" :placeholder="payload.name" class="flex-auto" autocomplete="off" />
                            </div>
                            <div class="flex flex-col gap-4 mb-8">
                                <label for="email" class="font-semibold"> Số điện thoại</label>
                                <InputText id="email" class="flex-auto" :placeholder="payload.phone" v-model="payload.phone" autocomplete="off" />
                            </div>
                            <div class="flex flex-col gap-4 mb-8">
                                <label for="email" class="font-semibold">Địa chỉ</label>
                                <InputText id="email" class="flex-auto" :placeholder="payload.address" v-model="payload.address" autocomplete="off" />
                            </div>

                            <div class="flex justify-end gap-2">
                                <Button type="button" label="Hủy" icon="pi pi-times" severity="secondary" @click="visible = false"></Button>
                                <Button type="button" label="Lưu" icon="pi pi-pencil" @click="updateData()"></Button>
                            </div>
                        </Dialog>
                        <div class="card border">
                            <h4 class="font-bold text-xl mb-4">Đổi mật khẩu</h4>
                            <div class="flex gap-8">
                                <div class="basis-1/2 flex flex-col gap-6">
                                    <div class="flex flex-col gap-2">
                                        <label for="">Mật khẩu hiện tại</label>
                                        <InputText v-model="PayloadCP.oldPassword" type="password" class="w-full"></InputText>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for="">Mật khẩu mới</label>
                                        <InputText v-model="PayloadCP.newPassword" type="password" class="w-full"></InputText>
                                    </div>
                                    <div class="flex flex-col gap-2">
                                        <label for="">Nhập lại mật khẩu</label>
                                        <InputText v-model="PayloadCP.newPasswordAgain" type="password" class="w-full"></InputText>
                                    </div>
                                </div>
                                <div class="basis-1/2">
                                    <div class="flex flex-col gap-3">
                                        <div class="flex gap-2 items-center">
                                            <i class="pi pi-lock"></i>
                                            <p>Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác</p>
                                        </div>
                                        <div class="flex gap-2 items-center">
                                            <i class="pi pi-exclamation-triangle"></i>
                                            <p>Mật khẩu tài khoản của bạn phải đáp ứng các yêu cầu sau:</p>
                                        </div>
                                        <ul class="flex flex-col gap-3 m-0">
                                            <li>Có ít nhất 8 ký tự</li>
                                            <li>Có ít nhất một chữ hoa và một chữ thường</li>
                                            <li>Có ít nhất một chữ số</li>
                                            <li>Có ít nhất một ký tự đặc biệt</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end">
                                <Button class="px-4 py-2 text-white rounded-md" @click="updatePassword()">Cập nhật mật khẩu</Button>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value="1">
                        <p class="m-0">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                            enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                        </p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../api/api-main';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const dataUser = ref('');
const visible = ref(false);
const payload = ref({
    name: '',
    address: '',
    phone: ''
});

const PayloadCP = ref({
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: ''
});

const GetData = async () => {
    try {
        const res = await API.get('getme');
        dataUser.value = res.data.metadata;
        console.log(dataUser.value);
    } catch (error) {}
};
const toggleDialog = async () => {
    visible.value = true;
    payload.value.name = dataUser.value.name;
    payload.value.address = dataUser.value.address;
    payload.value.phone = dataUser.value.phone;
};

const updatePassword = async () => {
    const validate = validatePassword(PayloadCP.value.newPassword, PayloadCP.value.passwordAgain);
    if (validate !== 0) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: validate, life: 3000 });
        retunr;
    }

    try {
        const res = await API.update('change-password', PayloadCP.value);
        if (res && res.status == 200) {
            toast.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Thông tin đã được cập nhật', life: 3000 });
        } else {
            toast.add({ severity: 'warn', summary: 'Cập nhật thất bại', detail: 'Lỗi thay đổi mật khẩu', life: 3000 });
        }
    } catch (error) {
        toast.add({ severity: 'warn', summary: 'Cập nhật thất bại', detail: error, life: 3000 });
    }
};

function validatePassword(password, passwordAgain) {
    // Kiểm tra độ dài tối thiểu là 8 ký tự
    if (password.length < 8) {
        return 'Mật khẩu phải có ít nhất 8 ký tự.';
    }

    if (password !== passwordAgain) {
        return 'Mật khẩu mới không trùng.';
    }

    // Kiểm tra có ít nhất một chữ hoa và một chữ thường
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        return 'Mật khẩu phải có ít nhất một chữ hoa và một chữ thường.';
    }

    // Kiểm tra có ít nhất một chữ số
    if (!/[0-9]/.test(password)) {
        return 'Mật khẩu phải có ít nhất một chữ số.';
    }

    // Kiểm tra có ít nhất một ký tự đặc biệt
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return 'Mật khẩu phải có ít nhất một ký tự đặc biệt.';
    }

    // Nếu tất cả các điều kiện đều đúng
    return 0;
}

const logout = async () => {
    localStorage.removeItem('user');
    try {
        const res = await API.create('logout');
        router.push('auth/login');
    } catch (error) {
        console.log(error);
    }
};

const updateData = async () => {
    try {
        const res = await API.update('updateMe', payload.value);
        if (res && res.status == 200) {
            visible.value = false;
            toast.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Thông tin đã được cập nhật', life: 3000 });
            GetData();
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Cập nhật thất bại', detail: error, life: 3000 });
    }
};
const OpenFile = () => {
    document.querySelectorAll('.click-file')[0].click();
};

const UploadFileLocal = async (event, index) => {
    const file = event.target.files[0];
    const form = new FormData();
    form.append('files', file);
    try {
        const res = await API.update('update-image', form);
        if (res && res.data) {
            toast.add({ severity: 'success', summary: 'Cập nhật thành công', detail: 'Thông tin đã được cập nhật', life: 3000 });
            GetData();
        } else {
            toast.add({ severity: 'error', summary: 'Cập nhật thất bại', detail: error, life: 3000 });
        }
    } catch (error) {}
    console.log(file);
};

onMounted(() => {
    GetData(); //Hàm gọi data
});
</script>
