<template>
  <div class="mt-10">
    <div class="flex flex-row">
      <div class="basis-8/12">
        <div class="grid grid-cols-3">
          <div v-for="item in books" class="p-5">
            <img :src="item.cover" class="rounded-md" />
          </div>
        </div>
      </div>
      <div class="basis-4/12">
        <div v-for="(item, index) in repeatedItems">
          <div class="p-5 flex">
            <div class="basis-4/12">
              <img :src="item.image" alt="" />
            </div>
            <div class="basis-8/12 pl-3">
              <span class="text-justify">
                {{ item.text }}
              </span>
            </div>
          </div>
          <Divider v-if="index < repeatedItems.length - 1"></Divider>
        </div>
      </div>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-between text-xl">
        <label class="uppercase"> Các tác giả</label>
        <router-link :to="{ name: 'authors' }">
          <label class="hover:text-green-400 hover:underline text-base"
            >Xem thêm <span><i class="pi pi-angle-right"></i></span
          ></label>
        </router-link>
      </div>
      <div class="mt-10">
        <div class="flex justify-evenly gap-5">
          <div v-for="item in authorsBook" class="col-3">
            <AuthorCard :rawData="item"></AuthorCard>
          </div>
        </div>
      </div>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-between text-xl">
        <label class="uppercase"> Sách mới</label>
        <router-link :to="{ name: 'books' }">
          <label class="hover:text-green-400 hover:underline text-base"
            >Xem thêm <span><i class="pi pi-angle-right"></i></span
          ></label>
        </router-link>
      </div>
      <div class="mt-10">
        <div class="flex flex-row justify-evenly">
          <div v-for="item in book" class="flex flex-col relative">
            <ProductCart :rawData="item"></ProductCart>
          </div>
        </div>
      </div>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex mx-8 items-center">
        <div class="basis-1/2 flex flex-col gap-2">
          <label class="text-xl text-green-500" for="">BookStore</label>
          <span class="block text-base text-green-500"> Bởi vì sách là thế giới </span>
          <span class="block text-justify text-base w-[90%]">
            BookStore tên đầy đủ là Công ty Cổ phần Văn hóa và Truyền thông BookBookStore,
            tên đầy đủ là Công ty Cổ phần Văn hóa và Truyền thông BookStore, gia nhập thị
            trường sách Việt Nam vào tháng 2 năm 2005. Ngay từ cuốn sách đầu tiên, độc giả
            đã dành sự quan tâm và yêu mến cho một thương hiệu sách mới mẻ mang trong mình
            khát vọng góp phần tạo lập diện mạo mới cho xuất bản văn học tại Việt Nam.
          </span>
          <Button
            style="width: 10rem; margin-top: 1rem"
            icon="pi pi-arrow-right"
            iconPos="right"
            label="Xem thêm"
          ></Button>
        </div>
        <div class="basis-1/2">
          <img
            src="https://cleverlearnvietnam.com/wp-content/uploads/2019/06/10-tu-vung.jpg"
            class="w-full object-cover h-auto"
            alt=""
          />
        </div>
      </div>
    </div>
    <Divider></Divider>
    <div>
      <div class="flex justify-between text-xl">
        <label class="uppercase">Sắp xuất bản</label>
        <label class="hover:text-green-400 hover:underline text-base"
          >Xem thêm <span><i class="pi pi-angle-right"></i></span
        ></label>
      </div>
      <div class="mt-10">
        <div class="flex flex-row justify-evenly">
          <div v-for="item in newBooks" class="flex flex-col">
            <img class="m-8 shadow-2xl" :src="item.cover" alt="" />
            <div class="m-8 mt-0 flex flex-col gap-2">
              <span class="text-xl hover:underline cursor-pointer">{{ item.title }}</span>
              <span class="text-base hover:underline cursor-pointer">{{
                item.author
              }}</span>
              <Rating v-model="item.rating" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import API from "../../api/api-main";
import ProductCart from "../shared/ProductCart.vue";
import AuthorCard from "../shared/AuthorCard.vue";
const authorsBook = ref([]);
const book = ref([]);

const GetAllAuthors = async () => {
  try {
    const res = await API.get("author?page=1&limit=4");
    if (res && res.data) {
      authorsBook.value = res.data.metadata;
    }
  } catch (error) {
    console.log(error);
  }
};

const GetAllBooks = async () => {
  try {
    const res = await API.get("book?page=1&limit=4");
    if (res && res.data) {
      book.value = res.data.metadata;
    }
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  GetAllAuthors();
  await GetAllBooks();
  console.log(book.value);
});
</script>
