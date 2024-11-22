<template>
    <div>
        <div class="flex my-10">
            <div class="basis-1/2 flex items-center">
                <div class="flex flex-col gap-4">
                    <label class="block text-3xl font-bold uppercase" for="">{{ author[0].name }}</label>
                    <span class="block">{{ author[0].description }}</span>
                </div>
            </div>
            <div class="basis-1/2">
                <div class="flex justify-center">
                    <img class="w-[250px] h-[250px] rounded-full object-cover" :src="author[0].image" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import API from '../../api/api-main'

const data = ref(null);

const GetData = async () => {
    try {
        // const res = await API.get("author")
    } catch (error) {
        console.log(error);
    }
};
onBeforeMount(() => {});
</script>
