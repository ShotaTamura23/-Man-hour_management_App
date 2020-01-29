import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD292ht39b7nluY0M5-R7G4p280WzHizrw",
  authDomain: "task-app-75f08.firebaseapp.com",
  databaseURL: "https://task-app-75f08.firebaseio.com",
  projectId: "task-app-75f08",
  storageBucket: "task-app-75f08.appspot.com",
  messagingSenderId: "87442198371",
  appId: "1:87442198371:web:3b6a0ca271ff0927b48d56"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
