<template>
  <div>
    <div style="text-align: left; margin-bottom: 10px;">
      <a-button type="primary" @click="$router.push('/user/add')">新規追加</a-button>
    </div>
    <a-table :columns="columns" :dataSource="data.data" :loading="loading">
      <template slot="action" slot-scope="data">
        <a-button
          slot="action"
          style="margin-right: 10px;"
          type="primary"
          @click="$router.push('/user/'+data._id)"
        >編集</a-button>
        <a-popconfirm
          title="このユーザを削除しますか"
          @confirm="confirm(data._id)"
          okText="はい"
          cancelText="いいえ"
        >
          <a-button type="danger">削除</a-button>
        </a-popconfirm>
      </template>
    </a-table>
  </div>
</template>
<script>
const columns = [
  {
    title: "ユーザ",
    dataIndex: "username",
  },
  {
    title: "操作",
    dataIndex: "",
    key: "x",
    width: "20%",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      loading: false,
      columns
    };
  },
  methods: {
    async confirm(id) {
      this.loading = true;
      await this.$http.delete("/admin/users/"+id).then(res => {
        this.loading = false;
        this.data = res.data;
        this.$message.success('ユーザを削除しました');
        this.fetch();
      });
    },
    async fetch(params = {}) {
      this.loading = true;
      await this.$http.get("/admin/users").then(res => {
        this.loading = false;
        this.data = res.data;
      });
    }
  }
};
</script>
