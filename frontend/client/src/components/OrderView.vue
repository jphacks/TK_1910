<template>
  <div>
    <md-dialog
      title="食事制限"
      :closable="false"
      layout="column"
      v-model="AllergieDialog.open"
      :btns="AllergieDialog.btns"
    >
      アレルギーや宗教上で食事制限のある食材があれば選んでください
      <md-check-group v-model="allergies" class="allergie-check-group">
        <md-check-box
          v-for="option in data.allergies"
          :key="option.value"
          :name="option.value"
        >{{option.title}}</md-check-box>
      </md-check-group>
    </md-dialog>
    <md-button
      style="position: absolute; z-index: 1000;  bottom: 5%; right: 5%; width: 15rem;"
      type="primary"
      v-on:click="isCartShow = true"
      round
    >
      合計金額
      <p style="margin: 0 3px; font-size: 1.5rem;">¥</p>
      <md-amount :value="totalPrice()" :precision="0" has-separator></md-amount>
    </md-button>
    <md-popup v-model="isCartShow" position="bottom">
      <md-popup-title-bar
        title="カート"
        describe="注文を確認してください"
        ok-text="次へ"
        cancel-text="閉じる"
        @confirm="confirmOrder"
        @cancel="isCartShow = false"
        large-radius
      ></md-popup-title-bar>
      <div class="popup_cart">
        <div style="padding: 1rem 1rem">
          <md-field>
            <div v-for="item of data.menu" v-bind:key="item._id">
              <md-cell-item v-if="item.cart > 0" :title="item.title">
                <span>¥{{item.price}}</span>
                <span slot="right">x {{item.cart}}</span>
              </md-cell-item>
            </div>
          </md-field>
          <md-button type="primary" round>
            合計金額
            <p style="margin: 0 3px; font-size: 1.5rem;">¥</p>
            <md-amount :value="totalPrice()" :precision="0" has-separator></md-amount>
          </md-button>
        </div>
      </div>
    </md-popup>
    <md-dialog title="タイトル" :closable="true" v-model="basicDialog.open" :btns="basicDialog.btns">内容</md-dialog>
    <div class="header">
      <div class="title">
        <p>{{this.data.restrant_name}}</p>
        <md-tag size="large" shape="circle" type="ghost" font-color="#FC7353">{{this.data.table_no}}</md-tag>
      </div>
      <img class="title" width="100" height="100" src="@/assets/popcorn.png" />
    </div>
    <md-tab-bar
      v-model="current"
      :items="data.categories"
      @change="category_filter"
      :maxLength="10"
    />
    <div style="position: relative; overflow: hidden; height: 75%;">
      <md-scroll-view
        :scrolling-x="false"
        style="bottom: 0; height: 100vh; padding: 0 1.5rem;"
        :auto-reflow="true"
      >
        <md-cell-item
          style="border-bottom .5px solid #efefef"
          v-for="item in menu_categories"
          v-bind:key="item._id"
          :title="item.title"
          no-border
        >
          <img class="holder" slot="left" :src="item.picture" />
          <p style="font-size: 0.7rem; margin-top: 5px;">￥{{item.price}}</p>
          <a>
            <md-tag
              v-if="checkAllergies(item.allergies) > 0"
              size="small"
              type="ghost"
              style="font-size: 0.7rem; margin-top: 5px;"
              font-color="#FC7353"
            >アレルギー</md-tag>
          </a>
          <md-stepper v-model="item.cart" slot="right" min="0" max="5" read-only />
        </md-cell-item>
      </md-scroll-view>
    </div>
  </div>
</template>

<script>
import { Field, CellItem, Switch, Tag, Dialog } from "mand-mobile";

export default {
  name: "cell-item-demo",
  components: {
    [Field.name]: Field,
    [CellItem.name]: CellItem,
    [Switch.name]: Switch
  },
  mounted() {
    if (localStorage.getItem("Allergies")) {
      this.allergies = JSON.parse(localStorage.getItem("Allergies"));
    } else {
      this.allergies = [];
    }
    this.id = this.$route.params.id;
    this.fetch();
  },
  methods: {
    totalPrice() {
      var total = 0;
      if (this.data.menu) {
        this.data.menu.forEach(element => {
          if (element.cart > 0) {
            total = total + element.cart * element.price;
          }
        });
        return total;
      }
    },
    async setAllergies() {
      localStorage.setItem("Allergies", JSON.stringify(this.allergies));
      this.AllergieDialog.open = false;
    },
    checkAllergies(allergies_array) {
      const allergies_temp = [];
      this.allergies.forEach(i => {
        if (allergies_array.indexOf(i) > -1) {
          allergies_temp.push(i);
        }
      });
      return allergies_temp.length;
    },
    async confirmOrder() {
      var order = [];
      this.data.menu.forEach(element => {
        if (element.cart > 0) {
          order.push({
            menu: element._id,
            amount: element.cart
          });
        }
      });
      await this.$http
        .post("/server/order/" + this.id, { detail: order, amount: this.totalPrice() })
        .then(res => {
          this.$router.push('detail/' + res.data._id);
        });
    },
    async category_filter(item, index, prevIndex) {
      this.menu_categories = [];
      if (item.name == 0) {
        this.menu_categories = this.data.menu;
        return;
      }
      if (this.data.menu) {
        this.data.menu.forEach(element => {
          if (element.category == item.name) {
            this.menu_categories.push(element);
          }
        });
      }
    },
    async fetch() {
      var defaultCategories = { name: "0", label: "すべて" };
      this.loading = true;
      await this.$http
        .get("/server/order/" + this.id)
        .then(res => {
          this.data = res.data.data;
          this.menu_categories = this.data.menu;
          this.data.categories.unshift(defaultCategories);
        })
        .catch(error => {
          if (error.response.data.message) {
            Dialog.alert({
              title: "エラー",
              content: error.response.data.message,
              confirmText: "はい"
            });
          }
        });
    }
  },
  data() {
    return {
      id: "",
      isCartShow: false,
      current: "0",
      open: false,
      data: [],
      allergies: [],
      menu_categories: [],
      cart: [],
      basicDialog: {
        open: false,
        btns: [
          {
            text: "いいえ",
            handler: this.onBasicCancel
          },
          {
            text: "はい",
            handler: this.onBasicConfirm
          }
        ]
      },
      AllergieDialog: {
        open: true,
        btns: [
          {
            text: "登録",
            type: "danger",
            handler: this.setAllergies
          },
          {
            text: "スキップ",
            handler: this.onActConfirm
          }
        ]
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.body {
  height: 100%;
  background-color: #f9fafb;
}

.allergie-check-group {
  .md-check-box {
    margin: 5px;
  }
}

.scroll {
  box-sizing: border-box;
  min-height: 100%;
  height: 60vh;
  padding-bottom: 100px;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 35vh;
}

.holder {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #E6E6E6;
}

.header {
  height: 20%;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9fafb;
}

.title {
  margin: 1rem 1rem 1rem 1rem;
  font-size: 1.2rem;
  border-radius: 1rem;
}

.popup_cart {
  width: 100%;
  background-color: white;
}
</style>
