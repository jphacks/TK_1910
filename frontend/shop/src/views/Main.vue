<template>
  <a-layout id="components-layout-demo-top-side-2" style="height: 100%;">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['2']"
        :style="{ lineHeight: '64px' }"
      >
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['sub1']"
          @click="menuClick"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu v-for="item in mainMenu" :key="item.key" :index="item.title">
            <span slot="title">
              <a-icon :type="item.icon" />
              {{item.title}}
            </span>
            <a-menu-item
              v-for="subItem in item.subMenu"
              :key="subItem.path"
              :index="subItem.title"
            >{{subItem.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: '16px 0', minHeight: '90vh'}"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background-image: url("../assets/popcorn_logo.png");
  background-size: contain;
  margin: 16px 28px 16px 0;
  float: left;
}
</style>

<script lang="ts">
//import Vue from 'vue'
import { Component, Vue } from "vue-property-decorator";

export default Vue.extend({
  data() {
    return {
      collapsed: false,
      liveMenu: [],
      mainMenu: [
        {
          icon: "form",
          title: "注文管理",
          key: "order",
          subMenu: [
            {
              title: "注文一覧",
              path: "/order"
            },
          ]
        },
        {
          icon: "menu",
          title: "販売情報",
          key: "menu",
          subMenu: [
            {
              title: "カテゴリー",
              path: "/category"
            },
            {
              title: "メニュー",
              path: "/menu"
            },
            {
              title: "テーブル",
              path: "/table"
            }
          ]
        },
        {
          icon: "setting",
          title: "設定",
          key: "user",
          subMenu: [
            {
              title: "管理者",
              path: "/user"
            }
          ]
        },
      ]
    };
  },
  methods: {
    menuClick: function(item: any) {
      this.$router.push(item.key);
    }
  }
});
</script>
