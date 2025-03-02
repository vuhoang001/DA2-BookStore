<template>
  <div class="my-10">
    <span class="text-3xl font-semibold text-green-500"> {{ title }} </span>
  </div>
  <div>
    <div class="flex flex-wrap justify-evenly">
      <div v-for="item in books" class="basis-1/4 relative">
        <ProductCart   :rawData="item"></ProductCart>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import API from "../../api/api-main";
import { useRoute } from "vue-router";
import ProductCart from "../shared/ProductCart.vue";
// import AppMenuItem from '@/layout/AppMenuItem.vue';

const route = useRoute();
const title = ref("");
const books = ref([]);
const GetBooks = async (genre = "") => {
  try {
    const genreQuery = genre ? `?genre=${genre}` : "";
    const res = await API.get(`book${genreQuery}`);
    books.value = res.data.metadata;

    if (books.value.length > 0 && genre !== "") {
      title.value = books.value[0].genre ? books.value[0].genre.genreName : "Tất cả sách";
    } else {
      if (genre !== "") {
        title.value = `Không có sách trong thể loại này`;
      } else {
        title.value = "Tất cả sách";
      }
    }
  } catch (error) {}
};

watch(
  () => route.query.genre,
  (newGenre) => {
    GetBooks(newGenre || "");
  }
);

onMounted(() => {
  const genre = route.query.genre || "";
  GetBooks(genre);
});
</script>
