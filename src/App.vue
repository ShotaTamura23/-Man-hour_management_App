<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon
        v-show="$store.state.login_user"
        @click="toggleSlideMenu"
      ></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>工数管理ツール</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-item v-if="$store.state.login_user">
        <v-btn @click="logout">ログアウト</v-btn>
      </v-toolbar-item>
    </v-toolbar>
    <SideNav />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import SideNav from "./components/SideNave";
export default {
  name: "App",
  components: {
    SideNav
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      //ログインやログアウト時にonAuthStateChangedメソッドが発火。ログイン時：userオブジェクトが渡り、ログアウト時:nullが帰ってくる
      if (user) {
        //userにユーザーオブジェクトがあるかチェック
        this.setLoginUser(user);
        this.getUserData();
        this.fetchTasks(); //データ取得
        this.fetchTasksAll();
        //ログイン時にhomeにいたら自動的にタスク一覧へ遷移
        if (this.$router.currentRoute.name === "home") {
          this.$router.push({ name: "tasks" });
        }
      } else {
        //引数userがnullだったらログアウト処理
        this.deleteLoginUser();
        //ログアウト後はhomeに自動的に遷移
        this.$router.push({ name: "home" });
      }
    });
  },
  data() {
    return {
      //
    };
  },

  methods: {
    ...mapActions([
      "toggleSlideMenu",
      "setLoginUser",
      "logout",
      "deleteLoginUser",
      "fetchTasks",
      "getUserData",
      "fetchTasksAll"
    ])
  },
  computed: {}
};
</script>
