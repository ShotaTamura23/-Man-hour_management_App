<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>全ユーザーのタスク一覧</h1>
      </v-flex>

      <v-flex xs12 mt-3 justify-center>
        <v-data-table :items-per-page="15" :headers="headers" :items="tasks">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.author_name }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.process_state }}</td>
            <td class="text-xs-left">{{ props.item.man_hour }}</td>
            <td class="text-xs-left">{{ props.item.elapsed_time }}</td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    //インスタンス生成後にストアに取りに行く
    this.tasks = this.$store.state.task_all;
  },
  data() {
    return {
      headers: [
        { text: "担当者", value: "author_name" },
        { text: "案件名", value: "name" },
        { text: "作業状態", value: "process_state" },
        { text: "工数", value: "man_hour" },
        { text: "経過時間", value: "elapsed_time" }
      ],
      tasks: [] //初期データは空のオブジェクトを用意
    };
  },
  methods: {
    deleteConfirm(id) {
      if (confirm("削除しますか？")) {
        this.deleteTask({ id });
      }
    },
    ...mapActions(["deleteTask"])
  },
  computed: {}
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
