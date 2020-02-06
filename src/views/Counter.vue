<template>
  <v-container text-xs-center>
    <v-layout row wrap justify-center>
      <v-flex xs12>
        <h1>工数計測</h1>
      </v-flex>
      <v-flex xs5 mt-4 class="card-wrap">
        <v-card>
          <v-card-text>
            <v-form>
              <p>
                {{hour}}
                <span>時間</span>
                {{min}}
                <span>分</span>
                {{second}}
                <span>秒</span>
              </p>
              <p>
                <span>工数：</span>
                {{this.task.manHour}}
              </p>
              <v-btn @click="timerStart()" v-show="!this.stopState">スタート</v-btn>
              <v-btn @click="timerStop()" v-show="this.stopState" color="error">ストップ</v-btn>
              <v-btn @click="submit" v-show="!this.stopState" color="info">完了</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "Counter",
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
      stopState: false,
      task: {
        //manHour: this.$store.state.manHour
      }
    };
  },
  computed: {
    hour: function() {
      return Math.floor(this.task.count / 3600);
    },
    min: function() {
      return Math.floor(this.task.count / 60) % 60;
    },
    second: function() {
      return this.task.count % 60;
    }
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
    timerStart: function() {
      this.stopState = true;
      this.timerObj = setInterval(() => {
        this.task.count++;
        if (this.task.count % 3600 == 0) {
          this.task.manHour = Number(this.task.manHour) + 0.25;
        }
      }, 1000);
    },
    timerStop: function() {
      this.stopState = false;
      clearInterval(this.timerObj);
    },
    ...mapActions(["addTask", "updateTask"])
  },
  filters: {
    // フィルタオプション
  }
};
</script>
<style lang="css" scoped>
.v-form p {
  font-size: 28px;
}

.v-form p span {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.87);
}

.v-card__text {
  padding: 18% 5%;
  width: 100%;
}
</style>