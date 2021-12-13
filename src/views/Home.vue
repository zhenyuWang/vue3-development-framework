<template>
  <div>this is home!</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { apiDemo } from "@/api/demo";
export default defineComponent({
  name: "",
  setup() {
    apiDemo().then((res) => {
      console.log("res", res);
    });
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
