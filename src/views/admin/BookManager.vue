<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="flex justify-between">
    <div class="font-semibold text-2xl">Quản lý sách</div>
    <div>
      <Button label="Thêm mới" @click="openDialog('A')" icon="pi pi-plus"></Button>
    </div>
  </div>
  <div class="card mt-5">
    <DataTable
      :value="filteredBook"
      paginator
      showGridlines
      scrollable="true"
      :rows="20"
      :rowsPerPageOptions="[20, 30, 50, 100]"
      resizableColumns
      columnResizeMode="fit"
    >
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
      <template #empty>
        <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div>
      </template>
      <template #loading> Đang tải dữ liệu ... </template>
      <Column header="Tên sách" style="min-width: 20rem" field="bookName">
        <template #body="{ data }">
          <span class="">
            {{ data.bookName }}
          </span>
        </template>
      </Column>
      <Column header="Ảnh" style="min-width: 10rem">
        <template #body="{ data }">
          <div class="flex justify-center">
            <img
              crossorigin="anonymous"
              :src="data.imageBook"
              alt=""
              style="width: 100px; height: 100px"
            />
          </div>
        </template>
      </Column>
      <Column header="Tác giả" style="min-width: 10rem">
        <template #body="{ data }">
          <div v-if="data.authorBook !== null">
            {{ data.authorBook?.authorName }}
          </div>
          <div v-else>null</div>
        </template>
      </Column>
      <Column header="Thể loại" style="min-width: 8rem" field="genre.genreName"></Column>
      <Column header="Số lượng" style="min-width: 10rem">
        <template #body="{ data }">
          <div class="flex justify-end">{{ data.quantity }} quyển</div>
        </template>
      </Column>
      <Column header="Giá" style="min-width: 10rem">
        <template #body="{ data }">
          <div class="flex justify-end">{{ formatPrice(data.price) }} đ</div>
        </template>
      </Column>
      <Column header="Tổng trang" style="min-width: 8rem">
        <template #body="{ data }">
          <div class="flex justify-end">{{ data.totalPages }} tờ</div>
        </template>
      </Column>
      <Column header="Ngày xuất bản" style="min-width: 10rem">
        <template #body="{ data }">
          <div class="flex justify-center">
            {{ formatDate(data.releaseTime) }}
          </div>
        </template>
      </Column>
      <Column header="Kích thước" style="min-width: 8rem" field="size"> </Column>
      <Column header="Đánh giá" style="min-width: 7rem" field="rating">
        <template #body="{ data }">
          <div class="text-center">
            {{ data.rating }}
          </div>
        </template>
      </Column>

      <Column header="Người dịch" field="translater"> </Column>
      <Column header="Hành động" style="width: 8rem">
        <template #body="{ data }">
          <div class="flex justify-evenly">
            <Button
              icon="pi pi-pencil"
              severity="secondary"
              @click="openDialog('U', data)"
              text
            ></Button>
            <Button
              icon="pi pi-trash"
              @click="confirmDelete(data.slug)"
              text
              severity="danger"
            ></Button>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    style="width: 85%"
    :header="currentDialogMode == 'A' ? 'Thêm mới sách' : 'Chỉnh sửa sách'"
    v-model:visible="toggleDialog"
    modal
  >
    <template v-if="isLoading">
      <div class="flex justify-center items-center h-[50rem]">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidth="8"
          fill="transparent"
          animationDuration=".5s"
          aria-label="Custom ProgressSpinner"
        />
      </div>
    </template>
    <template v-else>
      <div class="flex gap-10">
        <div class="basis-1/2">
          <div class="flex flex-col gap-3 mb-5">
            <label for="bookName">Mã sách</label>
            <InputText
              id="bookName"
              class="flex-auto"
              autocomplete="false"
              v-model="payloadDialog._id"
              disabled
            ></InputText>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="bookName">Tên sách</label>
            <InputText
              id="bookName"
              class="flex-auto"
              autocomplete="false"
              v-model="payloadDialog.bookName"
            ></InputText>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="authorBook"> Tác giả của sách</label>
            <Select
              v-model="payloadDialog.authorBook"
              :options="authorData"
              optionValue="_id"
              optionLabel="authorName"
              placeholder="Chọn tác giả"
            ></Select>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="genreBook"> Thể loại sách </label>
            <Select
              v-model="payloadDialog.genre"
              :options="genreData"
              optionLabel="genreName"
              optionValue="_id"
              placeholder="Chọn thể loại"
            ></Select>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="genreBook"> Người dịch </label>
            <InputText v-model="payloadDialog.translater"></InputText>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="bookDescription"> Mô tả sách</label>
            <Textarea v-model="payloadDialog.bookDescription" rows="10"></Textarea>
          </div>
          <!-- <div class="flex flex-col gap-3 mb-5">
                <label for="summary"> Tóm tắt sách</label>
                <Textarea rows="5" v-model="payloadDialog.summary"></Textarea>
            </div> -->
        </div>
        <div class="basis-1/2">
          <div class="flex flex-col gap-3 mb-5">
            <label for="quantity"> Số lượng</label>
            <InputNumber v-model="payloadDialog.quantity"></InputNumber>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="price"> Giá sách</label>
            <InputNumber
              v-model="payloadDialog.price"
              mode="currency"
              currency="VND"
              locale="vi-VN"
            ></InputNumber>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="price"> Giá sách nhập</label>
            <InputNumber
              v-model="payloadDialog.importPrice"
              mode="currency"
              currency="VND"
              locale="vi-VN"
            ></InputNumber>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="totalPages"> Số trang sách</label>
            <InputNumber v-model="payloadDialog.totalPages"></InputNumber>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="size">Kích thước</label>
            <InputText v-model="payloadDialog.size"></InputText>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="date">Ngày phát hành</label>
            <DatePicker
              v-model="payloadDialog.releaseTime"
              dateFormat="dd/mm/yy"
            ></DatePicker>
          </div>
          <div class="flex flex-col gap-3 mb-5">
            <label for="bookName">Đánh giá</label>
            <InputNumber
              v-model="payloadDialog.rating"
              :min="0"
              :max="5"
              showButtons
              fluid
            ></InputNumber>
          </div>
          <div class="flex flex-row items-center gap-3 mb-4">
            <label for="bio" class="font-semibold">Ảnh</label>
            <input type="file" @change="UploadFileLocal($event, 0)" />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 mb-4">
        <!-- <Button label="Hủy" severity="secondary" @click="resetForm()"></Button> -->
        <Button label="Hủy" severity="secondary" @click="toggleDialog = false"></Button>
        <Button
          label="Lưu"
          severity="success"
          @click="saveDialog(currentDialogMode)"
        ></Button>
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { computed, onMounted, ref } from "vue";
import currency from "currency.js";
import API from "../../api/api-main";

