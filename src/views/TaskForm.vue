<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>案件編集</h1>
      </v-flex>
      <v-flex xs5 mt-5>
        <v-card>
          <v-card-text>
            <v-form>
              <v-text-field v-model="task.author_name" label="担当者" :disabled="true"></v-text-field>
              <v-text-field v-model="task.name" label="案件名"></v-text-field>
              <v-select :items="selectItem" v-model="task.process_state" label="作業状態"></v-select>
              <v-text-field class="none" v-model="task.count" label="経過時間"></v-text-field>
              <v-text-field class="none" v-model="task.manHour" label="工数"></v-text-field>
              <v-btn @click="$router.push({ name: 'tasks' })">キャンセル</v-btn>
              <v-btn color="info" @click="submit">保存</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  created() {
    if (!this.$route.params.task_id) return; //ルートのパラメータにタスクIDが含まれているかチェック

    const task = this.$store.getters.getTaskById(this.$route.params.task_id);
    if (task) {
      this.task = task;
    } else {
      this.$router.push({ name: "tasks" });
    }
  },
  data() {
    return {
      task: {
        author_logo: this.$store.getters.photoURL,
        author_name: this.$store.getters.userName,
        user_id: this.$store.getters.userId,
        count: 7199,
        manHour: 0
      },
      selectItem: ["未着手", "進行中", "完了"]
    };
  },
  methods: {
    submit() {
      if (this.$route.params.task_id) {
        //新規追加か更新かを判定
        this.updateTask({ id: this.$route.params.task_id, task: this.task });
      } else {
        this.addTask(this.task); //アクション’addTask’を呼び出す
      }

      this.$router.push({ name: "tasks" }); //ボタン押下後にタスク一覧へリンク
      this.task = {}; //フォームの初期化
    },
    ...mapActions(["addTask", "updateTask"])
  },
  computed: {
    ...mapGetters(["userName"])
  }
};
</script>
<style scoped>
.none {
  display: none;
}
</style>