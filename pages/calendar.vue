<!-- カレンダーの親 -->
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

      <!-- カレンダーの一つのセルがクリックされた時に実行する処理を指定できる -->
      <!-- click:day="initEvent" -->
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
        @click:event="showEvent"
        @click:day="initEvent"
      ></v-calendar>
    </v-sheet>
    <!-- ダイアログ -->
    <!-- widthの指定 -->
    <!-- ダイアログの外側をクリックした際にもダイアログを閉じる -->
    <v-dialog :value="event !== null" @click:outside="closeDialog" width="600">
      <EventDetailDialog v-if="event !== null && !isEditMode" />
      <EventFormDialog v-if="event !== null && isEditMode" />
    </v-dialog>
  </div>
</template>

<script>
// import firebase from "@/plugins/firebase";
// import axios from "axios"; // axiosをインポートする
import { format } from "date-fns";
import { mapGetters, mapActions } from "vuex";
// calendar.vue > EventDetailDialog.vue > DialogSection.vueでコンポーネントを呼び出す
import EventDetailDialog from "@/components/calendar/EventDetailDialog";
import EventFormDialog from "@/components/calendar/EventFormDialog";
// import CalendarDetails from "@/components/calendar/Detail";

export default {
  // components: {
  //   CalendarDetails,
  // },
  name: "Calendar",
  components: {
    EventDetailDialog,
    EventFormDialog,
  },
  data: () => ({
    value: format(new Date(), "yyyy/MM/dd"),
  }),
  computed: {
    user() {
      return this.$store.state.auth.currentUser;
    },
    // mapGettersでcomputedを呼ぶ
    // stateに保存された値をmapGettersでimportしたeventsゲッターで取得し、ビューに表示
    ...mapGetters("events", ["events", "event", "isEditMode"]),
    title() {
      return format(new Date(this.value), "yyyy年 M月");
    },
  },
  methods: {
    // mapActionsでmethodsで呼ぶ
    // ボタンを押すと、mapActionsでimportしたストアのfetchEventsアクションが実行されてデータを取得し、stateに保存
    ...mapActions("events", ["fetchEvents", "setEvent", "setEditMode"]),
    setToday() {
      this.value = format(new Date(), "yyyy/MM/dd");
    },
    showEvent({ nativeEvent, event }) {
      this.setEvent(event);
      // 予定をクリックしてshowEventを実行した後にinitEventを実行させないようにする対策
      nativeEvent.stopPropagation();
    },
    // closeDialogメソッドを実行したらisEditModeをfalseに戻すようにした
    // eventステートにnullを代入することでダイアログを非表示にすることができる
    closeDialog() {
      this.setEvent(null);
      this.setEditMode(false);
    },
    // initEventメソッドを実行したらisEditModeをtrueにセットすることでフォームを表示するようにした
    // 引数のdateにはクリックした場所の日付が2022-10-16のような文字列で渡ってくる
    initEvent({ date }) {
      // ハイフンをスラッシュに置換して2022/10/16のような文字列に変換
      // safariではnew Date('2022-10-16')を実行するとエラーになるため。(なおchromeやfirefoxではエラーにならない。)
      date = date.replace(/-/g, "/");
      const start = format(new Date(date), "yyyy/MM/dd 00:00:00");
      const end = format(new Date(date), "yyyy/MM/dd 01:00:00");
      this.setEvent({ name: "", start, end, timed: true });
      this.setEditMode(true);
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
