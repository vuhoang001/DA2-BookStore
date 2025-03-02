<template>
  <Toast />
  <div class="flex justify-between">
    <div class="font-semibold text-2xl">Quản lý khuyến mãi</div>
    <div>
      <Button label="Thêm mới" @click="openDialog()" icon="pi pi-plus"></Button>
    </div>
  </div>
  <div class="card mt-5">
    <DataTable
      :value="products"
      paginator
      :rows="5"
      :rows-per-page-options="[5, 10, 15, 20]"
      show-gridlines
    >
      <template #header>
        <div class="flex justify-end">
          <!-- <IconField>
                        <InputIcon>
                            <i class="pi pi-search"> </i>
                        </InputIcon>
                        <InputText v-model="filterBook" placeholder="Tìm kiếm từ ..."></InputText>
                    </IconField> -->
        </div>
      </template>
      <template #empty>
        <div class="flex justify-center my-5">Không tìm thấy dữ liệu ...</div>
      </template>
      <template #loading> Đang tải dữ liệu ... </template>
      <Column field="bookName" header="Tên sản phẩm"></Column>
      <Column header="Giá nhập sản phẩm">
        <template #body="{ data }">
          {{ currency(data.importPrice, { symbol: "đ", separator: "," }).format() }}
        </template>
      </Column>
      <Column field="price" header="Giá bán sản phẩm">
        <template #body="{ data }">
          {{ currency(data.price, { symbol: "đ", separator: "," }).format() }}
        </template>
      </Column>
      <Column field="discount" header="Giảm giá"></Column>
      <Column>
        <template #body="{ data }">
          <!-- {{ data }} -->
        </template>
      </Column>
    </DataTable>
  </div>

  <Dialog
    v-model:visible="visibleDialog"
    modal
    header="Tạo khuyến mãi"
    style="width: 30%"
  >
    <Tabs value="0">
      <TabList>
        <Tab value="0">Chọn sản phẩm giảm giá</Tab>
        <Tab value="1"> Chọn thể loại giảm giá</Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="0">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="">Chọn các sản phẩm giảm giá</label>
              <MultiSelect
                v-model="payload.selectedBooks"
                display="chip"
                :options="products"
                option-label="bookName"
                filter
                class="w-full"
              >
                <template #option="{ option }">
                  <div class="flex justify-between items-center">
                    <img
                      crossorigin="anonymous"
                      class="w-14 h-22"
                      :src="option.imageBook"
                      alt=""
                    />
                    <div class="flex flex-col justify-between ml-10">
                      <span class="text-lg font-medium">{{ option.bookName }}</span>
                      <span class="text-gray-500 italic text-sm">{{
                        currency(option.price, { symbol: "đ", separator: "," }).format()
                      }}</span>
                    </div>
                  </div>
                </template>
                <template #filtericon> <i class="pi pi-map"></i></template>
                <template #footer>
                  <div class="text-right mr-4">
                    <Button
                      severity="danger"
                      @click="removeAll('B')"
                      class="hover:underline cursor-pointer"
                      label="Xóa tất cả"
                      text
                    ></Button>
                  </div>
                </template>
              </MultiSelect>
            </div>

            <div class="flex flex-col gap-2">
              <label for="">Chọn mức giảm giá</label>

              <InputNumber
                v-model="payload.discount"
                inputId="horizontal-buttons"
                showButtons
                buttonLayout="horizontal"
                max="100"
                min="0"
                :step="5"
                fluid
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </div>
          </div>
          <div class="text-right mt-4">
            <Button label="Áp dụng giảm giá" @click="UpdateDiscount('group')"></Button>
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <label for="">Chọn thể loại giảm giá</label>
              <MultiSelect
                v-model="payload.selectedGenre"
                display="chip"
                :options="genre"
                option-label="genreName"
                filter
                class="w-full"
              >
                <template #option="{ option }">
                  <div class="flex justify-between items-center">
                    <div class="flex flex-col justify-between ml-3">
                      <span class="text-lg font-medium">{{ option.genreName }}</span>
                    </div>
                  </div>
                </template>
                <template #filtericon> <i class="pi pi-map"></i></template>
                <template #footer>
                  <div class="text-right mr-4">
                    <Button
                      severity="danger"
                      @click="removeAll('G')"
                      class="hover:underline cursor-pointer"
                      label="Xóa tất cả"
                      text
                    ></Button>
                  </div>
                </template>
              </MultiSelect>
            </div>
            <div class="flex flex-col gap-2">
              <label for="">Chọn mức giảm giá</label>

              <InputNumber
                v-model="payload.discount"
                inputId="horizontal-buttons"
                showButtons
                buttonLayout="horizontal"
                max="100"
                min="0"
                :step="5"
                fluid
              >
                <template #incrementbuttonicon>
                  <span class="pi pi-plus" />
                </template>
                <template #decrementbuttonicon>
                  <span class="pi pi-minus" />
                </template>
              </InputNumber>
            </div>
          </div>
          <div class="text-right mt-4">
            <Button @click="UpdateDiscount('genre')" label="Áp dụng giảm giá"></Button>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </Dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import API from "../../api/api-main";
import currency from "currency.js";
import { useToast } from "primevue/usetoast";

const toast = useToast();
const visibleDialog = ref(false);
const products = ref([]);
const genre = ref([]);
const payload = ref({
  selectedGenre: [],
  selectedBooks: [],
  discount: 0,
});

const GetProducts = async () => {
  try {
    const res = await API.get("book/discount");
    products.value = res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};

const GetGenre = async () => {
  try {
    const res = await API.get("genre");
    genre.value = res.data.metadata;
  } catch (error) {
    console.log(error);
  }
};

const UpdateDiscount = async (action) => {
  let type = action;
  let ids = [];
  const array =
    type == "group" ? payload.value.selectedBooks : payload.value.selectedGenre;
  for (var item of array) {
    ids.push(item._id);
  }

  try {
    const res = await API.create(`book/discount?type=${type}`, {
      ids: ids,
      percent: payload.value.discount,
    });
    toast.add({
      severity: "info",
      summary: "Thành Công",
      detail: "Thao tác thành công",
      life: 3000,
    });
    visibleDialog.value = false;
    GetProducts();
  } catch (error) {
    console.log(error);
  } finally {
    GetProducts();
  }
};
const openDialog = () => {
  visibleDialog.value = true;
};

const removeAll = (action) => {
  if (action == "B") {
    payload.value.selectedBooks = [];
  }

  if (action == "G") {
    payload.value.selectedGenre = [];
  }
};

onMounted(() => {
  GetProducts();
  GetGenre();
});
</script>
