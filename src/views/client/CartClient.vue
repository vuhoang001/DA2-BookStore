<template>
    <Toast />
    <loading v-if="loadingPage"></loading>
    <div class="my-5">
        <div><span class="text-3xl font-semibold text-green-500"> Giỏ hàng </span></div>
        <div class="card mt-5">
            <DataTable v-model:selection="selectedProduct" show-gridlines :value="payload">
                <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
                <Column header="Thông tin sản phẩm" field="book._id" style="max-width: 300px">
                    <template #body="{ data }">
                        <div class="flex items-center justify-between">
                            <router-link :to="{ name: 'DetailBook', params: { slug: data.book.slug } }">
                                <div class="flex items-center gap-5">
                                    <img crossorigin="anonymous" :src="data.book.imageBook" alt="" class="w-[80px] h-[120px] hover:shadow-md" />
                                    <span class="cursor-pointer hover:underline">
                                        {{ data.book.bookName }}
                                    </span>
                                </div>
                            </router-link>
                            <span class="block text-red-500 text-sm hover:underline cursor-pointer" @click="Delete(data.book._id)"> Xóa </span>
                        </div>
                    </template>
                </Column>
                <Column header="Đơn giá" field="book.price">
                    <template #body="{ data }"> {{ currency(data.book.price * ((100 - data.book.discount) / 100), { symbol: 'đ', separator: ',' }).format() }}</template>
                </Column>
                <Column header="Số lượng" field="quantity" style="max-width: 100px">
                    <template #body="{ data, index }">
                        <InputGroup>
                            <Button icon="pi pi-minus" @click="ClickQuantity('m', data, index)" severity="danger" outlined />
                            <InputText v-model="payload[index].quantity" placeholder="Vote" />
                            <Button icon="pi pi-plus" @click="ClickQuantity('a', data, index)" severity="info" outlined />
                        </InputGroup>
                        <div class="text-right">
                            <span class="text-sm text-gray-400 italic text-right"> Số lượng trong kho: {{ data.book.quantity }} </span>
                        </div>
                    </template>
                </Column>
                <Column header="Thành tiền">
                    <template #body="{ data }"> {{ currency(data.book.price * ((100 - data.book.discount) / 100) * data.quantity, { symbol: 'đ', separator: ',' }).format() }}</template>
                </Column>
                <ColumnGroup type="footer">
                    <Row>
                        <Column footer="Totals:" :colspan="3" footerStyle="text-align:right" />
                        <Column :footer="totalAmount" />
                    </Row>
                </ColumnGroup>
            </DataTable>
            <div class="flex gap-4 my-5 justify-end">
                <Button label="Cập nhật" icon="pi pi-shopping-cart" severity="info" @click="Update()"></Button>
                <Button label="Thanh toán" @click="checkout()" icon="pi pi-shopping-cart"></Button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import API from '../../api/api-main';
import { useStore } from 'vuex';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import currency from 'currency.js';
import loading from '../loading.vue';

const store = useStore();
const router = useRouter();
const toast = useToast();
// const dataCart = ref([]);
const selectedProduct = ref();
const payload = ref([]);
const loadingPage = ref(false);

const GetCart = async () => {
    try {
        const data = await API.get('cart');
        payload.value = data.data.metadata.products;
    } catch (error) {
        console.log(error);
    }
};

const Delete = (id) => {
    store.dispatch('cart/removeProduct', id).then((res) => {
        loadingPage.value = true;
        // GetCart();
        window.location.reload();
    });
};

const Update = () => {
    let payloadData = [];
    for (let index = 0; index < payload.value.length; index++) {
        let item = {};
        item.productId = payload.value[index].book._id;
        item.quantity = payload.value[index].quantity;
        if (item.quantity !== 0) {
            payloadData.push(item);
        }
    }

    if (payloadData.length > 0) {
        store.dispatch('cart/updateToCart', payloadData).then((res) => {
            loadingPage.value = true;
            window.location.reload();
        });
    }
};

const ClickQuantity = (action, data, index) => {
    if (action == 'a') {
        if (data.book.quantity > data.quantity) {
            data.quantity += 1;
        } else {
            toast.add({ severity: 'error', summary: 'Lỗi số lượng', detail: 'Số lượng không đủ', life: 3000 });
        }
    }

    if (action == 'm') {
        if (data.quantity >= 2) {
            data.quantity -= 1;
        } else {
            toast.add({ severity: 'error', summary: 'Lỗi số lượng', detail: 'Số lượng quá ít. Vui lòng nhập số lượng >= 1', life: 3000 });
        }
    }
};

onMounted(() => {
    GetCart();
});
const totalAmount = computed(() => {
    let total = 0;
    for (let item of payload.value) {
        total += ((item.book.price * (100 - item.book.discount)) / 100) * item.quantity;
    }
    return currency(total, { symbol: 'đ', separator: ',' }).format();
});
const checkout = async () => {
    const res = await API.create('checkout');
    router.push({ name: 'checkout' });
};
</script>
