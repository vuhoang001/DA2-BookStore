<template>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <div class="flex justify-between">
        <div class="font-semibold text-2xl">Quản lý thể loại</div>
        <div>
            <Button label="Thêm mới" @click="openDialog('A')" icon="pi pi-plus"></Button>
        </div>
    </div>

    <div class="card mt-5">
        <DataTable showGridlines :value="filteredGenre" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]">
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search"> </i>
                        </InputIcon>
                        <InputText v-model="filterGenre" placeholder="Tìm kiếm từ ..."></InputText>
                    </IconField>
                </div>
            </template>
            <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
            <template #loading> Đang tải dữ liệu ... </template>
            <Column header="Tên thể loại" field="genreName"></Column>
            <Column header="Mô tả thể loại" field="genreDescription"></Column>
            <Column header="" style="width: 8rem">
                <template #body="{ data }">
                    <div class="flex justify-evenly">
                        <Button icon="pi pi-pencil" @click="openDialog('U', data)" severity="secondary" text></Button>
                        <Button icon="pi pi-trash" @click="confirmDelete(data.slug)" text severity="danger"></Button>
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="toggleDialog" :header="currentDialog == 'A' ? 'Thêm thể loại' : 'Chỉnh sửa thể loại'" style="width: 45%">
        <div class="flex flex-col gap-3 mb-5">
            <label for="genreName" class="font-semibold">Tên thể loại</label>
            <InputText v-model="payloadDialog.genreName" id="genreName" class="flex-auto" autocomplete="off"></InputText>
        </div>
        <div class="flex flex-col gap-3 mb-5">
            <label for="genreDescription" class="font-semibold"> Mô tả thể loại</label>
            <InputText id="genreDescription" v-model="payloadDialog.genreDescription" class="flex-auto" autocomplete="off"></InputText>
        </div>
        <div class="flex justify-end gap-3 mb-4">
            <Button label="Hủy" severity="secondary"></Button>
            <Button label="Lưu" @click="saveDialog(currentDialog)" severity="success"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import API from '../../api/api-main';

import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
const confirm = useConfirm();
const toast = useToast();

const filterGenre = ref('');
const toggleDialog = ref(false);
const genreDatas = ref([]);
const currentDialog = ref('A');
const payloadDialog = ref({
    _id: '',
    genreName: '',
    genreDescription: '',
    slug: ''
});

//Datatable
onMounted(() => {
    GetAllGenre();
});

const GetAllGenre = async () => {
    try {
        const res = await API.get('genre');
        genreDatas.value = Array.isArray(res.data.metadata) ? res.data.metadata : [];
    } catch (err) {
        console.log(err);
    }
};

const filteredGenre = computed(() => {
    if (!Array.isArray(genreDatas.value)) return [];
    return genreDatas.value.filter((item) => {
        return item.genreName.toLowerCase().includes(filterGenre.value.toLowerCase()) || item.genreDescription.toLowerCase().includes(filterGenre.value.toLowerCase());
    });
});

const confirmDelete = async (slug) => {
    confirm.require({
        message: 'Bạn có chắc muốn xóa bản ghi này không ?',
        header: 'Thông báo',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Hủy',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Xóa',
            severity: 'danger'
        },
        accept: async () => {
            try {
                const res = await API.delete(`/genre/${slug}`);
                toast.add({ severity: 'info', summary: 'Thành Công', detail: 'Thao tác thành công', life: 3000 });
                await GetAllGenre();
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
            }
        },
        reject: () => {}
    });
};
// End datatable

// Dialog
const resetForm = () => {
    payloadDialog.value._id = '';
    payloadDialog.value.genreDescription = '';
    (payloadDialog.value.genreName = ''), (payloadDialog.value.slug = '');
};
const openDialog = (mode, data = null) => {
    toggleDialog.value = true;
    currentDialog.value = mode;
    if (mode == 'U' && data) {
        payloadDialog.value._id = data._id;
        payloadDialog.value.genreName = data.genreName;
        payloadDialog.value.genreDescription = data.genreDescription;
        payloadDialog.value.slug = data.slug;
    } else {
        resetForm();
    }
};

const saveDialog = async (mode) => {
    console.log(mode);
    if (mode == 'U') {
        try {
            const res = await API.update(`genre/${payloadDialog.value.slug}`, payloadDialog.value);
            toggleDialog.value = false;
            await GetAllGenre();
            if (res && res.status == 200) {
                toast.add({ severity: 'info', summary: 'Thành Công', detail: 'Thao tác thành công', life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
            }
        } catch (error) {
            console.log(error);
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
        }
    } else {
        try {
            const res = await API.create('/genre', payloadDialog.value);
            toggleDialog.value = false;
            await GetAllGenre();
            if (res && res.status == 200) {
                toast.add({ severity: 'info', summary: 'Thành Công', detail: res.data.message, life: 3000 });
            } else {
                toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
            }
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: error, life: 3000 });
        }
    }
};
// End dialog
</script>