const toast = useToast();
const confirm = useConfirm();

const isLoading = ref(false);
const filterBook = ref("");
const booksData = ref([]);
const currentDialogMode = ref("A");
const toggleDialog = ref(false);
const authorData = ref([]);
const genreData = ref([]);
const payloadDialog = ref({
  _id: "",
  bookName: "",
  imageBook: "",
  authorBook: "",
  genre: "",
  bookDescription: "",
  summary: "",
  translater: "",
  quantity: 0,
  price: 0,
  totalPages: 0,
  releaseTime: 0,
  size: "",
  rating: 0,
  slug: "",
  importPrice: 0,
});
const clearDialogData = JSON.stringify(payloadDialog.value);

const validate = () => {
  const fields = [
    "bookName",
    "authorBook",
    "genre",
    "bookDescription",
    "quantity",
    "price",
    "releaseTime",
    "size",
    "importPrice",
  ];
  for (var field of fields) {
    if (
      (typeof payloadDialog.value[field] == "string" &&
        payloadDialog.value[field] == "") ||
      (typeof payloadDialog.value[field] == "number" && payloadDialog.value[field] == 0)
    ) {
      toast.add({
        severity: "error",
        summary: "Lỗi",
        detail: `Nhập thiếu trường. Vui lòng nhập đầy đủ!`,
        life: 3000,
      });
      return false;
    }
  }
  return true;
};
onMounted(() => {
  GetAllBooks();
  GetAllAuthor();
  GetAllGenre();
});

