<template>
    <Toast />
    <div>
        <div class="flex p-6">
            <div class="basis-1/2 flex justify-center">
                <img class="w-[60%] h-auto" :src="author.image" alt="" />
            </div>

            <div class="basis-1/2">
                <div class="flex flex-col gap-5">
                    <div class="text-bold text-3xl">{{ DetailBook.bookName }}</div>
                    <div>
                        Tác giả: <span class="uppercase font-semibold">{{ DetailBook.authorBook?.authorName }}</span>
                    </div>
                    <div class="flex gap-4 items-center">
                        <span class="italic line-through">{{ formatCurrency(DetailBook.price) }}</span>
                        <span class="text-2xl">{{ formatCurrency(DetailBook.price * ((100 - book.discount) / 100)) }}</span>
                        <Button :label="book.discount + ' %'" severity="info"></Button>
                    </div>
                    <Divider></Divider>

                    <div class="flex gap-10 items-center">
                        <div class="basis-4/12">
                            <InputGroup>
                                <Button icon="pi pi-minus" @click="ClickQuantity('m')" severity="danger" outlined />
                                <InputText v-model="payload.quantity" placeholder="Vote" />
                                <Button icon="pi pi-plus" @click="ClickQuantity('a')" severity="info" outlined />
                            </InputGroup>
                        </div>
                        <div class="basis-auto">Còn lại {{ DetailBook.quantity }} trong kho</div>
                    </div>

                    <div class="flex gap-3">
                        <div class="basis-6/12">
                            <Button label="Thêm vào giỏ" @click="addCart(DetailBook, action)" class="w-full" outlined></Button>
                        </div>
                        <div class="basis-6/12">
                            <router-link :to="{ name: 'cart' }">
                                <Button label="Mua ngay" @click="addCart(DetailBook, action)" class="w-full"></Button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex gap-4">
            <div class="basis-7/12">
                <div class="p-4">
                    <span class="text-3xl pb-[20px] block"> Giới thiệu về sách </span>
                    <div>
                        {{ DetailBook.bookDescription }}
                    </div>
                </div>
            </div>
            <div class="basis-5/12">
                <div class="p-4">
                    <span class="text-3xl pb-[20px] block"> Thông tin chi tiết </span>
                    <div class="grid grid-cols-2 border-2 p-3">
                        <div class="pb-2">Tác giả</div>
                        <div>{{ author.name }}</div>
                        <div class="pb-2">Dịch giả</div>
                        <div>aayyp</div>
                        <div class="pb-2">Nhà xuất bản</div>
                        <div>Nhà xuất bản</div>
                        <div class="pb-2">Kích thước</div>
                        <div>Kích thước</div>
                        <div class="pb-2">Số trang</div>
                        <div>Số trang</div>
                        <div class="pb-2">Ngày phát hành</div>
                        <div>Ngày phát hành</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import API from '../../api/api-main';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRoute();
const DetailBook = ref({});

// idSanpham, tenSanPham, soLuong
const payload = ref({
    tenSanPham: '',
    quantity: 1
});

const GetDetailBook = async () => {
    const slug = router.params.slug;
    try {
        const res = await API.get(`book/${slug}`);
        if (res && res.data) {
            DetailBook.value = res.data.metadata;
        }
    } catch (error) {
        console.log(error);
    }
};

onBeforeMount(() => {
    GetDetailBook();
});

const ClickQuantity = (action) => {
    if (action == 'a') {
        if (DetailBook.value.quantity > payload.value.quantity) {
            payload.value.quantity += 1;
        }
    } else {
        if (payload.value.quantity >= 1) {
            payload.value.quantity -= 1;
        }
    }
};

const addCart = async (detailBook) => {
    if (payload.value.quantity == 0 || payload.value.quantity > DetailBook.value.quantity) {
        toast.add({ severity: 'error', summary: 'Thêm vào giỏ', detail: 'Số lượng sách không hợp lệ', life: 3000 });
        return;
    }
    try {
        const res = await API.create('cart/add?a=1', [{ productId: detailBook._id, quantity: payload.value.quantity }]);
        console.log(res.data);
        if (res && res.data.status == 200) {
            toast.add({ severity: 'success', summary: 'Thêm vào giỏ', detail: 'Thành công', life: 3000 });
        }
    } catch (error) {
        console.log(error);
    }
};
// skip
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(value);
};
const author = {
    name: 'Khanh le',
    description:
        'Sinh năm 1978, hiện đang giảng dạy đại học ngành kỹ thuật, nghiên cứu về hệ thống kế hạ thống điều khiển và tự động hóa. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam unde animi pariatur possimus! Molestias assumenda officia totam voluptates nostrum odit iure tempore similique deleniti, architecto itaque harum perferendis illo cum',
    image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain',
    text: 'Nếu cầu muốn một iều gì đó lớn, cả vũ trụ sẽ hin thc giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.',
    translater: 'Nguyen Cong Nam',
    publisher: 'The gioi',
    size: '14x20.5 cm',
    totalPages: 212,
    releaseTime: '20 / 12 / 2024'
};

const book = {
    bookName: 'TENTANG KAMY',
    price: 100000,
    discount: 20,
    quantity: 99
};
</script>
