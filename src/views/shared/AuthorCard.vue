<template>
  <div>
    <Image alt="Image" preview>
      <template #indicatoricon>
        <i class="pi pi-search"></i>
      </template>
      <template #image>
        <img
          :src="rawData.authorImage"
          class="h-[400px] w-full object-cover overflow-hidden"
          crossorigin="anonymous"
          alt="image"
        />
      </template>
      <template #preview="slotProps">
        <img
          class="w-full"
          w-full
          crossorigin="anonymous"
          :src="rawData.authorImage"
          alt="preview"
          :style="slotProps.style"
          @click="slotProps.onClick"
        />
      </template>
    </Image>
    <span class="text-center block mt-4 text-xl hover:underline cursor-pointer"
      ><router-link :to="{ name: 'AuthorClient', params: { slug: rawData.slug } }"
        >{{ rawData.authorName }}
      </router-link>
    </span>
  </div>
</template>

<script setup>
defineProps({
  rawData: {
    type: String,
    required: true,
  },
});
</script>
