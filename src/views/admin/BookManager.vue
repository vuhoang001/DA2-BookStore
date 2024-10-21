<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="flex justify-between">
        <div class="font-semibold text-2xl">Quản lý sách</div>
        <div>
            <Button label="Thêm mới" @click="openDialog('A')" icon="pi pi-plus"></Button>
        </div>
    </div>
    <div class="cart mt-5">
        <DataTable :value="filteredBook">
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search"> </i>
                        </InputIcon>
                        <InputText v-model="filterBook" placeholder="Tìm kiếm từ ..."></InputText>
                    </IconField>
                </div>
            </template>
            <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
            <template #loading> Đang tải dữ liệu ... </template>
            <Column header="Tên sách" field="bookName"></Column>
            <Column header="Ảnh">
                <template #body="{ data }">
                    <div class="flex justify-center">
                        <img :src="data.imageBook" alt="" style="width: 100px; height: 100px" />
                    </div>
                </template>
            </Column>
            <Column header="Tác giả" field="authorBook"></Column>
            <Column header="Thể loại" field="genre"></Column>
            <!-- <Column header="Mô tả sách" field="bookDescription"></Column> -->
            <!-- <Column header="Tóm tắt" field="summary"></Column> -->
            <Column header="Số lượng" field="quantity"></Column>
            <Column header="Giá" field="price"></Column>
            <Column header="Tổng trang" field="totalPages"></Column>
            <Column header="Ngày xuất bản" field="releaseTime"></Column>
            <Column header="Kích thước" field="size"></Column>
            <Column header="Đánh giá" field="rating"></Column>
        </DataTable>
    </div>

    <Dialog style="width: 45%" :header="currentDialogMode == 'A' ? 'Thêm mới sách' : 'Chỉnh sửa sách'" v-model:visible="toggleDialog">
        <div class="flex flex-col gap-3 mb-5">
            <label for="bookName">Tên sách</label>
            <InputText id="bookName" class="flex-auto" autocomplete="false" v-model="payloadDialog.bookName"></InputText>
        </div>
        <div class="flex flex-col gap-3 mb-5">
            <label for="bookName">Tên sách</label>
            <InputText id="bookName" class="flex-auto" autocomplete="false" v-model="payloadDialog.bookName"></InputText>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import API from '../../api/api-main';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';

const toast = useToast();
const confirm = useConfirm();

const filterBook = ref('');
const booksData = ref([]);
const currentDialogMode = ref('A');
const toggleDialog = ref(false);
const payloadDialog = ref({
    _id: '',
    bookName: '',
    authorBook: '',
    genre: '',
    bookDescription: '',
    summary: '',
    quantity: '',
    price: '',
    totalPages: '',
    releaseTime: '',
    size: '',
    rating: '',
    slug: ''
});

// Datatable
onMounted(() => {
    GetAllBooks();
});

const GetAllBooks = async () => {
    try {
        const res = await API.get('book');
        booksData.value = Array.isArray(res.data.metadata) ? res.data.metadata : [];
    } catch (error) {
        console.log(error);
    }
};

const filteredBook = computed(() => {
    if (!Array.isArray(booksData.value)) return [];
    return booksData.value.filter((item) => {
        return (
            item.bookName.toLowerCase().includes(filterBook.value.toLowerCase()) ||
            item.authorBook.toLowerCase().includes(filterBook.value.toLowerCase()) ||
            item.genre.toLowerCase().includes(filterBook.value.toLowerCase()) ||
            item.quantity.toLowerCase().includes(filterBook.value.toLowerCase()) ||
            item.price.toLowerCase().includes(filterBook.value.toLowerCase()) ||
            item.totalPages.toLowerCase().includes(filterBook.value.toLowerCase()) ||
            item.releaseTime.toLowerCase().includes(filterBook.value.toLowerCase()) ||
            item.size.toLowerCase().includes(filterBook.value.toLowerCase()) ||
            item.rating.toLowerCase().includes(filterBook.value.toLowerCase())
        );
    });
});
// End datatable

const resetForm = () => {
    payloadDialog.value._id = '';
    payloadDialog.value.bookName = '';
    payloadDialog.value.authorBook = '';
    payloadDialog.value.genre = '';
    payloadDialog.value.bookDescription = '';
    payloadDialog.value.summary = '';
    payloadDialog.value.price = '';
    payloadDialog.value.totalPages = '';
    payloadDialog.value.releaseTime = '';
    payloadDialog.value.size = '';
    payloadDialog.value.rating = '';
};

const openDialog = (mode, data = null) => {
    toggleDialog.value = true;
    currentDialogMode.value = mode;

    if (mode == 'U' && data) {
        payloadDialog.value._id = data._id;
        payloadDialog.value.bookName = data.bookName;
        payloadDialog.value.authorBook = data.authorBook;
        payloadDialog.value.genre = data.genre;
        payloadDialog.value.bookDescription = data.bookDescription;
        payloadDialog.value.summary = data.summary;
        payloadDialog.value.price = data.price;
        payloadDialog.value.totalPages = data.totalPages;
        payloadDialog.value.releaseTime = data.releaseTime;
        payloadDialog.value.size = data.size;
        payloadDialog.value.rating = data.rating;
    } else {
        resetForm();
    }
};
// End dialog
</script>
