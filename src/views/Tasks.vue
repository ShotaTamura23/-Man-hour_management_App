<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>案件一覧</h1>
      </v-flex>

      <v-flex xs12 mt-5 text-xs-right>
        <router-link :to="{ name: 'tasks_edit' }">
          <v-btn color="info">案件追加</v-btn>
        </router-link>
      </v-flex>

      <v-flex xs12 mt-3 justify-center>
        <v-data-table :headers="headers" :items="tasks">
          <template v-slot:items="props">
            <td class="text-xs-left">{{ props.item.author_name }}</td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.process_state }}</td>
            <td class="text-xs-left">{{ props.item.man_hour }}</td>
            <td class="text-xs-left">{{ props.item.elapsed_time }}</td>
            <td class="text-xs-left">
              <span>
                <router-link
                  :to="{
                    name: 'tasks_edit',
                    params: { task_id: props.item.id }
                  }"
                >
                  <v-icon small class="mr-2">edit</v-icon>
                </router-link>
              </span>
              <span>
                <v-icon small class="mr-2" @click="deleteConfirm(props.item.id)">delete</v-icon>
              </span>
            </td>
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
    this.tasks = this.$store.state.tasks;
  },
  data() {
    return {
      headers: [
        { text: "担当者", value: "author_name" },
        { text: "案件名", value: "name" },
        { text: "作業状態", value: "process_state" },
        { text: "工数", value: "man_hour" },
        { text: "経過時間", value: "elapsed_time" },
        { text: "編集", sortable: "false" }
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
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
