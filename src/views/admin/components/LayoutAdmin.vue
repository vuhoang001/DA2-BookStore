<template>
    <div>
        <header-admin></header-admin>
    </div>
    <div class="w-[1028px]">
        <router-view></router-view>
    </div>
    <div>
        <footer-admin></footer-admin>
    </div>
</template>

<script setup>
import HeaderAdmin from '@/views/admin/components/HeaderAdmin.vue';
import FooterAdmin from '@/views/admin/components/FooterAdmin.vue';
</script>
