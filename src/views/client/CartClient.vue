<template>
    <Toast />
    <div class="my-5">
        <div><span class="text-3xl font-semibold text-green-500"> Giỏ hàng </span></div>
        <div class="card mt-5">
            <DataTable v-model:selection="selectedProduct" show-gridlines :value="payload">
                <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
                <Column selection-mode="multiple" header-style="width: 3rem"></Column>
                <Column header="Thông tin sản phẩm" field="book._id" style="max-width: 300px">
                    <template #body="{ data }">
                        <router-link :to="{ name: 'DetailBook', params: { slug: data.book.slug } }">
                            <div class="flex items-center gap-5">
                                <img crossorigin="anonymous" :src="data.book.imageBook" alt="" class="w-[80px] h-[120px]" />
                                <span>
                                    {{ data.book.bookName }}
                                </span>
                            </div>
                        </router-link>
                    </template>
                </Column>
                <Column header="Đơn giá" field="book.price"></Column>
                <Column header="Số lượng" field="quantity" style="max-width: 150px">
                    <template #body="{ data, index }">
                        <InputGroup>
                            <Button icon="pi pi-minus" @click="ClickQuantity('m', data, index)" severity="danger" outlined />
                            <InputText v-model="payload[index].quantity" placeholder="Vote" />
                            <Button icon="pi pi-plus" @click="ClickQuantity('a', data, index)" severity="info" outlined />
                        </InputGroup>
                    </template>
                </Column>
                <Column header="Thành tiền">
                    <template #body="{ data }">
                        {{ data.book.price * data.quantity }}
                    </template>
                </Column>
                <ColumnGroup type="footer">
                    <Row>
                        <Column footer="Totals:" :colspan="4" footerStyle="text-align:right" />
                        <Column :footer="totalAmount" />
                    </Row>
                </ColumnGroup>
            </DataTable>
            <div class="flex gap-4 my-5 justify-end">
                <Button label="Xóa" icon="pi pi-trash" severity="danger" @click="Delete()"></Button>
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

const store = useStore();
const router = useRouter();
const toast = useToast();
// const dataCart = ref([]);
const selectedProduct = ref();
const payload = ref([]);

const GetCart = async () => {
    try {
        const data = await API.get('cart');
        payload.value = data.data.metadata.products;
    } catch (error) {
        console.log(error);
    }
};

const Delete = () => {
    const idsPayload = [];
    for (let item of selectedProduct.value) {
        let ids = item.book._id;
        idsPayload.push(ids);
    }
    store.dispatch('cart/removeProduct', idsPayload).then((res) => {
        toast.add({ severity: 'success', summary: res.type, detail: res.message, life: 3000 });
        GetCart();
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
        store.dispatch('cart/addToCart', payloadData).then((res) => {
            toast.add({ severity: 'success', summary: res.type, detail: res.message, life: 3000 });
        });
    }
};

const ClickQuantity = (action, data, index) => {
    if (action == 'a') {
        data.quantity += 1;
    } else {
        if (data.quantity >= 1) {
            data.quantity -= 1;
        }
    }
};

onMounted(() => {
    GetCart();
});
const totalAmount = computed(() => {
    let total = 0;
    for (let item of payload.value) {
        total += item.book.price * item.quantity;
    }
    return total;
});
const checkout = async () => {
    const res = await API.create('checkout');
    router.push({ name: 'checkout' });
};
</script>
