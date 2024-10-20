<template>
  <div class="flex flex-col p-6 h-[828px] bg-gradient-to-b from-orange-50 to-orange-200">
    <div class="flex mb-6">

      <div class="w-8/12 flex justify-center">
        <div class="bg-green-200 p-2 rounded-lg" style="height: 595px; width: 640px;">
          <h2 class="text-xl font-bold mb-4 text-center">SÁCH MỚI NỔI BẬT THÁNG 10</h2>
          <div class="grid grid-cols-3 gap-4 h-[calc(100%-2.5rem)]">
            <div v-for="(book, index) in books" :key="index" class="w-full h-full flex items-center justify-center">
              <img :src="book.cover" :alt="book.title" class="w-2/3 h-2/3 object-cover rounded-md shadow-md">
            </div>
          </div>
        </div>
      </div>


      <div class="w-4/12 space-y-4 h-100 pr-2 overflow-hidden" style="height: auto; width: 460px;">
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

   
  </div>

  <div class="w-full bg-white">
    <div class="w-full flex justify-center">
      <div class="w-4/5 h-1 bg-green-500 mt-10"></div>
    </div>

    <div class="flex justify-between items-center px-80 mt-4 mb-4">
      <span class=" text-green-500">CÁC TÁC GIẢ</span>
      <a href="#" class="text-green-600 hover:text-green-700">Xem thêm ></a>
    </div>

    <div class="flex justify-center space-x-20 mt-20 pb-20">
      <div v-for="(author, index) in authors" :key="index" class="flex flex-col items-center">
        <img :src="author.avatar" :alt="author.name" class="w-36 h-36 rounded-full object-cover mb-2">
        <p class="text-sm font-semibold">{{ author.name }}</p>
      </div>
    </div>
  </div>


  <div class="w-full bg-white py-4">
    <div class="w-full flex justify-center">
      <div class="w-4/5 h-1 bg-green-500"></div>
    </div>
  </div>


  <div class="bg-white py-8 ">
      <div class="flex justify-between items-center px-80 mt-4 mb-20">
      <span class=" text-green-500">SÁCH MỚI</span>
      <a href="#" class="text-green-600 hover:text-green-700">Xem thêm ></a>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="book in newBooks" :key="book.id" class="flex flex-col items-center">
          <img :src="book.cover" :alt="book.title" class="w-48 h-64 object-cover shadow-lg mb-4">
          <h3 class="font-semibold text-lg mb-1">{{ book.title }}</h3>
          <p class="text-gray-600">{{ book.author }}</p>
          <div class="flex mt-2">
            <span v-for="i in 5" :key="i" class="text-yellow-400">
              ★
            </span>
          </div>
        </div>
      </div>
    </div>



   
  <div class="bg-white py-8 pt-20 pb-20">
    <div class="container mx-auto px-4 flex items-center">
      <div class="w-1/2 pr-8">
        <h2 class="text-2xl font-bold text-green-600 mb-4">BookStore</h2>
        <h3 class="text-xl font-semibold mb-2">Bởi vì sách là thế giới</h3>
        <p class="text-gray-700 mb-4">
          BookStore, tên đầy đủ là Công ty Cổ phần Văn hóa và Truyền thông BookStore, gia nhập thị trường sách Việt Nam vào tháng 2 năm 2005. Ngay từ cuốn sách đầu tiên, độc giả đã dành sự quan tâm và yêu mến cho một thương hiệu sách mới mẻ mang trong mình khát vọng góp phần tạo lập diện mạo mới cho xuất bản văn học ti Việt Nam.
        </p>
        <a href="#" class="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">Xem thêm</a>
      </div>
      <div class="w-1/2 flex justify-center items-center">
        <img src="https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain" alt="BookStore Interior" class="w-2/3 h-auto rounded-lg shadow-lg">
      </div>
    </div>
  </div>

  <div class="w-full flex justify-center">
      <div class="w-4/5 h-1 bg-green-500"></div>
    </div>
  <div class="bg-white py-8 ">
      <div class="flex justify-between items-center px-80 mt-4 mb-20">
      <span class=" text-green-500">SẮP XUẤT BẢN</span>
      <a href="#" class="text-green-600 hover:text-green-700">Xem thêm ></a>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="book in newBooks" :key="book.id" class="flex flex-col items-center">
          <img :src="book.cover" :alt="book.title" class="w-48 h-64 object-cover shadow-lg mb-4">
          <h3 class="font-semibold text-lg mb-1">{{ book.title }}</h3>
          <p class="text-gray-600">{{ book.author }}</p>
          <div class="flex mt-2">
            <span v-for="i in 5" :key="i" class="text-yellow-400">
              ★
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex justify-center">
      <div class="w-4/5 h-1 bg-green-500"></div>
    </div>
    <div class="bg-white py-8">
      <div class="flex justify-between items-center px-80 mt-4 mb-20">
        <span class="text-green-500">CÁC ĐỐI TÁC</span>
        <a href="#" class="text-green-600 hover:text-green-700">Xem thêm ></a>
      </div>
      

  <div class="flex justify-center items-center space-x-12">
    <span class="arrow-left cursor-pointer" @click="prevSlide"  >←</span>
    <div v-for="(partner, index) in visiblePartners" :key="index" class="flex flex-col items-center">
      <div class="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-white">
        <img :src="partner.logo" :alt="partner.name" class="max-w-full max-h-full object-contain">
      </div>
      <span class="text-sm mt-4 font-medium">{{ partner.name }}</span>
    </div>
    <span class="arrow-right cursor-pointer" @click="nextSlide">→</span>
  </div>
  </div>
