<template>
  <div class="author-frame">
    <div class="author-info">
      <div class="info-content">
        <h2 class="author-name">{{ author.name }}</h2>
        <p class="author-description">{{ author.description }}</p>
        <div class="social-links">
          <span >Chia sẻ ngay:</span>
          <a href="#" class="facebook">Facebook</a>
          <a href="#" class="instagram">Instagram</a>
          <a href="#" class="youtube">YouTube</a>
        </div>
      </div>
    </div>
    <div class="author-image">
      <img :src="author.imageUrl" :alt="author.name">
    </div>
  </div>
</template>

<script setup>
const author = {
  name: 'KHANH LE',
  description: 'Sinh năm 1978, hiện đang giảng dạy đại học ngành kỹ thuật, nghiên cứu về hệ thống kế hạ thống điều khiển và tự động hóa. ...',
  imageUrl: 'https://th.bing.com/th/id/R.af1bcf25049caf328b8da7eb6d566d2f?rik=0sB4X%2fb5vbmkKg&riu=http%3a%2f%2fi.huffpost.com%2fgadgets%2fslideshows%2f306562%2fslide_306562_2651832_free.jpg&ehk=U0zTbRTIOo6fuYHhQarm3wF097%2b3Q2Jsp0OGdVspJw0%3d&risl=&pid=ImgRaw&r=0'
}
</script>

<style scoped>
.author-frame {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  height: 700px;
}

.author-info {
  flex: 1;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-content {
  padding: 20px;
  max-width: 90%;
}

.author-name {
  font-size: 24px;
  margin-bottom: 10px;
}

.author-description {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.social-links {
  margin-top: 20px;
}

.social-links a {
  display: inline-block;
  margin-right: 10px;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
}

.facebook { background-color: #3b5998; }
.instagram { background-color: #e4405f; }
.youtube { background-color: #ff0000; }

.author-image {
  flex: 1;
  max-width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.author-image img {
  width: 500px;
  height: 281px;
  object-fit: cover;
}
</style>
