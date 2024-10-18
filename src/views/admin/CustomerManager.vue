<template>
    <div>
        <div class="flex justify-between">
            <div class="font-semibold text-2xl">Danh sách khách hàng</div>
            <div>
                <Button label="Thêm mới" @click="openDialog('A')" icon="pi pi-plus"></Button>
            </div>
        </div>
        <div class="card mt-5">
            <DataTable :value="filteredItems" showGridlines paginator :rows="10">
                <template #header>
                    <div class="flex justify-end">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search"> </i>
                            </InputIcon>
                            <InputText v-model="filterCustomer" placeholder="Tìm kiếm từ ..."></InputText>
                        </IconField>
                    </div>
                </template>
                <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
                <template #loading> Đang tải dữ liệu ... </template>
                <Column header="Mã khách hàng" field="customerCode"></Column>
                <Column header="Tên khách hàng" field="customerName"></Column>
                <Column header="Số điện thoại" field="phone"></Column>
                <Column header="Địa chỉ" field="phone"></Column>
                <Column header="" style="width: 8rem;">
                    <template #body="{data}">
                        <Button icon="pi pi-pencil" severity="secondary" @click="openDialog('U', data)" text></Button>
                        <Button icon="pi pi-trash" text severity="danger"</Button>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <Dialog style="width: 45%" :header="currentDialogMode == 'A' ? ' Thêm mới khách hàng' : ' Chỉnh sửa khách hàng'" v-model:visible="toggleDialog"> 
        <div class="flex items-center gap-4 mb-4">
            <label for="username" class="font-semibold">Tên khách hàng</label>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const filterCustomer = ref('')
const toggleDialog = ref(false)
const currentDialogMode = ref('A')
const payloadDialog = ref({
    customerCode: '', 
    customerName: '', 
    phone: '', 
    address: ''
})
const customer = ref([
    {
        customerCode: 'Customer code',
        customerName: 'Customer name 21',
        phone: '098982892',
        address: 'Ha noi que toi '
    },{
        customerCode: 'Customer code 1',
        customerName: 'Customer name 2',
        phone: '098982892',
        address: 'Ha noi que toi '
    }, {
        customerCode: 'Customer code 2',
        customerName: 'Customer name 3',
        phone: '098982892',
        address: 'Ha noi que toi '
    },{
        customerCode: 'Customer code 3',
        customerName: 'Customer name 5',
        phone: '098982892',
        address: 'Ha noi que toi '
    },
]);

const filteredItems = computed(() => {
    return customer.value.filter(item => {
        return (
            item.customerCode.toLowerCase().includes(filterCustomer.value.toLowerCase()) || 
            item.customerName.toLowerCase().includes(filterCustomer.value.toLowerCase()) || 
            item.phone.toLowerCase().includes(filterCustomer.value.toLowerCase()) || 
            item.address.toLowerCase().includes(filterCustomer.value.toLowerCase())
        )
    })
})

const resetForm = () => {
    payloadDialog.value = {
        customerName: '', 
        customerCode: '', 
        phone: '', 
        address: ''
   } 
}

const closeDialog = () => {
    toggleDialog.value = false
}

const openDialog = (mode, data = null) => {
    toggleDialog.value = true
    currentDialogMode.value = mode
    if (mode = 'U' && data) {
        payloadDialog.value.customerName = data.customerName 
        payloadDialog.value.customerCode = data.customerName
        payloadDialog.value.phone = data.phone
        payloadDialog.value.address = data.address
        console.log(payloadDialog.value)

    } else {
        resetForm()
    }
}

</script>
