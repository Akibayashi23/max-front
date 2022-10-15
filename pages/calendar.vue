<template>
  <div>
    <h1>Calendar</h1>
    <ul>
      <li v-for="event in events" :key="event.id">
        {{ event.name }}
      </li>
    </ul>
    <v-btn type="submit" @click="fetchEvents()">fetchEvents</v-btn>
    <CalendarDetails />
  </div>
</template>

<script>
// import firebase from "@/plugins/firebase";
import axios from "axios"; // axiosをインポートする
// import { mapGetters, mapActions } from "vuex";
import CalendarDetails from "@/components/calendar/Detail";
export default {
  components: {
    CalendarDetails,
  },
  name: "Calendar",
  data: () => ({
    events: [],
  }),
  computed: {
    user() {
      return this.$store.state.auth.currentUser;
    },
    // mapGettersでcomputedを呼ぶ
    // stateに保存された値をmapGettersでimportしたeventsゲッターで取得し、ビューに表示
    // ...mapGetters("events", ["events"]),
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
    // mapActionsでmethodsで呼ぶ
    // ボタンを押すと、mapActionsでimportしたストアのfetchEventsアクションが実行されてデータを取得し、stateに保存
    // ...mapActions("events", ["fetchEvents"]),
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
