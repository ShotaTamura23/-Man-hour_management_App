<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-side-icon v-show="$store.state.login_user" @click="toggleSlideMenu"></v-toolbar-side-icon>
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

<style>
h1,
.headline {
  color: #1b3a57;
}
.author {
  display: flex;
  align-items: center;
  padding-left: 14px !important;
  padding-right: 7px !important;
}
.thumbnail {
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.thumbnail img {
  width: 100%;
  border-radius: 50%;
}
.theme--light.v-icon:hover {
  color: rgba(0, 0, 0, 1);
}
.v-content__wrap {
  background-color: #f6f7f9;
}
thead {
  background-color: #fafafa;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12) inset;
}

.card-wrap {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
</style>