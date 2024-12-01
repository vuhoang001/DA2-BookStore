<template>
    <Toast />
    <div class="flex gap-5">
        <div class="basis-2/12 min-h-[755px] flex flex-col justify-between card border">
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
        <div class="basis-10/12">
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
                                        <Textarea rows="4" class="w-full" v-model="dataUser.address" readonly></Textarea>
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
                        <Dialog v-model:visible="visible" modal header="Chỉnh sửa thông tin" :style="{ width: '55%' }">
                            <span class="text-surface-500 dark:text-surface-400 block mb-8">Chỉnh sửa thông tin</span>
                            <div class="flex flex-col gap-4 mb-6">
                                <label for="username" class="font-semibold">Tên hiển thị</label>
                                <InputText id="username" v-model="payload.name" class="flex-auto" autocomplete="off" />
                            </div>
                            <div class="flex flex-col gap-4 mb-6">
                                <label for="email" class="font-semibold"> Số điện thoại</label>
                                <InputText id="email" class="flex-auto" v-model="payload.phone" autocomplete="off" />
                            </div>
                            <div class="flex flex-col gap-4 mb-6">
                                <label for="email" class="font-semibold">Địa chỉ</label>
                                <InputText id="email" class="flex-auto" v-model="DetailAddress.detail" autocomplete="off" />
                            </div>
                            <div class="flex gap-2 mb-6">
                                <Select v-model="selectedCity" :options="cities" option-label="province_name" :placeholder="DetailAddress.city" @change="onChangeCities" class="w-full"></Select>
                                <Select v-model="selectedDistrict" :placeholder="DetailAddress.district" :options="districts" @change="onChangeDistrict" option-label="district_name" class="w-full"></Select>
                                <Select v-model="selectedWards" :placeholder="DetailAddress.ward" :options="wards" option-label="ward_name" class="w-full"></Select>
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
                        <history-purchase></history-purchase>
                     
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
import HistoryPurchase from './components/HistoryPurchase.vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const dataUser = ref('');
const visible = ref(false);
const cities = ref();
const selectedCity = ref();
const districts = ref();
const selectedDistrict = ref();
const selectedWards = ref();
const wards = ref();
const payload = ref({
    name: '',
    address: '',
    phone: ''
});

const DetailAddress = ref({
    city: '',
    district: '',
    ward: '',
    detail: ''
});

const PayloadCP = ref({
    oldPassword: '',
    newPassword: '',
    newPasswordAgain: ''
});
const GetCity = async () => {
    const res = await API.get('address');
    cities.value = res.data.metadata;
};

const onChangeCities = async () => {
    const res = await API.get(`address/district/${selectedCity.value.province_id}`);
    districts.value = res.data.metadata;
};

const onChangeDistrict = async () => {
    const res = await API.get(`address/ward/${selectedDistrict.value.district_id}`);
    wards.value = res.data.metadata;
};

const GetData = async () => {
    try {
        const res = await API.get('getme');
        dataUser.value = res.data.metadata;
        SetDetailAdress();
    } catch (error) {}
};
const toggleDialog = async () => {
    visible.value = true;
    payload.value.name = dataUser.value.name;
    payload.value.address = dataUser.value.address;
    payload.value.phone = dataUser.value.phone;
};

const updatePassword = async () => {
    const validate = validatePassword(PayloadCP.value.newPassword, PayloadCP.value.newPasswordAgain);
    if (validate !== 0) {
        toast.add({ severity: 'error', summary: 'Lỗi', detail: validate, life: 3000 });
        return;
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
    if (!selectedCity.value || !selectedDistrict.value || !selectedWards.value) {
        toast.add({ severity: 'error', summary: 'Cập nhật thất bại', detail: 'Vui lòng nhập đầy đủ trường', life: 3000 });
        return;
    }
    payload.value.address = DetailAddress.value.detail + ', ' + selectedWards.value.ward_name + ', ' + selectedDistrict.value.district_name + ', ' + selectedCity.value.province_name;

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

const SetDetailAdress = () => {
    if (!dataUser.value.address) {
        console.log('Address is empty');
        return;
    }
    const addressParts = dataUser.value.address.split(',').map((part) => part.trim());

    const length = addressParts.length;

    DetailAddress.value.city = addressParts[length - 1];
    DetailAddress.value.district = addressParts[length - 2];
    DetailAddress.value.ward = addressParts[length - 3];

    DetailAddress.value.detail = addressParts.slice(0, length - 3).join(', ') || ''; // phần còn lại là detail
};

onMounted(() => {
    GetData(); //Hàm gọi data
    GetCity();
});
</script>
