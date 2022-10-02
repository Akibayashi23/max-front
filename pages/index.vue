<template>
  <div>
    <div v-if="user">
      <p>名前：{{ user.name }}</p>
      <AddTodo @submit="addTodo" />
      <TodoList :todos="todos" />
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
    async addTodo(title) {
      await axios.post("/v1/todos", { title });
      this.todos.push({
        title,
      });
    },
  },
};
</script>

<style></style>
