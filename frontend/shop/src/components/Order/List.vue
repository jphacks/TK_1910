<template>
  <div>
    <a-row :gutter="16">
      <a-col v-for="order in data" :key="order._id" :span="8" style="">
        <a-card :title="order.table.table" style="width: auto; margin: 10px 5px; min-height: 200px;">
          <a-button type="primary" slot="extra" :size="size">完成</a-button>
          <p v-for="item in order.detail" :key="item.menu._id">{{item.menu.title}}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetch();
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false,
    };
  },
  methods: {
    async fetch(params = {}) {
      this.loading = true;
      await this.$http
        .get("/admin/orders", {
          params: {
            query: {
              populate: [{ path: "detail.menu", model: "Menu" },'table']
            }
          }
        })
        .then(res => {
          this.data = res.data.data;
          console.log(this.data)
        });
    }
  }
};
</script>