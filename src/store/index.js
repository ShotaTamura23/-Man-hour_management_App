import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase"; //firebaseのライブラリをインポート

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login_user: null,
    drawer: false,
    tasks: [],
    task_all: [],
    user_list: []
  },
  mutations: {
    setLoginUser(state, user) {
      //ログインユーザー情報をステートに保存
      state.login_user = user;
    },
    deleteLoginUser(state) {
      state.login_user = null; //ログアウト判定用
    },
    toggleSideMenu(state) {
      state.drawer = !state.drawer;
    },
    addTask(state, { id, task }) {
      task.id = id;
      state.tasks.push(task);
    },
    fetchTasksAll(state, { id, task }) {
      task.id = id;
      state.task_all.push(task);
    },
    updateTask(state, { id, task }) {
      //タスクの更新
      const index = state.tasks.findIndex(task => task.id === id); //タスクのindex番号を取得
      state.tasks[index] = task;
    },
    deleteTask(state, { id }) {
      //タスクの更新
      const index = state.tasks.findIndex(task => task.id === id); //タスクのindex番号を取得
      state.tasks.splice(index, 1);
    },
    getUserData(state, { user_id }) {
      state.user_list.push(user_id);
    }
  },
  actions: {
    //ログインユーザー情報をステートに保存
    setLoginUser({ commit }, user) {
      commit("setLoginUser", user);
    },
    //firebaseログイン
    login() {
      const google_auth_provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(google_auth_provider);
    },
    deleteLoginUser({ commit }) {
      commit("deleteLoginUser");
    },
    logout() {
      firebase.auth().signOut(); //ログアウト処理
    },
    fetchTasks({ getters, commit }) {
      //firestoreからデータを取得
      firebase
        .firestore()
        .collection(`users/${getters.uid}/tasks`) //DBのパスを指定(保存時と同じ)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc =>
            commit("addTask", { id: doc.id, task: doc.data() })
          ); //snapshot（クエリースナップショット＊定型）にタスク結果が入っている
        });
    },
    fetchTasksAll({ commit }) {
      const buff = [];
      const user_list = this.state.user_list;
      for (var i = 0; i < user_list.length; i++) {
        //firestoreからデータを取得
        firebase
          .firestore()
          .collection(`users/${user_list[i]}/tasks`)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              commit("fetchTasksAll", { id: doc.id, task: doc.data() });
            });
          })
          .catch(error => {
            console.log(`データの取得に失敗しました (${error})`);
          });
      }

      console.log(buff);
    },
    toggleSlideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    addTask({ getters, commit }, task) {
      //第二引数には、コンポーネントから値が飛んでくる（ペイロード）
      if (getters.uid)
        //firestoreにタスクを追加
        firebase
          .firestore()
          .collection(`users/${getters.uid}/tasks`)
          .add(task)
          .then(doc => {
            commit("addTask", { id: doc.id, task }); //タスクごとのIDを取得commitでは第二引数でデータを渡す必要があるから第二引数はオブジェクトで指定
          });
    },
    updateTask({ getters, commit }, { id, task }) {
      //タスクの更新
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/tasks`)
          .doc(id)
          .update(task)
          .then(() => {
            commit("updateTask", { id, task });
          });
      }
    },
    deleteTask({ getters, commit }, { id }) {
      //削除の時はIDが別れば良い
      //タスクの削除
      if (getters.uid) {
        firebase
          .firestore()
          .collection(`users/${getters.uid}/tasks`)
          .doc(id)
          .delete()
          .then(() => {
            commit("deleteTask", { id });
          });
      }
    },
    getUserData({ commit }) {
      firebase
        .firestore()
        .collection("users")
        .get()
        .then(query => {
          var buff = [];
          query.forEach(doc => {
            buff.push([doc.id]);
            commit("getUserData", { user_id: doc.id });
          });
        })
        .catch(error => {
          console.log(`データの取得に失敗しました (${error})`);
        });
    }
  },
  getters: {
    //ログインユーザーの名前と画像を取得 else文にはnull対策として空文字をセット
    userName: state => (state.login_user ? state.login_user.displayName : ""),
    photoURL: state => (state.login_user ? state.login_user.photoURL : ""),
    uid: state => (state.login_user ? state.login_user.uid : null),
    getTaskById: state => id => state.tasks.find(task => task.id === id), //task_idをもとにタスク内容を取得
    userId: state => (state.login_user ? state.login_user.uid : ""),
    fetchTasksAll: state => {
      return state.user_list[0];
    }
  }
});
