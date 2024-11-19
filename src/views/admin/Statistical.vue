<template>
    <div class="flex gap-10 card">
        <div class="basis-1/3 bg-gray-100 p-5 rounded-lg">
            <div class="flex justify-between items-center">
                <div class="flex flex-col gap-2">
                    <span class="text-xl"> Tỷ lệ bán hàng</span>
                    <span class="text-2xl font-semibold"> + 24 %</span>
                </div>
                <div>
                    <Button icon="pi pi-shopping-cart"></Button>
                </div>
            </div>
        </div>
        <div class="basis-1/3 bg-gray-100 p-5 rounded-lg">
            <div class="flex justify-between items-center">
                <div class="flex flex-col gap-2">
                    <span class="text-xl"> Khách hàng mới</span>
                    <span class="text-2xl font-semibold"> + 24 %</span>
                </div>
                <div>
                    <Button icon="pi pi-shopping-cart" severity="warn"></Button>
                </div>
            </div>
        </div>
        <div class="basis-1/3 bg-gray-100 p-5 rounded-lg">
            <div class="flex justify-between items-center">
                <div class="flex flex-col gap-2">
                    <span class="text-xl"> Doanh thu</span>
                    <span class="text-2xl font-semibold"> + 24 %</span>
                </div>
                <div>
                    <Button icon="pi pi-shopping-cart" severity="danger"></Button>
                </div>
            </div>
        </div>
    </div>

    <div class="flex card">
        <!-- <div class="basis-1/2"> -->
            <div class="w-full">
                <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
            </div>
        <!-- </div> -->
        <!-- <div class="basis-1/2">
            <DataTable showGridlines>
                <template #header>
                    <div class="text-2xl font-semibold">Bán gần đây</div>
                </template>
                <Column header=" Mã khóa học"></Column>
                <Column header=" Tên khóa học"></Column>
                <Column header=" Giá khóa học"></Column>
            </DataTable>
        </div> -->
    </div>

    <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Best Selling Products</div>
            <div>
                <Button icon="pi pi-ellipsis-v" class="p-button-text p-button-plain p-button-rounded" @click="$refs.menu2.toggle($event)"></Button>
                <Menu ref="menu2" :popup="true" :model="items" class="!min-w-40"></Menu>
            </div>
        </div>
        <ul class="list-none p-0 m-0">
            <li class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">Space T-Shirt</span>
                    <div class="mt-1 text-muted-color">Clothing</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div class="bg-orange-500 h-full" style="width: 50%"></div>
                    </div>
                    <span class="text-orange-500 ml-4 font-medium">%50</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import Chart from 'primevue/chart';

import { ref, onMounted } from 'vue';

const chartData = ref();
const chartOptions = ref();
const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: documentStyle.getPropertyValue('--p-green-500'),
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                backgroundColor: documentStyle.getPropertyValue('--p-green-200'),
                borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
};

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});
</script>
