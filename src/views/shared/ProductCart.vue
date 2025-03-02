<template>
  <div>
    <div>
      <Image alt="Image" preview>
        <template #indicatoricon>
          <i class="pi pi-search"></i>
        </template>
        <template #image>
          <img
            :src="rawData.imageBook"
            class="w-[230px] h-[250px] object-cover overflow-hidden"
            crossorigin="anonymous"
            alt="image"
          />
        </template>
        <template #preview="slotProps">
          <img
            style="height: 80%"
            crossorigin="anonymous"
            :src="rawData.imageBook"
            alt="preview"
            :style="slotProps.style"
            @click="slotProps.onClick"
          />
        </template>
      </Image>
    </div>
    <div class="absolute top-4 right-4"></div>
    <div class="m-8 ml-0 mt-0 flex flex-col gap-2">
      <router-link :to="{ name: 'DetailBook', params: { slug: rawData.slug } }">
        <div class="overflow-hidden max-w-[200px] text-left text-ellipsis">
          <span class="text-xl hover:underline cursor-pointer hover:text-green-700">{{
            rawData.bookName
          }}</span>
        </div>
      </router-link>
      <router-link
        v-if="rawData.authorBook !== null"
        :to="{
          name: 'AuthorClient',
          params: { slug: rawData?.authorBook?.slug || '#' },
        }"
      >
        <span class="text-base hover:underline cursor-pointer hover:text-green-700">{{
          rawData?.authorBook?.authorName
        }}</span>
      </router-link>
      <span class="text-base cursor-pointer"
        >{{
          currency(calculateDiscountedPrice(rawData.price, rawData.discount), {
            symbol: "đ",
            separator: ",",
          })
        }}
        đ
        <Tag v-if="rawData.discount > 0" severity="danger" class="ml-3"
          >{{ rawData.discount }} %</Tag
        ></span
      >
      <span v-if="rawData.discount > 0" class="cursor-pointer line-through text-sm italic"
        >{{ currency(rawData.price, { symbol: "đ", separator: "," }) }} đ</span
      >
      <Rating v-model="rawData.rating" />
    </div>
  </div>
</template>

<script setup>
import currency from "currency.js";
defineProps({
  rawData: {
    type: String,
    required: true,
  },
});

const calculateDiscountedPrice = (price, discount) => {
  return price - price * (discount / 100);
};
</script>
