<template>
    <div class="card py-3  z-50 left-0 top-0 right-0 border-b-2 border-s-fuchsia-700 shadow-sm">
        <Menubar :model="items">
            <template #start>
                <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
                    <path d="..." fill="var(--p-primary-color)" />
                    <path d="..." fill="var(--p-text-color)" />
                </svg>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <!-- {{ root }} -->

                    <span v-if="root == true" class="text-xl">
                        <router-link v-if="item.name" :to="{ name: `${item.name}` }">
                            {{ item.label }}
                        </router-link>

                        <span v-if="item && !item.name">
                            {{ item.label }}
                        </span>
                    </span>

                    <router-link v-if="root == false" :to="{ name: 'books', query: { genre: item.genre } }">
                        <span v-if="root == false" class="hover:text-green-500">
                            {{ item.label }}
                        </span>
                    </router-link>
                    <!-- <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span> -->
                    <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                </a>
            </template>
            <template #end>
                <div class="flex items-center gap-9">
                    <InputText placeholder="Search" type="text" class="w-52 sm:w-auto" />
                    <!-- <img src="../../../images/money-svgrepo-com.svg" class="w-[30px]" alt="" /> -->
                    <router-link :to="{ name: 'favorite' }">
                        <i class="pi pi-heart hover:text-green-500" style="font-size: 1.5rem" size="large" text rounded></i>
                    </router-link>
                    <router-link :to="{ name: 'cart' }">
                        <div class="relative">
                            <OverlayBadge :value="totalQuantity" severity="danger" size="small">
                                <!-- <Button icon="pi pi-shopping-cart" size="large" text rounded></Button> -->
                                <i class="pi pi-shopping-cart hover:text-green-500" style="font-size: 1.5rem" />
                            </OverlayBadge>
                            <!-- <span class="absolute rounded-full px-1 text-sm bg-red-500 left-[25px] text-white">{{ totalQuantity }}</span> -->
                        </div>
                    </router-link>
                    <router-link :to="{ name: 'profile' }">
                        <i class="pi pi-user hover:text-green-500" style="font-size: 1.5rem" size="large" text rounded></i>
                    </router-link>
                </div>
            </template>
        </Menubar>
        <!-- <Menubar :model="items" /> -->
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import API from '../../../api/api-main';
import { useStore } from 'vuex';

const store = useStore();
const categories = ref();
let totalQuantity = ref(0);
const GetAuthors = async () => {
    try {
        const res = await API.get('genre');
        categories.value = res.data.metadata;
        SetCategory();
    } catch (error) {
        console.log(error);
    }
};

const SetCategory = () => {
    for (let item of items.value) {
        if (item.label == 'Thể loại') {
            for (let i = 0; i < categories.value.length; i++) {
                let datapush = { label: categories.value[i].genreName, genre: categories.value[i].slug };
                item.items.push(datapush);
            }
        }
    }
};

onMounted(async () => {
    GetAuthors();
    await store.dispatch('cart/fetchData');
    totalQuantity.value = store.getters['cart/getQuantity'];
});

const items = ref([
    {
        label: 'Trang chủ',
        icon: 'pi pi-home',
        name: 'DashboardClient'
    },
    {
        label: 'Tác giả',
        icon: 'pi pi-star',
        name: 'authors'
    },
    {
        label: 'Thể loại',
        icon: 'pi pi-search',
        // name: 'demogenre',
        items: []
    },
    {
        label: ' Liên hệ',
        icon: 'pi pi-envelope'
    }
]);
</script>
