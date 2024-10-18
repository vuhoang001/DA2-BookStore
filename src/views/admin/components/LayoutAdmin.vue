<template>
    <header-admin></header-admin>
    <router-view></router-view>
    <footer-admin></footer-admin>
</template>

<script setup>
import HeaderAdmin from '@/views/admin/components/HeaderAdmin.vue';
import FooterAdmin from '@/views/admin/components/FooterAdmin.vue';
</script>
