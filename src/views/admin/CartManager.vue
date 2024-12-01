<template>
  <div class="flex justify-between">
    <div class="font-semibold text-2xl">Quản lý đơn hàng</div>
  </div>

  <div class="card mt-5">
    <DataTable
      :value="cartData"
      showGridlines
      v-model:editing-rows="editingRows"
      @row-edit-save="onRowEditSave"
      edit-mode="row"
      v-model:expandedRows="expandedRows"
      data-key="_id"
      paginator="true"
      rows="10"
    >
      <template #header>
        <!-- <div class="flex justify-end">
          <IconField>
            <InputIcon>
              <i class="pi pi-search"> </i>
            </InputIcon>
            <InputText v-model="filterBook" placeholder="Tìm kiếm từ ..."></InputText>
          </IconField>
        </div> -->
      </template>
      <template #empty>
        <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div>
      </template>
      <template #loading> Đang tải dữ liệu ... </template>
      <Column expander></Column>
      <Column header="Mã đơn hàng" field="_id"></Column>
      <Column header=" Thời gian " field="createdAt" style="width: 12rem">
        <template #body="{ data }">
          {{ format(data.createdAt, "HH:MM dd/MM/yyyy") }}
        </template>
      </Column>
      <Column header=" Tên khách hàng " field="user.email"></Column>
      <Column header=" Số điện thoại" field="phoneReceive"></Column>
      <Column header=" Tổng tiền" field="totalAmount">
        <template #body="{ data }">{{
          currency(data.totalAmount, { symbol: "đ", separator: "," }).format()
        }}</template>
      </Column>
      <Column header=" Trạng thái thanh toán">
        <template #editor="{ data, field }">
          <Select
            v-model="data.paymentMethod"
            :options="status"
            optionLabel="label"
            optionValue="value"
            placeholder="Chọn trạng thái"
          >
          </Select>
        </template>
        <template #body="{ data }">
          <div>
            <Tag :severity="data.orderStatus == false ? 'danger' : 'success'">
              {{ data.orderStatus == false ? "Chưa thanh toán" : "Đã thanh toán" }}</Tag
            >
          </div>
        </template>
      </Column>
      <Column header=" Phương thức thanh toán" field="">
        <template #body="{ data }">
          <Tag :severity="data.paymentMethod == 'T' ? 'success' : 'info'">
            {{ data.paymentMethod == "T" ? "ZaloPay" : "COD" }}</Tag
          >
        </template>
      </Column>

      <Column
        :row-editor="true"
        body-style="text-align:center"
        style="width: 8rem"
      ></Column>
      <!-- <Column style="width: 5rem">
        <template #body="{ data }">
          <Button icon="pi pi-pencil" text></Button>
        </template>
      </Column> -->
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
                <!-- <div>{{ new Date(data.createdAt).toLocaleDateString('vi') }}</div> -->
                {{ format(data.createdAt, "HH:MM dd/MM/yyyy") }}
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
                <div></div>
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
                  <span v-if="data.paymentMethod == 'C'">COD</span>
                  <span v-else>ZaloPay</span>
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
              <Column header="Đơn giá" field="book.price">
                <template #body="{ data }">
                  {{
                    currency(data.book.price, { symbol: "đ", separator: "," }).format()
                  }}
                </template>
              </Column>
              <Column header="Thành tiền">
                <template #body="{ data }">
                  {{
                    currency(data.book.price * data.quantity, {
                      symbol: "đ",
                      separator: ",",
                    }).format()
                  }}
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import API from "../../api/api-main";
import { format, formatDate } from "date-fns";
import currency from "currency.js";

const expandedRows = ref();
const cartData = ref([]);
const editingRows = ref();
const status = ref([
  { label: "Chưa xử lý", value: "F" },
  { label: "Đăng xử lý", value: "P" },
  { label: "Đã xử lý", value: "T" },
]);

const onRowEditSave = (event) => {
  let { newData, index } = event;

  console.log(newData);
  console.log(index);
};

const GetCartData = async () => {
  try {
    const res = await API.get("checkout/all");
    if (res && res.data) {
      cartData.value = res.data.metadata;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  GetCartData();
});
</script>
