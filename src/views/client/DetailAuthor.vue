<template>
    <div><span class="text-3xl font-semibold text-green-500"> Tác giả </span></div>
    <div>
        <div class="flex">
            <div class="mt-10">
                <div class="flex flex-row justify-evenly flex-wrap">
                    <div v-for="item in authors" class="basis-1/4 flex flex-col justify-center items-center mb-10">
                        <img crossorigin="anonymous" class="w-[240px] h-[240px] rounded-full object-cover" :src="item.authorImage" alt="" />

                        <span class="text-center mt-4 text-xl hover:underline cursor-pointer"
                            ><router-link :to="`author/` + `${item.slug}`">{{ item.authorName }} </router-link>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <Paginator @page="onPageChange" @row-per-page-change="onRowsPageChange(event)" :rows="10" :totalRecords="120" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import API from '../../api/api-main';

const authors = ref([]);
const GetAuthors = async (page = 1, rows = 10) => {
    try {
        const res = await API.get(`author?skip=${page}&limit=${rows}`);
        authors.value = res.data.metadata;
    } catch (error) {}
};

const onPageChange = (event) => {
    GetAuthors(event.page, event.rows);
};

const onRowsPageChange = (event) => {
    console.log(event);
};

onBeforeMount(() => {
    GetAuthors();
});
</script>
