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
                <label class="hover:text-green-400 hover:underline text-base"
                    >Xem thêm <span><i class="pi pi-angle-right"></i></span
                ></label>
            </div>
            <div class="mt-10">
                <div class="flex flex-row justify-evenly">
                    <div v-for="item in authorsBook" class="flex flex-col">
                        <img crossorigin="anonymous" class="w-[240px] h-[240px] rounded-full object-cover" :src="item.authorImage" alt="" />

                        <span class="text-center mt-4 text-xl hover:underline cursor-pointer"
                            ><router-link :to="`author/` + `${item.slug}`">{{ item.authorName }} </router-link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <Divider></Divider>
        <div>
            <div class="flex justify-between text-xl">
                <label class="uppercase"> Sách mới</label>
                <label class="hover:text-green-400 hover:underline text-base"
                    >Xem thêm <span><i class="pi pi-angle-right"></i></span
                ></label>
            </div>
            <div class="mt-10">
                <div class="flex flex-row justify-evenly">
                    <div v-for="item in book" class="flex flex-col">
                        <img crossorigin="anonymous" class="m-8 shadow-2xl w-[80px] h-[80px]" :src="item.imageBook" alt="" />
                        <div class="m-8 mt-0 flex flex-col gap-2">
                            <router-link :to="{ name: 'DetailBook', params: { slug: item.slug } }">
                                <span class="text-xl hover:underline cursor-pointer">{{ item.bookName }}</span>
                            </router-link>
                            <span class="text-base hover:underline cursor-pointer">{{ item.authorBook.authorName }}</span>
                            <span class="text-base hover:underline cursor-pointer">{{ item.price }}</span>
                            <Rating v-model="item.rating" />
                        </div>
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
                        BookStore tên đầy đủ là Công ty Cổ phần Văn hóa và Truyền thông BookBookStore, tên đầy đủ là Công ty Cổ phần Văn hóa và Truyền thông BookStore, gia nhập thị trường sách Việt Nam vào tháng 2 năm 2005. Ngay từ cuốn sách đầu
                        tiên, độc giả đã dành sự quan tâm và yêu mến cho một thương hiệu sách mới mẻ mang trong mình khát vọng góp phần tạo lập diện mạo mới cho xuất bản văn học tại Việt Nam.
                    </span>
                    <Button style="width: 10rem; margin-top: 1rem" icon="pi pi-arrow-right" iconPos="right" label="Xem thêm"></Button>
                </div>
                <div class="basis-1/2">
                    <img src="https://cleverlearnvietnam.com/wp-content/uploads/2019/06/10-tu-vung.jpg" class="w-full object-cover h-auto" alt="" />
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
                            <span class="text-base hover:underline cursor-pointer">{{ item.author }}</span>
                            <Rating v-model="item.rating" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../api/api-main';
const authorsBook = ref([]);
const book = ref([]);
const GetAllAuthors = async () => {
    try {
        const res = await API.get('author?page=1&limit=4');
        if (res && res.data) {
            authorsBook.value = res.data.metadata;
        }
    } catch (error) {
        console.log(error);
    }
};

const GetAllBooks = async () => {
    try {
        const res = await API.get('book');
        if (res && res.data) {
            book.value = res.data.metadata;
        }
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    GetAllAuthors();
    GetAllBooks();
});

const books = [
    { title: 'Hát Giông Tâm Hồn', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
    { title: 'Thế Giới Này Làm Sao Để Yêu Nhau', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
    { title: 'Vô Nhất', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain    ' },
    { title: 'Lam Đì', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
    { title: 'Và Đột Nhiên Gió Thổi', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
    { title: 'Đời Lưa Xung Đột', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' }
];

const repeatedItems = [
    { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một iều gì đó lớn, cả vũ trụ sẽ hin thc giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
    { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì đó lớn, cả vũ trụ sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
    { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì ��ó lớn, cả vũ tr sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' }
];

const authors = [
    {
        name: 'OSHO',
        avatar: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain'
    },
    {
        name: 'OSHO',
        avatar: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain'
    },
    {
        name: 'OSHO',
        avatar: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain'
    },
    {
        name: 'OSHO',
        avatar: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain'
    }
];

const newBooks = [
    { id: 1, title: 'Tentang Kamu', author: 'Tere Liye', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', rating: 4 },
    { id: 2, title: 'Pergi', author: 'Tere Liye', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', rating: 3 },
    { id: 3, title: 'Garis Waktu', author: 'Fiersa Besari', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', rating: 3.5 },
    { id: 4, title: 'Becoming', author: 'Michelle Obama', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', rating: 5 }
];

const partners = ref([
    // Sử dụng ref cho partners
    { name: 'ANFOUNDAT', logo: 'https://th.bing.com/th/id/OIP.11RKdwhWKHuh7Vlgw_2WygHaKh?rs=1&pid=ImgDetMain' },
    { name: 'MON & CHUST', logo: 'https://th.bing.com/th/id/OIP.fqZ9-PPqcG_cm0k3JfoINQHaEK?rs=1&pid=ImgDetMain' },
    { name: 'LOT DEPARTME', logo: 'https://th.bing.com/th/id/OIP.WE109lmuCjsw8asJparTPgHaHa?r s=1&pid=ImgDetMain' },
    { name: 'OSHO', logo: 'https://th.bing.com/th/id/OIP.02ZgQUtfUdNCO1BV_TIpMwHaHa?rs=1&pid=ImgDetMain' },
    { name: 'OSHO', logo: 'https://vuejs.org/images/logo.png' },
    { name: 'OSHO', logo: 'https://download.logo.wine/logo/Java_(programming_language)/Java_(programming_language)-Logo.wine.png' },
    { name: 'OSHO', logo: 'https://th.bing.com/th/id/OIP.Oag0dh4MINdG_qxOzJMoiwHaIB?rs=1&pid=ImgDetMain' },
    { name: 'OSHO', logo: 'https://th.bing.com/th/id/R.b40bc00f9942b432528f2c29971777ed?rik=ABW8meR9D5qQpQ&pid=ImgRaw&r=0' }
]);
</script>
