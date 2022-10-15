<template>
  <div>
    <h1>Calendar</h1>
    <p>events:</p>
    <p>{{ events }}</p>
    <v-btn type="submit" @click="fetchEvents()">fetchEvents</v-btn>
  </div>
</template>

<script>
// import firebase from "@/plugins/firebase";
import axios from "axios"; // axiosをインポートする
export default {
  name: "Calendar",
  data: () => ({
    events: [],
  }),
  computed: {
    user() {
      return this.$store.state.auth.currentUser;
    },
  },
  methods: {
    // async logOut() {
    //   await firebase
    //     .auth()
    //     .signOut()
    //     .catch((error) => {
    //       console.log(error);
    //     });
    //   this.$store.dispatch("auth/setUser", null);
    //   this.$router.push("/login");
    // },
    fetchEvents() {
      // GETリクエストを送信し、取得データをevents変数に代入する
      axios
        .get("http://localhost:3000/v1/events")
        .then((response) => {
          this.events = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
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
