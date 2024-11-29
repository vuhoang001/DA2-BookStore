<script setup>
import currency from 'currency.js';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
</script>

<template>
    <div class="bg-white">
        <router-view />
    </div>
</template>

<style scoped></style>
