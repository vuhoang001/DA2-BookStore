<template>
    <div class="flex justify-between">
        <div class="font-semibold text-2xl">Quản lý đơn hàng</div>
    </div>

    <div class="card mt-5">
        <DataTable :value="cartData" showGridlines v-model:expandedRows="expandedRows" data-key="_id">
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search"> </i>
                        </InputIcon>
                        <InputText v-model="filterBook" placeholder="Tìm kiếm từ ..."></InputText>
                    </IconField>
                </div>
            </template>
            <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
            <template #loading> Đang tải dữ liệu ... </template>
            <!-- <Column selection-mode="multiple" header></Column> -->
            <Column expander></Column>
            <Column header="Mã đơn hàng" field="_id"></Column>
            <Column header=" Thời gian " field="createdAt"></Column>
            <Column header=" Tên khách hàng " field="user.email"></Column>
            <Column header=" Số điện thoại" field="user.phone"></Column>
            <Column header=" Tổng tiền" field=""></Column>
            <Column header=" Trạng thái thanh toán">
                <template #body="{ data }">
                    <div>
                        <span v-if="data.paymentMethod">Chuyển khoản</span>
                        <span v-else> Tiền mặt</span>
                    </div>
                </template>
            </Column>
            <Column header=" Phương thức thanh toán" field=""></Column>
            <template #expansion="{ data }">
                <div class="card">
                    <div class="mb-4">
                        <span class="text-2xl font-semibold">Thông tin</span>
                    </div>
                    <div class="flex gap-64">
                        <div class="basis-1/2">
                            <div class="flex">
                                <div class="w-40 text-lg">Mã đơn hàng</div>
                                <div>
                                    {{ data._id }}
                                </div>
                            </div>
                            <divider></divider>

                            <div class="flex">
                                <div class="w-40 text-lg">Thời gian</div>
                                <div>{{ data.createdAt }}</div>
                            </div>
                            <Divider></Divider>
                            <div class="flex">
                                <div class="w-40 text-lg">Tên khách hàng</div>
                                <div>
                                    {{ data.user.email }}
                                </div>
                            </div>
                            <Divider></Divider>
                            <div class="flex">
                                <div class="w-40 text-lg">Số điện thoại</div>
                                <div>
                                </div>
                                    {{ data.phoneReceive }}
                            </div>
                            <Divider></Divider>
                            <div class="flex">
                                <div class="w-40 text-lg">Địa chỉ giao hàng</div>
                                <div>{{ data.addressTo }}</div>
                            </div>
                        </div>
                        <div class="basis-1/2">
                            <div class="flex">
                                <div class="w-52 text-lg">Phương thức thanh toán</div>
                                <div>
                                    <span v-if="data.paymentMethod">Chuyển khoản</span>
                                    <span v-else> Tiền mặt</span>
                                </div>
                            </div>

                            <Divider></Divider>
                            <div class="flex">
                                <div class="w-52 text-lg">Trạng thái thanh toán</div>
                                <div>
                                    <span v-if="data.cartStatus"> Đã thanh toán </span>
                                    <span v-else> Chưa thanh toán </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <DataTable :value="data.products">
                            <Column header="Mã sách" field="_id"></Column>
                            <Column header="Tên sách" field="book.bookName"></Column>
                            <Column header="Số lượng" field="quantity"></Column>
                            <Column header="Đơn giá" field="book.price"></Column>
                            <Column header="Thành tiền">
                                <template #body="{ data }">
                                    {{ data.book.price * data.quantity }}
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </template>
            <!-- <Column>
                <template #body="{ data }"> </template>
            </Column> -->
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import API from '../../api/api-main';

const expandedRows = ref();
const cartData = ref([]);

const GetCartData = async () => {
    try {
        const res = await API.get('cart');
        cartData.value = res.data.metadata;
        console.log(cartData.value);
    } catch (error) {
        console.log(error);
    }
};

onBeforeMount(() => {
    GetCartData();
});
</script>
