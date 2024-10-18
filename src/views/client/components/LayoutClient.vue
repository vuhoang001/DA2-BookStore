<template>
    <header-client></header-client>
    <router-view></router-view>
    <footer-client> </footer-client>
</template>

<script setup>
import HeaderClient from '@/views/client/components/HeaderClient.vue';
import FooterClient from '@/views/client/components/FooterClient.vue';
</script>
