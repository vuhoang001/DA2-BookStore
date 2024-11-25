<template>
    <div>
        <header-client></header-client>
    </div>
    <div class="mx-auto w-[1350px]">
        <router-view></router-view>
    </div>
    <div class="">
        <footer-client> </footer-client>
    </div>
</template>

<script setup>
import HeaderClient from '@/views/client/components/HeaderClient.vue';
import FooterClient from '@/views/client/components/FooterClient.vue';
</script>
