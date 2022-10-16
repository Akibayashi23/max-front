<!-- アイコン専用コンポーネント -->
<template>
  <!-- アイコンの種類、カラー、表示するコンテンツを呼び出し側で指定する -->
  <v-row>
    <!-- 中央寄せ -->
    <v-col cols="2" class="d-flex justify-center align-center">
      <v-icon size="20px" :color="color">{{ icon }}</v-icon>
    </v-col>
    <v-col class="d-flex align-center">
      <!-- コンテンツの受け渡し -->
      <slot></slot>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DialogSection",
  props: ["icon", "color"],
};
</script>
