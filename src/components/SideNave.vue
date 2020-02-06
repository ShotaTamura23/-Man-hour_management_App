<template>
  <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img v-if="photoURL" :src="photoURL" />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ userName }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>

      <v-list-tile v-for="item in items" :key="item.title" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [
        { title: "タスク一覧", icon: "list", link: { name: "tasks" } },
        {
          title: "全ユーザータスク一覧",
          icon: "group",
          link: { name: "all" }
        }
      ]
    };
  },
  computed: {
    //gettersはcomputedに記載
    ...mapGetters(["userName", "photoURL"])
  }
};
</script>
<style>
.v-navigation-drawer--temporary:not(.v-navigation-drawer--close),
.v-navigation-drawer--is-mobile:not(.v-navigation-drawer--close) {
  background-color: rgb(5, 31, 53);
}
.v-list__tile__title,
.v-list__tile__sub-title {
  color: #fff;
}
.v-list--dense .v-list__tile .v-icon {
  color: #fff;
}
</style>