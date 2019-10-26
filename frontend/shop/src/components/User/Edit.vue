<template>
  <a-form id="components-form-demo-validate-other" :form="form" @submit="handleSubmit">
    <a-form-item v-bind="formItemLayout" label="ユーザ名">
      <a-input
        v-decorator="[
          'username',
          {rules: [{ required: true, message: 'ユーザ名を入力してください' }], initialValue: ''}
        ]"
      />
    </a-form-item>
    <a-form-item v-bind="formItemLayout" label="パスワード">
      <a-input-password
        v-decorator="[
          'password',
          {rules: [{ required: true, message: 'パスワードを入力してください' }], initialValue: ''}
        ]"
      />
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
  data() {
    return {
      loading: false,
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      }
    };
  },
  async beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    async fetch(params = {}) {
      if (this.id) {
        this.loading = true;
        await this.$http.get("/admin/users/" + this.id).then(res => {
          this.loading = false;
          this.form.setFieldsValue(res.data);
        });
      }
    },
    async handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          if (this.id) {
            await this.$http.put("/admin/users/" + this.id, values);
          } else {
            await this.$http.post("/admin/users/", values);
          }
          this.$router.push("/user");
        }
      });
    }
  }
};
</script>
