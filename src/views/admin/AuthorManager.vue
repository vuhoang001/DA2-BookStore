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
            <DataTable :value="filteredAuthor" showGridlines paginator :rows="5" :rowsPerPageOptions="[5, 10, 20]">
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
                <Column header="Ảnh" style="width: 10rem">
                    <template #body="{ data }">
                        <div class="flex justify-center">
                            <img crossorigin="anonymous" style="width: 100px; height: 100px" alt="Image" :src="data.authorImage" />
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
        <template v-if="isLoading">
            <div class="flex justify-center items-center h-[50rem]">
                <ProgressSpinner style="width: 50px; height: 50px" strokeWidth="8" fill="transparent" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
            </div>
        </template>
        <template v-else>
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
                <!-- <Editor v-model="value" editorStyle="height: 320px" /> -->
            </div>

            <div class="flex flex-row items-center gap-3 mb-4">
                <label for="bio" class="font-semibold">Ảnh</label>
                <input type="file" @change="UploadFileLocal($event, 0)" />
            </div>

            <div class="flex justify-end gap-3 mb-4">
                <Button label="Hủy" severity="secondary" @click="toggleDialog = false"></Button>
                <!-- <Button label="Hủy" severity="secondary" @click="resetForm()"></Button> -->
                <Button label="Lưu" severity="success" @click="saveDialog(currentDialogMode)"></Button>
            </div>
        </template>
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
    authorImage: '',
    slug: ''
});
const clearDialogData = JSON.stringify(payloadDialog.value);
const authorData = ref([]);

const GetAllAuthor = async () => {
    isLoading.value = true;
    try {
        const res = await API.get('author');
        if (res && res.data) {
            authorData.value = Array.isArray(res.data.metadata) ? res.data.metadata : [];
        }
    } catch (err) {
        console.log(err);
    } finally {
        isLoading.value = false;
    }
};

const confirmDelete = async (id) => {
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
    if (!Array.isArray(authorData.value)) return [];
    return authorData.value.filter((item) => {
        return item._id.toLowerCase().includes(filterAuthor.value.toLowerCase()) || item.authorName.toLowerCase().includes(filterAuthor.value.toLowerCase()) || item.bio.toLowerCase().includes(filterAuthor.value.toLowerCase());
    });
});
const validate = () => {
    const fields = ['authorName', 'bio', 'authorImage'];
    for (var field of fields) {
        if (typeof payloadDialog.value[field] == 'string' && payloadDialog.value[field] == '') {
            toast.add({ severity: 'error', summary: 'Lỗi', detail: ' Nhập thiếu trường! Vui lòng nhập đầy đủ!', life: 3000 });
            return false;
        }
    }
    return true;
};

const openDialog = (mode, data = null) => {
    toggleDialog.value = true;
    currentDialogMode.value = mode;
    const fields = ['_id', 'authorName', 'bio', 'authorImage', 'slug'];
    if (mode == 'U' && data) {
        fields.forEach((item) => {
            payloadDialog.value[item] = data[item];
        });
    } else {
        resetForm();
    }
};

const UploadFileLocal = async (event, index) => {
    const file = event.target.files[0];
    payloadDialog.value.authorImage = file;
};

const saveDialog = async (mode) => {
    if (!validate()) {
        toggleDialog.value = true;
        return;
    }
    let formData = new FormData();
    const fields = ['authorName', 'bio'];

    fields.forEach((item) => {
        formData.append(item, payloadDialog.value[item]);
    });
    formData.append('files', payloadDialog.value.authorImage);

    let url = mode == 'U' ? `author/${payloadDialog.value.slug}` : `author`;
    let funcAPI = mode == 'U' ? API.update(url, formData) : API.create(url, formData);

    try {
        isLoading.value = true;
        const res = await funcAPI;
        if (res && res.status == 200) {
            toast.add({ severity: 'info', summary: 'Thành Công', detail: 'Thao tác thành công', life: 3000 });
        }
    } catch (err) {
        toast.add({ severity: 'error', summary: 'Thất bại', detail: 'Thao tác thất bại', life: 3000 });
    } finally {
        GetAllAuthor();
        isLoading.value = false;
        toggleDialog.value = false;
    }
};

const resetForm = () => {
    payloadDialog.value = JSON.parse(clearDialogData);
};
</script>
