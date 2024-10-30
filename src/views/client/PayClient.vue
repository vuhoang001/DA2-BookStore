<template>
  <div class="flex flex-col gap-5 p-5">
    <div class="flex gap-5">
      <div class="border border-gray-300 p-4 rounded flex-1">
        <h2 class="text-lg font-semibold mb-2">Thông tin nhận hàng</h2>
        <form>
          <input type="email" placeholder="Email" class="border p-2 mb-2 w-full" />
          <input type="text" placeholder="Họ và tên" class="border p-2 mb-2 w-full" />
          <input type="tel" placeholder="Số điện thoại" class="border p-2 mb-2 w-full" />
          <input type="text" placeholder="Địa chỉ" class="border p-2 mb-2 w-full" />
          <select class="border p-2 mb-2 w-full">
            <option>Tỉnh thành</option>
            <!-- thêm các tỉnh thành -->
          </select>
          <select class="border p-2 mb-2 w-full">
            <option>Quận huyện</option>
            <!-- thêm các quận huyện -->
          </select>
          <select class="border p-2 mb-2 w-full">
            <option>Phường xã</option>
            <!-- thêm các phường xã -->
          </select>
          <textarea placeholder="Ghi chú" class="border p-2 mb-2 w-full"></textarea>
        </form>
      </div>

      <div class="border border-gray-300 p-4 rounded flex-1">
        <h2 class="text-lg font-semibold mb-2">Vận chuyển</h2>
        <form>
          <input type="text" placeholder="Thông tin giao hàng" class="border p-2 mb-2 w-full" />
          <select class="border p-2 mb-2 w-full">
            <option>Thanh toán khi giao hàng (COD)</option>
          </select>
        </form>
      </div>

      <div class="border border-gray-300 p-4 rounded flex-1">
        <h2 class="text-lg font-semibold mb-2">Đơn hàng (1 sản phẩm)</h2>
        <div class="order-details mb-4">
          <img :src="product.image" alt="Product Image" class="mb-2 w-32 h-32 object-cover" /> <!-- Thay đổi kích thước ảnh -->
          <p>{{ product.name }}</p>
          <p>Giảm {{ product.discount.percentage }} so với giá bìa (-{{ product.discount.amount }}đ)</p>
          <p>Tạm tính: {{ product.subtotal }}đ</p>
          <p>Phí vận chuyển: {{ product.shippingFee }}đ</p>
          <p class="font-bold">TỔNG CỘNG: {{ product.total }}đ</p>
          <input type="text" placeholder="Nhập mã giảm giá" class="border p-2 mb-2 w-full" />
          <button class="bg-green-500 text-white p-2 rounded">Áp dụng</button>
        </div>
        <button class="bg-blue-500 text-white p-2 rounded w-full">ĐẶT HÀNG</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const product = {
  image: 'https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/375302486_274868785339469_2172566997284182753_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEm7ulUpZcoOMmWNyDM4muvGldj0w7q2j8aV2PTDuraP-IBv7ZChNqp1e5vQAaNJkbo0c9uO7Shwn3z8LDKQCab&_nc_ohc=pbkT9q1GJXIQ7kNvgGRkPai&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=A7rB9LotEhEfsp7S1vyYTzX&oh=00_AYCqPzXYhmlie8q7hSeslEFsgAphJA6WEHZcXfDM-lZRhw&oe=671EFB88', 
  name: 'TENTANG KAMU',
  discount: {
    percentage: '15%',
    amount: '14.250'
  },
  subtotal: '80.750',
  shippingFee: '0',
  total: '80.750'
};
</script>

<style scoped>

</style>
