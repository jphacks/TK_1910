<template>
  <div>
    <a-row type="flex">
      <a-col v-for="order in data" :key="order._id" :span="8" style>
        <a-card
          :title="order.table.table + ' [¥' + order.amount +']'"
          style="width: auto; margin: 10px 10px; height: 400px;"
        >
          <a-button type="primary" slot="extra" :size="size" @click="doneOrder(order._id)">完成</a-button>
          <p v-for="item in order.detail" :key="item.menu._id">{{item.menu.title}} * {{item.amount}}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  mounted() {
    this.updateTimer();
    this.fetch();
  },
  destroyed() {
    clearInterval(this.updateTimer);
  },
  data() {
    return {
      data: [],
      pagination: {},
      loading: false
    };
  },
  methods: {
    updateTimer() {
      return setInterval(() => {
        this.fetch();
      }, 3000);
    },
    async doneOrder(orderID) {
      await this.$http.put("/admin/orders/" + orderID, { done: true });
      this.fetch();
    },
    async fetch(params = {}) {
      this.loading = true;
      await this.$http
        .get("/admin/orders", {
          params: {
            query: {
              where: { done: false },
              populate: [{ path: "detail.menu", model: "Menu" }, "table"]
            }
          }
        })
        .then(res => {
          this.data = res.data.data;
        });
    }
  }
};
</script>