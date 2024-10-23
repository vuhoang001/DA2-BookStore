<template>
    <header class="flex items-center justify-between p-6 bg-white shadow-md custom-width">
      <!-- Logo -->
      <div class="flex items-center space-x-2 ml-5">
        <img src="" alt="Logo" class="h-10 w-10" />
        <span class="text-lg font-bold">BookStore</span>
      </div>
  
      <!-- Navigation Links -->
      <nav class="flex space-x-16   ">
        <a href="#" class="text-gray-700 hover:text-green-500">
          Trang chủ
        
        </a>
        <a href="#" class="text-gray-700 hover:text-green-500">
          Tin sách
       
        </a>
        <a href="#" class="text-gray-700 hover:text-green-500">
          Sách hot
          
        </a>
        <router-link to="/author" class="text-gray-700 hover:text-green-500">
          Tác giả
          
        </router-link>
        <a href="#" class="text-gray-700 hover:text-green-500">
          Cuộc thi
      
        </a>
        <a href="#" class="text-gray-700 hover:text-green-500">
          Về BookStore
       
        </a>
        <a href="#" class="text-gray-700 hover:text-green-500">
          Liên hệ
         
        </a>
      </nav>
  
      <!-- Search and Icons -->
      <div class="flex items-center space-x-6">
        <div class="relative">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            class="border border-green-500 rounded-full px-14 py-3 pr-20 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button class="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
        <button class="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>


        </button>
        <button class="text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>
</button>
      </div>
    </header>
  </template>
  
  <script setup>
 
  </script>
  
  <style scoped>

</style>
