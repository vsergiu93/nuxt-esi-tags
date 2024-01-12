<template>
  <dummy-component-esi main-prop="test" />
</template>

<script lang="ts">
import {defineComponent} from "vue";
import DummyComponent from "../components/DummyComponent.server.vue";

export default defineComponent({
  components: {
    DummyComponentEsi: esiHoc(DummyComponent)
  }
})
</script>
