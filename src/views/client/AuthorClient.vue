<template>
    <div>
        <div class="flex my-10">
            <div class="basis-1/2 flex items-center">
                <div class="flex flex-col gap-4">
                    <label class="block text-3xl font-bold uppercase" for="">{{ data.authorName }}</label>
                    <span class="block">{{ data.bio }}</span>
                </div>
            </div>
            <div class="basis-1/2">
                <div class="flex justify-center">
                    <img crossorigin="anonymous" class="w-[250px] h-[250px] rounded-full object-cover" :src="data.authorImage" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../api/api-main';
import { useRoute } from 'vue-router';

const router = useRoute();

const data = ref({});
const GetAuthor = async () => {
    const id = router.params.slug;
    try {
        const res = await API.get(`author/${id}`);
        if (res && res.data) {
            data.value = res.data.metadata;
        }
    } catch (error) {}
};

onMounted(() => {
    GetAuthor();
});
</script>
