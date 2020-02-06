import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Tasks from "../views/Tasks.vue";
import TaskForm from "../views/TaskForm";
import Counter from "../views/Counter";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/tasks",
    name: "tasks",
    component: Tasks
  },
  {
    path: "/tasks/:task_id?/edit", //task_idでtaskを識別する。「？」はオプション化→task_idがなければ新規追加へ（/tasks/edit）
    name: "tasks_edit",
    component: TaskForm
  },
  {
    path: "/tasks/:task_id?/count",
    name: "tasks_counter",
    component: Counter
  },
  {
    path: "/all",
    name: "all",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/All.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
