<template>
  <div style="background:#ECECEC; padding: 5rem; height: 100vh;">
    <a-card title="ログイン" style="width: 30rem; margin: auto;">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item label="ユーザ">
          <a-input
            v-decorator="['username', { rules: [{ required: true, message: 'ユーザを入力してください' }] }]"
          />
        </a-form-item>
        <a-form-item label="パスワード">
          <a-input-password
            v-decorator="['password', { rules: [{ required: true, message: 'パスワードを入力してください' }] }]"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">ログイン</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    };
  },
  methods: {
    async handleSubmit() {
      this.form.validateFields(async (err, values) => {
        if (!err) {
            const res = await this.$http.post('/admin/auth/login', values)
            localStorage.token = res.data.data.access_token
            this.$router.push('/')
        }
      });
    }
  }
};
</script>