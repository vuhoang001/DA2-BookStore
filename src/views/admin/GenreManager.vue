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
            <Column header="Tên thể loại" style="width: 20rem" field="genreName"></Column>
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
        <template v-if="isLoading">
            <div class="flex justify-center items-center h-[50rem]">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </div>
        </template>
        <template v-else>
            <div class="flex flex-col gap-3 mb-5">
                <label for="genreName" class="font-semibold">Tên thể loại</label>
                <InputText v-model="payloadDialog.genreName" id="genreName" class="flex-auto" autocomplete="off"></InputText>
            </div>
            <div class="flex flex-col gap-3 mb-5">
                <label for="genreDescription" class="font-semibold"> Mô tả thể loại</label>
                <InputText id="genreDescription" v-model="payloadDialog.genreDescription" class="flex-auto" autocomplete="off"></InputText>
            </div>
            <div class="flex justify-end gap-3 mb-4">
                <Button label="Hủy" @click="toggleDialog = false" severity="secondary"></Button>
                <Button label="Lưu" @click="saveDialog(currentDialog)" severity="success"></Button>
            </div>
        </template>
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
const isLoading = ref(false);
const genreDatas = ref([]);
const currentDialog = ref('A');
const payloadDialog = ref({
    _id: '',
    genreName: '',
    genreDescription: '',
    slug: ''
});

const clearDialogData = JSON.stringify(payloadDialog.value);
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
    payloadDialog.value = JSON.parse(clearDialogData);
};

const validate = () => {
    const fields = ['genreName', 'genreDescription'];
    for (var field of fields) {
        if (typeof payloadDialog.value[field] == 'string' && payloadDialog.value[field] == '') {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Nhập thiếu trường. Vui lòng nhập dầy đủ!', life: 3000 });
            return false;
        }
    }
    return true;
};

const openDialog = (mode, data = null) => {
    toggleDialog.value = true;
    currentDialog.value = mode;
    const fields = ['_id', 'genreName', 'genreDescription', 'slug'];
    if (mode == 'U' && data) {
        fields.forEach((item) => (payloadDialog.value[item] = data[item]));
    } else {
        resetForm();
    }
};

const saveDialog = async (mode) => {
    if (mode !== 'U' && !validate()) {
        toggleDialog.value = true;
        return;
    }
    let url = mode === 'U' ? `genre/${payloadDialog.value.slug}` : `genre`;
    let funcAPI = mode === 'U' ? API.update(url, payloadDialog.value) : API.create(url, payloadDialog.value);
    try {
        isLoading.value = true;
        const res = await funcAPI;
        if (res && res.status) {
            toast.add({ severity: 'info', summary: 'Thành Công', detail: 'Thao tác thành công', life: 3000 });
        }
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
    } finally {
        GetAllGenre();
        isLoading.value = false;
        toggleDialog.value = false;
    }
};
// End dialog
</script>
