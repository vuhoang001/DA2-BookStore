<template>
    <div>
        <DataTable :value="data" paginator rows="10" show-gridlines>
            <template #header>
                <div class="flex justify-end">
                    <!-- <IconField>
                        <InputIcon>
                            <i class="pi pi-search"> </i>
                        </InputIcon>
                        <InputText v-model="filterBook" placeholder="Tìm kiếm từ ..."></InputText>
                    </IconField> -->
                </div>
            </template>
            <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
            <template #loading> Đang tải dữ liệu ... </template>
            <!-- <Column expander></Column> -->
            <Column>
                <template #body="{ index }">
                    <div class="text-center">
                        {{ index + 1 }}
                    </div></template
                >
            </Column>
            <Column header="Mã đơn hàng" field="_id"> </Column>
            <Column header=" Thời gian " field="createdAt" style="width: 12rem">
                <template #body="{ data }">
                    {{ format(data.createdAt, 'HH:MM dd/MM/yyyy') }}
                </template>
            </Column>
            <Column header=" Số điện thoại" field="phoneReceive"></Column>
            <Column header=" Tổng tiền" field="totalAmount">
                <template #body="{ data }">{{ currency(data.totalAmount, { symbol: 'đ', separator: ',' }).format() }}</template>
            </Column>
            <Column header=" Trạng thái thanh toán" style="width: 11rem">
                <template #body="{ data }">
                    <div>
                        <Tag :severity="data.orderStatus == false ? 'danger' : 'success'"> {{ data.orderStatus == false ? 'Chưa thanh toán' : 'Đã thanh toán' }}</Tag>
                    </div>
                </template>
            </Column>
            <Column header=" Phương thức thanh toán" field="" style="width: 9rem">
                <template #body="{ data }">
                    <div class="text-center">
                        <Tag :severity="data.paymentMethod == 'T' ? 'success' : 'info'"> {{ data.paymentMethod == 'T' ? 'ZaloPay' : 'COD' }}</Tag>
                    </div>
                </template>
            </Column>
            <Column style="width: 3rem">
                <template #body="{ data }">
                    <Button icon="pi pi-eye" @click="openDialog(data)" text></Button>
                </template>
            </Column>
        </DataTable>
        <Dialog v-model:visible="visible" header="Chi tiết đơn hàng" style="width: 50%">
            <div class="flex gap-14">
                <div class="basis-1/2">
                    <div class="flex gap-2">
                        <label class="font-semibold" for="">Mã đơn hàng: </label>
                        <span> {{ payload._id }}</span>
                    </div>
                    <Divider></Divider>
                    <div>
                        <label class="font-semibold" for=""> Tên khách hàng: </label>
                        <span>{{ payload.user.name }}</span>
                    </div>
                    <Divider></Divider>
                    <div>
                        <label class="font-semibold" for=""> Số điện thoại: </label>
                        <span> {{ payload.phoneReceive == '' ? '-' : payload.phoneReceive }}</span>
                    </div>
                    <Divider></Divider>
                    <div>
                        <label class="font-semibold" for=""> Địa chỉ: </label>
                        <span> {{ payload.addressTo }}</span>
                    </div>
                </div>

                <div class="basis-1/2">
                    <div>
                        <label class="font-semibold" for=""> Thời gian: </label>
                        <span> {{ format(payload.createdAt, 'MM:HH dd/MM/yyyy') }}</span>
                    </div>
                    <Divider></Divider>
                    <div>
                        <label class="font-semibold" for=""> Phương thức thanh toán: </label>
                        <span>
                            {{ payload.paymentMethod == 'T' ? 'ZaloPay' : 'COD' }}
                        </span>
                    </div>
                    <Divider></Divider>
                    <div>
                        <label class="font-semibold" for=""> Trạng thái thanh toán: </label>
                        <span>
                            {{ payload.orderStatus == true ? 'Đã thanh toán' : 'Chưa thanh toán' }}
                        </span>
                    </div>
                    <Divider></Divider>
                </div>
            </div>

            <div class="card">
                <span class="font-semibold text-lg mb-3 block"> Chi tiết sản phẩm</span>
                <DataTable :value="payload.products" show-gridlines paginator rows="5">
                    <template #header>
                        <div class="flex justify-end">
                            <!-- <IconField>
                        <InputIcon>
                            <i class="pi pi-search"> </i>
                        </InputIcon>
                        <InputText v-model="filterBook" placeholder="Tìm kiếm từ ..."></InputText>
                    </IconField> -->
                        </div>
                    </template>
                    <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
                    <template #loading> Đang tải dữ liệu ... </template>
                    <Column style="width: 4rem">
                        <template #body="{ index }"
                            ><div class="text-center">
                                {{ index + 1 }}
                            </div>
                        </template>
                    </Column>
                    <Column header="Hình ảnh" style="width: 7rem">
                        <template #body="{ data }">
                            <img crossorigin="anonymous" style="width: 5rem; height: 5rem" :src="data.book.imageBook" />
                        </template>
                    </Column>
                    <Column header="Tên sách" field="book.bookName"></Column>
                    <Column header="Số lượng" style="width: 10rem" field="quantity"></Column>

                    <Column header="Thành tiền" style="width: 13rem;">
                        <template #body="{ data }">
                            {{ currency(data.price, { symbol: 'đ', separator: ',' }).format() }}
                        </template>
                    </Column>
                    <ColumnGroup type="footer">
                        <Row>
                            <Column footer="Tổng tiền" :colspan="4" footerStyle="text-align:right" />
                            <Column :footer="currency(total, { symbol: 'đ', separator: ',' }).format()" />
                        </Row>
                    </ColumnGroup>
                </DataTable>
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../../api/api-main';
import { format } from 'date-fns';
import currency from 'currency.js';
const data = ref([]);
const visible = ref(false);
const payload = ref({});
const total = ref(0);

const openDialog = (data) => {
    visible.value = true;
    Object.assign(payload.value, data);
};
const GetOrder = async () => {
    try {
        const res = await API.get('checkout/gbu');
        data.value = res.data.metadata;
        TotalAmount(data);
    } catch (error) {
        console.log(error);
    }
};
const TotalAmount = (data) => {
    for (var item of data.value[0].products) {
        total.value += item.price;
    }
};

onMounted(() => {
    GetOrder();
});
</script>
