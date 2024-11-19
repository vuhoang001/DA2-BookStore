<template>
    <div>
        <div class="flex my-10">
            <div class="basis-1/2 flex items-center">
                <div class="flex flex-col gap-4">
                    <label class="block text-3xl font-bold uppercase" for="">{{ author[0].name }}</label>
                    <span class="block">{{ author[0].description }}</span>
                </div>
            </div>
            <div class="basis-1/2">
                <div class="flex justify-center">
                    <img class="w-[250px] h-[250px] rounded-full object-cover" :src="author[0].image" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const author = [
    {
        name: 'Khanh le',
        description: 'Sinh năm 1978, hiện đang giảng dạy đại học ngành kỹ thuật, nghiên cứu về hệ thống kế hạ thống điều khiển và tự động hóa. ...',
        image: 'https://th.bing.com/th/id/OIP.fQniPJalhw4DFi9JHQxFfAHaKV?rs=1&pid=ImgDetMain',
        text: 'Nếu cầu muốn một iều gì đó lớn, cả vũ trụ sẽ hin thc giúp bạn điều đó, qua những dấu hiệu mà nếu cầu nhìn kỹ mới có thể nhận ra.'
    }
];
</script>
