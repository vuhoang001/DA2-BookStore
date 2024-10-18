<template>
  <div class="flex p-6 bg-orange-50 h-[828px]">
    <!-- Left side - Book covers -->
    <div class="w-full flex justify-center">
      <div class="bg-green-200 p-2 rounded-lg" style="height: 595px; width: 640px;">
        <h2 class="text-xl font-bold mb-4 text-center">SÁCH MỚI NỔI BẬT THÁNG 10</h2>
        <div class="grid grid-cols-3 gap-4 h-[calc(100%-2.5rem)]">
          <div v-for="(book, index) in books" :key="index" class="w-full h-full flex items-center justify-center">
            <img :src="book.cover" :alt="book.title" class="w-2/3 h-2/3 object-cover rounded-md shadow-md">
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Repeated elements --> 
    <div class="w-4/12 space-y-4 h-100 pr-2 overflow-hidden" style="height: auto; width: 760px;">
      <div v-for="(item, index) in repeatedItems" :key="index" class="bg-transparent p-3 border-b-2 border-green-500 flex">
        <div class="w-1/4">
          <img :src="item.image" alt="Book cover" class="w-full h-auto rounded-md">
        </div>
        <div class="w-3/4 ml-3">
          <p class="text-xs">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [
        { title: 'Hát Giông Tâm Hồn', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
        { title: 'Thế Giới Này Làm Sao Để Yêu Nhau', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
        { title: 'Vô Nhất', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain    ' },
        { title: 'Lam Đì', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
        { title: 'Và Đột Nhiên Gió Thổi', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
        { title: 'Đời Lưa Xung Đột', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
      ],
      repeatedItems: [
        { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì đó lớn, cả vũ trụ sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
        { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì đó lớn, cả vũ trụ sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
        { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì đó lớn, cả vũ trụ sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
        { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì đó lớn, cả vũ trụ sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
      ],
    };
  },
};
</script>

