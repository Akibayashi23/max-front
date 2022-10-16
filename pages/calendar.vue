<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-btn outlined small class="ma-4" @click="setToday">今日</v-btn>
      <v-btn icon @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh">
      <!-- 下記はカレンダーを日本語にするやつ -->
      <!-- locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="
          (timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'
        " -->
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="events"
        @change="fetchEvents"
        locale="ja-jp"
        :day-format="(timestamp) => new Date(timestamp.date).getDate()"
        :month-format="
          (timestamp) => new Date(timestamp.date).getMonth() + 1 + ' /'
        "
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
// import firebase from "@/plugins/firebase";
// import axios from "axios"; // axiosをインポートする
import { format } from "date-fns";
import { mapGetters, mapActions } from "vuex";
// import CalendarDetails from "@/components/calendar/Detail";

export default {
  // components: {
  //   CalendarDetails,
  // },
  name: "Calendar",
  data: () => ({
    value: format(new Date(), "yyyy/MM/dd"),
  }),
  computed: {
    user() {
      return this.$store.state.auth.currentUser;
    },
    // mapGettersでcomputedを呼ぶ
    // stateに保存された値をmapGettersでimportしたeventsゲッターで取得し、ビューに表示
    ...mapGetters("events", ["events"]),
    title() {
      return format(new Date(this.value), "yyyy年 M月");
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
    // fetchEvents() {
    //   // GETリクエストを送信し、取得データをevents変数に代入する
    //   axios
    //     .get("http://localhost:3000/v1/events")
    //     .then((response) => {
    //       this.events = response.data;
    //       console.log(this.events);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },
    // mapActionsでmethodsで呼ぶ
    // ボタンを押すと、mapActionsでimportしたストアのfetchEventsアクションが実行されてデータを取得し、stateに保存
    ...mapActions("events", ["fetchEvents"]),
    setToday() {
      this.value = format(new Date(), "yyyy/MM/dd");
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
