<template>
    <div>
        <Toast />
        <ConfirmDialog></ConfirmDialog>
        <div class="flex justify-between">
            <div class="font-semibold text-2xl">Quản lý tác giả</div>
            <div>
                <Button label="Thêm mới" @click="openDialog('A')" icon="pi pi-plus"></Button>
            </div>
        </div>
        <div class="card mt-5">
            <DataTable :value="filteredAuthor" showGridlines paginator :rows="10">
                <template #header>
                    <div class="flex justify-end">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search"> </i>
                            </InputIcon>
                            <InputText v-model="filterAuthor" placeholder="Tìm kiếm từ ..."></InputText>
                        </IconField>
                    </div>
                </template>
                <template #empty> <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div> </template>
                <template #loading> Đang tải dữ liệu ... </template>
                <!-- <Column header="Mã tác giả" field="_id"></Column> -->
                <Column header="Ảnh" style="width: 10rem">
                    <template #body="{ data }">
                        <div class="flex justify-center">
                            <Img width="100px" alt="Image" :src="data.authorImage" preview />
                        </div>
                    </template>
                </Column>
                <Column header="Tên tác giả" style="width: 15rem" field="authorName"></Column>
                <Column header="Thông tin tác giả" field="bio"></Column>
                <Column header="" style="width: 8rem">
                    <template #body="{ data }">
                        <div class="flex justify-evenly">
                            <Button icon="pi pi-pencil" severity="secondary" @click="openDialog('U', data)" text></Button>
                            <Button icon="pi pi-trash" @click="confirmDelete(data.slug)" text severity="danger"></Button>
                        </div>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>

    <Dialog style="width: 45%" :header="currentDialogMode == 'A' ? ' Thêm mới tác giả' : ' Chỉnh sửa tác giả'" v-model:visible="toggleDialog">
        <ProgressSpinner v-if="isLoading" />
        <div class="flex flex-col gap-3 mb-5">
            <label for="userCode" class="font-semibold">Mã tác giả</label>
            <InputText id="authorCode" class="flex-auto" autocomplete="off" v-model="payloadDialog._id" disabled="true"></InputText>
        </div>
        <div class="flex flex-col gap-3 mb-4">
            <label for="username" class="font-semibold">Tên tác giả</label>
            <InputText id="authorName" class="flex-auto" autocomplete="off" v-model="payloadDialog.authorName"></InputText>
        </div>

        <div class="flex flex-col gap-3 mb-6">
            <label for="bio" class="font-semibold">Tiểu sử</label>
            <Textarea style="height: 10rem" v-model="payloadDialog.bio"></Textarea>
        </div>

        <div class="flex flex-row items-center gap-3 mb-4">
            <label for="bio" class="font-semibold">Ảnh</label>
            <!-- <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary" class="p-button-outlined" /> -->
            <input type="file" @change="UploadFileLocal($event, 0)" />
            <!-- <img v-if="payloadDialog.authorImage" :src="payloadDialog.authorImage" alt="Image" class="shadow-md w-[100px] rounded-xl" style="filter: grayscale(100%)" /> -->
            <!-- <img v-if="payloadDialog.authorImage" :src="URL.createObjectURL(payloadDialog.authorImage)" alt="Image Preview" class="shadow-md w-[100px] rounded-xl" /> -->
        </div>

        <div class="flex justify-end gap-3 mb-4">
            <Button label="Hủy" severity="secondary" @click="resetForm()"></Button>
            <Button label="Lưu" severity="success" @click="saveDialog(currentDialogMode)"></Button>
        </div>
    </Dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import API from '../../api/api-main';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
const confirm = useConfirm();
const toast = useToast();

const filterAuthor = ref('');
const toggleDialog = ref(false);
const currentDialogMode = ref('A');
const isLoading = ref(false);
const payloadDialog = ref({
    _id: '',
    authorName: '',
    bio: '',
    authorImage: null,
    slug: ''
});
const authorData = ref([]);

const GetAllAuthor = async () => {
    isLoading.value = true;
    try {
        const res = await API.get('author');
        authorData.value = res.data.metadata;
    } catch (err) {
        console.log(err);
    } finally {
        isLoading.value = false;
    }
};

const confirmDelete = async (id) => {
    console.log(id);
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
                const res = await API.delete(`/author/${id}`);
                console.log(res);
                toast.add({ severity: 'info', summary: 'Thành Công', detail: 'Thao tác thành công', life: 3000 });
                await GetAllAuthor();
            } catch (error) {
                toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
            }
        },
        reject: () => {}
    });
};

onMounted(() => {
    GetAllAuthor();
});

const filteredAuthor = computed(() => {
    return authorData.value.filter((item) => {
        return item._id.toLowerCase().includes(filterAuthor.value.toLowerCase()) || item.authorName.toLowerCase().includes(filterAuthor.value.toLowerCase()) || item.bio.toLowerCase().includes(filterAuthor.value.toLowerCase());
    });
});

const openDialog = (mode, data = null) => {
    toggleDialog.value = true;
    currentDialogMode.value = mode;

    if (mode == 'U' && data) {
        payloadDialog.value._id = data._id;
        payloadDialog.value.authorName = data.authorName;
        payloadDialog.value.bio = data.bio;
        payloadDialog.value.authorImage = data.authorImage;
        payloadDialog.value.slug = data.slug;
    } else {
        resetForm();
    }
};

const UploadFileLocal = async (event, index) => {
    const file = event.target.files[0];
    payloadDialog.value.authorImage = file;
};

const saveDialog = async (mode) => {
    if (mode == 'U') {
        let formData = new FormData();
        formData.append('files', payloadDialog.value.authorImage);
        formData.append('authorName', payloadDialog.value.authorName);
        formData.append('bio', payloadDialog.value.bio);
        try {
            await API.update(`/author/${payloadDialog.value.slug}`, formData);
            isLoading.value = true;
            toggleDialog.value = false;
            await GetAllAuthor();
            toast.add({ severity: 'info', summary: 'Thành Công', detail: 'Thao tác thành công', life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    } else {
        let formData = new FormData();
        formData.append('files', payloadDialog.value.authorImage);
        formData.append('authorName', payloadDialog.value.authorName);
        formData.append('bio', payloadDialog.value.bio);
        try {
            await API.create('/author', formData);
            isLoading.value = true;
            toggleDialog.value = false;
            await GetAllAuthor();
            toast.add({ severity: 'info', summary: 'Thành Công', detail: 'Thao tác thành công', life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
            console.log(error);
        } finally {
            isLoading.value = false;
        }
    }
};

const resetForm = () => {
    payloadDialog.value._id = '';
    payloadDialog.value.authorName = '';
    payloadDialog.value.bio = '';
    payloadDialog.value.authorImage = null;
};
</script>
