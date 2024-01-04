<template>
  <example-component-esi main-prop="zzssasa" />
</template>

<script lang="ts">

import {ExampleComponent} from "#components";

export default defineComponent({
  components: {
    ExampleComponentEsi: esiHocComponent(ExampleComponent)
  }
})
</script>
