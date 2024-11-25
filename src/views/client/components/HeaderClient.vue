<template>
    <div class="card">
        <Menubar :model="items">
            <template #start>
                <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-8">
                    <path d="..." fill="var(--p-primary-color)" />
                    <path d="..." fill="var(--p-text-color)" />
                </svg>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <router-link :to="{ name: item.name }">
                    <a v-ripple class="flex items-center" v-bind="props.action">
                    <!-- {{ root }} -->
                        <span class="text-xl">{{ item.label }}</span>
                        <!-- <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span> -->
                        <i v-if="hasSubmenu" :class="['pi pi-angle-down ml-auto', { 'pi-angle-down': root, 'pi-angle-right': !root }]"></i>
                    </a>
                </router-link>
            </template>
            <template #end>
                <div class="flex items-center gap-5">
                    <InputText placeholder="Search" type="text" class="w-52 sm:w-auto" />
                    <!-- <img src="../../../images/money-svgrepo-com.svg" class="w-[30px]" alt="" /> -->
                    <Button icon="pi pi-heart" size="large" text rounded></Button>
                    <Button icon="pi pi-user" size="large" text rounded></Button>
                    <router-link :to="{ name: 'cart' }">
                        <Button icon="pi pi-shopping-cart" size="large" text rounded></Button>
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
const categories = ref();

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
                let datapush = { label: categories.value[i].genreName };
                item.items.push(datapush);
            }
        }
    }
};

onMounted(() => {
    GetAuthors();
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
        items: [
            // {
            //     label: 'Components',
            //     icon: 'pi pi-bolt'
            // },
            // {
            //     label: 'Blocks',
            //     icon: 'pi pi-server'
            // },
            // {
            //     label: 'UI Kit',
            //     icon: 'pi pi-pencil'
            // },
            // {
            //     label: 'Templates',
            //     icon: 'pi pi-palette',
            //     items: [
            //         {
            //             label: 'Apollo',
            //             icon: 'pi pi-palette'
            //         },
            //         {
            //             label: 'Ultima',
            //             icon: 'pi pi-palette'
            //         }
            //     ]
            // }
        ]
    },
    {
        label: ' Liên hệ',
        icon: 'pi pi-envelope'
    }
]);
</script>