const GetAllAuthor = async () => {
  try {
    isLoading.value = true;
    const res = await API.get("author");
    if (res && res.status == 200) {
      authorData.value = res.data.metadata;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const GetAllBooks = async () => {
  try {
    isLoading.value = true;
    const res = await API.get("book");
    booksData.value = Array.isArray(res.data.metadata) ? res.data.metadata : [];
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const GetAllGenre = async () => {
  try {
    isLoading.value = true;
    const res = await API.get("genre");
    if (res && res.status == 200) {
      genreData.value = res.data.metadata;
    }
  } catch (err) {
    console.log(err);
  } finally {
    isLoading.value = false;
  }
};

const filteredBook = computed(() => {
  if (!Array.isArray(booksData.value)) return [];
  return booksData.value.filter((item) => {
    const searchText = filterBook.value.toLowerCase();
    return (
      item.bookName.toLowerCase().includes(searchText) ||
      item.authorBook.authorName.toLowerCase().includes(searchText) ||
      item.genre.genreName.toLowerCase().includes(searchText)
    );
  });
});
// End datatable

const resetForm = () => {
  payloadDialog.value = JSON.parse(clearDialogData);
};

const UploadFileLocal = async (event, index) => {
  const file = event.target.files[0];
  payloadDialog.value.imageBook = file;
};

const saveDialog = async (mode) => {
  if (!validate()) {
    toggleDialog.value = true;
    return;
  }
  let formData = new FormData();
  const fields = [
    "bookName",
    "authorBook",
    "genre",
    "bookDescription",
    "summary",
    "quantity",
    "price",
    "totalPages",
    "releaseTime",
    "size",
    "rating",
    "importPrice",
    "translater",
  ];

  fields.forEach((item) => {
    formData.append(item, payloadDialog.value[item]);
  });
  formData.append("files", payloadDialog.value.imageBook);
  let url = mode == "U" ? `book/${payloadDialog.value.slug}` : `book`;
  let funcAPI = mode == "U" ? API.update(url, formData) : API.create(url, formData);
  try {
    isLoading.value = true;
    const res = await funcAPI;
    if (res && res.status == 200) {
      toast.add({
        severity: "info",
        summary: "Thành Công",
        detail: "Thao tác thành công",
        life: 3000,
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Thất bại",
      detail: "Thao tác thất bại",
      life: 3000,
    });
  } finally {
    GetAllBooks();
    isLoading.value = false;
    toggleDialog.value = false;
  }
};

const confirmDelete = async (id) => {
  confirm.require({
    message: "Bạn có chắc muốn xóa bản ghi này không ?",
    header: "Thông báo",
    icon: "pi pi-exclamation-triangle",
    rejectProps: {
      label: "Hủy",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Xóa",
      severity: "danger",
    },
    accept: async () => {
      try {
        const res = await API.delete(`/book/${id}`);
        console.log(res);
        toast.add({
          severity: "info",
          summary: "Thành Công",
          detail: "Thao tác thành công",
          life: 3000,
        });
        await GetAllBooks();
      } catch (error) {
        toast.add({
          severity: "error",
          summary: "Thất bại",
          detail: "Thao tác thất bại",
          life: 3000,
        });
      }
    },
    reject: () => {},
  });
};
const formatDate = (date) => {
  if (!date) return "";
  return format(new Date(date), "dd/MM/yyyy", { locale: vi });
};

function formatPrice(amount) {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

const openDialog = (mode, data = null) => {
  toggleDialog.value = true;
  currentDialogMode.value = mode;
  if (mode == "U" && data) {
    const fields = [
      "_id",
      "bookName",
      "bookDescription",
      "summary",
      "price",
      "totalPages",
      "releaseTime",
      "size",
      "rating",
      "slug",
    ];

    fields.forEach((field) => {
      payloadDialog.value[field] = data[field];
    });

    payloadDialog.value.authorBook = data.authorBook._id;
    payloadDialog.value.genre = data.genre._id;
  } else {
    resetForm();
  }
};
// End dialog
</script>
