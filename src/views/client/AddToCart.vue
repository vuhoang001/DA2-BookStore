<template>
  <div class="book-container">
    <div class="book-image">
      <img :src="book.cover" :alt="book.title" />
    </div>
    <div class="book-details">
      <h2>{{ book.title }}</h2>
      <p>Tác giả: {{ book.author }}</p>
      <p class="price">
        <span class="current-price">{{ book.currentPrice }}đ</span>
        <span class="original-price">{{ book.originalPrice }}đ</span>
        <span class="discount">{{ book.discount }}%</span>
      </p>
      <div class="quantity">
        <label for="quantity">Số lượng:</label>
        <input type="number" id="quantity" v-model="quantity" min="1" />
      </div>
      <div class="buttons">
        <button class="add-to-cart" @click="addToCart">Thêm vào giỏ hàng</button>
        <button class="buy-now" @click="buyNow">Mua ngay</button>
      </div>
      <p class="stock">Còn lại {{ book.stock }} trong kho</p>
    </div>
    
  </div>
  <div class="" style="display: flex; background-color: white;">
  <div class="book-introduction">
        <h2 style="font-size: 30px; color:green;">Giới thiệu sách</h2>
        <p>{{ book.introduction }}</p>
      </div>
<div class="book-details-info">

    <h2 style="font-size: 30px; color: green;">Thông tin chi tiết</h2>
    <ul class="book-details-list">
      <li>Tác giả: {{ book.author }}</li>
      <li>Số trang: {{ book.pages }}</li>
      <li>Ngày phát hành: {{ book.releaseDate }}</li>
      <li>Giá: {{ book.currentPrice }}</li>
    </ul>
</div>
</div>
</template>

<script setup>
import { ref } from 'vue';

const book = {
  title: 'MỘT THỬ NGHIỆM PHÊ BÌNH',
  author: 'C. S. LEWIS',
  cover: 'https://product.hstatic.net/200000343865/product/7_078e3758126642d1b9db23b05633e6a8_master.jpg', // Thay bằng URL thực tế
  currentPrice: 80750,
  originalPrice: 95000,
  discount: 19,
  stock: 99,
  introduction: 'Một thử nghiệm phê bình là tác phẩm quan trọng của C. S. Lewis được xuất bản vào năm 1961. Trong bối cảnh có nhiều lý thuyết cực đoan về việc đọc và giá trị của sách, ông đã đưa ra một quan điểm hoàn toàn khác biệt.',

  pages: 212,
  releaseDate: '2024',
};

const quantity = ref(1);

const addToCart = () => {
  console.log(`Thêm ${quantity.value} ${book.title} vào giỏ hàng.`);
};

const buyNow = () => {
  console.log(`Mua ngay ${quantity.value} ${book.title}.`);
};
</script>

<style scoped>
.book-container {
  display: flex;
justify-content: center;
align-items: center;
  padding: 24px; 
  max-width: 120rem; 
  background-color: #fff;
  max-height: 1000px;
}

.book-image img {
  max-width: 200px; 
  border-radius: 6px; 
}

.book-details {
  margin-left: 24px; 
}

.book-details h2 {
  font-size: 24px;
  margin: 0;
}

.book-details p {
  margin: 6px 0; 
}

.price {
  font-size: 20px; 
  color: #d9534f; 
}

.original-price {
  text-decoration: line-through;
  color: #999;
  margin-left: 8px;
}

.discount {
  color: #d9534f;
  margin-left: 8px;
}

.quantity {
  margin: 16px 0; 
}

.buttons {
  display: flex;
  gap: 12px; 
}

.add-to-cart,
.buy-now {
  padding: 12px 24px;
  border: none;
  border-radius: 6px; 
  cursor: pointer;
}

.add-to-cart {
  background-color: #f0ad4e; 
}

.buy-now {
  background-color: #5cb85c;
  color: white;
}

.stock {
  margin-top: 12px; 
  font-size: 16px; 
  color: #777;
}

.book-introduction {
  padding-top: 20px; 
  width: 800px;
  padding-left: 200px;
  height: 300px;
}

.book-details-info {
  padding-top: 20px; 
  width: 800px;
  padding-left: 200px;
  height: 300px;
}

.book-details-info ul {
  list-style-type: none; 
  padding: 0; 
}

.book-details-info li {
  margin: 5px 0; 
}

.book-details-list {
  border: 3px solid;
  padding: 10px; 
  border-radius: 5px;
  justify-items: center;
  width: 200px;
}
</style>
