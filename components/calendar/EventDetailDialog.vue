<!-- 予定詳細表示ダイアログ画面専用コンポーネント -->
<template>
  <!-- 余白の指定 -->
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <!-- ダイアログを閉じる動作 -->
      <v-btn icon @click="closeDialog">
        <!-- バツアイコン -->
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-title>
      <DialogSection icon="mdi-square" :color="event.color || 'blue'">
        {{ event.name }}
      </DialogSection>
    </v-card-title>
    <v-card-text>
      <DialogSection icon="mdi-clock-time-three-outline">
        {{ event.start.toLocaleString() }} ~ {{ event.end.toLocaleString() }}
      </DialogSection>
    </v-card-text>
    <v-card-text>
      <DialogSection icon="mdi-card-text-outline">
        {{ event.description || "no description" }}
      </DialogSection>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DialogSection from "@/components/calendar/DialogSection";

export default {
  name: "EventDetailDialog",
  components: {
    DialogSection,
  },
  computed: {
    ...mapGetters("events", ["event"]),
  },
  methods: {
    ...mapActions("events", ["setEvent"]),
    closeDialog() {
      this.setEvent(null);
    },
  },
};
</script>
