<template>
  <a-form :form="form" @submit="handleSubmit">
    <a-form-item label="タイトル" v-bind="formItemLayout">
      <a-input v-decorator="['title', { rules: [{ required: true, message: 'タイトルを入力してください' }] }]" />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="料理写真">
      <a-upload
        name="file"
        listType="picture-card"
        class="avatar-uploader"
        :showUploadList="false"
        :action="this.$http.defaults.baseURL + '/admin/upload'"
        @change="handleUpload"
      >
        <img
          width="250"
          height="250"
          v-if="this.data.picture"
          :src="this.data.picture"
          alt="avatar"
        />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">アップロード</div>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="金額" v-bind="formItemLayout">
      <a-input-number
        style="width: 10rem;"
        :formatter="value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="value => value.replace(/\¥\s?|(,*)/g, '')"
        v-decorator="[
          'price',
          {rules: [{ required: true, message: '金額を入力してください' }], initialValue: 0}
        ]"
      />
    </a-form-item>
    <a-form-item label="カテゴリー" v-bind="formItemLayout">
      <a-select
        v-decorator="[
          'category',
          {rules: [{ required: true, message: 'カテゴリーを選択してください' }]}
        ]"
        placeholder="カテゴリーを選択してください"
      >
        <a-select-option v-for="item in categories" :key="item._id" :value="item._id">{{item.title}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="詳細情報" v-bind="formItemLayout">
      <a-textarea
        placeholder="詳細情報を入力してください"
        :autosize="{ minRows: 2, maxRows: 10 }"
        v-decorator="[
          'summary',
          {rules: [{ required: true, message: '詳細情報を入力してください' }], initialValue: ''}
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="アレルギー源">
      <a-select
        v-decorator="['allergies', {initialValue: []}]"
        mode="multiple"
        placeholder="アレルギー源を選択してください"
      >
        <a-select-option v-for="allergie in allergies" :key="allergie.value" :value="allergie.value">{{allergie.title}}</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button type="primary" html-type="submit">{{id ? '編集' : '追加'}}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  mounted() {
    this.id = this.$route.params.id;
    this.fetch();
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this);
    this.form.getFieldDecorator("picture", {
      initialValue: "",
      preserve: true
    });
  },
  data() {
    return {
      loading: false,
      id: null,
      data: [],
      categories: [],
      allergies: [],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    };
  },
  methods: {
    async fetch() {
      await this.$http.get("/admin/menus/allergies").then(res => {
        this.allergies = res.data
      })
      console.log(this.allergies)
      await this.$http.get("/admin/categories").then(res => {
        this.categories = res.data.data;
      });

      if (this.id) {
        this.loading = true;
        await this.$http.get("/admin/menus/" + this.id).then(res => {
          this.loading = false;
          this.data = res.data;
          this.form.setFieldsValue(this.data);
        });
      }
    },
    async handleUpload(info) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        this.data.picture = info.file.response.location;
        this.form.setFieldsValue({ picture: this.data.picture });
        this.loading = false;
      }
    },
    async beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      if (!isJPG && !isPNG) {
        this.$message.error(
          "アップロード可能なファイル拡張子はJPG/PNGになります"
        );
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(
          "アップロード可能なファイルサイズは２MBのみになります"
        );
      }
      return isJPG && isPNG && isLt2M;
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (this.id) {
            await this.$http.put("/admin/menus/" + this.id, values);
          } else {
            await this.$http.post("/admin/menus/", values);
          }
          this.$router.push("/menu");
        }
      });
    }
  }
};
</script>