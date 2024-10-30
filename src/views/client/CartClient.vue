<template>
    <div class="card">
        <DataTable 
            :value="customers" 
            paginator 
            :rows="5" 
            :rowsPerPageOptions="[5, 10, 20, 50]" 
            tableStyle="min-width: 50rem"
        >
            <Column field="image" header="Ảnh" style="width: 10%">
                <template #body="slotProps">
                    <img :src="slotProps.data.image" alt="Customer Image" class="w-20 h-20 object-cover" />
                </template>
            </Column>
            <Column field="name" header="Name" style="width: 25%"></Column>
            <Column field="price" header="Đơn giá" style="width: 25%">
                <template #body="slotProps">
                    {{ slotProps.data.price }}đ
                </template>
            </Column>
            <Column field="quantity" header="Số lượng" style="width: 25%">
                <template #body="slotProps">
                    <input 
                        type="number" 
                        v-model.number="slotProps.data.quantity" 
                        min="1" 
                        class="border rounded p-1 w-20 text-center" 
                    />
                </template>
            </Column>
            <Column field="total" header="Tổng tiền" style="width: 25%">
                <template #body="slotProps">
                    {{ calculateTotal(slotProps.data) }}đ
                </template>
            </Column>
        </DataTable>
        <div class="total flex justify-end mt-5">
            <span class="mr-2">Tổng tiền:</span>
            <span>{{ grandTotal }}đ</span>
        </div>
        <div class="flex justify-end mt-5">
            <button class="checkout-button bg-green-500 text-white py-3 px-6 text-lg border-none cursor-pointer hover:bg-green-600">Thanh toán</button>
        </div>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

// Static data for customers with image, price, and quantity fields
const customers = ref([
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "John Doe", price: 100000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "Jane Smith", price: 200000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "Alice Johnson", price: 150000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "Bob Brown", price: 250000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "Charlie Black", price: 300000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "Diana White", price: 180000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "Ethan Green", price: 220000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "Fiona Blue", price: 130000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "George Yellow", price: 170000, quantity: 1 },
    { image: "https://filmdaily.co/wp-content/uploads/2022/11/188bet-lede.jpg", name: "Hannah Purple", price: 190000, quantity: 1 },
]);

// Function to calculate total for each customer
const calculateTotal = (customer) => {
    return customer.price * customer.quantity;
};

// Calculate grand total
const grandTotal = computed(() => {
    return customers.value.reduce((sum, customer) => sum + calculateTotal(customer), 0);
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
