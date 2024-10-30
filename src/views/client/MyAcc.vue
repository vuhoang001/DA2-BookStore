<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-col md:flex-row">
      <div class="w-full md:w-1/3 p-4">
        <div class="bg-white rounded-lg shadow-md p-6 mx-auto " style="height: 681px;">
          <img :src="user.avatar" alt="User Avatar" class="w-40 h-40 rounded-full mx-auto mb-4" />
          <h2 class="text-center text-xl font-semibold">{{ user.displayName }}</h2>
          <p class="text-center text-gray-600">{{ user.role }}</p>
          <div class="flex justify-center">
            <button class="mt-4 bg-green-500 text-white py-2 px-4 rounded">Chọn ảnh</button>
          </div>
        </div>
      </div>
      <div class="w-full md:w-1/3 p-4">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-lg font-semibold mb-4">Thông tin người dùng</h3>
          <form @submit.prevent="saveInfo">
            <div class="mb-4">
              <label class="block text-gray-700">Tên hiển thị</label>
 
        <InputText v-model="user.displayName" type="text" variant="filled" style="width: 100%;"/>

                   </div>
            <div class="mb-4">
              <label class="block text-gray-700">Họ và tên</label>
              <InputText v-model="user.fullName" type="text" variant="filled" style="width: 100%;"/>     </div>
            <div class="mb-4">
              <label class="block text-gray-700">Địa chỉ</label>
              <InputText v-model="user.address" type="text" variant="filled" style="width: 100%;" />      </div>
            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded">Lưu thông tin</button>
          </form>
        </div>

        <div class="bg-white rounded-lg shadow-md p-6 mt-6">
          <h3 class="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
          <form @submit.prevent="changePassword">
            <div class="mb-4">
              <label class="block text-gray-700">Mật khẩu hiện tại</label>
              <InputText v-model="currentPassword" type="text" variant="filled" style="width: 100%;"/>  </div>
            <div class="mb-4">
              <label class="block text-gray-700">Mật khẩu mới</label>
              <InputText v-model="newPassword" type="text" variant="filled" style="width: 100%;" />     </div>
            <div class="mb-4">
              <label class="block text-gray-700">Nhập lại mật khẩu</label>
              <InputText v-model="confirmPassword" type="text" variant="filled" style="width: 100%;"/>      </div>
            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded">Cập nhật</button>
          </form>
        </div>
      </div>
      <div class="w-full md:w-1/3 p-4">
        <div class="bg-white rounded-lg shadow-md p-6 mx-auto flex flex-col" style="height: 681px;">
          <div class="mb-4">
            <label class="block text-gray-700">Tên đăng nhập/Email</label>
            <InputText v-model="user.email" type="text" variant="filled" style="width: 100%;" />    </div>
          <div class="mb-4">
            <label class="block text-gray-700">Số điện thoại</label>
            <InputText v-model="user.phone" type="text" variant="filled" style="width: 100%;"/>   </div>
          <p class="text-gray-600">
            <i class="pi pi-user ml-3 mr-3" style="color: #708090"></i>Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu khác
          </p>
          <p class="text-gray-600">
            <i class="pi pi-shield ml-3 mr-3" style="color: #708090"></i>Mật khẩu tài khoản của bạn phải đáp ứng yêu cầu sau:</p>
          <ul class="list-disc pl-5 text-gray-600">
            <li>Có ít nhất 5 ký tự</li>
            <li>Có ít nhất 5 một chữ hoa và một chữ thường</li>
            <li>Có ít nhất 5 ký tự đặc biệt</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const value = ref(null);
const user = ref({
  avatar: 'https://scontent.fhan14-1.fna.fbcdn.net/v/t39.30808-6/375302486_274868785339469_2172566997284182753_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEm7ulUpZcoOMmWNyDM4muvGldj0w7q2j8aV2PTDuraP-IBv7ZChNqp1e5vQAaNJkbo0c9uO7Shwn3z8LDKQCab&_nc_ohc=F9J0wHvPnF8Q7kNvgEK42hP&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=A9X3BJTayLZOAUoTjt2ShC7&oh=00_AYB10jHgK_y0LCu3wfC4w2x0UZdtrlabK5V5NEQc8bw1Zg&oe=6727FDC8', // Đường dẫn đến ảnh đại diện
  displayName: 'Nguyễn Toàn Thắng',
  fullName: 'Nguyễn Toàn Thắng',
  address: 'Mỹ Đình 1, Nam Từ Liêm, Hà Nội, Việt Nam',
  role: 'Quản trị viên',
  email: '',
  phone: '',
});

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

function saveInfo() {
  console.log('Thông tin đã được lưu:', user.value);
}

function changePassword() {

  console.log('Mật khẩu đã được thay đổi:', newPassword.value);
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
