<template>
  <example-component-esi main-prop="test" />
</template>

<script lang="ts">
import { ExampleComponent } from "#components";

export default defineComponent({
  components: {
    ExampleComponentEsi: esiHoc(ExampleComponent)
  }
})
</script>
