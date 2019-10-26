<template>
  <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="テーブル番号">
      <a-input
        v-decorator="[
          'table',
          {rules: [{ required: true, message: 'テーブル番号を入力してください' }], initialValue: ''}
        ]"
      />
    </a-form-item>
    <a-form-item
      v-if="this.id"
      label="注文QRコード"
      v-bind="formItemLayout"
    >
      <a-card hoverable style="width: 250px; font-size: 12px">
        <qrcode-vue
          :value="this.$http.defaults.baseURL +'/web/client/order/'+ this.id"
          :size="200"
          level="L"
        ></qrcode-vue>
        <a-card-meta :title="form.getFieldValue('tableNo')">
          <template slot="description" class="font-size: 5px">QRをスキャンして注文しましょう</template>
        </a-card-meta>
      </a-card>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
      <a-button v-if="this.id" style="margin-right: 10px;" icon="qrcode">注文QRコード印刷</a-button>
      <a-button type="primary" html-type="submit">{{id ? '編集' : '追加'}}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import QrcodeVue from "qrcode.vue";

export default {
  mounted() {
    this.id = this.$route.params.id;
    this.fetch();
  },
  data() {
    return {
      loading: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    };
  },
  components: {
    QrcodeVue
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    async fetch(params = {}) {
      if (this.id) {
        this.loading = true;
        await this.$http.get("/admin/tables/" + this.id).then(res => {
          const pagination = { ...this.pagination };
          pagination.total = 200;
          this.loading = false;
          this.form.setFieldsValue(res.data);
          this.pagination = pagination;
        });
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (this.id) {
            await this.$http.put("/admin/tables/" + this.id, values);
          } else {
            await this.$http.post("/admin/tables/", values);
          }
          this.$router.push("/table");
        }
      });
    }
  }
};
</script>
