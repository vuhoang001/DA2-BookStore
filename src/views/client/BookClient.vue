<template>
    <div class="my-10">
        <span class="text-3xl font-semibold text-green-500"> {{ title }} </span>
    </div>
    <div>
        <div class="flex">
            <div v-for="book in books" class="basis-1/4 gap-4">
                <div class="flex flex-col gap-3">
                    <img crossorigin="anonymous" :src="book.imageBook" class="w-[240px] h-[360px]" alt="" />
                    <router-link :to="{ name: 'DetailBook', params: { slug: book.slug } }">
                        <span class="text-xl mt-5 cursor-pointer hover:underline hover:text-green-600">
                            {{ book.bookName }}
                        </span>
                    </router-link>

                    
                    <span>{{ book.authorBook.authorName }}</span>

                    <Rating v-model="book.rating" />
                    <span>{{ currency(book.price, { symbol: 'đ', separator: ',' }) }} đ</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue';
import API from '../../api/api-main';
import currency from 'currency.js';
import { useRoute } from 'vue-router';
// import AppMenuItem from '@/layout/AppMenuItem.vue';

const route = useRoute();
const title = ref('');
const books = ref([]);
const GetBooks = async (genre = '') => {
    try {
        const genreQuery = genre ? `?genre=${genre}` : '';
        const res = await API.get(`book${genreQuery}`);
        books.value = res.data.metadata;

        // if (books.value.length > 0 && genre !== '') {
        //     title.value = books.value[0].genre.genreName;
        // }
        if (books.value.length > 0 && genre !== '') {
            title.value = books.value[0].genre ? books.value[0].genre.genreName : 'Tất cả sách';
        } else {
            if (genre !== '') {
                title.value = `Không có sách trong thể loại này`;
            } else {
                title.value = 'Tất cả sách';
            }
        }
    } catch (error) {}
};

watch(
    () => route.query.genre,
    (newGenre) => {
        GetBooks(newGenre || '');
    }
);

onMounted(() => {
    const genre = route.query.genre || '';
    GetBooks(genre);
});
</script>
