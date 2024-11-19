<template>
    <div class="flex items-center justify-between p-6 bg-white">
        <!-- Logo -->
        <div class="flex items-center space-x-2 ml-5">
            <img src="" alt="Logo" class="h-10 w-10" />
            <span class="text-3xl font-bold">BookStore</span>
        </div>

        <!-- Navigation Links -->
        <div class="flex gap-11">
            <div v-for="item in header">
                <span class="cursor-pointer text-xl hover:text-green-400">{{ item.title }}</span>
            </div>
        </div>
        <!-- Search and Icons -->
        <div class="flex items-center space-x-6">
            <InputGroup>
                <InputText placeholder="Tìm kiếm" />
                <Button icon="pi pi-search" severity="success" />
            </InputGroup>
            <div class="flex">
                <Button icon="pi pi-user" text rounded></Button>
                <Button icon="pi pi-shopping-cart" text rounded></Button>
            </div>
        </div>
    </div>
</template>

<script setup>
const header = [
    { title: ' Trang chủ', icon: '' },
    { title: ' Tin sách', icon: '' },
    { title: ' Sách hot', icon: '' },
    { title: ' Tác giả', icon: '' },
    { title: ' Cuộc thi', icon: '' },
    { title: ' Về Bookstore', icon: '' },
    { title: ' Liên hệ', icon: '' }
];
</script>
