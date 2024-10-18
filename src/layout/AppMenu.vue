<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Thanh quản lý',
        items: [
            { label: 'Quản lý sách', icon: 'pi pi-fw pi-home', to: '/admin/book-manager' },
            { label: 'Quản lý tác giả', icon: 'pi pi-fw pi-home', to: '/admin/author-manager' },
            { label: 'Quản lý thể loại', icon: 'pi pi-fw pi-home', to: '/admin/genre-manager' },
            { label: 'Quản lý đơn hàng', icon: 'pi pi-fw pi-home', to: '/admin/cart-manager' },
            { label: 'Quản lý nội dung', icon: 'pi pi-fw pi-home', to: '/admin/content-manager' },
            { label: 'Quản lý khách hàng', icon: 'pi pi-fw pi-home', to: '/admin/customer-manager' },
            { label: 'Thống kê', icon: 'pi pi-fw pi-home', to: '/admin/statistical' }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
