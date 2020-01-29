<template>
  <v-container text-xs-center justify-center>
    <v-layout row wrap>
      <v-flex xs12>
        <h1>工数管理</h1>
        <p>
          案件ごとの工数管理を利用するには、Googleアカウントでログインしてください。
        </p>
      </v-flex>

      <v-flex xs12 mt-5>
        <v-btn color="info" @click="login">ログイン</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["login"])
  }
};
</script>