</template>

<script setup>
const books = [
  { title: 'Hát Giông Tâm Hồn', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
  { title: 'Thế Giới Này Làm Sao Để Yêu Nhau', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
  { title: 'Vô Nhất', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain    ' },
  { title: 'Lam Đì', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
  { title: 'Và Đột Nhiên Gió Thổi', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
  { title: 'Đời Lưa Xung Đột', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
];

const repeatedItems = [
  { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một iều gì đó lớn, cả vũ trụ sẽ hin thc giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
  { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì đó lớn, cả vũ trụ sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
  { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì ��ó lớn, cả vũ tr sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
  { image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain', text: 'Nếu cầu muốn một điều gì đó lớn, cả vũ trụ sẽ hiện thực giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.' },
];

const authors = [
  { name: 'OSHO', avatar: 'https://th.bing.com/th/id/R.af1bcf25049caf328b8da7eb6d566d2f?rik=0sB4X%2fb5vbmkKg&riu=http%3a%2f%2fi.huffpost.com%2fgadgets%2fslideshows%2f306562%2fslide_306562_2651832_free.jpg&ehk=U0zTbRTIOo6fuYHhQarm3wF097%2b3Q2Jsp0OGdVspJw0%3d&risl=&pid=ImgRaw&r=0' },
  { name: 'KHANH LE', avatar: 'https://th.bing.com/th/id/R.af1bcf25049caf328b8da7eb6d566d2f?rik=0sB4X%2fb5vbmkKg&riu=http%3a%2f%2fi.huffpost.com%2fgadgets%2fslideshows%2f306562%2fslide_306562_2651832_free.jpg&ehk=U0zTbRTIOo6fuYHhQarm3wF097%2b3Q2Jsp0OGdVspJw0%3d&risl=&pid=ImgRaw&r=0' },
  { name: 'NHAT LINH', avatar: 'https://th.bing.com/th/id/R.af1bcf25049caf328b8da7eb6d566d2f?rik=0sB4X%2fb5vbmkKg&riu=http%3a%2f%2fi.huffpost.com%2fgadgets%2fslideshows%2f306562%2fslide_306562_2651832_free.jpg&ehk=U0zTbRTIOo6fuYHhQarm3wF097%2b3Q2Jsp0OGdVspJw0%3d&risl=&pid=ImgRaw&r=0' },
  { name: 'HOANG TRAN', avatar: 'https://th.bing.com/th/id/R.af1bcf25049caf328b8da7eb6d566d2f?rik=0sB4X%2fb5vbmkKg&riu=http%3a%2f%2fi.huffpost.com%2fgadgets%2fslideshows%2f306562%2fslide_306562_2651832_free.jpg&ehk=U0zTbRTIOo6fuYHhQarm3wF097%2b3Q2Jsp0OGdVspJw0%3d&risl=&pid=ImgRaw&r=0' },
];

const newBooks = [
  { id: 1, title: 'Tentang Kamu', author: 'Tere Liye', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
  { id: 2, title: 'Pergi', author: 'Tere Liye', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
  { id: 3, title: 'Garis Waktu', author: 'Fiersa Besari', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
  { id: 4, title: 'Becoming', author: 'Michelle Obama', cover: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain' },
];

const partners = ref([  // Sử dụng ref cho partners
  { name: 'ANFOUNDAT', logo: 'https://th.bing.com/th/id/OIP.11RKdwhWKHuh7Vlgw_2WygHaKh?rs=1&pid=ImgDetMain' },
  { name: 'MON & CHUST', logo: 'https://th.bing.com/th/id/OIP.fqZ9-PPqcG_cm0k3JfoINQHaEK?rs=1&pid=ImgDetMain' },
  { name: 'LOT DEPARTME', logo: 'https://th.bing.com/th/id/OIP.WE109lmuCjsw8asJparTPgHaHa?r s=1&pid=ImgDetMain' },
  { name: 'OSHO', logo: 'https://th.bing.com/th/id/OIP.02ZgQUtfUdNCO1BV_TIpMwHaHa?rs=1&pid=ImgDetMain' },
  { name: 'OSHO', logo: 'https://vuejs.org/images/logo.png' },
  { name: 'OSHO', logo: 'https://download.logo.wine/logo/Java_(programming_language)/Java_(programming_language)-Logo.wine.png' },
  { name: 'OSHO', logo: 'https://th.bing.com/th/id/OIP.Oag0dh4MINdG_qxOzJMoiwHaIB?rs=1&pid=ImgDetMain' },
  { name: 'OSHO', logo: 'https://th.bing.com/th/id/R.b40bc00f9942b432528f2c29971777ed?rik=ABW8meR9D5qQpQ&pid=ImgRaw&r=0' },
]);
import { computed, ref } from 'vue';
const currentIndex = ref(0);  
const itemsToShow = 4;        


const visiblePartners = computed(() => {
  return partners.value.slice(currentIndex.value, currentIndex.value + itemsToShow);  
});


const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};


const nextSlide = () => {
  if (currentIndex.value < partners.value.length - itemsToShow) {
    currentIndex.value++;
  }
};
</script>
<style scoped>
.arrow-left,
.arrow-right {
  font-size: 24px;
  cursor: pointer;
}
</style>




