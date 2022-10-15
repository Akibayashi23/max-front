<template>
  <div>
    <div v-if="user">
      <p>名前：{{ user.name }}</p>
      <AddTodo @submit="addTodo" />
      <TodoList :todos="user.todos" />
    </div>
  </div>
</template>

<script>
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import axios from "@/plugins/axios";

export default {
  components: {
    AddTodo,
    TodoList,
  },
  data() {
    return {
      todos: [],
    };
  },
  computed: {
    user() {
      // /store/auth.jsのstateを見にいく
      // computedプロパティと組み合わせて使うことで、どこからでもログインユーザーの情報を参照できる
      return this.$store.state.auth.currentUser;
    },
  },
  created() {
    console.log("API_KEY:", process.env.API_KEY);
  },
  methods: {
    async addTodo(todo) {
      const { data } = await axios.post("/v1/todos", { todo });
      this.$store.dispatch("auth/setUser", {
        ...this.user,
        todos: [...this.user.todos, data],
      });
    },
  },
  // fetchの第一引数には、自動的にcontextオブジェクトが入る
  // contextオブジェクトとは、リクエスト情報やパラメータなどのデータが入っているオブジェクト
  // {store, redirect}という形で受け取ると、storeにはVuexのstoreの情報、redirectにはリダイレクトさせるために必要な関数を受け取ることができる
  fetch({ store, redirect }) {
    store.watch(
      (state) => state.auth.currentUser,
      (newUser, oldUser) => {
        if (!newUser) {
          return redirect("/login");
        }
      }
    );
  },
};
</script>

<style></style>
