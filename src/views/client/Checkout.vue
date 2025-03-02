<template>
  <div class="my-14 w-[85%] mx-auto mt-[100px]">
    <div class="flex gap-10">
      <div class="flex flex-col gap-5 basis-4/6 card">
        <div>
          <span class="text-3xl"> Nhà xuất bản sách BookStore </span>
        </div>
        <div>
          <span class="text-2xl">Thông tin thanh toán</span>
        </div>
        <div class="flex">
          <div>
            <router-link :to="{ name: 'profile' }">
              <img
                crossorigin="anonymous"
                :src="user.thumbnail"
                class="w-[65px] h-[65px] rounded-md"
                alt=""
              />
            </router-link>
          </div>
          <div class="flex flex-col justify-center ml-3">
            <router-link :to="{ name: 'profile' }">
              <span class="text-gray-500 text-lg">{{ user.email }} </span>
            </router-link>
            <span class="text-base text-blue-300 italic hover:underline cursor-pointer">
              Đăng xuất</span
            >
          </div>
        </div>

        <div class="flex flex-col gap-5 mt-5">
          <router-link class="text-right" :to="{ name: 'profile' }">
            <span class="text-right text-green-500 cursor-pointer hover:underline"
              >Chỉnh sửa địa chỉ <i class="pi pi-link"></i
            ></span>
          </router-link>
          <InputText
            class="w-full"
            type="text"
            disabled
            v-model="user.name"
            placeholder="Họ và tên"
          />
          <InputText
            class="w-full"
            type="text"
            disabled
            v-model="user.phone"
            placeholder="Số điện thoại"
          />
          <InputText
            class="w-full"
            type="text"
            disabled
            :placeholder="`${user.address}, ${user.ward}, ${user.district}, ${user.province}`"
          />
        </div>

        <div class="my-3">
          <span class="text-2xl">Phương thức thanh toán</span>
        </div>

        <div class="flex flex-col gap-4">
          <div class="flex items-center border-2 gap-3 p-3 rounded-md">
            <RadioButton
              v-model="payload.paymentMethod"
              input-id="cod"
              value="C"
            ></RadioButton>
            <img
              src="../../images/money-svgrepo-com.svg"
              alt=""
              class="w-[50px] h-[50px] ml-4"
            />
            <label for="cod" class="text-base">Thanh toán khi nhận hàng (COD)</label>
          </div>
          <div class="flex items-center gap-3 border-2 p-3 rounded-md">
            <RadioButton
              v-model="payload.paymentMethod"
              input-id="zalo"
              value="T"
            ></RadioButton>
            <img
              src="../../images/zalopay-svgrepo-com.svg"
              alt=""
              class="w-[50px] h-[50px] ml-4"
            />
            <label for="cod" class="text-base">Thanh toán bằng zalopay</label>
          </div>
        </div>
      </div>
      <div class="basis-2/6 card">
        <div v-for="item in orderData" class="flex items-center justify-between mt-4">
          <div class="flex items-center gap-7 relative">
            <img
              crossorigin="anonymous"
              :src="item.book.imageBook"
              class="w-[70px] h-[100px] object-cover"
              alt=""
            />
            <span class="text-base">
              {{ item.book.bookName }}
            </span>

            <div
              class="absolute top-[-10px] left-[68px] bg-gray-400 text-white text-xs px-2 py-1 rounded-full"
            >
              {{ item.quantity }}
            </div>
          </div>

          <span>
            <!-- {{ item.book }} -->
            {{
              currency(item.book.price * ((100 - item.book.discount) / 100), {
                symbol: "đ",
              }).format()
            }}
          </span>
        </div>
        <Divider></Divider>
        <div class="flex gap-5">
          <div class="basis-4/6">
            <InputText
              v-model="payload.discord"
              placeholder="Mã giảm giá"
              class="w-full"
            ></InputText>
          </div>
          <div class="basis-2/6">
            <Button
              label="Sử dụng"
              class="w-full"
              :disabled="payload.discord !== '' ? false : true"
            ></Button>
          </div>
        </div>
        <Divider></Divider>

        <div class="flex flex-col gap-3">
          <div class="flex justify-between">
            <span class="text-lg text-gray-400">Tạm tính</span>
            <span class="text-lg">{{
              currency(payload.totalAmount, { symbol: "đ", separator: "," }).format()
            }}</span>
          </div>
        </div>

        <Divider></Divider>
        <div class="flex justify-between">
          <span class="text-xl">Tổng tiền</span>
          <span class="text-xl">{{
            currency(payload.totalAmount, { symbol: "đ", separator: "," }).format()
          }}</span>
        </div>

        <Divider></Divider>
        <div>
          <Button class="w-full" @click="payment" label="Đặt hàng"></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import API from "../../api/api-main";
import currency from "currency.js";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref({});
const orderId = ref();
const orderData = ref();

const payload = ref({
  name: "",
  phoneReceive: "",
  address: "",
  paymentMethod: "C",
  discord: "",
  totalAmount: 0,
});

const payment = async () => {
  let array = [];
  for (var item of orderData.value) {
    let data = {};
    data.book = item.book._id;
    data.quantity = item.quantity;
    array.push(data);
  }

  if (payload.value.paymentMethod === "T") {
    payload.value.address = user.value.address;
    payload.value.name = user.value.name;
    payload.value.phoneReceive = user.value.phone;
    const res = await API.create("payment?type=t", {
      items: array,
      total: payload.value.totalAmount,
      payload: payload.value,
      orderId: orderId.value,
    });

    if (res.data.metadata.return_code == 1) {
      window.location.href = res.data.metadata.order_url;
    }
  } else {
    payload.value.address = user.value.address;
    payload.value.name = user.value.name;
    payload.value.phoneReceive = user.value.phone;
    const res = await API.create("payment?type=c", {
      items: array,
      total: payload.value.totalAmount,
      payload: payload.value,
      orderId: orderId.value,
    });
    if (res && res.status == 200) {
      router.push({ name: "paymentsuccess" });
    }
  }
};

const GetOrder = async () => {
  const res = await API.get("/checkout");

  orderId.value = res.data.metadata._id;
  orderData.value = res.data;
  user.value = res.data.metadata.user;
  orderData.value = res.data.metadata.products;
  totalAmount();
};

const totalAmount = () => {
  let result = 0;
  for (let item of orderData.value) {
    result += item.book.price * ((100 - item.book.discount) / 100) * item.quantity;
  }
  payload.value.totalAmount = result;
};

onBeforeMount(() => {
  GetOrder();
});
</script>
